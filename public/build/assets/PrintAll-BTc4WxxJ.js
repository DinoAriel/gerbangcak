import{r as d,j as e,H as l}from"./app-oRa1fIO6.js";import{Q as c}from"./index-2QZ_HUNZ.js";function x({kendaraans:a,kategori:r}){d.useEffect(()=>{setTimeout(()=>{window.print()},500)},[]);const n=[];for(let t=0;t<a.length;t+=4)n.push(a.slice(t,t+4));return e.jsxs("div",{className:"bg-gray-100 min-h-screen",children:[e.jsx(l,{title:`Barcode - ${r}`}),e.jsxs("div",{className:"no-print p-4 bg-white shadow flex justify-between items-center fixed top-0 w-full z-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-bold text-gray-800",children:"Pratinjau Cetak Barcode"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Kategori: ",r," • Total: ",a.length," Kendaraan"]})]}),e.jsxs("div",{className:"space-x-3",children:[e.jsx("button",{onClick:()=>window.close(),className:"px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors",children:"Tutup"}),e.jsx("button",{onClick:()=>window.print(),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors",children:"🖨️ Cetak Sekarang"})]})]}),e.jsx("div",{className:"no-print h-24"}),e.jsx("style",{children:`
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
            `}),e.jsx("div",{className:"print-container",children:n.length===0?e.jsx("div",{className:"text-center p-10 text-gray-500 bg-white shadow mx-auto mt-10 max-w-lg rounded-lg border border-gray-200",children:"Tidak ada data kendaraan untuk dicetak pada kategori ini."}):n.map((t,o)=>e.jsxs("div",{className:"print-page bg-white",children:[e.jsxs("div",{className:"absolute top-4 left-0 w-full text-center text-sm font-bold text-gray-500 tracking-wider",children:["BARCODE - ",r.toUpperCase()]}),e.jsxs("div",{className:"barcode-grid",children:[t.map((i,s)=>e.jsxs("div",{className:"barcode-container",children:[e.jsx(c,{value:window.location.origin+"/scan/"+i.kode_unik,size:180}),e.jsx("p",{className:"mt-4 font-mono font-bold text-2xl text-black uppercase tracking-wider",children:i.nomor_kendaraan})]},i.id)),t.length<4&&Array.from({length:4-t.length}).map((i,s)=>e.jsx("div",{className:"barcode-container"},`empty-${s}`))]})]},o))})]})}export{x as default};
