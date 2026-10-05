import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';

// Indikator proses (loading) saat perpindahan halaman Inertia.
// Hanya SATU indikator yang tampil pada satu waktu:
// - Navigasi cepat  -> bar tipis di paling atas.
// - Navigasi lambat -> overlay logo berdenyut (bar disembunyikan).
export default function PulseLoader({ children }) {
    const [loading, setLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const overlayTimer = useRef(null);

    useEffect(() => {
        const offStart = router.on('start', () => {
            setLoading(true);
            overlayTimer.current = setTimeout(() => setShowOverlay(true), 350);
        });

        const stop = () => {
            if (overlayTimer.current) clearTimeout(overlayTimer.current);
            setShowOverlay(false);
            setLoading(false);
        };

        const offFinish = router.on('finish', stop);
        const offError = router.on('error', stop);

        return () => {
            offStart();
            offFinish();
            offError();
            if (overlayTimer.current) clearTimeout(overlayTimer.current);
        };
    }, []);

    return (
        <>
            <style>{`
                @keyframes gcProgress {
                    0%   { transform: scaleX(0); transform-origin: left; }
                    60%  { transform: scaleX(0.85); transform-origin: left; }
                    100% { transform: scaleX(0.95); transform-origin: left; }
                }
                .gc-progress-bar { animation: gcProgress 1.2s ease-out forwards; }
                @keyframes gcPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50%      { transform: scale(0.92); opacity: 0.55; }
                }
                .gc-pulse { animation: gcPulse 1s ease-in-out infinite; }
            `}</style>

            {children}

            {/* Bar tipis di atas - hanya saat loading cepat */}
            {loading && !showOverlay && (
                <div className="fixed top-0 left-0 right-0 z-[9999] h-1 pointer-events-none">
                    <div className="gc-progress-bar h-full w-full bg-gradient-to-r from-[#1d64f2] via-[#22d3ee] to-[#1245ab]" />
                </div>
            )}

            {/* Overlay satu indikator - hanya bila proses lama */}
            {showOverlay && (
                <div className="fixed inset-0 z-[9998] bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                    <img
                        src="/logo.png"
                        alt="Memuat"
                        className="gc-pulse w-14 h-14 object-contain"
                    />
                </div>
            )}
        </>
    );
}
