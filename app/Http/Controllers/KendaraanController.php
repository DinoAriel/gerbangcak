<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\Pengemudi;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KendaraanController extends Controller
{
    public function index()
    {
        $kendaraans = Kendaraan::with('pengemudis')->latest()->paginate(10);

        return Inertia::render('Kendaraan/Index', [
            'kendaraans' => $kendaraans,
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
