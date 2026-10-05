<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\Pengemudi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Tampilkan halaman dashboard.
     *
     * Menyajikan data statistik sesuai role:
     * - admin : statistik lengkap, distribusi kategori, dan top perusahaan.
     * - petugas : ringkasan jumlah kendaraan & pengemudi saja.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $stats = [
            'total_kendaraan'   => Kendaraan::count(),
            'total_pengemudi'   => Pengemudi::count(),
            'pengemudi_aktif'   => Pengemudi::whereRaw('LOWER(status) = ?', ['aktif'])->count(),
            'pengemudi_nonaktif' => Pengemudi::whereRaw('LOWER(status) <> ?', ['aktif'])->count(),
        ];

        // Data khusus admin: distribusi kategori & top perusahaan.
        $kategoriChart = [];
        $topPerusahaan = [];

        if ($user->role === 'admin') {
            $kategoriChart = Kendaraan::selectRaw('kategori, COUNT(*) as total')
                ->groupBy('kategori')
                ->orderByDesc('total')
                ->get()
                ->map(fn ($item) => [
                    'label' => $item->kategori,
                    'total' => (int) $item->total,
                ])
                ->values();

            $topPerusahaan = Kendaraan::selectRaw('perusahaan, COUNT(*) as total')
                ->groupBy('perusahaan')
                ->orderByDesc('total')
                ->limit(5)
                ->get()
                ->map(fn ($item) => [
                    'label' => $item->perusahaan,
                    'total' => (int) $item->total,
                ])
                ->values();
        }

        return Inertia::render('Dashboard', [
            'stats'          => $stats,
            'kategoriChart'  => $kategoriChart,
            'topPerusahaan'  => $topPerusahaan,
        ]);
    }
}
