<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengemudis', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('no_hp');
            $table->string('no_sim');
            $table->string('status');
            $table->binary('foto')->nullable();
            $table->string('foto_mime')->nullable();
            $table->timestamps();
        });

        // MySQL: naikkan tipe kolom ke MEDIUMBLOB agar aman menampung foto.
        // SQLite tidak mendukung MEDIUMBLOB, tapi tipe BLOB-nya sudah cukup.
        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE pengemudis MODIFY foto MEDIUMBLOB NULL');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengemudis');
    }
};
