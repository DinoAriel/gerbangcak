<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\Pengemudi;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KendaraanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $kategori = $request->input('kategori');

        $kendaraans = Kendaraan::with('pengemudis')
            ->when($search, function ($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('nomor_kendaraan', 'like', "%{$search}%")
                      ->orWhere('perusahaan', 'like', "%{$search}%")
                      ->orWhere('brand', 'like', "%{$search}%");
                });
            })
            ->when($kategori, function ($query, $kategori) {
                $query->where('kategori', $kategori);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $kategoris = Kendaraan::select('kategori')->distinct()->orderBy('kategori')->pluck('kategori');

        return Inertia::render('Kendaraan/Index', [
            'kendaraans' => $kendaraans,
            'kategoris' => $kategoris,
            'filters' => $request->only(['search', 'kategori']),
        ]);
    }

    public function create()
    {
        $pengemudis = Pengemudi::orderBy('nama')->get(['id', 'nama']);

        return Inertia::render('Kendaraan/Create', [
            'pengemudis' => $pengemudis,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori' => 'required|string|max:100',
            'perusahaan' => 'required|string|max:100',
            'brand' => 'required|string|max:100',
            'nomor_kendaraan' => 'required|string|max:50|unique:kendaraans',
            'tahun_pembuatan' => 'required|integer|min:1900|max:2100',
            'pengemudi_ids' => 'array',
            'pengemudi_ids.*' => 'exists:pengemudis,id',
        ]);

        $kendaraan = Kendaraan::create([
            'kode_unik' => Str::random(8),
            'kategori' => $validated['kategori'],
            'perusahaan' => $validated['perusahaan'],
            'brand' => $validated['brand'],
            'nomor_kendaraan' => $validated['nomor_kendaraan'],
            'tahun_pembuatan' => $validated['tahun_pembuatan'],
        ]);

        if (! empty($validated['pengemudi_ids'])) {
            $kendaraan->pengemudis()->sync($validated['pengemudi_ids']);
        }

        return redirect()->route('kendaraan.index')->with('success', 'Kendaraan berhasil ditambahkan.');
    }

    public function edit(Kendaraan $kendaraan)
    {
        $pengemudis = Pengemudi::orderBy('nama')->get(['id', 'nama']);

        return Inertia::render('Kendaraan/Edit', [
            'kendaraan' => $kendaraan->load('pengemudis'),
            'pengemudis' => $pengemudis,
        ]);
    }

    public function update(Request $request, Kendaraan $kendaraan)
    {
        $validated = $request->validate([
            'kategori' => 'required|string|max:100',
            'perusahaan' => 'required|string|max:100',
            'brand' => 'required|string|max:100',
            'nomor_kendaraan' => 'required|string|max:50|unique:kendaraans,nomor_kendaraan,'.$kendaraan->id,
            'tahun_pembuatan' => 'required|integer|min:1900|max:2100',
            'pengemudi_ids' => 'array',
            'pengemudi_ids.*' => 'exists:pengemudis,id',
        ]);

        $kendaraan->update([
            'kategori' => $validated['kategori'],
            'perusahaan' => $validated['perusahaan'],
            'brand' => $validated['brand'],
            'nomor_kendaraan' => $validated['nomor_kendaraan'],
            'tahun_pembuatan' => $validated['tahun_pembuatan'],
        ]);

        $kendaraan->pengemudis()->sync($validated['pengemudi_ids'] ?? []);

        return redirect()->route('kendaraan.index')->with('success', 'Kendaraan berhasil diperbarui.');
    }

    public function destroy(Kendaraan $kendaraan)
    {
        $kendaraan->pengemudis()->detach();
        $kendaraan->delete();

        return redirect()->route('kendaraan.index')->with('success', 'Kendaraan berhasil dihapus.');
    }
}
