import { Head, Link } from '@inertiajs/react';

const CONTENT = {
    403: {
        title: 'Akses Ditolak',
        message: 'Anda tidak memiliki hak untuk membuka halaman ini.',
    },
    404: {
        title: 'Halaman Tidak Ditemukan',
        message: 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.',
    },
    419: {
        title: 'Sesi Kedaluwarsa',
        message: 'Sesi Anda telah berakhir. Silakan masuk kembali untuk melanjutkan.',
    },
    429: {
        title: 'Terlalu Banyak Permintaan',
        message: 'Mohon tunggu sebentar sebelum mencoba lagi.',
    },
    500: {
        title: 'Terjadi Kesalahan',
        message: 'Ada gangguan pada server. Silakan coba beberapa saat lagi.',
    },
    503: {
        title: 'Layanan Sedang Pemeliharaan',
        message: 'Sistem sedang diperbaiki. Silakan kembali nanti.',
    },
};

export default function Error({ status = 500 }) {
    const info = CONTENT[status] ?? CONTENT[500];

    return (
        <>
            <Head title={`${status} - ${info.title}`} />
            <div className="min-h-screen bg-[#e8f1fd] flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(20,50,110,0.25)] border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-[#1d64f2] via-[#1a5ce0] to-[#1245ab] text-white p-8 text-center relative overflow-hidden">
                        <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-20 right-0 w-56 h-56 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative z-10">
                            <p className="text-6xl font-black tracking-tight drop-shadow-sm">{status}</p>
                            <h1 className="text-lg font-bold tracking-tight mt-1">{info.title}</h1>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 text-center">
                        <p className="text-sm text-slate-600 leading-relaxed">{info.message}</p>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/dashboard"
                                className="flex-1 inline-flex items-center justify-center py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#175ce6] to-[#2563eb] hover:from-[#134ec4] hover:to-[#1d4ed8] shadow-md shadow-blue-500/25 active:scale-[0.99] transition-all duration-150"
                            >
                                Ke Dashboard
                            </Link>
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="flex-1 inline-flex items-center justify-center py-3 px-5 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-[0.99] transition-all duration-150"
                            >
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
