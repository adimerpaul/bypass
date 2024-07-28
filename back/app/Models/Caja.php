<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caja extends Model
{
    use HasFactory;
    protected $fillable = ['fecha', 'hora', 'monto', 'descripcion'];
    protected $hidden = ['created_at', 'updated_at'];
}
