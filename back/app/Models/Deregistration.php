<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deregistration extends Model
{
    use HasFactory;
    protected $fillable = ['quantity', 'price', 'total', 'insumo_id', 'user_id', 'date'];
    protected $hidden = ['created_at', 'updated_at'];
}
