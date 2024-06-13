<?php

namespace App\Http\Controllers;

use App\Models\Buy;
use App\Models\Deregistration;
use Illuminate\Http\Request;

class BuyController extends Controller{
    public function index(Request $request){
        $date = $request->input('date');
        $buys = Buy::where('date', $date)
            ->with(['insumo', 'user'])
            ->orderBy('id', 'desc')
            ->get();
        $deregistrations = Deregistration::where('date', $date)
            ->with(['insumo', 'user'])
            ->orderBy('id', 'desc')
            ->get();
        return response()->json(['buys' => $buys, 'deregistrations' => $deregistrations]);
    }
    function buysAnular(Request $request, $id){
        $buy = Buy::find($id);
        $buy->status = 'ANULADO';
        $buy->save();
        return $buy;
    }

    function deregistrationsAnular(Request $request, $id){
        $deregistration = Deregistration::find($id);
        $deregistration->status = 'ANULADO';
        $deregistration->save();
        return $deregistration;
    }
}
