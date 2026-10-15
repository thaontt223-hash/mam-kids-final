import React from 'react';
import { Phone } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const FloatingHotlineButton: React.FC = () => {
  const { language } = useLanguage();

  return (
    <a
      href="tel:19006868"
      aria-label="Gọi hotline Mầm Kids 1900 6868"
      title={language === 'en' ? 'Support Hotline: 1900 6868' : 'Hotline hỗ trợ: 1900 6868'}
      className="fixed z-40 right-[14px] bottom-[18px] sm:right-[20px] sm:bottom-[20px] inline-flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-[#285A48] hover:bg-[#1E4537] text-white shadow-md shadow-[#285A48]/30 hover:shadow-lg transition-all duration-200 border border-white/20 select-none group cursor-pointer active:scale-95 text-decoration-none"
    >
      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
        <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white" aria-hidden="true" />
      </span>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap leading-none font-bold text-xs sm:text-sm tracking-wider text-white">
        <span className="hidden md:inline text-[11px] font-medium text-[#E8F1EC]">
          {language === 'en' ? 'Support Hotline:' : 'Hotline hỗ trợ:'}
        </span>
        <span>1900 6868</span>
      </span>
    </a>
  );
};
