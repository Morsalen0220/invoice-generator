import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, PenTool, Type as TypeIcon, Sparkles } from 'lucide-react';

export default function SignaturePad({ data, setData }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // ৫টি ভিন্ন ভিন্ন সিগনেচার ফন্ট স্টাইল যা টেমপ্লেটে রিফ্লেক্ট হবে
  const fontStyles = [
    "'BasniStudio', cursive",
    "'Dancing Script', cursive",
    "'Pacifico', cursive",
    "'Great Vibes', cursive",
    "'Sacramento', cursive",
    "'Allura', cursive"
  ];

  // বর্তমান ফন্ট ইনডেক্স ট্র্যাক করার জন্য ইন্টারনাল স্টেট
  const [fontIndex, setFontIndex] = useState(0);

  // 'Style' বাটনে ক্লিক করলে পরবর্তী ফন্ট লোড করার ফাংশন
const nextFontStyle = (e) => {
  e.preventDefault(); 
  const nextIndex = (fontIndex + 1) % fontStyles.length;
  setFontIndex(nextIndex);
  
  // Data update
  setData(prevData => ({ 
    ...prevData, 
    sigFont: fontStyles[nextIndex], 
    sigType: 'text' 
  }));
};

  // ক্যানভাস সেটআপ
  useEffect(() => {
    if (data.sigType === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#231f20';
      }
    }
  }, [data.sigType]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const base64 = canvasRef.current.toDataURL();
    setData({ ...data, signature: base64, sigType: 'draw' });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setData({ ...data, signature: '', sigType: 'draw' });
  };

  return (
    <div className="space-y-4">
      {/* Signature Type Toggle */}
      <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5">
        <button 
          type="button"
          onClick={() => setData({...data, sigType: 'draw'})}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${data.sigType === 'draw' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <PenTool size={14}/> Draw
        </button>
        <button 
          type="button"
          onClick={() => setData({...data, sigType: 'text'})}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${data.sigType === 'text' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <TypeIcon size={14}/> Type
        </button>
      </div>

      {/* Signature Drawing Area */}
      {data.sigType === 'draw' ? (
        <div className="relative group">
          <canvas
            ref={canvasRef}
            width={400}
            height={150}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-32 bg-white rounded-xl border-2 border-dashed border-slate-300 touch-none cursor-crosshair shadow-inner"
          />
          <button 
            type="button"
            onClick={clearCanvas} 
            className="absolute top-2 right-2 p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
          >
            <RotateCcw size={14}/>
          </button>
        </div>
      ) : (
        /* Signature Typing Area with Randomize Option */
        <div className="space-y-3">
          <div className="relative">
            <input 
              type="text"
              className="w-full bg-slate-950/80 border border-white/10 p-4 pr-16 rounded-xl text-xl text-white outline-none focus:border-blue-500 transition-all shadow-xl"
              style={{ fontFamily: data.sigFont || fontStyles[0] }}
              value={data.sigText}
              placeholder="Enter Name..."
              onChange={(e) => setData({ ...data, sigText: e.target.value, sigType: 'text' })}
            />
            {/* Style Randomizer Button */}
            <button 
              type="button"
              onClick={nextFontStyle}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg flex items-center justify-center transition-all active:scale-90"
              title="Change Style"
            >
              <Sparkles size={18} />
            </button>
          </div>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] text-center italic">
            Click magic button to randomize font style
          </p>
        </div>
      )}
    </div>
  );
}