import React from 'react';
import { Plus, Trash2, Building2, User, CreditCard, ScrollText, Package, PenTool } from 'lucide-react';
import SignaturePad from './SignaturePad';

export default function InvoiceForm({ data, setData }) {
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  
  const updateItem = (index, field, val) => {
    const newItems = [...data.items];
    newItems[index][field] = (field === 'price' || field === 'qty') ? Number(val) : val;
    setData({ ...data, items: newItems });
  };

  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), desc: '', qty: 1, price: 0 }] });

  const inputStyle = "w-full bg-slate-950/80 border border-white/10 p-3 rounded-xl text-[13px] text-white outline-none focus:border-blue-500 font-medium transition-all";
  const labelStyle = "text-[10px] font-black uppercase text-slate-500 mb-1.5 block tracking-widest flex items-center gap-2";

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header & Branding */}
<section className="space-y-4">
  <label className={labelStyle}><Building2 size={12}/> Branding & Company Info</label>
  
  <div className="flex flex-col md:flex-row gap-6 bg-white/5 p-4 rounded-xl border border-white/10">
    {/* Logo Upload & Size Control */}
    <div className="space-y-4">
      <div className="w-24 h-24 bg-slate-950 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden relative group mx-auto">
        {data.logo ? (
          <img 
            src={data.logo} 
            alt="Logo" 
            style={{ width: `${data.logoSize || 60}px` }} 
            className="object-contain transition-all" 
          />
        ) : (
          <Plus className="text-slate-600" />
        )}
        <input 
          type="file" 
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => setData({ ...data, logo: reader.result });
            if (file) reader.readAsDataURL(file);
          }} 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          accept="image/*"
        />
      </div>
      
      {/* Logo Size Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-slate-500 font-bold uppercase">Size</span>
          <span className="text-[9px] text-blue-500 font-bold">{data.logoSize || 60}px</span>
        </div>
        <input 
          type="range" 
          min="30" 
          max="150" 
          value={data.logoSize || 60} 
          onChange={(e) => setData({...data, logoSize: Number(e.target.value)})}
          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    </div>

    {/* Brand & Slogan Inputs */}
    <div className="flex-1 space-y-3">
      <div>
        <label className="text-[9px] text-slate-500 font-bold uppercase mb-1 block">Company Name</label>
        <input 
          name="brandName" 
          value={data.brandName || ''} 
          onChange={handleChange} 
          className={inputStyle} 
          placeholder="e.g. PixelMart" 
        />
      </div>
      <div>
        <label className="text-[9px] text-slate-500 font-bold uppercase mb-1 block">Slogan</label>
        <input 
          name="tagline" 
          value={data.tagline || ''} 
          onChange={handleChange} 
          className={inputStyle} 
          placeholder="e.g. Your Vision, Our Code" 
        />
      </div>
    </div>
  </div>

  {/* Invoice Number and Date */}
  <div className="grid grid-cols-2 gap-2">
    <div className="space-y-1">
      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Invoice No</label>
      <input name="invoiceNo" value={data.invoiceNo} onChange={handleChange} className={inputStyle} placeholder="INV-001" />
    </div>
    <div className="space-y-1">
      <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Date</label>
      <input type="date" name="date" value={data.date} onChange={handleChange} className={inputStyle} />
    </div>
  </div>

  <div className="space-y-1">
    <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Upload Logo URL</label>
    <input name="logo" value={data.logo} onChange={handleChange} className={inputStyle} placeholder="https://logo-url.com/image.png" />
  </div>





  {/* Contact Info */}
  <div className="grid grid-cols-2 gap-2">
    <input name="phone" value={data.phone || ''} onChange={handleChange} className={inputStyle} placeholder="Phone Number" />
    <input name="email" value={data.email || ''} onChange={handleChange} className={inputStyle} placeholder="Company Email" />
  </div>
  <input name="website" value={data.website || ''} onChange={handleChange} className={inputStyle} placeholder="Website URL" />
  <input name="address" value={data.address || ''} onChange={handleChange} className={inputStyle} placeholder="Full Address" />
</section>

      {/* 2. Client Info */}
      <section className="space-y-4 pt-4 border-t border-white/5">
        <label className={labelStyle}><User size={12}/> Client Details</label>
        <input name="client" value={data.client} onChange={handleChange} className={inputStyle} placeholder="Client Name" />
        <input name="clientEmail" value={data.clientEmail || ''} onChange={handleChange} className={inputStyle} placeholder="Client Email" />
        <textarea name="clientAddress" value={data.clientAddress} onChange={handleChange} className={`${inputStyle} h-24 resize-none`} placeholder="Full Address..." />
      </section>

      {/* 3. Balanced Item List */}
    


