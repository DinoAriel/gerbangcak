<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

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
        
        // Import Excel
        Route::get('/import', [App\Http\Controllers\ImportController::class, 'showForm'])->name('import.form');
        Route::post('/import/kendaraan', [App\Http\Controllers\ImportController::class, 'import'])->name('import.kendaraan');
    });
    // Akses Kamera (Khusus Admin & Petugas)
    Route::middleware('role:admin|petugas')->group(function () {
        Route::get('/petugas/scanner', function () {
            return Inertia::render('Scanner/Camera');
        })->name('scanner.camera');
    });

    // Fitur Hasil Scan URL (Terkunci untuk Auth - Admin & Petugas)
    Route::middleware('role:admin|petugas')->group(function () {
        Route::get('/scan/{kode_unik}', [App\Http\Controllers\ScannerController::class, 'scan'])->name('scan.result');
    });
});

require __DIR__.'/auth.php';
