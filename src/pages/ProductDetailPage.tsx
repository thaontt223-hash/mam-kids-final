import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Truck,
  RefreshCw,
  ShieldCheck,
  Ruler,
  Star,
  Check,
  ChevronRight,
  Gift,
  Layers,
  ArrowRight,
  Plus,
  QrCode,
  BookOpen
} from 'lucide-react';
import { PRODUCTS, formatVND } from '../data/products';
import { ECO_STORIES } from '../data/ecoStories';
import { ProductCard } from '../components/common/ProductCard';
import { SizeAdvisorModal } from '../components/common/SizeAdvisorModal';
import { EcoStoryModal } from '../components/common/EcoStoryModal';
import { PersonalizationStudio } from '../components/common/PersonalizationStudio';
import { OutfitStylingSection } from '../components/common/OutfitStylingSection';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PersonalizationConfig, Product } from '../types';
import { Baby } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const { user } = useAuth();

  const product = PRODUCTS.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [ecoModalOpen, setEcoModalOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const [enablePersonalization, setEnablePersonalization] = useState(false);
  const [persConfig, setPersConfig] = useState<PersonalizationConfig>({
    childName: '',
    message: '',
    icon: 'heart',
    position: 'chest'
  });

  const [activeTab, setActiveTab] = useState<'desc' | 'material' | 'reviews'>('desc');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setActiveImageIndex(0);
      setEnablePersonalization(false);
      setPersConfig({
        childName: '',
        message: '',
        icon: 'heart',
        position: 'chest'
      });
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="text-4xl block">🌱</span>
        <h2 className="text-2xl font-bold text-[#2F403A] font-heading">Không tìm thấy sản phẩm này</h2>
        <p className="text-sm text-[#5D726A]">
          Sản phẩm có thể đã được cập nhật hoặc chuyển sang danh mục khác.
        </p>
        <Link
          to="/san-pham"
          className="inline-block mt-4 px-6 py-3 rounded-2xl bg-[#355F52] text-white font-bold text-xs hover:bg-[#28473D]"
        >
          Quay lại danh mục sản phẩm
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedColor) return;
    const finalPers =
      product.isPersonalizable && enablePersonalization && persConfig.childName.trim()
        ? persConfig
        : undefined;

    addToCart(product, selectedSize, selectedColor, quantity, finalPers);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    if (!selectedColor) return;
    const finalPers =
      product.isPersonalizable && enablePersonalization && persConfig.childName.trim()
        ? persConfig
        : undefined;

    addToCart(product, selectedSize, selectedColor, quantity, finalPers);
    navigate('/thanh-toan');
  };

  // Paired Products (Frequently Paired With)
  const pairedProducts: Product[] = (product.pairedProductIds || [])
    .map((pId) => PRODUCTS.find((p) => p.id === pId))
    .filter((p): p is Product => Boolean(p));

  // Matching Accessories for this gender
  const matchingAccessories = PRODUCTS.filter(
    (p) => p.category === 'phu-kien' && p.id !== product.id && (p.gender === product.gender || p.gender === 'unisex')
  ).slice(0, 3);

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.gender === product.gender || p.category === product.category)
  ).slice(0, 4);

  // Matched Eco Story
  const ecoStory = ECO_STORIES.find((s) => s.id === product.ecoStoryId) || ECO_STORIES[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 space-y-8 sm:space-y-12 min-w-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#5D726A]">
        <Link to="/" className="hover:text-[#355F52]">Trang chủ</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/san-pham" className="hover:text-[#355F52]">Sản phẩm</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          to={`/san-pham?category=${product.category}`}
          className="hover:text-[#355F52]"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#2F403A] font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery Section */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/5 w-full rounded-[32px] overflow-hidden bg-[#FAF6EE] border border-[#EFE8D8] shadow-sm">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/images/test_kids_polo_1791213587392.jpg')) {
                  target.src = '/images/test_kids_polo_1791213587392.jpg';
                }
              }}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-xs transition-colors z-10 shadow-xs ${
                isFavorite
                  ? 'bg-white text-[#F4B99B]'
                  : 'bg-white/80 text-[#2F403A] hover:bg-white hover:text-[#355F52]'
              }`}
              title={isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#F4B99B]' : ''}`} />
            </button>

            {product.isGreenProduct && (
              <div className="absolute top-4 left-4 bg-[#355F52] text-white px-3.5 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm">
                <span>🌱</span>
                <span>Mầm Xanh</span>
              </div>
            )}
            {product.isSet && !product.isGreenProduct && (
              <div className="absolute top-4 left-4 bg-[#355F52] text-white px-3.5 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#F5DFA0]" />
                <span>Set phối hoàn chỉnh</span>
              </div>
            )}
          </div>

          {/* Thumbnails: 4:5 ratio */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`group relative w-16 h-20 sm:w-20 sm:h-25 aspect-4/5 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-[#FAF6EE] ${
                    activeImageIndex === idx
                      ? 'border-[#355F52] shadow-sm ring-2 ring-[#355F52]/20'
                      : 'border-[#EFE8D8] opacity-75 hover:opacity-100 hover:border-[#4E8773]'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover object-center" />
                  <span className="absolute bottom-1 inset-x-1 text-[9px] font-bold text-center bg-black/60 text-white rounded-md py-0.5 leading-none backdrop-blur-xs">
                    {idx === 0 ? 'Toàn cảnh' : idx === 1 ? 'Chất liệu' : 'Góc chụp'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EFE8D8]">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#EFE8D8]">
              <Truck className="w-4 h-4 text-[#355F52] mb-1" />
              <span className="text-[11px] font-bold text-[#2F403A]">Freeship từ 300k</span>
              <span className="text-[10px] text-[#5D726A]">Toàn quốc 2–3 ngày</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#EFE8D8]">
              <RefreshCw className="w-4 h-4 text-[#355F52] mb-1" />
              <span className="text-[11px] font-bold text-[#2F403A]">Đổi trả 15 ngày</span>
              <span className="text-[10px] text-[#5D726A]">Đổi size tận nơi</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#EFE8D8]">
              <ShieldCheck className="w-4 h-4 text-[#355F52] mb-1" />
              <span className="text-[11px] font-bold text-[#2F403A]">An toàn 100%</span>
              <span className="text-[10px] text-[#5D726A]">Bông cotton hữu cơ</span>
            </div>
          </div>
        </div>

        {/* Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5D726A] mb-2">
              <span className="font-bold text-[#355F52]">{product.genderName}</span>
              <span>·</span>
              <span>{product.categoryName}</span>
              <span>·</span>
              <span className="text-[#355F52] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4E8773]" />
                Còn hàng sẵn
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#2F403A]">{product.rating}</span>
              <span className="text-xs text-[#5D726A]">({product.reviewsCount} đánh giá từ phụ huynh)</span>
            </div>

            {/* Price Box */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#EFE8D8] flex items-baseline gap-4 shadow-xs">
              <span className="text-3xl font-black text-[#355F52] tabular-nums font-heading">
                {formatVND(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base text-[#8B9D95] line-through tabular-nums">
                    {formatVND(product.originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#F4B99B] text-[#2F403A] text-xs font-bold">
                    Tiết kiệm {formatVND(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* If it's a complete outfit set, show what's inside */}
          {product.isSet && product.setItems && product.setItems.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#EFF5F2] border border-[#D2E3DC] space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#355F52] font-heading">
                <Sparkles className="w-4 h-4 text-[#4E8773]" />
                <span>Trọn bộ outfit bao gồm:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#2F403A]">
                {product.setItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-[#355F52] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Color Selection */}
          <div>
            <label className="block text-xs font-bold text-[#2F403A] mb-2">
              Màu sắc: <span className="font-semibold text-[#355F52]">{selectedColor?.name}</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all ${
                    selectedColor?.name === color.name
                      ? 'border-[#355F52] bg-[#EFF5F2] font-bold text-[#355F52] ring-1 ring-[#355F52]'
                      : 'border-[#EFE8D8] text-[#2F403A] hover:border-[#355F52]'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#2F403A]">Kích thước cho bé</label>
              <button
                type="button"
                onClick={() => setSizeModalOpen(true)}
                className="text-xs text-[#355F52] font-bold hover:underline flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                Hướng dẫn chọn size cho bé
              </button>
            </div>

            {/* Baby size recommendation for logged in member */}
            {user?.babies && user.babies.length > 0 && (
              <div className="mb-2.5 p-2.5 rounded-2xl bg-[#FAF6EC] border border-[#F5DFA0] flex items-center justify-between gap-2 flex-wrap text-xs">
                <span className="font-bold text-[#355F52] flex items-center gap-1.5 text-[11px]">
                  <Baby className="w-3.5 h-3.5 text-[#4E8773]" />
                  Gợi ý size cho bé yêu:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {user.babies.map((baby) => {
                    const sizeNum = baby.preferredSize.split(' ')[0];
                    const matched = product.sizes.find(
                      (s) => s.startsWith(sizeNum) || s.includes(sizeNum)
                    );
                    return (
                      <button
                        key={baby.id}
                        type="button"
                        onClick={() => {
                          if (matched) setSelectedSize(matched);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors border ${
                          selectedSize === matched
                            ? 'bg-[#355F52] text-white border-[#355F52]'
                            : 'bg-white border-[#D2E3DC] hover:border-[#4E8773] text-[#2F403A]'
                        }`}
                      >
                        <span>{baby.name}:</span>
                        <strong className={selectedSize === matched ? 'text-[#F5DFA0]' : 'text-[#355F52]'}>
                          {baby.preferredSize}
                        </strong>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                    selectedSize === sz
                      ? 'border-[#355F52] bg-[#355F52] text-white shadow-xs'
                      : 'border-[#EFE8D8] text-[#2F403A] hover:border-[#355F52] bg-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Personalization Section: Tạm ẩn khỏi UI để tinh gọn theo yêu cầu */}
          {/* Giữ lại Smart Size & Hồ sơ bé */}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#EFE8D8] rounded-2xl bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-sm font-bold text-[#2F403A] hover:bg-[#FDF9F1] rounded-xl"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#2F403A] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-sm font-bold text-[#2F403A] hover:bg-[#FDF9F1] rounded-xl"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xs ${
                  addedAnimation
                    ? 'bg-[#355F52] text-white'
                    : 'bg-[#4E8773] hover:bg-[#355F52] text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Đã thêm vào giỏ hàng</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Thêm vào giỏ</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#2F403A] hover:bg-black text-white font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Mua ngay (Thanh toán nhanh)</span>
            </button>
          </div>

          {/* 🌱 GREEN QR – MỞ CÂU CHUYỆN XANH */}
          {product.isGreenProduct && (
            <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-br from-[#EAF3EF] to-[#FAF6EE] border border-[#CDE1D8] shadow-2xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-12 h-12 bg-white rounded-xl border border-[#A9C8BA] shadow-2xs flex flex-col items-center justify-center p-1 text-[#355F52]">
                  <QrCode className="w-6 h-6 text-[#355F52]" />
                  <span className="text-[7px] font-black tracking-tight uppercase">GREEN QR</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#355F52] text-white text-[10px] font-black uppercase tracking-wider">
                    <span>🌱</span> GREEN QR – MỞ CÂU CHUYỆN XANH
                  </span>
                  <p className="text-xs text-[#2F403A] font-medium mt-1 leading-relaxed">
                    <span className="font-bold text-[#355F52] block">“Một chiếc áo – Một câu chuyện – Một hành động xanh.”</span>
                    Chiếc áo này đang giấu một câu chuyện nhỏ về thiên nhiên. Cùng bé khám phá nhé!
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#CDE1D8]/70 flex-wrap">
                <button
                  type="button"
                  onClick={() => setEcoModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#355F52] hover:bg-[#2A4D42] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#F5DFA0]" />
                  <span>KHÁM PHÁ ECO STORY</span>
                </button>
                {product.ecoStoryId && (
                  <Link
                    to={`/eco-story/${product.ecoStoryId}`}
                    className="text-xs font-semibold text-[#4E8773] hover:underline flex items-center gap-0.5"
                  >
                    <span>Xem trang đầy đủ</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Tote Gift Banner in Butter Yellow soft box */}
          <div className="p-3.5 rounded-2xl bg-[#FAF2DF] border border-[#F4E5BD] flex items-center gap-3">
            <Gift className="w-5 h-5 text-[#355F52] shrink-0" />
            <p className="text-xs text-[#2F403A] font-medium leading-snug">
              🎁 <strong>Quà tặng Mầm Kids:</strong> Tặng miễn phí 01 túi tote Mầm Kids cho mọi đơn hàng hôm nay!
            </p>
          </div>

          {/* Stylist Tip Box */}
          {product.stylingTip && (
            <div className="p-4 rounded-2xl bg-[#EFF5F2] border border-[#D2E3DC] text-xs text-[#2F403A]">
              <span className="font-bold text-[#355F52] block mb-1">
                💡 Gợi ý phối đồ từ Stylist Mầm Kids:
              </span>
              <p className="leading-relaxed">{product.stylingTip}</p>
            </div>
          )}
        </div>
      </div>

      {/* Frequently Paired With / Gợi ý phối cùng */}
      {pairedProducts.length > 0 && (
        <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-[#EFE8D8] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE8D8] pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#355F52] font-heading block">
                GỢI Ý PHỐI CÙNG HOÀN HẢO
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#2F403A] font-heading">
                Mặc đẹp chuẩn gu cùng {product.name}
              </h3>
            </div>
            <span className="text-xs text-[#5D726A]">
              Phụ huynh thường mua kèm những món sau:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pairedProducts.map((paired) => (
              <div
                key={paired.id}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] hover:border-[#355F52] transition-colors"
              >
                <Link to={`/san-pham/${paired.id}`} className="shrink-0 w-16 h-20 aspect-4/5 rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#EFE8D8]">
                  <img src={paired.images[0]} alt={paired.name} className="w-full h-full object-cover object-center" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/san-pham/${paired.id}`}
                    className="text-xs font-bold text-[#2F403A] hover:text-[#355F52] block truncate font-heading"
                  >
                    {paired.name}
                  </Link>
                  <span className="text-xs font-black text-[#355F52] block mt-0.5 tabular-nums">
                    {formatVND(paired.price)}
                  </span>
                  <Link
                    to={`/san-pham/${paired.id}`}
                    className="text-[11px] font-semibold text-[#4E8773] hover:underline flex items-center gap-1 mt-1"
                  >
                    Xem chi tiết <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Embedded Outfit Styling Section */}
      <OutfitStylingSection
        currentProductId={product.id}
        title={`Gợi ý phối đồ cho bé cùng ${product.name}`}
        subtitle="Chọn nguyên set hoàn chỉnh để bé diện dạo phố hoặc dự tiệc thật phong cách"
        className="rounded-[32px] overflow-hidden"
      />

      {/* Matching Accessories Section */}
      {matchingAccessories.length > 0 && (
        <div className="pt-8 border-t border-[#EFE8D8]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#355F52] font-heading block">
                ĐIỂM NHẤN THỜI TRANG
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2F403A] font-heading">
                Phụ kiện phù hợp đi kèm
              </h3>
            </div>
            <Link
              to="/san-pham?category=phu-kien"
              className="text-xs font-bold text-[#355F52] hover:underline flex items-center gap-1"
            >
              Xem tất cả phụ kiện <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {matchingAccessories.map((acc) => (
              <ProductCard key={acc.id} product={acc} />
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="pt-8 border-t border-[#EFE8D8]">
        <div className="flex border-b border-[#EFE8D8] gap-6">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'desc'
                ? 'border-[#355F52] text-[#355F52]'
                : 'border-transparent text-[#5D726A] hover:text-[#2F403A]'
            }`}
          >
            Mô tả chi tiết
          </button>
          <button
            onClick={() => setActiveTab('material')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'material'
                ? 'border-[#355F52] text-[#355F52]'
                : 'border-transparent text-[#5D726A] hover:text-[#2F403A]'
            }`}
          >
            {product.isGreenProduct ? '🌱 Chất liệu & câu chuyện xanh' : 'Chất liệu & An toàn cho bé'}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-[#355F52] text-[#355F52]'
                : 'border-transparent text-[#5D726A] hover:text-[#2F403A]'
            }`}
          >
            Đánh giá từ phụ huynh ({product.reviewsCount})
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl">
              <p className="text-sm text-[#3E5149] leading-relaxed">
                {product.description}
              </p>
              {product.fabricDetail && (
                <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-xs text-[#2F403A]">
                  <strong className="block text-[#355F52] font-bold mb-1">
                    Cảm giác chất liệu khi chạm vào:
                  </strong>
                  <p>{product.fabricDetail}</p>
                </div>
              )}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F403A]">
                  Đặc điểm nổi bật:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#5D726A]">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4E8773] mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'material' && (
            <div className="space-y-4 max-w-3xl">
              {product.isGreenProduct && (
                <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#EAF3EF] to-[#FDF9F1] border border-[#CDE1D8] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌱</span>
                    <strong className="text-xs font-bold uppercase tracking-wider text-[#355F52]">
                      Cam kết chất liệu Mầm Xanh
                    </strong>
                  </div>
                  <p className="text-xs text-[#2F403A] leading-relaxed">
                    Mầm Kids ưu tiên các chất liệu thân thiện hơn với môi trường như Organic Cotton, Bamboo hoặc recycled fabrics khi phù hợp với từng sản phẩm.
                  </p>
                  {product.ecoStorySnippet && (
                    <p className="text-xs text-[#5D726A] italic pt-1 border-t border-[#CDE1D8]/60">
                      "{product.ecoStorySnippet}"
                    </p>
                  )}
                </div>
              )}

              <div className="p-4 rounded-2xl bg-white border border-[#EFE8D8]">
                <h4 className="text-sm font-bold text-[#2F403A] mb-1">
                  Thành phần chất liệu:
                </h4>
                <p className="text-xs text-[#5D726A]">{product.material}</p>
              </div>

              {product.fabricDetail && (
                <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#EFE8D8]">
                  <h4 className="text-sm font-bold text-[#2F403A] mb-1">
                    Đặc điểm thoải mái cho bé:
                  </h4>
                  <p className="text-xs text-[#5D726A]">{product.fabricDetail}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5D726A]">
                <div className="p-4 rounded-2xl bg-white border border-[#EFE8D8]">
                  <strong className="block text-[#2F403A] font-bold mb-1">
                    Hướng dẫn giặt ủi:
                  </strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Giặt máy bằng nước lạnh hoặc nước ấm dưới 30°C.</li>
                    <li>Sử dụng nước giặt chuyên dụng cho trẻ em.</li>
                    <li>Không dùng chất tẩy clo mạnh.</li>
                    <li>Phơi trong bóng râm thoáng gió, tránh nắng gắt trực tiếp.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EFE8D8]">
                  <strong className="block text-[#2F403A] font-bold mb-1">
                    Cam kết chuẩn da nhạy cảm:
                  </strong>
                  <p>
                    Tất cả sợi vải tại Mầm Kids được kiểm định không chứa formaldehyde hay phẩm nhuộm azo kim loại nặng độc hại, an toàn tuyệt đối cho bé.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-4 rounded-2xl bg-white border border-[#EFE8D8] flex items-center gap-6">
                <div>
                  <span className="text-4xl font-black text-[#355F52] tabular-nums font-heading">
                    {product.rating}
                  </span>
                  <span className="text-xs text-[#5D726A] block">trên 5.0 sao</span>
                </div>
                <div className="border-l border-[#EFE8D8] pl-6 space-y-1 text-xs text-[#5D726A]">
                  <p>98% phụ huynh cảm thấy hài lòng về độ mềm của vải</p>
                  <p>95% đánh giá cao tính năng in thêu tên bé độc quyền</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  {
                    name: 'Mẹ Thu Trang (TP.HCM)',
                    rating: 5,
                    date: '2 ngày trước',
                    comment: 'Chất vải mát mịn lắm, màu pastel rất xinh và tôn da, bé thích mê mặc đi học suốt!',
                    sizeBought: 'Size 110 (5-6 tuổi)'
                  },
                  {
                    name: 'Bố Hoàng Long (Hà Nội)',
                    rating: 5,
                    date: '1 tuần trước',
                    comment: 'Giao hàng nhanh, túi tote tặng kèm rất dày dặn và xinh. Đồ vừa in theo công cụ tư vấn size của web.',
                    sizeBought: 'Size 120 (7-8 tuổi)'
                  },
                  {
                    name: 'Mẹ Bích Ngọc (Đà Nẵng)',
                    rating: 5,
                    date: '3 ngày trước',
                    comment: 'Set phối sẵn rất tiện, phối phụ kiện vừa vặn xinh xắn mà không tốn công suy nghĩ.',
                    sizeBought: 'Size 100 (3-4 tuổi)'
                  }
                ].map((rev, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-[#EFE8D8]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <strong className="text-[#2F403A]">{rev.name}</strong>
                      <span className="text-[#8B9D95]">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#5D726A]">Đã mua: {rev.sizeBought}</span>
                    </div>
                    <p className="text-xs text-[#3E5149]">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="pt-8 border-t border-[#EFE8D8]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#2F403A] font-heading">
            Sản phẩm cùng phong cách ba mẹ yêu thích
          </h3>
          <Link
            to="/san-pham"
            className="text-xs font-bold text-[#355F52] hover:underline flex items-center gap-1"
          >
            Xem tất cả
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Size Advisor Modal */}
      <SizeAdvisorModal
        isOpen={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
        onSelectSize={(sz) => setSelectedSize(sz)}
      />

      {/* Eco Story Modal */}
      {product.isGreenProduct && ecoStory && (
        <EcoStoryModal
          story={ecoStory}
          isOpen={ecoModalOpen}
          onClose={() => setEcoModalOpen(false)}
        />
      )}
    </div>
  );
};
