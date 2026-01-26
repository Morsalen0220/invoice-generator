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
  brandName: '',
  tagline: '',
  invoiceNo: 'INV-001',
  date: new Date().toISOString().split('T')[0],
  client: '',
  clientAddress: '',
  phone: '',
  website: '',
  address: '',
  items: [{ id: Date.now(), desc: '', qty: 1, price: 0 }],
  tax: 0,
  currency: '$',
  logo: '',
  logoSize: 60,
  showPayment: true,
  showTerms: true,
  accountNo: '',
  accountName: '',
  bankDetails: '',
  terms: '',
  signature: ''
};

export default function App() {
  const [data, setData] = useState(initialData);
  const [tempData, setTempData] = useState(data);
  const [selectedTemplate, setSelectedTemplate] = useState('orange');
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const componentRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setTempData(data);
  }, [data, isMobile]);

  const handleMobileSave = () => {
    setData(tempData);
    setIsEditorOpen(false);
  };

  const handleMobileClose = () => {
    setTempData(data);
    setIsEditorOpen(false);
  };

  /* ============================
     ✅ FINAL PDF DOWNLOAD FIX
     ============================ */
  const handleDownload = async () => {
    const original = document.getElementById('invoice-capture');
    if (!original) return;

    try {
      // Clone unscaled invoice
      const clone = original.cloneNode(true);
      clone.style.transform = 'scale(1)';
      clone.style.width = '794px'; // A4 width
      clone.style.margin = '0';
      clone.style.padding = '0';
      clone.style.background = '#ffffff';

      // Offscreen wrapper
      const wrapper = document.createElement('div');
      wrapper.style.position = 'fixed';
      wrapper.style.top = '-10000px';
      wrapper.style.left = '-10000px';
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Capture
      const dataUrl = await toPng(clone, {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        width: 794,
        height: 1123
      });

      document.body.removeChild(wrapper);

      // PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
      pdf.save(`invoice_${data.invoiceNo || '001'}.pdf`);
    } catch (err) {
      console.error(err);
      alert('PDF download failed');
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Invoice_${data.invoiceNo}`
  });

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans">
      <div className="flex flex-col md:flex-row h-screen">

        {/* ===== Sidebar ===== */}
        <aside className={`fixed md:relative inset-0 z-50 w-full md:w-[420px] bg-slate-900 border-r border-white/10 flex flex-col transition-transform ${isEditorOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
          <div className="p-4 border-b border-white/5 flex justify-between items-center md:hidden">
            <button onClick={handleMobileClose} className="text-red-400 font-bold text-sm flex gap-1">
              <X size={18} /> Close
            </button>
            <button onClick={handleMobileSave} className="text-green-400 font-bold text-sm flex gap-1">
              <Check size={18} /> Save
            </button>
          </div>

          <div className="hidden md:flex p-6 border-b border-white/5">
            <h1 className="text-lg font-black uppercase">Invoice Editor</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section>
              <label className="text-xs font-bold uppercase flex items-center gap-2">
                <LayoutTemplate size={14} /> Templates
              </label>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {['orange', 'modern', 'professional', 'pixel', 'minimal', 'mustang'].map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTemplate(t)}
                    className={`p-3 rounded-xl text-xs font-bold uppercase border ${
                      selectedTemplate === t
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            <InvoiceForm
              data={isMobile ? tempData : data}
              setData={isMobile ? setTempData : setData}
            />
          </div>
        </aside>

        {/* ===== Preview ===== */}
        <main className="flex-1 overflow-y-auto flex justify-center py-12 px-4">
          <div
            id="invoice-capture"
            className="bg-white shadow-2xl origin-top
                       scale-[0.45] sm:scale-[0.65] md:scale-[0.8] lg:scale-100"
          >
            <div ref={componentRef}>
              {selectedTemplate === 'orange' && <OrangeTemplate data={data} />}
              {selectedTemplate === 'modern' && <ModernTemplate data={data} />}
              {selectedTemplate === 'professional' && <ProfessionalTemplate data={data} />}
              {selectedTemplate === 'pixel' && <PixelMartTemplate data={data} />}
              {selectedTemplate === 'minimal' && <MinimalBlueTemplate data={data} />}
              {selectedTemplate === 'mustang' && <MustangTemplate data={data} />}
            </div>
          </div>
        </main>
      </div>

      {/* ===== Action Buttons ===== */}
      <div className="fixed bottom-8 right-8 flex gap-3 z-50">
        <button onClick={handlePrint} className="bg-slate-800 px-6 py-4 rounded-xl flex gap-2">
          <Printer size={18} /> Print
        </button>
        <button onClick={handleDownload} className="bg-blue-600 px-6 py-4 rounded-xl flex gap-2">
          <Download size={18} /> PDF
        </button>
      </div>

      {!isEditorOpen && (
        <button
          onClick={() => setIsEditorOpen(true)}
          className="fixed bottom-8 left-8 md:hidden bg-blue-600 p-4 rounded-xl"
        >
          <Edit3 size={24} />
        </button>
      )}
    </div>
  );
}
