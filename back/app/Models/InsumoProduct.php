<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsumoProduct extends Model
{
    use HasFactory;
    protected $fillable = ['insumo_id', 'product_id', 'quantity', 'status'];
    public function insumo(){
        return $this->belongsTo(Insumo::class)->select('id', 'name');
    }
    public function product(){
        return $this->belongsTo(Product::class)->select('id', 'name');
    }
}
