import React, { useState } from 'react';
import { Ruler, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SIZE_CHART, calculateSizeRecommendation } from '../data/products';

export const SizeGuidePage: React.FC = () => {
  const [age, setAge] = useState<number>(5);
  const [height, setHeight] = useState<number>(110);
  const [weight, setWeight] = useState<number>(18);
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  const recommendation = calculateSizeRecommendation(age, height, weight);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#4E8773] block font-heading">
          Chăm sóc bé yêu
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#3D2C24] font-heading">
          Hướng dẫn chọn size cho bé
        </h1>
        <p className="text-sm text-[#5D6F66]">
          Công cụ tính toán size thông minh cùng bảng quy đổi kích thước chuẩn từ 3–12 tuổi.
        </p>
      </div>

      {/* Interactive Tool Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE8D8] shadow-xs">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 pb-6 border-b border-[#FAF6EC] mb-6">
            <div className="p-3 rounded-2xl bg-[#EBF3EF] text-[#4E8773] border border-[#D4E5DE]">
              <Ruler className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#3E5149] font-heading">
                Chọn đúng size cho bé thật dễ
              </h2>
              <p className="text-xs text-[#647B72]">
                Nhập số đo thực tế để Mầm Kids gợi ý size chuẩn nhất cho bé
              </p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#3E5149] mb-2">
                  1. Tuổi của bé
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] font-medium focus:outline-hidden focus:border-[#4E8773]"
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((y) => (
                    <option key={y} value={y}>
                      {y} tuổi
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E5149] mb-2">
                  2. Chiều cao (cm)
                </label>
                <input
                  type="number"
                  min={70}
                  max={165}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] font-medium focus:outline-hidden focus:border-[#4E8773]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E5149] mb-2">
                  3. Cân nặng (kg)
                </label>
                <input
                  type="number"
                  min={8}
                  max={60}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] font-medium focus:outline-hidden focus:border-[#4E8773]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-[#4E8773] hover:bg-[#417361] text-white font-bold text-sm sm:text-base transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>TƯ VẤN SIZE</span>
            </button>
          </form>

          {/* Result Card */}
          {hasCalculated && (
            <div className="mt-8 p-6 rounded-3xl bg-[#F2F7F4] border border-[#D4E5DE] space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#647B72] block">
                    Size Mầm Kids đề xuất cho bé:
                  </span>
                  <div className="text-3xl font-black text-[#4E8773] mt-0.5 font-heading">
                    {recommendation.recommendedSize}
                  </div>
                  <span className="text-xs font-medium text-[#5D6F66]">
                    Độ tuổi chuẩn: {recommendation.ageRange} (Cao: {recommendation.heightRange} · Nặng: {recommendation.weightRange})
                  </span>
                </div>

                <Link
                  to="/san-pham"
                  className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#4E8773] hover:bg-[#417361] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Chọn đồ theo size này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#D4E5DE] text-xs text-[#3E5149] leading-relaxed">
                💡 <strong>Gợi ý chi tiết:</strong> {recommendation.advice}
              </div>
            </div>
          )}

          {/* Mandatory Note */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FAF2DF] border border-[#EFE5CD] flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#4E8773] shrink-0 mt-0.5" />
            <p className="text-xs text-[#3E5149] leading-relaxed font-medium">
              “Tuổi chỉ mang tính tham khảo. Phụ huynh nên kiểm tra số đo thực tế của bé trước khi lựa chọn size.”
            </p>
          </div>
        </div>
      </div>

      {/* Standard Size Chart Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8D8] shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#3E5149] font-heading">
            Bảng quy đổi kích thước chuẩn thời trang trẻ em Mầm Kids
          </h3>
          <p className="text-xs text-[#647B72] mt-1">
            Áp dụng cho tất cả dòng sản phẩm áo thun, sơ mi, quần short, váy và đồ bộ
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left text-[#3E5149]">
            <thead className="bg-[#F2F7F4] text-[#4E8773] font-bold border-b border-[#D4E5DE]">
              <tr>
                <th className="py-3.5 px-4 rounded-l-xl">Kích cỡ</th>
                <th className="py-3.5 px-4">Độ tuổi tham khảo</th>
                <th className="py-3.5 px-4">Chiều cao bé</th>
                <th className="py-3.5 px-4">Cân nặng bé</th>
                <th className="py-3.5 px-4">Vòng ngực áo</th>
                <th className="py-3.5 px-4 rounded-r-xl">Chiều dài áo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE8D8]">
              {SIZE_CHART.map((row) => (
                <tr key={row.size} className="hover:bg-[#FDF9F1]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#4E8773]">{row.size}</td>
                  <td className="py-3.5 px-4">{row.age}</td>
                  <td className="py-3.5 px-4 tabular-nums">{row.height}</td>
                  <td className="py-3.5 px-4 tabular-nums">{row.weight}</td>
                  <td className="py-3.5 px-4 tabular-nums">{row.chest}</td>
                  <td className="py-3.5 px-4 tabular-nums">{row.shirtLength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
