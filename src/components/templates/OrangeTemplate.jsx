import React, { forwardRef } from 'react';

const OrangeTemplate = forwardRef(({ data }, ref) => {
  // ক্যালকুলেশন
  const subtotal = data.items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0);
  const taxAmount = (subtotal * (Number(data.tax) || 0)) / 100;
  const total = subtotal + taxAmount;

  return (
    <div 
      ref={ref} 
      className="a4-page bg-white flex flex-col relative text-slate-800 font-sans"
    >
      {/* Header Accent */}
      <div className="relative h-32 w-full overflow-hidden shrink-0">
        <div 
          className="absolute top-0 left-0 w-[45%] h-full bg-[#2c3e50]" 
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
        ></div>
        <div 
          className="absolute top-0 right-0 w-[65%] h-full bg-gradient-to-r from-[#ff4d00] to-[#ff8c00]" 
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          <div className="h-full flex flex-col justify-center items-end pr-16 text-white text-right">
            <span className="text-2xl font-black uppercase tracking-tight">
              {data.brandName || "BRAND NAME"}
            </span>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-80 mt-1">
              {data.tagline || "TAGLINE SPACE HERE"}
            </p>
          </div>
        </div>
        <h1 className="absolute top-8 left-16 text-5xl font-black tracking-widest text-white z-10 leading-none uppercase italic">
          INVOICE
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-16 py-10 flex flex-col">
        {/* Info Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black uppercase text-[#ff4d00] tracking-widest mb-1">Invoice To</p>
              <h2 className="text-xl font-bold text-[#2c3e50] uppercase tracking-tight">{data.client || "Client Name"}</h2>
              <p className="text-[10px] font-medium text-slate-500 mt-1 w-48 leading-relaxed">
                {data.clientAddress || "Street Address, City, Country"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-slate-50 p-4 border-r-4 border-[#ff4d00]">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Invoice Number</p>
              <p className="text-lg font-bold text-[#2c3e50]">#{data.invoiceNo || "00001"}</p>
              <div className="mt-2 pt-2 border-t border-slate-200">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Date Issued</p>
                <p className="text-sm font-bold text-[#2c3e50]">{data.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2c3e50] text-white">
                <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest">Description</th>
                <th className="px-6 py-3 text-center text-[10px] font-black uppercase tracking-widest w-24">Qty</th>
                <th className="px-6 py-3 text-right text-[10px] font-black uppercase tracking-widest w-32">Price</th>
                <th className="px-6 py-3 text-right text-[10px] font-black uppercase tracking-widest w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 border-x border-slate-100">
              {data.items.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-[#2c3e50]">{item.desc || "Item Description"}</p>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-slate-600">{item.qty}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-slate-600">
                    {data.currency}{Number(item.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-[#2c3e50]">
                    {data.currency}{(item.qty * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="mt-8 flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm px-2">
              <span className="font-bold text-slate-400 uppercase tracking-tighter">Subtotal</span>
              <span className="font-bold text-[#2c3e50]">{data.currency}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm px-2">
              <span className="font-bold text-slate-400 uppercase tracking-tighter text-xs">Tax ({data.tax}%)</span>
              <span className="font-bold text-[#ff4d00]">{data.currency}{taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white p-4 rounded-l-2xl shadow-lg">
              <span className="font-black uppercase tracking-widest">Grand Total</span>
              <span className="text-xl font-black">{data.currency}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer/Signature */}
        <div className="mt-16 flex justify-between items-end">
          <div className="space-y-4">
            {data.showPayment && (
              <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-slate-200">
                <p className="text-[10px] font-black uppercase text-[#2c3e50] tracking-widest mb-2 underline decoration-[#ff4d00]">Payment Info</p>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-600 capitalize">Acc Name: {data.accountName || "N/A"}</p>
                  <p className="text-[10px] font-bold text-slate-600">Acc No: {data.accountNo || "N/A"}</p>
                  <p className="text-[10px] font-bold text-slate-600 capitalize">Bank: {data.bankDetails || "N/A"}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center w-48">
  {data.sigType === 'draw' ? (
    data.signature && <img src={data.signature} alt="Signature" className="h-12 mx-auto mb-2 object-contain" />
  ) : (
    <p style={{ fontFamily: data.sigFont }} className="text-2xl text-[#2c3e50] mb-2">
      {data.sigText}
    </p>
  )}
  <div className="border-t-2 border-[#2c3e50] pt-2">
    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Authorized Sign</p>
  </div>
</div>
        </div>
      </div>

      {/* Footer Accent */}
      <div className="h-2 w-full bg-[#2c3e50] shrink-0"></div>
    </div>
  );
});

OrangeTemplate.displayName = 'OrangeTemplate';
export default OrangeTemplate;