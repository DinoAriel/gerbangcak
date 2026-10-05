<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengemudi extends Model
{
    protected $guarded = [];

    protected $hidden = ['foto'];
    
    protected $appends = ['has_foto'];

    public function getHasFotoAttribute()
    {
        return !empty($this->attributes['foto']);
    }

    public function kendaraans()
    {
        return $this->belongsToMany(Kendaraan::class, 'kendaraan_pengemudi');
    }
}
