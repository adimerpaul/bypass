<?php

namespace App\Http\Controllers;

use App\Models\CategoryInsumo;
use Database\Seeders\CategoryInsumoSeeder;
use Illuminate\Http\Request;

class CategoryInsumoController extends Controller{
    public function index(){
        return CategoryInsumo::orderBy('id', 'asc')->get();
    }
}
