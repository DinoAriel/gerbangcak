import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ScanResult({ kendaraan }) {
    // Data dinamis dari prop atau fallback ke data statis
    const dataKendaraan = kendaraan || {
        kategori: 'Angkutan Sewa',
        perusahaan: 'PT Koka Bangkit Bersama',
        brand: 'AIGO',
        nomor_kendaraan: 'W 1237 LM',
        tahun_pembuatan: '2024',
        masa_berlaku: 'Aktif s/d 2025',
        drivers: [
            {
                id: 1,
                nik_driver: 'DRV-2024-0012',
                nama: 'SUSI RAHMAYATI',
                foto: 'https://i.pravatar.cc/150?img=47',
                sim: 'SIM A Umum',
                status: 'AKTIF',
                isActive: true
            },
            {
                id: 2,
                nik_driver: 'DRV-2024-0013',
                nama: 'DANIEL ANGGARA',
                foto: 'https://i.pravatar.cc/150?img=11',
                sim: 'SIM A Umum',
                status: 'TIDAK AKTIF',
                isActive: false
            },
            {
                id: 3,
                nik_driver: 'DRV-2024-0014',
                nama: 'WAHYU JENAKA',
                foto: 'https://i.pravatar.cc/150?img=12',
                sim: 'SIM A Umum',
                status: 'TIDAK AKTIF',
                isActive: false
            },
        ],
    };

    return (
        <div className="bg-slate-100 text-slate-800 font-sans min-h-screen flex justify-center selection:bg-indigo-100 selection:text-indigo-800 relative">
            <Head title={`Verifikasi Kendaraan & Driver - ${dataKendaraan.nomor_kendaraan}`} />

            {/* BEGIN: MobileDeviceContainer */}
            <main className="w-full max-w-md bg-slate-50 min-h-screen pb-12 shadow-2xl relative flex flex-col border-x border-slate-200">

                {/* BEGIN: TopNavigationBar */}
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
                    <Link href="/dashboard" aria-label="Kembali" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 active:bg-slate-200 hover:bg-slate-200 text-slate-700 transition" type="button">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </Link>
                    <div className="text-center flex-1">
                        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold leading-tight">Sistem Registrasi Angkutan</p>
                        <h1 className="text-sm font-bold text-slate-800 tracking-tight leading-snug">Verifikasi Validasi QR</h1>
                    </div>
                    {/* Ruang kosong untuk menjaga judul tetap presisi di tengah setelah icon Share dihapus */}
                    <div className="w-9 h-9"></div>
                </header>

                {/* BEGIN: VerificationStatusBanner */}
                <section aria-label="Status Verifikasi" className="px-4 pt-4">
                    <div className="rounded-2xl p-4 bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between shadow-xs">
                        <div className="flex items-center space-x-3">
                            <span className="relative flex h-3.5 w-3.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                            </span>
                            <div>
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Status Validasi</span>
                                    <svg className="h-4 w-4 text-emerald-600 fill-current inline" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-emerald-950">Data Resmi Terdaftar & Aktif</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Scrollable Body */}
                <div className="px-4 py-4 space-y-5 flex-1">

                    {/* BEGIN: VehicleSummaryCard */}
                    <section aria-labelledby="vehicle-card-heading" className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 relative overflow-hidden">

                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500" id="vehicle-card-heading">Data Kendaraan</h2>
                            </div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">{dataKendaraan.kategori}</span>
                        </div>

                        {/* License Plate Highlight */}
                        <div className="mt-4 mb-4 flex flex-col items-center justify-center">
                            {/* Memaksa background menjadi hitam gelap dan tulisan putih agar tidak butuh diblok */}
                            <div
                                className="plate-badge border-2 border-slate-700 font-mono font-bold text-2xl flex items-center justify-center rounded-xl shadow-lg relative"
                                style={{ backgroundColor: '#111827', color: '#ffffff', width: '250px', height: '65px' }}
                            >
                                <span className="tracking-widest text-white">{dataKendaraan.nomor_kendaraan}</span>
                            </div>
                        </div>

                        {/* Key Vehicle Specs Grid */}
                        <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                                <span className="text-slate-400 block text-[11px] mb-0.5 font-medium">Perusahaan Penyelenggara</span>
                                <span className="text-slate-800 font-bold text-sm block leading-snug">{dataKendaraan.perusahaan}</span>
                            </div>
                            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                                <span className="text-slate-400 block text-[11px] mb-0.5 font-medium">Merek / Brand Unit</span>
                                <div className="flex items-center space-x-1.5 mt-0.5">
                                    <span className="font-extrabold text-slate-800 text-sm tracking-wide">{dataKendaraan.brand}</span>
                                </div>
                            </div>
                            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                                <span className="text-slate-400 block text-[11px] mb-0.5 font-medium">Tahun Pembuatan</span>
                                <span className="text-slate-800 font-bold text-sm block">{dataKendaraan.tahun_pembuatan}</span>
                            </div>
                            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                                <span className="text-slate-400 block text-[11px] mb-0.5 font-medium">Masa Berlaku Operasional</span>
                                <span className="text-emerald-700 font-bold text-sm flex items-center space-x-1">
                                    <span>{dataKendaraan.masa_berlaku}</span>
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* BEGIN: DriversSection */}
                    <section aria-labelledby="drivers-section-heading" className="space-y-3">
                        <div className="flex items-center justify-between px-1 mb-2">
                            <div>
                                <h2 className="text-sm font-bold text-slate-900 tracking-tight" id="drivers-section-heading">Identitas Driver Terdaftar</h2>
                                <p className="text-xs text-slate-500">Tercatat {dataKendaraan.drivers.length} pengemudi resmi untuk unit ini</p>
                            </div>
                        </div>

                        {dataKendaraan.drivers.map((driver) => (
                            <article key={driver.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 transition hover:shadow-md">
                                <div className="flex items-center gap-8">
                                    {/* Foto Driver */}
                                    {driver.foto ? (
                                        <img
                                            alt={`Foto resmi driver ${driver.nama}`}
                                            className="w-16 h-16 object-cover rounded-[14px] shadow-sm flex-shrink-0 bg-slate-100"
                                            src={driver.foto}
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-[14px] shadow-sm flex-shrink-0 bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500 font-bold text-xl">
                                            {driver.nama ? driver.nama.substring(0, 2).toUpperCase() : 'DR'}
                                        </div>
                                    )}

                                    {/* Info Nama & Jenis SIM */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex flex-col">
                                                <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">{driver.nama}</h3>
                                                <p className="text-[11px] text-slate-500 mt-1">{driver.sim} • Terakreditasi</p>
                                            </div>
                                            <span className={`shrink-0 text-[9px] uppercase font-bold px-2 py-1 rounded-md border tracking-wider mt-0.5 ${driver.isActive
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : 'bg-slate-50 text-slate-500 border-slate-200'
                                                }`}>
                                                {driver.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                </div>
            </main>

            {/* Custom CSS overrides for tactile effects passed via HTML */}
            <style jsx global>{`
                body {
                    -webkit-tap-highlight-color: transparent;
                    -webkit-font-smoothing: antialiased;
                }
                .plate-badge {
                    letter-spacing: 0.12em;
                    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25), 0 4px 10px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}
