<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'image', 'price', 'status', 'stock', 'category_id', 'user_id', 'company_id','costo'];
    protected $hidden = ['created_at', 'updated_at'];
}
