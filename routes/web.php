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
    
    // M2 Data Master (Admin Only)
    Route::middleware('role:admin')->group(function () {
        Route::get('pengemudi/{pengemudi}/foto', [App\Http\Controllers\PengemudiController::class, 'foto'])->name('pengemudi.foto');
        Route::resource('pengemudi', App\Http\Controllers\PengemudiController::class);
        Route::resource('kendaraan', App\Http\Controllers\KendaraanController::class);
        
        // Import Excel
        Route::get('/import', [App\Http\Controllers\ImportController::class, 'showForm'])->name('import.form');
        Route::post('/import/kendaraan', [App\Http\Controllers\ImportController::class, 'import'])->name('import.kendaraan');
    });
});

require __DIR__.'/auth.php';
