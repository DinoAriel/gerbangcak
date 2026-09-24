<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengemudi extends Model
{
    protected $guarded = [];

    public function kendaraans()
    {
        return $this->belongsToMany(Kendaraan::class, 'kendaraan_pengemudi');
    }
}
