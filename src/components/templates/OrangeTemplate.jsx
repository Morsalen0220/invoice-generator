import React, { forwardRef } from 'react';

const OrangeTemplate = forwardRef(({ data }, ref) => {
  const subtotal = data.items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0);
  const taxAmount = (subtotal * (Number(data.tax) || 0)) / 100;
  const total = subtotal + taxAmount;

  return (
    <div ref={ref} className="bg-white a4-print-fix flex flex-col mx-auto relative text-slate-800 font-sans overflow-hidden" style={{ width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}>
      {/* Header Accent */}
      <div className="relative h-32 w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-[45%] h-full bg-[#2c3e50]" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}></div>
        <div className="absolute top-0 right-0 w-[65%] h-full bg-gradient-to-r from-[#ff4d00] to-[#ff8c00]" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}>
          <div className="h-full flex flex-col justify-center items-end pr-16 text-white text-right">
            <span className="text-2xl font-black uppercase tracking-tight">{data.brandName}</span>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-80 mt-1">{data.tagline}</p>
          </div>
        </div>
        <h1 className="absolute top-8 left-16 text-5xl font-black tracking-widest text-[#2c3e50] z-10 leading-none uppercase italic">INVOICE</h1>
      </div>

      {/* Info Section */}
      <div className="px-16 pt-6 pb-6 grid grid-cols-2 gap-10">
        <div>
          <h3 className="text-xl font-black text-[#2c3e50] mb-1 italic underline underline-offset-4 decoration-[#ff4d00]">Invoice to:</h3>
          <p className="text-lg font-black text-slate-800 uppercase leading-tight">{data.client}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed whitespace-pre-line">{data.clientAddress}</p>
        </div>
        <div className="flex flex-col justify-center items-end text-right">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <span className="text-sm font-black text-[#2c3e50] uppercase">Invoice#</span> <span className="text-sm font-bold text-slate-600 tracking-widest">{data.invoiceNo}</span>
            <span className="text-sm font-black text-[#2c3e50] uppercase">Date</span> <span className="text-sm font-bold text-slate-600 tracking-widest">{data.date}</span>
          </div>
        </div>
      </div>

      {/* Item Table */}
      <div className="px-16 flex-1">
        <table className="w-full">
          <thead>
            <tr className="border-2 border-[#ff4d00] bg-white text-left">
              <th className="py-2 px-4 text-sm font-black text-[#2c3e50] w-12 border-r-2 border-[#ff4d00]">SL.</th>
              <th className="py-2 px-4 text-sm font-black text-[#2c3e50]">Item Description</th>
              <th className="py-2 px-4 text-center text-sm font-black text-[#2c3e50] w-28">Price</th>
              <th className="py-2 px-4 text-center text-sm font-black text-[#2c3e50] w-20">Qty.</th>
              <th className="py-2 px-4 text-right text-sm font-black text-[#2c3e50] w-32">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.items.map((item, index) => (
              <tr key={item.id}>
                <td className="py-4 px-4 text-center text-sm font-bold text-slate-600">{index + 1}</td>
                <td className="py-4 px-4 text-sm font-bold text-slate-700">{item.desc || "Service/Product"}</td>
                <td className="py-4 px-4 text-center text-sm font-bold text-slate-600">{data.currency}{Number(item.price).toLocaleString()}</td>
                <td className="py-4 px-4 text-center text-sm font-bold text-slate-600">{item.qty}</td>
                <td className="py-4 px-4 text-right text-sm font-bold text-slate-800">{data.currency}{(Number(item.qty) * Number(item.price)).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment, Terms & Total */}
      <div className="px-16 py-6 grid grid-cols-2 gap-10 border-t border-slate-100 mt-2">
        <div className="space-y-6">
          <p className="text-xs font-black text-[#2c3e50] italic uppercase">Thank you for your business</p>
          
          {data.showPayment && (
          <div>
            <h4 className="text-xs font-black text-[#2c3e50] mb-2 uppercase tracking-widest border-l-2 border-[#ff4d00] pl-2">Payment Info:</h4>
            <div className="text-[10px] space-y-1 font-bold text-slate-500">
              <div className="grid grid-cols-[80px_1fr]"><span>Account #:</span> <span className="text-slate-800">{data.accountNo}</span></div>
              <div className="grid grid-cols-[80px_1fr]"><span>A/C Name:</span> <span className="text-slate-800">{data.accountName}</span></div>
              <div className="grid grid-cols-[80px_1fr]"><span>Bank Details:</span> <span className="text-slate-800">{data.bankDetails}</span></div>
            </div>
          </div>
          )}
          {data.showTerms && (
  <div className="mt-4">
    <h4 className="text-xs font-black text-[#2c3e50] mb-1 uppercase tracking-widest border-l-2 border-[#ff4d00] pl-2">Terms & Conditions</h4>
    <p className="text-[10px] text-slate-500 font-medium leading-relaxed max-w-xs">{data.terms}</p>
  </div>
)}
        </div>

        <div className="flex flex-col items-end">
          <div className="w-56 space-y-3 mb-8">
            <div className="flex justify-between text-sm"><span>Sub Total:</span> <span className="font-bold">{data.currency}{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm border-b-2 border-[#2c3e50] pb-2"><span>Tax:</span> <span className="font-bold">{(Number(data.tax) || 0).toFixed(2)}%</span></div>
            <div className="flex justify-between text-xl font-black text-[#2c3e50] italic pt-1"><span>Total:</span> <span>{data.currency}{total.toLocaleString()}</span></div>

            {/* Signature Area */}
            <div className="pt-12 text-center w-full flex flex-col items-center">
              <div className="h-12 flex items-center justify-center mb-1">
                {data.sigType === 'draw' && data.signature ? (
                  <img src={data.signature} alt="Sign" className="max-h-full" />
                ) : (
                  <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-3xl text-[#2c3e50] leading-none">{data.sigText}</span>
                )}
              </div>
              <div className="border-t border-slate-400 w-full"></div>
              <span className="text-[10px] font-black text-[#2c3e50] uppercase tracking-widest italic">Authorised Sign</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-8 w-full relative">
        <div className="absolute bottom-0 left-0 w-[45%] h-full bg-[#2c3e50]" style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="absolute bottom-0 right-0 w-[65%] h-full bg-[#ff4d00]" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
      </div>
    </div>
  );
});

export default OrangeTemplate;