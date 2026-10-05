import { Head, Link } from '@inertiajs/react';

export default function AccessDenied({ kode }) {
    return (
        <>
            <Head title="Akses Terbatas" />
            <div className="min-h-screen bg-[#e8f1fd] flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(20,50,110,0.25)] border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-[#1d64f2] via-[#1a5ce0] to-[#1245ab] text-white p-8 text-center relative overflow-hidden">
                        <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold tracking-tight">Akses Terbatas</h1>
                            <p className="text-xs text-blue-100 mt-1">Verifikasi Kendaraan &amp; Pengemudi</p>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 text-center">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Halaman ini berisi data kendaraan dan pengemudi yang bersifat{' '}
                            <strong className="text-slate-800">rahasia</strong>. Untuk melihatnya, Anda
                            harus masuk terlebih dahulu sebagai petugas atau admin resmi.
                        </p>

                        {kode && (
                            <p className="mt-4 text-xs text-slate-400">
                                Kode QR:{' '}
                                <span className="font-mono font-semibold text-slate-600">{kode}</span>
                            </p>
                        )}

                        <Link
                            href={route('login')}
                            className="mt-6 inline-flex w-full items-center justify-center py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#175ce6] to-[#2563eb] hover:from-[#134ec4] hover:to-[#1d4ed8] shadow-md shadow-blue-500/25 active:scale-[0.99] transition-all duration-150"
                        >
                            Masuk ke Akun Petugas
                        </Link>

                        <p className="mt-4 text-[11px] text-slate-400">
                            Tidak punya akses? Hubungi administrator Dinas Perhubungan.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
