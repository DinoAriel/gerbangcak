import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth }) {
    const { data, setData, post, processing, errors } = useForm({ file: null });
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file', file);
            setPreview(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('import.kendaraan'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-blue-900 leading-tight">Import Data Excel</h2>}
        >
            <Head title="Import Data" />
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Format Panduan */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                            <span>📋</span> Format Kolom Excel yang Dibutuhkan
                        </h3>
                        <p className="text-sm text-blue-800 mb-3">
                            Baris pertama harus berisi <strong>nama header</strong> berikut (huruf kecil, gunakan underscore):
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs border-collapse">
                                <thead>
                                    <tr className="bg-blue-900 text-white">
                                        <th className="p-2 text-left">Header Kolom</th>
                                        <th className="p-2 text-left">Contoh Isi</th>
                                        <th className="p-2 text-left">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {[
                                        ['kategori_angkutan', 'Truk', 'Wajib'],
                                        ['nama_perusahaan', 'PT Maju Jaya', 'Wajib'],
                                        ['brand', 'Toyota', 'Wajib'],
                                        ['nopol', 'B 1234 ABC', 'Wajib & unik'],
                                        ['tahun_pembuatan', '2020', 'Wajib, angka'],
                                        ['pengemudi', 'Budi, Andi', 'Opsional, pisah koma jika lebih dari 1'],
                                    ].map(([h, c, k]) => (
                                        <tr key={h} className="border-b hover:bg-blue-50">
                                            <td className="p-2 font-mono font-semibold text-blue-700">{h}</td>
                                            <td className="p-2 text-gray-600">{c}</td>
                                            <td className="p-2 text-gray-500">{k}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-blue-700 mt-3">
                            💡 Pengemudi yang belum ada akan otomatis ditambahkan dengan data minimal (No. HP & SIM: "-"). Edit datanya setelah import selesai.
                        </p>
                    </div>

                    {/* Form Upload */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    File Excel (.xlsx, .xls, .csv)
                                </label>
                                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${preview ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}>
                                    <input
                                        type="file"
                                        accept=".xlsx,.xls,.csv"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        {preview ? (
                                            <div>
                                                <p className="text-2xl mb-1">📄</p>
                                                <p className="font-medium text-blue-700">{preview}</p>
                                                <p className="text-xs text-gray-500 mt-1">Klik untuk ganti file</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-4xl mb-2">📂</p>
                                                <p className="text-gray-600 font-medium">Klik untuk pilih file</p>
                                                <p className="text-xs text-gray-400 mt-1">atau seret file ke sini</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing || !data.file}
                                    className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60 font-medium"
                                >
                                    {processing ? '⏳ Memproses...' : '📥 Import Sekarang'}
                                </button>
                                <Link href={route('kendaraan.index')} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
