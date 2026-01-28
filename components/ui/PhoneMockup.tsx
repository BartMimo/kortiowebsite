import React from 'react';

interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
  imgSrc?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, className = "", imgSrc }) => {
  return (
    <div className={`relative mx-auto border-slate-900 bg-slate-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl ${className}`}>
      <div className="h-[32px] w-[3px] bg-slate-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-slate-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-slate-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-slate-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-slate-900 z-20 rounded-b-2xl"></div>
        
        {/* Content */}
        {imgSrc ? (
            <img src={imgSrc} alt="App Screenshot" className="w-full h-full object-cover" />
        ) : (
            <div className="w-full h-full flex flex-col relative">
               {/* Header UI Mockup */}
               <div className="h-20 bg-slate-50 border-b border-slate-100 w-full pt-8 px-4 flex items-center justify-between">
                 <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                 <div className="w-24 h-4 rounded-full bg-slate-200"></div>
                 <div className="w-6 h-6 rounded-full bg-slate-200"></div>
               </div>
               {/* Body UI Mockup */}
               <div className="p-4 space-y-4 flex-1 overflow-hidden bg-white">
                  <div className="w-full h-32 rounded-xl bg-slate-100 animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="w-1/2 h-24 rounded-xl bg-blue-50 animate-pulse"></div>
                    <div className="w-1/2 h-24 rounded-xl bg-slate-50 animate-pulse"></div>
                  </div>
                   <div className="w-full h-12 rounded-lg bg-slate-50 mt-4"></div>
                   <div className="w-full h-12 rounded-lg bg-slate-50"></div>
                   <div className="w-full h-12 rounded-lg bg-slate-50"></div>
               </div>
               {/* Tab Bar UI Mockup */}
               <div className="h-16 bg-white border-t border-slate-100 w-full flex items-center justify-around px-6 absolute bottom-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-100"></div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100"></div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100"></div>
               </div>
            </div>
        )}
      </div>
    </div>
  );
};