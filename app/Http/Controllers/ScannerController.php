<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use Inertia\Inertia;

class ScannerController extends Controller
{
    /**
     * Handle the QR code scan.
     *
     * Route ini terbuka untuk publik (tanpa auth) agar pemindai QR yang belum login
     * diarahkan ke halaman "Akses Terbatas", bukan error mentah. Data kendaraan
     * hanya ditampilkan apabila pengguna merupakan admin/petugas.
     */
    public function scan($kode_unik)
    {
        $user = request()->user();

        // Publik / belum login -> halaman Akses Terbatas.
        if (! $user) {
            return Inertia::render('Scanner/AccessDenied', [
                'kode' => $kode_unik,
            ]);
        }

        // Login tetapi bukan admin/petugas -> tetap tolak.
        if (! in_array($user->role, ['admin', 'petugas'])) {
            return Inertia::render('Scanner/AccessDenied', [
                'kode' => $kode_unik,
            ]);
        }

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
                'status'     => $isActive ? 'AKTIF' : 'TIDAK AKTIF',
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
            'drivers' => $drivers,
        ];

        return Inertia::render('Scanner/ScanResult', [
            'kendaraan' => $dataKendaraan,
        ]);
    }
}
