import React from 'react';
import { Sparkles, Heart, Star, Cloud } from 'lucide-react';
import { PersonalizationConfig } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface PersonalizationStudioProps {
  config: PersonalizationConfig;
  onChange: (newConfig: PersonalizationConfig) => void;
  productImage: string;
  productName: string;
}

export const PersonalizationStudio: React.FC<PersonalizationStudioProps> = ({
  config,
  onChange,
  productImage,
  productName
}) => {
  const { language } = useLanguage();

  const icons = [
    { id: 'heart', label: language === 'en' ? 'Heart' : 'Trái tim', symbol: '♥', icon: Heart },
    { id: 'star', label: language === 'en' ? 'Star' : 'Ngôi sao', symbol: '★', icon: Star },
    { id: 'cloud', label: language === 'en' ? 'Cloud' : 'Đám mây', symbol: '☁', icon: Cloud },
    {
      id: 'rainbow',
      label: language === 'en' ? 'Rainbow' : 'Cầu vồng',
      symbol: '🌈',
      renderIcon: () => <span className="text-sm">🌈</span>
    },
    { id: 'none', label: language === 'en' ? 'No Icon' : 'Không icon', symbol: '—' }
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...config,
      childName: e.target.value
    });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...config,
      message: e.target.value
    });
  };

  const handleIconSelect = (iconId: PersonalizationConfig['icon']) => {
    onChange({
      ...config,
      icon: iconId
    });
  };

  const handlePositionSelect = (position: 'chest' | 'back') => {
    onChange({
      ...config,
      position
    });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#EFE8D8] shadow-xs space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-[#EFE8D8]">
        <div className="p-2.5 rounded-2xl bg-[#EBF3EF] text-[#4E8773] border border-[#D4E5DE]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-bold text-[#3E5149] font-heading">
            {language === 'en' ? 'A Piece Made Exclusively for Your Child' : 'Một món đồ chỉ dành riêng cho bé'}
          </h4>
          <p className="text-xs text-[#647B72]">
            {language === 'en'
              ? "Embroider or print child's name and loving messages directly onto the garment"
              : 'Thêu hoặc in tên bé cùng thông điệp yêu thương trực tiếp lên áo'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Live Visual Canvas Preview */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold text-[#647B72] mb-2 flex items-center gap-1.5">
            <span>{language === 'en' ? 'Placement preview:' : 'Mô phỏng vị trí:'}</span>
            <span className="text-[#4E8773] font-bold">
              {config.position === 'chest'
                ? (language === 'en' ? 'Front Chest' : 'Trước ngực áo')
                : (language === 'en' ? 'Back' : 'Sau lưng áo')}
            </span>
          </div>

          <div className="relative w-full max-w-[270px] aspect-4/5 rounded-2xl bg-[#FAF6EE] p-3 border border-[#EFE8D8] shadow-inner overflow-hidden flex items-center justify-center">
            {/* Background garment */}
            <img
              src={productImage}
              alt={productName}
              className="w-full h-full object-cover object-center rounded-xl opacity-90"
            />

            {/* Simulated Embroidery Area */}
            <div
              className={`absolute inset-x-6 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none ${
                config.position === 'chest' ? 'top-16 sm:top-20' : 'top-20 sm:top-24'
              }`}
            >
              <div className="bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-[#4E8773]/30 shadow-md text-center transform scale-100 max-w-[90%]">
                <div className="flex items-center justify-center gap-1.5 text-[#4E8773] font-bold text-sm sm:text-base font-heading">
                  {config.icon !== 'none' && (
                    <span className="text-[#F4B99B] text-base">
                      {icons.find((i) => i.id === config.icon)?.symbol}
                    </span>
                  )}
                  <span className="tracking-wide">
                    {config.childName.trim() || (language === 'en' ? "Child's Name" : 'Tên của bé')}
                  </span>
                </div>
                {config.message && (
                  <p className="text-[10px] sm:text-xs text-[#647B72] mt-0.5 italic">
                    "{config.message}"
                  </p>
                )}
                <span className="inline-block text-[8px] uppercase tracking-wider text-[#4E8773] bg-[#EBF3EF] px-2 py-0.5 rounded-md mt-1 font-semibold">
                  {language === 'en' ? 'Organic Gentle Silk Thread' : 'Chỉ tơ hữu cơ êm dịu'}
                </span>
              </div>
            </div>
          </div>

          <span className="text-[11px] text-[#647B72] mt-2 italic text-center">
            {language === 'en'
              ? '* Mầm Kids uses super-soft organic cotton embroidery threads that are 100% scratch-free on sensitive skin.'
              : '* Mầm Kids sử dụng chỉ tơ cotton mềm mại, hoàn toàn không gây cộm ngứa da bé.'}
          </span>
        </div>

        {/* Configuration inputs */}
        <div className="space-y-4">
          {/* Tên bé */}
          <div>
            <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
              {language === 'en' ? "1. Child's Name or Monogram" : '1. Tên bé hoặc chữ cái đầu'}{' '}
              <span className="text-[#F4B99B]">*</span>
            </label>
            <input
              type="text"
              value={config.childName}
              onChange={handleTextChange}
              placeholder={language === 'en' ? 'E.g., Leo, Maya, Oliver...' : 'Ví dụ: Bé Bơ, An Nhiên, Minh Khang...'}
              maxLength={16}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-[#3E5149] text-sm focus:outline-hidden focus:border-[#4E8773]"
            />
          </div>

          {/* Thông điệp ngắn */}
          <div>
            <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
              {language === 'en' ? '2. Loving message (optional)' : '2. Thông điệp yêu thương (tùy chọn)'}
            </label>
            <input
              type="text"
              value={config.message || ''}
              onChange={handleMessageChange}
              placeholder={language === 'en' ? 'E.g., Little Sunshine, Stay Curious...' : 'Ví dụ: Bé Mầm đáng yêu, Little Sunshine...'}
              maxLength={28}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-[#3E5149] text-sm focus:outline-hidden focus:border-[#4E8773]"
            />
          </div>

          {/* Biểu tượng */}
          <div>
            <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
              {language === 'en' ? '3. Select cute icon' : '3. Chọn biểu tượng dễ thương'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {icons.map((ic) => (
                <button
                  key={ic.id}
                  type="button"
                  onClick={() => handleIconSelect(ic.id as PersonalizationConfig['icon'])}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    config.icon === ic.id
                      ? 'border-[#4E8773] bg-[#4E8773] text-white shadow-xs'
                      : 'border-[#EFE8D8] bg-[#FDF9F1] text-[#3E5149] hover:border-[#4E8773]'
                  }`}
                >
                  <span className="text-sm">{ic.symbol}</span>
                  <span className="truncate">{ic.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Vị trí in */}
          <div>
            <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
              {language === 'en' ? '4. Embroidery placement' : '4. Vị trí in / thêu'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handlePositionSelect('chest')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                  config.position === 'chest'
                    ? 'border-[#4E8773] bg-[#4E8773] text-white'
                    : 'border-[#EFE8D8] bg-[#FDF9F1] text-[#3E5149] hover:border-[#4E8773]'
                }`}
              >
                {language === 'en' ? 'Front Chest (Near Heart)' : 'Trước ngực áo (Gần trái tim)'}
              </button>
              <button
                type="button"
                onClick={() => handlePositionSelect('back')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                  config.position === 'back'
                    ? 'border-[#4E8773] bg-[#4E8773] text-white'
                    : 'border-[#EFE8D8] bg-[#FDF9F1] text-[#3E5149] hover:border-[#4E8773]'
                }`}
              >
                {language === 'en' ? 'Upper Back (Sporty)' : 'Sau lưng áo (Năng động)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
