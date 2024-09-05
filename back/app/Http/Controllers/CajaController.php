<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Http\Requests\StoreCajaRequest;
use App\Http\Requests\UpdateCajaRequest;
use App\Models\Sale;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CajaController extends Controller{
    function ultimaCaja(Request $request){
        $caja= Caja::where('estado','ACTIVO')->where('fecha',$request->fecha)->first();
        $sumaGastos=Sale::where('date',$request->fecha)->where('type','EGRESO')->sum('total');
        if($caja){
            return ['monto'=>$caja->monto-$sumaGastos];
        }else{
            return ['monto'=>0];
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCajaRequest $request)
    {
        //
        DB::SELECT("UPDATE cajas set estado='INACTIVO' where fecha='".date('Y-m-d')."'");
        $caja=new Caja();
        $caja->fecha=date('Y-m-d');
        $caja->hora=date('H:i:s');
        $caja->monto=$request->monto;
        $caja->descripcion=$request->descripcion;
        $caja->user_id=$request->user()->id;
        $caja->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($fecha)
    {
        //

    }

    public function totalCaja(Request $request)
    {
        //
        return Caja::where('estado','ACTIVO')->where('fecha','>=',$request->ini)->where('fecha','<=',$request->fin)->get();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Caja $caja)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCajaRequest $request, Caja $caja)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Caja $caja)
    {
        //
    }
}
