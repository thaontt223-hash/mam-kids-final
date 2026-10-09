import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  Banknote,
  Smartphone,
  Gift,
  ArrowLeft,
  Lock,
  CheckCircle2,
  Sparkles,
  Ticket,
  User,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatVND } from '../data/products';
import { CustomerInfo } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, shippingFee, createOrder } = useCart();
  const { user, isLoggedIn, useVoucher, addPoints, redeemPoints } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    city: user?.defaultCity || 'Hà Nội',
    district: user?.defaultDistrict || 'Quận Tây Hồ',
    address: user?.defaultAddress || '',
    notes: '',
    paymentMethod: 'cod' as CustomerInfo['paymentMethod']
  });

  // Pre-fill when user changes
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.fullName,
        phone: prev.phone || user.phone,
        email: prev.email || user.email,
        address: prev.address || user.defaultAddress || '',
        city: prev.city || user.defaultCity || 'Hà Nội',
        district: prev.district || user.defaultDistrict || ''
      }));
    }
  }, [user]);

  // Member Voucher and Points state
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<string>('');
  const [usePointsToggle, setUsePointsToggle] = useState<boolean>(false);

  const availableVouchers = user?.vouchers.filter(
    (v) => !v.isUsed && subtotal >= v.minOrderValue
  ) || [];

  // Calculate voucher discount
  let voucherDiscount = 0;
  if (selectedVoucherCode && user) {
    const v = user.vouchers.find((item) => item.code === selectedVoucherCode && !item.isUsed);
    if (v) {
      if (v.discountType === 'percentage') {
        const raw = Math.round((subtotal * v.discountValue) / 100);
        voucherDiscount = v.maxDiscount ? Math.min(raw, v.maxDiscount) : raw;
      } else if (v.discountType === 'fixed') {
        voucherDiscount = v.discountValue;
      } else if (v.discountType === 'shipping') {
        voucherDiscount = Math.min(shippingFee, v.discountValue);
      }
    }
  }

  // Calculate points discount (100 points = 1.000đ)
  const remainingBeforePoints = Math.max(0, subtotal - voucherDiscount + shippingFee);
  const maxPointsCanUse = user ? Math.min(user.mamPoints, Math.floor(remainingBeforePoints / 10)) : 0;
  const pointsDiscount = usePointsToggle && user && user.mamPoints >= 50
    ? Math.min(remainingBeforePoints, Math.floor(user.mamPoints / 100) * 1000)
    : 0;
  const pointsUsedCount = pointsDiscount > 0 ? (pointsDiscount / 10) : 0;

  const totalDiscount = voucherDiscount + pointsDiscount;
  const finalTotal = Math.max(0, subtotal - totalDiscount + shippingFee);
  const pointsEarnedCount = Math.floor(subtotal / 1000);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#3E5149] font-heading">Không có sản phẩm nào để thanh toán</h2>
        <p className="text-sm text-[#647B72]">
          Vui lòng thêm sản phẩm vào giỏ hàng trước khi tiến hành thanh toán.
        </p>
        <Link
          to="/san-pham"
          className="inline-block mt-4 px-6 py-3 rounded-2xl bg-[#4E8773] text-white text-xs font-bold"
        >
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Vui lòng nhập họ và tên của bạn';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại nhận hàng';
    } else if (!/(0[3|5|7|8|9])+([0-9]{8})\b/.test(formData.phone.trim())) {
      errs.phone = 'Số điện thoại chưa hợp lệ (gồm 10 chữ số)';
    }
    if (!formData.address.trim()) {
      errs.address = 'Vui lòng nhập số nhà, tên đường hoặc thôn/xã';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder(
        {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          address: formData.address.trim(),
          city: formData.city,
          district: formData.district,
          notes: formData.notes.trim() || undefined,
          paymentMethod: formData.paymentMethod
        },
        {
          userId: user?.id,
          discount: totalDiscount,
          voucherCode: selectedVoucherCode || undefined,
          pointsUsed: usePointsToggle ? pointsUsedCount : undefined,
          pointsEarned: pointsEarnedCount
        }
      );

      // Apply member account rewards if logged in
      if (user) {
        if (selectedVoucherCode) {
          useVoucher(selectedVoucherCode);
        }
        if (usePointsToggle && pointsUsedCount > 0) {
          redeemPoints(pointsUsedCount, `Dùng điểm cho đơn hàng #${order.orderId}`);
        }
        if (pointsEarnedCount > 0) {
          addPoints(
            pointsEarnedCount,
            `Tích điểm đơn hàng #${order.orderId} (${formatVND(subtotal)})`,
            order.orderId
          );
        }
      }

      setIsSubmitting(false);
      navigate(`/xac-nhan-don-hang?id=${order.orderId}`);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-[#EFE8D8] flex items-center justify-between">
        <div>
          <Link
            to="/gio-hang"
            className="text-xs font-semibold text-[#647B72] hover:text-[#4E8773] flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại giỏ hàng</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3E5149] font-heading">
            Thanh toán đơn hàng
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#355E50] font-bold bg-[#EBF3EF] px-3.5 py-1.5 rounded-full border border-[#D4E5DE]">
          <Lock className="w-3.5 h-3.5 text-[#4E8773]" />
          <span>Bảo mật đơn hàng 100%</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Form: Customer & Delivery Info */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Thông tin giao hàng */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#FAF6EC] pb-3">
                <h3 className="font-bold text-[#3E5149] text-base sm:text-lg flex items-center gap-2 font-heading">
                  <span className="w-6 h-6 rounded-full bg-[#4E8773] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  Thông tin giao hàng cho bé
                </h3>
                <span className="text-xs text-[#647B72]">Không cần đăng ký tài khoản</span>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                  Họ và tên người nhận <span className="text-[#F4B99B]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Thị Mai"
                  className={`w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border text-sm text-[#3E5149] focus:outline-hidden focus:border-[#4E8773] ${
                    errors.fullName ? 'border-red-400' : 'border-[#EFE8D8]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                    Số điện thoại nhận hàng <span className="text-[#F4B99B]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ví dụ: 0912345678"
                    className={`w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border text-sm text-[#3E5149] focus:outline-hidden focus:border-[#4E8773] ${
                      errors.phone ? 'border-red-400' : 'border-[#EFE8D8]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                    Email nhận thông báo đơn (tùy chọn)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>
              </div>

              {/* City & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                    Tỉnh / Thành phố
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] focus:outline-hidden focus:border-[#4E8773]"
                  >
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Tỉnh thành khác">Tỉnh thành khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                    Quận / Huyện
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="Quận/Huyện"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>
              </div>

              {/* Address details */}
              <div>
                <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                  Địa chỉ chi tiết (Số nhà, tên đường, tòa nhà) <span className="text-[#F4B99B]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ví dụ: 123 Lê Lợi, Phường Bến Nghé"
                  className={`w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border text-sm text-[#3E5149] focus:outline-hidden focus:border-[#4E8773] ${
                    errors.address ? 'border-red-400' : 'border-[#EFE8D8]'
                  }`}
                />
                {errors.address && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                  Ghi chú cho shipper (tùy chọn)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao 15 phút..."
                  className="w-full px-4 py-2 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-xs text-[#3E5149] focus:outline-hidden focus:border-[#4E8773]"
                />
              </div>
            </div>

            {/* Step 2: Phương thức thanh toán */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#FAF6EC] pb-3">
                <h3 className="font-bold text-[#3E5149] text-base sm:text-lg flex items-center gap-2 font-heading">
                  <span className="w-6 h-6 rounded-full bg-[#4E8773] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  Phương thức thanh toán
                </h3>
              </div>

              <div className="space-y-3">
                {/* COD */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#4E8773] bg-[#EBF3EF] ring-1 ring-[#4E8773]'
                      : 'border-[#EFE8D8] bg-white hover:border-[#4E8773]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="mt-1 text-[#4E8773] focus:ring-[#4E8773]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-[#4E8773]" />
                      <span className="text-sm font-bold text-[#3E5149]">
                        COD – Thanh toán tiền mặt khi nhận hàng
                      </span>
                    </div>
                    <p className="text-xs text-[#647B72] mt-1">
                      Kiểm tra hàng trước khi thanh toán. An tâm tuyệt đối cho ba mẹ.
                    </p>
                  </div>
                </label>

                {/* Bank transfer */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'bank_transfer'
                      ? 'border-[#4E8773] bg-[#EBF3EF] ring-1 ring-[#4E8773]'
                      : 'border-[#EFE8D8] bg-white hover:border-[#4E8773]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                    className="mt-1 text-[#4E8773] focus:ring-[#4E8773]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#4E8773]" />
                      <span className="text-sm font-bold text-[#3E5149]">
                        Chuyển khoản ngân hàng (Vietcombank / MB / QR Pay)
                      </span>
                    </div>
                    <p className="text-xs text-[#647B72] mt-1">
                      Chuyển khoản qua số tài khoản chính thức hoặc quét mã VietQR tự động.
                    </p>

                    {formData.paymentMethod === 'bank_transfer' && (
                      <div className="mt-3 p-3.5 rounded-xl bg-white border border-[#D4E5DE] text-xs space-y-1.5 text-[#3E5149]">
                        <div className="font-bold text-[#4E8773]">Thông tin tài khoản Mầm Kids:</div>
                        <div>Ngân hàng: <strong>Vietcombank (Chi nhánh TP.HCM)</strong></div>
                        <div>Số tài khoản: <strong className="tabular-nums">1029 888 999</strong></div>
                        <div>Chủ tài khoản: <strong>CÔNG TY TNHH THỜI TRANG MẦM KIDS</strong></div>
                        <div className="text-[11px] text-[#647B72] italic pt-1">
                          Nội dung chuyển khoản: Tên bạn + SĐT (Hệ thống sẽ tự động xác nhận đơn ngay khi nhận tiền)
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* E-wallet */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'e_wallet'
                      ? 'border-[#4E8773] bg-[#EBF3EF] ring-1 ring-[#4E8773]'
                      : 'border-[#EFE8D8] bg-white hover:border-[#4E8773]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="e_wallet"
                    checked={formData.paymentMethod === 'e_wallet'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'e_wallet' })}
                    className="mt-1 text-[#4E8773] focus:ring-[#4E8773]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-[#4E8773]" />
                      <span className="text-sm font-bold text-[#3E5149]">
                        Ví điện tử MoMo / ZaloPay / ShopeePay
                      </span>
                    </div>
                    <p className="text-xs text-[#647B72] mt-1">
                      Thanh toán một chạm nhanh chóng qua ứng dụng ví điện tử trên điện thoại.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary: Items & Order Total */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-white border border-[#EFE8D8] space-y-6 shadow-xs sticky top-28">
              <h3 className="font-bold text-[#3E5149] text-lg border-b border-[#EFE8D8] pb-3 flex items-center justify-between font-heading">
                <span>Đơn hàng của bạn</span>
                <span className="text-xs font-semibold text-[#647B72]">
                  {cart.length} sản phẩm
                </span>
              </h3>

              {/* Items preview list */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-15 aspect-4/5 rounded-xl object-cover object-center bg-[#FAF6EE] shrink-0 border border-[#EFE8D8]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#3E5149] truncate font-heading">{item.product.name}</p>
                      <p className="text-[#647B72]">
                        {item.selectedSize} · SL: {item.quantity}
                      </p>
                      {item.personalization && (
                        <p className="text-[10px] text-[#4E8773] font-semibold">
                          Thêu tên: {item.personalization.childName}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-[#4E8773] tabular-nums shrink-0 font-heading">
                      {formatVND(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Free Tote bag indication */}
              <div className="p-3 rounded-2xl bg-[#FAF2DF] border border-[#EFE5CD] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-[#3E5149]">
                  <Gift className="w-4 h-4 text-[#4E8773]" />
                  Túi tote Mầm Kids tặng kèm
                </span>
                <span className="text-[#4E8773] font-bold">0 VND (Miễn phí)</span>
              </div>

              {/* Member Rewards Section */}
              {isLoggedIn && user ? (
                <div className="p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#355F52] flex items-center gap-1.5 font-heading">
                      <Sparkles className="w-4 h-4 text-[#ECA032]" />
                      Ưu đãi thành viên Mầm Kids
                    </span>
                    <span className="text-[11px] font-bold text-[#ECA032] tabular-nums">
                      Ví: {user.mamPoints} điểm
                    </span>
                  </div>

                  {/* Voucher picker */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#2F403A] mb-1">
                      Chọn voucher thành viên:
                    </label>
                    <select
                      value={selectedVoucherCode}
                      onChange={(e) => setSelectedVoucherCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#EFE8D8] text-xs text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                    >
                      <option value="">Không sử dụng voucher</option>
                      {availableVouchers.map((v) => (
                        <option key={v.id} value={v.code}>
                          {v.code} - {v.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Use Points checkbox */}
                  {user.mamPoints >= 50 && (
                    <div className="pt-2 border-t border-[#EFE8D8]/60 flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2F403A]">
                        <input
                          type="checkbox"
                          checked={usePointsToggle}
                          onChange={(e) => setUsePointsToggle(e.target.checked)}
                          className="w-4 h-4 rounded text-[#4E8773] focus:ring-[#4E8773]"
                        />
                        <span className="font-semibold">
                          Dùng Điểm Mầm ({Math.floor(user.mamPoints / 100) * 100} điểm)
                        </span>
                      </label>
                      <span className="text-xs font-bold text-green-700">
                        -{formatVND(Math.floor(user.mamPoints / 100) * 1000)}
                      </span>
                    </div>
                  )}

                  {/* Expected points to earn */}
                  <div className="pt-1 text-[11px] text-[#4E8773] font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Đơn này sẽ tích lũy: +{pointsEarnedCount} Điểm Mầm</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-[#FAF6EC] border border-[#F5DFA0] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#355F52]">Đăng ký thành viên Mầm Kids</p>
                    <p className="text-[11px] text-[#6A7F77]">Tích điểm và nhận voucher 10% ngay!</p>
                  </div>
                  <Link
                    to="/dang-nhap"
                    className="px-3 py-1.5 rounded-xl bg-[#4E8773] text-white font-bold text-[11px] shrink-0 hover:bg-[#355F52]"
                  >
                    Đăng nhập
                  </Link>
                </div>
              )}

              {/* Calculations */}
              <div className="space-y-2.5 text-xs sm:text-sm text-[#5D6F66] pt-2 border-t border-[#EFE8D8]">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="font-semibold tabular-nums text-[#3E5149]">
                    {formatVND(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-[#4E8773] font-bold">Miễn phí giao hàng</span>
                    ) : (
                      formatVND(shippingFee)
                    )}
                  </span>
                </div>

                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Voucher ({selectedVoucherCode})</span>
                    <span className="tabular-nums">-{formatVND(voucherDiscount)}</span>
                  </div>
                )}

                {pointsDiscount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Điểm Mầm quy đổi</span>
                    <span className="tabular-nums">-{formatVND(pointsDiscount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#EFE8D8] flex justify-between items-baseline">
                  <span className="text-base font-bold text-[#3E5149]">Tổng thanh toán</span>
                  <span className="text-2xl font-black text-[#4E8773] tabular-nums font-heading">
                    {formatVND(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-[#4E8773] hover:bg-[#417361] text-white font-bold text-sm sm:text-base transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn hàng...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Hoàn tất đặt hàng</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#647B72] text-center space-y-1">
                <p>Nhân viên Mầm Kids sẽ gọi điện xác nhận đơn trong vòng 15 phút.</p>
                <p>Đổi trả miễn phí trong 15 ngày nếu bé mặc không vừa.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
