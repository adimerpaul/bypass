<?php

namespace App\Http\Controllers;

use App\Models\CategoryInsumo;
use App\Models\Diario;
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
}
