import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ArrowUpDown, Ruler, Sparkles, Layers, Tag, Shirt } from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { SizeAdvisorModal } from '../components/common/SizeAdvisorModal';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ProductsPageProps {
  initialGenderFilter?: 'be-trai' | 'be-gai' | 'all';
  initialSaleOnly?: boolean;
  pageTitle?: string;
  pageSubtitle?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialGenderFilter = 'all',
  initialSaleOnly = false,
  pageTitle,
  pageSubtitle
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language, t } = useLanguage();

  const resolvedTitle = pageTitle || (language === 'en' ? 'Product Catalog' : 'Danh mục sản phẩm');
  const resolvedSubtitle = pageSubtitle || (language === 'en' ? 'Gentle, skin-safe and personalized apparel for kids 3–12' : 'Khám phá trang phục dịu êm, an toàn và cá nhân hóa cho bé 3–12 tuổi');

  // Filters state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [saleOnly, setSaleOnly] = useState<boolean>(
    initialSaleOnly || searchParams.get('sale') === 'true'
  );
  const [selectedGender, setSelectedGender] = useState<'all' | 'be-trai' | 'be-gai'>(
    (searchParams.get('gender') as 'be-trai' | 'be-gai') || initialGenderFilter
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [selectedSize, setSelectedSize] = useState<string>(searchParams.get('size') || 'all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modals
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam !== null) setSearchTerm(qParam);

    const genderParam = searchParams.get('gender');
    if (genderParam === 'be-trai' || genderParam === 'be-gai') {
      setSelectedGender(genderParam);
    } else if (initialGenderFilter !== 'all') {
      setSelectedGender(initialGenderFilter);
    }

    const catParam = searchParams.get('category');
    if (catParam) setSelectedCategory(catParam);
  }, [searchParams, initialGenderFilter]);

  const categories = useMemo(() => [
    { id: 'all', label: language === 'en' ? 'All Categories' : 'Tất cả danh mục' },
    { id: 'ao', label: language === 'en' ? 'Tops, Polos & Shirts' : 'Áo polo, thun & sơ mi' },
    { id: 'quan', label: language === 'en' ? 'Shorts, Jeans & Joggers' : 'Quần short, jean & jogger' },
    { id: 'vay', label: language === 'en' ? 'Dresses & Skirts' : 'Váy & đầm bé gái' },
    { id: 'bo-do', label: language === 'en' ? 'Co-ord Sets' : 'Set phối sẵn hoàn chỉnh' },
    { id: 'the-thao', label: language === 'en' ? 'Active Sportswear' : 'Đồ thể thao năng động' },
    { id: 'ao-khoac', label: language === 'en' ? 'Jackets & Hoodies' : 'Áo khoác & Hoodie' },
    { id: 'phu-kien', label: language === 'en' ? 'Accessories (Hats, Bags)' : 'Phụ kiện (Mũ, túi, dép)' }
  ], [language]);

  const priceRanges = useMemo(() => [
    { id: 'all', label: language === 'en' ? 'All Prices' : 'Tất cả mức giá' },
    { id: 'under-200', label: language === 'en' ? 'Under 200,000 VND' : 'Dưới 200.000đ' },
    { id: '200-300', label: language === 'en' ? '200,000 – 300,000 VND' : '200.000đ – 300.000đ' },
    { id: 'above-300', label: language === 'en' ? 'Above 300,000 VND' : 'Trên 300.000đ' }
  ], [language]);

  const sizes = ['all', 'Size 90', 'Size 100', 'Size 110', 'Size 120', 'Size 130', 'Size 140'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Keyword search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.categoryName.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      // 2. Gender filtering
      if (selectedGender !== 'all') {
        if (selectedGender === 'be-trai') {
          if (product.gender !== 'be-trai' && product.gender !== 'unisex') return false;
        } else if (selectedGender === 'be-gai') {
          if (product.gender !== 'be-gai' && product.gender !== 'unisex') return false;
        }
      }

      // 3. Category filtering
      if (selectedCategory !== 'all') {
        if (product.category !== selectedCategory) return false;
      }

      // 4. Size filtering
      if (selectedSize !== 'all') {
        const hasSize = product.sizes.some((s) => s.startsWith(selectedSize));
        if (!hasSize) return false;
      }

      // 5. Price filtering
      if (priceRange === 'under-200') {
        if (product.price >= 200000) return false;
      } else if (priceRange === '200-300') {
        if (product.price < 200000 || product.price > 300000) return false;
      } else if (priceRange === 'above-300') {
        if (product.price <= 300000) return false;
      }

      // 6. Promotions / Sale only filter
      if (saleOnly) {
        const isDiscounted = (product.originalPrice && product.originalPrice > product.price) || product.isBestSeller;
        if (!isDiscounted) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [searchTerm, selectedGender, selectedCategory, selectedSize, priceRange, sortBy, saleOnly]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGender(initialGenderFilter);
    setSelectedCategory('all');
    setSelectedSize('all');
    setPriceRange('all');
    setSaleOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedGender !== initialGenderFilter ||
    selectedCategory !== 'all' ||
    selectedSize !== 'all' ||
    priceRange !== 'all' ||
    saleOnly !== initialSaleOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-7 mb-7 border-b border-[#EFE8D8] gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#355F52] block mb-1 font-heading">
            Mầm Kids Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2F403A] font-heading">{resolvedTitle}</h1>
          <p className="text-xs sm:text-sm text-[#5D726A] mt-1.5 leading-relaxed">{resolvedSubtitle}</p>
        </div>

        <button
          onClick={() => setSizeModalOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 rounded-2xl bg-white hover:bg-[#F2F7F4] text-[#355F52] text-xs font-bold border border-[#D4E5DE] transition-colors flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
        >
          <Ruler className="w-4 h-4 text-[#4E8773]" />
          <span>{language === 'en' ? 'Unsure of size? Get Advice' : 'Bé mặc size nào? Tư vấn ngay'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-7 lg:gap-8 items-start">
        {/* Desktop Sidebar Filters: Clean, Airy & Elegant */}
        <aside className="hidden lg:block space-y-6">
          <div className="p-5 sm:p-6 rounded-[24px] bg-white border border-[#EFE8D8] shadow-xs space-y-6">
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#F0EBE0]">
              <div className="flex items-center gap-2 font-bold text-[#2F403A] text-sm font-heading">
                <Filter className="w-4 h-4 text-[#355F52]" />
                <span>{language === 'en' ? 'Product Filters' : 'Bộ lọc sản phẩm'}</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#355F52] font-semibold hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Reset' : 'Xóa bộ lọc'}
                </button>
              )}
            </div>

            {/* Filter 1: Gender (Only shown if on general store page, or locked indicator on specific pages) */}
            {initialGenderFilter === 'all' ? (
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A8E85]">
                  <Sparkles className="w-3.5 h-3.5 text-[#355F52]" />
                  <span>{language === 'en' ? 'For Kids' : 'Dành cho bé'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  {[
                    { id: 'all', label: language === 'en' ? 'All Boys & Girls' : 'Tất cả bé trai & bé gái' },
                    { id: 'be-trai', label: language === 'en' ? 'Boys' : 'Bé trai (Boy)' },
                    { id: 'be-gai', label: language === 'en' ? 'Girls' : 'Bé gái (Girl)' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGender(g.id as any)}
                      className={`text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedGender === g.id
                          ? 'bg-[#4E8773] text-white font-bold shadow-2xs'
                          : 'text-[#4A5D54] hover:bg-[#EAF3EF] hover:text-[#355F52] font-medium'
                      }`}
                    >
                      <span>{g.label}</span>
                      {selectedGender === g.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5DFA0]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#EAF3EF] border border-[#D2E3DC] text-xs text-[#355F52] font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#4E8773]" />
                <span>
                  {initialGenderFilter === 'be-gai'
                    ? (language === 'en' ? 'Girls’ Collection' : 'Danh mục đồ dành riêng cho Bé gái')
                    : (language === 'en' ? 'Boys’ Collection' : 'Danh mục đồ dành riêng cho Bé trai')}
                </span>
              </div>
            )}

            {/* Filter 2: Category */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A8E85]">
                <Layers className="w-3.5 h-3.5 text-[#4E8773]" />
                <span>{language === 'en' ? 'Clothing Category' : 'Danh mục trang phục'}</span>
              </div>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#4E8773] text-white font-bold shadow-2xs'
                        : 'text-[#4A5D54] hover:bg-[#EAF3EF] hover:text-[#355F52] font-medium'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5DFA0]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Size */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A8E85]">
                <Ruler className="w-3.5 h-3.5 text-[#4E8773]" />
                <span>{language === 'en' ? 'Size' : 'Kích thước (Size)'}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-1.5 px-2 rounded-xl text-xs transition-all border text-center cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#4E8773] text-white border-[#4E8773] font-bold shadow-2xs'
                        : 'bg-[#FAF7F0] text-[#4A5D54] border-[#EFE8D8] hover:border-[#4E8773] font-medium'
                    }`}
                  >
                    {sz === 'all' ? (language === 'en' ? 'All Sizes' : 'Tất cả size') : sz.replace('Size ', 'Sz ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 4: Price Range */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A8E85]">
                <Tag className="w-3.5 h-3.5 text-[#4E8773]" />
                <span>{language === 'en' ? 'Price Range' : 'Khoảng giá'}</span>
              </div>
              <div className="flex flex-col gap-1">
                {priceRanges.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceRange(p.id)}
                    className={`text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      priceRange === p.id
                        ? 'bg-[#4E8773] text-white font-bold shadow-2xs'
                        : 'text-[#4A5D54] hover:bg-[#EAF3EF] hover:text-[#355F52] font-medium'
                    }`}
                  >
                    <span>{p.label}</span>
                    {priceRange === p.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5DFA0]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#EFE8D8] shadow-xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'en' ? 'Search cotton tops, dresses, shorts, activewear...' : 'Tìm áo cotton, váy, short, đồ thể thao...'}
                className="w-full px-3.5 py-2 pl-9 rounded-xl bg-[#FAF7F0] border border-[#EFE8D8] text-xs sm:text-sm text-[#2F403A] placeholder-[#8B9D95] focus:outline-hidden focus:border-[#355F52]"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8B9D95]" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2.5 text-[#8B9D95] hover:text-[#2F403A] cursor-pointer"
                  aria-label="Xóa từ khóa tìm kiếm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button & Sort Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#FAF7F0] border border-[#EFE8D8] text-xs font-bold text-[#2F403A] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Filter className="w-4 h-4 text-[#355F52]" />
                <span>{language === 'en' ? `Filters ${hasActiveFilters ? '(Active)' : ''}` : `Bộ lọc ${hasActiveFilters ? '(Đang lọc)' : ''}`}</span>
              </button>

              <div className="flex items-center gap-1.5 bg-[#FAF7F0] border border-[#EFE8D8] rounded-xl px-2.5 py-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8B9D95]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-semibold text-[#2F403A] focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">{language === 'en' ? 'Bestsellers' : 'Nổi bật nhất'}</option>
                  <option value="price-asc">{language === 'en' ? 'Price: Low to High' : 'Giá: Thấp đến Cao'}</option>
                  <option value="price-desc">{language === 'en' ? 'Price: High to Low' : 'Giá: Cao đến Thấp'}</option>
                  <option value="newest">{language === 'en' ? 'Newest Arrivals' : 'Mẫu mới nhất'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Concept Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => { setSelectedCategory('all'); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#355F52] text-white shadow-2xs'
                  : 'bg-white text-[#2F403A] border border-[#EFE8D8] hover:border-[#355F52]'
              }`}
            >
              {language === 'en' ? `All Categories (${filteredProducts.length})` : `Tất cả danh mục (${filteredProducts.length})`}
            </button>
            <button
              onClick={() => { setSelectedCategory('bo-do'); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'bo-do'
                  ? 'bg-[#355F52] text-white shadow-2xs'
                  : 'bg-white text-[#2F403A] border border-[#EFE8D8] hover:border-[#355F52]'
              }`}
            >
              ✨ {language === 'en' ? 'Co-ord Sets' : 'Set phối sẵn'}
            </button>
            <button
              onClick={() => { setSelectedCategory('the-thao'); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'the-thao'
                  ? 'bg-[#355F52] text-white shadow-2xs'
                  : 'bg-white text-[#2F403A] border border-[#EFE8D8] hover:border-[#355F52]'
              }`}
            >
              🏃 {language === 'en' ? 'Sportswear' : 'Đồ thể thao'}
            </button>
            <button
              onClick={() => { setSelectedCategory('ao'); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'ao'
                  ? 'bg-[#355F52] text-white shadow-2xs'
                  : 'bg-white text-[#2F403A] border border-[#EFE8D8] hover:border-[#355F52]'
              }`}
            >
              👕 {language === 'en' ? 'Tops & Polos' : 'Áo & Polo'}
            </button>
            <button
              onClick={() => { setSelectedCategory('phu-kien'); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'phu-kien'
                  ? 'bg-[#355F52] text-white shadow-2xs'
                  : 'bg-white text-[#2F403A] border border-[#EFE8D8] hover:border-[#355F52]'
              }`}
            >
              👒 {language === 'en' ? 'Accessories' : 'Phụ kiện'}
            </button>
          </div>

          {/* Result Count and Active Filters display */}
          <div className="flex items-center justify-between text-xs text-[#5D726A]">
            <span>
              {language === 'en' ? 'Showing ' : 'Hiển thị '}
              <strong className="text-[#2F403A] font-bold">{filteredProducts.length}</strong>
              {language === 'en' ? ' products' : ' sản phẩm'}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[#355F52] font-bold hover:underline cursor-pointer"
              >
                {language === 'en' ? 'Reset all filters' : 'Xóa tất cả bộ lọc'}
              </button>
            )}
          </div>

          {/* Product Grid: 2 columns on mobile, 3 columns on tablet/desktop */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#EFE8D8] space-y-3">
              <span className="text-4xl block">🌱</span>
              <h3 className="text-lg font-bold text-[#2F403A]">
                {language === 'en' ? 'No matching products found' : 'Không tìm thấy sản phẩm phù hợp'}
              </h3>
              <p className="text-xs sm:text-sm text-[#647B72] max-w-sm mx-auto">
                {language === 'en'
                  ? 'Try relaxing filters or searching with another keyword like "polo", "sports", "shorts".'
                  : 'Hãy thử nới lỏng bộ lọc hoặc tìm kiếm bằng từ khóa khác như "polo", "thể thao", "quần".'}
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#355F52] text-white text-xs font-bold hover:bg-[#28473D] transition-colors cursor-pointer"
              >
                {language === 'en' ? 'View all products' : 'Xem tất cả sản phẩm'}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-[#2F403A]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-[82vw] max-w-sm sm:max-w-xs bg-white h-full shadow-2xl p-5 sm:p-6 overflow-y-auto flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE8D8]">
                <h3 className="font-bold text-[#2F403A] text-base font-heading">Bộ lọc sản phẩm</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-[#2F403A] hover:bg-[#F2F7F4] rounded-lg"
                  aria-label="Đóng bộ lọc"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-5">
                {initialGenderFilter === 'all' && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#7A8E85] mb-2">
                      Dành cho bé
                    </label>
                    <div className="grid grid-cols-1 gap-1">
                      {[
                        { id: 'all', label: 'Tất cả bé' },
                        { id: 'be-trai', label: 'Bé trai' },
                        { id: 'be-gai', label: 'Bé gái' }
                      ].map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setSelectedGender(g.id as any)}
                          className={`text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                            selectedGender === g.id
                              ? 'bg-[#4E8773] text-white font-bold'
                              : 'bg-[#FAF7F0] text-[#2F403A]'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A8E85] mb-2">
                    Danh mục
                  </label>
                  <div className="grid grid-cols-1 gap-1 max-h-52 overflow-y-auto pr-1">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                          selectedCategory === c.id
                            ? 'bg-[#4E8773] text-white font-bold'
                            : 'bg-[#FAF7F0] text-[#2F403A]'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A8E85] mb-2">
                    Kích thước (Size)
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 px-1 text-xs rounded-xl border text-center font-medium ${
                          selectedSize === s
                            ? 'bg-[#4E8773] text-white border-[#4E8773] font-bold'
                            : 'bg-[#FAF7F0] text-[#2F403A] border-[#EFE8D8]'
                        }`}
                      >
                        {s === 'all' ? 'Tất cả' : s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A8E85] mb-2">
                    Khoảng giá
                  </label>
                  <div className="grid grid-cols-1 gap-1">
                    {[
                      { id: 'all', label: 'Tất cả mức giá' },
                      { id: 'under-200', label: 'Dưới 200.000đ' },
                      { id: '200-300', label: '200.000đ – 300.000đ' },
                      { id: 'above-300', label: 'Trên 300.000đ' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPriceRange(p.id)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                          priceRange === p.id
                            ? 'bg-[#355F52] text-white'
                            : 'bg-[#FAF7F0] text-[#2F403A]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFE8D8] flex gap-2">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2.5 rounded-2xl border border-[#EFE8D8] text-xs font-bold text-[#2F403A]"
              >
                Đặt lại
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-2xl bg-[#355F52] text-white text-xs font-bold"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size Advisor Modal */}
      <SizeAdvisorModal
        isOpen={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
      />
    </div>
  );
};
