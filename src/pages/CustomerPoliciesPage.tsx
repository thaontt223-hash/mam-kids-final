import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import {
  FileText,
  ShieldCheck,
  Truck,
  CreditCard,
  RefreshCw,
  Lock,
  Award,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
  Gift,
  Clock,
  Heart,
  ArrowRight,
  Leaf
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export type PolicyKey =
  | 'quy-dinh-chung'
  | 'dieu-khoan-su-dung'
  | 'chinh-sach-giao-hang'
  | 'chinh-sach-thanh-toan'
  | 'chinh-sach-doi-tra'
  | 'chinh-sach-bao-mat'
  | 'khach-hang-than-thiet'
  | 'diem-mam';

interface PolicyItem {
  id: PolicyKey;
  path: string;
  title: string;
  titleEn: string;
  shortTitle: string;
  shortTitleEn: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  taglineEn: string;
}

export const POLICIES: PolicyItem[] = [
  {
    id: 'quy-dinh-chung',
    path: '/quy-dinh-chung',
    title: 'Quy định chung',
    titleEn: 'General Provisions',
    shortTitle: 'Quy định chung',
    shortTitleEn: 'General Rules',
    icon: FileText,
    tagline: 'Phạm vi hoạt động, nguyên tắc phục vụ và cam kết chất lượng của Mầm Kids.',
    taglineEn: 'Operational scope, service guidelines, and premium quality commitments of Mầm Kids.'
  },
  {
    id: 'dieu-khoan-su-dung',
    path: '/dieu-khoan-su-dung',
    title: 'Điều khoản sử dụng',
    titleEn: 'Terms of Service',
    shortTitle: 'Điều khoản sử dụng',
    shortTitleEn: 'Terms of Use',
    icon: ShieldCheck,
    tagline: 'Quyền lợi, trách nhiệm và hướng dẫn mua sắm trực tuyến cho phụ huynh.',
    taglineEn: 'Rights, responsibilities, and online shopping guidelines for parents.'
  },
  {
    id: 'chinh-sach-giao-hang',
    path: '/chinh-sach-giao-hang',
    title: 'Chính sách giao hàng',
    titleEn: 'Shipping Policy',
    shortTitle: 'Giao hàng',
    shortTitleEn: 'Shipping',
    icon: Truck,
    tagline: 'Miễn phí vận chuyển từ 300k toàn quốc, tặng kèm túi tote canvas.',
    taglineEn: 'Nationwide free shipping for orders from 300k, free canvas tote bag included.'
  },
  {
    id: 'chinh-sach-thanh-toan',
    path: '/chinh-sach-thanh-toan',
    title: 'Chính sách thanh toán',
    titleEn: 'Payment Policy',
    shortTitle: 'Thanh toán',
    shortTitleEn: 'Payment',
    icon: CreditCard,
    tagline: 'Thanh toán khi nhận hàng COD, VietQR 24/7, thẻ và ví điện tử an toàn.',
    taglineEn: 'Cash on delivery (COD), instant 24/7 VietQR, secure card, and digital e-wallets.'
  },
  {
    id: 'chinh-sach-doi-tra',
    path: '/chinh-sach-doi-tra',
    title: 'Chính sách đổi trả',
    titleEn: 'Return & Exchange Policy',
    shortTitle: 'Đổi trả 15 ngày',
    shortTitleEn: '15-Day Exchange',
    icon: RefreshCw,
    tagline: 'Đổi size miễn phí trong 15 ngày, shipper mang size mới đổi tận nhà.',
    taglineEn: 'Free 15-day home sizing exchange with doorstep swap by our courier.'
  },
  {
    id: 'chinh-sach-bao-mat',
    path: '/chinh-sach-bao-mat',
    title: 'Chính sách bảo mật',
    titleEn: 'Privacy Policy',
    shortTitle: 'Bảo mật thông tin',
    shortTitleEn: 'Data Privacy',
    icon: Lock,
    tagline: 'Bảo vệ tuyệt đối thông tin gia đình và số đo của bé yêu.',
    taglineEn: 'Strict, encrypted protection for family information and child measurements.'
  },
  {
    id: 'khach-hang-than-thiet',
    path: '/khach-hang-than-thiet',
    title: 'Khách hàng thân thiết',
    titleEn: 'Loyalty Program',
    shortTitle: 'Khách hàng thân thiết',
    shortTitleEn: 'Membership Tiers',
    icon: Award,
    tagline: '3 hạng hội viên Mầm Yêu Thương với ưu đãi giảm giá và quà sinh nhật bé.',
    taglineEn: '3 tiers of Mầm Yêu Thương membership with lifetime discounts and birthday gifts.'
  },
  {
    id: 'diem-mam',
    path: '/chinh-sach-diem-mam',
    title: 'Chính sách Điểm Mầm',
    titleEn: 'Mầm Points Policy',
    shortTitle: 'Điểm Mầm',
    shortTitleEn: 'Mầm Points',
    icon: Sparkles,
    tagline: 'Tích điểm qua mua sắm và hành động xanh, khấu trừ trực tiếp khi thanh toán.',
    taglineEn: 'Earn points through purchases and eco actions, redeemable directly at checkout.'
  }
];

interface CustomerPoliciesPageProps {
  initialPolicy?: PolicyKey;
}

export const CustomerPoliciesPage: React.FC<CustomerPoliciesPageProps> = ({ initialPolicy }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { policyKey } = useParams<{ policyKey?: string }>();
  const { language } = useLanguage();

  // Resolve active tab from props, param or pathname
  const getActiveFromPath = (): PolicyKey => {
    if (initialPolicy) return initialPolicy;
    if (policyKey && POLICIES.some((p) => p.id === policyKey)) {
      return policyKey as PolicyKey;
    }
    if (pathname.includes('quy-dinh-chung')) return 'quy-dinh-chung';
    if (pathname.includes('dieu-khoan-su-dung') || pathname.includes('dieu-khoan')) return 'dieu-khoan-su-dung';
    if (pathname.includes('chinh-sach-giao-hang') || pathname.includes('giao-hang')) return 'chinh-sach-giao-hang';
    if (pathname.includes('chinh-sach-thanh-toan') || pathname.includes('thanh-toan')) return 'chinh-sach-thanh-toan';
    if (pathname.includes('chinh-sach-doi-tra') || pathname.includes('doi-tra')) return 'chinh-sach-doi-tra';
    if (pathname.includes('chinh-sach-bao-mat') || pathname.includes('bao-mat')) return 'chinh-sach-bao-mat';
    if (pathname.includes('khach-hang-than-thiet') || pathname.includes('hoi-vien')) return 'khach-hang-than-thiet';
    if (pathname.includes('chinh-sach-diem-mam') || pathname.includes('diem-mam')) return 'diem-mam';
    return 'quy-dinh-chung';
  };

  const [activeTab, setActiveTab] = useState<PolicyKey>(getActiveFromPath());

  useEffect(() => {
    setActiveTab(getActiveFromPath());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, initialPolicy, policyKey]);

  const handleSelectTab = (key: PolicyKey) => {
    setActiveTab(key);
    const target = POLICIES.find((p) => p.id === key);
    if (target) {
      navigate(target.path);
    }
  };

  const currentPolicy = POLICIES.find((p) => p.id === activeTab) || POLICIES[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#5D726A]">
        <Link to="/" className="hover:text-[#355F52]">
          {language === 'en' ? 'Home' : 'Trang chủ'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/chinh-sach" className="hover:text-[#355F52]">
          {language === 'en' ? 'Customer Policies' : 'Chính sách khách hàng'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#2F403A] font-semibold">
          {language === 'en' ? currentPolicy.titleEn : currentPolicy.title}
        </span>
      </nav>

      {/* Hero Header Banner */}
      <div className="rounded-[32px] bg-gradient-to-br from-[#EAF3EF] via-[#F4F8F6] to-[#FDF9F1] p-6 sm:p-10 border border-[#D2E3DC] shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#285A48] text-white text-xs font-bold shadow-2xs">
            <span>🌱</span>
            <span>
              {language === 'en' ? 'PARENT REASSURANCE & RIGHTS' : 'QUYỀN LỢI & AN TÂM CHO PHỤ HUYNH'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#285A48] font-heading tracking-tight">
            {language === 'en' ? 'Mầm Kids Customer Policies' : 'Chính Sách Khách Hàng Mầm Kids'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5D726A] leading-relaxed">
            {language === 'en'
              ? 'We understand that parents always desire the safest, most comfortable apparel for their little ones. All Mầm Kids policies are transparent, clear, and centered around your family peace of mind and convenience.'
              : 'Chúng tôi hiểu rằng ba mẹ luôn muốn điều tốt nhất và an toàn nhất cho con yêu. Mọi chính sách tại Mầm Kids được thiết kế rõ ràng, minh bạch, lấy sự an tâm và tiện lợi của gia đình bạn làm trọng tâm.'}
          </p>
        </div>

        {/* Quick Contacts Badge */}
        <div className="mt-6 pt-5 border-t border-[#D2E3DC] flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#355F52]">
          <div className="flex items-center gap-2 font-semibold">
            <Phone className="w-4 h-4 text-[#4E8773]" />
            <span>
              {language === 'en' ? 'Support Hotline: ' : 'Hotline hỗ trợ: '}
              <strong className="text-[#285A48]">1900 6868</strong> (8h – 21h)
            </span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <Mail className="w-4 h-4 text-[#4E8773]" />
            <span>
              Email: <strong className="text-[#285A48]">chamsockhachhang@mamkids.vn</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Policy Nav Sidebar & Policy Details Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Navigation: 8 Policies */}
        <div className="lg:col-span-4 bg-white rounded-[24px] p-4 sm:p-5 border border-[#EFE8D8] shadow-xs space-y-1.5 sticky top-24">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7A8E85] px-3 py-2 font-heading">
            {language === 'en' ? 'Policy Categories (8 items)' : 'Danh mục chính sách (8 mục)'}
          </h2>
          <div className="space-y-1">
            {POLICIES.map((policy, idx) => {
              const Icon = policy.icon;
              const isActive = activeTab === policy.id;
              return (
                <button
                  key={policy.id}
                  onClick={() => handleSelectTab(policy.id)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#355F52] text-white shadow-xs font-bold'
                      : 'text-[#2F403A] hover:bg-[#FAF6EE] hover:text-[#355F52]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/20 text-[#F5DFA0]' : 'bg-[#EAF3EF] text-[#355F52]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="truncate">
                      {idx + 1}. {language === 'en' ? policy.shortTitleEn : policy.shortTitle}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-[#F5DFA0] translate-x-0.5' : 'text-[#A0B0A8]'
                  }`} />
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-3 border-t border-[#EFE8D8] px-3">
            <Link
              to="/cau-hoi-thuong-gap"
              className="text-xs font-bold text-[#4E8773] hover:text-[#285A48] flex items-center gap-1.5 hover:underline"
            >
              <span>{language === 'en' ? 'View Frequently Asked Questions (FAQ)' : 'Xem thêm câu hỏi thường gặp (FAQ)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Content: Policy Detail Container */}
        <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-10 border border-[#EFE8D8] shadow-xs space-y-8 min-w-0">
          {/* Header of Active Policy */}
          <div className="border-b border-[#EFE8D8] pb-6 space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-[#EAF3EF] text-[#355F52] flex items-center justify-center shrink-0">
                <currentPolicy.icon className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4E8773] block font-heading">
                  {language === 'en' ? 'Mầm Kids Customer Policy' : 'Chính sách khách hàng Mầm Kids'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#2F403A] font-heading">
                  {language === 'en' ? currentPolicy.titleEn : currentPolicy.title}
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#5D726A] pt-1">
              {language === 'en' ? currentPolicy.taglineEn : currentPolicy.tagline}
            </p>
          </div>

          {/* Policy Body Content Based on Active Tab */}
          <div className="space-y-6 text-xs sm:text-sm text-[#3E5149] leading-relaxed">
            {/* 1. QUY ĐỊNH CHUNG */}
            {activeTab === 'quy-dinh-chung' && (
              <div className="space-y-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4E8773]" />
                    {language === 'en' ? '1. Scope of Operation & Target Audience' : '1. Phạm vi hoạt động & Đối tượng phục vụ'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'MẦM KIDS is an authentic Vietnamese kids fashion brand designing and producing tailored standard fit apparel for children aged 3 to 12. All products are distributed officially through our mamkids.vn web store and showroom locations in Ho Chi Minh City and Hanoi.'
                      : 'MẦM KIDS là thương hiệu thời trang trẻ em thuần Việt, thiết kế và sản xuất trang phục may đo chuẩn phom cho các bé từ 3 đến 12 tuổi. Tất cả các sản phẩm được phân phối chính thức qua website mamkids.vn và chuỗi showroom tại TP. Hồ Chí Minh và Hà Nội.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '2. Product Quality Commitments' : '2. Cam kết chất lượng sản phẩm'}
                  </h3>
                  <ul className="space-y-2 list-disc pl-5 text-[#5D726A]">
                    <li>
                      <strong>{language === 'en' ? '100% Natural Fibers: ' : '100% sợi tự nhiên: '}</strong>
                      {language === 'en'
                        ? 'Prioritizing organic cotton, bamboo fibers, and bio-washed linen free from abrasiveness.'
                        : 'Ưu tiên vải Organic Cotton, sợi tre (Bamboo), và Linen đã qua xử lý sinh học không xơ ráp.'}
                    </li>
                    <li>
                      <strong>{language === 'en' ? 'Oeko-Tex Standard 100 Safety Certified: ' : 'Chuẩn an toàn Oeko-Tex Standard 100: '}</strong>
                      {language === 'en'
                        ? 'Completely free from hazardous chemical dyes, thoroughly safe for sensitive child skin.'
                        : 'Không tồn dư hóa chất nhuộm độc hại, an toàn tuyệt đối với làn da non nớt của trẻ.'}
                    </li>
                    <li>
                      <strong>{language === 'en' ? 'Smooth Concealed Seams: ' : 'Đường may giấu chỉ phẳng mịn: '}</strong>
                      {language === 'en'
                        ? 'Collar seams, elastic waistbands, and armholes are tailored smoothly to prevent itching or chafing.'
                        : 'Từng đường may quanh cổ áo, cạp chun và nách đều được xử lý để bé mặc vào không bị cọ xát hay ngứa ngáy.'}
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '3. Listed Pricing & Invoicing' : '3. Giá bán niêm yết & Hóa đơn'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'All product prices on the website are publicly displayed in Vietnamese Dong (VND) and include VAT. Mầm Kids commits to zero hidden surcharges beyond standard shipping (if below the Free Shipping threshold).'
                      : 'Tất cả giá sản phẩm trên website đều là giá niêm yết công khai bằng Đồng Việt Nam (VND) và đã bao gồm thuế Giá Trị Gia Tăng (VAT). Mầm Kids cam kết không phát sinh bất kỳ khoản phụ phí ẩn nào ngoài chi phí vận chuyển (nếu đơn hàng chưa đủ điều kiện Freeship).'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '4. Customer Care Hours' : '4. Thời gian hỗ trợ phụ huynh'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'Our customer support team is available daily from 8:00 to 21:00 (including weekends and holidays) to assist with sizing advice, tracking, and fast exchange handling.'
                      : 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng đồng hành từ 8:00 đến 21:00 hàng ngày (kể cả Thứ Bảy, Chủ Nhật và ngày lễ) để hỗ trợ tư vấn size, theo dõi đơn hoặc xử lý đổi hàng nhanh chóng.'}
                  </p>
                </div>
              </div>
            )}

            {/* 2. ĐIỀU KHOẢN SỬ DỤNG */}
            {activeTab === 'dieu-khoan-su-dung' && (
              <div className="space-y-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#EAF3EF] border border-[#D2E3DC] space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '1. Account Registration & Child Profile' : '1. Đăng ký tài khoản & Hồ sơ của bé'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? "When creating an account at Mầm Kids, parents can save sizing profiles (height, weight, birthday). This data allows the system to recommend accurate fits and send birthday surprises each year."
                      : 'Khi tạo tài khoản tại Mầm Kids, ba mẹ có thể lưu lại hồ sơ số đo (chiều cao, cân nặng, ngày sinh) của con. Dữ liệu này giúp hệ thống tự động gợi ý kích thước chuẩn xác nhất và gửi quà sinh nhật ý nghĩa đến bé mỗi năm.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '2. Ordering Process & Order Confirmation' : '2. Quy trình đặt hàng & Xác nhận'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'Orders are confirmed immediately upon completion of online checkout or COD verification. An order reference code is dispatched via email/SMS for easy real-time tracking.'
                      : 'Đơn hàng được xác nhận ngay khi ba mẹ hoàn tất bước thanh toán trực tuyến hoặc xác nhận đơn COD. Mã đơn hàng sẽ được gửi qua email/tin nhắn để phụ huynh dễ dàng tra cứu lộ trình vận chuyển bất kỳ lúc nào.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '3. Personalization Service (Custom Name Embroidery)' : '3. Dịch vụ cá nhân hóa (Thêu tên bé)'}
                  </h3>
                  <ul className="space-y-2 list-disc pl-5 text-[#5D726A]">
                    <li>
                      {language === 'en'
                        ? "Parents can optionally have their child's name and favorite icons embroidered on garments."
                        : 'Ba mẹ được tùy chọn thêu tên của bé, icon yêu thích (mầm cây, ngôi sao, trái tim) ở ngực hoặc lưng áo.'}
                    </li>
                    <li>
                      {language === 'en'
                        ? "Please verify spelling before finalizing the order."
                        : 'Vui lòng kiểm tra kỹ chính tả tên của bé trước khi bấm đặt hàng.'}
                    </li>
                    <li>
                      {language === 'en'
                        ? 'Custom embroidered items are still eligible for exchanges if sizing does not fit.'
                        : 'Sản phẩm thêu tên vẫn được Mầm Kids bảo hành và đổi lại nếu kích cỡ thực tế không vừa vặn theo bảng size chuẩn.'}
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '4. Brand Copyright & Community Stewardship' : '4. Bản quyền thương hiệu & Trách nhiệm cộng đồng'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'All imagery, fashion designs, brand emblems, and Mầm Xanh story materials are the intellectual property of Mầm Kids. Commercial reproduction requires prior written permission.'
                      : 'Toàn bộ hình ảnh, thiết kế thời trang, biểu tượng logo và các câu chuyện Mầm Xanh thuộc bản quyền độc quyền của Mầm Kids. Mọi hình thức sao chép thương mại phải có sự đồng ý chính thức bằng văn bản.'}
                  </p>
                </div>
              </div>
            )}

            {/* 3. CHÍNH SÁCH GIAO HÀNG */}
            {activeTab === 'chinh-sach-giao-hang' && (
              <div className="space-y-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF2DF] border border-[#F4E3BA] flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#285A48] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block text-[#285A48] font-bold">
                      {language === 'en'
                        ? 'Nationwide Free Shipping on orders from 300,000 VND'
                        : 'Freeship toàn quốc cho đơn hàng từ 300.000 VND'}
                    </strong>
                    <p className="text-xs text-[#5D6F66]">
                      {language === 'en'
                        ? 'Applied automatically at checkout. Every order includes 1 premium Mầm Kids canvas tote bag.'
                        : 'Áp dụng tự động tại bước thanh toán. Mọi đơn hàng đều được tặng kèm 01 túi tote canvas cao cấp của Mầm Kids.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '1. Nationwide Shipping Rates' : '1. Biểu phí giao hàng toàn quốc'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8]">
                      <span className="text-xs font-bold text-[#4E8773] block mb-1">
                        {language === 'en' ? 'ORDERS FROM 300,000 VND' : 'ĐƠN TỪ 300.000 VND'}
                      </span>
                      <div className="text-lg font-black text-[#285A48]">
                        {language === 'en' ? '100% Free' : 'Miễn phí 100%'}
                      </div>
                      <p className="text-xs text-[#5D726A] mt-1">
                        {language === 'en' ? 'Delivered across all 63 provinces nationwide.' : 'Giao tận tay trên khắp 63 tỉnh thành.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8]">
                      <span className="text-xs font-bold text-[#7A8E85] block mb-1">
                        {language === 'en' ? 'ORDERS UNDER 300,000 VND' : 'ĐƠN DƯỚI 300.000 VND'}
                      </span>
                      <div className="text-lg font-black text-[#285A48]">25.000 VND</div>
                      <p className="text-xs text-[#5D726A] mt-1">
                        {language === 'en' ? 'Flat-rate delivery nationwide.' : 'Đồng giá ưu đãi cho mọi khu vực toàn quốc.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '2. Estimated Delivery Timeframes' : '2. Thời gian giao hàng dự kiến'}
                  </h3>
                  <ul className="space-y-2 list-disc pl-5 text-[#5D726A]">
                    <li>
                      <strong>{language === 'en' ? 'Hanoi & HCMC Metro: ' : 'Nội thành TP. Hồ Chí Minh & Hà Nội: '}</strong>
                      {language === 'en' ? 'Delivered within 24 – 48 hours.' : 'Nhận hàng sau 24 – 48 giờ.'}
                    </li>
                    <li>
                      <strong>{language === 'en' ? 'Other provinces: ' : 'Các tỉnh thành và huyện xã khác: '}</strong>
                      {language === 'en' ? 'Delivered within 2 – 3 business days.' : 'Nhận hàng sau 2 – 3 ngày làm việc.'}
                    </li>
                    <li>
                      {language === 'en'
                        ? 'Custom embroidery requests: Please allow an extra 12 – 24 hours for artisan embroidery.'
                        : 'Đối với đơn có yêu cầu thêu tên riêng: Thời gian chuẩn bị cộng thêm từ 12 – 24 giờ để nghệ nhân hoàn thiện tỉ mỉ.'}
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '3. Packaging & Inspection upon Delivery' : '3. Đóng gói & Quyền đồng kiểm khi nhận hàng'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'Garments are delivered in recyclable eco-friendly carton packaging with fresh parchment wrapping. Parents have full inspection rights before paying the courier.'
                      : 'Trang phục được đựng trong hộp giấy carton tái chế thân thiện môi trường, gói giấy nến thơm sạch sẽ. Ba mẹ hoàn toàn có quyền mở hộp kiểm tra số lượng, màu sắc và độ vừa vặn trước khi nhận và thanh toán tiền cho bưu tá.'}
                  </p>
                </div>
              </div>
            )}

            {/* 4. CHÍNH SÁCH THANH TOÁN */}
            {activeTab === 'chinh-sach-thanh-toan' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '1. Supported Payment Options' : '1. Các phương thức thanh toán được hỗ trợ'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-1">
                      <strong className="block text-[#2F403A] font-bold">
                        {language === 'en' ? 'Cash on Delivery (COD)' : 'Thanh toán khi nhận hàng (COD)'}
                      </strong>
                      <p className="text-xs text-[#5D726A]">
                        {language === 'en'
                          ? 'Pay upon home delivery after inspecting garments. 100% peace of mind.'
                          : 'Nhận hàng tận nhà, kiểm tra hàng ưng ý mới thanh toán tiền mặt cho shipper. An tâm 100%.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-1">
                      <strong className="block text-[#2F403A] font-bold">
                        {language === 'en' ? 'VietQR Wire Transfer 24/7' : 'Chuyển khoản VietQR 24/7'}
                      </strong>
                      <p className="text-xs text-[#5D726A]">
                        {language === 'en'
                          ? 'Scan QR via any bank app; automated verification within 30 seconds.'
                          : 'Quét mã QR qua app ngân hàng bất kỳ, hệ thống đối soát và xác nhận đơn tự động sau 30 giây.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-1">
                      <strong className="block text-[#2F403A] font-bold">
                        {language === 'en' ? 'Cards (ATM & Visa / Master)' : 'Thẻ ATM & Thẻ Quốc tế (Visa / Master)'}
                      </strong>
                      <p className="text-xs text-[#5D726A]">
                        {language === 'en'
                          ? 'Protected by 256-bit SSL encryption; no credit card details are retained.'
                          : 'Thanh toán bảo mật chuẩn SSL 256-bit, không lưu trữ thông tin thẻ của khách hàng.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-1">
                      <strong className="block text-[#2F403A] font-bold">
                        {language === 'en' ? 'E-Wallets MoMo / ZaloPay / VNPay' : 'Ví điện tử MoMo / ZaloPay / VNPay'}
                      </strong>
                      <p className="text-xs text-[#5D726A]">
                        {language === 'en'
                          ? 'Instant 1-tap mobile checkout with wallet promotion compatibility.'
                          : 'Thanh toán 1 chạm nhanh chóng, hưởng thêm các mã giảm giá hấp dẫn từ đối tác ví.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '2. Redeeming Mầm Points & Discount Vouchers' : '2. Sử dụng Điểm Mầm & Voucher giảm giá'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'On the checkout screen, parents can enter voucher codes and activate direct deductions with Mầm Points (100 Points = 1,000 VND). The payable amount recalculates automatically.'
                      : 'Tại màn hình thanh toán, ba mẹ có thể nhập mã voucher và kích hoạt giảm trừ trực tiếp bằng Điểm Mầm (100 Điểm Mầm = 1.000 VND). Số tiền thanh toán sẽ tự động cập nhật ngay lập tức.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '3. Refund Timeline on Returns' : '3. Quy định hoàn tiền khi đổi trả'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'For order cancellations or returns, Mầm Kids issues 100% refunds to the customer’s bank account within 24 – 48 business hours.'
                      : 'Trường hợp hủy đơn trước khi giao hoặc hoàn trả sản phẩm, Mầm Kids sẽ hoàn tiền 100% về tài khoản ngân hàng của phụ huynh trong vòng 24 – 48 giờ làm việc.'}
                  </p>
                </div>
              </div>
            )}

            {/* 5. CHÍNH SÁCH ĐỔI TRẢ 15 NGÀY */}
            {activeTab === 'chinh-sach-doi-tra' && (
              <div className="space-y-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#EAF3EF] border border-[#D2E3DC] flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-[#285A48] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block text-[#285A48] font-bold">
                      {language === 'en'
                        ? '15-Day Home Size Exchange – No trips to post office required'
                        : 'Đổi size tận nhà trong 15 ngày – Không cần đi bưu điện'}
                    </strong>
                    <p className="text-xs text-[#5D6F66]">
                      {language === 'en'
                        ? 'The courier brings the new size to your doorstep and collects the old garment on the spot.'
                        : 'Bưu tá mang size mới tới tận nhà cho bé thử và nhận lại size cũ, thuận tiện tối đa cho ba mẹ bận rộn.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '1. Exchange Eligibility' : '1. Điều kiện áp dụng đổi hàng'}
                  </h3>
                  <ul className="space-y-2 list-disc pl-5 text-[#5D6F66]">
                    <li>
                      {language === 'en'
                        ? 'Within 15 days of successful package delivery.'
                        : 'Thời hạn trong vòng 15 ngày kể từ khi nhận hàng thành công.'}
                    </li>
                    <li>
                      {language === 'en'
                        ? 'Original tags intact, unworn, unwashed and undamaged.'
                        : 'Sản phẩm còn nguyên tem mác, chưa qua giặt tẩy hoặc sử dụng.'}
                    </li>
                    <li>
                      {language === 'en'
                        ? 'Order ID or registered purchase phone number provided.'
                        : 'Có mã đơn hàng hoặc số điện thoại đặt hàng để hệ thống tra cứu.'}
                    </li>
                    <li>
                      {language === 'en'
                        ? 'Personalized embroidered items: Supported if the size differs from our standard recommendation.'
                        : 'Đối với sản phẩm có thêu tên bé: Vẫn được hỗ trợ đổi nếu bé mặc bị chật hoặc rộng so với kích cỡ khuyến nghị.'}
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '2. 3-Step Rapid Sizing Swap' : '2. Quy trình 3 bước đổi size siêu tốc'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8]">
                      <div className="w-6 h-6 rounded-full bg-[#4E8773] text-white font-bold text-xs flex items-center justify-center mb-2">1</div>
                      <strong className="block text-xs font-bold text-[#2F403A]">
                        {language === 'en' ? 'Request Swap' : 'Báo đổi hàng'}
                      </strong>
                      <p className="text-[11px] text-[#5D726A] mt-1">
                        {language === 'en'
                          ? 'Call 1900 6868 or message via website with order ID and desired size.'
                          : 'Gọi 1900 6868 hoặc nhắn tin trên web kèm mã đơn và size cần đổi.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8]">
                      <div className="w-6 h-6 rounded-full bg-[#4E8773] text-white font-bold text-xs flex items-center justify-center mb-2">2</div>
                      <strong className="block text-xs font-bold text-[#2F403A]">
                        {language === 'en' ? 'Courier Delivery' : 'Shipper mang đồ mới'}
                      </strong>
                      <p className="text-[11px] text-[#5D726A] mt-1">
                        {language === 'en'
                          ? 'Courier arrives at your doorstep with the replacement size in 1–3 days.'
                          : 'Bưu tá mang sản phẩm size mới tới tận nhà sau 1–3 ngày.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8]">
                      <div className="w-6 h-6 rounded-full bg-[#4E8773] text-white font-bold text-xs flex items-center justify-center mb-2">3</div>
                      <strong className="block text-xs font-bold text-[#2F403A]">
                        {language === 'en' ? 'Instant Swap' : 'Đổi tại chỗ'}
                      </strong>
                      <p className="text-[11px] text-[#5D726A] mt-1">
                        {language === 'en'
                          ? 'Hand the old item back and receive the new size. First exchange is completely free.'
                          : 'Ba mẹ đưa lại đồ cũ cho shipper và nhận ngay đồ mới. Miễn phí đổi lần đầu.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '3. Exchange Costs' : '3. Chi phí đổi hàng'}
                  </h3>
                  <p>
                    {language === 'en' ? (
                      <>
                        • Manufacturing defect or wrong size sent: <strong>100% Free</strong> two-way delivery.<br />
                        • Size preference adjustment: Mầm Kids covers delivery for the first exchange.
                      </>
                    ) : (
                      <>
                        • Đổi do sản phẩm lỗi kỹ thuật hoặc shop giao nhầm size: <strong>Miễn phí 100%</strong> phí vận chuyển 2 chiều.<br />
                        • Đổi size do bé muốn mặc rộng rãi hơn: Mầm Kids miễn phí vận chuyển lần đổi đầu tiên cho phụ huynh.
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* 6. CHÍNH SÁCH BẢO MẬT */}
            {activeTab === 'chinh-sach-bao-mat' && (
              <div className="space-y-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#4E8773]" />
                    {language === 'en'
                      ? '1. Commitment to Protecting Family and Child Data'
                      : '1. Cam kết bảo vệ dữ liệu phụ huynh và bé yêu'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'Mầm Kids recognizes that family and children’s information is deeply personal. We commit to strict confidentiality and collect only essential data needed to process orders and improve fit.'
                      : 'Mầm Kids hiểu rằng thông tin gia đình và con nhỏ là vô cùng thiêng liêng. Chúng tôi cam kết bảo mật tuyệt đối và chỉ thu thập các dữ liệu cần thiết để phục vụ đơn hàng và nâng cao trải nghiệm cho bé.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '2. Information Collection Purposes' : '2. Mục đích thu thập thông tin'}
                  </h3>
                  <ul className="space-y-2 list-disc pl-5 text-[#5D726A]">
                    <li>{language === 'en' ? 'Processing and shipping orders to your address.' : 'Xử lý và giao hàng tận nơi đến địa chỉ của ba mẹ.'}</li>
                    <li>{language === 'en' ? 'Recommending clothing sizes tailored to your child’s height and weight.' : 'Gợi ý size quần áo chuẩn xác dựa trên chiều cao, cân nặng của bé.'}</li>
                    <li>{language === 'en' ? 'Accurately embroidering your child’s name on custom orders.' : 'Thêu đúng tên bé lên trang phục cá nhân hóa.'}</li>
                    <li>{language === 'en' ? 'Delivering birthday gifts and maintaining Mầm Points rewards.' : 'Gửi quà chúc mừng sinh nhật bé và tích lũy Điểm Mầm.'}</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '3. Strict Zero Third-Party Sharing' : '3. Tuyệt đối không chia sẻ cho bên thứ ba'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'Mầm Kids strictly promises never to sell, share, or disclose customer data to commercial third parties or advertisers. All records are securely encrypted on high-level servers.'
                      : 'Mầm Kids cam kết không bán, chia sẻ hoặc tiết lộ thông tin khách hàng cho bất kỳ đơn vị quảng cáo hoặc bên thứ ba nào vì mục đích thương mại. Dữ liệu được lưu trữ trên máy chủ mã hóa bảo mật cao cấp.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '4. Parental Control Rights' : '4. Quyền kiểm soát của ba mẹ'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'Parents retain full rights to review, update, or request permanent deletion of their profile at any time via the Account page or by contacting hotline 1900 6868.'
                      : 'Phụ huynh có quyền xem lại, chỉnh sửa hoặc yêu cầu xóa toàn bộ thông tin cá nhân bất kỳ lúc nào bằng cách đăng nhập vào trang Tài khoản hoặc liên hệ trực tiếp hotline 1900 6868.'}
                  </p>
                </div>
              </div>
            )}

            {/* 7. KHÁCH HÀNG THÂN THIẾT */}
            {activeTab === 'khach-hang-than-thiet' && (
              <div className="space-y-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#EAF3EF] border border-[#D2E3DC] space-y-1">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#4E8773]" />
                    {language === 'en' ? '“Mầm Yêu Thương” Membership Program' : 'Chương trình Hội Viên “Mầm Yêu Thương”'}
                  </h3>
                  <p className="text-xs text-[#5D726A]">
                    {language === 'en'
                      ? 'Automatically accumulate purchases to unlock lifetime discount tiers and annual birthday rewards.'
                      : 'Tích lũy chi tiêu tự động sau mỗi lần mua sắm để nhận đặc quyền giảm giá trọn đời và quà sinh nhật bé.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Tier 1 */}
                  <div className="p-5 rounded-2xl bg-white border border-[#EFE8D8] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🌱</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EAF3EF] text-[#285A48] text-[10px] font-bold">
                        {language === 'en' ? 'Tier 1' : 'Hạng 1'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#2F403A] font-heading">
                        {language === 'en' ? 'Mầm Nhỏ' : 'Mầm Nhỏ'}
                      </h4>
                      <span className="text-xs text-[#7A8E85]">
                        {language === 'en' ? 'New Member' : 'Thành viên mới'}
                      </span>
                    </div>
                    <ul className="text-xs text-[#5D726A] space-y-1.5 pt-2 border-t border-[#F0EBE0]">
                      <li>• {language === 'en' ? '+50 Welcome Mầm Points' : 'Tặng ngay 50 Điểm Mầm chào mừng'}</li>
                      <li>• {language === 'en' ? '20,000 VND voucher for 1st order' : 'Voucher 20.000đ cho đơn đầu tiên'}</li>
                      <li>• {language === 'en' ? 'Earn 1 point per 1,000 VND' : 'Tích 1 Điểm / 1.000đ chi tiêu'}</li>
                    </ul>
                  </div>

                  {/* Tier 2 */}
                  <div className="p-5 rounded-2xl bg-[#FDF9F1] border-2 border-[#4E8773] shadow-xs space-y-3 relative">
                    <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#4E8773] text-white text-[9px] font-bold uppercase">
                      {language === 'en' ? 'Popular' : 'Phổ biến'}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🌿</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F4C95D] text-[#285A48] text-[10px] font-bold">
                        {language === 'en' ? 'Tier 2' : 'Hạng 2'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#285A48] font-heading">Mầm Xanh</h4>
                      <span className="text-xs text-[#7A8E85]">
                        {language === 'en' ? 'Spend from 1,500,000 VND' : 'Chi tiêu từ 1.500.000đ'}
                      </span>
                    </div>
                    <ul className="text-xs text-[#3E5149] space-y-1.5 pt-2 border-t border-[#EFE8D8]">
                      <li>• <strong>{language === 'en' ? '5% discount' : 'Giảm 5%'}</strong> {language === 'en' ? 'on all orders' : 'trên mọi đơn hàng'}</li>
                      <li>• {language === 'en' ? '50,000 VND child birthday gift' : 'Quà sinh nhật bé trị giá 50.000đ'}</li>
                      <li>• {language === 'en' ? '2x points in child birthday month' : 'Nhân đôi điểm trong tháng sinh nhật bé'}</li>
                      <li>• {language === 'en' ? 'Free embroidery on 1 product' : 'Miễn phí thêu tên trên 01 sản phẩm'}</li>
                    </ul>
                  </div>

                  {/* Tier 3 */}
                  <div className="p-5 rounded-2xl bg-white border border-[#EFE8D8] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🌳</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#355F52] text-[#F5DFA0] text-[10px] font-bold">
                        VIP
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#2F403A] font-heading">
                        {language === 'en' ? 'Cây Đại Thụ' : 'Cây Đại Thụ'}
                      </h4>
                      <span className="text-xs text-[#7A8E85]">
                        {language === 'en' ? 'Spend from 4,000,000 VND' : 'Chi tiêu từ 4.000.000đ'}
                      </span>
                    </div>
                    <ul className="text-xs text-[#5D726A] space-y-1.5 pt-2 border-t border-[#F0EBE0]">
                      <li>• <strong>{language === 'en' ? '10% lifetime discount' : 'Giảm 10% trọn đời'}</strong></li>
                      <li>• {language === 'en' ? 'Unconditional free shipping anytime' : 'Freeship vô điều kiện mọi lúc'}</li>
                      <li>• {language === 'en' ? '100,000 VND luxury birthday gift' : 'Quà sinh nhật cao cấp 100.000đ'}</li>
                      <li>• {language === 'en' ? 'Unlimited free embroidery service' : 'Miễn phí dịch vụ thêu tên không giới hạn'}</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-xs text-[#5D726A]">
                  💡 <strong>{language === 'en' ? 'Tier retention rule: ' : 'Quy định duy trì hạng: '}</strong>
                  {language === 'en'
                    ? 'Earned points and member tiers remain valid for 12 months with no abrupt downgrades.'
                    : 'Điểm tích lũy và cấp bậc thành viên được bảo lưu trọn vẹn trong vòng 12 tháng, không bị hạ hạng đột ngột.'}
                </div>
              </div>
            )}

            {/* 8. CHÍNH SÁCH ĐIỂM MẦM */}
            {activeTab === 'diem-mam' && (
              <div className="space-y-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF2DF] border border-[#F4E3BA] flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#285A48] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block text-[#285A48] font-bold">
                      {language === 'en'
                        ? '100 Mầm Points = 1,000 VND discount directly deducted at checkout'
                        : '100 Điểm Mầm = 1.000 VND khấu trừ trực tiếp khi thanh toán'}
                    </strong>
                    <p className="text-xs text-[#5D6F66]">
                      {language === 'en'
                        ? 'Equivalent to 2–5% cashback on all orders, giving parents maximum savings for kids.'
                        : 'Điểm tích lũy tương đương hoàn tiền 2–5% cho mọi đơn hàng, giúp ba mẹ tiết kiệm tối đa khi mua sắm cho con.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '1. How to Earn Mầm Points' : '1. Cách thức tích lũy Điểm Mầm'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-1">
                      <strong className="block text-xs font-bold text-[#2F403A]">
                        {language === 'en' ? '🛒 Everyday Shopping' : '🛒 Mua sắm hàng ngày'}
                      </strong>
                      <p className="text-xs text-[#5D726A]">
                        {language === 'en'
                          ? '1,000 VND spend = 1 Mầm Point (e.g. 500,000 VND order = +500 points).'
                          : 'Mỗi 1.000 VND chi tiêu = 1 Điểm Mầm (Ví dụ đơn 500k = +500 Điểm).'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-1">
                      <strong className="block text-xs font-bold text-[#285A48]">
                        {language === 'en' ? '♻️ Recycle Outfits via Mầm Again' : '♻️ Gửi đồ cũ qua Mầm Again'}
                      </strong>
                      <p className="text-xs text-[#5D726A]">
                        {language === 'en'
                          ? 'Earn +100 Mầm Points for each qualifying donation parcel.'
                          : 'Tặng ngay +100 Điểm Mầm cho mỗi lần gửi đồ quyên góp đạt chuẩn.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-1">
                      <strong className="block text-xs font-bold text-[#285A48]">
                        {language === 'en' ? '🌱 Read Eco Stories with Your Child' : '🌱 Đọc truyện Mầm Xanh cùng con'}
                      </strong>
                      <p className="text-xs text-[#5D726A]">
                        {language === 'en'
                          ? 'Earn +20 Mầm Points after completing each Eco Story.'
                          : 'Nhận +20 Điểm Mầm sau khi hoàn thành mỗi câu chuyện Eco Story.'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-1">
                      <strong className="block text-xs font-bold text-[#2F403A]">
                        {language === 'en' ? '⭐ Product Review with Child Photo' : '⭐ Đánh giá sản phẩm kèm ảnh bé'}
                      </strong>
                      <p className="text-xs text-[#5D726A]">
                        {language === 'en'
                          ? 'Receive +30 Mầm Points for every authentic parent review.'
                          : 'Tặng ngay +30 Điểm Mầm cho mỗi nhận xét chân thực từ ba mẹ.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '2. How to Redeem Mầm Points' : '2. Hướng dẫn quy đổi Điểm Mầm'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'On the Checkout screen, toggle "Use Mầm Points". The system automatically subtracts from the total payable amount. Can be combined with free shipping vouchers.'
                      : 'Tại màn hình Thanh toán, chọn công tắc "Dùng Điểm Mầm tích lũy". Hệ thống sẽ tự động trừ thẳng vào số tiền cần trả. Điểm Mầm có thể áp dụng đồng thời với mã Freeship.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm sm:text-base text-[#285A48] font-heading">
                    {language === 'en' ? '3. Points Validity Period' : '3. Thời hạn sử dụng Điểm Mầm'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'Mầm Points accumulate continuously with no expiration date, provided your account has at least 1 order within 12 months.'
                      : 'Điểm Mầm có giá trị tích lũy liên tục và không có hạn sử dụng, miễn là tài khoản của ba mẹ có ít nhất 1 giao dịch phát sinh trong vòng 12 tháng.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs Bottom Card */}
          <div className="pt-6 border-t border-[#EFE8D8] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FDF9F1] p-5 rounded-2xl">
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#285A48] font-heading">
                {language === 'en'
                  ? 'Have further questions regarding our policies?'
                  : 'Ba mẹ có câu hỏi thêm về chính sách?'}
              </h4>
              <p className="text-[11px] text-[#5D726A] mt-0.5">
                {language === 'en'
                  ? 'Our dedicated Mầm Kids customer team is always pleased to assist you.'
                  : 'Đội ngũ Mầm Kids luôn sẵn lòng hỗ trợ tận tâm và chu đáo nhất.'}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:19006868"
                className="px-4 py-2 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Call 1900 6868' : 'Gọi 1900 6868'}</span>
              </a>
              <Link
                to="/san-pham"
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#EAF3EF] text-[#285A48] font-bold text-xs border border-[#4E8773] transition-colors"
              >
                {language === 'en' ? 'Shop Now' : 'Mua sắm ngay'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
