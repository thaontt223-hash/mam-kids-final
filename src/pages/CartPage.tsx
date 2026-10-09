import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Gift,
  Truck,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatVND } from '../data/products';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shippingFee,
    total,
    amountNeededForFreeShipping
  } = useCart();
  const { user, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  // 1. EMPTY CART STATE: Full page responsive view, not a popup/drawer
  if (cart.length === 0) {
    return (
      <div className="w-full max-w-full min-w-0 min-h-[65vh] flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16 text-center">
        <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-[#EFE8D8] p-6 sm:p-10 shadow-xs flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-[#FAF6EE] border border-[#EFE8D8] flex items-center justify-center text-[#355F52] mb-5 shadow-2xs">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading">
            Giỏ hàng của bạn đang trống
          </h1>
          <p className="text-xs sm:text-sm text-[#5D726A] mt-2 max-w-md mx-auto leading-relaxed">
            Chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các thiết kế thoáng mát, êm dịu và an toàn của Mầm Kids dành cho bé yêu nhé!
          </p>

          <div className="mt-7 w-full flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/san-pham"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#355F52] hover:bg-[#28473D] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <span>Khám phá sản phẩm ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Category Shortcuts */}
          <div className="mt-8 pt-6 border-t border-[#F0EBE0] w-full">
            <span className="text-xs font-semibold text-[#7A8E85] block mb-3">
              Gợi ý xem nhanh:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                to="/be-trai"
                className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-[#EFF5F2] text-xs font-medium text-[#2F403A] border border-[#EFE8D8] transition-colors"
              >
                👦 Thời trang Bé trai
              </Link>
              <Link
                to="/be-gai"
                className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-[#EFF5F2] text-xs font-medium text-[#2F403A] border border-[#EFE8D8] transition-colors"
              >
                👧 Thời trang Bé gái
              </Link>
              <Link
                to="/san-pham?category=the-thao"
                className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-[#EFF5F2] text-xs font-medium text-[#2F403A] border border-[#EFE8D8] transition-colors"
              >
                🏃 Đồ thể thao Active
              </Link>
              <Link
                to="/san-pham?category=bo-do"
                className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-[#EFF5F2] text-xs font-medium text-[#2F403A] border border-[#EFE8D8] transition-colors"
              >
                ✨ Set phối sẵn
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. FILLED CART STATE: Full fluid page, 100% width on mobile
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 min-w-0">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-5 mb-6 sm:mb-8 border-b border-[#EFE8D8]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#355F52] block mb-1 font-heading">
            Đơn hàng của bạn
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading">
            Giỏ hàng mua sắm ({cart.length} món)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#8B9D95] hover:text-red-600 transition-colors flex items-center gap-1 font-semibold p-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Xóa toàn bộ giỏ</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start w-full min-w-0">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4 w-full min-w-0">
          {/* Free Tote Alert Banner */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FAF2DF] border border-[#EFE5CD] flex items-center gap-3.5 shadow-xs w-full min-w-0">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white text-[#355F52] shadow-xs shrink-0">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-[#2F403A] font-heading">
                🎁 Tặng miễn phí 01 túi tote Mầm Kids cho mọi đơn hàng.
              </p>
              <p className="text-[11px] sm:text-xs text-[#5D6F66] mt-0.5 leading-snug">
                Túi canvas xinh xắn thân thiện môi trường, vừa vặn cho bé đựng tập vở hoặc đồ chơi.
              </p>
            </div>
          </div>

          {/* Freeship Progress */}
          {amountNeededForFreeShipping > 0 ? (
            <div className="p-3.5 rounded-2xl bg-white border border-[#EFE8D8] text-xs text-[#2F403A] flex items-center justify-between gap-2 shadow-xs w-full min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <Truck className="w-4 h-4 text-[#355F52] shrink-0" />
                <span className="truncate">
                  Mua thêm{' '}
                  <strong className="text-[#355F52] tabular-nums">
                    {formatVND(amountNeededForFreeShipping)}
                  </strong>{' '}
                  để được <strong>MIỄN PHÍ VẬN CHUYỂN</strong>!
                </span>
              </div>
              <Link
                to="/san-pham"
                className="font-bold text-[#355F52] hover:underline shrink-0 text-xs"
              >
                + Mua thêm
              </Link>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-[#EBF3EF] border border-[#D4E5DE] text-xs text-[#355F52] font-semibold flex items-center gap-2 w-full min-w-0">
              <Truck className="w-4 h-4 text-[#355F52] shrink-0" />
              <span>Tuyệt vời! Đơn hàng của bạn đã đủ điều kiện MIỄN PHÍ VẬN CHUYỂN toàn quốc.</span>
            </div>
          )}

          {/* Cart Items Cards */}
          <div className="space-y-3 w-full min-w-0">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#EFE8D8] shadow-xs flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-start sm:items-center justify-between w-full min-w-0"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 sm:w-20 sm:h-25 aspect-4/5 rounded-2xl object-cover object-center bg-[#FAF7F0] shrink-0 border border-[#EFE8D8]"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <Link
                      to={`/san-pham/${item.product.id}`}
                      className="font-bold text-[#2F403A] text-sm sm:text-base hover:text-[#355F52] transition-colors block truncate font-heading"
                    >
                      {item.product.name}
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#647B72]">
                      <span>Size: <strong className="text-[#2F403A]">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        Màu:
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <strong className="text-[#2F403A] truncate max-w-[100px]">{item.selectedColor.name}</strong>
                      </span>
                    </div>

                    {item.personalization && (
                      <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#FAF2DF] text-[10.5px] text-[#2F403A] border border-[#EFE5CD]">
                        <Sparkles className="w-3 h-3 text-[#355F52]" />
                        <span>
                          Thêu tên bé: <strong>{item.personalization.childName}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price, Stepper & Action on Mobile & Desktop */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-t-0 border-[#F0EBE0]">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#EFE8D8] rounded-xl bg-[#FAF7F0]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 text-xs font-bold text-[#2F403A] hover:bg-white rounded-l-xl transition-colors"
                      aria-label="Giảm số lượng"
                    >
                      -
                    </button>
                    <span className="px-2.5 py-1.5 text-xs font-bold text-[#2F403A] tabular-nums min-w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 text-xs font-bold text-[#2F403A] hover:bg-white rounded-r-xl transition-colors"
                      aria-label="Tăng số lượng"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <span className="block text-sm sm:text-base font-bold text-[#355F52] tabular-nums font-heading">
                      {formatVND(item.product.price * item.quantity)}
                    </span>
                    <span className="text-[10.5px] text-[#8B9D95] tabular-nums">
                      {formatVND(item.product.price)} / cái
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-[#8B9D95] hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                    title="Xóa món này"
                    aria-label="Xóa món này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping Link */}
          <div className="pt-2">
            <Link
              to="/san-pham"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#355F52] hover:underline transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tiếp tục chọn thêm đồ cho bé</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 w-full min-w-0">
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#EFE8D8] space-y-5 shadow-xs w-full min-w-0 lg:sticky lg:top-28">
            <h2 className="text-base font-bold text-[#2F403A] font-heading pb-3 border-b border-[#F0EBE0]">
              Tóm tắt đơn hàng
            </h2>

            {/* Member notification */}
            {isLoggedIn && user ? (
              <div className="p-3 rounded-2xl bg-[#EAF3EF] border border-[#D2E3DC] text-xs">
                <p className="font-bold text-[#355F52] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ECA032]" />
                  Ưu đãi thành viên Mầm Kids
                </p>
                <p className="text-[11px] text-[#5D726A] mt-0.5">
                  Bạn có <strong>{user.vouchers.filter((v) => !v.isUsed).length} voucher</strong> và <strong>{user.mamPoints} Điểm Mầm</strong> sẵn sàng dùng khi thanh toán.
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-[#FAF6EC] border border-[#F5DFA0] text-xs">
                <p className="font-bold text-[#355F52]">Bạn chưa đăng nhập?</p>
                <p className="text-[11px] text-[#6A7F77] mt-0.5">
                  <Link to="/dang-nhap" className="font-bold text-[#4E8773] hover:underline">Đăng nhập</Link> hoặc{' '}
                  <Link to="/dang-ky" className="font-bold text-[#4E8773] hover:underline">Đăng ký</Link> để nhận voucher 10% và tích Điểm Mầm.
                </p>
              </div>
            )}

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-[#5D726A]">
                <span>Tạm tính ({cart.length} món)</span>
                <span className="font-semibold text-[#2F403A] tabular-nums">{formatVND(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-700">
                  <span>Giảm giá khuyến mãi</span>
                  <span className="font-semibold tabular-nums">-{formatVND(discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[#5D726A]">
                <span>Phí vận chuyển</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">MIỄN PHÍ</span>
                  ) : (
                    <span className="font-semibold text-[#2F403A] tabular-nums">{formatVND(shippingFee)}</span>
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#F0EBE0] flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-bold text-[#2F403A] block">Tổng thanh toán</span>
                  <span className="text-[11px] text-[#8B9D95]">Đã gồm VAT & quà túi tote</span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-[#4E8773] tabular-nums font-heading">
                  {formatVND(total)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => navigate('/thanh-toan')}
              className="w-full py-3.5 rounded-2xl bg-[#4E8773] hover:bg-[#355F52] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 group active:scale-98"
            >
              <span>Tiến hành đặt hàng</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-[#F0EBE0] space-y-2 text-[11px] text-[#5D726A]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#355F52] shrink-0" />
                <span>Cam kết 100% chất vải an toàn cho trẻ nhỏ</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#355F52] shrink-0" />
                <span>Kiểm tra hàng trước khi thanh toán (Đồng kiểm COD)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
