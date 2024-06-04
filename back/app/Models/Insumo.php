<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insumo extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'category_insumo_id', 'stock', 'unit', 'status'];
    public function categoryInsumo(){
        return $this->belongsTo(CategoryInsumo::class)->select('id', 'name');
    }
    protected $hidden = ['created_at', 'updated_at'];
}
