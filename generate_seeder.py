import json

# Baca data hasil ekstraksi
with open(r'c:\kuliah\gerbang\gerbangcak\excel_full_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

kendaraans = data['kendaraans']
pengemudis = data['pengemudis']
relations = data['relations']

print(f"Kendaraan: {len(kendaraans)}, Pengemudi: {len(pengemudis)}, Relasi: {len(relations)}")
print(f"Pengemudi dgn foto: {sum(1 for p in pengemudis if p['foto'])}")

# =============================================
# GENERATE KendaraanSeeder.php
# =============================================
lines = []
lines.append('<?php')
lines.append('')
lines.append('namespace Database\\Seeders;')
lines.append('')
lines.append('use Illuminate\\Database\\Seeder;')
lines.append('use Illuminate\\Support\\Facades\\DB;')
lines.append('')
lines.append('class KendaraanSeeder extends Seeder')
lines.append('{')
lines.append('    public function run(): void')
lines.append('    {')
lines.append('        DB::table(\'kendaraans\')->truncate();')
lines.append('')
lines.append('        $data = [')

for k in kendaraans:
    lines.append(f"            [")
    lines.append(f"                'kode_unik'       => '{k['kode_unik']}',")
    lines.append(f"                'kategori'        => '{k['kategori']}',")
    lines.append(f"                'perusahaan'      => '{k['perusahaan']}',")
    lines.append(f"                'brand'           => '{k['brand']}',")
    lines.append(f"                'nomor_kendaraan' => '{k['nomor_kendaraan']}',")
    lines.append(f"                'tahun_pembuatan' => {k['tahun_pembuatan']},")
    lines.append(f"                'created_at'      => now(),")
    lines.append(f"                'updated_at'      => now(),")
    lines.append(f"            ],")

lines.append('        ];')
lines.append('')
lines.append('        DB::table(\'kendaraans\')->insert($data);')
lines.append('    }')
lines.append('}')

with open(r'c:\kuliah\gerbang\gerbangcak\database\seeders\KendaraanSeeder.php', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("KendaraanSeeder.php generated!")

# =============================================
# GENERATE PengemudiSeeder.php (dengan foto BLOB base64)
# =============================================
lines2 = []
lines2.append('<?php')
lines2.append('')
lines2.append('namespace Database\\Seeders;')
lines2.append('')
lines2.append('use Illuminate\\Database\\Seeder;')
lines2.append('use Illuminate\\Support\\Facades\\DB;')
lines2.append('')
lines2.append('class PengemudiSeeder extends Seeder')
lines2.append('{')
lines2.append('    public function run(): void')
lines2.append('    {')
lines2.append('        DB::table(\'kendaraan_pengemudi\')->truncate();')
lines2.append('        DB::table(\'pengemudis\')->truncate();')
lines2.append('')

# Insert satu persatu karena ada BLOB
for p in pengemudis:
    nama_escaped = p['nama'].replace("'", "\\'")
    if p['foto']:
        # Simpan foto sebagai binary dari base64
        lines2.append(f"        DB::table('pengemudis')->insert([")
        lines2.append(f"            'nama'      => '{nama_escaped}',")
        lines2.append(f"            'no_hp'     => '-',")
        lines2.append(f"            'no_sim'    => '-',")
        lines2.append(f"            'status'    => 'aktif',")
        lines2.append(f"            'foto'      => base64_decode('{p['foto']}'),")
        lines2.append(f"            'foto_mime' => '{p['foto_mime']}',")
        lines2.append(f"            'created_at' => now(),")
        lines2.append(f"            'updated_at' => now(),")
        lines2.append(f"        ]);")
    else:
        lines2.append(f"        DB::table('pengemudis')->insert([")
        lines2.append(f"            'nama'      => '{nama_escaped}',")
        lines2.append(f"            'no_hp'     => '-',")
        lines2.append(f"            'no_sim'    => '-',")
        lines2.append(f"            'status'    => 'aktif',")
        lines2.append(f"            'foto'      => null,")
        lines2.append(f"            'foto_mime' => null,")
        lines2.append(f"            'created_at' => now(),")
        lines2.append(f"            'updated_at' => now(),")
        lines2.append(f"        ]);")

lines2.append('')
lines2.append('        // Relasi kendaraan <-> pengemudi')
lines2.append('        $relations = [')
for r in relations:
    lines2.append(f"            ['kendaraan_id' => {r['kendaraan_id']}, 'pengemudi_id' => {r['pengemudi_id']}, 'created_at' => now(), 'updated_at' => now()],")
lines2.append('        ];')
lines2.append('        DB::table(\'kendaraan_pengemudi\')->insert($relations);')
lines2.append('    }')
lines2.append('}')

with open(r'c:\kuliah\gerbang\gerbangcak\database\seeders\PengemudiSeeder.php', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines2))

print("PengemudiSeeder.php generated!")
print(f"\nFile sizes:")
import os
print(f"  KendaraanSeeder.php: {os.path.getsize(r'c:\kuliah\gerbang\gerbangcak\database\seeders\KendaraanSeeder.php'):,} bytes")
print(f"  PengemudiSeeder.php: {os.path.getsize(r'c:\kuliah\gerbang\gerbangcak\database\seeders\PengemudiSeeder.php'):,} bytes")
