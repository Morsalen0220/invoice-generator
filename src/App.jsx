import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import InvoiceForm from './components/form/InvoiceForm';
import OrangeTemplate from './components/templates/OrangeTemplate';
import ModernTemplate from './components/templates/ModernTemplate';
import ProfessionalTemplate from './components/templates/ProfessionalTemplate';
import PixelMartTemplate from './components/templates/PixelMartTemplate';
import MinimalBlueTemplate from './components/templates/MinimalBlueTemplate';
import MustangTemplate from './components/templates/MustangTemplate';
import { Download, Edit3, X, Printer, Plus, Eye } from 'lucide-react';

// ১. এরর ফিক্স: সকল ভ্যালু শুরুতে খালি স্ট্রিং দেওয়া হয়েছে (Controlled component fix)
const initialData = {
  brandName: '', tagline: '', invoiceNo: 'INV-001', 
  date: new Date().toISOString().split('T')[0], 
  client: '', clientAddress: '', phone: '', website: '', address: '',
  items: [{ id: Date.now(), desc: '', qty: 1, price: 0 }],
  tax: 0, currency: '$', logo: '', logoSize: 60,
  showPayment: true, showTerms: true,
  accountNo: '', accountName: '', bankDetails: '', terms: '', signature: ''
};

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('invoiceData');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [selectedTemplate, setSelectedTemplate] = useState('orange'); 
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(data));
  }, [data]);

  const handlePrint = useReactToPrint({ 
    contentRef: componentRef, 
    documentTitle: `Invoice_${data.invoiceNo}` 
  });

  // ২. পিডিএফ ডাউনলোড ফিক্স (oklch error handle)
const handleDownload = () => {
  const element = document.getElementById('invoice-capture');
  if (!element) return;

  const options = {
    margin: 0,
    filename: `invoice_${data.invoiceNo || '001'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const captureEl = clonedDoc.getElementById('invoice-capture');
        if (!captureEl) return;

        const view = clonedDoc.defaultView;
        const allElements = captureEl.querySelectorAll('*');

        allElements.forEach(el => {
          const style = view.getComputedStyle(el);
          // oklch কালার থাকলে সেটিকে সাধারণ কালারে রূপান্তর
          if (style.color.includes('oklch')) el.style.color = '#1f2937';
          if (style.backgroundColor.includes('oklch')) el.style.backgroundColor = 'transparent';
          if (style.borderColor.includes('oklch')) el.style.borderColor = '#e5e7eb';
        });
      }
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  window.html2pdf().from(element).set(options).save()
    .catch(err => console.error("PDF Download Error:", err));
};

  return (
    <div className="min-h-screen bg-[#0b1120] flex flex-col font-sans text-slate-200 overflow-x-hidden">
      <div className="flex flex-col md:flex-row h-screen pt-[70px] md:pt-0">
        {/* Editor Sidebar */}
        <aside className={`fixed md:relative inset-0 z-[60] md:z-30 w-full md:w-[420px] bg-slate-900 border-r border-white/10 flex flex-col no-print transition-transform ${isEditorOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h1 className="text-lg font-black uppercase text-white tracking-widest flex items-center gap-2">
              <Plus size={20} className="bg-blue-600 rounded p-0.5" /> Editor
            </h1>
            <button onClick={() => setIsEditorOpen(false)} className="md:hidden p-2 text-red-500"><X size={20} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {/* থিম সিলেকশন সেকশন (Mustang এবং Minimal ফিক্স) */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
              <label className="text-[9px] font-bold uppercase text-slate-500 mb-3 block tracking-widest">Select Template</label>
              <div className="grid grid-cols-2 gap-2">
                {['orange', 'modern', 'professional', 'pixel', 'minimal', 'mustang'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTemplate(t)}
                    className={`p-2 rounded-lg text-[10px] font-black uppercase transition-all ${selectedTemplate === t ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <InvoiceForm data={data} setData={setData} />
          </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 h-full overflow-y-auto bg-[#0b1120] flex flex-col items-center py-10 px-4">
          <div className="w-full flex justify-center pb-40">
            <div id="invoice-capture" className="bg-white rounded-2xl shadow-2xl overflow-hidden origin-top scale-[0.45] sm:scale-[0.6] md:scale-[0.85] lg:scale-100">
              <div ref={componentRef}>
                {selectedTemplate === 'orange' && <OrangeTemplate data={data} />}
                {selectedTemplate === 'modern' && <ModernTemplate data={data} />}
                {selectedTemplate === 'professional' && <ProfessionalTemplate data={data} />}
                {selectedTemplate === 'pixel' && <PixelMartTemplate data={data} />}
                {selectedTemplate === 'minimal' && <MinimalBlueTemplate data={data} />}
                {selectedTemplate === 'mustang' && <MustangTemplate data={data} />}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[70] no-print flex gap-3">
        <button onClick={handlePrint} className="flex items-center gap-2 bg-slate-800 text-white p-4 px-6 rounded-2xl font-bold uppercase text-[11px] hover:bg-slate-700 transition-all border border-white/10">
          <Printer size={18} /> Print
        </button>
        <button onClick={handleDownload} className="flex items-center gap-2 bg-blue-600 text-white p-4 px-6 rounded-2xl font-bold uppercase text-[11px] shadow-xl shadow-blue-900/20 hover:bg-blue-500 transition-all">
          <Download size={18} /> PDF
        </button>
      </div>

      {!isEditorOpen && (
        <button onClick={() => setIsEditorOpen(true)} className="fixed top-4 right-4 md:hidden z-50 bg-blue-600 p-3 rounded-full text-white"><Edit3 size={18} /></button>
      )}
    </div>
  );
}