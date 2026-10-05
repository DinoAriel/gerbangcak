<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScannerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

// Hasil scan QR. Route ini sengaja TIDAK memakai middleware auth agar publik yang
// memindai QR bisa diarahkan ke halaman "Akses Terbatas", bukan error 403/404 mentah.
// Proteksi data dilakukan di dalam ScannerController.
Route::get('/scan/{kode_unik}', [ScannerController::class, 'scan'])->name('scan.result');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route foto pengemudi - bisa diakses admin & petugas (untuk scan result)
    Route::get('pengemudi/{pengemudi}/foto', [App\Http\Controllers\PengemudiController::class, 'foto'])->name('pengemudi.foto');

    // M2 Data Master (Admin Only)
    Route::middleware('role:admin')->group(function () {
        Route::resource('pengemudi', App\Http\Controllers\PengemudiController::class);
        Route::get('kendaraan/print-all', [App\Http\Controllers\KendaraanController::class, 'printAll'])->name('kendaraan.print-all');
        Route::resource('kendaraan', App\Http\Controllers\KendaraanController::class);
    });

    // Akses Kamera (Khusus Admin & Petugas)
    Route::middleware('role:admin|petugas')->group(function () {
        Route::get('/petugas/scanner', function () {
            return Inertia::render('Scanner/Camera');
        })->name('scanner.camera');
    });
});

require __DIR__.'/auth.php';
