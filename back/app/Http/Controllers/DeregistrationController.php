<?php

namespace App\Http\Controllers;

use App\Models\Buy;
use App\Models\Deregistration;
use App\Models\Insumo;
use Illuminate\Http\Request;

class DeregistrationController extends Controller{
    public function store(Request $request){
        $insumos= $request->insumos;
        foreach ($insumos as $insumo){
//            error_log($insumo['cantidadSale']);
            $insumoUpdate = Insumo::find($insumo['id']);
            $insumoUpdate->stock = $insumoUpdate->stock - $insumo['cantidadSale'];
            $insumoUpdate->save();
            $buy = new DeRegistration();
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
}
