import React, { useState } from 'react';
import { Sparkles, Layers, Tag, ArrowRight } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { SizeAdvisorModal } from '../components/common/SizeAdvisorModal';
import { OutfitStylingSection } from '../components/common/OutfitStylingSection';
import { Product } from '../types';

export const CollectionsPage: React.FC = () => {
  const [activeCollectionId, setActiveCollectionId] = useState<string>('all');
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2DF] border border-[#F4E5BD] text-[#355F52] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#4E8773]" />
          <span>LOOKBOOK & BỘ SƯU TẬP 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#2F403A] font-heading">
          Bộ sưu tập thời trang Mầm Kids
        </h1>
        <p className="text-sm sm:text-base text-[#5D726A] leading-relaxed">
          7 concept thời trang độc đáo dành cho bé trai và bé gái: mềm mại, an toàn, chuẩn phong cách hiện đại đong đầy yêu thương.
        </p>
      </div>

      {/* Collection Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveCollectionId('all')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeCollectionId === 'all'
              ? 'bg-[#355F52] text-white shadow-xs'
              : 'bg-white text-[#2F403A] border border-[#EFE8D8] hover:border-[#355F52]'
          }`}
        >
          Tất cả 7 bộ sưu tập
        </button>
        {COLLECTIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCollectionId(c.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeCollectionId === c.id
                ? 'bg-[#355F52] text-white shadow-xs'
                : 'bg-white text-[#2F403A] border border-[#EFE8D8] hover:border-[#355F52]'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Collections Sections */}
      <div className="space-y-16">
        {COLLECTIONS.filter(
          (c) => activeCollectionId === 'all' || activeCollectionId === c.id
        ).map((col) => {
          const colProducts = PRODUCTS.filter((p) => p.collectionId === col.id);

          return (
            <div
              key={col.id}
              id={col.id}
              className="space-y-6 pt-4 border-t first:border-t-0 border-[#EFE8D8]"
            >
              {/* Collection Editorial Banner */}
              <div className="rounded-[32px] overflow-hidden bg-white border border-[#EFE8D8] shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-4 aspect-16/9 lg:aspect-4/3 overflow-hidden bg-[#FAF2DF]">
                    <img
                      src={col.image}
                      alt={col.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="lg:col-span-8 p-6 sm:p-8 space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#355F52] block font-heading">
                      Concept Bộ Sưu Tập · {colProducts.length} Thiết Kế
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading">
                      {col.title}
                    </h2>
                    <p className="text-sm font-semibold text-[#4E8773] italic">
                      "{col.tagline}"
                    </p>
                    <p className="text-xs sm:text-sm text-[#3E5149] pt-1 leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid of items in this collection */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {colProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded Complete Outfits Showcase */}
      <OutfitStylingSection
        title="GỢI Ý PHỐI CÙNG TRỌN BỘ OUTFIT"
        subtitle="Khám phá các set đồ dạo phố, thể thao và công chúa pastel được phối sẵn hoàn chỉnh"
        className="rounded-[32px] overflow-hidden"
      />

      {/* Size Advisor Modal */}
      <SizeAdvisorModal
        isOpen={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
      />
    </div>
  );
};
