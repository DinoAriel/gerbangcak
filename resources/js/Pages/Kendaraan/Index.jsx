import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, kendaraans, flash }) {
    const handleDelete = (id, nomor) => {
        if (confirm(`Yakin ingin menghapus kendaraan "${nomor}"?`)) {
            router.delete(route('kendaraan.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-blue-900 leading-tight">Manajemen Kendaraan</h2>}
        >
            <Head title="Kendaraan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-sm">{flash.success}</div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-700">Daftar Kendaraan</h3>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('import.form')}
                                        className="px-4 py-2 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                                    >
                                        📥 Import Excel
                                    </Link>
                                    <Link
                                        href={route('kendaraan.create')}
                                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
                                    >
                                        + Tambah Kendaraan
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-blue-900 text-white">
                                            <th className="p-3 rounded-tl-lg">No. Kendaraan</th>
                                            <th className="p-3">Kategori</th>
                                            <th className="p-3">Perusahaan</th>
                                            <th className="p-3">Brand</th>
                                            <th className="p-3">Tahun</th>
                                            <th className="p-3">Driver</th>
                                            <th className="p-3 rounded-tr-lg text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kendaraans.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="p-6 text-center text-gray-500">
                                                    Belum ada data kendaraan.
                                                </td>
                                            </tr>
                                        ) : (
                                            kendaraans.data.map((k, i) => (
                                                <tr
                                                    key={k.id}
                                                    className={i % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50'}
                                                >
                                                    <td className="p-3 border-b font-medium">{k.nomor_kendaraan}</td>
                                                    <td className="p-3 border-b">{k.kategori}</td>
                                                    <td className="p-3 border-b">{k.perusahaan}</td>
                                                    <td className="p-3 border-b">{k.brand}</td>
                                                    <td className="p-3 border-b">{k.tahun_pembuatan}</td>
                                                    <td className="p-3 border-b">
                                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                            {k.pengemudis?.length ?? 0} driver
                                                        </span>
                                                    </td>
                                                    <td className="p-3 border-b text-center space-x-2">
                                                        <Link
                                                            href={route('kendaraan.edit', k.id)}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(k.id, k.nomor_kendaraan)}
                                                            className="text-red-600 hover:underline"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
