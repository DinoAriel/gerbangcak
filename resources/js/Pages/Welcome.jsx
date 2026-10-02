import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-[#e8f1fd] flex items-center justify-center p-3 sm:p-6 lg:p-10">
                <div className="w-full max-w-5xl bg-white rounded-3xl lg:rounded-[36px] shadow-[0_20px_60px_-15px_rgba(20,50,110,0.18)] overflow-hidden border border-slate-100 flex flex-col lg:flex-row relative">
                    {/* Left Hero Section */}
                    <section className="lg:w-1/2 bg-gradient-to-br from-[#1d64f2] via-[#1a5ce0] to-[#1245ab] text-white p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between overflow-hidden min-h-[360px] lg:min-h-[640px]">
                        {/* Ambient decorative glow */}
                        <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

                        {/* Top Headline */}
                        <div className="relative z-10 text-center">
                            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white drop-shadow-sm">
                                Welcome to
                            </h1>
                        </div>

                        {/* Center Logo & Description */}
                        <div className="relative z-10 my-auto py-6 flex flex-col items-center text-center">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-xl shadow-blue-900/30 flex items-center justify-center mb-3">
                                <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#1a5ee5]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.983 2.164a.75.75 0 0 0-1.042.067C9.373 4.908 7.375 8.16 6.88 11.514a8.687 8.687 0 0 0-2.617 1.838.75.75 0 0 0 .151 1.157c1.397.807 2.373 1.944 3.013 3.328a.75.75 0 0 0 1.096.347c1.077-.66 2.316-1.08 3.65-1.258 2.977-.394 6.22-2.146 8.706-4.632a.75.75 0 0 0 .045-1.036c-1.446-1.745-3.642-4.887-7.891-9.096Zm-1.89 10.334a2 2 0 1 1 2.828-2.828 2 2 0 0 1-2.828 2.828Z"></path>
                                    <path d="M4.5 17.5a.75.75 0 0 0-.53 1.28c1.365 1.366 3.064 2.163 4.886 2.457a.75.75 0 0 0 .762-.976 8.924 8.924 0 0 1-.362-2.433.75.75 0 0 0-.75-.75H4.5Z"></path>
                                </svg>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-5">
                                GerbangCak
                            </span>
                            <p className="max-w-xs text-xs sm:text-sm text-blue-100 font-normal leading-relaxed text-balance opacity-95">
                                Sistem berbasis web untuk verifikasi kendaraan dan pengemudi menggunakan QR Code oleh Dinas Perhubungan.
                            </p>
                        </div>

                        {/* Desktop Cloud Divider */}
                        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[140px] pointer-events-none z-10">
                            <svg className="h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 140 700" xmlns="http://www.w3.org/2000/svg">
                                <path d="M140 0C100 40 85 90 95 140C108 200 60 230 45 280C30 330 65 375 80 425C98 480 60 525 45 570C30 615 65 660 140 700V0Z" fill="#75a5fa" fillOpacity="0.5"></path>
                                <path d="M140 0C110 50 102 95 112 145C124 200 82 235 70 285C56 340 92 385 102 435C114 490 85 530 72 580C58 630 85 665 140 700V0Z" fill="#bcd7fd" fillOpacity="0.75"></path>
                                <path d="M140 0C125 55 118 105 128 150C138 205 102 245 92 295C80 350 112 395 120 445C130 500 106 545 95 590C82 640 108 670 140 700V0Z" fill="#ffffff"></path>
                            </svg>
                        </div>

                        {/* Mobile Cloud Divider */}
                        <div className="lg:hidden absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
                            <svg className="w-full h-10 text-white fill-current" preserveAspectRatio="none" viewBox="0 0 600 60">
                                <path d="M0,40 C90,15 150,55 240,30 C330,5 390,45 480,20 C540,5 575,30 600,25 L600,60 L0,60 Z"></path>
                            </svg>
                        </div>
                    </section>

                    {/* Right Form Section */}
                    <section className="lg:w-1/2 bg-white p-7 sm:p-12 lg:p-14 flex flex-col justify-center relative z-20">
                        <div className="max-w-md w-full mx-auto">
                            {/* Form Header */}
                            <header className="text-center lg:text-left mb-7">
                                <h2 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
                                    Login to your account
                                </h2>
                            </header>

                            {/* Login Form */}
                            <div className="space-y-4">
                                {/* Email Field */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-0.5" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        className="w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-[#f1f5fd] border border-transparent transition-all duration-200 focus:bg-white focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-0.5" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        className="w-full px-4 py-3 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-[#f1f5fd] border border-transparent transition-all duration-200 focus:bg-white focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                                    />
                                </div>

                                {/* Login Button */}
                                <div className="pt-2">
                                    <Link
                                        href={route('login')}
                                        className="block w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#175ce6] to-[#2563eb] hover:from-[#134ec4] hover:to-[#1d4ed8] shadow-md shadow-blue-500/25 active:scale-[0.99] transition-all duration-150 text-center"
                                    >
                                        Log in
                                    </Link>
                                </div>

                                {/* Register Link */}
                                <div className="text-center text-xs text-slate-500 pt-2">
                                    Don&apos;t have an account?{' '}
                                    <Link href={route('register')} className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
                                        Register
                                    </Link>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gray-400">
                                        Laravel v{laravelVersion} (PHP v{phpVersion})
                                    </p>
                                    <img
                                        src="/Juanda_International_Airport_Logo.png"
                                        alt="Logo Juanda International Airport"
                                        className="h-8 w-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}