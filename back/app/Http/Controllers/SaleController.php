<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Detail;
use App\Models\Diario;
use App\Models\Insumo;
use App\Models\InsumoProduct;
use App\Models\InsumoSale;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller{

    public function index(Request $request){
        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');
        if($request->user()->role=='ADMIN')
        $sales = Sale::with('client')->with('user')->with('details')->whereBetween('date', [$fechaInicio, $fechaFin])
            ->orderBy('id', 'desc')->get();
        else
        $sales = Sale::where('user_id',$request->user()->id)->with('client')->with('user')->with('details')->whereBetween('date', [$fechaInicio, $fechaFin])
        ->orderBy('id', 'desc')->get();
        return $sales;
    }

    public function reportGanancia(Request $request){
        $pagos= ['EFECTIVO','TARJETA','ONLINE','QR'];
        $pagosArray = [];
        if($request->user()->role=='ADMIN'){
        foreach ($pagos as $pago) {
            $total = 0;
             if ($pago == 'EFECTIVO' || $pago == 'TARJETA' || $pago == 'ONLINE' || $pago == 'QR'){
                $total = Sale::whereDate('date','>=',$request->fechaInicio)
                ->whereDate('date','<=',$request->fechaFin)
                ->where('status','ACTIVO')->where('type','INGRESO')->where('pago',$pago)->sum('total');
            }
            if ($total >= 0){
                $pagoArray = [
                    'pago' => $pago,
                    'total' => $total
                ];
                array_push($pagosArray, $pagoArray);
            }
        }
    }
        else{
            foreach ($pagos as $pago) {
                $total = 0;
                 if ($pago == 'EFECTIVO' || $pago == 'TARJETA' || $pago == 'ONLINE' || $pago == 'QR'){
                    $total = Sale::where('user_id',$request->user()->id)->whereDate('date','>=',$request->fechaInicio)
                    ->whereDate('date','<=',$request->fechaFin)
                    ->where('status','ACTIVO')->where('type','INGRESO')->where('pago',$pago)->sum('total');
                }
                if ($total >= 0){
                    $pagoArray = [
                        'pago' => $pago,
                        'total' => $total
                    ];
                    array_push($pagosArray, $pagoArray);
                }
            }
        }
        return $pagosArray;
    }

    public function upsertClient($ci, $name){
        $ci = $ci==null || $ci=='' ? 0 : $ci;
        $client = Client::where('cinit', $ci)->first();
        if($client == null){
            $client = new Client();
            $client->cinit = $ci;
            $client->name = $name;
            $client->save();
        }else{
            $client->name = $name;
            $client->save();
        }
        return $client;
    }
    public function saleAnular(Request $request){
        DB::beginTransaction();
        try {
            $sale = Sale::findOrFail($request->id);
            $sale->status = 'ANULADO';
            $sale->save();
            foreach ($sale->details as $detail) {
                $detail->status = 'ANULADO';
                $detail->save();
                $insumos = InsumoProduct::where('product_id', $detail->product_id)->get();
                if ($insumos->count() > 0) {
                    foreach ($insumos as $insumo) {
                        $insumoSale = InsumoSale::where('insumo_id', $insumo->insumo_id)->where('sale_id', $sale->id)->first();
                        if($insumoSale){
                            $insumoSale->status = 'ANULADO';
                            $insumoSale->save();
                        }

                        $insumoUpdate = Insumo::findOrFail($insumo->insumo_id);
                        $insumoUpdate->stock += $detail->quantity * $insumo->quantity;
                        $insumoUpdate->save();
                    }
                }
            }
            DB::commit();
            return $sale;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function egresos(Request $request){
//        protected $fillable = ['date', 'time', 'total', 'name', 'user_id', 'client_id','descripcion', 'type', 'status'];
        $provedor_id = $request->provedor_id['id'];
        $client = Client::find($provedor_id);
        error_log('client: '. $client->name);
        $sale = new Sale();
        $sale->date = date('Y-m-d');
        $sale->time = date('H:i:s');
        $sale->total = $request->total;
        $sale->name = $client->name;
        $sale->user_id = $request->user()->id;
        $sale->client_id = $provedor_id;
        $sale->descripcion = $request->descripcion;
        $sale->type = 'EGRESO';
        $sale->save();
        return Sale::with('client')->with('user')->findOrFail($sale->id);
    }
    public function store(Request $request){
        DB::beginTransaction();
        try {
            $this->createDiario();

            $ci = $request->client['ci'];
            $name = $request->client['name'];
            $client = $this->upsertClient($ci, $name);

            $sale = new Sale();
            $sale->date = date('Y-m-d');
            $sale->time = date('H:i:s');
            $sale->total = 0;
            $sale->name = $name;
            $sale->user_id = $request->user()->id;
            $sale->client_id = $client->id;
            $sale->descripcion = '';
            $sale->type = 'INGRESO';
            $sale->status = 'ACTIVO';
            $sale->mesa = $request->mesa;
            $sale->pago = $request->pago;
            $sale->comment = $request->comment;
            $sale->llamada = $request->llamada;
            $sale->numero = $this->numeroGenerate();
            $sale->save();
            foreach ($request->products as $product) {
                $detail = new Detail();
                $detail->quantity = $product['cantidadSale'];
                $detail->price = $product['price'];
                $detail->subtotal = $product['cantidadSale'] * $product['price'];
                $detail->product = $product['name'];
                $detail->client_id = $client->id;
                $detail->user_id = $request->user()->id;
                $detail->sale_id = $sale->id;
                $detail->product_id = $product['id'];
                $detail->save();
                $sale->total += $detail->subtotal;
                $nameLower = strtolower($product['name']);
                $sale->descripcion = $sale->descripcion. $product['cantidadSale'] . ' '. $nameLower . ',';

                // Insumos de la venta
                $insumos = InsumoProduct::where('product_id', $product['id'])->get();
                if ($insumos->count() > 0) {
                    foreach ($insumos as $insumo) {
                        $insumoSale = new InsumoSale();
                        $insumoSale->insumo_id = $insumo->insumo_id;
                        $insumoSale->sale_id = $sale->id;
                        $insumoSale->quantity = $product['cantidadSale']* $insumo->quantity;
                        $insumoSale->date = date('Y-m-d');
                        $insumoSale->user_id = $request->user()->id;
                        $insumoSale->save();

                        $insumoUpdate = Insumo::findOrFail($insumo->insumo_id);
                        $insumoUpdate->stock -= $product['cantidadSale'] * $insumo->quantity;
                        $insumoUpdate->save();
                    }
                }
            }
            $sale->save();
            DB::commit();
            return Sale::with('client')->with('user')->with('details')->findOrFail($sale->id);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function numeroGenerate(){
        $date = date('Y-m-d');
        $sales = Sale::where('date', $date)->where('type', 'INGRESO')->get();
        $numero = $sales->count() + 1;
        return $numero;
    }
    public function createDiario(){
        $hoy = date('Y-m-d');
        if(Diario::where('date', $hoy)->count() == 0){
            $insumosActive = Insumo::where('status', 'ACTIVE')->get();
            if ($insumosActive->count() > 0) {
                foreach ($insumosActive as $insumo) {
                    $diario = new Diario();
//                    protected $fillable = ['item', 'medida', 'insumo_id', 'inicio', 'ingreso', 'egreso', 'ventas', 'cierre', 'local', 'status', 'date'];
                    $diario->item = $insumo->name;
                    $diario->medida = $insumo->unit;
                    $diario->insumo_id = $insumo->id;
                    $diario->category_insumo_id = $insumo->category_insumo_id;
                    $diario->inicio = $insumo->stock;
                    $diario->ingreso = 0;
                    $diario->egreso = 0;
                    $diario->ventas = 0;
                    $diario->cierre = $insumo->stock;
                    $diario->local = 0;
                    $diario->status = 'ACTIVE';
                    $diario->date = $hoy;
                    $diario->save();
                }
            }
        }
    }

    public function reportSale(Request $request){
        if($request->user_id==0)
            return Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->get();
        else
            return Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->where('user_id',$request->user_id)->get();
    }

    public function reportProduct(Request $request){
        if($request->user_id==0){
        $saleProduct = Detail::Select('product','price', DB::raw('SUM(quantity) as quantity'))
            ->whereDate('created_at','>=',$request->date)
            ->whereDate('created_at','<=',$request->date2)
            ->where('status','ACTIVO')
            ->groupBy('product','price')
            ->get();
        }
        else{
            $saleProduct = Detail::Select('product','price', DB::raw('SUM(quantity) as quantity'))
            ->whereDate('created_at','>=',$request->date)
            ->whereDate('created_at','<=',$request->date2)
            ->where('user_id',$request->user_id)
            ->where('status','ACTIVO')
            ->groupBy('product','price')
            ->get();
        }

        return $saleProduct;
    }

    public function reportInsumo(Request $request){
        if($request->user_id==0){
        $saleInsumos = InsumoSale::Select('insumo_id', DB::raw('SUM(quantity) as quantity'))
            ->where('date','>=',$request->date)
            ->where('date','<=',$request->date2)
            ->where('status','ACTIVE')
            ->groupBy('insumo_id')
            ->orderBy('quantity', 'desc')
            ->get();
        }
        else{
            $saleInsumos = InsumoSale::Select('insumo_id', DB::raw('SUM(quantity) as quantity'))
            ->where('date','>=',$request->date)
            ->where('date','<=',$request->date2)
            ->where('user_id',$request->user_id)
            ->where('status','ACTIVE')
            ->groupBy('insumo_id')
            ->orderBy('quantity', 'desc')
            ->get();
        }
        $insumos = [];
        foreach ($saleInsumos as $saleInsumo) {
            $insumo = Insumo::findOrFail($saleInsumo->insumo_id);
            $insumo->quantity = $saleInsumo->quantity;
            array_push($insumos, $insumo);
        }
        return $insumos;
    }

    public function reportPago(Request $request){
        $date = $request->date;
        $pagos= ['EFECTIVO','TARJETA','ONLINE','QR','INGRESO','EGRESO'];
        $pagosArray = [];
        foreach ($pagos as $pago) {
            $total = 0;
            if($request->user_id==0){
            if ($pago == 'INGRESO'){
                $total = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->sum('total');
                $details = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->get();
            }
            else if ($pago == 'EGRESO'){
                $total = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','EGRESO')->sum('total');
                $details = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','EGRESO')->get();
            }else if ($pago == 'EFECTIVO' || $pago == 'TARJETA' || $pago == 'ONLINE' || $pago == 'QR'){
                $total = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->where('pago',$pago)->sum('total');
                $details = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->where('pago',$pago)->get();
            }
            }
            else{
                if ($pago == 'INGRESO'){
                    $total = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->where('user_id',$request->user_id)->sum('total');
                    $details = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->where('user_id',$request->user_id)->get();
                }
                else if ($pago == 'EGRESO'){
                    $total = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','EGRESO')->where('user_id',$request->user_id)->sum('total');
                    $details = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','EGRESO')->where('user_id',$request->user_id)->get();
                }else if ($pago == 'EFECTIVO' || $pago == 'TARJETA' || $pago == 'ONLINE' || $pago == 'QR'){
                    $total = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->where('pago',$pago)->where('user_id',$request->user_id)->sum('total');
                    $details = Sale::where('date','>=',$request->date)->where('date','<=',$request->date2)->where('status','ACTIVO')->where('type','INGRESO')->where('pago',$pago)->where('user_id',$request->user_id)->get();
                }   
            }
            if ($total >= 0){
                $pagoArray = [
                    'pago' => $pago,
                    'total' => $total,
                    'details' => $details
                ];
                array_push($pagosArray, $pagoArray);
            }
        }
        return $pagosArray;
    }
//    public function update(Request $request, $id){
//        $sale = Sale::findOrFail($id);
//        $sale->update($request->all());
//        return $sale;
//    }
//    public function delete(Request $request, $id){
//        $sale = Sale::findOrFail($id);
//        $sale->delete();
//        return 204;
//    }
}
