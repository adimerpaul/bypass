<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image', 'price', 'costo', 'status', 'unidad', 'stock', 'category_id'];
    public function category(){
        return $this->belongsTo(Category::class)->select('id', 'name');
    }
    public function company(){
        return $this->belongsTo(Company::class)->select('id', 'name');
    }
    public function insumos(){
        return $this->belongsToMany(Insumo::class, 'insumo_products')
            ->withPivot('quantity','id');
//            ->select('insumos.id', 'insumos.name', 'insumo_products.quantity');
    }
    protected $hidden = ['created_at', 'updated_at'];
}
