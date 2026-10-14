import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext';
import { User, Lock, Mail, Eye, EyeOff, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginDemo, isLoggedIn } = useAuth();
  const { showToast } = useCart();
  const { language, t } = useLanguage();

  const [accountInput, setAccountInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to account dashboard
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/tai-khoan');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accountInput.trim()) {
      setError(
        language === 'en'
          ? 'Please enter your email or phone number'
          : 'Vui lòng nhập email hoặc số điện thoại'
      );
      return;
    }
    if (!password) {
      setError(
        language === 'en' ? 'Please enter your password' : 'Vui lòng nhập mật khẩu'
      );
      return;
    }

    setIsLoading(true);
    const res = await login(accountInput, password);
    setIsLoading(false);

    if (res.success) {
      showToast(
        language === 'en' ? 'Login successful!' : 'Đăng nhập thành công!',
        language === 'en'
          ? 'Welcome back to Mầm Kids'
          : 'Chào mừng bạn quay trở lại với Mầm Kids'
      );
      const from = (location.state as any)?.from || '/tai-khoan';
      navigate(from);
    } else {
      setError(
        res.message ||
          (language === 'en' ? 'Login failed' : 'Đăng nhập không thành công')
      );
    }
  };

  const handleDemoLogin = () => {
    loginDemo();
    showToast(
      language === 'en'
        ? 'Signed in successfully with demo account!'
        : 'Đăng nhập thành công với tài khoản trải nghiệm!',
      language === 'en' ? 'Welcome, Mother Hoang Yen' : 'Xin chào Mẹ Hoàng Yến'
    );
    navigate('/tai-khoan');
  };

  const memberBenefitsList = [
    {
      title: language === 'en' ? '10% off your first order' : 'Giảm 10% cho đơn hàng đầu tiên',
      desc: language === 'en' ? 'Code MAMKIDS10 automatically added to wallet' : 'Mã MAMKIDS10 tự động gửi vào ví'
    },
    {
      title: language === 'en' ? 'Earn Mầm Points on every purchase' : 'Tích Điểm Mầm sau mỗi đơn hàng',
      desc: language === 'en' ? '1,000 VND = 1 Mầm Point for instant checkout discounts' : '1.000đ = 1 Điểm Mầm quy đổi giảm giá'
    },
    {
      title: language === 'en' ? 'Child birthday gift voucher' : 'Voucher mừng sinh nhật bé yêu',
      desc: language === 'en' ? 'Get a 50,000 VND gift on your child’s birthday month' : 'Tặng 50.000đ vào tháng sinh nhật bé'
    },
    {
      title: language === 'en' ? 'Save child height, weight & sizing profile' : 'Lưu hồ sơ chiều cao, cân nặng & size của bé',
      desc: language === 'en' ? 'Automated smart size advice while browsing clothes' : 'Gợi ý size tự động khi mua sắm'
    },
    {
      title: language === 'en' ? 'Live order tracking & full purchase history' : 'Theo dõi đơn hàng & lịch sử mua hàng',
      desc: language === 'en' ? 'Check real-time package delivery milestones online' : 'Kiểm tra lộ trình giao hàng trực tuyến'
    },
    {
      title: language === 'en' ? 'New collection & seasonal early access' : 'Thông báo bộ sưu tập & ưu đãi mùa mới',
      desc: language === 'en' ? 'Priority notice for fresh releases and seasonal lookbooks' : 'Ưu tiên trải nghiệm trang phục mới ra mắt'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6A7F77] mb-6">
        <Link to="/" className="hover:text-[#4E8773] transition-colors">
          {t('nav.home')}
        </Link>
        <span>/</span>
        <span className="text-[#355F52] font-semibold">{t('auth.loginTitle')}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Login Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE8D8] shadow-sm">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF3EF] text-[#355F52] mb-3">
                <User className="w-3.5 h-3.5" />
                {t('auth.memberBadge')}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tracking-tight">
                {t('auth.loginTitle')}
              </h1>
              <p className="text-sm text-[#6A7F77] mt-1.5">
                {t('auth.loginSubtitle')}
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-2">
                {t('auth.emailOrPhone')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={accountInput}
                  onChange={(e) => setAccountInput(e.target.value)}
                  placeholder={t('auth.emailOrPhonePlaceholder')}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773] focus:ring-2 focus:ring-[#4E8773]/20 transition-all placeholder-[#9EB1A9]"
                />
                <Mail className="w-4 h-4 text-[#8B9D95] absolute left-4 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider">
                  {t('auth.password')} <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    alert(t('auth.forgotPasswordAlert'))
                  }
                  className="text-xs text-[#4E8773] hover:text-[#355F52] hover:underline transition-colors cursor-pointer"
                >
                  {t('auth.forgotPassword')}
                </button>
              </div>
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#4E8773] focus:ring-[#4E8773] border-[#D2E3DC]"
                />
                <span className="text-xs text-[#526860] font-medium">{t('auth.rememberMe')}</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#4E8773] hover:bg-[#355F52] text-white font-bold text-sm tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <span>{t('auth.loggingIn')}</span>
              ) : (
                <>
                  <span>{t('auth.loginBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-6 border-t border-[#EFE8D8]">
            <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#F5DFA0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#355F52] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#ECA032]" />
                  {t('auth.demoLoginTip')}
                </p>
                <p className="text-[11px] text-[#6A7F77] mt-0.5">
                  {t('auth.demoAccountDesc')}
                </p>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="shrink-0 px-4 py-2 rounded-xl bg-[#355F52] hover:bg-[#28473D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {t('auth.demoLoginBtn')}
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#6A7F77]">
              {t('auth.noAccountPrompt')}{' '}
              <Link
                to="/dang-ky"
                className="font-bold text-[#4E8773] hover:text-[#355F52] hover:underline"
              >
                {t('auth.registerGiftLink')}
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column: Member Benefits Banner */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#355F52] to-[#28473D] text-white p-6 sm:p-8 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#4E8773] flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5DFA0]">
                {t('auth.memberBenefits')}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight mb-3">
              {t('auth.benefitsClubTitle')}
            </h3>
            <p className="text-xs text-[#EAF3EF] leading-relaxed mb-6">
              {t('auth.benefitsClubDesc')}
            </p>

            <ul className="space-y-3.5 text-xs text-[#FDF9F1]">
              {memberBenefitsList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5DFA0] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">{item.title}</span>
                    <span className="text-[11px] text-[#D2E3DC]">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/15">
              <Link
                to="/dang-ky"
                className="w-full py-3 px-4 rounded-2xl bg-[#F5DFA0] hover:bg-[#F2D485] text-[#2F403A] font-bold text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>{t('auth.createFreeAccountBtn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#EFE8D8] text-center">
            <p className="text-xs text-[#6A7F77]">
              {t('auth.trackOrderNoLoginPrompt')}
            </p>
            <Link
              to="/theo-doi-don-hang"
              className="inline-block mt-2 text-xs font-bold text-[#4E8773] hover:text-[#355F52] hover:underline"
            >
              {t('auth.trackOrderNoLoginLink')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
