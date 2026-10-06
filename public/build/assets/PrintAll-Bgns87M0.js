import{c as e,n as t,t as n,u as r}from"./app-CABwbawd.js";import{t as i}from"./esm-DYPtxNc5.js";var a=r(e(),1),o=n();function s({kendaraans:e,kategori:n}){(0,a.useEffect)(()=>{setTimeout(()=>{window.print()},500)},[]);let r=[];for(let t=0;t<e.length;t+=4)r.push(e.slice(t,t+4));return(0,o.jsxs)(`div`,{className:`bg-gray-100 min-h-screen`,children:[(0,o.jsx)(t,{title:`Barcode - ${n}`}),(0,o.jsxs)(`div`,{className:`no-print p-4 bg-white shadow flex justify-between items-center fixed top-0 w-full z-10`,children:[(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`h1`,{className:`text-xl font-bold text-gray-800`,children:`Pratinjau Cetak Barcode`}),(0,o.jsxs)(`p`,{className:`text-sm text-gray-500`,children:[`Kategori: `,n,` • Total: `,e.length,` Kendaraan`]})]}),(0,o.jsxs)(`div`,{className:`space-x-3`,children:[(0,o.jsx)(`button`,{onClick:()=>window.close(),className:`px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors`,children:`Tutup`}),(0,o.jsx)(`button`,{onClick:()=>window.print(),className:`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors`,children:`🖨️ Cetak Sekarang`})]})]}),(0,o.jsx)(`div`,{className:`no-print h-24`}),(0,o.jsx)(`style`,{children:`
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
            `}),(0,o.jsx)(`div`,{className:`print-container`,children:r.length===0?(0,o.jsx)(`div`,{className:`text-center p-10 text-gray-500 bg-white shadow mx-auto mt-10 max-w-lg rounded-lg border border-gray-200`,children:`Tidak ada data kendaraan untuk dicetak pada kategori ini.`}):r.map((e,t)=>(0,o.jsxs)(`div`,{className:`print-page bg-white`,children:[(0,o.jsxs)(`div`,{className:`absolute top-4 left-0 w-full text-center text-sm font-bold text-gray-500 tracking-wider`,children:[`BARCODE - `,n.toUpperCase()]}),(0,o.jsxs)(`div`,{className:`barcode-grid`,children:[e.map((e,t)=>(0,o.jsxs)(`div`,{className:`barcode-container`,children:[(0,o.jsx)(i,{value:window.location.origin+`/scan/`+e.kode_unik,size:180}),(0,o.jsx)(`p`,{className:`mt-4 font-mono font-bold text-2xl text-black uppercase tracking-wider`,children:e.nomor_kendaraan})]},e.id)),e.length<4&&Array.from({length:4-e.length}).map((e,t)=>(0,o.jsx)(`div`,{className:`barcode-container`},`empty-${t}`))]})]},t))})]})}export{s as default};