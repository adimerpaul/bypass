<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InsumoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{

//PAN	UNIDAD
//PAN LOMITO	UNIDAD
//CARNE	UNIDAD
//CARNE LOMITO	UNIDAD
//QUESO	GRAMOS
//MUZZARELLA	GRAMOS
//TOCINO	GRAMOS
//SALCHICHA	GRAMOS
//NUGGETS	UNIDAD
//PAPAS	GRAMOS
//HUEVO	UNIDAD
//ARROZ	GRAMOS
//CONTRA	UNIDAD
//PIERNA	UNIDAD
//ALA	UNIDAD
//PECHO	UNIDAD
//
//PEPINILLO	GRAMOS
//MAYOAJO	GRAMOS
//AMERICANA	GRAMOS
//CARAMELIZADA	GRAMOS
//BBQ	GRAMOS
//PIÑA	GRAMOS
//CHAMPIÑONES	GRAMOS
//
//COCA COLA 300 ML.	UNIDAD
//FANTA NARANJA 300 ML.	UNIDAD
//FANTA GUARANA 300 ML	UNIDAD
//SPRITE 300 ML.	UNIDAD
//AQUARIUS PERA 300 ML.	UNIDAD
//AQUARIUS POMELO 300 ML.	UNIDAD
//PEPSI 300 ML.	UNIDAD
//ANTÁRTICA 300 ML.	UNIDAD
//
//COCA COLA 500 ML.	UNIDAD
//COCA COLA S/AZUCAR	UNIDAD
//FANTA NARANJA 500 ML.	UNIDAD
//FANTA GUARANA 500 ML.	UNIDAD
//FANTA PAPAYA 500 ML.	UNIDAD
//SPRITE 500 ML.	UNIDAD
//AQUARIUS PERA 500ML.	UNIDAD
//AQUARIUS POMELO 500 ML.	UNIDAD
//AGUA VITAL 500 ML.	UNIDAD
//AGUA VITAL CON GAS 500 ML.	UNIDAD
//PEPSI 500 ML.	UNIDAD
//ANTÁRTICA 500 ML.	UNIDAD
//
//
//        PEPSI 1 L.	UNIDAD
//ANTARTICA 1 L.	UNIDAD
//
//
//        COCACOLA 2 L.	UNIDAD
//FANTA NARANJA 2 L.	UNIDAD
//FANTA GUARANA 2 L.	UNIDAD
//SPRITE 2L.	UNIDAD
//ACUARIOS PERA 2LT	UNIDAD
//AQUARIUS POMELO 2L.	UNIDAD
//
//        PEPSI 3 LT.	UNIDAD


//1
//BASICOS
//2
//SALSAS
//3
//GASEOSAS DE 300 ML.
//4
//GASEOSAS DE 500 ML.
//5
//GASEOSAS DE 1 LT.
//6
//GASEOSAS DE 2 LT.
//7
//GASEOSAS DE 3 LT.

        DB::table('insumos')->insert([
            ['name' => 'PAN', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'PAN LOMITO', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'CARNE', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'CARNE LOMITO', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'QUESO', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'MUZZARELLA', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'TOCINO', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'SALCHICHA', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'NUGGETS', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'PAPAS', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'HUEVO', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'ARROZ', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'CONTRA', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'PIERNA', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'ALA', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'PECHO', 'category_insumo_id' => 1, 'stock' => 0, 'unit' => 'UNIDAD'],

            ['name' => 'PEPINILLO', 'category_insumo_id' => 2, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'MAYOAJO', 'category_insumo_id' => 2, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'AMERICANA', 'category_insumo_id' => 2, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'CARAMELIZADA', 'category_insumo_id' => 2, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'BBQ', 'category_insumo_id' => 2, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'PIÑA', 'category_insumo_id' => 2, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'CHAMPIÑONES', 'category_insumo_id' => 2, 'stock' => 0, 'unit' => 'GRAMOS'],
            ['name' => 'COCA COLA 300 ML.', 'category_insumo_id' => 3, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'FANTA NARANJA 300 ML.', 'category_insumo_id' => 3, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'FANTA GUARANA 300 ML', 'category_insumo_id' => 3, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'SPRITE 300 ML.', 'category_insumo_id' => 3, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'AQUARIUS PERA 300 ML.', 'category_insumo_id' => 3, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'AQUARIUS POMELO 300 ML.', 'category_insumo_id' => 3, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'PEPSI 300 ML.', 'category_insumo_id' => 3, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'ANTÁRTICA 300 ML.', 'category_insumo_id' => 3, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'COCA COLA 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'COCA COLA S/AZUCAR', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'FANTA NARANJA 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'FANTA GUARANA 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'FANTA PAPAYA 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'SPRITE 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'AQUARIUS PERA 500ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'AQUARIUS POMELO 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'AGUA VITAL 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'AGUA VITAL CON GAS 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'PEPSI 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'ANTÁRTICA 500 ML.', 'category_insumo_id' => 4, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'PEPSI 1 L.', 'category_insumo_id' => 5, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'ANTARTICA 1 L.', 'category_insumo_id' => 5, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'COCACOLA 2 L.', 'category_insumo_id' => 6, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'FANTA NARANJA 2 L.', 'category_insumo_id' => 6, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'FANTA GUARANA 2 L.', 'category_insumo_id' => 6, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'SPRITE 2L.', 'category_insumo_id' => 6, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'ACUARIOS PERA 2LT', 'category_insumo_id' => 6, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'AQUARIUS POMELO 2L.', 'category_insumo_id' => 6, 'stock' => 0, 'unit' => 'UNIDAD'],
            ['name' => 'PEPSI 3 LT.', 'category_insumo_id' => 7, 'stock' => 0, 'unit' => 'UNIDAD'],
        ]);

    }
}
