<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function reporteTipo(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date',
        ]);

        $ventas = Sale::select(
            'mesa',
            DB::raw("SUM(total) as total")
        )
            ->whereBetween('date', [$request->fechaInicio, $request->fechaFin])
            ->where('status', '!=', 'ANULADO')
            ->groupBy('mesa')
            ->orderBy('mesa')
            ->get();

        return response()->json($ventas);
    }
}
