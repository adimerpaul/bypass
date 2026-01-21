<?php

namespace App\Http\Controllers;

use App\Models\Buy;
use App\Models\Deregistration;
use App\Models\Insumo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BuyController extends Controller
{
    public function index(Request $request)
    {
        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');
        $insumo = $request->input('insumo');

        $fetchData = function ($model) use ($fechaInicio, $fechaFin, $insumo) {
            return $model::whereBetween('date', [$fechaInicio, $fechaFin])
                ->when($insumo, function ($query) use ($insumo) {
                    $query->where('insumo_id', $insumo);
                })
                ->with(['insumo', 'user'])
                ->orderBy('id', 'desc')
                ->get();
        };

        return response()->json([
            'buys' => $fetchData(Buy::class),
            'deregistrations' => $fetchData(Deregistration::class),
        ]);
    }

    // Anular compra => REVERSA stock (resta quantity)
    public function buysAnular(Request $request, $id)
    {
        return DB::transaction(function () use ($id) {
            /** @var Buy $buy */
            $buy = Buy::with('insumo')->lockForUpdate()->findOrFail($id);

            if ($buy->status === 'ANULADO') {
                return response()->json([
                    'message' => 'La compra ya está anulada.',
                    'buy' => $buy
                ], 200);
            }

            // Bloquea el insumo para actualizar stock de forma segura
            /** @var Insumo $insumo */
            $insumo = Insumo::lockForUpdate()->findOrFail($buy->insumo_id);

            // Al anular una compra, debes quitar del stock lo que se sumó al registrar esa compra.
            $nuevoStock = (float)$insumo->stock - (float)$buy->quantity;

            if ($nuevoStock < 0) {
                return response()->json([
                    'message' => 'No se puede anular: el stock actual es menor que la cantidad comprada a revertir.',
                    'stock_actual' => $insumo->stock,
                    'cantidad_a_revertir' => $buy->quantity,
                ], 422);
            }

            $insumo->stock = $nuevoStock;
            $insumo->save();

            $buy->status = 'ANULADO';
            $buy->save();

            // opcional: recargar relaciones
            $buy->load(['insumo', 'user']);

            return response()->json($buy, 200);
        });
    }

    // Anular baja/deregistration => REVERSA stock (suma quantity)
    public function deregistrationsAnular(Request $request, $id)
    {
        return DB::transaction(function () use ($id) {
            /** @var Deregistration $deregistration */
            $deregistration = Deregistration::with('insumo')->lockForUpdate()->findOrFail($id);

            if ($deregistration->status === 'ANULADO') {
                return response()->json([
                    'message' => 'La baja ya está anulada.',
                    'deregistration' => $deregistration
                ], 200);
            }

            /** @var Insumo $insumo */
            $insumo = Insumo::lockForUpdate()->findOrFail($deregistration->insumo_id);

            // Si la baja restó stock cuando se creó, al anularla lo devolvemos.
            $insumo->stock = (float)$insumo->stock + (float)$deregistration->quantity;
            $insumo->save();

            $deregistration->status = 'ANULADO';
            $deregistration->save();

            $deregistration->load(['insumo', 'user']);

            return response()->json($deregistration, 200);
        });
    }
}
