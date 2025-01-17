<?php

namespace App\Http\Controllers;

use App\Models\Buy;
use App\Models\Deregistration;
use Illuminate\Http\Request;

class BuyController extends Controller{
    public function index(Request $request){
//        $date = $request->input('date');
        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');
        $insumo = $request->input('insumo');


        // Función para construir la consulta
        $fetchData = function ($model) use ($fechaInicio, $fechaFin, $insumo) {
            return $model::whereBetween('date', [$fechaInicio, $fechaFin])
                ->when($insumo, function ($query) use ($insumo) {
                    $query->where('insumo_id', $insumo);
                })
                ->with(['insumo', 'user'])
                ->orderBy('id', 'desc')
                ->get();
        };

        // Consultar los datos
        $buys = $fetchData(Buy::class);
        $deregistrations = $fetchData(Deregistration::class);

        // Retornar los datos como respuesta JSON
        return response()->json([
            'buys' => $buys,
            'deregistrations' => $deregistrations,
        ]);
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
