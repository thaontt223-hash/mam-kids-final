import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Check, ArrowRight, Tag, Heart } from 'lucide-react';
import { OUTFIT_SETS, formatVND } from '../../data/products';
import { OutfitSet } from '../../types';
import { useCart } from '../../context/CartContext';

interface OutfitStylingSectionProps {
  title?: string;
  subtitle?: string;
  currentProductId?: string;
  genderFilter?: 'all' | 'be-trai' | 'be-gai';
  className?: string;
}

export const OutfitStylingSection: React.FC<OutfitStylingSectionProps> = ({
  title = 'GỢI Ý PHỐI CÙNG',
  subtitle = 'Các set trang phục phối sẵn chuẩn gu Mầm Kids – Tiện lợi cho ba mẹ, phong cách cho bé',
  currentProductId,
  genderFilter: initialFilter = 'all',
  className = ''
}) => {
  const { addOutfitSetToCart } = useCart();
  const [filter, setFilter] = useState<'all' | 'be-trai' | 'be-gai'>(initialFilter);
  const [addedOutfitId, setAddedOutfitId] = useState<string | null>(null);

  const displayedOutfits = OUTFIT_SETS.filter((outfit) => {
    if (currentProductId) {
      // If on product detail page, prioritize outfits containing this product or related
      const contains = outfit.items.some((item) => item.productId === currentProductId);
      if (contains) return true;
    }
    if (filter === 'all') return true;
    return outfit.gender === filter;
  });

  const handleAddOutfit = (outfit: OutfitSet) => {
    addOutfitSetToCart(outfit);
    setAddedOutfitId(outfit.id);
    setTimeout(() => {
      setAddedOutfitId(null);
    }, 1500);
  };

  return (
    <section className={`py-16 sm:py-24 border-b border-[#EFE8D8] bg-[#FAF1ED] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#F4B99B]/40 text-[#355F52] text-xs font-bold mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B99B]" />
              <span>OUTFIT & PHỐI ĐỒ HOÀN CHỈNH</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#2F403A] font-heading tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5D726A] mt-1.5 font-medium max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          {!currentProductId && (
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-[#EFE8D8] shadow-2xs self-start md:self-auto">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === 'all'
                    ? 'bg-[#355F52] text-white shadow-2xs'
                    : 'text-[#5D726A] hover:text-[#2F403A] hover:bg-[#EFF5F2]'
                }`}
              >
                Tất cả outfit
              </button>
              <button
                type="button"
                onClick={() => setFilter('be-trai')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === 'be-trai'
                    ? 'bg-[#355F52] text-white shadow-2xs'
                    : 'text-[#5D726A] hover:text-[#2F403A] hover:bg-[#EFF5F2]'
                }`}
              >
                👦 Bé trai
              </button>
              <button
                type="button"
                onClick={() => setFilter('be-gai')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === 'be-gai'
                    ? 'bg-[#355F52] text-white shadow-2xs'
                    : 'text-[#5D726A] hover:text-[#2F403A] hover:bg-[#EFF5F2]'
                }`}
              >
                👧 Bé gái
              </button>
            </div>
          )}
        </div>

        {/* Outfit Sets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedOutfits.map((outfit) => {
            const isAdded = addedOutfitId === outfit.id;
            return (
              <div
                key={outfit.id}
                className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#EFE8D8] hover:border-[#355F52]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Image + Badges */}
                  <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-6 bg-[#FDF9F1] border border-[#EFE8D8]">
                    <img
                      src={outfit.image}
                      alt={outfit.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Top Left Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#2F403A] text-xs font-bold shadow-2xs flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-[#4E8773]" />
                        {outfit.badge}
                      </span>
                    </div>

                    {/* Top Right Saving Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full bg-[#F4B99B] text-[#2F403A] text-xs font-black shadow-2xs">
                        Tiết kiệm {formatVND(outfit.saving)}
                      </span>
                    </div>

                    {/* Gender Indicator in Image */}
                    <div className="absolute bottom-3 left-3 text-white text-xs font-bold drop-shadow-md">
                      {outfit.gender === 'be-trai' ? '👦 Trang phục bé trai' : '👧 Trang phục bé gái'}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#2F403A] font-heading group-hover:text-[#355F52] transition-colors">
                      {outfit.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#5D726A] mt-0.5">
                      {outfit.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#3E5149] mt-2.5 leading-relaxed">
                      {outfit.description}
                    </p>
                  </div>

                  {/* Items Included Breakdown */}
                  <div className="mt-5 space-y-2.5 bg-[#FDF9F1] p-4 rounded-2xl border border-[#EFE8D8]">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#355F52] block font-heading">
                      Gồm {outfit.items.length} món trong outfit này:
                    </span>
                    <div className="space-y-1.5">
                      {outfit.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs text-[#2F403A] font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4E8773]" />
                            <Link
                              to={`/san-pham/${item.productId}`}
                              className="hover:text-[#355F52] hover:underline"
                            >
                              {item.productName}
                            </Link>
                          </div>
                          <span className="text-[#5D726A] font-semibold tabular-nums">
                            {formatVND(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer: Pricing & Action Buttons */}
                <div className="mt-6 pt-5 border-t border-[#EFE8D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[#8B9D95] line-through font-semibold tabular-nums">
                        {formatVND(outfit.originalPrice)}
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-[#355F52] tabular-nums font-heading">
                        {formatVND(outfit.comboPrice)}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#5D726A] font-medium block">
                      Đã bao gồm 01 túi tote Mầm Kids miễn phí
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddOutfit(outfit)}
                      disabled={isAdded}
                      className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 shadow-sm ${
                        isAdded
                          ? 'bg-[#28473D] text-white'
                          : 'bg-[#355F52] hover:bg-[#28473D] text-white hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-[#F5DFA0]" />
                          <span>Đã thêm cả set</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-white" />
                          <span>Thêm cả set vào giỏ</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
