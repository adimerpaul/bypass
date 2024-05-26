<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller{
    public function index(){
        return Client::orderBy('id', 'desc')->get();
    }

    public function store(Request $request){
        $client = new Client();
        $client->name = $request->name;
        $client->lastname = $request->lastname;
        $client->company = $request->company;
        $client->nit = $request->nit;
        $client->phone = $request->phone;
        $client->save();
        return response()->json($client);
    }

    public function update(Request $request, $id){
        $client = Client::find($id);
        $client->name = $request->name;
        $client->lastname = $request->lastname;
        $client->company = $request->company;
        $client->nit = $request->nit;
        $client->phone = $request->phone;
        $client->save();
        return response()->json($client);
    }

    public function destroy($id){
       $client = Client::find($id);
       $client->delete();
        return $client;
    }
}
