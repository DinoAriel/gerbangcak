<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kendaraan extends Model
{
    protected $guarded = [];

    public function pengemudis()
    {
        return $this->belongsToMany(Pengemudi::class, 'kendaraan_pengemudi');
    }
}
