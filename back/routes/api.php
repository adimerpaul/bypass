<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;


Route::post('/login', [\App\Http\Controllers\UserController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::get('/me', [\App\Http\Controllers\UserController::class, 'me']);
    Route::post('/logout', [\App\Http\Controllers\UserController::class, 'logout']);

    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'store']);
    Route::put('/users/{id}', [\App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/users/{id}', [\App\Http\Controllers\UserController::class, 'delete']);
    Route::put('/passwordUpdate/{id}', [\App\Http\Controllers\UserController::class, 'passwordUpdate']);
    Route::get('/listUser', [\App\Http\Controllers\UserController::class, 'listUser']);

    Route::get('/companies', [\App\Http\Controllers\CompanyController::class, 'index']);
    Route::post('/companies', [\App\Http\Controllers\CompanyController::class, 'store']);
    Route::put('/companies/{id}', [\App\Http\Controllers\CompanyController::class, 'update']);
    Route::delete('/companies/{id}', [\App\Http\Controllers\CompanyController::class, 'destroy']);

    Route::get('/boats', [\App\Http\Controllers\BoatController::class, 'index']);
    Route::post('/boats', [\App\Http\Controllers\BoatController::class, 'store']);
    Route::put('/boats/{id}', [\App\Http\Controllers\BoatController::class, 'update']);
    Route::delete('/boats/{id}', [\App\Http\Controllers\BoatController::class, 'destroy']);

    Route::get('/crews', [\App\Http\Controllers\CrewController::class, 'index']);
    Route::post('/crews', [\App\Http\Controllers\CrewController::class, 'store']);
    Route::put('/crews/{id}', [\App\Http\Controllers\CrewController::class, 'update']);
    Route::delete('/crews/{id}', [\App\Http\Controllers\CrewController::class, 'destroy']);

    Route::get('/clients', [\App\Http\Controllers\ClientController::class, 'index']);
    Route::post('/clients', [\App\Http\Controllers\ClientController::class, 'store']);
    Route::put('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'update']);
    Route::delete('/clients/{id}', [\App\Http\Controllers\ClientController::class, 'destroy']);
    Route::get('/provedores', [\App\Http\Controllers\ClientController::class, 'provedores']);

    Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index']);
    Route::get('/listproducts', [\App\Http\Controllers\ProductController::class, 'listproducts']);
    Route::post('/products', [\App\Http\Controllers\ProductController::class, 'store']);
    Route::post('/products/{id}', [\App\Http\Controllers\ProductController::class, 'update']);
    Route::delete('/products/{id}', [\App\Http\Controllers\ProductController::class, 'destroy']);

    Route::get('/categories', [\App\Http\Controllers\CategoryController::class, 'index']);
    Route::get('/searchClient/{cinit}', [\App\Http\Controllers\ClientController::class, 'searchClient']);

    Route::get('/sales', [\App\Http\Controllers\SaleController::class, 'index']);
    Route::post('/sales', [\App\Http\Controllers\SaleController::class, 'store']);
    Route::post('/saleAnular', [\App\Http\Controllers\SaleController::class, 'saleAnular']);
    Route::post('/egresos', [\App\Http\Controllers\SaleController::class, 'egresos']);

    Route::get('/insumos', [\App\Http\Controllers\InsumoController::class, 'index']);
    Route::post('/insumos', [\App\Http\Controllers\InsumoController::class, 'store']);
    Route::put('/insumos/{insumo}', [\App\Http\Controllers\InsumoController::class, 'update']);
    Route::delete('/insumos/{insumo}', [\App\Http\Controllers\InsumoController::class, 'destroy']);
    Route::put('/insumosStock/{insumo}', [\App\Http\Controllers\InsumoController::class, 'insumosStock']);
    Route::get('/listInsumo', [\App\Http\Controllers\InsumoController::class, 'listInsumo']);

//    category_insumos
    Route::get('/category_insumos', [\App\Http\Controllers\CategoryInsumoController::class, 'index']);

    Route::post('/insumosProduct', [\App\Http\Controllers\InsumoProductController::class, 'store']);
    Route::delete('/insumosProduct/{insumoProduct}', [\App\Http\Controllers\InsumoProductController::class, 'destroy']);

    Route::post('/purchases', [\App\Http\Controllers\InsumoController::class, 'purchases']);
    Route::post('/deregistrations', [\App\Http\Controllers\DeregistrationController::class, 'store']);

    Route::get('/diarioDate/{date}', [\App\Http\Controllers\DiarioController::class, 'diarioDate']);
    Route::put('/diario/{diario}', [\App\Http\Controllers\DiarioController::class, 'update']);

    Route::get('/buys', [\App\Http\Controllers\BuyController::class, 'index']);
    Route::put('/buysAnular/{buy}', [\App\Http\Controllers\BuyController::class, 'buysAnular']);
    Route::put('/deregistrationsAnular/{deregistration}', [\App\Http\Controllers\BuyController::class, 'deregistrationsAnular']);

    Route::post('/reportSale', [\App\Http\Controllers\SaleController::class, 'reportSale']);
    Route::post('/reportProduct', [\App\Http\Controllers\SaleController::class, 'reportProduct']);
    Route::post('/reportInsumo', [\App\Http\Controllers\SaleController::class, 'reportInsumo']);
    Route::post('/reportPago', [\App\Http\Controllers\SaleController::class, 'reportPago']);
    Route::post('/reportGanancia', [\App\Http\Controllers\SaleController::class, 'reportGanancia']);

    Route::post('/caja', [\App\Http\Controllers\CajaController::class, 'store']);
    Route::post('/ultimaCaja', [\App\Http\Controllers\CajaController::class, 'ultimaCaja']);
    Route::post('/totalCaja', [\App\Http\Controllers\CajaController::class, 'totalCaja']);

});

//Route::get('/compromiso/{loan_id}', [\App\Http\Controllers\ReportController::class, 'compromiso']);
