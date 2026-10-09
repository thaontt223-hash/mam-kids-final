import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { User, Lock, Mail, Phone, Eye, EyeOff, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginDemo, isLoggedIn } = useAuth();
  const { showToast } = useCart();

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
      setError('Vui lòng nhập email hoặc số điện thoại');
      return;
    }
    if (!password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    setIsLoading(true);
    const res = await login(accountInput, password);
    setIsLoading(false);

    if (res.success) {
      showToast('Đăng nhập thành công!', 'Chào mừng bạn quay trở lại với Mầm Kids');
      const from = (location.state as any)?.from || '/tai-khoan';
      navigate(from);
    } else {
      setError(res.message || 'Đăng nhập không thành công');
    }
  };

  const handleDemoLogin = () => {
    loginDemo();
    showToast('Đăng nhập thành công với tài khoản trải nghiệm!', 'Xin chào Mẹ Hoàng Yến');
    navigate('/tai-khoan');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6A7F77] mb-6">
        <Link to="/" className="hover:text-[#4E8773] transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-[#355F52] font-semibold">Đăng nhập tài khoản</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Login Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE8D8] shadow-sm">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF3EF] text-[#355F52] mb-3">
                <User className="w-3.5 h-3.5" />
                Thành viên Mầm Kids
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tracking-tight">
                Đăng nhập tài khoản
              </h1>
              <p className="text-sm text-[#6A7F77] mt-1.5">
                Đăng nhập để xem tích điểm Mầm, nhận voucher và theo dõi đơn hàng của bạn.
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
                Email hoặc Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={accountInput}
                  onChange={(e) => setAccountInput(e.target.value)}
                  placeholder="Ví dụ: mevabe@mamkids.vn hoặc 0987654321"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773] focus:ring-2 focus:ring-[#4E8773]/20 transition-all placeholder-[#9EB1A9]"
                />
                <Mail className="w-4 h-4 text-[#8B9D95] absolute left-4 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Vui lòng sử dụng tài khoản dùng thử mẫu hoặc liên hệ hotline 1900 8866 để cấp lại mật khẩu.')}
                  className="text-xs text-[#4E8773] hover:text-[#355F52] hover:underline transition-colors"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773] focus:ring-2 focus:ring-[#4E8773]/20 transition-all placeholder-[#9EB1A9]"
                />
                <Lock className="w-4 h-4 text-[#8B9D95] absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-[#8B9D95] hover:text-[#2F403A] absolute right-3 top-2.5 transition-colors"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
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
                <span className="text-xs text-[#526860] font-medium">Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#4E8773] hover:bg-[#355F52] text-white font-bold text-sm tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <span>Đang xử lý đăng nhập...</span>
              ) : (
                <>
                  <span>ĐĂNG NHẬP</span>
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
                  Trải nghiệm nhanh không cần gõ phím
                </p>
                <p className="text-[11px] text-[#6A7F77] mt-0.5">
                  Tài khoản mẫu: <span className="font-semibold text-[#2F403A]">mevabe@mamkids.vn</span> (có sẵn 350 Điểm Mầm & 2 bé)
                </p>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="shrink-0 px-4 py-2 rounded-xl bg-[#355F52] hover:bg-[#28473D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#6A7F77]">
              Bạn chưa có tài khoản?{' '}
              <Link
                to="/dang-ky"
                className="font-bold text-[#4E8773] hover:text-[#355F52] hover:underline"
              >
                Đăng ký thành viên nhận quà 10%
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
                Đặc quyền thành viên Mầm
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight mb-3">
              Cùng bé lớn khôn và gieo thói quen xanh
            </h3>
            <p className="text-xs text-[#EAF3EF] leading-relaxed mb-6">
              Tham gia câu lạc bộ thành viên Mầm Kids để nhận ngập tràn ưu đãi cùng tiện ích chăm sóc size chuẩn riêng cho bé yêu:
            </p>

            <ul className="space-y-3.5 text-xs text-[#FDF9F1]">
              {[
                { title: 'Giảm 10% cho đơn hàng đầu tiên', desc: 'Mã MAMKIDS10 tự động gửi vào ví' },
                { title: 'Tích Điểm Mầm sau mỗi đơn hàng', desc: '1.000đ = 1 Điểm Mầm quy đổi giảm giá' },
                { title: 'Voucher mừng sinh nhật bé yêu', desc: 'Tặng 50.000đ vào tháng sinh nhật bé' },
                { title: 'Lưu hồ sơ chiều cao, cân nặng & size của bé', desc: 'Gợi ý size tự động khi mua sắm' },
                { title: 'Theo dõi đơn hàng & lịch sử mua hàng', desc: 'Kiểm tra lộ trình giao hàng trực tuyến' },
                { title: 'Thông báo bộ sưu tập & ưu đãi mùa mới', desc: 'Ưu tiên trải nghiệm trang phục mới ra mắt' }
              ].map((item, idx) => (
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
                <span>TẠO TÀI KHOẢN MỚI MIỄN PHÍ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#EFE8D8] text-center">
            <p className="text-xs text-[#6A7F77]">
              Cần tra cứu nhanh đơn hàng mà không muốn đăng nhập?
            </p>
            <Link
              to="/theo-doi-don-hang"
              className="inline-block mt-2 text-xs font-bold text-[#4E8773] hover:text-[#355F52] hover:underline"
            >
              Tra cứu đơn hàng bằng Mã đơn hàng & SĐT →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
