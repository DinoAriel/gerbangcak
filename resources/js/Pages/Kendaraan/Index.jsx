import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';
import { QRCodeSVG } from 'qrcode.react';

export default function Index({ auth, kendaraans, flash, filters, kategoris }) {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [qrData, setQrData] = useState(null);
    const [search, setSearch] = useState(filters?.search || '');
    const [kategori, setKategori] = useState(filters?.kategori || '');

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (search !== (filters?.search || '') || kategori !== (filters?.kategori || '')) {
                router.get(route('kendaraan.index'), { search, kategori }, { preserveState: true, replace: true, preserveScroll: true });
            }
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [search, kategori]);

    const handleDelete = (id, nomor) => {
        if (confirm(`Yakin ingin menghapus kendaraan "${nomor}"?`)) {
            router.delete(route('kendaraan.destroy', id));
        }
    };

    const closeDriverModal = () => {
        setSelectedVehicle(null);
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
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                                <h3 className="text-lg font-bold text-gray-700">Daftar Kendaraan</h3>
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    <select
                                        value={kategori}
                                        onChange={(e) => setKategori(e.target.value)}
                                        className="w-full sm:w-40 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value="">Semua Kategori</option>
                                        {kategoris && kategoris.map((kat, idx) => (
                                            <option key={idx} value={kat}>{kat}</option>
                                        ))}
                                    </select>
                                    <input 
                                        type="text" 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari nopol, brand..." 
                                        className="w-full sm:w-48 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                    <Link
                                        href={route('import.form')}
                                        className="px-4 py-2 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium text-center whitespace-nowrap"
                                    >
                                        📥 Import
                                    </Link>
                                    <Link
                                        href={route('kendaraan.create')}
                                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium text-center whitespace-nowrap"
                                    >
                                        + Tambah
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
                                                        <button 
                                                            onClick={() => setSelectedVehicle(k)}
                                                            className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors focus:outline-none"
                                                        >
                                                            {k.pengemudis?.length ?? 0} driver
                                                        </button>
                                                    </td>
                                                    <td className="p-3 border-b text-center space-x-2">
                                                        <button
                                                            onClick={() => setQrData(k)}
                                                            className="text-green-600 hover:underline"
                                                        >
                                                            Cetak QR
                                                        </button>
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

                            {/* Pagination */}
                            {kendaraans.links && kendaraans.links.length > 3 && (
                                <div className="flex justify-center mt-6">
                                    <ul className="flex space-x-1 border rounded-lg overflow-hidden border-gray-300">
                                        {kendaraans.links.map((link, index) => (
                                            <li key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`block px-4 py-2 text-sm font-medium transition-colors ${
                                                            link.active
                                                                ? 'bg-blue-900 text-white'
                                                                : 'bg-white text-gray-700 border-x border-gray-200 hover:bg-blue-50'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ) : (
                                                    <span
                                                        className="block px-4 py-2 text-sm font-medium bg-gray-50 text-gray-400 border-x border-gray-200 cursor-not-allowed"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Detail Driver */}
            <Modal show={selectedVehicle !== null} onClose={closeDriverModal} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
                        Pengemudi untuk {selectedVehicle?.nomor_kendaraan}
                    </h2>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {selectedVehicle?.pengemudis && selectedVehicle.pengemudis.length > 0 ? (
                            selectedVehicle.pengemudis.map(driver => (
                                <div key={driver.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    {driver.has_foto ? (
                                        <img src={route('pengemudi.foto', driver.id)} alt={driver.nama} className="w-12 h-12 rounded-full object-cover border border-gray-300" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 text-xs shrink-0">
                                            No Pic
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">{driver.nama}</h4>
                                        <div className="text-xs text-gray-500 mt-1 flex flex-col sm:flex-row sm:gap-3">
                                            <span>📞 {driver.no_hp}</span>
                                            <span>🪪 SIM: {driver.no_sim}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 text-gray-500">
                                Belum ada pengemudi yang dihubungkan ke kendaraan ini.
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={closeDriverModal}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal Cetak QR Code */}
            <Modal show={qrData !== null} onClose={() => setQrData(null)} maxWidth="sm">
                <div className="p-6 text-center">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">QR Code Kendaraan</h2>
                    <p className="text-sm border-b pb-4 mb-4 font-mono text-gray-600">{qrData?.nomor_kendaraan}</p>
                    
                    <div className="flex justify-center bg-white p-4" id="printable-qr">
                        {qrData && (
                            <div className="text-center" style={{ width: '200px' }}>
                                <QRCodeSVG 
                                    value={window.location.origin + '/scan/' + qrData.kode_unik} 
                                    size={200}
                                />
                                <p className="mt-2 font-mono font-bold text-sm text-black uppercase">{qrData.nomor_kendaraan}</p>
                                <p className="text-xs text-gray-500">Scan untuk Validasi Dishub</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => setQrData(null)}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                        >
                            Tutup
                        </button>
                        <button
                            onClick={() => {
                                const printContent = document.getElementById('printable-qr').innerHTML;
                                const originalContent = document.body.innerHTML;
                                document.body.innerHTML = printContent;
                                window.print();
                                document.body.innerHTML = originalContent;
                                window.location.reload(); 
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                        >
                            🖨️ Cetak Sekarang
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
