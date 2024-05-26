<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
//        101	BYPASS SIMPLE	PREPARADO	0	0	0		25
//102	BYPASS DOBLE 	PREPARADO	0	0	0		35
//103	BACON CHEESE	PREPARADO	0	0	0		25
//104	BACON CHEESE DOBLE	PREPARADO	0	1	-1		25
//105	BBQ CRUNCHY	PREPARADO	0	0	0		25
//106	BBQ CRUNCHY DOBLE	PREPARADO	0	1	-1		25
//107	BYPASS CLÀSICA	PREPARADO	0	0	0		25
//108	BYPASS CLÀSICA DOBLE	PREPARADO	0	0	0		35
//109	CHAMPIÑONES ARANJUEZ	PREPARADO	0	1	-1		35
//110	MEXICANAS JUAREZ	PREPARADO	0	0	0		35
//111	PIÑA TROPICAL	PREPARADO	0	0	0		35
//112	PORCION DE PAPA	PREPARADO	0	1	-1		8
//113	TOCINO EXTRA	PREPARADO	0	0	0		5
//114	0	PREPARADO	0	0	0		0
//115	0	PREPARADO	0	0	0		10
//116	0	PREPARADO	0	0	0		0
//117	SALCHIPAPA SIMPLE	PREPARADO	0	0	0		18
//118	NUGGET	PREPARADO	0	0	0		20
//119	SALCHI-NUGGET	PREPARADO	0	0	0		22
//120	PEDIDOS YA	PREPARADO	0	0	0		-6
//121	PEPSI 300 ML.	BOTELLA	31	0	31		5
//122	ANTÁRTICA 300 ML.	BOTELLA	0	0	0		5
//123	COCACOLA 300 ML.	BOTELLA	13	0	13		5
//124	FANTA NARANJA 300 ML.	BOTELLA	37	0	37		5
//125	SPRITE 300 ML.	BOTELLA	42	0	42		5
//126	AQUARIUS PERA 300 ML.	BOTELLA	12	0	12		5
//127	AQUARIUS POMELO 300 ML.	BOTELLA	10	0	10		5
//128	PEPSI 500 ML.	BOTELLA	30	0	30		8
//129	GUARANA ANTÁRTICA 500 ML.	BOTELLA	13	0	13		8
//130	COCA COLA 500 ML.	BOTELLA	21	1	20		8
//131	COCA COLA S/AZUCAR	BOTELLA	28	0	28		8
//132	FANTA NARANJA 500 ML.	BOTELLA	35	0	35		8
//133	FANTA GUARANA 500 ML.	BOTELLA	17	0	17		8
//134	SPRITE 500 ML.	BOTELLA	26	0	26		8
//135	AGUA VITAL 500 ML.	BOTELLA	18	0	18		6
//136	AGUA VITAL CON GAS 500 ML.	BOTELLA	1	0	1		6
//137	AGUA VILLA SANTA 500 ML.	BOTELLA	0	0	0		5
//138	POWERADE ROJO 500 ML.	BOTELLA	1	0	1		8
//139	POWERADE AZUL 500 ML.	BOTELLA	0	0	0		8
//140	SANTÉ ROJO 500 ML.	BOTELLA	12	0	12		8
//141	SANTÉ AZUL 500 ML.	BOTELLA	31	0	31		8
//142	CICLON	BOTELLA	65	0	65		6
//143	VOLT	BOTELLA	0	0	0		6
//144	ADES 1 L.	BOTELLA	0	0	0		16
//145	ANTARTICA 1 L.	BOTELLA	0	0	0		12
//146	SIMBA 2 L.	BOTELLA	8	0	8		12
//147	COCACOLA 2 L.	BOTELLA	6	1	5		15
//148	FANTA NARANJA 2 L.	BOTELLA	8	0	8		15
//149	FANTA GUARANA 300 ML	BOTELLA	10	0	10		5
//150	PEPSI LIGHT 500 ML	BOTELLA	14	0	14		8
//151	PEPSI 1 L.	BOTELLA	0	0	0		12
//152	FANTA GUARANA 2 L.	BOTELLA	0	0	0		15
//153	ICE TE	BOTELLA	0	2	-2		6



