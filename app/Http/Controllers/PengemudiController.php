<?php

namespace App\Http\Controllers;

use App\Models\Pengemudi;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class PengemudiController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $pengemudis = Pengemudi::when($search, function ($query, $search) {
            $query->where('nama', 'like', "%{$search}%")
                  ->orWhere('no_sim', 'like', "%{$search}%");
        })->latest()->paginate(10)->withQueryString();

        return Inertia::render('Pengemudi/Index', [
            'pengemudis' => $pengemudis,
            'filters' => $request->only(['search']),
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
            'no_hp' => 'required|string|max:20',
            'no_sim' => 'required|string|max:30',
            'status' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = [
            'nama' => $validated['nama'],
            'no_hp' => $validated['no_hp'],
            'no_sim' => $validated['no_sim'],
            'status' => $validated['status'],
        ];

        if ($request->hasFile('foto')) {
            [$binary, $mime] = $this->processImage($request->file('foto'));
            $data['foto'] = $binary;
            $data['foto_mime'] = $mime;
        }

        Pengemudi::create($data);

        return redirect()->route('pengemudi.index')->with('success', 'Pengemudi berhasil ditambahkan.');
    }

    public function edit(Pengemudi $pengemudi)
    {
        return Inertia::render('Pengemudi/Edit', [
            'pengemudi' => $pengemudi->only(['id', 'nama', 'no_hp', 'no_sim', 'status']),
        ]);
    }

    public function update(Request $request, Pengemudi $pengemudi)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'no_hp' => 'required|string|max:20',
            'no_sim' => 'required|string|max:30',
            'status' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = [
            'nama' => $validated['nama'],
            'no_hp' => $validated['no_hp'],
            'no_sim' => $validated['no_sim'],
            'status' => $validated['status'],
        ];

        if ($request->hasFile('foto')) {
            [$binary, $mime] = $this->processImage($request->file('foto'));
            $data['foto'] = $binary;
            $data['foto_mime'] = $mime;
        }

        $pengemudi->update($data);

        return redirect()->route('pengemudi.index')->with('success', 'Pengemudi berhasil diperbarui.');
    }

    public function destroy(Pengemudi $pengemudi)
    {
        if ($pengemudi->kendaraans()->count() > 0) {
            return back()->with('warning', 'Pengemudi masih terhubung ke kendaraan. Hapus relasi terlebih dahulu.');
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

        return response($pengemudi->foto)->header('Content-Type', $pengemudi->foto_mime ?? 'image/jpeg');
    }

    /**
     * Resize and compress image to ~30 KB.
     *
     * @return array{0: string, 1: string} [binary, mime]
     */
    private function processImage(UploadedFile $file): array
    {
        $manager = new ImageManager(new Driver);
        $image = $manager->read($file->getPathname());

        // Resize to max 300x300 keeping aspect ratio
        $image->scaleDown(300, 300);

        // Encode as JPEG with quality 70 (approx 30KB)
        $encoded = $image->toJpeg(70);

        return [(string) $encoded, 'image/jpeg'];
    }
}
