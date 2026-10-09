import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import {
  User,
  Award,
  Ticket,
  Package,
  Baby,
  Heart,
  LogOut,
  ChevronRight,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  ArrowRight,
  PlusCircle,
  ExternalLink,
  Edit2,
  Check,
  ShoppingBag,
  Leaf,
  BookOpen,
  Recycle
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, updateProfile, exchangePointsForVoucher } = useAuth();
  const { orders, wishlist, addToCart, showToast } = useCart();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.fullName || '');
  const [editAddress, setEditAddress] = useState(user?.defaultAddress || '');
  const [editCity, setEditCity] = useState(user?.defaultCity || '');
  const [editDistrict, setEditDistrict] = useState(user?.defaultDistrict || '');

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/dang-nhap');
    }
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  // Points calculations
  const currentPoints = user.mamPoints;
  const calculatedEarned = user.pointsHistory
    .filter((p) => p.points > 0 || p.type === 'earn' || p.type === 'bonus')
    .reduce((sum, p) => sum + Math.abs(p.points), 0);
  const totalEarnedPoints = Math.max(currentPoints, calculatedEarned);

  const calculatedUsed = user.pointsHistory
    .filter((p) => p.points < 0 || p.type === 'redeem')
    .reduce((sum, p) => sum + Math.abs(p.points), 0);
  const totalUsedPoints = calculatedUsed;

  // Filter user orders (or fallback to recent store orders for preview)
  const userOrders = orders.filter((o) => !o.userId || o.userId === user.id);
  const recentOrders = userOrders.slice(0, 3);

  // Available vouchers
  const availableVouchers = user.vouchers.filter((v) => !v.isUsed);

  // Wishlist products
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id)).slice(0, 4);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editName.trim() || user.fullName,
      defaultAddress: editAddress.trim(),
      defaultCity: editCity.trim(),
      defaultDistrict: editDistrict.trim()
    });
    setIsEditingProfile(false);
    showToast('Đã lưu thông tin cá nhân!');
  };

  const handleExchangePoints = () => {
    const res = exchangePointsForVoucher();
    if (res.success) {
      showToast('Đổi điểm thành công!', res.message);
    } else {
      showToast('Không thể đổi điểm', res.message);
    }
  };

  const handleLogout = () => {
    logout();
    showToast('Đã đăng xuất tài khoản Mầm Kids');
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6A7F77] mb-6">
        <Link to="/" className="hover:text-[#4E8773] transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-[#355F52] font-semibold">Tài khoản thành viên</span>
      </nav>

      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#4E8773] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ECA032]" />
            Thành viên gia đình Mầm Kids
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tracking-tight mt-0.5">
            Xin chào, {user.fullName}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditName(user.fullName);
              setEditAddress(user.defaultAddress || '');
              setEditCity(user.defaultCity || '');
              setEditDistrict(user.defaultDistrict || '');
              setIsEditingProfile(true);
            }}
            className="px-4 py-2 rounded-xl bg-white border border-[#D2E3DC] hover:border-[#4E8773] text-[#355F52] text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Sửa thông tin</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Featured Tier & Progress Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#355F52] via-[#3A6759] to-[#4E8773] text-white p-6 sm:p-8 shadow-md mb-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Current Tier & Points */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5DFA0] text-[#2F403A] shadow-xs">
                Tích Điểm Mầm
              </span>
              <span className="text-xs text-[#EAF3EF] font-medium">
                Thành viên từ {user.joinedDate}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-4 sm:gap-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#F5DFA0] font-bold block">
                  Điểm hiện tại
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-5xl font-black font-heading tabular-nums text-white">
                    {user.mamPoints.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-sm font-bold text-[#FDF9F1]">điểm</span>
                </div>
              </div>

              <div className="h-8 w-px bg-white/20 hidden sm:block self-center" />

              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#D2E3DC] font-semibold block">
                  Đã tích luỹ
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-bold font-heading tabular-nums text-[#FDF9F1]">
                    {totalEarnedPoints.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-xs text-[#D2E3DC]">điểm</span>
                </div>
              </div>

              <div className="h-8 w-px bg-white/20 hidden sm:block self-center" />

              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#D2E3DC] font-semibold block">
                  Đã sử dụng
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl sm:text-2xl font-bold font-heading tabular-nums text-[#FDF9F1]">
                    {totalUsedPoints.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-xs text-[#D2E3DC]">điểm</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#EAF3EF]/90 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F5DFA0] shrink-0" />
              <span>Quy tắc: 1.000đ = 1 Điểm Mầm · 100 điểm = Voucher 10.000đ</span>
            </div>
          </div>

          {/* Right Column: Quick Voucher & Exchange Points Box */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#F5DFA0]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Voucher đang có ({availableVouchers.length})
                </span>
              </div>
              <Link
                to="/voucher"
                className="text-xs font-bold text-[#F5DFA0] hover:underline"
              >
                Xem tất cả mã →
              </Link>
            </div>

            <p className="text-xs text-[#EAF3EF] leading-relaxed">
              Bạn có thể sử dụng 100 Điểm Mầm để đổi thêm voucher giảm 10.000 VND áp dụng cho mọi đơn hàng.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={handleExchangePoints}
                disabled={user.mamPoints < 100}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#F5DFA0] hover:bg-[#F2D485] text-[#2F403A] text-xs font-bold transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ECA032]" />
                <span>Đổi 100 điểm lấy 10k</span>
              </button>
              <Link
                to="/san-pham"
                className="py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20 text-center"
              >
                Dùng voucher ngay
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
        {/* Stat 1: Điểm Mầm (Loyalty) */}
        <Link
          to="/diem-mam"
          className="p-4 rounded-2xl bg-white border border-[#EFE8D8] hover:border-[#4E8773] transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-8 h-8 rounded-xl bg-[#EAF3EF] text-[#4E8773] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-[#4E8773] group-hover:underline flex items-center">
              Loyalty <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#2F403A] font-heading tabular-nums">
            {user.mamPoints.toLocaleString('vi-VN')}
          </p>
          <p className="text-[11px] font-bold text-[#6A7F77] mt-0.5">Điểm Mầm (Mua sắm)</p>
        </Link>

        {/* Stat 2: Điểm Xanh (Hành trình xanh) */}
        <Link
          to="/mam-xanh"
          className="p-4 rounded-2xl bg-white border border-[#CDE0D7] hover:border-[#285A48] transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-8 h-8 rounded-xl bg-[#285A48] text-[#F4C95D] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Leaf className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-[#285A48] group-hover:underline flex items-center">
              Eco <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#285A48] font-heading tabular-nums">
            120
          </p>
          <p className="text-[11px] font-bold text-[#4E8773] mt-0.5">Điểm Xanh (Môi trường)</p>
        </Link>

        {/* Stat 3: Voucher khả dụng */}
        <Link
          to="/voucher"
          className="p-4 rounded-2xl bg-white border border-[#EFE8D8] hover:border-[#4E8773] transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-8 h-8 rounded-xl bg-[#FAF6EC] text-[#ECA032] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Ticket className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-[#4E8773] group-hover:underline flex items-center">
              Kho mã <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#2F403A] font-heading tabular-nums">
            {availableVouchers.length}
          </p>
          <p className="text-[11px] font-bold text-[#6A7F77] mt-0.5">Voucher có thể dùng</p>
        </Link>

        {/* Stat 4: Đơn hàng */}
        <Link
          to="/lich-su-don-hang"
          className="p-4 rounded-2xl bg-white border border-[#EFE8D8] hover:border-[#4E8773] transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-8 h-8 rounded-xl bg-[#F2F7F5] text-[#355F52] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Package className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-[#4E8773] group-hover:underline flex items-center">
              Xem hết <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#2F403A] font-heading tabular-nums">
            {userOrders.length}
          </p>
          <p className="text-[11px] font-bold text-[#6A7F77] mt-0.5">Đơn hàng đã đặt</p>
        </Link>

        {/* Stat 5: Bé yêu */}
        <Link
          to="/thong-tin-be"
          className="p-4 rounded-2xl bg-white border border-[#EFE8D8] hover:border-[#4E8773] transition-all shadow-xs group col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-8 h-8 rounded-xl bg-[#FDF2F4] text-[#E07A8A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Baby className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-[#4E8773] group-hover:underline flex items-center">
              Hồ sơ <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#2F403A] font-heading tabular-nums">
            {user.babies.length}
          </p>
          <p className="text-[11px] font-bold text-[#6A7F77] mt-0.5">Hồ sơ bé đã lưu</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Recent Orders + Baby Profiles */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section: Thông tin của bé */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE8D8] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF6EC] mb-5">
              <div>
                <h3 className="font-bold text-[#2F403A] text-lg font-heading flex items-center gap-2">
                  <Baby className="w-5 h-5 text-[#4E8773]" />
                  <span>Hồ sơ bé yêu ({user.babies.length})</span>
                </h3>
                <p className="text-xs text-[#6A7F77]">
                  Lưu số đo để Mầm Kids tự động gợi ý size chuẩn xác cho từng bé
                </p>
              </div>
              <Link
                to="/thong-tin-be"
                className="px-3.5 py-1.5 rounded-xl bg-[#EAF3EF] hover:bg-[#D2E3DC] text-[#355F52] text-xs font-bold transition-colors flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Thêm / Quản lý</span>
              </Link>
            </div>

            {user.babies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.babies.map((baby) => (
                  <div
                    key={baby.id}
                    className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] flex items-start gap-3.5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF6EC] text-[#355F52] flex items-center justify-center font-bold text-lg font-heading shrink-0 border border-[#F5DFA0]">
                      {baby.gender === 'be-gai' ? '👧' : baby.gender === 'be-trai' ? '👦' : '👶'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-[#2F403A] font-heading truncate">
                          {baby.name}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EAF3EF] text-[#355F52]">
                          Size {baby.preferredSize}
                        </span>
                      </div>
                      <p className="text-xs text-[#6A7F77] mt-0.5">
                        {baby.gender === 'be-gai' ? 'Bé gái' : 'Bé trai'} · Sinh {baby.birthDate}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-[#355F52] font-semibold mt-2">
                        {baby.height && <span>Cao: {baby.height} cm</span>}
                        {baby.weight && <span>Nặng: {baby.weight} kg</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-[#6A7F77]">
                <p>Bạn chưa thêm hồ sơ của bé nào.</p>
                <Link
                  to="/thong-tin-be"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#4E8773] hover:underline"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Thêm thông tin bé để nhận ngay +50 Điểm Mầm
                </Link>
              </div>
            )}
          </div>

          {/* Section: Đơn hàng gần đây */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE8D8] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF6EC] mb-5">
              <div>
                <h3 className="font-bold text-[#2F403A] text-lg font-heading flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#4E8773]" />
                  <span>Đơn hàng gần đây</span>
                </h3>
                <p className="text-xs text-[#6A7F77]">
                  Theo dõi trạng thái và lịch sử mua sắm của bạn
                </p>
              </div>
              <Link
                to="/lich-su-don-hang"
                className="text-xs font-bold text-[#4E8773] hover:text-[#355F52] hover:underline flex items-center gap-1"
              >
                <span>Xem tất cả ({userOrders.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] hover:border-[#D2E3DC] transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#FAF6EC]">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-[#2F403A] font-heading">
                          #{order.orderId}
                        </span>
                        <span className="text-xs text-[#6A7F77] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {order.createdAt}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EAF3EF] text-[#355F52]">
                        {order.status === 'cho-xac-nhan'
                          ? 'Chờ xác nhận'
                          : order.status === 'dang-chuan-bi'
                          ? 'Đang chuẩn bị'
                          : order.status === 'dang-giao'
                          ? 'Đang vận chuyển'
                          : 'Đã hoàn thành'}
                      </span>
                    </div>

                    <div className="py-3 flex flex-wrap gap-3 items-center">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#2F403A]">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-xl object-cover bg-white"
                          />
                          <div>
                            <p className="font-semibold truncate max-w-[140px]">{item.product.name}</p>
                            <p className="text-[11px] text-[#6A7F77]">
                              {item.selectedSize} · x{item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-xs text-[#6A7F77] font-semibold">
                          +{order.items.length - 3} món khác
                        </span>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#FAF6EC] flex items-center justify-between">
                      <div className="text-xs text-[#6A7F77]">
                        Tổng thanh toán:{' '}
                        <span className="font-bold text-sm text-[#355F52] tabular-nums font-heading">
                          {order.totalAmount.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                      <Link
                        to={`/xac-nhan-don-hang?id=${order.orderId}`}
                        className="text-xs font-bold text-[#4E8773] hover:underline flex items-center gap-1"
                      >
                        Chi tiết đơn →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="w-10 h-10 text-[#C1D2CB] mx-auto mb-2" />
                <p className="text-sm text-[#6A7F77]">Bạn chưa có đơn hàng nào tại Mầm Kids.</p>
                <Link
                  to="/san-pham"
                  className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white text-xs font-bold transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Khám phá trang phục cho bé ngay
                </Link>
              </div>
            )}
          </div>

          {/* Section: Sản phẩm yêu thích (Wishlist Quick View) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE8D8] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF6EC] mb-5">
              <div>
                <h3 className="font-bold text-[#2F403A] text-lg font-heading flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#E07A8A]" />
                  <span>Sản phẩm yêu thích ({wishlist.length})</span>
                </h3>
                <p className="text-xs text-[#6A7F77]">
                  Các trang phục bạn đã đánh dấu để mua sắm cho bé
                </p>
              </div>
              <Link
                to="/yeu-thich"
                className="text-xs font-bold text-[#4E8773] hover:text-[#355F52] hover:underline flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {wishlistProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] hover:border-[#D2E3DC] transition-all flex flex-col justify-between"
                  >
                    <Link to={`/san-pham/${prod.id}`} className="block">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full aspect-4/5 object-cover object-center rounded-xl bg-[#FAF6EE] mb-2"
                      />
                      <h4 className="font-bold text-xs text-[#2F403A] truncate font-heading">
                        {prod.name}
                      </h4>
                      <p className="text-xs font-bold text-[#355F52] mt-0.5 tabular-nums">
                        {prod.price.toLocaleString('vi-VN')} đ
                      </p>
                    </Link>
                    <button
                      onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                      className="mt-3 w-full py-1.5 rounded-lg bg-[#4E8773] hover:bg-[#355F52] text-white text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-[#6A7F77]">
                <p>Danh sách yêu thích đang trống.</p>
                <Link
                  to="/san-pham"
                  className="inline-block mt-2 text-xs font-bold text-[#4E8773] hover:underline"
                >
                  Dạo xem bộ sưu tập mới →
                </Link>
              </div>
            )}
          </div>

          {/* Section: Hành trình xanh của bé (Eco Badges & Green Journey) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#CDE0D7] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF6EC] mb-5">
              <div>
                <h3 className="font-bold text-[#285A48] text-lg font-heading flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-[#4E8773]" />
                  <span>Hành trình xanh của bé (120 Điểm Xanh)</span>
                </h3>
                <p className="text-xs text-[#5D726A]">
                  Gieo mầm thói quen xanh qua các thử thách Eco Story và chương trình Mầm Again
                </p>
              </div>
              <Link
                to="/mam-xanh"
                className="text-xs font-bold text-[#4E8773] hover:text-[#285A48] hover:underline flex items-center gap-1"
              >
                <span>Khám phá</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="p-3.5 rounded-2xl bg-[#EAF3EF] border border-[#D2E3DC] flex items-center gap-3">
                <span className="text-2xl">🐢</span>
                <div>
                  <h4 className="text-xs font-bold text-[#285A48]">Bạn Nhỏ Đại Dương</h4>
                  <p className="text-[10px] text-[#4E8773]">Đã cứu 5 chai nhựa biển</p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] flex items-center gap-3">
                <span className="text-2xl">🐻</span>
                <div>
                  <h4 className="text-xs font-bold text-[#285A48]">Vệ Binh Rừng Xanh</h4>
                  <p className="text-[10px] text-[#4E8773]">Bảo vệ cây non vươn chồi</p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF2DF] border border-[#F4E3BA] flex items-center gap-3">
                <span className="text-2xl">♻️</span>
                <div>
                  <h4 className="text-xs font-bold text-[#285A48]">Sứ Giả Mầm Again</h4>
                  <p className="text-[10px] text-[#4E8773]">Trao lại đồ cũ tuần hoàn</p>
                </div>
              </div>
            </div>

            {/* Note & CTAs */}
            <div className="p-3.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="text-[#5D726A]">
                <strong className="text-[#285A48]">💡 Phân biệt điểm:</strong> Điểm Xanh ghi nhận thói quen xanh của bé; Điểm Mầm dùng khấu trừ tiền khi mua sắm.
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/eco-story"
                  className="px-3 py-1.5 rounded-xl bg-[#4E8773] hover:bg-[#285A48] text-white font-bold text-xs shadow-2xs"
                >
                  Đọc Eco Story
                </Link>
                <Link
                  to="/mam-again"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#EAF3EF] text-[#285A48] border border-[#CDE0D7] font-bold text-xs"
                >
                  Mầm Again
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Vouchers preview & Quick links */}
        <div className="lg:col-span-4 space-y-6">
          {/* Vouchers Widget */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE8D8] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF6EC] mb-4">
              <h3 className="font-bold text-[#2F403A] text-base font-heading flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#ECA032]" />
                <span>Voucher của tôi</span>
              </h3>
              <Link
                to="/voucher"
                className="text-xs font-bold text-[#4E8773] hover:underline"
              >
                Xem hết
              </Link>
            </div>

            <div className="space-y-3">
              {availableVouchers.slice(0, 3).map((voucher) => (
                <div
                  key={voucher.id}
                  className="p-3.5 rounded-2xl bg-[#FAF6EC] border border-[#F5DFA0] flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#4E8773] text-white">
                      {voucher.code}
                    </span>
                    <p className="text-xs font-bold text-[#2F403A] mt-1.5">{voucher.title}</p>
                    <p className="text-[10px] text-[#6A7F77]">HSD: {voucher.expiryDate}</p>
                  </div>
                  <Link
                    to="/san-pham"
                    className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#355F52] hover:bg-[#28473D] text-white text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    Dùng
                  </Link>
                </div>
              ))}
            </div>

            <Link
              to="/voucher"
              className="mt-4 w-full py-2.5 rounded-xl bg-[#EAF3EF] hover:bg-[#D2E3DC] text-[#355F52] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Vào kho voucher ({availableVouchers.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Menu Links */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE8D8] shadow-xs">
            <h3 className="font-bold text-[#2F403A] text-sm uppercase tracking-wider mb-3">
              Quản lý tài khoản
            </h3>
            <ul className="space-y-1 text-xs">
              {[
                { label: 'Điểm tích lũy Mầm Kids', path: '/diem-mam', icon: Sparkles },
                { label: 'Kho voucher của tôi', path: '/voucher', icon: Ticket },
                { label: 'Lịch sử và theo dõi đơn hàng', path: '/lich-su-don-hang', icon: Package },
                { label: 'Hồ sơ số đo của bé yêu', path: '/thong-tin-be', icon: Baby },
                { label: 'Sản phẩm yêu thích', path: '/yeu-thich', icon: Heart },
                { label: 'Bảng quy đổi kích cỡ', path: '/huong-dan-size', icon: Award }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FDF9F1] text-[#2F403A] hover:text-[#4E8773] font-semibold transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4 text-[#8B9D95]" />
                      <span>{item.label}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#C1D2CB]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#2F403A]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsEditingProfile(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EFE8D8] p-6 sm:p-8 z-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF6EC] mb-5">
              <h3 className="text-lg font-bold text-[#2F403A] font-heading">
                Cập nhật thông tin cá nhân
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-xs font-semibold text-[#8B9D95] hover:text-[#2F403A]"
              >
                Đóng
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2F403A] mb-1.5">Họ và tên</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2F403A] mb-1.5">Địa chỉ giao hàng mặc định</label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  placeholder="Số nhà, tên đường, phường/xã..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2F403A] mb-1.5">Quận / Huyện</label>
                  <input
                    type="text"
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    placeholder="Quận Tây Hồ"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2F403A] mb-1.5">Tỉnh / Thành phố</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    placeholder="Hà Nội"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EFE8D8] text-xs font-bold text-[#6A7F77] hover:bg-[#FDF9F1]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
