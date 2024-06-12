<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diario extends Model{
    use HasFactory;
    protected $fillable = ['item', 'medida', 'insumo_id', 'inicio', 'ingreso', 'egreso', 'ventas', 'cierre', 'local', 'status', 'date', 'category_insumo_id'];
    protected $hidden = ['created_at', 'updated_at'];
    public function insumo(){
        return $this->belongsTo(Insumo::class);
    }
    public function categoryInsumo(){
        return $this->belongsTo(CategoryInsumo::class);
    }
}
