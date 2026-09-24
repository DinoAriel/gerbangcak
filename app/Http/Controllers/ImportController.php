<?php

namespace App\Http\Controllers;

use App\Imports\KendaraanImport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function showForm()
    {
        return Inertia::render('Import/Index');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:5120',
        ]);

        $import = new KendaraanImport();

        Excel::import($import, $request->file('file'));

        $message = "Berhasil mengimpor {$import->imported} kendaraan.";
        if (! empty($import->errors)) {
            $message .= ' Beberapa baris dilewati: '.implode('; ', $import->errors);
        }

        return redirect()->route('kendaraan.index')->with('success', $message);
    }
}
