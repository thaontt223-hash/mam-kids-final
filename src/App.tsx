import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { WishlistPage } from './pages/WishlistPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SupportPage } from './pages/SupportPage';
import { FAQPage } from './pages/FAQPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnPolicyPage } from './pages/ReturnPolicyPage';
import { CustomerPoliciesPage } from './pages/CustomerPoliciesPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AccountPage } from './pages/AccountPage';
import { MamPointsPage } from './pages/MamPointsPage';
import { VouchersPage } from './pages/VouchersPage';
import { OrdersHistoryPage } from './pages/OrdersHistoryPage';
import { BabyInfoPage } from './pages/BabyInfoPage';
import { MamAgainPage } from './pages/MamAgainPage';
import { EcoStoryPage } from './pages/EcoStoryPage';
import { MamXanhPage } from './pages/MamXanhPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { Check, X } from 'lucide-react';

// Scroll to top or anchor upon route navigation
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
  }, [pathname, hash]);

  return null;
};

// Global Toast Banner
const ToastNotification: React.FC = () => {
  const { toast, dismissToast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 animate-bounce-subtle sm:max-w-sm pointer-events-auto">
      <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#355F52] text-white shadow-2xl border border-[#4E8773]/40">
        <div className="w-8 h-8 rounded-full bg-[#4E8773] flex items-center justify-center shrink-0 text-white">
          <Check className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold leading-tight">{toast.title}</p>
          {toast.description && (
            <p className="text-[11px] text-[#FDF9F1] truncate mt-0.5">
              {toast.description}
            </p>
          )}
        </div>
        <button
          onClick={dismissToast}
          className="p-1 rounded-lg hover:bg-white/10 text-[#FDF9F1] hover:text-white transition-colors"
          aria-label="Đóng thông báo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col w-full max-w-full min-w-0 overflow-x-hidden bg-[#FDF9F1] text-[#3E5149]">
              <Header />
              <main className="flex-1 w-full max-w-full min-w-0">
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/san-pham"
                  element={
                    <ProductsPage
                      initialGenderFilter="all"
                      pageTitle="Danh mục sản phẩm"
                      pageSubtitle="Khám phá trang phục dịu êm, an toàn và cá nhân hóa cho bé 3–12 tuổi"
                    />
                  }
                />
                <Route
                  path="/be-trai"
                  element={
                    <ProductsPage
                      initialGenderFilter="be-trai"
                      pageTitle="Thời trang Bé trai"
                      pageSubtitle="Những thiết kế năng động, lịch lãm và chuẩn chất liệu thoáng mát cho bé trai từ 3–12 tuổi"
                    />
                  }
                />
                <Route
                  path="/be-gai"
                  element={
                    <ProductsPage
                      initialGenderFilter="be-gai"
                      pageTitle="Thời trang Bé gái"
                      pageSubtitle="Váy hoa bồng bềnh, đồ bộ pastel dịu dàng và đầm công chúa xinh xắn cho bé gái từ 3–12 tuổi"
                    />
                  }
                />
                <Route path="/san-pham/:id" element={<ProductDetailPage />} />
                <Route path="/bo-suu-tap" element={<CollectionsPage />} />
                <Route path="/khuyen-mai" element={<PromotionsPage />} />
                <Route path="/promotions" element={<PromotionsPage />} />
                <Route path="/huong-dan-size" element={<SizeGuidePage />} />
                <Route path="/size-guide" element={<SizeGuidePage />} />
                <Route path="/yeu-thich" element={<WishlistPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/gio-hang" element={<CartPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/thanh-toan" element={<CheckoutPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/xac-nhan-don-hang" element={<OrderConfirmationPage />} />
                <Route path="/theo-doi-don-hang" element={<OrderTrackingPage />} />
                <Route path="/order-tracking" element={<OrderTrackingPage />} />
                {/* Member Account Routes */}
                <Route path="/dang-nhap" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dang-ky" element={<RegisterPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tai-khoan" element={<AccountPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/diem-mam" element={<MamPointsPage />} />
                <Route path="/voucher" element={<VouchersPage />} />
                <Route path="/lich-su-don-hang" element={<OrdersHistoryPage />} />
                <Route path="/orders" element={<OrdersHistoryPage />} />
                <Route path="/thong-tin-be" element={<BabyInfoPage />} />
                <Route path="/gioi-thieu" element={<AboutPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/lien-he" element={<ContactPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/ho-tro" element={<SupportPage />} />
                <Route path="/cau-hoi-thuong-gap" element={<FAQPage />} />
                <Route path="/faq" element={<FAQPage />} />
                {/* Customer Policies Routes */}
                <Route path="/chinh-sach" element={<CustomerPoliciesPage />} />
                <Route path="/chinh-sach/:policyKey" element={<CustomerPoliciesPage />} />
                <Route path="/quy-dinh-chung" element={<CustomerPoliciesPage initialPolicy="quy-dinh-chung" />} />
                <Route path="/dieu-khoan-su-dung" element={<CustomerPoliciesPage initialPolicy="dieu-khoan-su-dung" />} />
                <Route path="/dieu-khoan" element={<CustomerPoliciesPage initialPolicy="dieu-khoan-su-dung" />} />
                <Route path="/chinh-sach-giao-hang" element={<CustomerPoliciesPage initialPolicy="chinh-sach-giao-hang" />} />
                <Route path="/giao-hang" element={<CustomerPoliciesPage initialPolicy="chinh-sach-giao-hang" />} />
                <Route path="/chinh-sach-thanh-toan" element={<CustomerPoliciesPage initialPolicy="chinh-sach-thanh-toan" />} />
                <Route path="/thanh-toan-chinh-sach" element={<CustomerPoliciesPage initialPolicy="chinh-sach-thanh-toan" />} />
                <Route path="/chinh-sach-doi-tra" element={<CustomerPoliciesPage initialPolicy="chinh-sach-doi-tra" />} />
                <Route path="/doi-tra" element={<CustomerPoliciesPage initialPolicy="chinh-sach-doi-tra" />} />
                <Route path="/chinh-sach-bao-mat" element={<CustomerPoliciesPage initialPolicy="chinh-sach-bao-mat" />} />
                <Route path="/bao-mat" element={<CustomerPoliciesPage initialPolicy="chinh-sach-bao-mat" />} />
                <Route path="/khach-hang-than-thiet" element={<CustomerPoliciesPage initialPolicy="khach-hang-than-thiet" />} />
                <Route path="/chinh-sach-diem-mam" element={<CustomerPoliciesPage initialPolicy="diem-mam" />} />
                {/* USP Mầm Xanh & Mầm Again Routes */}
                <Route path="/mam-again" element={<MamAgainPage />} />
                <Route path="/eco-story" element={<EcoStoryPage />} />
                <Route path="/eco-story/:id" element={<EcoStoryPage />} />
                <Route path="/mam-xanh" element={<MamXanhPage />} />
                {/* Fallback to home */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            <ToastNotification />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  </LanguageProvider>
  );
}
