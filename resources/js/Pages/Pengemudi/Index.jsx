import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, pengemudis, flash }) {
    const handleDelete = (id, nama) => {
        if (confirm(`Yakin ingin menghapus pengemudi "${nama}"?`)) {
            router.delete(route('pengemudi.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-blue-900 leading-tight">Manajemen Pengemudi</h2>}
        >
            <Head title="Pengemudi" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-sm">{flash.success}</div>
                    )}
                    {flash?.warning && (
                        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg text-sm">{flash.warning}</div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-700">Daftar Pengemudi</h3>
                                <Link
                                    href={route('pengemudi.create')}
                                    className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
                                >
                                    + Tambah Pengemudi
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-blue-900 text-white">
                                            <th className="p-3 rounded-tl-lg">Nama</th>
                                            <th className="p-3">No. HP</th>
                                            <th className="p-3">No. SIM</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3 rounded-tr-lg text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pengemudis.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="p-6 text-center text-gray-500">
                                                    Belum ada data pengemudi.
                                                </td>
                                            </tr>
                                        ) : (
                                            pengemudis.data.map((p, i) => (
                                                <tr key={p.id} className={i % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50'}>
                                                    <td className="p-3 border-b font-medium">{p.nama}</td>
                                                    <td className="p-3 border-b">{p.no_hp}</td>
                                                    <td className="p-3 border-b">{p.no_sim}</td>
                                                    <td className="p-3 border-b">
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                            p.status === 'Aktif'
                                                                ? 'bg-green-100 text-green-800'
                                                                : p.status === 'Cuti'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 border-b text-center space-x-3">
                                                        <Link
                                                            href={route('pengemudi.edit', p.id)}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(p.id, p.nama)}
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
