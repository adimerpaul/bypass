<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Detail;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller{
    public function index(){
        return Sale::all();
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
//        protected $fillable = ['date', 'time', 'total', 'name', 'user_id', 'client_id'];
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
        foreach ($request->products as $product){
//            protected $fillable = ['quantity', 'price', 'subtotal', 'product', 'client_id', 'user_id', 'sale_id', 'product_id'];
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
        }
        $sale->save();
        return Sale::with('client')->with('user')->with('details')->findOrFail($sale->id);
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
