<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsumoSale extends Model{
    use HasFactory;
    protected $fillable = ['insumo_id', 'sale_id', 'quantity', 'status', 'date', 'user_id'];
    protected $hidden = ['created_at', 'updated_at'];
}
