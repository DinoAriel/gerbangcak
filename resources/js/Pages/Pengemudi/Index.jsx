import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import Modal from '@/Components/Modal';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, pengemudis, flash, filters, statuses }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [selectedPengemudi, setSelectedPengemudi] = useState(null);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (search !== (filters?.search || '') || status !== (filters?.status || '')) {
                router.get(route('pengemudi.index'), { search, status }, { preserveState: true, replace: true, preserveScroll: true });
            }
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [search, status]);

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
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                                <h3 className="text-lg font-bold text-gray-700">Daftar Pengemudi</h3>
                                
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <input 
                                        type="text" 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari nama, KTP, atau SIM..." 
                                        className="w-full sm:w-64 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full sm:w-40 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value="">Semua Status</option>
                                        {(statuses && statuses.length > 0
                                            ? statuses
                                            : ['Aktif', 'Tidak Aktif', 'Cuti']
                                        ).map((s, idx) => (
                                            <option key={idx} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <Link
                                        href={route('pengemudi.create')}
                                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium whitespace-nowrap"
                                    >
                                        + Tambah
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-blue-900 text-white">
                                            <th className="p-3 rounded-tl-lg">Foto</th>
                                            <th className="p-3">Nama</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3 rounded-tr-lg text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pengemudis.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="p-6 text-center text-gray-500">
                                                    Belum ada data pengemudi.
                                                </td>
                                            </tr>
                                        ) : (
                                            pengemudis.data.map((p, i) => (
                                                <tr key={p.id} className={i % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50'}>
                                                    <td className="p-3 border-b">
                                                        {p.has_foto ? (
                                                            <a href={route('pengemudi.foto', p.id)} target="_blank" rel="noopener noreferrer">
                                                                <img src={route('pengemudi.foto', p.id)} alt={p.nama} className="w-12 h-12 rounded-full object-cover border border-gray-300 hover:opacity-80 transition-opacity" />
                                                            </a>
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 text-xs shadow-sm">
                                                                No Pic
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="p-3 border-b font-medium">{p.nama}</td>
                                                    <td className="p-3 border-b">
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                                                            p.status?.toLowerCase() === 'aktif'
                                                                ? 'bg-green-100 text-green-800'
                                                                : p.status?.toLowerCase() === 'cuti'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 border-b text-center space-x-3">
                                                        <button
                                                            onClick={() => setSelectedPengemudi(p)}
                                                            className="text-green-600 hover:underline"
                                                        >
                                                            Detail
                                                        </button>
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
                            
                            {/* Pagination */}
                            <Pagination links={pengemudis.links} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Detail Pengemudi */}
            <Modal show={selectedPengemudi !== null} onClose={() => setSelectedPengemudi(null)} maxWidth="sm">
                {selectedPengemudi && (
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Detail Pengemudi</h2>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                selectedPengemudi.status?.toLowerCase() === 'aktif'
                                    ? 'bg-green-100 text-green-800'
                                    : selectedPengemudi.status?.toLowerCase() === 'cuti'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {selectedPengemudi.status}
                            </span>
                        </div>
                        
                        <div className="flex flex-col items-center mb-6">
                            {selectedPengemudi.has_foto ? (
                                <img 
                                    src={route('pengemudi.foto', selectedPengemudi.id)} 
                                    alt={selectedPengemudi.nama} 
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm mb-4" 
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-gray-50 flex items-center justify-center text-gray-400 text-sm shadow-sm mb-4">
                                    Tidak ada foto
                                </div>
                            )}
                            <h3 className="text-lg font-bold text-gray-800 text-center">{selectedPengemudi.nama}</h3>
                        </div>

                        <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
                            <div>
                                <span className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Nomor KTP</span>
                                <span className="text-gray-900 font-mono font-medium">{selectedPengemudi.no_ktp || '-'}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Nomor SIM</span>
                                <span className="text-gray-900 font-mono font-medium">{selectedPengemudi.no_sim || '-'}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Nomor HP / Telepon</span>
                                <span className="text-gray-900 font-medium">{selectedPengemudi.no_hp || '-'}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setSelectedPengemudi(null)}
                                className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors w-full sm:w-auto"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
