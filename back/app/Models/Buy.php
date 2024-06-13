<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buy extends Model
{
    use HasFactory;
    protected $fillable = ['insumo_id', 'user_id', 'quantity', 'price', 'total', 'status', 'date'];
    protected $hidden = ['created_at', 'updated_at'];
    public function insumo(){
        return $this->belongsTo(Insumo::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
