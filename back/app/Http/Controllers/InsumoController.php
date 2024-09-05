<?php

namespace App\Http\Controllers;

use App\Models\Buy;
use App\Models\Insumo;
use Illuminate\Http\Request;

class InsumoController extends Controller{
    function insumosStock(Request $request, Insumo $insumo){
        $insumo->stock = $request->stock;
        $insumo->save();
//        return Insumo::where('id', $insumo->id)->with('categoryInsumo')->first();
    }
    function purchases(Request $request){
        $insumos= $request->insumos;
        foreach ($insumos as $insumo){
//            error_log($insumo['cantidadSale']);
            $insumoUpdate = Insumo::find($insumo['id']);
            $insumoUpdate->stock = $insumoUpdate->stock + $insumo['cantidadSale'];
            $insumoUpdate->save();
            $buy = new Buy();
            $buy->insumo_id = $insumo['id'];
            $buy->user_id = $request->user()->id;
            $buy->quantity = $insumo['cantidadSale'];
            $buy->price = $insumo['price'];
            $buy->total = floatval($insumo['cantidadSale']) * floatval($insumo['price']);
            $buy->date = date('Y-m-d');
            $buy->time = date('H:i:s');
            $buy->save();
        }
        return $insumos;
    }
    function index(){
        return Insumo::orderBy('id', 'desc')->with('categoryInsumo')->get();
    }

    function listInsumo(){
        return Insumo::where('status','ACTIVE')->orderBy('id', 'desc')->with('categoryInsumo')->get();
    }

    function store(Request $request){
        $insumo = new Insumo();
        $insumo->name = $request->name;
        $insumo->category_insumo_id = $request->category_insumo_id;
        $insumo->stock = $request->stock == null || $request->stock == '' ? 0 : $request->stock;
        $insumo->unit = $request->unit;
        $insumo->status = $request->status;
        $insumo->save();
        return Insumo::where('id', $insumo->id)->with('categoryInsumo')->first();
    }
    function update(Request $request, Insumo $insumo){
        $insumo->name = $request->name;
        $insumo->category_insumo_id = $request->category_insumo_id;
        $insumo->stock = $request->stock == null || $request->stock == '' ? 0 : $request->stock;
        $insumo->unit = $request->unit;
        $insumo->status = $request->status;
        $insumo->save();
        return Insumo::where('id', $insumo->id)->with('categoryInsumo')->first();
    }
    function destroy(Insumo $insumo){
        $insumo->delete();
        return $insumo;
    }
}
