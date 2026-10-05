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
        // Foto lama disimpan sebagai binary di kolom `foto`; formatnya tidak
        // kompatibel dengan penyimpanan berbasis path, jadi kita kosongkan.
        DB::table('pengemudis')->update(['foto' => null]);

        Schema::table('pengemudis', function (Blueprint $table) {
            $table->dropColumn('foto_mime');
        });

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE pengemudis MODIFY foto VARCHAR(255) NULL');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengemudis', function (Blueprint $table) {
            $table->string('foto_mime')->nullable()->after('foto');
        });

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE pengemudis MODIFY foto MEDIUMBLOB NULL');
        }
    }
};
