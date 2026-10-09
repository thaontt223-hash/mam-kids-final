import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist, addToCart } = useCart();
  const { language, getProductName, getCategoryName, formatPrice, t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const displayName = getProductName(product) || product.name;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-[20px] overflow-hidden border border-[#EFE8D8] hover:border-[#4E8773]/50 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {/* Product Image Container: 4:5 ratio */}
      <Link
        to={`/san-pham/${product.id}`}
        className="relative block aspect-4/5 w-full shrink-0 bg-[#FAF6EE] overflow-hidden"
      >
        {!imageError ? (
          <img
            src={product.images[0]}
            alt={displayName}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-linear-to-b from-[#FDF9F1] to-[#EAF3EF] text-center">
            <span className="text-2xl mb-1">🌱</span>
            <span className="text-xs font-semibold text-[#4E8773] font-heading">{displayName}</span>
            <span className="text-[11px] text-[#5D726A] mt-0.5">{getCategoryName(product.category) || product.categoryName}</span>
          </div>
        )}

        {/* Feature Badges: Set, Green, New, Bestseller, Discount */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none max-w-[85%]">
          {product.isSet && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#355F52] text-[#F5DFA0] text-[10px] font-bold shadow-2xs backdrop-blur-xs">
              <span>✨</span> Set phối
            </span>
          )}
          {product.isGreenProduct && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#285A48] text-white text-[10px] font-bold shadow-2xs backdrop-blur-xs">
              <span>🌱</span> Mầm Xanh
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F4C95D] text-[#285A48] text-[10px] font-bold shadow-2xs">
              {language === 'en' ? 'New' : 'Mới'}
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F39A73] text-white text-[10px] font-bold shadow-2xs">
              {language === 'en' ? 'Bestseller' : 'Bán chạy'}
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F39A73] text-white text-[10px] font-bold shadow-2xs">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon in corner */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors z-10 cursor-pointer ${
            isFavorite
              ? 'bg-white text-[#F3B59A] shadow-xs'
              : 'bg-white/85 text-[#2F403A] hover:bg-white hover:text-[#4E8773]'
          }`}
          aria-label={isFavorite ? (language === 'en' ? 'Remove from wishlist' : 'Xóa khỏi yêu thích') : (language === 'en' ? 'Add to wishlist' : 'Thêm vào yêu thích')}
          title={isFavorite ? (language === 'en' ? 'Wishlisted' : 'Đã yêu thích') : t('nav.wishlist')}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#F3B59A]' : ''}`} />
        </button>
      </Link>

      {/* Product Content Details: Equal height structure */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Metadata category */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#5D726A] mb-1 font-medium truncate">
            <span>
              {product.gender === 'be-trai'
                ? (language === 'en' ? 'Boys' : 'Bé trai')
                : product.gender === 'be-gai'
                ? (language === 'en' ? 'Girls' : 'Bé gái')
                : (language === 'en' ? 'Unisex' : 'Unisex')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">
              {product.isSet
                ? (language === 'en' ? 'Complete Set' : 'Set phối hoàn chỉnh')
                : product.category === 'phu-kien'
                ? (language === 'en' ? 'Accessories' : 'Phụ kiện')
                : (getCategoryName(product.category) || product.categoryName)}
            </span>
          </div>

          {/* Product Name */}
          <Link
            to={`/san-pham/${product.id}`}
            className="block text-sm sm:text-[15px] font-bold text-[#2F403A] hover:text-[#4E8773] transition-colors line-clamp-1 font-heading h-5 sm:h-6"
            title={displayName}
          >
            {displayName}
          </Link>

          {/* 1-Line Short Description */}
          <p className="text-[11.5px] text-[#5D726A] mt-0.5 line-clamp-1 leading-snug h-[18px]">
            {product.fabricDetail || product.description}
          </p>

          {/* Consistent Feature Highlight Row (Equal height slot) */}
          <div className="h-[22px] mt-1.5 flex items-center">
            {product.isSet && product.setItems && product.setItems.length > 0 ? (
              <div className="text-[10.5px] text-[#355F52] font-semibold line-clamp-1 bg-[#EAF3EF] px-2 py-0.5 rounded-md border border-[#D2E3DC] truncate w-full">
                ✨ {language === 'en' ? 'Set:' : 'Gồm:'} {product.setItems.slice(0, 2).join(' + ')}
              </div>
            ) : product.isPersonalizable ? (
              <div className="text-[10.5px] text-[#355F52] font-medium line-clamp-1 bg-[#FDF6E8] px-2 py-0.5 rounded-md border border-[#F4E3BA] truncate w-full">
                ✏️ {language === 'en' ? 'Name embroidery available' : 'Hỗ trợ thêu tên cho bé'}
              </div>
            ) : (
              <div className="text-[10.5px] text-[#7A8E85] line-clamp-1 truncate w-full">
                🌿 {product.material.split(',')[0]}
              </div>
            )}
          </div>

          {/* Color preview dots */}
          <div className="h-4 mt-2 flex items-center gap-1.5">
            {product.colors.slice(0, 3).map((col, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-[#8B9D95]">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>

        {/* Price & Primary CTA */}
        <div className="mt-3 pt-2.5 border-t border-[#F0EBE0] flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-base font-black text-[#285A48] tabular-nums font-heading">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10.5px] text-[#8B9D95] line-through tabular-nums -mt-0.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Compact Sage Add to Cart CTA */}
            <button
              onClick={handleQuickAdd}
              disabled={addedAnimation}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs shrink-0 cursor-pointer ${
                addedAnimation
                  ? 'bg-[#285A48] text-white'
                  : 'bg-[#4E8773] text-white hover:bg-[#285A48] active:scale-95'
              }`}
              title={t('products.addToCart')}
              aria-label={t('products.addToCart')}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-xs">{t('products.added')}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-xs">{t('products.addToCart')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
