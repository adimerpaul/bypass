<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deregistration extends Model
{
    use HasFactory;
    protected $fillable = ['quantity', 'price', 'total', 'insumo_id', 'user_id', 'date', 'status'];
    protected $hidden = ['created_at', 'updated_at'];
    public function insumo(){
        return $this->belongsTo(Insumo::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