//  category       ['name' => 'Hamburguesas','icon'=>'fa-solid fa-burger'],
//            ['name' => 'Refrescos y Bebidas','icon'=>'fa-solid fa-glass'],
//            ['name' => 'Acompañamientos','icon'=>'fa-solid fa-fries'],
//            ['name' => 'Postres','icon'=>'fa-solid fa-ice-cream'],
//            ['name' => 'Combos','icon'=>'fa-solid fa-box'],
//            ['name' => 'Promociones','icon'=>'fa-solid fa-percent'],
        DB::table('products')->insert([
            [
                'name' => 'BYPASS SIMPLE',
                'image' => 'hamburger.png',
                'price' => 25.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'BYPASS DOBLE',
                'image' => 'hamburger.png',
                'price' => 35.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'BACON CHEESE',
                'image' => 'hamburger.png',
                'price' => 25.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'BACON CHEESE DOBLE',
                'image' => 'hamburger.png',
                'price' => 25.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'BBQ CRUNCHY',
                'image' => 'hamburger.png',
                'price' => 25.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'BBQ CRUNCHY DOBLE',
                'image' => 'hamburger.png',
                'price' => 25.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'BYPASS CLÀSICA',
                'image' => 'hamburger.png',
                'price' => 25.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'BYPASS CLÀSICA DOBLE',
                'image' => 'hamburger.png',
                'price' => 35.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'CHAMPIÑONES ARANJUEZ',
                'image' => 'hamburger.png',
                'price' => 35.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'MEXICANAS JUAREZ',
                'image' => 'hamburger.png',
                'price' => 35.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'PIÑA TROPICAL',
                'image' => 'hamburger.png',
                'price' => 35.00,
                'stock' => 0, 'category_id' => 1,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'PORCION DE PAPA',
                'image' => 'fries.png',
                'price' => 8.00,
                'stock' => 0, 'category_id' => 3,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'TOCINO EXTRA',
                'image' => 'bacon.png',
                'price' => 5.00,
                'stock' => 0, 'category_id' => 3,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'SALCHIPAPA SIMPLE',
                'image' => 'fries.png',
                'price' => 18.00,
                'stock' => 0, 'category_id' => 3,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'NUGGET',
                'image' => 'nuggets.png',
                'price' => 20.00,
                'stock' => 0, 'category_id' => 3,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'SALCHI-NUGGET',
                'image' => 'nuggets.png',
                'price' => 22.00,
                'stock' => 0, 'category_id' => 3,
                'unidad' => 'PREPARADO',
            ],
            [
                'name' => 'PEPSI 300 ML.',
                'image' => 'pepsi.png',
                'price' => 5.00,
                'stock' => 31, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'ANTÁRTICA 300 ML.',
                'image' => 'antarctica.png',
                'price' => 5.00,
                'stock' => 0, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'COCACOLA 300 ML.',
                'image' => 'cocacola.png',
                'price' => 5.00,
                'stock' => 13, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'FANTA NARANJA 300 ML.',
                'image' => 'fanta.png',
                'price' => 5.00,
                'stock' => 37, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'SPRITE 300 ML.',
                'image' => 'sprite.png',
                'price' => 5.00,
                'stock' => 42, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'AQUARIUS PERA 300 ML.',
                'image' => 'aquarius.png',
                'price' => 5.00,
                'stock' => 12, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'AQUARIUS POMELO 300 ML.',
                'image' => 'aquarius.png',
                'price' => 5.00,
                'stock' => 10, 'category_id' => 2,
                'unidad' =>'BOTELLA'
            ],
            [
                'name' => 'PEPSI 500 ML.',
                'image' => 'pepsi.png',
                'price' => 8.00,
                'stock' => 30, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'GUARANA ANTÁRTICA 500 ML.',
                'image' => 'antarctica.png',
                'price' => 8.00,
                'stock' => 13, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'COCA COLA 500 ML.',
                'image' => 'cocacola.png',
                'price' => 8.00,
                'stock' => 21, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'COCA COLA S/AZUCAR',
                'image' => 'cocacola.png',
                'price' => 8.00,
                'stock' => 28, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'FANTA NARANJA 500 ML.',
                'image' => 'fanta.png',
                'price' => 8.00,
                'stock' => 35, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'FANTA GUARANA 500 ML.',
                'image' => 'fanta.png',
                'price' => 8.00,
                'stock' => 17, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'SPRITE 500 ML.',
                'image' => 'sprite.png',
                'price' => 8.00,
                'stock' => 26, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'AGUA VITAL 500 ML.',
                'image' => 'water.png',
                'price' => 6.00,
                'stock' => 18, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'AGUA VITAL CON GAS 500 ML.',
                'image' => 'water.png',
                'price' => 6.00,
                'stock' => 1, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'AGUA VILLA SANTA 500 ML.',
                'image' => 'water.png',
                'price' => 5.00,
                'stock' => 0, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'POWERADE ROJO 500 ML.',
                'image' => 'powerade.png',
                'price' => 8.00,
                'stock' => 1, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'POWERADE AZUL 500 ML.',
                'image' => 'powerade.png',
                'price' => 8.00,
                'stock' => 0, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'SANTÉ ROJO 500 ML.',
                'image' => 'sante.png',
                'price' => 8.00,
                'stock' => 12, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'SANTÉ AZUL 500 ML.',
                'image' => 'sante.png',
                'price' => 8.00,
                'stock' => 31, 'category_id' => 2,
                'user_id' => 1
            ],
            [
                'name' => 'CICLON',
                'image' => 'ciclon.png',
                'price' => 6.00,
                'stock' => 65, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'VOLT',
                'image' => 'volt.png',
                'price' => 6.00,
                'stock' => 0, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'ADES 1 L.',
                'image' => 'ades.png',
                'price' => 16.00,
                'stock' => 0, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'ANTARTICA 1 L.',
                'image' => 'antarctica.png',
                'price' => 12.00,
                'stock' => 0, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'SIMBA 2 L.',
                'image' => 'simba.png',
                'price' => 12.00,
                'stock' => 8, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'COCACOLA 2 L.',
                'image' => 'cocacola.png',
                'price' => 15.00,
                'stock' => 5, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'FANTA NARANJA 2 L.',
                'image' => 'fanta.png',
                'price' => 15.00,
                'stock' => 8, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'FANTA GUARANA 300 ML',
                'image' => 'fanta.png',
                'price' => 5.00,
                'stock' => 10, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'PEPSI LIGHT 500 ML',
                'image' => 'pepsi.png',
                'price' => 8.00,
                'stock' => 14, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'PEPSI 1 L.',
                'image' => 'pepsi.png',
                'price' => 12.00,
                'stock' => 0, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'FANTA GUARANA 2 L.',
                'image' => 'fanta.png',
                'price' => 15.00,
                'stock' => 0, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
            [
                'name' => 'ICE TE',
                'image' => 'icete.png',
                'price' => 6.00,
                'stock' => 0, 'category_id' => 2,
                'unidad' => 'BOTELLA',
            ],
        ]);
    }
}
