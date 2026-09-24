import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, pengemudis }) {
    const { data, setData, post, processing, errors } = useForm({
        kategori: '',
        perusahaan: '',
        brand: '',
        nomor_kendaraan: '',
        tahun_pembuatan: '',
        pengemudi_ids: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('kendaraan.store'));
    };

    const toggleDriver = (id) => {
        setData('pengemudi_ids',
            data.pengemudi_ids.includes(id)
                ? data.pengemudi_ids.filter(x => x !== id)
                : [...data.pengemudi_ids, id]
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-blue-900 leading-tight">Tambah Kendaraan</h2>}
        >
            <Head title="Tambah Kendaraan" />
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <FormField label="Kategori" error={errors.kategori}>
                                <input type="text" className={inputClass(errors.kategori)} value={data.kategori}
                                    onChange={e => setData('kategori', e.target.value)} placeholder="mis. Truk, Pickup, Bus" />
                            </FormField>

                            <FormField label="Perusahaan" error={errors.perusahaan}>
                                <input type="text" className={inputClass(errors.perusahaan)} value={data.perusahaan}
                                    onChange={e => setData('perusahaan', e.target.value)} placeholder="Nama perusahaan" />
                            </FormField>

                            <FormField label="Brand" error={errors.brand}>
                                <input type="text" className={inputClass(errors.brand)} value={data.brand}
                                    onChange={e => setData('brand', e.target.value)} placeholder="mis. Toyota, Mitsubishi" />
                            </FormField>

                            <FormField label="Nomor Kendaraan" error={errors.nomor_kendaraan}>
                                <input type="text" className={inputClass(errors.nomor_kendaraan)} value={data.nomor_kendaraan}
                                    onChange={e => setData('nomor_kendaraan', e.target.value)} placeholder="mis. B 1234 ABC" />
                            </FormField>

                            <FormField label="Tahun Pembuatan" error={errors.tahun_pembuatan}>
                                <input type="number" className={inputClass(errors.tahun_pembuatan)} value={data.tahun_pembuatan}
                                    onChange={e => setData('tahun_pembuatan', e.target.value)} placeholder="mis. 2020" min="1900" max="2100" />
                            </FormField>

                            <FormField label="Pengemudi Terdaftar" error={errors.pengemudi_ids}>
                                <div className="border border-gray-300 rounded-lg divide-y max-h-52 overflow-y-auto">
                                    {pengemudis.length === 0 ? (
                                        <p className="p-3 text-sm text-gray-500">Belum ada pengemudi. Tambah pengemudi terlebih dahulu.</p>
                                    ) : (
                                        pengemudis.map(p => (
                                            <label key={p.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={data.pengemudi_ids.includes(p.id)}
                                                    onChange={() => toggleDriver(p.id)}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{p.nama}</span>
                                            </label>
                                        ))
                                    )}
                                </div>
                            </FormField>

                            <div className="flex items-center gap-3 pt-2">
                                <button type="submit" disabled={processing}
                                    className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60 font-medium">
                                    {processing ? 'Menyimpan...' : 'Simpan'}
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

function FormField({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

function inputClass(error) {
    return `w-full rounded-lg border ${error ? 'border-red-400' : 'border-gray-300'} px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`;
}
