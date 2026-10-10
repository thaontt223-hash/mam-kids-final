import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Ruler,
  ShoppingBag,
  ChevronRight,
  Check,
  Star,
  Leaf,
  BookOpen,
  Recycle,
  UserPlus,
  Sun,
  Heart,
  QrCode
} from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { SizeAdvisorModal } from '../components/common/SizeAdvisorModal';
import { EcoStoryModal } from '../components/common/EcoStoryModal';
import { ECO_STORIES } from '../data/ecoStories';
import { EcoStory } from '../types';
import { PRODUCTS, OUTFIT_SETS, formatVND, calculateSizeRecommendation } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext';

export const HomePage: React.FC = () => {
  const { addOutfitSetToCart } = useCart();
  const { language, t, getOutfitName, formatPrice } = useLanguage();
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [ecoModalStory, setEcoModalStory] = useState<EcoStory | null>(null);

  // Tabs for Featured Products: Tất cả, Mới, Bán chạy, Mầm Xanh
  const [featuredTab, setFeaturedTab] = useState<'all' | 'new' | 'bestseller' | 'green'>('all');

  // Quick In-page Size Preview state
  const [assistAge, setAssistAge] = useState<number>(5);
  const [assistHeight, setAssistHeight] = useState<number>(110);
  const [assistWeight, setAssistWeight] = useState<number>(18);
  const [assistResult, setAssistResult] = useState<{ recommendedSize: string; advice: string } | null>(null);

  // Mix & Match (1-2 outfit previews)
  const [activeLookIndex, setActiveLookIndex] = useState<number>(0);
  const [lookAdded, setLookAdded] = useState(false);

  const handleInPageConsult = (e: React.FormEvent) => {
    e.preventDefault();
    const rec = calculateSizeRecommendation(assistAge, assistHeight, assistWeight);
    setAssistResult(rec);
  };

  const previewLooks = OUTFIT_SETS.slice(0, 2);
  const currentLook = previewLooks[activeLookIndex] || previewLooks[0];

  const handleAddCurrentLook = () => {
    if (currentLook) {
      addOutfitSetToCart(currentLook);
      setLookAdded(true);
      setTimeout(() => setLookAdded(false), 2000);
    }
  };

  // 5 Category Cards
  const categories = [
    {
      name: t('categories.boys'),
      desc: t('categories.boysDesc'),
      link: '/be-trai',
      image: '/images/outfit_be_trai_polo_1791211333653.jpg',
      accentBg: 'bg-[#EAF3EF]'
    },
    {
      name: t('categories.girls'),
      desc: t('categories.girlsDesc'),
      link: '/be-gai',
      image: '/images/outfit_be_gai_vay_nang_som_1791211350114.jpg',
      accentBg: 'bg-[#FDF0F2]'
    },
    {
      name: t('categories.sportswear'),
      desc: t('categories.sportswearDesc'),
      link: '/san-pham?category=the-thao',
      image: '/images/san_choi_vui_sage_cream_1791289011381.jpg',
      accentBg: 'bg-[#FAF1ED]'
    },
    {
      name: t('categories.dailywear'),
      desc: t('categories.dailywearDesc'),
      link: '/san-pham?category=ao',
      image: '/images/muslin_loungewear_set_1791213737375.jpg',
      accentBg: 'bg-[#FCF8ED]'
    },
    {
      name: t('categories.accessories'),
      desc: t('categories.accessoriesDesc'),
      link: '/san-pham?category=phu-kien',
      image: '/images/phu_kien_mam_kids_1791211374046.jpg',
      accentBg: 'bg-[#F4F8F6]'
    }
  ];

  // Featured products filtered to 6-8 items
  const filteredProducts = PRODUCTS.filter((prod) => {
    if (featuredTab === 'new') return prod.isNew;
    if (featuredTab === 'bestseller') return prod.isBestSeller;
    if (featuredTab === 'green') return prod.isGreenProduct;
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-0 w-full max-w-full min-w-0 overflow-x-hidden">
      {/* =========================================================================
          1. HERO SECTION (ẤM ÁP, SINH ĐỘNG, NỔI BẬT – ĐIỂM NHẤN CẢM XÚC MẸ & BÉ)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F0] via-[#FFF5EC] to-[#F5EDE1] pt-10 sm:pt-16 pb-20 sm:pb-28">
        {/* =========================================================================
            BACKGROUND DEPTH & ORGANIC PASTEL BLOBS
            ========================================================================= */}
        {/* Warm ambient corner blobs */}
        <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-[#F5D7CF]/45 blur-3xl pointer-events-none -z-0" />
        <div className="absolute top-1/4 -left-16 w-80 h-80 rounded-full bg-[#FDF3CF]/50 blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-16 right-1/3 w-88 h-88 rounded-full bg-[#E6F1EB]/60 blur-3xl pointer-events-none -z-0" />

        {/* Soft pastel clouds (hidden/reduced on mobile) */}
        <div className="absolute top-6 left-1/3 opacity-60 pointer-events-none select-none hidden md:block">
          <svg width="120" height="42" viewBox="0 0 120 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 36C12 36 6 30 6 22C6 14.5 11.5 9 18.5 8.5C21.5 3.5 27.5 0 34.5 0C43.5 0 51 5.5 53 13.5C55.5 12 58.5 11 62 11C70.5 11 77.5 17.5 78 26C81 24.5 84.5 23.5 88.5 23.5C98 23.5 106 31 106 36H20Z"
              fill="#FFFFFF"
              fillOpacity="0.75"
            />
          </svg>
        </div>
        <div className="absolute top-12 right-12 opacity-50 pointer-events-none select-none hidden lg:block">
          <svg width="90" height="32" viewBox="0 0 90 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 28C9 28 4.5 23.5 4.5 17.5C4.5 11.8 8.6 7.5 13.9 7.1C16.1 3.2 20.6 0.5 25.9 0.5C32.6 0.5 38.3 4.6 39.8 10.6C41.6 9.5 43.9 8.8 46.5 8.8C52.9 8.8 58.1 13.7 58.5 20.1C60.8 19 63.4 18.2 66.4 18.2C73.5 18.2 79.5 23.8 79.5 28H15Z"
              fill="#FFFFFF"
              fillOpacity="0.7"
            />
          </svg>
        </div>

        {/* Doodle Sun with warm gentle rays (Top-Left) */}
        <div className="absolute top-5 left-5 sm:left-10 pointer-events-none select-none hidden sm:block">
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="34" cy="34" r="15" fill="#F4C95D" fillOpacity="0.45" stroke="#E5A118" strokeWidth="1.8" />
            <circle cx="34" cy="34" r="10" fill="#FFF9F0" fillOpacity="0.6" />
            {/* Gentle dashed sunbeams */}
            <path d="M34 6V12M34 56V62M6 34H12M56 34H62M14 14L18.5 18.5M49.5 49.5L54 54M14 54L18.5 49.5M49.5 18.5L54 14" stroke="#E5A118" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
          </svg>
        </div>

        {/* Non-cheating Nature Sprout & Branch (Left Corner Accent) */}
        <div className="absolute top-28 left-3 sm:left-8 opacity-40 pointer-events-none select-none hidden lg:block">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 40C16 28 26 20 40 18C36 30 28 38 12 40Z" stroke="#4E8773" strokeWidth="1.8" fill="#E6F1EB" strokeLinejoin="round" />
            <path d="M18 34C23 29 30 25 38 22" stroke="#4E8773" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="38" cy="18" r="3" fill="#F4C95D" />
          </svg>
        </div>

        {/* Floating Little Butterfly Doodle (Near Right) */}
        <div className="absolute top-20 right-1/4 pointer-events-none select-none hidden md:block">
          <svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-12 opacity-70">
            {/* Butterfly left wing */}
            <path d="M18 16C13 9 7 9 7 14C7 19 13 20 18 17Z" fill="#F39A73" fillOpacity="0.65" stroke="#D46241" strokeWidth="1.2" />
            {/* Butterfly right wing */}
            <path d="M18 16C23 9 29 9 29 14C29 19 23 20 18 17Z" fill="#F4C95D" fillOpacity="0.7" stroke="#D99414" strokeWidth="1.2" />
            {/* Butterfly body */}
            <line x1="18" y1="12" x2="18" y2="20" stroke="#285A48" strokeWidth="1.5" strokeLinecap="round" />
            {/* Antennae */}
            <path d="M17 12C15 9 14 9 13 10" stroke="#285A48" strokeWidth="1" strokeLinecap="round" />
            <path d="M19 12C21 9 22 9 23 10" stroke="#285A48" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Floating Delicate Chamomile Blossom Doodle (Left mid) */}
        <div className="absolute top-1/2 left-4 pointer-events-none select-none hidden xl:block opacity-65">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="9" r="3.5" fill="#FFFFFF" stroke="#E5DAC5" strokeWidth="0.8" />
            <circle cx="14" cy="19" r="3.5" fill="#FFFFFF" stroke="#E5DAC5" strokeWidth="0.8" />
            <circle cx="9" cy="14" r="3.5" fill="#FFFFFF" stroke="#E5DAC5" strokeWidth="0.8" />
            <circle cx="19" cy="14" r="3.5" fill="#FFFFFF" stroke="#E5DAC5" strokeWidth="0.8" />
            <circle cx="14" cy="14" r="3.5" fill="#F4C95D" />
          </svg>
        </div>

        {/* Floating Tiny Leaf (Near left center) */}
        <div className="absolute bottom-28 left-16 pointer-events-none select-none hidden md:block opacity-45">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 20C7 12 14 8 21 6C18 14 13 19 4 20Z" fill="#E6F1EB" stroke="#4E8773" strokeWidth="1.2" />
          </svg>
        </div>

        {/* =========================================================================
            MAIN HERO CONTENT (2-COLUMN GRID)
            ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Headline, Emotional Slogan, Warm Narrative, CTAs & Value Badges */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Brand Tagline Badge: Light Sage #E6F1EB & Deep Forest Green #285A48 */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6F1EB] border border-[#CDE0D7] text-[#285A48] text-xs sm:text-[13px] font-extrabold uppercase tracking-wider shadow-2xs">
                <span className="text-sm">🌱</span>
                <span>
                  {language === 'en'
                    ? 'GENTLE FASHION FOR CHILDREN 3–12'
                    : 'THỜI TRANG DỊU LÀNH CHO BÉ 3–12 TUỔI'}
                </span>
                <Heart className="w-3.5 h-3.5 fill-[#F39A73] text-[#F39A73]" />
              </div>

              {/* Main Headline: Deep Forest Green #285A48 */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#285A48] tracking-tight leading-none font-heading drop-shadow-xs">
                MẦM KIDS
              </h1>

              {/* Emotional Slogan with highlighted focus: Deep Green & Peach #F39A73 */}
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#285A48] font-heading leading-snug sm:leading-tight">
                {language === 'en' ? (
                  <>
                    More Than Style – Growing{' '}
                    <span className="text-[#F39A73] underline decoration-[#F4C95D]/75 decoration-wavy">
                      Green Habits
                    </span>{' '}
                    Together.
                  </>
                ) : (
                  <>
                    Không chỉ mặc đẹp – cùng bé{' '}
                    <span className="text-[#F39A73] underline decoration-[#F4C95D]/75 decoration-wavy">
                      gieo thói quen xanh
                    </span>
                    .
                  </>
                )}
              </div>

              {/* Inspiring Subtitle: Warm dark text #2F423B */}
              <p className="text-base sm:text-lg text-[#2F423B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {t('hero.description')}
              </p>

              {/* Action Buttons: Primary Peach #F39A73 and Warm Secondary Deep Green #285A48 */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                {/* CTA chính: MUA SẮM NGAY (Peach/Terracotta #F39A73, chữ trắng, shadow nhẹ) */}
                <Link
                  to="/san-pham"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#F39A73] hover:bg-[#E58459] text-white font-black text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <span>{t('hero.shopNow')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                {/* CTA phụ: KHÁM PHÁ MẦM XANH (Nền cream/trắng, viền Deep Green, chữ Deep Green) */}
                <Link
                  to="/mam-xanh"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#FFF9F0] hover:bg-white text-[#285A48] border-2 border-[#285A48] font-black text-sm sm:text-base transition-all shadow-2xs hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Leaf className="w-5 h-5 text-[#285A48]" />
                  <span>{t('hero.exploreMamXanh')}</span>
                </Link>
              </div>

              {/* Trust & Care Highlights (Badges phía dưới: nền trắng/cream, border nhẹ, icon nhỏ) */}
              <div className="pt-4 border-t border-[#E8DFC9]/80 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-bold text-[#285A48]">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 border border-[#DCE8E2] shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-[#4E8773]" />
                  <span>{language === 'en' ? '100% Organic & Gentle' : '100% Sợi hữu cơ dịu lành'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 border border-[#DCE8E2] shadow-2xs">
                  <Ruler className="w-3.5 h-3.5 text-[#4E8773]" />
                  <span>{language === 'en' ? 'Smart Size 98% Accurate' : 'Smart Size chuẩn 98%'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 border border-[#DCE8E2] shadow-2xs">
                  <Heart className="w-3.5 h-3.5 fill-[#F39A73] text-[#F39A73]" />
                  <span>{language === 'en' ? '15-Day Doorstep Exchange' : 'Đổi tận nhà trong 15 ngày'}</span>
                </span>
              </div>
            </div>

            {/* Right Column: Mother & Child Emotional Centerpiece */}
            <div className="lg:col-span-5 relative">
              {/* Warm decorative organic backdrop shapes */}
              <div className="w-full h-full absolute -top-4 -right-4 bg-gradient-to-br from-[#FCE7D8] via-[#FFF3D4] to-[#E6F1EB] rounded-[44px] rotate-2 -z-0 opacity-85 shadow-sm" />
              <div className="absolute -bottom-5 -left-5 w-44 h-44 bg-[#E6F1EB] rounded-full blur-xl -z-0" />

              {/* Tiny decorative doodle flower outside photo top-right */}
              <div className="absolute -top-6 right-8 pointer-events-none select-none z-20 hidden sm:block">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="7" r="3" fill="#FFFFFF" stroke="#E5DAC5" strokeWidth="0.8" />
                  <circle cx="12" cy="17" r="3" fill="#FFFFFF" stroke="#E5DAC5" strokeWidth="0.8" />
                  <circle cx="7" cy="12" r="3" fill="#FFFFFF" stroke="#E5DAC5" strokeWidth="0.8" />
                  <circle cx="17" cy="12" r="3" fill="#FFFFFF" stroke="#E5DAC5" strokeWidth="0.8" />
                  <circle cx="12" cy="12" r="2.8" fill="#F4C95D" />
                </svg>
              </div>

              {/* Tiny decorative leaf doodle outside photo bottom-left */}
              <div className="absolute -bottom-6 left-6 pointer-events-none select-none z-20 hidden sm:block">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 21C8 13 15 9 22 7C19 15 14 20 5 21Z" fill="#E6F1EB" stroke="#4E8773" strokeWidth="1.3" />
                  <circle cx="21" cy="8" r="2" fill="#F4C95D" />
                </svg>
              </div>

              {/* Main Photo Frame: White frame with soft shadow */}
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-[36px] sm:rounded-[42px] overflow-hidden shadow-2xl border-6 sm:border-8 border-white bg-white">
                <img
                  src="/images/hero_mother_child_1791214187156.jpg"
                  alt={
                    language === 'en'
                      ? 'Mother embracing child with love – Mầm Kids gentle fashion'
                      : 'Mẹ Việt Nam ôm bé yêu thương và che chở – Thời trang trẻ em Mầm Kids'
                  }
                  loading="eager"
                  className="w-full aspect-4/3 sm:aspect-4/3 lg:aspect-3/4 object-cover object-center"
                />

                {/* Subtle soft gradient overlay at bottom of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Emotional Badge 1: Top-Left */}
              <div className="absolute -top-3 sm:-top-4 -left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-lg border border-[#EFE8D8] flex items-center gap-2.5">
                <span className="text-base sm:text-lg select-none">❤️</span>
                <div>
                  <span className="block text-[11px] sm:text-xs font-black text-[#285A48]">
                    {language === 'en' ? 'Growing with Love' : 'Lớn lên trong yêu thương'}
                  </span>
                  <span className="block text-[10px] text-[#5D726A] font-medium">
                    {language === 'en' ? 'Safe & soft every day' : 'Dịu êm từng nếp áo'}
                  </span>
                </div>
              </div>

              {/* Floating Emotional Badge 2: Bottom-Right */}
              <div className="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-lg border border-[#EFE8D8] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E6F1EB] text-[#285A48] flex items-center justify-center font-bold text-sm shadow-2xs">
                  🌱
                </div>
                <div>
                  <span className="block text-[11px] sm:text-xs font-black text-[#285A48]">
                    {language === 'en' ? '25,000+ Happy Families' : '25.000+ Mẹ tin chọn'}
                  </span>
                  <div className="flex items-center gap-0.5 text-[#ECA032]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-[#ECA032]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            GENTLE ROLLING HILLS & NATURE MEADOW BOTTOM CURVE
            ========================================================================= */}
        <div className="absolute bottom-0 inset-x-0 overflow-hidden pointer-events-none leading-none z-0">
          <svg
            className="w-full h-10 sm:h-14 lg:h-16 text-[#E6F1EB]"
            viewBox="0 0 1440 70"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Soft sage rolling hill background layer */}
            <path
              d="M0,28 C280,55 480,10 760,35 C1040,60 1260,18 1440,30 L1440,70 L0,70 Z"
              fill="#E6F1EB"
              fillOpacity="0.8"
            />
            {/* Slightly darker soft pastel curve */}
            <path
              d="M0,45 C320,22 620,58 980,36 C1220,20 1360,45 1440,40 L1440,70 L0,70 Z"
              fill="#DCECE3"
              fillOpacity="0.6"
            />
          </svg>
          {/* Subtle sprout doodles peeking from the hill edge (hidden on mobile) */}
          <div className="absolute bottom-1 left-24 opacity-60 hidden md:block">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
              <path d="M11 18V9M11 9C9 6 4 6 3 9C2 12 7 13 11 9ZM11 9C13 6 18 6 19 9C20 12 15 13 11 9Z" stroke="#285A48" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="#CBE0D4" />
            </svg>
          </div>
          <div className="absolute bottom-1 right-32 opacity-50 hidden lg:block">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 16V8M9 8C7 5 3 5 2 8C1 10 5 11 9 8ZM9 8C11 5 15 5 16 8C17 10 13 11 9 8Z" stroke="#285A48" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="#CBE0D4" />
            </svg>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MẦM XANH – ĐIỂM KHÁC BIỆT THƯƠNG HIỆU (USP CỐT LÕI NỔI BẬT NHẤT SAU HERO)
          ========================================================================= */}
      <section
        id="mam-xanh"
        className="relative overflow-hidden bg-gradient-to-b from-[#E6F1EB] via-[#FAF6EE] to-[#E6F1EB] py-16 sm:py-24 border-b border-[#CDE0D7]"
      >
        {/* ================= BACKGROUND BOTANICAL & NATURE DOODLES ================= */}
        {/* Doodle 1: Lá non vươn lên (Top Left) */}
        <div className="absolute top-4 left-4 sm:left-10 opacity-40 pointer-events-none select-none text-[#285A48] hidden sm:block animate-pulse">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 58C20 40 40 30 62 26C56 46 44 58 16 58Z"
              stroke="#285A48"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#CDE0D7"
            />
            <path d="M26 50C34 40 46 34 60 28" stroke="#285A48" strokeWidth="2" strokeLinecap="round" />
            <circle cx="20" cy="22" r="4" fill="#F4C95D" />
            <circle cx="30" cy="14" r="2.5" fill="#4E8773" />
          </svg>
        </div>

        {/* Doodle 2: Cây con chồi biếc & ánh mặt trời ấm (Top Right) */}
        <div className="absolute top-6 right-4 sm:right-12 opacity-40 pointer-events-none select-none text-[#F4C95D] hidden sm:block">
          <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sun doodle */}
            <circle cx="56" cy="28" r="14" fill="#F4C95D" fillOpacity="0.45" stroke="#E5A118" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M56 8V12M56 44V48M36 28H40M72 28H76M42 14L45 17M67 39L70 42M42 42L45 39M67 17L70 14" stroke="#E5A118" strokeWidth="2" strokeLinecap="round" />
            {/* Tiny sprout */}
            <path d="M24 64V46M24 46C20 40 12 40 12 46C12 52 20 52 24 46ZM24 46C28 40 36 40 36 46C36 52 28 52 24 46Z" stroke="#285A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#E6F1EB" />
          </svg>
        </div>

        {/* Doodle 3: Nhánh lá uốn lượn tự nhiên (Bottom Left) */}
        <div className="absolute bottom-6 left-6 opacity-30 pointer-events-none select-none hidden lg:block">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 78Q45 65 65 25" stroke="#4E8773" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="32" cy="58" rx="8" ry="4" transform="rotate(-25 32 58)" fill="#4E8773" fillOpacity="0.3" stroke="#285A48" strokeWidth="1.5" />
            <ellipse cx="48" cy="45" rx="8" ry="4" transform="rotate(25 48 45)" fill="#4E8773" fillOpacity="0.3" stroke="#285A48" strokeWidth="1.5" />
            <ellipse cx="62" cy="30" rx="7" ry="3.5" transform="rotate(-30 62 30)" fill="#4E8773" fillOpacity="0.3" stroke="#285A48" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Doodle 4: Giọt sương & Mầm non (Bottom Right) */}
        <div className="absolute bottom-6 right-6 opacity-35 pointer-events-none select-none hidden lg:block">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 70C52 70 60 60 60 48C60 36 40 18 40 18C40 18 20 36 20 48C20 60 28 70 40 70Z" stroke="#4E8773" strokeWidth="2" fill="#E6F1EB" fillOpacity="0.5" />
            <path d="M40 60V42M40 42C37 38 32 38 32 42C32 46 37 46 40 42ZM40 42C43 38 48 38 48 42C48 46 43 46 40 42Z" stroke="#285A48" strokeWidth="1.8" fill="#4E8773" />
          </svg>
        </div>

        {/* Ambient organic glow blurs */}
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-[#CDE0D7]/50 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-12 w-80 h-80 rounded-full bg-[#F4C95D]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 rounded-full bg-[#E6F1EB]/70 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ================= SECTION HEADER: USP CỐT LÕI ================= */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
            {/* Badge: ĐIỂM KHÁC BIỆT THƯƠNG HIỆU */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#285A48] text-white text-xs sm:text-[13px] font-black uppercase tracking-wider shadow-md">
              <Leaf className="w-4 h-4 text-[#A8D5BA]" />
              <span>{language === 'en' ? 'BRAND DIFFERENTIATION' : 'ĐIỂM KHÁC BIỆT THƯƠNG HIỆU'}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
            </div>

            {/* Title: MẦM XANH - Lớn, rõ, trang trọng */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#4E8773]">
                <span className="inline-block w-8 sm:w-12 h-0.5 bg-[#4E8773]/40 rounded-full" />
                <span className="flex items-center gap-1.5">
                  <span>🌱</span>
                  <span>{language === 'en' ? 'OUR CORE USP' : 'USP CỐT LÕI CỦA MẦM KIDS'}</span>
                </span>
                <span className="inline-block w-8 sm:w-12 h-0.5 bg-[#4E8773]/40 rounded-full" />
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#285A48] tracking-tight font-heading leading-tight pt-1">
                {t('mamXanh.title')}
              </h2>
            </div>

            {/* Tagline: Mặc xanh – Học xanh – Lớn lên xanh */}
            <div className="inline-block px-5 py-2 rounded-2xl bg-white/90 border border-[#CDE0D7] shadow-xs">
              <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#285A48] font-heading">
                “{language === 'en' ? 'Dress Green – Learn Green – Grow Up Green.' : 'Mặc xanh – Học xanh – Lớn lên xanh.'}”
              </p>
            </div>

            {/* Mô tả giải thích USP: rõ ràng, chuyên nghiệp, không trẻ con */}
            <p className="text-sm sm:text-base lg:text-lg text-[#253A32] leading-relaxed max-w-2xl mx-auto font-medium pt-1">
              {language === 'en'
                ? 'Mầm Kids is not merely a children’s clothing brand. We turn every outfit into a gentle green story, helping children nurture a love for nature and build sustainable habits from early childhood.'
                : 'Mầm Kids không chỉ bán thời trang trẻ em, mà đồng hành cùng gia đình biến mỗi bộ trang phục thành trải nghiệm ý nghĩa: giúp bé yêu thiên nhiên, hiểu về bảo vệ môi trường và lớn lên một cách lành mạnh.'}
            </p>
          </div>

          {/* ================= 3 TRỤ CỘT: MẶC XANH / HỌC XANH / TRAO LẠI ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
            {/* CARD 1: MẶC XANH */}
            <div className="group bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#CDE0D7] hover:border-[#4E8773] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              {/* Corner nature doodle overlay */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#E6F1EB] rounded-bl-[48px] -z-0 opacity-80 group-hover:scale-110 transition-transform flex items-start justify-end p-3 pointer-events-none">
                <Leaf className="w-6 h-6 text-[#4E8773]/40" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#E6F1EB] text-[#285A48] border border-[#CDE0D7] flex items-center justify-center font-black text-2xl shadow-xs group-hover:rotate-6 transition-transform">
                    🌱
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#E6F1EB] text-[#285A48] text-[11px] font-black uppercase tracking-wider border border-[#CDE0D7]">
                    {language === 'en' ? 'Pillar 01' : 'Trụ cột 01'}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#285A48] font-heading group-hover:text-[#4E8773] transition-colors">
                    {language === 'en' ? 'DRESS GREEN' : 'MẶC XANH'}
                  </h3>
                  <p className="text-xs font-bold text-[#4E8773] mt-0.5 uppercase tracking-wider">
                    {language === 'en' ? 'Natural & Skin-Safe Fabrics' : 'Chất liệu dịu lành cho làn da bé'}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4E675D] leading-relaxed">
                  {language === 'en'
                    ? 'Prioritizing natural, skin-safe fibers such as Organic Cotton, Bamboo, and Linen. Meets Oeko-Tex Standard 100 Class 1, ensuring zero harsh chemicals and maximum comfort for active days.'
                    : 'Ưu tiên các chất liệu tự nhiên lành tính như Organic Cotton, Bamboo và Linen đạt chuẩn an toàn cho trẻ sơ sinh & trẻ nhỏ. Mềm mịn, thông thoáng mồ hôi và bảo vệ tối đa làn da nhạy cảm.'}
                </p>

                {/* Key Highlights */}
                <div className="pt-2 space-y-1.5 text-xs text-[#253A32]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E8773]" />
                    <span className="font-semibold">{language === 'en' ? '100% Organic & natural fibers' : '100% Sợi tự nhiên & Organic Cotton'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E8773]" />
                    <span className="font-semibold">{language === 'en' ? 'Hidden inner seams prevent friction' : 'Đường may giấu chỉ êm ái, không ngứa'}</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-[#EFE8D8] flex items-center justify-between text-xs font-bold text-[#285A48]">
                <span className="flex items-center gap-1.5 text-[#4E8773]">
                  <Check className="w-4 h-4 text-[#4E8773]" />
                  <span>{language === 'en' ? 'Safe for sensitive skin' : 'Chứng nhận an toàn da bé'}</span>
                </span>
                <Link to="/san-pham" className="hover:underline flex items-center gap-1 text-[#285A48] hover:text-[#4E8773]">
                  <span>{language === 'en' ? 'Explore items' : 'Xem sản phẩm'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* CARD 2: HỌC XANH */}
            <div className="group bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#F4C95D]/70 hover:border-[#F4C95D] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              {/* Corner nature doodle overlay */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#FFF9E6] rounded-bl-[48px] -z-0 opacity-80 group-hover:scale-110 transition-transform flex items-start justify-end p-3 pointer-events-none">
                <Sun className="w-6 h-6 text-[#F4C95D]/70" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF9E6] text-[#B87C0B] border border-[#F4C95D]/60 flex items-center justify-center font-black text-2xl shadow-xs group-hover:rotate-6 transition-transform">
                    📖
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#FFF9E6] text-[#B87C0B] text-[11px] font-black uppercase tracking-wider border border-[#F4C95D]/70">
                    {language === 'en' ? 'Pillar 02' : 'Trụ cột 02'}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#285A48] font-heading group-hover:text-[#B87C0B] transition-colors">
                    {language === 'en' ? 'LEARN GREEN' : 'HỌC XANH'}
                  </h3>
                  <p className="text-xs font-bold text-[#B87C0B] mt-0.5 uppercase tracking-wider">
                    {language === 'en' ? 'Green QR & Nature Stories' : 'Mã Green QR & Thử thách xanh'}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4E675D] leading-relaxed">
                  {language === 'en'
                    ? 'Each clothing tag comes with an interactive Green QR code unlocking child-friendly Eco Stories, interactive quiz cards, and nature missions that reward children with fun Mầm Points.'
                    : 'Tem áo tích hợp mã Green QR thông minh. Ba mẹ và bé quét mã để mở những mẩu truyện tranh Eco Story gần gũi, học phân loại rác, tưới cây và tích lũy Điểm Mầm xanh qua từng thử thách.'}
                </p>

                {/* Key Highlights */}
                <div className="pt-2 space-y-1.5 text-xs text-[#253A32]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4C95D]" />
                    <span className="font-semibold">{language === 'en' ? 'Interactive Eco Stories library' : 'Kho truyện Eco Story độc quyền'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4C95D]" />
                    <span className="font-semibold">{language === 'en' ? 'Earn points & plant virtual trees' : 'Nhiệm vụ xanh tích Điểm Mầm'}</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-[#F4C95D]/40 flex items-center justify-between text-xs font-bold text-[#B87C0B]">
                <span className="flex items-center gap-1.5 text-[#B87C0B]">
                  <Sparkles className="w-4 h-4 text-[#F4C95D]" />
                  <span>{language === 'en' ? 'Scan tag to read story' : 'Quét tem áo đọc truyện'}</span>
                </span>
                <Link to="/eco-story" className="hover:underline flex items-center gap-1 text-[#285A48] hover:text-[#B87C0B]">
                  <span>{language === 'en' ? 'Read stories' : 'Đọc Eco Story'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* CARD 3: TRAO LẠI */}
            <div className="group bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#F39A73]/70 hover:border-[#F39A73] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              {/* Corner nature doodle overlay */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#FEEAE2] rounded-bl-[48px] -z-0 opacity-80 group-hover:scale-110 transition-transform flex items-start justify-end p-3 pointer-events-none">
                <Recycle className="w-6 h-6 text-[#F39A73]/70" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#FEEAE2] text-[#C96852] border border-[#F39A73]/60 flex items-center justify-center font-black text-2xl shadow-xs group-hover:rotate-6 transition-transform">
                    ♻️
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#FEEAE2] text-[#C96852] text-[11px] font-black uppercase tracking-wider border border-[#F39A73]/70">
                    {language === 'en' ? 'Pillar 03' : 'Trụ cột 03'}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#285A48] font-heading group-hover:text-[#C96852] transition-colors">
                    {language === 'en' ? 'GIVE BACK' : 'TRAO LẠI'}
                  </h3>
                  <p className="text-xs font-bold text-[#C96852] mt-0.5 uppercase tracking-wider">
                    {language === 'en' ? 'Mầm Again Circular Loop' : 'Mầm Again · Thu cũ đổi mới'}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4E675D] leading-relaxed">
                  {language === 'en'
                    ? 'Children grow fast; outgrown clothes should not be discarded. Through Mầm Again, parents can return gentle garments for re-cycling or donation, receiving 15% discount vouchers.'
                    : 'Bé lớn nhanh khiến quần áo nhanh chật. Chương trình Mầm Again tiếp nhận đồ cũ để trao tặng cho trẻ em vùng cao hoặc tái chế sợi vải, đồng thời gửi tặng gia đình voucher 15% cho đơn tiếp theo.'}
                </p>

                {/* Key Highlights */}
                <div className="pt-2 space-y-1.5 text-xs text-[#253A32]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C96852]" />
                    <span className="font-semibold">{language === 'en' ? 'Circular lifecycle for kid clothes' : 'Kéo dài vòng đời trang phục'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C96852]" />
                    <span className="font-semibold">{language === 'en' ? '15% voucher + green gift' : 'Tặng voucher 15% & Điểm Mầm'}</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-[#F39A73]/40 flex items-center justify-between text-xs font-bold text-[#C96852]">
                <span className="flex items-center gap-1.5 text-[#C96852]">
                  <Recycle className="w-4 h-4 text-[#C96852]" />
                  <span>{language === 'en' ? '15% Voucher reward' : 'Nhận voucher 15%'}</span>
                </span>
                <Link to="/mam-again" className="hover:underline flex items-center gap-1 text-[#285A48] hover:text-[#C96852]">
                  <span>{language === 'en' ? 'Join loop' : 'Tham gia'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ================= CALLOUT BOX & PRIMARY CTA “KHÁM PHÁ MẦM XANH” ================= */}
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#CDE0D7] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#E6F1EB] rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-1.5 text-center sm:text-left relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#4E8773]">
                <Sun className="w-4 h-4 text-[#F4C95D]" />
                <span>{language === 'en' ? 'COMMITMENT FOR FUTURE GENERATIONS' : 'CAM KẾT CHO THẾ HỆ MAI SAU'}</span>
              </span>
              <h4 className="text-lg sm:text-xl font-black text-[#285A48] font-heading">
                {language === 'en'
                  ? 'Dressing well today – Preserving our green planet for tomorrow'
                  : 'Mặc đẹp cho con hôm nay – Giữ màu xanh cho ngày mai'}
              </h4>
              <p className="text-xs sm:text-sm text-[#5D726A] leading-relaxed max-w-xl">
                {language === 'en'
                  ? 'Join 25,000+ modern parents raising conscious kids with love and eco-values.'
                  : 'Đồng hành cùng hơn 25.000+ gia đình hiện đại nuôi dưỡng tình yêu thiên nhiên qua từng nếp áo.'}
              </p>
            </div>

            {/* CTA Buttons: “KHÁM PHÁ MẦM XANH” nổi bật nhất */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto relative z-10">
              <Link
                to="/mam-xanh"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#285A48] hover:bg-[#1E3F33] text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Leaf className="w-4 h-4 text-[#A8D5BA]" />
                <span>{language === 'en' ? 'EXPLORE MẦM XANH' : 'KHÁM PHÁ MẦM XANH'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/eco-story"
                className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-[#E6F1EB] hover:bg-[#D4E7DC] text-[#285A48] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#CDE0D7]"
              >
                <BookOpen className="w-4 h-4 text-[#4E8773]" />
                <span>{language === 'en' ? 'ECO STORIES' : 'ĐỌC TRUYỆN ECO STORY'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DANH MỤC THỜI TRANG (CHUYỂN XUỐNG SAU MẦM XANH)
          ========================================================================= */}
      <section className="bg-white py-12 sm:py-16 border-b border-[#EFE8D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#4E8773] block mb-1 font-heading">
                {language === 'en' ? 'FASHION CATEGORIES' : 'DANH MỤC THỜI TRANG'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
                {t('categories.title')}
              </h2>
            </div>
            <Link
              to="/san-pham"
              className="text-xs sm:text-sm font-bold text-[#4E8773] hover:text-[#285A48] flex items-center gap-1 hover:underline"
            >
              {language === 'en' ? 'View all products' : 'Xem tất cả sản phẩm'}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="group relative bg-white rounded-[22px] overflow-hidden border border-[#EFE8D8] hover:border-[#4E8773]/50 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div className={`relative aspect-4/5 w-full overflow-hidden ${cat.accentBg}`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#253A32] group-hover:text-[#4E8773] transition-colors font-heading">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#5D726A] mt-0.5 line-clamp-1 leading-snug">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#F0EBE0] flex items-center justify-between text-xs font-bold text-[#4E8773]">
                    <span>{language === 'en' ? 'Explore' : 'Khám phá'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SẢN PHẨM NỔI BẬT (CHỈ 6–8 SẢN PHẨM, CÓ TAB MỚI, BÁN CHẠY, MẦM XANH)
          ========================================================================= */}
      <section className="bg-[#FFF9F0] py-12 sm:py-16 border-b border-[#EFE8D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#4E8773] block mb-1 font-heading">
                {language === 'en' ? 'CURATED PICKS' : 'TUYỂN CHỌN HÀNG ĐẦU'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
                {language === 'en' ? 'Featured Products' : 'Sản phẩm nổi bật'}
              </h2>
              <p className="text-xs sm:text-sm text-[#5D726A] mt-1">
                {language === 'en' ? 'Safe, breathable, and skin-friendly designs for kids 3–12' : 'Những thiết kế an toàn, thoáng mát và lành tính cho bé 3–12 tuổi'}
              </p>
            </div>

            {/* Quick Filter Tabs: Mới, Bán chạy, Mầm Xanh */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'all', label: language === 'en' ? 'All' : 'Tất cả' },
                { id: 'new', label: language === 'en' ? 'New' : 'Mới' },
                { id: 'bestseller', label: language === 'en' ? 'Bestsellers' : 'Bán chạy' },
                { id: 'green', label: '🌱 Mầm Xanh' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFeaturedTab(tab.id as any)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    featuredTab === tab.id
                      ? 'bg-[#4E8773] text-white shadow-2xs'
                      : 'bg-[#F6F0E7] text-[#253A32] border border-[#E5DDD0] hover:border-[#4E8773]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Products: 6-8 items only */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/san-pham"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-[#F6F0E7] text-[#285A48] font-bold text-xs sm:text-sm border-2 border-[#4E8773] transition-all shadow-2xs"
            >
              <span>{language === 'en' ? 'View all Mầm Kids products' : 'Xem tất cả sản phẩm Mầm Kids'}</span>
              <ArrowRight className="w-4 h-4 text-[#4E8773]" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SMART SIZE (DẠNG PREVIEW) + NHẮC NHẸ HỒ SƠ BÉ
          ========================================================================= */}
      <section className="bg-[#F6F0E7] py-12 sm:py-16 border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#4E8773] block font-heading">
              {language === 'en' ? 'SMART SIZE ASSISTANT' : 'TRỢ LÝ CHỌN SIZE'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
              {language === 'en' ? 'Not sure which size fits your child?' : 'Không biết chọn size nào cho bé?'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5D726A]">
              {language === 'en' ? 'Quickly enter age, height, and weight to get the most accurate size recommendation' : 'Nhập nhanh tuổi, chiều cao và cân nặng để nhận gợi ý size chuẩn nhất cho con'}
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8D8] shadow-xs space-y-6">
            <form onSubmit={handleInPageConsult} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#253A32] mb-1.5">
                    {language === 'en' ? 'Child Age' : 'Tuổi của bé'}
                  </label>
                  <select
                    value={assistAge}
                    onChange={(e) => setAssistAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#EFE8D8] text-[#253A32] text-sm focus:outline-hidden focus:border-[#4E8773]"
                  >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((y) => (
                      <option key={y} value={y}>
                        {y} {language === 'en' ? 'years old' : 'tuổi'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#253A32] mb-1.5">
                    {language === 'en' ? 'Height (cm)' : 'Chiều cao (cm)'}
                  </label>
                  <input
                    type="number"
                    min={70}
                    max={165}
                    value={assistHeight}
                    onChange={(e) => setAssistHeight(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#EFE8D8] text-[#253A32] text-sm focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#253A32] mb-1.5">
                    {language === 'en' ? 'Weight (kg)' : 'Cân nặng (kg)'}
                  </label>
                  <input
                    type="number"
                    min={8}
                    max={60}
                    value={assistWeight}
                    onChange={(e) => setAssistWeight(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#EFE8D8] text-[#253A32] text-sm focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#285A48] hover:bg-[#1E3F33] text-white font-bold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Ruler className="w-4 h-4 text-[#F4C95D]" />
                <span>{language === 'en' ? 'FIND CHILD’S SIZE' : 'TÌM SIZE CHO BÉ'}</span>
              </button>
            </form>

            {assistResult && (
              <div className="p-4 rounded-2xl bg-[#E6F1EB] border-2 border-[#4E8773] space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#5D726A]">
                      {language === 'en' ? 'Recommended Size:' : 'Kết quả đề xuất:'}
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-[#285A48] font-heading">
                      {language === 'en' ? 'Mầm Kids suggests: ' : 'Mầm Kids gợi ý: '} {assistResult.recommendedSize}
                    </div>
                  </div>
                  <Link
                    to="/san-pham"
                    className="px-3.5 py-2 rounded-xl bg-[#4E8773] hover:bg-[#285A48] text-white text-xs font-bold shadow-2xs"
                  >
                    {language === 'en' ? 'Shop this size' : 'Xem đồ size này'}
                  </Link>
                </div>
                <p className="text-xs text-[#253A32] pt-1.5 border-t border-[#CDE0D7]">
                  💡 {assistResult.advice}
                </p>
              </div>
            )}

            {/* Ghi chú Smart Size */}
            <p className="text-[11.5px] text-[#5D726A] text-center italic">
              💡 {language === 'en' ? 'Note: “Age is for reference only; actual measurements of the child should be prioritized.”' : 'Ghi chú: “Độ tuổi chỉ mang tính tham khảo, nên ưu tiên số đo thực tế của bé.”'}
            </p>

            {/* Khung nhắc “Hồ sơ bé”: nền Butter Yellow nhạt #FBF2D5, viền Butter Yellow #F4C95D, nút Primary Sage */}
            <div className="pt-4 border-t border-[#EFE8D8] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FBF2D5] border-2 border-[#F4C95D] p-4 rounded-2xl">
              <div className="text-xs text-[#253A32] text-center sm:text-left">
                <span className="font-bold text-[#285A48] block">
                  {language === 'en' ? '💡 Save child profile for personalized size and product suggestions.' : '💡 Lưu hồ sơ bé để nhận gợi ý size và sản phẩm phù hợp hơn.'}
                </span>
                {language === 'en' ? 'Enter measurements once, automatically applied when browsing.' : 'Nhập số đo một lần, tự động áp dụng khi xem sản phẩm.'}
              </div>
              <Link
                to="/thong-tin-be"
                className="shrink-0 px-4 py-2 rounded-xl bg-[#4E8773] hover:bg-[#285A48] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'CREATE PROFILE' : 'TẠO HỒ SƠ BÉ'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. GỢI Ý PHỐI ĐỒ (MIX & MATCH GỘP 1-2 OUTFIT TIÊU BIỂU)
          ========================================================================= */}
      <section id="mix-and-match" className="bg-[#FDF3EE] py-12 sm:py-16 border-b border-[#F39A73]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#4E8773] block mb-1 font-heading">
                {language === 'en' ? 'MIX & MATCH' : 'GỢI Ý PHỐI ĐỒ'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
                {language === 'en' ? 'Outfit Inspirations' : 'Gợi ý phối đồ'}
              </h2>
              <p className="text-xs sm:text-sm text-[#5D726A] mt-1 font-medium">
                {language === 'en' ? 'Pre-coordinated outfits – effortless and stylish every morning' : 'Trang phục phối sẵn nguyên set – Ba mẹ không cần đắn đo mix & match mỗi sáng'}
              </p>
            </div>

            {/* Switch between 1-2 looks */}
            <div className="flex items-center gap-2">
              {previewLooks.map((look, idx) => (
                <button
                  key={look.id}
                  onClick={() => setActiveLookIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeLookIndex === idx
                      ? 'bg-[#4E8773] text-white shadow-2xs'
                      : 'bg-white text-[#253A32] border border-[#EFE8D8] hover:border-[#4E8773]'
                  }`}
                >
                  Look {idx + 1}: {look.gender === 'be-trai' ? (language === 'en' ? 'Boys' : 'Bé trai') : (language === 'en' ? 'Girls' : 'Bé gái')}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#EFE8D8] shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Outfit Image */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 bg-[#FAF6EE] border border-[#EFE8D8]">
                  <img
                    src={currentLook.image}
                    alt={getOutfitName(currentLook)}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 bg-[#F39A73] text-white px-3 py-1 rounded-xl text-xs font-bold shadow-2xs">
                    {currentLook.badge}
                  </div>
                </div>
              </div>

              {/* Items in Set Breakdown */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#253A32] font-heading">
                    {getOutfitName(currentLook)}
                  </h3>
                  <p className="text-xs text-[#5D726A] mt-1">
                    {currentLook.description}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4E8773] block">
                    {language === 'en' ? 'Items in set:' : 'Các món trong set:'}
                  </span>
                  {currentLook.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FDF3EE]/60 border border-[#F39A73]/25 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#253A32]">
                          {item.productName}
                        </div>
                        <span className="text-[11px] text-[#5D726A]">{item.category}</span>
                      </div>
                      <span className="text-xs font-bold text-[#285A48] tabular-nums">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price and Add all to cart CTA */}
                <div className="pt-3 border-t border-[#EFE8D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-[#8B9D95] line-through tabular-nums">
                        {formatPrice(currentLook.originalPrice)}
                      </span>
                      <span className="text-2xl font-black text-[#285A48] tabular-nums font-heading">
                        {formatPrice(currentLook.comboPrice)}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#C96852] font-bold">
                      {language === 'en'
                        ? `Save ${formatPrice(currentLook.saving)} + Free tote bag`
                        : `Tiết kiệm ${formatPrice(currentLook.saving)} + Tặng kèm túi tote`}
                    </span>
                  </div>

                  <button
                    onClick={handleAddCurrentLook}
                    disabled={lookAdded}
                    className={`px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                      lookAdded
                        ? 'bg-[#285A48] text-white'
                        : 'bg-[#C96852] hover:bg-[#B55743] text-white'
                    }`}
                  >
                    {lookAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{language === 'en' ? 'FULL SET ADDED' : 'ĐÃ THÊM CẢ SET'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-white" />
                        <span>{language === 'en' ? 'ADD FULL SET TO CART' : 'THÊM CẢ SET VÀO GIỎ'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/bo-suu-tap"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4E8773] hover:text-[#285A48] hover:underline"
            >
              <span>{language === 'en' ? 'EXPLORE MORE OUTFIT SETS' : 'XEM THÊM GỢI Ý PHỐI ĐỒ'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. ĐÁNH GIÁ TỪ PHỤ HUYNH (REVIEW)
          ========================================================================= */}
      <section className="bg-white py-12 sm:py-16 border-b border-[#EFE8D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#4E8773] block mb-1 font-heading">
              {language === 'en' ? 'PARENT REVIEWS' : 'ĐÁNH GIÁ TỪ PHỤ HUYNH'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
              {language === 'en' ? 'Loving Families Share About Mầm Kids' : 'Gia đình yêu thương nói về Mầm Kids'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5D726A] mt-1 font-medium">
              {language === 'en'
                ? 'Parents’ peace of mind and children’s happy smiles are our greatest joy'
                : 'Sự hài lòng của ba mẹ và nụ cười thoải mái của con là niềm tự hào lớn nhất của chúng tôi'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1: Warm Cream #FFF9F0 */}
            <div className="p-6 rounded-[24px] bg-[#FFF9F0] border border-[#F5E8D3] shadow-2xs space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F4C95D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F4C95D]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#253A32] mt-3 leading-relaxed font-medium">
                  {language === 'en'
                    ? '“Super soft fabric, gorgeous colors, and sizing was effortless. The polo looks smart for weekend gatherings without causing sweatiness.”'
                    : '“Vải mềm, màu rất xinh và chọn size khá dễ. Áo polo mặc đi tiệc cuối tuần trông bé bảnh bao mà không bị bí mồ hôi.”'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#F5E8D3] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#285A48] shadow-2xs">
                  L
                </div>
                <div>
                  <div className="text-xs font-bold text-[#285A48]">{language === 'en' ? 'Mother Linh' : 'Mẹ Linh'}</div>
                  <div className="text-[11px] text-[#5D726A]">{language === 'en' ? 'Child 5 yrs · Bought Smart Polo' : 'Bé 5 tuổi · Mua Áo polo Bé Ngoan'}</div>
                </div>
              </div>
            </div>

            {/* Review 2: Light Sage #E6F1EB */}
            <div className="p-6 rounded-[24px] bg-[#E6F1EB] border border-[#D4E7DC] shadow-2xs space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F4C95D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F4C95D]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#253A32] mt-3 leading-relaxed font-medium">
                  {language === 'en'
                    ? '“Hidden inner stitching is delicate; my baby wore it all day without scratching. Thoughtful packaging and free canvas tote included!”'
                    : '“Đường may giấu chỉ rất tinh tế, bé mặc áo polo cả ngày không kêu ngứa cổ. Đóng gói rất chu đáo, lại có tặng kèm túi tote canvas.”'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#D4E7DC] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#285A48] shadow-2xs">
                  T
                </div>
                <div>
                  <div className="text-xs font-bold text-[#285A48]">{language === 'en' ? 'Mother Minh Thu' : 'Mẹ Minh Thư'}</div>
                  <div className="text-[11px] text-[#5D726A]">{language === 'en' ? 'Child 3 yrs · Bought Princess Dress' : 'Bé 3 tuổi · Mua Đầm công chúa'}</div>
                </div>
              </div>
            </div>

            {/* Review 3: Soft Pink #F5D7CF */}
            <div className="p-6 rounded-[24px] bg-[#F5D7CF]/40 border border-[#ECC8BE] shadow-2xs space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#F4C95D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F4C95D]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#253A32] mt-3 leading-relaxed font-medium">
                  {language === 'en'
                    ? '“Great stretch sportswear combo, relaxing sage tone, and high-quality canvas tote gift. My boy is so excited for sports class!”'
                    : '“Combo đồ thể thao co giãn tốt, màu sage dịu mắt và được tặng kèm túi tote rất đẹp. Bé mặc đi học thể dục rất thích thú.”'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#ECC8BE] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#285A48] shadow-2xs">
                  N
                </div>
                <div>
                  <div className="text-xs font-bold text-[#285A48]">{language === 'en' ? 'Father Hoang Nam' : 'Bố Hoàng Nam'}</div>
                  <div className="text-[11px] text-[#5D726A]">{language === 'en' ? 'Child 7 yrs · Bought Sports Combo' : 'Bé 7 tuổi · Mua Combo Thể Thao'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <SizeAdvisorModal
        isOpen={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
      />

      {ecoModalStory && (
        <EcoStoryModal
          story={ecoModalStory}
          isOpen={Boolean(ecoModalStory)}
          onClose={() => setEcoModalStory(null)}
        />
      )}
    </div>
  );
};
