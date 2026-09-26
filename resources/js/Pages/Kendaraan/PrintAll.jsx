import { Head } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';

export default function PrintAll({ kendaraans, kategori }) {
    useEffect(() => {
        // Otomatis memunculkan dialog print ketika halaman dimuat
        setTimeout(() => {
            window.print();
        }, 500);
    }, []);

    const chunks = [];
    for (let i = 0; i < kendaraans.length; i += 4) {
        chunks.push(kendaraans.slice(i, i + 4));
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Head title={`Barcode - ${kategori}`} />

            {/* Tombol Aksi Untuk Tampilan Layar Saja (Disembunyikan Saat Print) */}
            <div className="no-print p-4 bg-white shadow flex justify-between items-center fixed top-0 w-full z-10">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Pratinjau Cetak Barcode</h1>
                    <p className="text-sm text-gray-500">Kategori: {kategori} • Total: {kendaraans.length} Kendaraan</p>
                </div>
                <div className="space-x-3">
                    <button 
                        onClick={() => window.close()} 
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                    >
                        Tutup
                    </button>
                    <button 
                        onClick={() => window.print()} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                    >
                        🖨️ Cetak Sekarang
                    </button>
                </div>
            </div>

            {/* Spacer Untuk Layar Karena Topik Navbar Fixed */}
            <div className="no-print h-24"></div>

            <style>{`
                @media print {
                    @page { size: A4; margin: 0; }
                    body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    .print-page {
                        width: 210mm;
                        height: 297mm;
                        page-break-after: always;
                        overflow: hidden;
                        position: relative;
                    }
                    .barcode-grid {
                        width: 100%;
                        height: 100%;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: 1fr 1fr;
                    }
                    .barcode-container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        border: 1px dashed #ccc;
                        box-sizing: border-box;
                        position: relative;
                    }
                }
                
                @media screen {
                    .print-page {
                        width: 210mm;
                        height: 297mm;
                        margin: 0 auto 20px auto;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        background: white;
                        position: relative;
                    }
                    .barcode-grid {
                        width: 100%;
                        height: 100%;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: 1fr 1fr;
                    }
                    .barcode-container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        border: 1px dashed #ccc;
                        box-sizing: border-box;
                        position: relative;
                    }
                }
            `}</style>

            <div className="print-container">
                {chunks.length === 0 ? (
                    <div className="text-center p-10 text-gray-500 bg-white shadow mx-auto mt-10 max-w-lg rounded-lg border border-gray-200">
                        Tidak ada data kendaraan untuk dicetak pada kategori ini.
                    </div>
                ) : (
                    chunks.map((chunk, pageIndex) => (
                        <div key={pageIndex} className="print-page bg-white">
                            {/* Marker Kategori di atas halaman */}
                            <div className="absolute top-4 left-0 w-full text-center text-sm font-bold text-gray-500 tracking-wider">
                                BARCODE - {kategori.toUpperCase()}
                            </div>
                            
                            <div className="barcode-grid">
                                {chunk.map((k, index) => (
                                    <div key={k.id} className="barcode-container">
                                        <QRCodeSVG 
                                            value={window.location.origin + '/scan/' + k.kode_unik} 
                                            size={180}
                                        />
                                        <p className="mt-4 font-mono font-bold text-2xl text-black uppercase tracking-wider">
                                            {k.nomor_kendaraan}
                                        </p>
                                    </div>
                                ))}
                                {/* Jika item kurang dari 4 di halaman terakhir, isi kekosongan agar grid tetap terjaga */}
                                {chunk.length < 4 && Array.from({ length: 4 - chunk.length }).map((_, i) => (
                                    <div key={`empty-${i}`} className="barcode-container" />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
