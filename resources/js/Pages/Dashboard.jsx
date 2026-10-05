import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

function StatCard({ label, value, accent, icon, to }) {
    const accentClasses = {
        blue: 'bg-blue-50 text-blue-600',
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        slate: 'bg-slate-100 text-slate-500',
    };

    const body = (
        <div className="h-full bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_-18px_rgba(20,50,110,0.35)] p-5 transition hover:shadow-[0_16px_40px_-20px_rgba(20,50,110,0.45)]">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                </span>
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentClasses[accent]}`}>
                    {icon}
                </span>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight text-slate-800">
                {value}
            </p>
        </div>
    );

    return to ? <Link href={to}>{body}</Link> : body;
}

function BarList({ title, subtitle, items, accentFrom, accentTo, emptyText }) {
    const max = Math.max(1, ...items.map((i) => i.total));

    return (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_-18px_rgba(20,50,110,0.35)] p-6">
            <div className="mb-5">
                <h3 className="text-base font-bold text-slate-800 tracking-tight">{title}</h3>
                {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>

            {items.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-400">{emptyText}</div>
            ) : (
                <ul className="space-y-4">
                    {items.map((item, idx) => (
                        <li key={idx}>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm font-medium text-slate-700 truncate pr-3">
                                    {item.label}
                                </span>
                                <span className="text-xs font-bold text-slate-500 shrink-0">
                                    {item.total}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r"
                                    style={{
                                        width: `${Math.round((item.total / max) * 100)}%`,
                                        backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`,
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

const icons = {
    vehicle: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m10 0a2 2 0 104 0m-4 0a2 2 0 114 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    driver: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    check: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    cross: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

export default function Dashboard({ stats, kategoriChart = [], topPerusahaan = [] }) {
    const user = usePage().props.auth.user;
    const isAdmin = user.role === 'admin';

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-blue-900 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8 sm:py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">

                    {/* Greeting hero */}
                    <div className="rounded-3xl bg-gradient-to-br from-[#1d64f2] via-[#1a5ce0] to-[#1245ab] text-white p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-20 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-sm text-blue-100 font-medium">Selamat datang kembali,</p>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-0.5">
                                    {user.name}
                                </h1>
                                <p className="text-xs sm:text-sm text-blue-100 mt-1.5">
                                    {isAdmin
                                        ? 'Ringkasan data kendaraan & pengemudi angkutan.'
                                        : 'Pantau data registrasi angkutan dan mulai validasi lapangan.'}
                                </p>
                            </div>
                            <span className="self-start sm:self-center inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider border border-white/20">
                                <span className="w-2 h-2 rounded-full bg-cyan-300"></span>
                                {isAdmin ? 'Super Admin' : 'Petugas'}
                            </span>
                        </div>
                    </div>

                    {isAdmin ? (
                        <>
                            {/* Stat cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <StatCard label="Total Kendaraan" value={stats.total_kendaraan} accent="blue" icon={icons.vehicle} to={route('kendaraan.index')} />
                                <StatCard label="Total Pengemudi" value={stats.total_pengemudi} accent="indigo" icon={icons.driver} to={route('pengemudi.index')} />
                                <StatCard label="Pengemudi Aktif" value={stats.pengemudi_aktif} accent="emerald" icon={icons.check} />
                                <StatCard label="Pengemudi Nonaktif" value={stats.pengemudi_nonaktif} accent="slate" icon={icons.cross} />
                            </div>

                            {/* Panels */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <BarList
                                    title="Distribusi Kategori"
                                    subtitle="Jumlah kendaraan per kategori"
                                    items={kategoriChart}
                                    accentFrom="#1d64f2"
                                    accentTo="#1245ab"
                                    emptyText="Belum ada data kendaraan."
                                />
                                <BarList
                                    title="Top 5 Perusahaan"
                                    subtitle="Perusahaan dengan kendaraan terbanyak"
                                    items={topPerusahaan}
                                    accentFrom="#22d3ee"
                                    accentTo="#2563eb"
                                    emptyText="Belum ada data perusahaan."
                                />
                            </div>

                        </>
                    ) : (
                        <>
                            {/* Hero CTA - Live Scanner */}
                            <Link
                                href={route('scanner.camera')}
                                className="block rounded-3xl bg-gradient-to-r from-[#175ce6] to-[#2563eb] p-6 sm:p-8 text-white shadow-lg shadow-blue-500/25 hover:from-[#134ec4] hover:to-[#1d4ed8] active:scale-[0.995] transition"
                            >
                                <div className="flex items-center gap-5">
                                    <span className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2M12 9v6m-3-3h6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold tracking-tight">Buka Live Scanner</h3>
                                        <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
                                            Pindai QR Code kendaraan untuk memvalidasi data secara langsung.
                                        </p>
                                    </div>
                                    <svg className="w-6 h-6 ml-auto shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </Link>

                            {/* Ringkasan */}
                            <div className="grid grid-cols-2 gap-4">
                                <StatCard label="Total Kendaraan" value={stats.total_kendaraan} accent="blue" icon={icons.vehicle} />
                                <StatCard label="Total Pengemudi" value={stats.total_pengemudi} accent="indigo" icon={icons.driver} />
                            </div>
                        </>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
