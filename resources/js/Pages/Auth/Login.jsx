import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen w-full flex flex-col lg:flex-row relative overflow-hidden bg-white">
                
                {/* Left Hero Section */}
                <section className="w-full lg:w-1/2 bg-gradient-to-br from-[#1d64f2] via-[#1a5ce0] to-[#1245ab] text-white p-8 sm:p-12 lg:p-14 relative flex flex-col justify-center lg:justify-between overflow-hidden min-h-[400px] lg:min-h-screen">

                    {/* Juanda Airport Logo at Top Left */}
                    <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-30">
                        <img
                            src="/Juanda_International_Airport_Logo.png"
                            alt="Logo Juanda International Airport"
                            className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm brightness-0 invert"
                        />
                    </div>

                    {/* Ambient decorative glow */}
                    <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Top Headline */}
                    <div className="relative z-10 text-center mt-20 sm:mt-24 lg:mt-12">
                        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white drop-shadow-sm">
                            Welcome to
                        </h1>
                    </div>

                        {/* Center Logo & Description */}
                        <div className="relative z-10 my-auto py-6 flex flex-col items-center text-center">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-xl shadow-blue-900/30 flex items-center justify-center mb-3 p-3">
                                <img
                                    src="/logo.png"
                                    alt="GerbangCek Logo"
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                                />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-5">
                                GerbangCek
                            </span>
                            <p className="max-w-xs text-xs sm:text-sm text-blue-100 font-normal leading-relaxed text-balance opacity-95">
                                Sistem verifikasi kendaraan dan pengemudi berbasis QR Code untuk mendukung keamanan operasional Bandara Juanda.
                            </p>
                        </div>

                    </section>

                {/* Right Form Section */}
                <section className="w-full lg:w-1/2 bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative z-20 min-h-[500px] lg:min-h-screen">

                    {/* Desktop Puffy Cloud Divider (Attached to left edge) */}
                    <div className="hidden lg:block absolute right-full top-0 bottom-0 w-[140px] pointer-events-none z-10 translate-x-[2px]">
                        <svg className="h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 1200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 90 0 C 60 100, 60 200, 90 300 C 50 400, 50 500, 90 600 C 60 700, 60 800, 85 900 C 60 1000, 70 1100, 90 1200 L 120 1200 L 120 0 Z" fill="#75a5fa" fillOpacity="0.5"></path>
                            <path d="M 100 0 C 70 150, 70 250, 95 400 C 70 520, 70 680, 100 800 C 70 950, 80 1100, 100 1200 L 120 1200 L 120 0 Z" fill="#bcd7fd" fillOpacity="0.75"></path>
                            <path d="M 110 0 C 80 120, 70 250, 100 350 C 60 500, 75 680, 105 850 C 75 1000, 90 1100, 110 1200 L 120 1200 L 120 0 Z" fill="#ffffff"></path>
                        </svg>
                    </div>

                    {/* Mobile Cloud Divider (Attached to top edge) */}
                    <div className="lg:hidden absolute bottom-full left-0 right-0 w-full pointer-events-none z-10 flex">
                        <svg className="w-full h-[80px] sm:h-[120px] lg:h-[150px] translate-y-[2px]" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 90 C 100 60, 200 60, 300 90 C 400 50, 500 50, 600 90 C 700 60, 800 60, 900 85 C 1000 60, 1100 70, 1200 90 L 1200 120 L 0 120 Z" fill="#75a5fa" fillOpacity="0.5"></path>
                            <path d="M0 100 C 150 70, 250 70, 400 95 C 520 70, 680 70, 800 100 C 950 70, 1100 80, 1200 100 L 1200 120 L 0 120 Z" fill="#bcd7fd" fillOpacity="0.75"></path>
                            <path d="M0 110 C 120 80, 250 70, 350 100 C 500 60, 680 75, 850 105 C 1000 75, 1100 90, 1200 110 L 1200 120 L 0 120 Z" fill="#ffffff"></path>
                        </svg>
                    </div>

                    <div className="max-w-md w-full mx-auto relative z-20">
                            {/* Form Header */}
                            <header className="text-center lg:text-left mb-7">
                                <h2 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
                                    Login to your account
                                </h2>
                            </header>

                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600 text-center lg:text-left">
                                    {status}
                                </div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={submit} className="space-y-4">
                                {/* Email Field */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-0.5" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter email"
                                        className="w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-[#f1f5fd] border border-transparent transition-all duration-200 focus:bg-white focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                                        autoComplete="username"
                                        autoFocus
                                    />
                                    <InputError message={errors.email} className="mt-2 text-xs" />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-0.5" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter Password"
                                        className="w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-[#f1f5fd] border border-transparent transition-all duration-200 focus:bg-white focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                                        autoComplete="current-password"
                                    />
                                    <InputError message={errors.password} className="mt-2 text-xs" />
                                </div>

                                {/* Remember Me Checkbox */}
                                <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                </div>

                                {/* Login Button */}
                                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline text-center sm:text-left"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto py-3 px-6 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#175ce6] to-[#2563eb] hover:from-[#134ec4] hover:to-[#1d4ed8] shadow-md shadow-blue-500/25 active:scale-[0.99] transition-all duration-150 disabled:opacity-75 disabled:cursor-not-allowed"
                                    >
                                        Log in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
            </div>
        </>
    );
}