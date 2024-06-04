<?php

namespace App\Http\Controllers;

use App\Models\Insumo;
use Illuminate\Http\Request;

class InsumoController extends Controller{
    function index(){
        return Insumo::orderBy('id', 'desc')->with('categoryInsumo')->get();
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
