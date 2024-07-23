<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'time', 'total', 'name', 'user_id', 'client_id','descripcion', 'type', 'status', 'mesa', 'pago', 'numero', 'comment'];
    protected $hidden = ['created_at', 'updated_at'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function details()
    {
        return $this->hasMany(Detail::class);
    }
//    protected $appends = ['textDetail'];
//    public function getTextDetailAttribute()
//    {
//        $text = '';
//        foreach ($this->details as $detail) {
//            $text = $text.$detail->quantity.' '. strtolower($detail->product).' ';
//        }
//        return $text;
//    }
}
