import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, ShieldCheck, Sparkles, Truck, RefreshCw } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="w-full max-w-full min-w-0 overflow-x-hidden bg-[#285A48] text-[#E6F1EB] mt-12 sm:mt-16 border-t border-[#4E8773]/40">
      {/* 4 Brand Core Values Top Banner */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8 bg-[#1F4638]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-[#F4C95D] text-[#285A48]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === 'en' ? 'Personalized for Kids' : 'Cá nhân hóa cho bé'}
              </h4>
              <p className="text-xs text-[#E6F1EB]/80 mt-0.5">
                {language === 'en' ? 'Meaningful custom name & icon embroidery' : 'Thêu tên & icon riêng của bé đầy ý nghĩa'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-[#F4C95D] text-[#285A48]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === 'en' ? '100% Skin-Safe Materials' : '100% Chất liệu an toàn'}
              </h4>
              <p className="text-xs text-[#E6F1EB]/80 mt-0.5">
                {language === 'en' ? 'Certified organic cotton gentle on sensitive skin' : 'Bông cotton hữu cơ lành tính cho da nhạy cảm'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-[#F4C95D] text-[#285A48]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === 'en' ? 'Nationwide Delivery' : 'Giao hàng toàn quốc'}
              </h4>
              <p className="text-xs text-[#E6F1EB]/80 mt-0.5">
                {language === 'en' ? 'Freeship from 300k · Free Mầm Kids tote included' : 'Freeship từ 300k · Tặng kèm túi tote Mầm Kids'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="p-2.5 rounded-xl bg-[#F4C95D] text-[#285A48]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === 'en' ? '15-Day Size Exchange' : 'Đổi trả trong 15 ngày'}
              </h4>
              <p className="text-xs text-[#E6F1EB]/80 mt-0.5">
                {language === 'en' ? 'Courier doorstep size exchange support' : 'Shipper hỗ trợ mang size mới đổi tận nhà'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links: Exactly 4 Columns as requested */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* CỘT 1: MẦM KIDS */}
          <div className="space-y-4">
            <Logo size="md" showSlogan={true} variant="dark" />
            <p className="text-xs text-[#E6F1EB]/85 leading-relaxed mt-2">
              {language === 'en'
                ? 'MẦM KIDS is a premium Vietnamese kids’ fashion brand for ages 3–12. Growing with love, natural materials, and gentle care for our children.'
                : 'Thương hiệu thời trang trẻ em thuần Việt cho bé từ 3–12 tuổi. Không chỉ mặc đẹp, cùng bé gieo thói quen xanh và lớn lên trong yêu thương.'}
            </p>

            {/* Direct Contact info */}
            <div className="pt-2 text-xs text-[#E6F1EB]/90 space-y-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F4C95D] shrink-0" />
                <span>Hotline: <strong className="text-white">1900 6868</strong> (8h – 21h)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F4C95D] shrink-0" />
                <span>chamsockhachhang@mamkids.vn</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F4C95D] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">
                  186 Nguyễn Thị Minh Khai, Q.3, TP.HCM · 45 Phố Huế, Q. Hai Bà Trưng, HN
                </span>
              </div>
            </div>

            {/* Brand Links */}
            <div className="pt-2 text-xs flex flex-wrap gap-x-3 gap-y-1 text-[#F4C95D]">
              <Link to="/gioi-thieu" className="hover:underline">Về Mầm Kids</Link>
              <span>·</span>
              <Link to="/gioi-thieu#chat-lieu" className="hover:underline">Chất liệu an toàn</Link>
              <span>·</span>
              <Link to="/lien-he" className="hover:underline">Liên hệ</Link>
            </div>
          </div>

          {/* CỘT 2: MUA SẮM */}
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase tracking-wider mb-4 font-heading flex items-center gap-1.5">
              <span>🛍️</span>
              <span>{language === 'en' ? 'Shopping' : 'Mua sắm'}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E6F1EB]">
              <li>
                <Link to="/san-pham" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'All Products' : 'Tất cả sản phẩm'}
                </Link>
              </li>
              <li>
                <Link to="/be-trai" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Boys’ Fashion' : 'Thời trang Bé trai'}
                </Link>
              </li>
              <li>
                <Link to="/be-gai" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Girls’ Fashion' : 'Thời trang Bé gái'}
                </Link>
              </li>
              <li>
                <Link to="/san-pham?category=bo-do" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Coordinated Sets' : 'Set phối hoàn chỉnh'}
                </Link>
              </li>
              <li>
                <Link to="/bo-suu-tap" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Seasonal Lookbook' : 'Bộ sưu tập theo mùa'}
                </Link>
              </li>
              <li>
                <Link to="/san-pham?category=phu-kien" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Accessories & Footwear' : 'Phụ kiện & Giày dép'}
                </Link>
              </li>
              <li>
                <Link to="/huong-dan-size" className="hover:text-[#F4C95D] transition-colors">
                  {t('nav.sizeGuide')}
                </Link>
              </li>
              <li>
                <Link to="/khuyen-mai" className="hover:text-[#F4C95D] transition-colors flex items-center gap-1">
                  <span>Ưu đãi & Khuyến mãi</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#F4C95D] text-[#285A48] text-[9px] font-bold">HOT</span>
                </Link>
              </li>
              <li>
                <Link to="/yeu-thich" className="hover:text-[#F4C95D] transition-colors">
                  {t('nav.wishlist')}
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 3: MẦM XANH */}
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase tracking-wider mb-4 font-heading flex items-center gap-1.5">
              <span>🌱</span>
              <span>{language === 'en' ? 'Mầm Xanh' : 'Mầm Xanh'}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E6F1EB]">
              <li>
                <Link to="/mam-xanh" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Our Green Philosophy' : 'Triết lý Mầm Xanh'}
                </Link>
              </li>
              <li>
                <Link to="/eco-story" className="hover:text-[#F4C95D] transition-colors flex items-center gap-1">
                  <span>📚 Thư viện Eco Stories</span>
                </Link>
              </li>
              <li>
                <Link to="/mam-again" className="hover:text-[#F4C95D] transition-colors flex items-center gap-1">
                  <span>♻️ Mầm Again – Trao lại đồ cũ</span>
                </Link>
              </li>
              <li>
                <Link to="/gioi-thieu#chat-lieu" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Safe Organic Fabrics' : 'Sợi bông Organic tự nhiên'}
                </Link>
              </li>
              <li>
                <Link to="/diem-mam" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Earn Green Points' : 'Tích Điểm Mầm xanh'}
                </Link>
              </li>
            </ul>

            {/* Micro Eco Banner */}
            <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-[#E6F1EB]/85 leading-snug">
              <span>🌱 1 chiếc áo – 1 câu chuyện – 1 hành động xanh bảo vệ trái đất cho bé.</span>
            </div>
          </div>

          {/* CỘT 4: HỖ TRỢ */}
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase tracking-wider mb-4 font-heading flex items-center gap-1.5">
              <span>🛡️</span>
              <span>{language === 'en' ? 'Support' : 'Hỗ trợ'}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E6F1EB]">
              <li>
                <Link to="/theo-doi-don-hang" className="hover:text-[#F4C95D] transition-colors font-medium text-white flex items-center gap-1">
                  <span>🔍 {language === 'en' ? 'Track Order' : 'Tra cứu đơn hàng'}</span>
                </Link>
              </li>
              <li>
                <Link to="/quy-dinh-chung" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'General Regulations' : 'Quy định chung'}
                </Link>
              </li>
              <li>
                <Link to="/dieu-khoan-su-dung" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Terms of Service' : 'Điều khoản sử dụng'}
                </Link>
              </li>
              <li>
                <Link to="/chinh-sach-giao-hang" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Shipping Policy' : 'Chính sách giao hàng'}
                </Link>
              </li>
              <li>
                <Link to="/chinh-sach-thanh-toan" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Payment Policy' : 'Chính sách thanh toán'}
                </Link>
              </li>
              <li>
                <Link to="/chinh-sach-doi-tra" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Return Policy' : 'Chính sách đổi trả'}
                </Link>
              </li>
              <li>
                <Link to="/chinh-sach-bao-mat" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Privacy Policy' : 'Chính sách bảo mật'}
                </Link>
              </li>
              <li>
                <Link to="/khach-hang-than-thiet" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Loyalty Program' : 'Khách hàng thân thiết'}
                </Link>
              </li>
              <li>
                <Link to="/chinh-sach-diem-mam" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'Mầm Points' : 'Điểm Mầm'}
                </Link>
              </li>
              <li>
                <Link to="/cau-hoi-thuong-gap" className="hover:text-[#F4C95D] transition-colors">
                  {language === 'en' ? 'FAQ' : 'Câu hỏi thường gặp'}
                </Link>
              </li>
            </ul>

            {/* Social Network Links */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <span className="text-xs font-semibold text-[#D4E5DE] block mb-2">
                {language === 'en' ? 'Connect with Mầm Kids:' : 'Kết nối cùng Mầm Kids:'}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                >
                  Zalo
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8 text-xs text-[#D4E5DE] text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            {language === 'en'
              ? '© 2026 MẦM KIDS. Designed and crafted with full love for Vietnamese children.'
              : '© 2026 MẦM KIDS. Thiết kế và phát triển với trọn vẹn yêu thương cho các mầm non Việt Nam.'}
          </p>
          <p className="flex items-center gap-1.5 text-[#F5DFA0] font-medium">
            <span>
              {language === 'en'
                ? 'Mầm Kids – More Than Style, Growing Green Habits Together.'
                : 'Mầm Kids – Không chỉ mặc đẹp, cùng bé gieo thói quen xanh.'}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
