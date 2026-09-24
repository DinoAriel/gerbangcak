<?php

namespace App\Imports;

use App\Models\Kendaraan;
use App\Models\Pengemudi;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Support\Collection;

class KendaraanImport implements ToCollection, WithHeadingRow
{
    /** @var array<int, string> */
    public array $errors = [];

    /** @var int */
    public int $imported = 0;

    /**
     * Map kolom Excel ke field model.
     * Header baris pertama file Excel harus cocok:
     *   kategori_angkutan | nama_perusahaan | brand | nopol | tahun_pembuatan | pengemudi
     *
     * Kolom "pengemudi" dapat berisi satu nama atau beberapa nama dipisah koma.
     *
     * @param Collection $rows
     */
    public function collection(Collection $rows): void
    {
        foreach ($rows as $index => $row) {
            $rowNum = $index + 2; // +2 karena baris 1 = header

            $nopol = trim((string) ($row['nopol'] ?? ''));
            $kategori = trim((string) ($row['kategori_angkutan'] ?? ''));
            $perusahaan = trim((string) ($row['nama_perusahaan'] ?? ''));
            $brand = trim((string) ($row['brand'] ?? ''));
            $tahun = (int) ($row['tahun_pembuatan'] ?? 0);
            $pengemudiRaw = trim((string) ($row['pengemudi'] ?? ''));

            if (empty($nopol)) {
                $this->errors[] = "Baris {$rowNum}: Kolom 'nopol' kosong, dilewati.";
                continue;
            }

            // Buat atau update kendaraan berdasarkan nopol
            $kendaraan = Kendaraan::firstOrCreate(
                ['nomor_kendaraan' => $nopol],
                [
                    'kode_unik'       => Str::random(8),
                    'kategori'        => $kategori,
                    'perusahaan'      => $perusahaan,
                    'brand'           => $brand,
                    'tahun_pembuatan' => $tahun,
                ]
            );

            // Update jika sudah ada
            if (! $kendaraan->wasRecentlyCreated) {
                $kendaraan->update([
                    'kategori'        => $kategori,
                    'perusahaan'      => $perusahaan,
                    'brand'           => $brand,
                    'tahun_pembuatan' => $tahun,
                ]);
            }

            // Proses pengemudi (bisa lebih dari satu, dipisah koma)
            if (! empty($pengemudiRaw)) {
                $namaList = array_map('trim', explode(',', $pengemudiRaw));
                $pengemudiIds = [];

                foreach ($namaList as $nama) {
                    if (empty($nama)) {
                        continue;
                    }

                    $pengemudi = Pengemudi::firstOrCreate(
                        ['nama' => $nama],
                        [
                            'no_hp'  => '-',
                            'no_sim' => '-',
                            'status' => 'Aktif',
                        ]
                    );

                    $pengemudiIds[] = $pengemudi->id;
                }

                // Sync (tambah tanpa menghapus yang sudah ada)
                $kendaraan->pengemudis()->syncWithoutDetaching($pengemudiIds);
            }

            $this->imported++;
        }
    }
}
