import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import InvoiceForm from './components/form/InvoiceForm';
import OrangeTemplate from './components/templates/OrangeTemplate';
import ModernTemplate from './components/templates/ModernTemplate';
import ProfessionalTemplate from './components/templates/ProfessionalTemplate';
import PixelMartTemplate from './components/templates/PixelMartTemplate';
import MinimalBlueTemplate from './components/templates/MinimalBlueTemplate';
import MustangTemplate from './components/templates/MustangTemplate';
import { Download, Edit3, X, Printer, LayoutTemplate, Check } from 'lucide-react';

const initialData = {
  brandName: '', tagline: '', invoiceNo: 'INV-001', 
  date: new Date().toISOString().split('T')[0], 
  client: '', clientAddress: '', clientEmail: '', phone: '', email: '', website: '', address: '',
  items: [{ id: Date.now(), desc: '', qty: 1, price: 0 }],
  tax: 0, currency: '$', logo: '', logoSize: 60,
  showPayment: true, showTerms: true,
  accountNo: '', accountName: '', bankDetails: '', terms: '', signature: '',    // ড্রয়িং এর জন্য
  sigText: '',      // টাইপ করা টেক্সটের জন্য
  sigType: 'draw',  // 'draw' অথবা 'text'
  sigFont: "'Dancing Script', cursive" // ডিফল্ট ফন্ট
};

export default function App() {
  const [data, setData] = useState(initialData);
  const [tempData, setTempData] = useState(data);
  const [selectedTemplate, setSelectedTemplate] = useState('orange'); 
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const componentRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop Live Sync
  useEffect(() => {
    if (!isMobile) { setTempData(data); }
  }, [data, isMobile]);

  const handleMobileSave = () => {
    setData(tempData);
    setIsEditorOpen(false);
  };

  const handleMobileClose = () => {
    setTempData(data);
    setIsEditorOpen(false);
  };

  // ১০০% কার্যকর PDF ডাউনলোড ফাংশন
  const handleDownload = async () => {
    const node = document.getElementById('invoice-capture');
    if (!node) return;

    try {
      // সাদা পেজ এড়াতে অরিজিনাল স্টাইল সেভ করে রাখা
      const originalTransform = node.style.transform;
      const originalWidth = node.style.width;

      // সাময়িকভাবে স্কেল ১ করা যাতে ছবির সাইজ ঠিক থাকে
      node.style.transform = 'scale(1)';
      node.style.width = '210mm'; 

      // ছবি তৈরি করার সময় ব্রাউজারকে ৫-১০ মিলিসেকেন্ড সময় দেওয়া
      const dataUrl = await toPng(node, {
        backgroundColor: '#ffffff',
        pixelRatio: 2, // কোয়ালিটি নিশ্চিত করতে
        skipFonts: false
      });

      // আবার আগের স্কেলে ফিরিয়ে নেওয়া (যাতে ইউজারের চোখে পরিবর্তন না ধরা পড়ে)
      node.style.transform = originalTransform;
      node.style.width = originalWidth;

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
      pdf.save(`invoice_${data.invoiceNo || '001'}.pdf`);
    } catch (e) {
      console.error(e);
      alert('PDF download failed. Try again.');
    }
  };

  const handlePrint = useReactToPrint({ 
    contentRef: componentRef, 
    documentTitle: `invoice_${data.invoiceNo}` 
  });

  const renderTemplate = (invoiceData) => {
    const props = { data: invoiceData };
    switch(selectedTemplate) {
      case 'orange': return <OrangeTemplate {...props} />;
      case 'modern': return <ModernTemplate {...props} />;
      case 'professional': return <ProfessionalTemplate {...props} />;
      case 'pixel': return <PixelMartTemplate {...props} />;
      case 'minimal': return <MinimalBlueTemplate {...props} />;
      case 'mustang': return <MustangTemplate {...props} />;
      default: return <OrangeTemplate {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans">
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        
        {/* Editor Sidebar */}
        <aside className={`fixed md:relative inset-0 z-50 w-full md:w-[420px] bg-slate-900 border-r border-white/10 flex flex-col no-print transition-transform duration-300 ${isEditorOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900 md:hidden sticky top-0 z-50">
            <button onClick={handleMobileClose} className="text-red-400 font-bold text-sm uppercase flex items-center gap-1"><X size={18} /> Close</button>
            <h1 className="text-xs font-black uppercase tracking-widest text-white">Editor</h1>
            <button onClick={handleMobileSave} className="text-green-400 font-bold text-sm uppercase flex items-center gap-1"><Check size={18} /> Save</button>
          </div>

          <div className="hidden md:flex p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
            <h1 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center italic text-white text-sm">I</div> Editor
            </h1>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
            <section className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><LayoutTemplate size={14} /> Choose Template</label>
              <div className="grid grid-cols-2 gap-2">
                {['orange', 'modern', 'professional', 'pixel', 'minimal', 'mustang'].map((t) => (
                  <button key={t} onClick={() => setSelectedTemplate(t)} className={`p-3 rounded-xl text-[10px] font-black uppercase transition-all border ${selectedTemplate === t ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}>
                    {t === 'pixel' ? 'Pixel Mart' : t}
                  </button>
                ))}
              </div>
            </section>
            <InvoiceForm data={isMobile ? tempData : data} setData={isMobile ? setTempData : setData} />
          </div>
        </aside>

        {/* Visible Preview Area */}
        <main className="flex-1 h-full overflow-y-auto bg-[#0b1120] flex flex-col items-center py-12 px-4 scroll-smooth">
          <div className="w-full flex justify-center pb-32">
            {/* আমরা সরাসরি এই ID থেকেই ডাটা নিব */}
            <div id="invoice-capture" className="bg-white shadow-2xl transition-all duration-500 origin-top scale-[0.45] sm:scale-[0.65] md:scale-[0.8] lg:scale-100">
              <div ref={componentRef}>
                {renderTemplate(data)}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[70] no-print flex gap-3">
        <button onClick={handlePrint} className="flex items-center gap-3 bg-slate-800 text-white p-4 px-8 rounded-2xl font-bold uppercase text-[11px] border border-white/10 transition-all active:scale-95"><Printer size={18} /> Print</button>
        <button onClick={handleDownload} className="flex items-center gap-3 bg-blue-600 text-white p-4 px-8 rounded-2xl font-bold uppercase text-[11px] shadow-2xl shadow-blue-900/40 transition-all active:scale-95"><Download size={18} /> PDF</button>
      </div>

      {!isEditorOpen && (
        <button onClick={() => setIsEditorOpen(true)} className="fixed bottom-8 left-8 md:hidden z-50 bg-blue-600 p-4 rounded-2xl shadow-2xl text-white active:scale-90"><Edit3 size={24} /></button>
      )}
    </div>
  );
}
