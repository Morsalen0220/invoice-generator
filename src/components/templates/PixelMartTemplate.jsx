import React, { forwardRef } from 'react';

const PixelMartTemplate = forwardRef(({ data }, ref) => {
  const subtotal = data.items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0);
  const taxAmount = (subtotal * (Number(data.tax) || 0)) / 100;
  const discount = (subtotal * 5) / 100; 
  const total = subtotal + taxAmount - discount;

  return (
    <div ref={ref} className="bg-white a4-page a4-print-fix flex flex-col mx-auto relative text-slate-800 font-sans overflow-hidden" style={{ width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
      
      {/* --- TOP HEADER: BRANDING & LOGO ONLY --- */}
      <header className="flex justify-between items-center px-12 pt-12 pb-6 border-b-2 border-slate-100">
        {/* Left: Logo & Brand Name */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-[#00c853] rounded-2xl flex items-center justify-center shadow-lg transform rotate-[-5deg]">
             {data.logo ? (
               <img src={data.logo} alt="Logo" className="max-h-full object-contain" />
             ) : (
               <div className="w-8 h-8 border-[6px] border-white rounded-full border-t-transparent rotate-45"></div>
             )}
          </div>
          <div>
            <h1 className="text-4xl font-[1000] tracking-tighter text-slate-900 uppercase leading-none">{data.brandName}</h1>
            <p className="text-[11px] font-bold text-[#00c853] uppercase tracking-[0.3em] mt-1">{data.tagline}</p>
          </div>
        </div>

        {/* Right: Modern Decoration or Slogan */}
        <div className="text-right">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Official Invoice Document</p>
        </div>
      </header>

      {/* --- INFO ROW: INVOICE TO (LEFT) & INVOICE DETAILS (RIGHT) --- */}
      <div className="px-12 py-10 grid grid-cols-2 gap-10 items-start">
        {/* Left: Client Info */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Invoice To:</p>
          <h3 className="text-2xl font-black text-slate-900 uppercase leading-none mb-1">{data.client}</h3>
          <p className="text-[11px] font-bold text-[#00c853] uppercase mb-4">Manager, Company Name</p>
          <div className="text-[11px] font-bold text-slate-500 space-y-1">
             <p>{data.clientAddress.split('\n')[0]}</p>
             <p>P : +000 1234 5678</p>
          </div>
        </div>

        {/* Right: Invoice Details (Moved from Header) */}
        <div className="flex flex-col items-end text-right">
          <div className="bg-slate-900 text-white px-6 py-2 font-black text-[13px] mb-4 tracking-widest uppercase">
             INVOICE NO: #{data.invoiceNo}
          </div>
          <div className="space-y-1.5">
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date: <span className="text-slate-900 ml-4">{data.date}</span></p>
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Account No: <span className="text-slate-900 ml-4">280090</span></p>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="px-12 flex-1">
        <table className="w-full">
          <thead>
            <tr className="text-white text-[11px] font-black uppercase tracking-widest">
              <th className="bg-[#333333] py-4 px-6 text-left rounded-tl-xl w-[45%]">Item Description</th>
              <th className="bg-[#00c853] py-4 text-center w-24">Qty</th>
              <th className="bg-[#333333] py-4 text-center w-32">Price</th>
              <th className="bg-[#00c853] py-4 text-right px-6 w-32 rounded-tr-xl">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.items.map((item, index) => (
              <tr key={item.id} className={index % 2 !== 0 ? 'bg-slate-50/50' : ''}>
                <td className="py-5 px-6">
                  <div className="font-black text-slate-800 text-[14px]">{item.desc}</div>
                </td>
                <td className="py-5 text-center font-bold text-slate-600">{String(item.qty).padStart(2, '0')}</td>
                <td className="py-5 text-center font-bold text-slate-600">{data.currency}{Number(item.price).toLocaleString()}</td>
                <td className="py-5 text-right px-6 font-black text-slate-900">{data.currency}{(item.qty * item.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- BOTTOM SECTION: PAYMENT, TERMS & SIGNATURE (LEFT) | TOTALS (RIGHT) --- */}
      <div className="px-12 py-10 mt-auto bg-slate-50/30">
        <div className="flex justify-between items-end gap-10">
          
          {/* Left Side: Stacking Payment, Terms, and Signature */}
          <div className="flex-1 space-y-6">
            {data.showPayment && (
              <div className="text-[10px] font-bold text-slate-500">
                <p className="text-slate-900 font-black uppercase mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-[#00c853]"></span> Payment Info
                </p>
                <p className="pl-3">{data.bankDetails} | A/C: {data.accountNo}</p>
              </div>
            )}
            
            {data.showTerms && (
              <div className="max-w-xs text-[9px] text-slate-400 font-medium">
                <p className="text-slate-800 font-black uppercase mb-1">Terms & Conditions</p>
                <p className="leading-tight pl-3 border-l border-slate-200">{data.terms}</p>
              </div>
            )}

            {/* Compact Signature Area */}
            <div className="flex flex-col items-start pt-4">
                <div className="h-10 flex items-center">
                    {data.sigType === 'draw' && data.signature ? (
                        <img src={data.signature} alt="Sign" className="max-h-full" />
                    ) : (
                        <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-3xl text-slate-800 leading-none">{data.sigText}</span>
                    )}
                </div>
                <div className="w-40 border-t-2 border-slate-900 mt-1"></div>
                <p className="text-[10px] font-black text-slate-900 uppercase mt-1 tracking-tighter">Authorized Signature</p>
            </div>
          </div>

          {/* Right Side: Totals Box */}
          <div className="w-80">
            <div className="space-y-1.5 mb-4 text-right px-4">
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Sub Total</span>
                <span className="text-slate-900 font-black">{data.currency}{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
                <span>Tax {data.tax}%</span>
                <span className="text-slate-900 font-black">{data.currency}{taxAmount.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="bg-[#00c853] text-white p-5 flex justify-between items-center shadow-xl shadow-green-500/10 rounded-2xl">
              <span className="font-black uppercase text-xs tracking-[0.2em]">Grand Total</span>
              <span className="text-3xl font-[1000] italic tracking-tighter">{data.currency}{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER: CONTACT & LOCATION --- */}
      <footer className="relative h-20 w-full">
         <div className="absolute bottom-0 left-0 w-full h-[70%] bg-[#1f2937] flex items-center px-12 gap-8 text-white z-10">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#1f2937] text-[11px]">📞</div>
                <span className="text-[10px] font-bold tracking-wider">+000 1234 6789</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#00c853] rounded-full flex items-center justify-center text-white text-[11px]">🌐</div>
                <span className="text-[10px] font-bold tracking-wider">urwebsitename.com</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#1f2937] text-[11px]">📍</div>
                <span className="text-[10px] font-bold tracking-wider uppercase tracking-tighter">Street Address write Here, 100</span>
            </div>
         </div>

         {/* Geometric Footer Decoration */}
         <div className="absolute bottom-0 right-0 w-[45%] h-full">
            <div className="absolute bottom-0 right-0 w-full h-[85%] bg-[#00c853]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}></div>
            <div className="absolute bottom-0 left-[5%] w-[30%] h-[40%] bg-white" style={{ clipPath: 'polygon(30% 0, 100% 0, 70% 100%, 0% 100%)' }}></div>
         </div>
      </footer>
    </div>
  );
});

export default PixelMartTemplate;