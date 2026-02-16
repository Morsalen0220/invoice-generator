import React, { forwardRef } from 'react';

const MinimalBlueTemplate = forwardRef(({ data }, ref) => {
  const subtotal = data.items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0);
  const rate = Number(data.tax) || 0;
  const isDiscount = data.adjustmentType === 'discount';
  const adjustmentAmount = (subtotal * rate) / 100;
  const total = isDiscount ? subtotal - adjustmentAmount : subtotal + adjustmentAmount;

  // --- স্মার্ট ডায়নামিক এডজাস্টমেন্ট ---
  const itemCount = data.items.length;
  
  // ১২টি আইটেম পর্যন্ত ফন্ট বড় থাকবে, এরপর ধীরে ধীরে ছোট হবে
  const isCompact = itemCount > 7;
  const isExtraCompact = itemCount > 12;

  // ডায়নামিক স্টাইল ভেরিয়েবল
  const fontSize = isExtraCompact ? 'text-[10px]' : isCompact ? 'text-[12px]' : 'text-[14px]';
  const rowPadding = isExtraCompact ? 'py-2' : isCompact ? 'py-3' : 'py-5';
  const headerPadding = isCompact ? 'pt-8 pb-4' : 'pt-16 pb-10';

  return (
    <div 
      ref={ref} 
      className="bg-white a4-print-fix flex flex-col mx-auto relative text-slate-800 font-sans overflow-hidden" 
      style={{ 
        width: '210mm', 
        height: '297mm', 
        maxHeight: '297mm',
        padding: '0', 
        boxSizing: 'border-box' 
      }}
    >
      
      {/* --- HEADER SECTION --- */}
      <header className={`flex justify-between items-start px-16 ${headerPadding}`}>
        <div className="flex items-start gap-4">
          <div className="mt-1">
             {data.logo ? (
               <img src={data.logo} alt="Logo" className="w-12 h-12 object-contain" />
             ) : (
               <div className="w-12 h-12 bg-[#00adef] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                 <div className="w-6 h-6 border-[5px] border-white rotate-45 border-b-transparent border-r-transparent"></div>
               </div>
             )}
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#231f20] leading-tight tracking-tight">{data.brandName}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">{data.tagline}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-6xl font-black tracking-tighter text-[#231f20] mb-3 leading-none">INVOICE</h2>
          <div className="h-2 w-72 bg-[#00adef] ml-auto"></div>
        </div>
      </header>

      {/* --- CLIENT INFO --- */}
      <section className={`px-16 grid grid-cols-2 gap-10 ${isCompact ? 'mb-6' : 'mb-12'}`}>
        <div className="flex gap-4">
          <h3 className="text-base font-black text-[#231f20] whitespace-nowrap mt-0.5">Invoice to:</h3>
          <div>
            <p className="text-lg font-black text-[#231f20] uppercase leading-none">{data.client}</p>
            <p className="text-[12px] text-slate-500 font-bold leading-relaxed mt-2 whitespace-pre-line opacity-80">{data.clientAddress}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="grid grid-cols-[110px_1fr] gap-y-2 text-[15px] font-black">
            <span className="text-[#231f20] uppercase tracking-wider">Invoice#</span>
            <span className="text-slate-600 font-bold">{data.invoiceNo}</span>
            <span className="text-[#231f20] uppercase tracking-wider">Date:</span>
            <span className="text-slate-600 font-bold">{data.date}</span>
          </div>
        </div>
      </section>

      {/* --- TABLE SECTION (BLUE BAR MATCHING TABLE HEIGHT) --- */}
   

{/* --- TABLE SECTION --- */}
<section className="relative flex-1">
  {/* বাম পাশের নীল স্ট্রাইপ */}
  <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#00adef]"></div>
  
  <div className="pl-10 pr-16"> 
    <table className="w-full border-collapse">
      <thead>
        {/* প্রথম সারি বা হেডার (বর্ডার ছাড়া) */}
        <tr className="bg-[#f2f2f2] text-left">
          <th className="py-4 px-4 text-[12px] font-black text-[#231f20] uppercase tracking-widest w-20 text-center border-r border-white/50">SL.</th>
          <th className="py-4 px-6 text-[12px] font-black text-[#231f20] uppercase tracking-widest">Item Description</th>
          <th className="py-4 px-4 text-center text-[12px] font-black text-[#231f20] uppercase tracking-widest w-32">Price</th>
          <th className="py-4 px-4 text-center text-[12px] font-black text-[#231f20] uppercase tracking-widest w-24">Qty.</th>
          <th className="py-4 px-6 text-right text-[12px] font-black text-[#231f20] uppercase tracking-widest w-36">Total</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/40">
        {data.items.map((item, index) => (
          /* এখানে border-b border-slate-300/60 যোগ করা হয়েছে প্রতিটি আইটেমের নিচে বর্ডার দেওয়ার জন্য */
          <tr key={item.id} className="bg-[#f2f2f2] border-b border-slate-300/60 last:border-0">
            <td className={`${rowPadding} px-4 ${fontSize} font-bold text-slate-500 text-center border-r border-white/50`}>{index + 1}</td>
            <td className={`${rowPadding} px-6 ${fontSize} font-bold text-slate-800`}>{item.desc || "Item Name"}</td>
            <td className={`${rowPadding} px-4 text-center ${fontSize} font-bold text-slate-500`}>{data.currency}{Number(item.price).toLocaleString()}</td>
            <td className={`${rowPadding} px-4 text-center ${fontSize} font-bold text-slate-500`}>{item.qty}</td>
            <td className={`${rowPadding} px-6 text-right ${fontSize} font-black text-slate-900`}>{data.currency}{(item.qty * item.price).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>


      {/* --- FOOTER SECTION --- */}
      <footer className="px-16 pt-10 pb-16 mt-auto">
        <div className="grid grid-cols-2 gap-10 items-end">
          <div className="space-y-8">
            <p className="text-[14px] font-black text-[#231f20] italic">Thank you for your business</p>
            
            {data.showPayment && (
              <div className="space-y-2">
                <h4 className="text-[13px] font-black text-[#00adef] uppercase tracking-widest">Payment Info:</h4>
                <div className="text-[11px] space-y-1 font-bold text-slate-500">
                  <div className="grid grid-cols-[100px_1fr]"><span>Account #:</span> <span className="text-slate-800 font-black">{data.accountNo}</span></div>
                  <div className="grid grid-cols-[100px_1fr]"><span>A/C Name:</span> <span className="text-slate-800 font-black">{data.accountName}</span></div>
                </div>
              </div>
            )}

            {data.showTerms && (
              <div className="pt-6 border-t border-slate-200">
                <p className="text-[10px] text-slate-400 leading-relaxed font-bold max-w-sm">{data.terms}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end">
            <div className={`w-72 space-y-2 ${isCompact ? 'mb-8' : 'mb-16'}`}>
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span>Sub Total:</span> 
                <span className="text-slate-900 font-black">{data.currency}{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span>{isDiscount ? `Discount (${rate}%)` : `Tax (${rate}%)`}:</span> 
                <span className="text-slate-900 font-black">{data.currency}{adjustmentAmount.toLocaleString()}</span>
              </div>
              <div className="border-t-2 border-[#231f20] my-3"></div>
              <div className="flex justify-between text-2xl font-black text-[#231f20]">
                <span className="tracking-tighter uppercase italic">Total:</span> 
                <span className="tracking-tighter">{data.currency}{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="w-56 text-center">
              <div className="h-12 flex items-center justify-center mb-1">
                {data.sigType === 'draw' && data.signature ? (
                  <img src={data.signature} alt="Sign" className="max-h-full" />
                ) : (
                  <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-3xl text-[#231f20] font-bold">{data.sigText}</span>
                )}
              </div>
              <div className="border-t-2 border-slate-400 w-full mb-1"></div>
              <span className="text-[11px] font-black text-[#231f20] uppercase tracking-[0.2em]">Authorised Sign</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default MinimalBlueTemplate;