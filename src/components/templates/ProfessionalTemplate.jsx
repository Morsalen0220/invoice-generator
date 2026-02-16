import React, { forwardRef } from 'react';

const ProfessionalTemplate = forwardRef(({ data }, ref) => {
  const subtotal = data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const rate = Number(data.tax) || 0;
  const isDiscount = data.adjustmentType === 'discount';
  const adjustmentAmount = (subtotal * rate) / 100;
  const total = isDiscount ? subtotal - adjustmentAmount : subtotal + adjustmentAmount;

  return (
    <div ref={ref} className="bg-white a4-page a4-print-fix flex flex-col mx-auto relative text-slate-800" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', boxSizing: 'border-box' }}>
      <div className="absolute top-0 left-0 w-full h-3 bg-emerald-600"></div>
      
      <header className="flex justify-between items-start mb-12 mt-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg shadow-lg"></div>
            <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase italic">{data.brandName}</h2>
          </div>
          <p className="font-bold text-slate-600 text-sm uppercase">{data.sender}</p>
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{data.tagline}</p>
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest">Invoice No</span>
          <span className="text-lg font-black text-emerald-600">#{data.invoiceNo}</span>
          <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mt-2">Date</span>
          <span className="font-medium">{data.date}</span>
        </div>
      </header>

      <section className="flex-1">
        <table className="w-full border-collapse mb-8">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="py-3 text-left text-[10px] font-black uppercase text-slate-500 tracking-widest">Description</th>
              <th className="py-3 text-center w-20 text-[10px] font-black uppercase text-slate-500 tracking-widest">Qty</th>
              <th className="py-3 text-right w-32 text-[10px] font-black uppercase text-slate-500 tracking-widest">Price</th>
              <th className="py-3 text-right w-32 text-[10px] font-black uppercase text-slate-500 tracking-widest">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="py-4 font-bold text-slate-800 text-sm">{item.desc || "Service/Product Name"}</td>
                <td className="py-4 text-center text-sm">{item.qty}</td>
                <td className="py-4 text-right text-sm">{data.currency}{Number(item.price).toLocaleString()}</td>
                <td className="py-4 text-right text-sm font-bold text-emerald-700">{data.currency}{(item.qty * item.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex justify-between items-end pt-8 border-t border-slate-100">
        <div className="w-1/2">


<div className="flex-1 space-y-4">
    {data.showPayment && (
       <div className="text-[10px] text-slate-500">
         <p className="font-black text-slate-900 uppercase mb-1">Payment Method</p>
         <p>{data.bankDetails} | A/C: {data.accountNo}</p>
       </div>
    )}
    {data.showTerms && (
       <div className="max-w-xs">
         <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Terms & Conditions</p>
         <p className="text-[10px] leading-tight">{data.terms}</p>
       </div>
    )}
</div>
           {/* Signature Area */}
           <div className="w-48 text-center">
              <div className="h-12 flex items-center justify-center mb-1">
                {data.sigType === 'draw' && data.signature ? (
                  <img src={data.signature} alt="Sign" className="max-h-full" />
                ) : (
                  <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-2xl text-slate-800">{data.sigText}</span>
                )}
              </div>
              <div className="border-t border-slate-300 w-full mb-1"></div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Authorised Sign</span>
            </div>
        </div>

        <div className="w-64 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Subtotal:</span>
            <span>{data.currency}{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase border-b border-slate-100 pb-2">
            <span>{isDiscount ? `Discount (${rate}%)` : `Tax (${rate}%)`}:</span>
            <span>{data.currency}{adjustmentAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-black uppercase text-slate-900">Grand Total:</span>
            <span className="text-3xl font-black text-emerald-600 italic tracking-tighter">{data.currency}{total.toLocaleString()}</span>
          </div>
        </div>
      </section>
    </div>
  );
});

export default ProfessionalTemplate;