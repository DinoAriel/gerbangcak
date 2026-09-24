import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, pengemudi }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        nama: pengemudi.nama ?? '',
        no_hp: pengemudi.no_hp ?? '',
        no_sim: pengemudi.no_sim ?? '',
        status: pengemudi.status ?? 'Aktif',
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pengemudi.update', pengemudi.id), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-blue-900 leading-tight">Edit Pengemudi</h2>}
        >
            <Head title="Edit Pengemudi" />
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
                            <FormField label="Nama Lengkap" error={errors.nama}>
                                <input
                                    type="text"
                                    className={inputClass(errors.nama)}
                                    value={data.nama}
                                    onChange={e => setData('nama', e.target.value)}
                                />
                            </FormField>

                            <FormField label="No. HP" error={errors.no_hp}>
                                <input
                                    type="text"
                                    className={inputClass(errors.no_hp)}
                                    value={data.no_hp}
                                    onChange={e => setData('no_hp', e.target.value)}
                                />
                            </FormField>

                            <FormField label="No. SIM" error={errors.no_sim}>
                                <input
                                    type="text"
                                    className={inputClass(errors.no_sim)}
                                    value={data.no_sim}
                                    onChange={e => setData('no_sim', e.target.value)}
                                />
                            </FormField>

                            <FormField label="Status" error={errors.status}>
                                <select
                                    className={inputClass(errors.status)}
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                    <option value="Cuti">Cuti</option>
                                </select>
                            </FormField>

                            <FormField label="Foto Baru (opsional)" error={errors.foto}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    onChange={e => setData('foto', e.target.files[0])}
                                />
                                <p className="text-xs text-gray-400 mt-1">Biarkan kosong jika tidak ingin mengubah foto.</p>
                            </FormField>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60 font-medium"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                                <Link href={route('pengemudi.index')} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
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
