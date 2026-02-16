import React, { forwardRef } from 'react';

const MustangTemplate = forwardRef(({ data }, ref) => {
  const subtotal = data.items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0);
  const taxAmount = (subtotal * (Number(data.tax) || 0)) / 100;
  const total = subtotal + taxAmount;

  // ডায়নামিক এডজাস্টমেন্ট - আইটেম বেশি হলে রো প্যাডিং অ্যাডজাস্ট হবে
  const itemCount = data.items.length;
  const isCompact = itemCount > 8;
  const pyClass = isCompact ? 'py-1.5' : 'py-4';

  return (
    <div ref={ref} id="invoice-capture" className="bg-white a4-page a4-print-fix flex flex-col mx-auto relative text-[#231f20] font-sans overflow-hidden" style={{ width: '210mm', minHeight: '297mm', padding: '0', boxSizing: 'border-box' }}>
      
      {/* --- TOP HEADER: BRANDING & CONTACT --- */}
      <header className="px-12 py-4 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
             {data.logo ? (
               <img 
                 src={data.logo} 
                 alt="Logo" 
                 style={{ 
                   height: `${data.logoSize || 60}px`, 
                   width: 'auto',
                   maxWidth: '250px',
                   objectFit: 'contain' 
                 }} 
               />
             ) : (
               <div className="flex items-center justify-center" style={{ height: `${data.logoSize || 60}px`, width: `${data.logoSize || 60}px` }}>
                 <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="#92c83e" strokeWidth="10"/>
                    <path d="M50 20L30 60H70L50 20Z" fill="#231f20"/>
                 </svg>
               </div>
             )}
             <div>
               <h1 className="text-3xl font-[1000] tracking-tighter text-[#231f20] leading-none">
                 {data.brandName || "Mustang"}
               </h1>
               {data.tagline && (
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                   {data.tagline}
                 </p>
               )}
             </div>
          </div>

          <div className="flex gap-8 text-[11px] font-bold text-slate-600">
            <div className="flex flex-col items-end gap-1 border-r border-slate-200 pr-6">
              <div className="flex items-center gap-2">
                <span className="text-[#92c83e] text-[9px] uppercase tracking-tighter">Call:</span>
                <p className="text-[#231f20]">{data.phone || "779.00.9876435"}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#92c83e] text-[9px] uppercase tracking-tighter">Mail:</span>
                <p className="lowercase text-[#231f20]">{data.email || "mustang@email.com"}</p>
              </div>
            </div>
            <div className="text-right max-w-[200px] leading-[1.4] flex flex-col justify-center">
              <p className="text-[9px] text-[#92c83e] uppercase mb-0.5 tracking-widest">Location</p>
              <p className="text-[#231f20] opacity-90 leading-tight">
                {data.address || "3137/LA, Buckhannan Avenue, Barneston NE, Nebraska-68309"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* --- CLIENT & INVOICE DETAILS --- */}
      <section className="px-12 py-4 flex justify-between items-stretch gap-6">
        <div className="w-[260px] border border-slate-200 shadow-sm rounded-sm flex flex-col">
          <div className="bg-[#92c83e] text-white px-3 py-2 text-[11px] font-[1000] uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            INVOICE TO
          </div>
          <div className="p-4 flex-1 bg-white">
            <h3 className="text-[17px] font-[1000] text-[#231f20] uppercase leading-none mb-2 tracking-tight">
              {data.client || "DWYANE CLARK"}
            </h3>
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400">ID: 123-45G-789459</p>
              <p className="text-[12px] font-bold text-[#92c83e] italic">{data.clientEmail || "client@email.com"}</p>
              <p className="text-[11px] text-slate-600 font-bold leading-normal mt-1 uppercase opacity-90 whitespace-pre-line">
                {data.clientAddress || "24 Dummy Street Area, Location"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-end justify-end pb-1">
          <div className="text-right mb-2">
            <h2 className="text-4xl font-[1000] tracking-tight text-[#92c83e] uppercase italic leading-none">
              INVOICE
            </h2>
            <div className="h-1 w-12 bg-[#92c83e]/20 mt-1 ml-auto"></div>
          </div>
          
          <div className="w-[250px] bg-white border border-slate-200 p-4 relative rounded-sm shadow-sm flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#92c83e]"></div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-black uppercase">
                <span className="text-slate-400 tracking-tighter">Invoice No</span>
                <span className="text-slate-900">: &nbsp; {data.invoiceNo || "52148"}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black uppercase">
                <span className="text-slate-400 tracking-tighter">Date</span>
                <span className="text-slate-900">: &nbsp; {data.date || "01 / 02 / 2020"}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black uppercase">
                <span className="text-slate-400 tracking-tighter">Account</span>
                <span className="text-slate-900 font-[1000]">: &nbsp; {data.accountNo || "1234 5678 9012"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TABLE SECTION --- */}
      <section className="px-12 flex-1 mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#92c83e] text-white text-[11px] font-[1000] uppercase tracking-wider">
              <th className="py-3 px-4 text-left w-16">NO</th>
              <th className="py-3 px-4 text-left">DESCRIPTION</th>
              <th className="py-3 px-4 text-center w-24">QTY</th>
              <th className="py-3 px-4 text-center w-32">PRICE</th>
              <th className="py-3 px-4 text-right w-32">TOTAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 border-x border-b border-slate-100">
            {data.items.map((item, index) => (
              <tr key={item.id}>
                <td className={`${pyClass} px-4 text-[11px] font-bold text-slate-400 text-center`}>
                  {String(index + 1).padStart(2, '0')}
                </td>
                <td className={`${pyClass} px-4 text-[12px] font-bold text-[#231f20]`}>
                  {item.desc || "Item Description"}
                </td>
                <td className={`${pyClass} px-4 text-center text-[12px] font-bold text-[#231f20]`}>
                  {String(item.qty).padStart(2, '0')}
                </td>
                <td className={`${pyClass} px-4 text-center text-[12px] font-bold text-[#231f20]`}>
                  {data.currency}{Number(item.price).toFixed(2)}
                </td>
                <td className={`${pyClass} px-4 text-right text-[12px] font-[1000] text-[#231f20]`}>
                  {data.currency}{(item.qty * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* --- FOOTER: TOTALS & SIGNATURE --- */}
      <footer className="px-12 pb-12 mt-auto">
        <div className="flex justify-between items-start gap-10">
          <div className="flex-1 flex flex-col gap-6">
             <div className="bg-slate-50 p-4 rounded-sm border-l-4 border-[#92c83e] max-w-[320px]">
               <h4 className="text-[11px] font-[1000] text-[#92c83e] uppercase mb-2 tracking-widest flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-[#92c83e] rounded-full"></span>
                 Payment Info
               </h4>
               <div className="space-y-1.5 pl-3">
                 <div className="flex items-center gap-3 text-[11px] font-bold">
                   <span className="text-slate-400 w-12 uppercase text-[9px]">Paypal</span>
                   <span className="text-slate-300">:</span>
                   <span className="text-slate-700 lowercase">{data.bankDetails || "mustang@email.com"}</span>
                 </div>
                 <div className="flex items-center gap-3 text-[11px] font-bold">
                   <span className="text-slate-400 w-12 uppercase text-[9px]">A/C No</span>
                   <span className="text-slate-300">:</span>
                   <span className="text-slate-700">{data.accountNo || "1234 5678 9012"}</span>
                 </div>
               </div>
             </div>

             <div className="pl-4">
               <p className="text-[10px] font-black text-[#231f20] mb-2 uppercase tracking-tighter opacity-70">
                 We Accept :
               </p>
               <div className="flex gap-3 items-center opacity-60 grayscale">
                 <span className="text-[9px] font-black border border-slate-300 px-2 py-0.5 rounded uppercase">Visa</span>
                 <span className="text-[9px] font-black border border-slate-300 px-2 py-0.5 rounded uppercase">MasterCard</span>
                 <span className="text-[9px] font-black border border-slate-300 px-2 py-0.5 rounded uppercase">Cheque</span>
               </div>
             </div>
          </div>

          <div className="w-[280px]">
            <div className="space-y-2 mb-2 pr-4">
              <div className="flex justify-between text-[12px] font-[1000] uppercase">
                <span className="text-slate-800 tracking-tight">Subtotal</span>
                <span className="text-slate-800">{data.currency}{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between text-[12px] font-[1000] uppercase">
                <span className="text-slate-800 tracking-tight">Tax {data.tax}%</span>
                <span className="text-slate-800">{data.currency}{taxAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
            </div>
            
            <div className="bg-[#e6e7e8] p-3 flex justify-between items-center mt-2 rounded-sm shadow-sm">
              <span className="text-[12px] font-[1000] uppercase text-slate-900 tracking-wider">Grand Total</span>
              <span className="text-[18px] font-[1000] text-slate-900">{data.currency}{total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end mt-12">
          <div className="space-y-1">
            <h4 className="text-[14px] font-[1000] text-[#92c83e]">Thank you for your Business</h4>
            <p className="text-[9px] text-slate-400 font-bold max-w-[350px]">
              There are many variations of passages of Lorem Ipsum available
            </p>
          </div>

          <div className="w-48 text-center flex flex-col items-center">
            <div className="h-10 flex items-center justify-center mb-1">
              {data.sigType === 'draw' && data.signature ? (
                <img src={data.signature} alt="Sign" className="max-h-full" />
              ) : (
                <span 
                  style={{ fontFamily: data.sigFont || "'Dancing Script', cursive" }} 
                  className="text-2xl text-slate-800 leading-none "
                >
                  {data.sigText || "Signature"}
                </span>
              )}
            </div>
            <div className="w-full h-[1.5px] bg-[#92c83e]"></div>
            <p className="text-[10px] font-[1000] text-[#231f20] mt-1.5 uppercase tracking-tighter">
              {data.sigName || "Authorised Person"}
            </p>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">
              {data.sigTitle || "General Manager"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default MustangTemplate;