<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boat extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'company_id', 'color'];
    public function company(){
        return $this->belongsTo(Company::class);
    }
    protected $hidden = ['created_at', 'updated_at'];
}
