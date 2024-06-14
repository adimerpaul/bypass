<?php

namespace App\Http\Controllers;

use App\Models\Buy;
use App\Models\CategoryInsumo;
use App\Models\Deregistration;
use App\Models\Detail;
use App\Models\Diario;
use App\Models\InsumoProduct;
use App\Models\InsumoSale;
use Illuminate\Http\Request;

class DiarioController extends Controller{
    public function diarioDate($date){

        $saleController = new SaleController();
        $saleController->createDiario();

        $diario = Diario::where('date', $date)
            ->orderBy('category_insumo_id', 'asc')
//            ->with('categoryInsumo')
            ->get();
        $categoryInsumo = CategoryInsumo::all();

        foreach ($diario as $diar){
            $sumIngreso = Buy::where('date', $date)
                ->where('insumo_id', $diar->insumo_id)
                ->where('status', 'ACTIVE')
                ->sum('quantity');
            $sumEgreso = Deregistration::where('date', $date)
                ->where('insumo_id', $diar->insumo_id)
                ->where('status', 'ACTIVE')
                ->sum('quantity');
            $sumDetail = InsumoSale::where('date', $date)
                ->where('insumo_id', $diar->insumo_id)
                ->where('status', 'ACTIVE')
                ->sum('quantity');
            $diar->ingreso = $sumIngreso;
            $diar->egreso = $sumEgreso;
            $diar->ventas = $sumDetail;
            $cierre = $diar->inicio + $diar->ingreso - $diar->egreso - $diar->ventas;
            $diar->cierre = $cierre;
            $diar->save();
        }
        $result=[];
        foreach ($categoryInsumo as $category){
            if($diario->where('category_insumo_id', $category->id)->count() != 0){
                $result[] = [
                    'id' => $category->id,
                    'name' => $category->name,
                    'diario' => $diario->where('category_insumo_id', $category->id)
                ];
            }
        }
        return response()->json($result);
    }
    function update(Request $request, Diario $diario){
        $diario->update($request->all());
        return response()->json($diario);
    }


}
