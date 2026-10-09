<?php

namespace App\Http\Controllers;

use App\Models\Pengemudi;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\JpegEncoder;
use Intervention\Image\ImageManager;

class PengemudiController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $pengemudis = Pengemudi::when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('no_sim', 'like', "%{$search}%")
                  ->orWhere('no_ktp', 'like', "%{$search}%");
            });
        })->when($status, function ($query, $status) {
            $query->where('status', $status);
        })->latest()->orderBy('id', 'desc')->paginate(10)->withQueryString();

        $statuses = Pengemudi::select('status')->distinct()->orderBy('status')->pluck('status');

        return Inertia::render('Pengemudi/Index', [
            'pengemudis' => $pengemudis,
            'statuses' => $statuses,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Pengemudi/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'no_ktp' => 'nullable|string|max:50',
            'no_hp' => 'required|string|max:20',
            'no_sim' => 'required|string|max:30',
            'status' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = [
            'nama' => $validated['nama'],
            'no_ktp' => $validated['no_ktp'] ?? null,
            'no_hp' => $validated['no_hp'],
            'no_sim' => $validated['no_sim'],
            'status' => $validated['status'],
        ];

        if ($request->hasFile('foto')) {
            $path = 'foto/' . Str::uuid() . '.jpg';
            Storage::disk('public')->put($path, $this->processImage($request->file('foto')));
            $data['foto'] = $path;
        }

        Pengemudi::create($data);

        return redirect()->route('pengemudi.index')->with('success', 'Pengemudi berhasil ditambahkan.');
    }

    public function edit(Pengemudi $pengemudi)
    {
        return Inertia::render('Pengemudi/Edit', [
            'pengemudi' => $pengemudi->only(['id', 'nama', 'no_ktp', 'no_hp', 'no_sim', 'status']),
        ]);
    }

    public function update(Request $request, Pengemudi $pengemudi)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'no_ktp' => 'nullable|string|max:50',
            'no_hp' => 'required|string|max:20',
            'no_sim' => 'required|string|max:30',
            'status' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = [
            'nama' => $validated['nama'],
            'no_ktp' => $validated['no_ktp'] ?? null,
            'no_hp' => $validated['no_hp'],
            'no_sim' => $validated['no_sim'],
            'status' => $validated['status'],
        ];

        if ($request->hasFile('foto')) {
            if ($pengemudi->foto) {
                Storage::disk('public')->delete($pengemudi->foto);
            }
            $path = 'foto/' . Str::uuid() . '.jpg';
            Storage::disk('public')->put($path, $this->processImage($request->file('foto')));
            $data['foto'] = $path;
        }

        $pengemudi->update($data);

        return redirect()->route('pengemudi.index')->with('success', 'Pengemudi berhasil diperbarui.');
    }

    public function destroy(Pengemudi $pengemudi)
    {
        if ($pengemudi->kendaraans()->count() > 0) {
            return back()->with('warning', 'Pengemudi masih terhubung ke kendaraan. Hapus relasi terlebih dahulu.');
        }
        if ($pengemudi->foto) {
            Storage::disk('public')->delete($pengemudi->foto);
        }
        $pengemudi->delete();

        return redirect()->route('pengemudi.index')->with('success', 'Pengemudi berhasil dihapus.');
    }

    public function foto($id)
    {
        $pengemudi = Pengemudi::findOrFail($id);

        if (!$pengemudi->foto) {
            abort(404);
        }

        return redirect(Storage::url($pengemudi->foto));
    }

    /**
     * Resize and compress image to ~30 KB.
     *
     * @return string encoded JPEG binary
     */
    private function processImage(UploadedFile $file): string
    {
        $manager = new ImageManager(new Driver);
        $image = $manager->decode($file->getPathname());

        // Resize to max 300x300 keeping aspect ratio
        $image->scaleDown(300, 300);

        // Encode as JPEG with quality 70 (approx 30KB)
        return (string) $image->encode(new JpegEncoder(quality: 70));
    }
}
