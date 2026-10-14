import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle, Ruler } from 'lucide-react';
import { calculateSizeRecommendation, SIZE_CHART } from '../../data/products';
import { useLanguage } from '../../i18n/LanguageContext';

interface SizeAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}

export const SizeAdvisorModal: React.FC<SizeAdvisorModalProps> = ({
  isOpen,
  onClose,
  onSelectSize
}) => {
  if (!isOpen) return null;

  const { language } = useLanguage();
  const [age, setAge] = useState<number>(5);
  const [height, setHeight] = useState<number>(110);
  const [weight, setWeight] = useState<number>(18);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'advisor' | 'chart'>('advisor');

  const recommendation = calculateSizeRecommendation(age, height, weight);

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3E5149]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EFE8D8] overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-[#EFE8D8] bg-[#F2F7F4]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#EBF3EF] text-[#4E8773] border border-[#D4E5DE]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#3E5149] text-lg font-heading">
                {language === 'en' ? 'Finding the Right Size is Easy' : 'Chọn đúng size cho bé thật dễ'}
              </h3>
              <p className="text-xs text-[#647B72]">
                {language === 'en'
                  ? 'Smart size advisor based on child age, height, and actual weight'
                  : 'Tư vấn size thông minh dựa trên độ tuổi, chiều cao và cân nặng thực tế'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#3E5149] hover:bg-[#EBF3EF] rounded-2xl transition-colors cursor-pointer"
            aria-label={language === 'en' ? 'Close' : 'Đóng'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#EFE8D8] bg-[#FDF9F1] px-6">
          <button
            onClick={() => setActiveTab('advisor')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'advisor'
                ? 'border-[#4E8773] text-[#4E8773]'
                : 'border-transparent text-[#647B72] hover:text-[#3E5149]'
            }`}
          >
            {language === 'en' ? 'Smart Size Calculator' : 'Tư vấn kích thước cho bé'}
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'chart'
                ? 'border-[#4E8773] text-[#4E8773]'
                : 'border-transparent text-[#647B72] hover:text-[#3E5149]'
            }`}
          >
            {language === 'en' ? 'Standard Size Chart' : 'Bảng quy đổi kích thước chuẩn'}
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'advisor' ? (
            <div>
              <form onSubmit={handleConsult} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Tuổi */}
                  <div>
                    <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                      {language === 'en' ? "Child's Age" : 'Tuổi của bé'}
                    </label>
                    <select
                      value={age}
                      onChange={(e) => {
                        setAge(Number(e.target.value));
                        setShowResult(false);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-[#3E5149] text-sm focus:outline-hidden focus:border-[#4E8773]"
                    >
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((y) => (
                        <option key={y} value={y}>
                          {y} {language === 'en' ? 'yrs old' : 'tuổi'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Chiều cao */}
                  <div>
                    <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                      {language === 'en' ? 'Height (cm)' : 'Chiều cao (cm)'}
                    </label>
                    <input
                      type="number"
                      min={70}
                      max={165}
                      value={height}
                      onChange={(e) => {
                        setHeight(Number(e.target.value));
                        setShowResult(false);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-[#3E5149] text-sm focus:outline-hidden focus:border-[#4E8773]"
                    />
                  </div>

                  {/* Cân nặng */}
                  <div>
                    <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                      {language === 'en' ? 'Weight (kg)' : 'Cân nặng (kg)'}
                    </label>
                    <input
                      type="number"
                      min={8}
                      max={60}
                      value={weight}
                      onChange={(e) => {
                        setWeight(Number(e.target.value));
                        setShowResult(false);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-[#3E5149] text-sm focus:outline-hidden focus:border-[#4E8773]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#4E8773] hover:bg-[#417361] text-white font-bold text-sm rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'en' ? 'GET RECOMMENDED SIZE' : 'TƯ VẤN SIZE'}</span>
                </button>
              </form>

              {/* Result box */}
              {showResult && (
                <div className="mt-6 p-5 rounded-2xl bg-[#F2F7F4] border border-[#D4E5DE]">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#647B72]">
                        {language === 'en' ? 'Best matching recommended size:' : 'Kích thước đề xuất phù hợp nhất:'}
                      </span>
                      <h4 className="text-2xl font-black text-[#4E8773] mt-1 font-heading">
                        {recommendation.recommendedSize}
                      </h4>
                      <p className="text-xs text-[#5D6F66] mt-1 font-medium">
                        {language === 'en'
                          ? `Fits approx. ${(recommendation as any).ageRangeEn || recommendation.ageRange} · Height ${recommendation.heightRange} · Weight ${recommendation.weightRange}`
                          : `Phù hợp bé ${recommendation.ageRange} · Cao ${recommendation.heightRange} · Nặng ${recommendation.weightRange}`}
                      </p>
                    </div>

                    {onSelectSize && (
                      <button
                        onClick={() => {
                          onSelectSize(recommendation.recommendedSize);
                          onClose();
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#4E8773] hover:bg-[#417361] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {language === 'en' ? 'Select this size' : 'Áp dụng size này'}
                      </button>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-[#3E5149] leading-relaxed border-t border-[#D4E5DE] pt-3">
                    💡 <strong>{language === 'en' ? 'Advice from Mầm Kids:' : 'Lời khuyên từ Mầm Kids:'}</strong>{' '}
                    {language === 'en' ? (recommendation as any).adviceEn || recommendation.advice : recommendation.advice}
                  </p>
                </div>
              )}

              {/* Mandatory Note */}
              <div className="mt-6 p-4 rounded-2xl bg-[#FAF2DF] border border-[#EFE5CD] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#4E8773] shrink-0 mt-0.5" />
                <p className="text-xs text-[#3E5149] leading-relaxed">
                  <strong>{language === 'en' ? 'Note:' : 'Ghi chú:'}</strong>{' '}
                  {language === 'en'
                    ? '“Age is for guidance only, always prioritize your child’s actual height and weight.”'
                    : '“Độ tuổi chỉ mang tính tham khảo, nên ưu tiên số đo thực tế của bé.”'}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-[#3E5149]">
                  <thead className="bg-[#F2F7F4] text-[#4E8773] font-bold border-b border-[#D4E5DE]">
                    <tr>
                      <th className="py-3 px-3">{language === 'en' ? 'Size' : 'Size'}</th>
                      <th className="py-3 px-3">{language === 'en' ? 'Age' : 'Độ tuổi'}</th>
                      <th className="py-3 px-3">{language === 'en' ? 'Height' : 'Chiều cao'}</th>
                      <th className="py-3 px-3">{language === 'en' ? 'Weight' : 'Cân nặng'}</th>
                      <th className="py-3 px-3">{language === 'en' ? 'Chest' : 'Vòng ngực'}</th>
                      <th className="py-3 px-3">{language === 'en' ? 'Top Length' : 'Dài áo'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8D8]">
                    {SIZE_CHART.map((row) => (
                      <tr key={row.size} className="hover:bg-[#FDF9F1]/60">
                        <td className="py-3 px-3 font-bold text-[#4E8773]">{row.size}</td>
                        <td className="py-3 px-3">{row.age}</td>
                        <td className="py-3 px-3 tabular-nums">{row.height}</td>
                        <td className="py-3 px-3 tabular-nums">{row.weight}</td>
                        <td className="py-3 px-3 tabular-nums">{row.chest}</td>
                        <td className="py-3 px-3 tabular-nums">{row.shirtLength}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 rounded-2xl bg-[#FAF6EC] text-xs text-[#647B72]">
                {language === 'en'
                  ? 'If your child’s height or weight falls between two sizes, Mầm Kids recommends choosing the larger size so your child can play comfortably and grow into it.'
                  : 'Nếu số đo chiều cao hoặc cân nặng của bé ở giữa 2 size, Mầm Kids khuyên phụ huynh nên chọn size lớn hơn để bé thoải mái vận động và lớn nhanh.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
