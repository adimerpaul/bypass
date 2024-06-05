<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diario extends Model{
    use HasFactory;
    protected $fillable = ['item', 'medida', 'insumo_id', 'inicio', 'ingreso', 'egreso', 'ventas', 'cierre', 'local', 'status', 'date'];
}
