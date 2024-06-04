<?php

namespace App\Http\Controllers;

use App\Models\InsumoProduct;
use App\Models\Product;
use Illuminate\Http\Request;

class InsumoProductController extends Controller{
    public function store(Request $request){
        $insumoProduct = InsumoProduct::create([
            'insumo_id' => $request->insumo_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);
        return Product::with(['category','insumos'])->find($request->product_id);
    }
    public function destroy($id){
        $insumoProduct = InsumoProduct::find($id);
        $insumoProduct->delete();
        return Product::with(['category','insumos'])->find($insumoProduct->product_id);
    }
}
