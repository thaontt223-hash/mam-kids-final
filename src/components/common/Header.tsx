import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ArrowRight,
  Gift,
  Sparkles,
  Ticket,
  Package,
  Baby,
  LogOut,
  Award,
  ChevronRight,
  ChevronDown,
  Truck,
  RefreshCw,
  Ruler,
  HelpCircle,
  PhoneCall,
  Leaf,
  Recycle,
  BookOpen,
  Tag,
  FileText,
  ShieldCheck,
  CreditCard,
  Lock
} from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { PRODUCTS, formatVND } from '../../data/products';

export const Header: React.FC = () => {
  const { cartCount, wishlist } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const { language, setLanguage, t, getProductName } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [lookupOrderId, setLookupOrderId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mamXanhDropdownOpen, setMamXanhDropdownOpen] = useState(false);
  const [promoDropdownOpen, setPromoDropdownOpen] = useState(false);
  const [policyDropdownOpen, setPolicyDropdownOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setAccountModalOpen(false);
    setProductsDropdownOpen(false);
    setMamXanhDropdownOpen(false);
    setPromoDropdownOpen(false);
    setPolicyDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen || searchOpen || accountModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, searchOpen, accountModalOpen]);

  // 1. Sản phẩm Submenu (10 mục)
  const productsSubmenu = [
    { label: language === 'en' ? 'All Products' : 'Tất cả sản phẩm', path: '/san-pham' },
    { label: language === 'en' ? 'Boys’ Fashion' : 'Bé trai', path: '/be-trai' },
    { label: language === 'en' ? 'Girls’ Fashion' : 'Bé gái', path: '/be-gai' },
    { label: language === 'en' ? 'Tops & Shirts' : 'Áo', path: '/san-pham?category=ao' },
    { label: language === 'en' ? 'Pants & Shorts' : 'Quần', path: '/san-pham?category=quan' },
    { label: language === 'en' ? 'Dresses & Skirts' : 'Váy / Đầm', path: '/san-pham?category=vay-dam' },
    { label: language === 'en' ? 'Coordinated Sets' : 'Set đồ', path: '/san-pham?category=bo-do' },
    { label: language === 'en' ? 'Sportswear' : 'Đồ thể thao', path: '/san-pham?category=the-thao' },
    { label: language === 'en' ? 'Jackets & Hoodies' : 'Áo khoác / Hoodie', path: '/san-pham?category=ao-khoac' },
    { label: language === 'en' ? 'Accessories' : 'Phụ kiện', path: '/san-pham?category=phu-kien' }
  ];

  // 2. Mầm Xanh Submenu (6 mục)
  const mamXanhSubmenu = [
    { label: language === 'en' ? 'About Mầm Xanh' : 'Giới thiệu Mầm Xanh', path: '/mam-xanh', icon: Leaf },
    { label: language === 'en' ? 'Wear Green' : 'Mặc Xanh', path: '/mam-xanh#mac-xanh', icon: Sparkles },
    { label: language === 'en' ? 'Learn Green' : 'Học Xanh', path: '/mam-xanh#hoc-xanh', icon: BookOpen },
    { label: language === 'en' ? 'Eco Story' : 'Eco Story', path: '/eco-story', icon: BookOpen },
    { label: language === 'en' ? 'Green Mission' : 'Green Mission', path: '/mam-xanh#green-mission', icon: Award },
    { label: language === 'en' ? 'Mầm Again' : 'Mầm Again', path: '/mam-again', icon: Recycle }
  ];

  // 3. Khuyến mãi Submenu (5 mục)
  const promotionsSubmenu = [
    { label: language === 'en' ? 'Active Offers' : 'Ưu đãi đang áp dụng', path: '/khuyen-mai', icon: Tag },
    { label: language === 'en' ? 'Vouchers' : 'Voucher', path: '/voucher', icon: Ticket },
    { label: language === 'en' ? 'Combo Sets' : 'Combo', path: '/khuyen-mai#combo', icon: Gift },
    { label: language === 'en' ? 'Seasonal Deals' : 'Ưu đãi theo mùa', path: '/khuyen-mai#theo-mua', icon: Sparkles },
    { label: language === 'en' ? 'Member Perks' : 'Ưu đãi thành viên', path: '/khuyen-mai#thanh-vien', icon: Award }
  ];

  // 4. Chính sách khách hàng Submenu (8 mục)
  const policySubmenu = [
    { label: language === 'en' ? 'General Regulations' : 'Quy định chung', path: '/quy-dinh-chung', icon: FileText },
    { label: language === 'en' ? 'Terms of Service' : 'Điều khoản sử dụng', path: '/dieu-khoan-su-dung', icon: ShieldCheck },
    { label: language === 'en' ? 'Shipping Policy' : 'Chính sách giao hàng', path: '/chinh-sach-giao-hang', icon: Truck },
    { label: language === 'en' ? 'Payment Policy' : 'Chính sách thanh toán', path: '/chinh-sach-thanh-toan', icon: CreditCard },
    { label: language === 'en' ? 'Return Policy' : 'Chính sách đổi trả', path: '/chinh-sach-doi-tra', icon: RefreshCw },
    { label: language === 'en' ? 'Privacy Policy' : 'Chính sách bảo mật', path: '/chinh-sach-bao-mat', icon: Lock },
    { label: language === 'en' ? 'Loyalty Program' : 'Khách hàng thân thiết', path: '/khach-hang-than-thiet', icon: Award },
    { label: language === 'en' ? 'Mầm Points' : 'Điểm Mầm', path: '/chinh-sach-diem-mam', icon: Sparkles }
  ];

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          getProductName(p).toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.genderName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/san-pham?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupOrderId.trim()) {
      navigate(`/theo-doi-don-hang?id=${encodeURIComponent(lookupOrderId.trim())}`);
      setAccountModalOpen(false);
      setLookupOrderId('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDF9F1]/98 backdrop-blur-md border-b border-[#EFE8D8] shadow-xs transition-all">
      {/* Promo Bar: Butter Yellow #F4C95D & Deep Forest Green #285A48 */}
      <div className="bg-[#F4C95D] border-b border-[#E5BC50] px-4 py-1.5 sm:py-2 text-center text-xs text-[#285A48] font-bold">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-bold">
          <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center">
            <Gift className="w-4 h-4 text-[#285A48] shrink-0" />
            <span>{t('promo.toteGift')}</span>
            <span className="hidden md:inline text-[#285A48]/40">·</span>
            <span className="hidden md:inline">{t('promo.freeShipping')}</span>
          </div>

          {/* Quick switcher on promo bar for mobile / compact screens */}
          <div className="flex lg:hidden items-center p-0.5 rounded-lg bg-white/70 border border-[#E5BC50] text-[10px] font-bold shrink-0">
            <button
              type="button"
              onClick={() => setLanguage('vi')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                language === 'vi' ? 'bg-[#285A48] text-white shadow-2xs' : 'text-[#285A48] hover:text-[#1E3F33]'
              }`}
              aria-label="Chuyển ngôn ngữ sang tiếng Việt"
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                language === 'en' ? 'bg-[#285A48] text-white shadow-2xs' : 'text-[#285A48] hover:text-[#1E3F33]'
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Mobile Menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2.5 -ml-2 text-[#2F403A] hover:text-[#4E8773] hover:bg-[#EAF3EF] rounded-2xl transition-colors"
            aria-label="Mở menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo */}
          <div className="shrink-0 flex items-center" style={{ direction: 'ltr', transform: 'none' }}>
            <Logo size="md" showSlogan={false} />
          </div>

          {/* Desktop Nav Links (6 items with dropdowns) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-[#2F403A]">
            {/* 1. Trang chủ */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors hover:text-[#4E8773] relative py-1.5 text-[14px] xl:text-[14.5px] ${
                  isActive ? 'text-[#4E8773] font-bold' : 'text-[#2F403A]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{t('nav.home')}</span>
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-[#4E8773] rounded-full" />}
                </>
              )}
            </NavLink>

            {/* 2. Sản phẩm Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <NavLink
                to="/san-pham"
                className={({ isActive }) =>
                  `flex items-center gap-1 py-1.5 text-[14px] xl:text-[14.5px] transition-colors cursor-pointer ${
                    isActive || location.pathname.startsWith('/san-pham') || location.pathname === '/be-trai' || location.pathname === '/be-gai'
                      ? 'text-[#4E8773] font-bold'
                      : 'text-[#2F403A] hover:text-[#4E8773]'
                  }`
                }
              >
                <span>{t('nav.products')}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#5D726A] transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-[#4E8773]' : ''}`} />
              </NavLink>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white/98 backdrop-blur-md border border-[#EFE8D8] rounded-2xl shadow-xl p-2 space-y-0.5">
                    {productsSubmenu.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setProductsDropdownOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                            isActive
                              ? 'bg-[#EAF3EF] text-[#4E8773] font-bold'
                              : 'text-[#2F403A] hover:bg-[#F7F3EA] hover:text-[#4E8773]'
                          }`
                        }
                      >
                        <span>{sub.label}</span>
                        <ChevronRight className="w-3 h-3 text-[#A0B0A8]" />
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bộ sưu tập */}
            <NavLink
              to="/bo-suu-tap"
              className={({ isActive }) =>
                `transition-colors hover:text-[#4E8773] relative py-1.5 text-[14px] xl:text-[14.5px] ${
                  isActive ? 'text-[#4E8773] font-bold' : 'text-[#2F403A]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{t('nav.collections')}</span>
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-[#4E8773] rounded-full" />}
                </>
              )}
            </NavLink>

            {/* 4. Mầm Xanh Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setMamXanhDropdownOpen(true)}
              onMouseLeave={() => setMamXanhDropdownOpen(false)}
            >
              <NavLink
                to="/mam-xanh"
                className={({ isActive }) =>
                  `flex items-center gap-1 py-1.5 text-[14px] xl:text-[14.5px] transition-colors cursor-pointer ${
                    isActive || location.pathname.startsWith('/mam-xanh') || location.pathname.startsWith('/eco-story') || location.pathname.startsWith('/mam-again')
                      ? 'text-[#4E8773] font-bold'
                      : 'text-[#2F403A] hover:text-[#4E8773]'
                  }`
                }
              >
                <span>Mầm Xanh 🌱</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#5D726A] transition-transform duration-200 ${mamXanhDropdownOpen ? 'rotate-180 text-[#4E8773]' : ''}`} />
              </NavLink>

              {mamXanhDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-60 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white/98 backdrop-blur-md border border-[#EFE8D8] rounded-2xl shadow-xl p-2 space-y-0.5">
                    {mamXanhSubmenu.map((sub) => {
                      const Icon = sub.icon;
                      return (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setMamXanhDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                              isActive
                                ? 'bg-[#EAF3EF] text-[#4E8773] font-bold'
                                : 'text-[#2F403A] hover:bg-[#F7F3EA] hover:text-[#4E8773]'
                            }`
                          }
                        >
                          <Icon className="w-4 h-4 text-[#4E8773] shrink-0" />
                          <span>{sub.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Khuyến mãi Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setPromoDropdownOpen(true)}
              onMouseLeave={() => setPromoDropdownOpen(false)}
            >
              <NavLink
                to="/khuyen-mai"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 py-1.5 text-[14px] xl:text-[14.5px] transition-colors cursor-pointer ${
                    isActive || location.pathname.startsWith('/khuyen-mai') || location.pathname.startsWith('/voucher')
                      ? 'text-[#4E8773] font-bold'
                      : 'text-[#2F403A] hover:text-[#4E8773]'
                  }`
                }
              >
                <span>{t('nav.promotions')}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase bg-[#F39A73] text-white">
                  Sale
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#5D726A] transition-transform duration-200 ${promoDropdownOpen ? 'rotate-180 text-[#4E8773]' : ''}`} />
              </NavLink>

              {promoDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white/98 backdrop-blur-md border border-[#EFE8D8] rounded-2xl shadow-xl p-2 space-y-0.5">
                    {promotionsSubmenu.map((sub) => {
                      const Icon = sub.icon;
                      return (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setPromoDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                              isActive
                                ? 'bg-[#EAF3EF] text-[#4E8773] font-bold'
                                : 'text-[#2F403A] hover:bg-[#F7F3EA] hover:text-[#4E8773]'
                            }`
                          }
                        >
                          <Icon className="w-4 h-4 text-[#ECA032] shrink-0" />
                          <span>{sub.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 6. Chính sách khách hàng Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setPolicyDropdownOpen(true)}
              onMouseLeave={() => setPolicyDropdownOpen(false)}
            >
              <NavLink
                to="/chinh-sach"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 py-1.5 text-[14px] xl:text-[14.5px] transition-colors cursor-pointer ${
                    location.pathname.startsWith('/chinh-sach') ||
                    location.pathname === '/quy-dinh-chung' ||
                    location.pathname === '/dieu-khoan-su-dung' ||
                    location.pathname === '/khach-hang-than-thiet'
                      ? 'text-[#4E8773] font-bold'
                      : 'text-[#2F403A] hover:text-[#4E8773]'
                  }`
                }
              >
                <span>{t('nav.customerPolicy')}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#5D726A] transition-transform duration-200 ${policyDropdownOpen ? 'rotate-180 text-[#4E8773]' : ''}`} />
              </NavLink>

              {policyDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white/98 backdrop-blur-md border border-[#EFE8D8] rounded-2xl shadow-xl p-2 space-y-0.5">
                    {policySubmenu.map((sub) => {
                      const Icon = sub.icon;
                      return (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setPolicyDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                              isActive
                                ? 'bg-[#EAF3EF] text-[#4E8773] font-bold'
                                : 'text-[#2F403A] hover:bg-[#F7F3EA] hover:text-[#4E8773]'
                            }`
                          }
                        >
                          <Icon className="w-4 h-4 text-[#4E8773] shrink-0" />
                          <span>{sub.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switcher Desktop (VI | EN) */}
            <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-[#EAF3EF] border border-[#D2E3DC] text-xs font-bold shrink-0">
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'vi' ? 'bg-[#4E8773] text-white shadow-2xs font-extrabold' : 'text-[#355F52] hover:text-[#2F403A]'
                }`}
                aria-label="Tiếng Việt"
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'en' ? 'bg-[#4E8773] text-white shadow-2xs font-extrabold' : 'text-[#355F52] hover:text-[#2F403A]'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-[#2F403A] hover:text-[#4E8773] hover:bg-[#EAF3EF] rounded-2xl transition-colors"
              aria-label={t('nav.search')}
              title={t('nav.search')}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button (desktop/tablet) */}
            <Link
              to="/yeu-thich"
              className="hidden sm:flex relative p-2.5 text-[#2F403A] hover:text-[#4E8773] hover:bg-[#EAF3EF] rounded-2xl transition-colors"
              aria-label={t('nav.wishlist')}
              title={t('nav.wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F3B59A] px-1 text-[10px] font-bold text-[#2F403A] shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account / Order tracking Button */}
            <button
              onClick={() => setAccountModalOpen(true)}
              className={`p-2 sm:p-2.5 rounded-2xl transition-colors flex items-center gap-2 ${
                isLoggedIn
                  ? 'bg-[#EAF3EF] text-[#355F52] hover:bg-[#D2E3DC]'
                  : 'text-[#2F403A] hover:text-[#4E8773] hover:bg-[#EAF3EF]'
              }`}
              aria-label={isLoggedIn ? `Tài khoản ${user?.fullName}` : t('nav.account')}
              title={isLoggedIn ? `Tài khoản: ${user?.fullName}` : t('nav.account')}
            >
              {isLoggedIn ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#4E8773] text-white flex items-center justify-center text-xs font-bold">
                    {user?.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden xl:inline text-xs font-bold text-[#355F52] max-w-[100px] truncate">
                    {user?.fullName.split(' ').slice(-1)[0]}
                  </span>
                </div>
              ) : (
                <User className="w-5 h-5" />
              )}
            </button>

            {/* Cart Button: Sage green #4E8773, hover Deep Forest Green #285A48 */}
            <Link
              to="/gio-hang"
              className="relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-white bg-[#4E8773] hover:bg-[#285A48] rounded-xl sm:rounded-2xl transition-all shadow-xs group hover:shadow-sm shrink-0"
              aria-label={t('nav.cart')}
              title={t('nav.cart')}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F4C95D] px-1 text-[10px] font-bold text-[#285A48] shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-white tracking-wide">
                {t('nav.cart')}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden">
          {/* Overlay phía sau: rgba(30, 50, 43, 0.35) & backdrop-blur 2px */}
          <div
            className="fixed inset-0 bg-[#1E322B]/35 backdrop-blur-[2px] transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Full-height Drawer: 100dvh, width min(86vw, 360px), z-1001, bg #FDF9F1 */}
          <div
            className="fixed top-0 left-0 h-[100dvh] w-[min(86vw,360px)] max-w-[360px] bg-[#FDF9F1] shadow-2xl flex flex-col z-[1001] overflow-y-auto border-r border-[#EFE8D8] animate-in slide-in-from-left duration-200 ease-out"
            style={{ height: '100dvh', width: 'min(86vw, 360px)' }}
          >
            {/* Header trong drawer: [Logo Mầm Kids] --- [VI|EN] --- [X] */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#EFE8D8] shrink-0 bg-[#FDF9F1]">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{ direction: 'ltr', transform: 'none' }}
                aria-label="Về trang chủ Mầm Kids"
              >
                <Logo size="sm" isLink={false} />
              </Link>
              <div className="flex items-center gap-2">
                {/* VI | EN Switcher inside Mobile Drawer */}
                <div className="flex items-center p-0.5 rounded-xl bg-[#EAF3EF] border border-[#D2E3DC] text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setLanguage('vi')}
                    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                      language === 'vi' ? 'bg-[#4E8773] text-white shadow-2xs font-extrabold' : 'text-[#355F52]'
                    }`}
                  >
                    VI
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                      language === 'en' ? 'bg-[#4E8773] text-white shadow-2xs font-extrabold' : 'text-[#355F52]'
                    }`}
                  >
                    EN
                  </button>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#2F403A] hover:bg-[#EAF3EF] hover:text-[#4E8773] rounded-2xl transition-colors cursor-pointer"
                  aria-label={t('nav.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Danh sách menu mobile: 6 danh mục chuẩn hóa theo Checkpoint 5 & 6 */}
            <div className="flex-1 py-3 px-3 overflow-y-auto space-y-4">
              {/* Main 6 navigation items */}
              <div className="bg-white rounded-2xl border border-[#EFE8D8] overflow-hidden divide-y divide-[#F0EBE0]">
                {/* 1. Trang chủ */}
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between h-[46px] px-3.5 text-[15px] font-semibold transition-all ${
                      isActive ? 'bg-[#EAF3EF] text-[#4E8773] font-bold' : 'text-[#2F403A] hover:bg-[#FDF9F1]'
                    }`
                  }
                >
                  <span>{t('nav.home')}</span>
                  <ChevronRight className="w-4 h-4 text-[#A0B0A8]" />
                </NavLink>

                {/* 2. Sản phẩm Accordion */}
                <div>
                  <div className="flex items-center justify-between h-[46px] px-3.5">
                    <NavLink
                      to="/san-pham"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[15px] font-semibold text-[#2F403A] hover:text-[#4E8773] flex-1"
                    >
                      {t('nav.products')}
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === 'products' ? null : 'products')}
                      className="p-1.5 text-[#5D726A] hover:text-[#4E8773] rounded-lg cursor-pointer"
                      aria-label="Mở danh mục sản phẩm"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'products' ? 'rotate-180 text-[#4E8773]' : ''}`} />
                    </button>
                  </div>
                  {mobileExpanded === 'products' && (
                    <div className="bg-[#FAF6EE] px-4 py-2 border-t border-[#EFE8D8] space-y-1">
                      {productsSubmenu.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `block py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                              isActive ? 'bg-[#EAF3EF] text-[#4E8773] font-bold' : 'text-[#2F403A] hover:text-[#4E8773]'
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Bộ sưu tập */}
                <NavLink
                  to="/bo-suu-tap"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between h-[46px] px-3.5 text-[15px] font-semibold transition-all ${
                      isActive ? 'bg-[#EAF3EF] text-[#4E8773] font-bold' : 'text-[#2F403A] hover:bg-[#FDF9F1]'
                    }`
                  }
                >
                  <span>{t('nav.collections')}</span>
                  <ChevronRight className="w-4 h-4 text-[#A0B0A8]" />
                </NavLink>

                {/* 4. Mầm Xanh Accordion */}
                <div>
                  <div className="flex items-center justify-between h-[46px] px-3.5">
                    <NavLink
                      to="/mam-xanh"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[15px] font-semibold text-[#2F403A] hover:text-[#4E8773] flex items-center gap-1.5 flex-1"
                    >
                      <span>Mầm Xanh 🌱</span>
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === 'mamXanh' ? null : 'mamXanh')}
                      className="p-1.5 text-[#5D726A] hover:text-[#4E8773] rounded-lg cursor-pointer"
                      aria-label="Mở danh mục Mầm Xanh"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'mamXanh' ? 'rotate-180 text-[#4E8773]' : ''}`} />
                    </button>
                  </div>
                  {mobileExpanded === 'mamXanh' && (
                    <div className="bg-[#FAF6EE] px-4 py-2 border-t border-[#EFE8D8] space-y-1">
                      {mamXanhSubmenu.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                                isActive ? 'bg-[#EAF3EF] text-[#4E8773] font-bold' : 'text-[#2F403A] hover:text-[#4E8773]'
                              }`
                            }
                          >
                            <Icon className="w-3.5 h-3.5 text-[#4E8773] shrink-0" />
                            <span>{sub.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 5. Khuyến mãi Accordion */}
                <div>
                  <div className="flex items-center justify-between h-[46px] px-3.5">
                    <NavLink
                      to="/khuyen-mai"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[15px] font-semibold text-[#2F403A] hover:text-[#4E8773] flex items-center gap-2 flex-1"
                    >
                      <span>{t('nav.promotions')}</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase bg-[#F39A73] text-white">
                        Sale
                      </span>
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === 'promo' ? null : 'promo')}
                      className="p-1.5 text-[#5D726A] hover:text-[#4E8773] rounded-lg cursor-pointer"
                      aria-label="Mở danh mục khuyến mãi"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'promo' ? 'rotate-180 text-[#4E8773]' : ''}`} />
                    </button>
                  </div>
                  {mobileExpanded === 'promo' && (
                    <div className="bg-[#FAF6EE] px-4 py-2 border-t border-[#EFE8D8] space-y-1">
                      {promotionsSubmenu.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                                isActive ? 'bg-[#EAF3EF] text-[#4E8773] font-bold' : 'text-[#2F403A] hover:text-[#4E8773]'
                              }`
                            }
                          >
                            <Icon className="w-3.5 h-3.5 text-[#ECA032] shrink-0" />
                            <span>{sub.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 6. Chính sách khách hàng Accordion */}
                <div>
                  <div className="flex items-center justify-between h-[46px] px-3.5">
                    <NavLink
                      to="/chinh-sach"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[15px] font-semibold text-[#2F403A] hover:text-[#4E8773] flex-1"
                    >
                      {t('nav.customerPolicy')}
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === 'policy' ? null : 'policy')}
                      className="p-1.5 text-[#5D726A] hover:text-[#4E8773] rounded-lg cursor-pointer"
                      aria-label="Mở chính sách khách hàng"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'policy' ? 'rotate-180 text-[#4E8773]' : ''}`} />
                    </button>
                  </div>
                  {mobileExpanded === 'policy' && (
                    <div className="bg-[#FAF6EE] px-4 py-2 border-t border-[#EFE8D8] space-y-1">
                      {policySubmenu.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                                isActive ? 'bg-[#EAF3EF] text-[#4E8773] font-bold' : 'text-[#2F403A] hover:text-[#4E8773]'
                              }`
                            }
                          >
                            <Icon className="w-3.5 h-3.5 text-[#4E8773] shrink-0" />
                            <span>{sub.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Nhóm 4: Tài khoản & Tra cứu (Account & Tracking) */}
              <div>
                <p className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5D726A] font-heading">
                  {language === 'en' ? 'Account & Order Tracking' : 'Tài khoản & Tra cứu'}
                </p>
                <div className="space-y-2">
                  {/* Tra cứu đơn hàng nhanh */}
                  <Link
                    to="/theo-doi-don-hang"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between h-[44px] px-3.5 rounded-xl bg-white border border-[#EFE8D8] text-[14px] font-semibold text-[#2F403A] hover:bg-[#FDF9F1] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Package className="w-4 h-4 text-[#355F52]" />
                      <span>{language === 'en' ? 'Track Order / Look up' : 'Tra cứu đơn hàng nhanh'}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8B9D95]" />
                  </Link>

                  {/* Account / Membership Box */}
                {isLoggedIn ? (
                  <div className="p-3.5 rounded-2xl bg-[#EAF3EF] border border-[#D2E3DC] mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#4E8773] text-white flex items-center justify-center font-bold text-sm">
                        {user?.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-[#2F403A] truncate">{user?.fullName}</p>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#355F52] mt-0.5">
                          <Sparkles className="w-3 h-3 text-[#ECA032]" />
                          <span className="font-bold text-[#355F52]">
                            {user?.mamPoints} {language === 'en' ? 'Mầm Points' : 'Điểm Mầm'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#D2E3DC]/60">
                      <Link
                        to="/tai-khoan"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2 px-2 rounded-xl bg-white text-xs font-bold text-[#355F52] hover:bg-[#FDF9F1] shadow-2xs"
                      >
                        {t('nav.account')}
                      </Link>
                      <Link
                        to="/diem-mam"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2 px-2 rounded-xl bg-white text-xs font-bold text-[#355F52] hover:bg-[#FDF9F1] shadow-2xs"
                      >
                        {language === 'en' ? 'Mầm Points' : 'Điểm Mầm'}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-[#FAF6EC] border border-[#F5DFA0] mb-3">
                    <p className="text-xs font-bold text-[#355F52] flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#ECA032]" />
                      {language === 'en' ? 'Mầm Kids Membership' : 'Thành viên Mầm Kids'}
                    </p>
                    <p className="text-[11px] text-[#6A7F77] mt-0.5">
                      {language === 'en' ? 'Sign up to receive 10% voucher & 100 Mầm Points' : 'Đăng ký ngay nhận voucher 10% & 100 Điểm Mầm'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2.5">
                      <Link
                        to="/dang-nhap"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2 px-2 rounded-xl bg-white border border-[#EFE8D8] text-xs font-bold text-[#2F403A]"
                      >
                        {t('nav.login')}
                      </Link>
                      <Link
                        to="/dang-ky"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2 px-2 rounded-xl bg-[#4E8773] text-white text-xs font-bold shadow-xs"
                      >
                        {t('nav.register')}
                      </Link>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  {isLoggedIn && (
                    <>
                      <Link
                        to="/voucher"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between h-[44px] px-3.5 rounded-xl text-[14px] font-medium text-[#2F403A] hover:bg-white transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <Ticket className="w-4 h-4 text-[#ECA032]" />
                          <span>{language === 'en' ? 'My Vouchers' : 'Voucher của tôi'}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#8B9D95]" />
                      </Link>

                      <Link
                        to="/lich-su-don-hang"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between h-[44px] px-3.5 rounded-xl text-[14px] font-medium text-[#2F403A] hover:bg-white transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-[#355F52]" />
                          <span>{language === 'en' ? 'Order History' : 'Lịch sử đơn hàng'}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#8B9D95]" />
                      </Link>

                      <Link
                        to="/thong-tin-be"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between h-[44px] px-3.5 rounded-xl text-[14px] font-medium text-[#2F403A] hover:bg-white transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <Baby className="w-4 h-4 text-[#E07A8A]" />
                          <span>{language === 'en' ? 'Child Profile' : 'Hồ sơ bé yêu'}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#8B9D95]" />
                      </Link>
                    </>
                  )}

                  <Link
                    to="/yeu-thich"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between h-[44px] px-3.5 rounded-xl text-[14px] font-medium text-[#2F403A] hover:bg-white transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-[#F3B59A]" />
                      <span>{t('nav.wishlist')}</span>
                    </span>
                    {wishlist.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F3B59A] text-xs font-bold text-[#2F403A]">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/gio-hang"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between h-[44px] px-3.5 rounded-xl text-[14px] font-medium text-[#2F403A] hover:bg-white transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingBag className="w-4 h-4 text-[#4E8773]" />
                      <span>{t('nav.cart')}</span>
                    </span>
                    {cartCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F5DFA0] text-xs font-bold text-[#2F403A]">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {isLoggedIn && (
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between h-[44px] px-3.5 rounded-xl text-[14px] font-medium text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>{t('nav.logout')}</span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

            {/* CTA cuối menu */}
            <div className="p-4 border-t border-[#EFE8D8] bg-[#FDF9F1] shrink-0">
              <Link
                to="/san-pham"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-[48px] rounded-2xl bg-[#4E8773] hover:bg-[#355F52] text-white font-bold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>{language === 'en' ? 'EXPLORE PRODUCTS' : 'KHÁM PHÁ SẢN PHẨM'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          <div
            className="fixed inset-0 bg-[#2F403A]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EFE8D8] p-6 z-10 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFE8D8]">
              <span className="font-bold text-[#2F403A] text-lg font-heading">
                {language === 'en' ? "Search kids' clothing" : 'Tìm kiếm trang phục cho bé'}
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-[#2F403A] hover:bg-[#EFF5F2] rounded-xl cursor-pointer"
                aria-label={t('nav.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                autoFocus
                className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-[#2F403A] placeholder-[#8B9D95] text-sm focus:outline-hidden focus:border-[#355F52] focus:ring-2 focus:ring-[#355F52]/20"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8B9D95]" />
              <button
                type="submit"
                className="absolute right-2 top-2 px-4 py-1.5 bg-[#355F52] hover:bg-[#28473D] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                {t('nav.search')}
              </button>
            </form>

            <div className="mt-4">
              {searchQuery.trim() ? (
                <div>
                  <div className="text-xs font-bold text-[#5D726A] mb-2 uppercase tracking-wider">
                    {language === 'en' ? `Suggested results (${searchResults.length})` : `Kết quả gợi ý (${searchResults.length})`}
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.map((p) => (
                        <Link
                          key={p.id}
                          to={`/san-pham/${p.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#FDF9F1] transition-colors"
                        >
                          <img
                            src={p.images[0]}
                            alt={getProductName(p)}
                            className="w-12 h-12 rounded-xl object-cover bg-[#FAF2DF]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#2F403A] truncate font-heading">
                              {getProductName(p)}
                            </p>
                            <p className="text-xs text-[#5D726A]">
                              {p.genderName} · {p.categoryName}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-[#355F52] tabular-nums font-heading">
                            {formatVND(p.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#5D726A] py-4 text-center">
                      {language === 'en' ? 'No products found matching this keyword.' : 'Không tìm thấy sản phẩm phù hợp với từ khóa này.'}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold text-[#5D726A] block mb-2">
                    {language === 'en' ? 'Popular search keywords:' : 'Từ khóa tìm kiếm phổ biến:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(language === 'en'
                      ? ['Organic cotton polo', 'Floral summer dress', 'Active shorts', 'Rainbow hoodie', 'Linen playset']
                      : ['Áo thun cotton Gấu Nhỏ', 'Váy hoa mùa hè', 'Quần short năng động', 'Áo hoodie Cầu Vồng', 'Đồ bộ Ngày Nắng']
                    ).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 rounded-xl bg-[#FDF9F1] text-xs font-medium text-[#2F403A] hover:bg-[#EFF5F2] hover:text-[#355F52] transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Account / Member Dropdown & Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#2F403A]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setAccountModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EFE8D8] p-6 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {isLoggedIn ? (
              /* ĐÃ ĐĂNG NHẬP: Menu thành viên */
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#FAF6EC]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF3EF] text-[#355F52] flex items-center justify-center font-black text-lg font-heading border border-[#D2E3DC]">
                      {user?.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2F403A] text-base font-heading">
                        {user?.fullName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#355F52] mt-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#ECA032]" />
                        <span className="font-bold text-[#355F52]">
                          {user?.mamPoints} {language === 'en' ? 'Mầm Points' : 'Điểm Mầm'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAccountModalOpen(false)}
                    className="p-1.5 text-[#2F403A] hover:bg-[#EFF5F2] rounded-xl cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-4 space-y-1 text-xs">
                  <Link
                    to="/tai-khoan"
                    onClick={() => setAccountModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FDF9F1] text-[#2F403A] hover:text-[#4E8773] font-bold transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <User className="w-4 h-4 text-[#4E8773]" />
                      <span>{language === 'en' ? 'My Account' : 'Tài khoản của tôi'}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#C1D2CB]" />
                  </Link>

                  <Link
                    to="/diem-mam"
                    onClick={() => setAccountModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FDF9F1] text-[#2F403A] hover:text-[#4E8773] font-bold transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#ECA032]" />
                      <span>{language === 'en' ? 'Earned Mầm Points' : 'Điểm Mầm tích lũy'}</span>
                    </span>
                    <span className="text-xs font-bold text-[#ECA032] tabular-nums">
                      {user?.mamPoints} {language === 'en' ? 'pts' : 'điểm'}
                    </span>
                  </Link>

                  <Link
                    to="/voucher"
                    onClick={() => setAccountModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FDF9F1] text-[#2F403A] hover:text-[#4E8773] font-bold transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Ticket className="w-4 h-4 text-[#4E8773]" />
                      <span>{language === 'en' ? 'My Vouchers' : 'Voucher của tôi'}</span>
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FAF6EC] text-[#355F52]">
                      {user?.vouchers.filter((v) => !v.isUsed).length} {language === 'en' ? 'available' : 'mã'}
                    </span>
                  </Link>

                  <Link
                    to="/lich-su-don-hang"
                    onClick={() => setAccountModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FDF9F1] text-[#2F403A] hover:text-[#4E8773] font-bold transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-[#355F52]" />
                      <span>{language === 'en' ? 'Order History' : 'Đơn hàng đã đặt'}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#C1D2CB]" />
                  </Link>

                  <Link
                    to="/thong-tin-be"
                    onClick={() => setAccountModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FDF9F1] text-[#2F403A] hover:text-[#4E8773] font-bold transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Baby className="w-4 h-4 text-[#E07A8A]" />
                      <span>{language === 'en' ? 'Child Profile' : 'Hồ sơ bé yêu'}</span>
                    </span>
                    <span className="text-xs font-semibold text-[#8B9D95]">
                      {user?.babies.length} {language === 'en' ? 'child(ren)' : 'bé'}
                    </span>
                  </Link>
                </div>

                <div className="pt-3 border-t border-[#FAF6EC] flex items-center justify-between">
                  <Link
                    to="/theo-doi-don-hang"
                    onClick={() => setAccountModalOpen(false)}
                    className="text-xs text-[#6A7F77] hover:underline"
                  >
                    {language === 'en' ? 'Quick order tracking' : 'Tra cứu đơn nhanh'}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setAccountModalOpen(false);
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* CHƯA ĐĂNG NHẬP: Nút Đăng nhập / Đăng ký + Tra cứu đơn */
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#EFE8D8]">
                  <div>
                    <h3 className="font-bold text-[#2F403A] text-lg font-heading">
                      {language === 'en' ? 'Mầm Kids Membership' : 'Thành viên Mầm Kids'}
                    </h3>
                    <p className="text-xs text-[#5D726A]">
                      {language === 'en' ? 'Sign in to get 10% voucher and earn Mầm Points' : 'Đăng nhập để nhận ưu đãi 10% và tích Điểm Mầm'}
                    </p>
                  </div>
                  <button
                    onClick={() => setAccountModalOpen(false)}
                    className="p-1.5 text-[#2F403A] hover:bg-[#EFF5F2] rounded-xl cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Login & Register CTAs */}
                <div className="py-5 space-y-3">
                  <Link
                    to="/dang-nhap"
                    onClick={() => setAccountModalOpen(false)}
                    className="w-full py-3 px-4 rounded-2xl bg-[#4E8773] hover:bg-[#355F52] text-white font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{language === 'en' ? 'SIGN IN TO ACCOUNT' : 'ĐĂNG NHẬP TÀI KHOẢN'}</span>
                  </Link>

                  <Link
                    to="/dang-ky"
                    onClick={() => setAccountModalOpen(false)}
                    className="w-full py-3 px-4 rounded-2xl bg-[#FAF6EC] hover:bg-[#F5DFA0] text-[#355F52] border border-[#F5DFA0] font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4 text-[#ECA032]" />
                    <span>{language === 'en' ? 'SIGN UP (FREE 10% VOUCHER + 100 PTS)' : 'ĐĂNG KÝ (TẶNG VOUCHER 10% + 100 ĐIỂM)'}</span>
                  </Link>
                </div>

                {/* Quick Order Lookup Form */}
                <div className="pt-4 border-t border-[#EFE8D8]">
                  <p className="text-xs font-bold text-[#2F403A] mb-2">
                    {language === 'en' ? 'Or quick order tracking without sign in:' : 'Hoặc tra cứu nhanh đơn hàng không cần đăng nhập:'}
                  </p>
                  <form onSubmit={handleLookupSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={lookupOrderId}
                      onChange={(e) => setLookupOrderId(e.target.value)}
                      placeholder={language === 'en' ? 'Enter order ID (e.g. MK-261234)...' : 'Nhập mã đơn hàng (Ví dụ: MK-261234)...'}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-[#2F403A] text-xs focus:outline-hidden focus:border-[#355F52]"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-[#355F52] hover:bg-[#28473D] text-white font-bold text-xs rounded-2xl transition-colors shadow-xs cursor-pointer"
                    >
                      {language === 'en' ? 'Track Order Progress' : 'Tra cứu tiến trình đơn hàng'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
