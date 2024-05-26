<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        DB::table('categories')->insert([
            ['name' => 'Hamburguesas','icon'=>'fa-solid fa-burger'],
            ['name' => 'Refrescos y Bebidas','icon'=>'fa-solid fa-glass'],
            ['name' => 'Acompañamientos','icon'=>'fa-solid fa-fries'],
            ['name' => 'Postres','icon'=>'fa-solid fa-ice-cream'],
            ['name' => 'Combos','icon'=>'fa-solid fa-box'],
            ['name' => 'Promociones','icon'=>'fa-solid fa-percent'],
        ]);
    }
}
