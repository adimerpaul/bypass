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
        $sales = Sale::with('client')->with('user')->with('details')->whereBetween('date', [$fechaInicio, $fechaFin])
            ->orderBy('id', 'desc')->get();
        return $sales;
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
    public function update(Request $request, $id){
        $sale = Sale::findOrFail($id);
        $sale->update($request->all());
        return $sale;
    }
    public function delete(Request $request, $id){
        $sale = Sale::findOrFail($id);
        $sale->delete();
        return 204;
    }
}
