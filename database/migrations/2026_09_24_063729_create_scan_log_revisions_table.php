<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scan_log_revisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scan_log_id')->constrained()->cascadeOnDelete();
            $table->boolean('fisik_ok_before');
            $table->boolean('driver_ok_before');
            $table->string('hasil_before');
            $table->text('catatan_before')->nullable();
            $table->boolean('fisik_ok_after');
            $table->boolean('driver_ok_after');
            $table->string('hasil_after');
            $table->text('catatan_after')->nullable();
            $table->text('alasan');
            $table->foreignId('edited_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scan_log_revisions');
    }
};
