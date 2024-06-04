<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller{
    public function index(){
        return Client::orderBy('id', 'desc')->get();
    }
    public function searchClient($ci){
        return Client::where('nit', 'like', '%'.$ci.'%')->firstOrFail();
    }

    public function store(Request $request){
        $client = new Client();
        $client->cinit = $request->cinit;
        $client->name = $request->name;
        $client->email = $request->email;
        $client->save();
        return response()->json($client);
    }

    public function update(Request $request, $id){
        $client = Client::find($id);
        $client->cinit = $request->cinit;
        $client->name = $request->name;
        $client->email = $request->email;
        $client->save();
        return response()->json($client);
    }

    public function destroy($id){
       $client = Client::find($id);
       $client->delete();
        return $client;
    }
}
