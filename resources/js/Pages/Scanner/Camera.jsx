import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Html5Qrcode } from 'html5-qrcode';

export default function Camera({ auth }) {
    const [scannedData, setScannedData] = useState(null);
    const [error, setError] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const html5QrcodeRef = useRef(null);
    const scanning = useRef(false);

    useEffect(() => {
        // Start scanner automatically when component mounts
        startScanner();

        return () => {
            stopScanner();
        };
    }, []);

    const startScanner = () => {
        if (scanning.current) return;

        const html5Qrcode = new Html5Qrcode('qr-reader');
        html5QrcodeRef.current = html5Qrcode;

        html5Qrcode.start(
            { facingMode: 'environment' }, // pakai kamera belakang di HP, depan di laptop
            {
                fps: 10,
                qrbox: { width: 220, height: 220 },
                aspectRatio: 1.0,
            },
            (decodedText) => {
                // QR Code berhasil dibaca
                if (!scanning.current) return;
                scanning.current = false;
                setScannedData(decodedText);
                stopScanner();
                router.visit(decodedText);
            },
            () => {
                // Tidak terdeteksi (normal, terus scanning)
            }
        ).then(() => {
            scanning.current = true;
            setIsStarted(true);
            setError(null);
        }).catch((err) => {
            console.error(err);
            if (err.toString().includes('permission') || err.toString().includes('Permission')) {
                setError('Akses kamera ditolak. Klik ikon kunci di URL bar browser lalu izinkan kamera.');
            } else if (err.toString().includes('device not found') || err.toString().includes('NotFound')) {
                setError('Kamera tidak ditemukan pada perangkat ini.');
            } else {
                setError('Gagal membuka kamera: ' + err.toString());
            }
        });
    };

    const stopScanner = () => {
        if (html5QrcodeRef.current) {
            html5QrcodeRef.current.stop().catch(() => {});
            html5QrcodeRef.current = null;
        }
        scanning.current = false;
    };

    const resetScanner = () => {
        setScannedData(null);
        setError(null);
        setIsStarted(false);
        setTimeout(() => {
            startScanner();
        }, 500);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">Live Scanner</h2>}
        >
            <Head title="Kamera Scanner" />

            <div className="py-8">
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-xl">
                        <div className="p-6 text-center">
                            <h3 className="text-lg font-bold text-slate-800 mb-1">Arahkan Kamera ke QR Code</h3>
                            <p className="text-sm text-slate-500 mb-5">Sistem akan otomatis mendeteksi QR Code kendaraan.</p>

                            {/* Kotak Kamera */}
                            <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-900" style={{ maxWidth: '340px' }}>
                                {scannedData ? (
                                    <div className="flex flex-col items-center justify-center bg-emerald-500 text-white p-10">
                                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <h4 className="font-bold text-lg">Berhasil Terdeteksi!</h4>
                                        <p className="text-sm opacity-90 mt-1">Membuka data kendaraan...</p>
                                    </div>
                                ) : (
                                    <div id="qr-reader" style={{ width: '100%' }} />
                                )}
                            </div>

                            {/* Pesan Error */}
                            {error && (
                                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200 text-left">
                                    <p className="font-bold mb-1">⚠️ Gagal membuka kamera</p>
                                    <p>{error}</p>
                                    <button
                                        onClick={resetScanner}
                                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition"
                                    >
                                        Coba Lagi
                                    </button>
                                </div>
                            )}

                            {/* Status aktif */}
                            {isStarted && !scannedData && !error && (
                                <p className="mt-4 text-xs text-slate-400 flex items-center justify-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    Kamera aktif — arahkan ke QR Code kendaraan
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
