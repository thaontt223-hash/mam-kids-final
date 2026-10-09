import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  Sparkles,
  Award,
  ArrowRight,
  Clock,
  HelpCircle,
  Gift,
  ShoppingBag,
  Baby,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
  Ticket,
  ChevronRight,
  Calculator,
  ShieldCheck,
  Percent,
  Truck,
  HeartHandshake,
  Star
} from 'lucide-react';

export const MamPointsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, exchangePointsForVoucher } = useAuth();
  const { showToast } = useCart();

  // Interactive Simulator state
  const [simulationAmount, setSimulationAmount] = useState<number>(299000);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'earn' | 'redeem'>('all');

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/dang-nhap');
    }
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  // Calculate points metrics:
  // 1. Current available points
  const currentPoints = user.mamPoints;

  // 2. Total earned points across history
  const calculatedEarned = user.pointsHistory
    .filter((p) => p.points > 0 || p.type === 'earn' || p.type === 'bonus')
    .reduce((sum, p) => sum + Math.abs(p.points), 0);
  const totalEarnedPoints = Math.max(currentPoints, calculatedEarned);

  // 3. Total redeemed points across history
  const calculatedUsed = user.pointsHistory
    .filter((p) => p.points < 0 || p.type === 'redeem')
    .reduce((sum, p) => sum + Math.abs(p.points), 0);
  const totalUsedPoints = calculatedUsed;

  const handleExchange = () => {
    const res = exchangePointsForVoucher();
    if (res.success) {
      showToast('Đổi điểm thành công!', res.message);
    } else {
      showToast('Không thể đổi điểm', res.message);
    }
  };

  // Filtered points history
  const filteredHistory = user.pointsHistory.filter((item) => {
    if (historyFilter === 'earn') return item.points > 0 || item.type === 'earn' || item.type === 'bonus';
    if (historyFilter === 'redeem') return item.points < 0 || item.type === 'redeem';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6A7F77] mb-6">
        <Link to="/" className="hover:text-[#4E8773] transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <Link to="/tai-khoan" className="hover:text-[#4E8773] transition-colors">
          Tài khoản
        </Link>
        <span>/</span>
        <span className="text-[#355F52] font-semibold">Điểm Mầm & Đổi Voucher</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#4E8773] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#ECA032]" />
            Chương trình khách hàng thân thiết
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tracking-tight mt-1">
            Điểm Mầm & Đổi Voucher
          </h1>
          <p className="text-xs sm:text-sm text-[#6A7F77] mt-1">
            Tích lũy Điểm Mầm sau mỗi đơn hàng (1.000đ = 1 điểm) và đổi voucher ưu đãi (100 điểm = 10.000đ).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/tai-khoan"
            className="px-4 py-2 rounded-xl bg-white border border-[#D2E3DC] hover:border-[#4E8773] text-[#355F52] text-xs font-bold transition-all shadow-2xs"
          >
            Tổng quan tài khoản
          </Link>
          <Link
            to="/voucher"
            className="px-4 py-2 rounded-xl bg-[#4E8773] hover:bg-[#3E7060] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Ví voucher của tôi</span>
          </Link>
        </div>
      </div>

      {/* Hero Points Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#355F52] via-[#3E7060] to-[#4E8773] text-white p-6 sm:p-10 shadow-md mb-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main User Points */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5DFA0] text-[#2F403A] shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ECA032]" />
                <span>Chương trình Điểm Mầm</span>
              </span>
              <span className="text-xs text-[#EAF3EF] font-medium">
                Gia nhập từ {user.joinedDate}
              </span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#F5DFA0]">
                Điểm Mầm khả dụng hiện tại
              </p>
              <div className="flex items-baseline gap-3 my-1">
                <span className="text-4xl sm:text-6xl font-black font-heading tabular-nums text-white">
                  {currentPoints.toLocaleString('vi-VN')}
                </span>
                <span className="text-lg sm:text-xl font-bold text-[#FDF9F1]">Điểm Mầm</span>
              </div>
              <p className="text-xs text-[#EAF3EF] max-w-lg leading-relaxed">
                Tương đương giá trị quy đổi{' '}
                <strong className="text-[#F5DFA0] font-bold">
                  {(currentPoints * 10).toLocaleString('vi-VN')} đ
                </strong>{' '}
                khi đổi voucher giảm giá áp dụng trực tiếp cho đơn hàng Mầm Kids.
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 max-w-xl text-xs text-[#EAF3EF] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F5DFA0] shrink-0" />
              <span>Quy tắc: 1.000 VND thanh toán = 1 Điểm Mầm · 100 Điểm = Voucher 10.000 VND</span>
            </div>
          </div>

          {/* Quick Redeem Voucher Card on Right */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-xs p-6 rounded-3xl border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5DFA0] flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                Đổi Điểm Lấy Voucher
              </h3>
              <span className="text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
                100 điểm = 10k
              </span>
            </div>

            <p className="text-xs text-[#FDF9F1] leading-relaxed">
              Cứ mỗi <strong>100 Điểm Mầm</strong>, bạn có thể bấm đổi ngay 1 voucher trị giá <strong>10.000 VND</strong> không giới hạn giá trị đơn hàng tối thiểu.
            </p>

            <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-[#EAF3EF]">Số voucher có thể đổi hiện tại:</span>
              <span className="text-base font-black text-[#F5DFA0] font-heading tabular-nums">
                {Math.floor(currentPoints / 100)} voucher
              </span>
            </div>

            <div className="pt-1 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleExchange}
                disabled={currentPoints < 100}
                className="w-full py-3 px-4 rounded-xl bg-[#F5DFA0] hover:bg-[#F2D485] text-[#2F403A] font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#ECA032]" />
                <span>Đổi 100 Điểm lấy Voucher 10.000 VND</span>
              </button>

              <Link
                to="/san-pham"
                className="w-full py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 text-center"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Mua sắm tích thêm điểm ngay</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3 SUMMARY METRIC BOXES: Điểm hiện tại, Điểm đã tích luỹ, Điểm đã dùng */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {/* Metric 1: Điểm hiện tại */}
        <div className="p-6 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF3EF] text-[#4E8773] flex items-center justify-center shrink-0">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#6A7F77] uppercase tracking-wider block">
              Điểm hiện tại (Khả dụng)
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-[#355F52] font-heading tabular-nums">
                {currentPoints.toLocaleString('vi-VN')}
              </span>
              <span className="text-xs font-bold text-[#4E8773]">điểm</span>
            </div>
            <p className="text-[11px] text-[#6A7F77] mt-0.5">
              Sẵn sàng đổi voucher hoặc trừ đơn hàng
            </p>
          </div>
        </div>

        {/* Metric 2: Điểm đã tích luỹ */}
        <div className="p-6 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF6EC] text-[#ECA032] flex items-center justify-center shrink-0">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#6A7F77] uppercase tracking-wider block">
              Điểm đã tích luỹ (Tổng cộng)
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tabular-nums">
                {totalEarnedPoints.toLocaleString('vi-VN')}
              </span>
              <span className="text-xs font-bold text-[#ECA032]">điểm</span>
            </div>
            <p className="text-[11px] text-[#6A7F77] mt-0.5">
              Tổng số điểm đã nhận từ các đơn hàng
            </p>
          </div>
        </div>

        {/* Metric 3: Điểm đã dùng */}
        <div className="p-6 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FDF2EE] text-[#E07A8A] flex items-center justify-center shrink-0">
            <Ticket className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#6A7F77] uppercase tracking-wider block">
              Điểm đã sử dụng
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tabular-nums">
                {totalUsedPoints.toLocaleString('vi-VN')}
              </span>
              <span className="text-xs font-bold text-[#E07A8A]">điểm</span>
            </div>
            <p className="text-[11px] text-[#6A7F77] mt-0.5">
              Đã quy đổi thành {Math.floor(totalUsedPoints / 100)} voucher giảm giá
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: QUY TẮC TÍCH ĐIỂM & BỘ CÔNG CỤ MÔ PHỎNG TÍNH ĐIỂM TƯƠNG TÁC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-stretch">
        {/* Left: Quy tắc tích điểm & đổi điểm */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8D8] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#EAF3EF] text-[#4E8773] flex items-center justify-center">
                <Award className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-[#2F403A] font-heading">
                Quy Tắc Tích & Đổi Điểm Mầm
              </h3>
            </div>
            <p className="text-xs text-[#6A7F77] mb-6">
              Nguyên tắc đơn giản, minh bạch và không phát sinh điều kiện ẩn.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#F5DFA0] flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-xl bg-[#FFF6D6] text-[#ECA032] flex items-center justify-center text-sm font-black shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#355F52]">
                    Tích Điểm Tự Động: 1.000 VND = 1 Điểm Mầm
                  </h4>
                  <p className="text-xs text-[#2F403A] mt-1 leading-relaxed">
                    Mỗi 1.000 VND thanh toán thực tế của đơn hàng sẽ quy đổi thành 1 Điểm Mầm.
                    <br />
                    <span className="text-[#8F6612] font-semibold">
                      Ví dụ: Đơn hàng 299.000 VND → Tích ngay 299 Điểm Mầm vào tài khoản.
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#EAF3EF] border border-[#D2E3DC] flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-xl bg-[#D6ECE1] text-[#355F52] flex items-center justify-center text-sm font-black shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#355F52]">
                    Quy Đổi Voucher: 100 Điểm Mầm = 10.000 VND
                  </h4>
                  <p className="text-xs text-[#2F403A] mt-1 leading-relaxed">
                    Khi đạt từ 100 điểm, bạn có thể chủ động bấm đổi thành voucher giảm trừ 10.000 VND. Cứ 200 điểm = 20.000 VND, 500 điểm = 50.000 VND.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-xl bg-white text-[#4E8773] flex items-center justify-center text-sm font-black shrink-0 mt-0.5 border border-[#EFE8D8]">
                  3
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#355F52]">
                    Điểm Tích Lũy Được Lưu Trữ Minh Bạch
                  </h4>
                  <p className="text-xs text-[#2F403A] mt-1 leading-relaxed">
                    Điểm đổi voucher được ghi nhận chi tiết trong lịch sử giao dịch, giúp bạn quản lý và sử dụng điểm an tâm lâu dài.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#FAF6EC] mt-6 flex items-center justify-between text-xs text-[#6A7F77]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4E8773]" />
              Bảo lưu quyền lợi thành viên trọn đời
            </span>
            <Link to="/chinh-sach-doi-tra" className="text-[#4E8773] hover:underline font-semibold">
              Điều khoản chính sách →
            </Link>
          </div>
        </div>

        {/* Right: Bộ công cụ tương tác mô phỏng tích điểm đơn hàng */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#FAF6EC] to-[#FDF9F1] rounded-3xl p-6 sm:p-8 border border-[#F5DFA0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-xl bg-[#F5DFA0] text-[#355F52] flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-[#2F403A] font-heading">
                Mô Phỏng Tích Điểm Đơn Hàng
              </h3>
            </div>
            <p className="text-xs text-[#6A7F77] mb-6">
              Kéo thanh trượt hoặc chọn giá trị đơn hàng dự kiến để tính nhanh số Điểm Mầm bạn sẽ nhận được.
            </p>

            {/* Simulation Amount Input & Slider */}
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#EFE8D8]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#355F52] uppercase tracking-wider">
                  Giá trị đơn hàng dự kiến:
                </label>
                <div className="text-xl sm:text-2xl font-black text-[#4E8773] font-heading tabular-nums">
                  {simulationAmount.toLocaleString('vi-VN')} VND
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={simulationAmount}
                onChange={(e) => setSimulationAmount(Number(e.target.value))}
                className="w-full accent-[#4E8773] cursor-pointer h-2 bg-[#EAF3EF] rounded-lg"
              />

              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[11px] text-[#6A7F77] font-semibold">Gợi ý nhanh:</span>
                {[
                  { label: '299.000đ (1 set đồ)', val: 299000 },
                  { label: '450.000đ (2 set)', val: 450000 },
                  { label: '850.000đ (Combo)', val: 850000 },
                  { label: '1.200.000đ (Mua sắm mùa)', val: 1200000 }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setSimulationAmount(preset.val)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      simulationAmount === preset.val
                        ? 'bg-[#4E8773] text-white'
                        : 'bg-[#FAF6EC] hover:bg-[#F2E8CE] text-[#355F52]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="mt-5 p-5 rounded-2xl bg-gradient-to-r from-[#355F52] to-[#4E8773] text-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#EAF3EF]">Số Điểm Mầm tích lũy:</span>
                  <div className="text-3xl font-black font-heading text-[#F5DFA0] tabular-nums">
                    +{Math.floor(simulationAmount / 1000).toLocaleString('vi-VN')} điểm
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#EAF3EF]">Quy đổi voucher tương đương:</span>
                  <div className="text-2xl font-black font-heading text-white tabular-nums">
                    {(Math.floor(simulationAmount / 1000) * 10).toLocaleString('vi-VN')} đ
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/20 text-xs text-[#EAF3EF] flex items-center justify-between">
                <span>Sau đơn hàng này, điểm của bạn sẽ là:</span>
                <strong className="text-[#F5DFA0]">
                  {(currentPoints + Math.floor(simulationAmount / 1000)).toLocaleString('vi-VN')} điểm
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F5DFA0] flex items-center justify-between">
            <Link
              to="/san-pham"
              className="w-full py-3 rounded-xl bg-[#4E8773] hover:bg-[#3E7060] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Khám phá sản phẩm & Tích điểm ngay</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION: CÁCH KIẾM THÊM ĐIỂM MẦM */}
      <div className="mb-14">
        <h3 className="text-lg font-bold text-[#2F403A] font-heading mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#4E8773]" />
          <span>Cách Kiếm Thêm Điểm Mầm Nhanh Chóng</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-[#EFE8D8] flex flex-col justify-between shadow-2xs">
            <div>
              <span className="w-10 h-10 rounded-2xl bg-[#EAF3EF] text-[#4E8773] flex items-center justify-center mb-3">
                <Gift className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-sm text-[#2F403A] font-heading">
                Đăng ký thành viên
              </h4>
              <p className="text-xs text-[#6A7F77] mt-1 leading-relaxed">
                Tặng ngay <strong className="text-[#355F52]">+100 Điểm Mầm</strong> và mã giảm giá 10% (MAMKIDS10) chào mừng thành viên mới.
              </p>
            </div>
            <span className="mt-4 text-[11px] font-bold text-[#4E8773] flex items-center gap-1">
              ✓ Bạn đã nhận
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#EFE8D8] flex flex-col justify-between shadow-2xs">
            <div>
              <span className="w-10 h-10 rounded-2xl bg-[#FAF6EC] text-[#ECA032] flex items-center justify-center mb-3">
                <Baby className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-sm text-[#2F403A] font-heading">
                Cập nhật thông tin bé yêu
              </h4>
              <p className="text-xs text-[#6A7F77] mt-1 leading-relaxed">
                Tặng thêm <strong className="text-[#355F52]">+50 Điểm Mầm</strong> cho mỗi hồ sơ bé được cập nhật chiều cao, cân nặng và ngày sinh.
              </p>
            </div>
            <Link
              to="/thong-tin-be"
              className="mt-4 text-xs font-bold text-[#4E8773] hover:underline flex items-center gap-1"
            >
              <span>Xem & bổ sung hồ sơ bé</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#EFE8D8] flex flex-col justify-between shadow-2xs">
            <div>
              <span className="w-10 h-10 rounded-2xl bg-[#F2F7F5] text-[#355F52] flex items-center justify-center mb-3">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-sm text-[#2F403A] font-heading">
                Mua sắm trang phục trẻ em
              </h4>
              <p className="text-xs text-[#6A7F77] mt-1 leading-relaxed">
                Tự động tích lũy <strong className="text-[#355F52]">1 điểm cho mỗi 1.000đ</strong> sau khi đơn hàng được giao thành công.
              </p>
            </div>
            <Link
              to="/san-pham"
              className="mt-4 text-xs font-bold text-[#4E8773] hover:underline flex items-center gap-1"
            >
              <span>Xem danh mục sản phẩm</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION: LỊCH SỬ TÍCH & DÙNG ĐIỂM MẦM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8D8] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#FAF6EC] mb-5 gap-3">
          <div>
            <h3 className="font-bold text-[#2F403A] text-lg font-heading flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4E8773]" />
              <span>Lịch Sử Giao Dịch Điểm Mầm</span>
            </h3>
            <p className="text-xs text-[#6A7F77]">
              Theo dõi chi tiết các lượt nhận điểm và đổi thưởng của bạn
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-[#FDF9F1] p-1 rounded-xl border border-[#EFE8D8]">
            <button
              type="button"
              onClick={() => setHistoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                historyFilter === 'all'
                  ? 'bg-[#4E8773] text-white shadow-2xs'
                  : 'text-[#6A7F77] hover:text-[#355F52]'
              }`}
            >
              Tất cả ({user.pointsHistory.length})
            </button>
            <button
              type="button"
              onClick={() => setHistoryFilter('earn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                historyFilter === 'earn'
                  ? 'bg-[#4E8773] text-white shadow-2xs'
                  : 'text-[#6A7F77] hover:text-[#355F52]'
              }`}
            >
              Tích lũy (+)
            </button>
            <button
              type="button"
              onClick={() => setHistoryFilter('redeem')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                historyFilter === 'redeem'
                  ? 'bg-[#4E8773] text-white shadow-2xs'
                  : 'text-[#6A7F77] hover:text-[#355F52]'
              }`}
            >
              Đã đổi (-)
            </button>
          </div>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="space-y-3">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] flex items-center justify-between gap-4 transition-colors hover:bg-[#FAF6EC]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                      item.type === 'earn' || item.type === 'bonus' || item.points > 0
                        ? 'bg-[#EAF3EF] text-[#4E8773]'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {item.type === 'earn' || item.type === 'bonus' || item.points > 0 ? '+' : '-'}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#2F403A]">
                      {item.description}
                    </h4>
                    <p className="text-xs text-[#6A7F77] mt-0.5">
                      {item.date} {item.orderId && `· Mã đơn hàng: #${item.orderId}`}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-base sm:text-lg font-black font-heading tabular-nums ${
                      item.points > 0 || item.type === 'earn' || item.type === 'bonus'
                        ? 'text-[#355F52]'
                        : 'text-red-600'
                    }`}
                  >
                    {item.points > 0 ? `+${item.points}` : item.points} điểm
                  </span>
                  <span className="block text-[10px] text-[#6A7F77] uppercase font-bold">
                    {item.type === 'bonus' ? 'Thưởng' : item.type === 'earn' ? 'Tích lũy' : 'Đổi voucher'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-sm text-[#6A7F77]">
            Chưa có giao dịch nào phù hợp với bộ lọc.
          </div>
        )}
      </div>
    </div>
  );
};
