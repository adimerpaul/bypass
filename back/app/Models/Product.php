<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image', 'price', 'status', 'stock', 'category_id', 'company_id','costo'];
    public function category(){
        return $this->belongsTo(Category::class)->select('id', 'name');
    }
    protected $hidden = ['created_at', 'updated_at'];
}
