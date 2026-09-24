<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScannerController extends Controller
{
    /**
     * Handle the QR code scan.
     */
    public function scan($kode_unik)
    {
        $kendaraan = Kendaraan::with('pengemudis')->where('kode_unik', $kode_unik)->firstOrFail();

        // Format the drivers
        $drivers = $kendaraan->pengemudis->map(function ($driver) {
            return [
                'id' => $driver->id,
                'nik_driver' => $driver->nik,
                'nama' => $driver->nama,
                // Using the specific route if has photo, else fallback or empty
                'foto' => $driver->has_foto ? route('pengemudi.foto', $driver->id) : null,
                'sim' => 'SIM ' . $driver->jenis_sim, // Assuming jenis_sim field exists, adjust if different
                'status' => 'AKTIF', // You can use driver's actual status if present
                'isActive' => true,
            ];
        });

        // Format the vehicle data exactly as ScanResult.jsx expects
        $dataKendaraan = [
            'kategori' => $kendaraan->kategori,
            'perusahaan' => $kendaraan->perusahaan,
            'brand' => $kendaraan->brand,
            'nomor_kendaraan' => $kendaraan->nomor_kendaraan,
            'tahun_pembuatan' => $kendaraan->tahun_pembuatan,
            'masa_berlaku' => 'Aktif s/d ' . ($kendaraan->tahun_pembuatan + 5), // Example logic
            'drivers' => $drivers,
        ];

        return Inertia::render('Scanner/ScanResult', [
            'kendaraan' => $dataKendaraan,
        ]);
    }
}