{/* 3. Balanced Item List (Improved Layout) */}
<section className="pt-4 border-t border-white/5">
  <div className="flex justify-between items-center mb-6">
    <div>
      <label className="text-[11px] font-black uppercase text-blue-500 tracking-[0.2em]">Items List</label>
      <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Add products or services</p>
    </div>
    <button 
      onClick={addItem} 
      className="flex items-center gap-2 bg-blue-600/10 text-blue-500 p-2 px-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-[10px] font-black uppercase shadow-lg shadow-blue-900/20"
    >
      <Plus size={14}/> Add Item
    </button>
  </div>

  <div className="space-y-4">
    {data.items.map((item, i) => (
      <div key={item.id} className="group bg-slate-900/50 p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all">
        <div className="flex flex-col gap-4">
          
          {/* Top Row: Product Name & Delete */}
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              <label className="text-[9px] font-bold text-slate-600 uppercase mb-1 block">Product / Service Name</label>
              <textarea 
                rows="1"
                className={`${inputStyle} !bg-slate-950 min-h-[45px] resize-none py-3 text-sm`} 
                value={item.desc} 
                onChange={e => updateItem(i, 'desc', e.target.value)} 
                placeholder="What are you charging for?" 
              />
            </div>
            <button 
              onClick={() => setData({...data, items: data.items.filter(it => it.id !== item.id)})} 
              className="mt-6 p-2 text-red-500/20 group-hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <Trash2 size={18}/>
            </button>
          </div>

          {/* Bottom Row: Qty, Price, and Sub-total Display */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[9px] font-bold text-slate-600 uppercase mb-1 block">Quantity</label>
              <div className="relative">
                <input 
                  type="number" 
                  className={`${inputStyle} !bg-slate-950 pl-8`} 
                  value={item.qty} 
                  onChange={e => updateItem(i, 'qty', e.target.value)} 
                />
                <Package size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold text-slate-600 uppercase mb-1 block">Price</label>
              <div className="relative">
                <input 
                  type="number" 
                  className={`${inputStyle} !bg-slate-950 pl-8`} 
                  value={item.price} 
                  onChange={e => updateItem(i, 'price', e.target.value)} 
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-[10px] font-bold">{data.currency}</span>
              </div>
            </div>

            <div className="flex flex-col justify-end items-end">
              <span className="text-[9px] font-bold text-slate-600 uppercase mb-1">Item Total</span>
              <div className="text-blue-500 font-black text-sm p-3">
                {data.currency}{(item.qty * item.price).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>




{/* Payment Details */}
<div className="flex items-center justify-between mb-2">
  <label className={labelStyle}><CreditCard size={12}/> Payment Details</label>
  <button 
    onClick={() => setData({...data, showPayment: !data.showPayment})}
    className={`text-[9px] px-2 py-1 rounded font-bold uppercase transition-all ${data.showPayment ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}
  >
    {data.showPayment ? 'Delete Section' : 'Add Section'}
  </button>
</div>
{data.showPayment && (
  <div className="space-y-4 animate-in fade-in duration-300">
    <div className="grid grid-cols-2 gap-2">
        <input name="accountNo" value={data.accountNo} onChange={handleChange} className={inputStyle} placeholder="Account #" />
        <input name="accountName" value={data.accountName} onChange={handleChange} className={inputStyle} placeholder="A/C Name" />
    </div>
    <input name="bankDetails" value={data.bankDetails} onChange={handleChange} className={inputStyle} placeholder="Bank Details" />
  </div>
)}

{/* Terms & Conditions */}
<div className="flex items-center justify-between mt-4 mb-2 pt-4 border-t border-white/5">
  <label className={labelStyle}><ScrollText size={12}/> Terms & Conditions</label>
  <button 
    onClick={() => setData({...data, showTerms: !data.showTerms})}
    className={`text-[9px] px-2 py-1 rounded font-bold uppercase transition-all ${data.showTerms ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}
  >
    {data.showTerms ? 'Delete Section' : 'Add Section'}
  </button>
</div>
{data.showTerms && (
  <textarea name="terms" value={data.terms} onChange={handleChange} className={`${inputStyle} h-20 resize-none animate-in fade-in duration-300`} placeholder="Terms..." />
)}

      {/* 4. Authorised Signature */}
      <section className="space-y-4 pt-4 border-t border-white/5">
        <label className={labelStyle}><PenTool size={12}/> Authorised Signature</label>
        <SignaturePad data={data} setData={setData} />
      </section>

      {/* 5. Tax / Discount */}
      <section className="pt-4 border-t border-white/5 space-y-4">
        <label className={labelStyle}><ScrollText size={12}/> Tax / Discount Settings</label>
        <div className="bg-blue-600/5 p-4 rounded-xl border border-blue-600/10 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <select
                name="adjustmentType"
                value={data.adjustmentType || 'tax'}
                onChange={handleChange}
                className={`${inputStyle} !bg-slate-900 border-blue-600/20`}
              >
                <option value="tax">Tax</option>
                <option value="discount">Discount</option>
              </select>
              <input type="number" name="tax" value={data.tax} onChange={handleChange} className={`${inputStyle} !bg-slate-900 border-blue-600/20`} placeholder="Rate %" />
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Choose tax or discount and set percentage rate.</p>
        </div>
      </section>
    </div>
  );
}
