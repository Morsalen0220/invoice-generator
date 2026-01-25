import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import InvoiceForm from './components/form/InvoiceForm';
import OrangeTemplate from './components/templates/OrangeTemplate';
import ModernTemplate from './components/templates/ModernTemplate';
import ProfessionalTemplate from './components/templates/ProfessionalTemplate';
import PixelMartTemplate from './components/templates/PixelMartTemplate';
import MinimalBlueTemplate from './components/templates/MinimalBlueTemplate';
import MustangTemplate from './components/templates/MustangTemplate';
import { Download, Edit3, X, FileText, LayoutTemplate } from 'lucide-react';

export default function App() {
  const [data, setData] = useState({
    brandName: 'Brand Name', sender: 'Your Name/Company',tagline: 'TAGLINE SPACE HERE', invoiceNo: '52148', date: '01 / 02 / 2020',
    client: 'Dwyane Clark', clientAddress: '24 Dummy Street Area,\nLocation, Lorem Ipsum,\n570xx59x',
    accountNo: '1234 5678 9012', accountName: 'Lorem Ipsum', bankDetails: 'Add your bank details',
    terms: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    phone: '+000 1234 6789',
    items: [{ id: 1, desc: 'Lorem Ipsum Dolor', qty: 1, price: 50.00 }],
    website: 'www.pixelmart.com',
    address: 'Street Address write Here, 100',
    clientAddress: '24 Dummy Street Area, Location',
    logo: '',
    showPayment: true,
    showTerms: true,
    tax: 0, currency: '$', sigType: 'draw', signature: '', sigText: 'Your Signature',sigFont: "'Dancing Script', cursive",
  });

useEffect(() => {
  const savedData = localStorage.getItem('invoiceData');
  if (savedData) {
    setData(JSON.parse(savedData));
  }
}, []);

useEffect(() => {
  localStorage.setItem('invoiceData', JSON.stringify(data));
}, [data]);


  const [selectedTemplate, setSelectedTemplate] = useState('orange'); 
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: componentRef, documentTitle: `Invoice_${data.invoiceNo}` });

  return (
    <div className="min-h-screen bg-[#0b1120] flex flex-col font-sans text-slate-200 relative overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/60 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center md:hidden no-print">
        <h1 className="text-xs font-black uppercase text-white italic tracking-widest">Invoice Pro</h1>
        <button onClick={() => setIsEditorOpen(true)} className="bg-blue-600 p-2 px-4 rounded-xl text-white text-[10px] font-bold uppercase"><Edit3 size={14} /></button>
      </nav>
      <div className="flex flex-col md:flex-row h-screen pt-[70px] md:pt-0">
        <aside className={`fixed md:relative inset-0 z-[60] md:z-30 w-full md:w-[420px] bg-slate-900 border-r border-white/10 transform transition-transform duration-300 flex flex-col no-print ${isEditorOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center"><h1 className="text-lg font-black uppercase text-white">Editor</h1><button onClick={() => setIsEditorOpen(false)} className="md:hidden p-2 text-red-500"><X size={20} /></button></div>
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-900/40">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
              <label className="text-[9px] font-bold uppercase text-slate-500 mb-3 block tracking-widest flex items-center gap-2"><LayoutTemplate size={12}/> Design</label>
              <div className="grid grid-cols-2 gap-2">
               <button onClick={() => setSelectedTemplate('orange')} className={`p-2 rounded-lg text-[10px] font-black uppercase ${selectedTemplate === 'orange' ? 'bg-[#ff4d00] text-white' : 'bg-slate-800'}`}>Orange</button>
              <button onClick={() => setSelectedTemplate('modern')} className={`p-2 rounded-lg text-[10px] font-black uppercase ${selectedTemplate === 'modern' ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}>Modern</button>
               <button onClick={() => setSelectedTemplate('professional')} className={`p-2 rounded-lg text-[10px] font-black uppercase ${selectedTemplate === 'professional' ? 'bg-emerald-600 text-white' : 'bg-slate-800'}`}>Pro</button>
                <button onClick={() => setSelectedTemplate('pixel')} className={`p-2 rounded-lg text-[10px] font-black uppercase ${selectedTemplate === 'pixel' ? 'bg-green-600 text-white' : 'bg-slate-800'}`}>Pixel</button>
              <button 
  onClick={() => setSelectedTemplate('minimal')} 
  className={`p-2 rounded-lg text-[10px] font-black uppercase ${selectedTemplate === 'minimal' ? 'bg-[#00adef] text-white' : 'bg-slate-800'}`}
>
  Minimal
</button>
<button 
  onClick={() => setSelectedTemplate('mustang')} 
  className={`p-2 rounded-lg text-[10px] font-black uppercase transition-all ${selectedTemplate === 'mustang' ? 'bg-[#92c83e] text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
>
  Mustang
</button>
              </div>
            </div>
            <InvoiceForm data={data} setData={setData} />
          </div>
        </aside>
        <main className="flex-1 h-full overflow-y-auto bg-[#0b1120] flex flex-col items-center py-10 px-4">
          <div className="w-full flex justify-center pb-40">
           

            <div className="origin-top transform scale-[0.38] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.8] xl:scale-100 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] transition-all">
  {selectedTemplate === 'orange' && <OrangeTemplate ref={componentRef} data={data} />}
  {selectedTemplate === 'modern' && <ModernTemplate ref={componentRef} data={data} />}
  {selectedTemplate === 'professional' && <ProfessionalTemplate ref={componentRef} data={data} />}
  {selectedTemplate === 'pixel' && <PixelMartTemplate ref={componentRef} data={data} />}
{selectedTemplate === 'minimal' && <MinimalBlueTemplate ref={componentRef} data={data} />}
{selectedTemplate === 'mustang' && <MustangTemplate ref={componentRef} data={data} />}
</div>
          </div>
        </main>
      </div>
      <div className="fixed bottom-8 right-8 z-[70] no-print">
  <button 
    onClick={() => handlePrint()} 
    className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-4 px-6 rounded-2xl font-black text-[12px] uppercase tracking-tighter shadow-[0_15px_40px_rgba(37,99,235,0.4)] transition-all duration-300 active:scale-95 border border-white/10 overflow-hidden"
  >
    {/* Shine effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    
    <Download size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
    <span className="tracking-[0.1em]">PDF</span>
  </button>
</div>
      {isEditorOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden" onClick={() => setIsEditorOpen(false)}></div>}
    </div>
  );
}