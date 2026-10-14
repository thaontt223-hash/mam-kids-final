import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext';
import {
  User,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Heart,
  Baby,
  ArrowRight,
  Gift,
  CheckCircle2
} from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoggedIn, getBabyRecommendedSize } = useAuth();
  const { showToast } = useCart();
  const { language, t } = useLanguage();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Optional Baby Info during registration
  const [hasBaby, setHasBaby] = useState(true);
  const [babyName, setBabyName] = useState('');
  const [babyBirthDate, setBabyBirthDate] = useState('');
  const [babyGender, setBabyGender] = useState<'be-trai' | 'be-gai' | 'khac'>('be-gai');
  const [babyHeight, setBabyHeight] = useState<string>('');
  const [babyWeight, setBabyWeight] = useState<string>('');
  const [babyPreferredSize, setBabyPreferredSize] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto recommend size when height or weight changes
  React.useEffect(() => {
    const h = babyHeight ? parseFloat(babyHeight) : undefined;
    const w = babyWeight ? parseFloat(babyWeight) : undefined;
    if (h || w) {
      setBabyPreferredSize(getBabyRecommendedSize(h, w));
    }
  }, [babyHeight, babyWeight, getBabyRecommendedSize]);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/tai-khoan');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError(language === 'en' ? 'Please enter your Full Name' : 'Vui lòng nhập Họ và tên');
      return;
    }
    if (!email.trim()) {
      setError(language === 'en' ? 'Please enter your Email' : 'Vui lòng nhập Email');
      return;
    }
    if (!phone.trim()) {
      setError(language === 'en' ? 'Please enter your Phone number' : 'Vui lòng nhập Số điện thoại');
      return;
    }
    if (password.length < 6) {
      setError(language === 'en' ? 'Password must be at least 6 characters' : 'Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (password !== confirmPassword) {
      setError(language === 'en' ? 'Password confirmation does not match' : 'Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);
    const res = await register({
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      babyName: hasBaby ? babyName : undefined,
      babyBirthDate: hasBaby ? babyBirthDate : undefined,
      babyGender: hasBaby ? babyGender : undefined,
      babyHeight: hasBaby && babyHeight ? parseFloat(babyHeight) : undefined,
      babyWeight: hasBaby && babyWeight ? parseFloat(babyWeight) : undefined,
      babyPreferredSize: hasBaby ? babyPreferredSize : undefined
    });
    setIsLoading(false);

    if (res.success) {
      showToast(
        language === 'en' ? 'Account registered successfully!' : 'Đăng ký tài khoản thành công!',
        language === 'en'
          ? 'Welcome to Mầm Kids. You received +100 Mầm Points & a 10% Voucher!'
          : 'Chào mừng bạn đến với Mầm Kids. Bạn nhận được +100 Điểm Mầm & Voucher 10%!'
      );
      navigate('/tai-khoan');
    } else {
      setError(res.message || (language === 'en' ? 'Registration failed' : 'Đăng ký không thành công'));
    }
  };

  const tenBenefits = [
    language === 'en' ? '1. 10% discount on your first order (Code MAMKIDS10)' : '1. Giảm ngay 10% cho đơn hàng đầu tiên (Mã MAMKIDS10)',
    language === 'en' ? '2. Earn Mầm Points on every order (1,000 VND = 1 point)' : '2. Tích lũy Điểm Mầm sau mỗi đơn hàng (1.000đ = 1 điểm)',
    language === 'en' ? '3. 50,000 VND birthday gift or voucher for your child' : '3. Quà tặng hoặc Voucher sinh nhật 50.000đ cho bé',
    language === 'en' ? '4. Save child height, weight & sizing profile' : '4. Lưu hồ sơ chiều cao, cân nặng & size thường mặc của bé',
    language === 'en' ? '5. Save and manage your favorite wishlist' : '5. Lưu trữ danh sách sản phẩm yêu thích (Wishlist)',
    language === 'en' ? '6. Real-time and transparent order tracking' : '6. Theo dõi tiến trình đơn hàng trực tiếp và chính xác',
    language === 'en' ? '7. Revisit complete purchase history anytime' : '7. Xem lại toàn bộ lịch sử mua hàng mọi lúc mọi nơi',
    language === 'en' ? '8. Exclusive tier-based rewards and anniversary vouchers' : '8. Nhận voucher riêng biệt dành riêng cho từng cấp bậc',
    language === 'en' ? '9. Priority early access to new seasonal collections' : '9. Ưu tiên thông báo và đặt trước bộ sưu tập mới',
    language === 'en' ? '10. Member-only seasonal campaigns and bundle offers' : '10. Nhận ưu đãi mùa vụ và combo dành riêng thành viên'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6A7F77] mb-6">
        <Link to="/" className="hover:text-[#4E8773] transition-colors">
          {t('nav.home')}
        </Link>
        <span>/</span>
        <span className="text-[#355F52] font-semibold">{t('auth.registerTitle')}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE8D8] shadow-sm">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F5DFA0] text-[#355F52] mb-3">
                <Gift className="w-3.5 h-3.5 text-[#355F52]" />
                {language === 'en' ? 'Get 10% Voucher + 100 Mầm Points' : 'Nhận ngay Voucher 10% + 100 Điểm Mầm'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tracking-tight">
                {t('auth.registerTitle')}
              </h1>
              <p className="text-sm text-[#6A7F77] mt-1.5">
                {t('auth.registerSubtitle')}
              </p>
            </div>
            <div className="shrink-0">
              <Logo size="sm" isLink={false} />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
              <span className="shrink-0 font-bold">!</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account info section */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#355F52] border-b border-[#FAF6EC] pb-2">
                {t('auth.personalInfoTitle')}
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-2">
                  {t('auth.fullName')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('auth.fullNamePlaceholder')}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773] focus:ring-2 focus:ring-[#4E8773]/20 transition-all placeholder-[#9EB1A9]"
                  />
                  <User className="w-4 h-4 text-[#8B9D95] absolute left-4 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-2">
                    {t('auth.email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mevabe@gmail.com"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773] focus:ring-2 focus:ring-[#4E8773]/20 transition-all placeholder-[#9EB1A9]"
                    />
                    <Mail className="w-4 h-4 text-[#8B9D95] absolute left-4 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-2">
                    {t('auth.phone')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0987654321"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773] focus:ring-2 focus:ring-[#4E8773]/20 transition-all placeholder-[#9EB1A9]"
                    />
                    <Phone className="w-4 h-4 text-[#8B9D95] absolute left-4 top-3.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-2">
                    {t('auth.password')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('auth.passwordPlaceholder')}
                      className="w-full pl-11 pr-11 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773] focus:ring-2 focus:ring-[#4E8773]/20 transition-all placeholder-[#9EB1A9]"
                    />
                    <Lock className="w-4 h-4 text-[#8B9D95] absolute left-4 top-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1.5 text-[#8B9D95] hover:text-[#2F403A] absolute right-3 top-2.5 transition-colors cursor-pointer"
                      aria-label={showPassword ? (language === 'en' ? 'Hide password' : 'Ẩn mật khẩu') : (language === 'en' ? 'Show password' : 'Hiện mật khẩu')}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-2">
                    {t('auth.confirmPassword')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={language === 'en' ? 'Re-enter your password' : 'Nhập lại mật khẩu'}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773] focus:ring-2 focus:ring-[#4E8773]/20 transition-all placeholder-[#9EB1A9]"
                    />
                    <Lock className="w-4 h-4 text-[#8B9D95] absolute left-4 top-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Baby Info */}
            <div className="p-5 rounded-3xl bg-[#FAF6EC] border border-[#F5DFA0] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Baby className="w-4 h-4 text-[#4E8773]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#355F52]">
                    {t('auth.babyInfoOptionalTitle')}
                  </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#355F52]">
                  <input
                    type="checkbox"
                    checked={hasBaby}
                    onChange={(e) => setHasBaby(e.target.checked)}
                    className="w-4 h-4 rounded text-[#4E8773] focus:ring-[#4E8773]"
                  />
                  <span>{t('auth.addNowCheckbox')}</span>
                </label>
              </div>

              {hasBaby && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#2F403A] mb-1">
                        {t('auth.babyNameLabel')}
                      </label>
                      <input
                        type="text"
                        value={babyName}
                        onChange={(e) => setBabyName(e.target.value)}
                        placeholder={t('auth.babyNamePlaceholder')}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#2F403A] mb-1">
                        {t('auth.babyBirthDateLabel')}
                      </label>
                      <input
                        type="date"
                        value={babyBirthDate}
                        onChange={(e) => setBabyBirthDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#2F403A] mb-1">
                        {t('auth.babyGenderLabel')}
                      </label>
                      <select
                        value={babyGender}
                        onChange={(e) => setBabyGender(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                      >
                        <option value="be-gai">{t('auth.babyGenderGirl')}</option>
                        <option value="be-trai">{t('auth.babyGenderBoy')}</option>
                        <option value="khac">{t('auth.babyGenderOther')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#2F403A] mb-1">
                        {t('auth.babyHeightLabel')}
                      </label>
                      <input
                        type="number"
                        value={babyHeight}
                        onChange={(e) => setBabyHeight(e.target.value)}
                        placeholder="105"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#2F403A] mb-1">
                        {t('auth.babyWeightLabel')}
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={babyWeight}
                        onChange={(e) => setBabyWeight(e.target.value)}
                        placeholder="16"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2F403A] mb-1">
                      {t('auth.babyPreferredSizeLabel')}
                    </label>
                    <input
                      type="text"
                      value={babyPreferredSize}
                      onChange={(e) => setBabyPreferredSize(e.target.value)}
                      placeholder={language === 'en' ? 'Example: 110 (4-5 years)' : 'Ví dụ: 110 (4-5 tuổi)'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                    />
                    <p className="text-[10px] text-[#6A7F77] mt-1">
                      {t('auth.babySizeAutoNotice')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#4E8773] hover:bg-[#355F52] text-white font-bold text-sm tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span>{t('auth.creatingAccount')}</span>
              ) : (
                <>
                  <span>{t('auth.completeRegisterBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-4 border-t border-[#EFE8D8]">
            <p className="text-xs text-[#6A7F77]">
              {t('auth.alreadyAccountPrompt')}{' '}
              <Link
                to="/dang-nhap"
                className="font-bold text-[#4E8773] hover:text-[#355F52] hover:underline"
              >
                {t('auth.loginNowLink')}
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column: 10 Benefits of Member */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#EFE8D8] shadow-sm">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#FAF6EC]">
              <div className="w-8 h-8 rounded-full bg-[#EAF3EF] flex items-center justify-center text-[#4E8773]">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2F403A] font-heading">
                  {t('auth.tenBenefitsTitle')}
                </h3>
                <p className="text-[11px] text-[#6A7F77]">
                  {t('auth.tenBenefitsSubtitle')}
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {tenBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2F403A]">
                  <CheckCircle2 className="w-4 h-4 text-[#4E8773] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-[#EFE8D8] bg-[#FAF6EC] -mx-6 -mb-6 p-6 rounded-b-3xl">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[#4E8773] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  100+
                </span>
                <div>
                  <p className="text-xs font-bold text-[#355F52]">{t('auth.pointsAutoEarnTitle')}</p>
                  <p className="text-[11px] text-[#6A7F77]">
                    {t('auth.pointsAutoEarnDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
