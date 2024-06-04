<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryInsumoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
//        BASICOS
//        SALSAS
//        GASEOSAS DE 300 ML.
//        GASEOSAS DE 500 ML.
//        GASEOSAS DE 1 LT.
//        GASEOSAS DE 2 LT.
//        GASEOSAS DE 3 LT.


        DB::table('category_insumos')->insert([
            ['name' => 'BASICOS'],
            ['name' => 'SALSAS'],
            ['name' => 'GASEOSAS DE 300 ML.'],
            ['name' => 'GASEOSAS DE 500 ML.'],
            ['name' => 'GASEOSAS DE 1 LT.'],
            ['name' => 'GASEOSAS DE 2 LT.'],
            ['name' => 'GASEOSAS DE 3 LT.'],
        ]);
    }
}
