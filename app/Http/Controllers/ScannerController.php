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
            // Generate URL foto dengan aman
            $fotoUrl = null;
            if ($driver->has_foto) {
                try {
                    $fotoUrl = route('pengemudi.foto', $driver->id);
                } catch (\Exception $e) {
                    $fotoUrl = null;
                }
            }

            $isActive = strtolower($driver->status ?? 'aktif') === 'aktif';

            return [
                'id'         => $driver->id,
                'nik_driver' => $driver->no_sim ?? '-',
                'nama'       => $driver->nama,
                'foto'       => $fotoUrl,
                'sim'        => 'SIM ' . ($driver->no_sim ?? '-'),
                'status'     => strtoupper($driver->status ?? 'AKTIF'),
                'isActive'   => $isActive,
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
