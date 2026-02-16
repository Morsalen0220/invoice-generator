import React, { forwardRef } from 'react';

const ModernTemplate = forwardRef(({ data }, ref) => {
  const subtotal = data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const rate = Number(data.tax) || 0;
  const isDiscount = data.adjustmentType === 'discount';
  const adjustmentAmount = (subtotal * rate) / 100;
  const total = isDiscount ? subtotal - adjustmentAmount : subtotal + adjustmentAmount;

  return (
    <div 
      ref={ref}
      className=" a4-page bg-white a4-print-fix flex flex-col mx-auto relative overflow-hidden" 
      style={{ width: '210mm', minHeight: '297mm', padding: '0', boxSizing: 'border-box' }}
    >
      {/* Premium Header */}
      <div className="relative h-48 bg-slate-900 flex items-center px-16 justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600 rotate-45 -ml-16 -mb-16"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-6xl font-black italic tracking-tighter leading-none">INVOICE</h1>
          <p className="text-blue-400 font-bold tracking-[0.4em] text-[10px] mt-2 uppercase">Official Document</p>
        </div>
        <div className="relative z-10 text-right text-white">
          <div className="text-sm font-black uppercase tracking-widest">{data.sender || "SENDER NAME"}</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase italic mt-1">{data.date}</div>
          <div className="mt-4 inline-block bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-lg">#{data.invoiceNo}</div>
        </div>
      </div>

      <div className="px-16 py-12 flex justify-between items-end">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 italic">Billed To</p>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter capitalize">{data.client || "Client Name"}</h3>
          <div className="w-20 h-1.5 bg-blue-600 mt-2 rounded-full"></div>
        </div>
      </div>

      <div className="px-16 flex-1">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 text-left text-[11px] font-black uppercase tracking-widest text-slate-500">
              <th className="py-5 px-4">Description</th>
              <th className="py-5 text-center w-24">Qty</th>
              <th className="py-5 text-right w-32">Price</th>
              <th className="py-5 text-right w-32 px-4">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.items.map((item) => (
              <tr key={item.id}>
                <td className="py-7 px-4">
                  <div className="text-lg font-bold text-slate-800 leading-tight">{item.desc || "Item Name"}</div>
                  {/* Dynamic optional note */}
                  {item.subDesc && (
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">{item.subDesc}</div>
                  )}
                </td>
                <td className="py-7 text-center font-bold text-slate-500">{item.qty}</td>
                <td className="py-7 text-right font-bold text-slate-500">{data.currency}{Number(item.price).toLocaleString()}</td>
                <td className="py-7 text-right font-black text-blue-600 text-lg px-4">{data.currency}{(item.qty * item.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   





   <div className="px-16 pb-16 pt-10 flex justify-between items-start">
  <div className="max-w-md space-y-6">
    {data.showPayment && (
      <div>
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Payment Info</p>
        <div className="text-xs font-bold text-slate-500 space-y-1">
          <p>A/C Name: <span className="text-slate-800">{data.accountName}</span></p>
          <p>A/C No: <span className="text-slate-800">{data.accountNo}</span></p>
          <p>Bank: <span className="text-slate-800">{data.bankDetails}</span></p>
        </div>
      </div>
    )}
    {data.showTerms && (
      <div>
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Terms</p>
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">{data.terms}</p>
      </div>
    )}
  </div>
    
      
      

        
      <div className="w-80 relative bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl overflow-hidden">
  <div className="space-y-2 mb-4 border-b border-white/10 pb-4">
    <div className="flex justify-between text-slate-400 text-[10px] font-bold uppercase">
      <span>Subtotal</span>
      <span>{data.currency}{subtotal.toLocaleString()}</span>
    </div>
    <div className="flex justify-between text-slate-400 text-[10px] font-bold uppercase">
      <span>{isDiscount ? `Discount (${rate}%)` : `Tax (${rate}%)`}</span>
      <span>{data.currency}{adjustmentAmount.toLocaleString()}</span>
    </div>
  </div>
  <div className="flex justify-between items-center text-white">
    <span className="text-xs font-black text-blue-400 uppercase tracking-widest italic">Grand Total</span>
    <span className="text-3xl font-black italic tracking-tighter">{data.currency}{total.toLocaleString()}</span>
  </div>
</div>
  
  </div>
    </div>
  );
});

export default ModernTemplate;