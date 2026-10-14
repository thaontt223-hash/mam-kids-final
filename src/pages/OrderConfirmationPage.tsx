import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Truck, Gift, Home, Phone, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext';
import { formatVND } from '../data/products';

export const OrderConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || '';
  const { getOrderById, orders } = useCart();
  const { language } = useLanguage();

  const order = (orderId ? getOrderById(orderId) : null) || orders[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center space-y-3 mb-10">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF3EF] text-[#4E8773] flex items-center justify-center shadow-xs border border-[#D4E5DE]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#4E8773] block font-heading">
          {language === 'en' ? 'Order Successful' : 'Đặt hàng thành công'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#3E5149] font-heading">
          {language === 'en' ? 'Thank you for choosing Mầm Kids!' : 'Cảm ơn bạn đã tin chọn Mầm Kids!'}
        </h1>
        <p className="text-sm text-[#5D6F66] max-w-md mx-auto">
          {language === 'en'
            ? 'Mầm Kids has received your order. We are carefully packing the sweetest outfits for your child.'
            : 'Mầm Kids đã nhận được đơn hàng của bạn. Chúng tôi đang chuẩn bị những bộ trang phục xinh xắn nhất gửi đến bé yêu.'}
        </p>
      </div>

      {order ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8D8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#FAF6EC] gap-3">
            <div>
              <span className="text-xs text-[#647B72] block">
                {language === 'en' ? 'Order Number:' : 'Mã số đơn hàng:'}
              </span>
              <span className="text-xl font-bold text-[#4E8773] tracking-wide font-heading">
                {order.orderId}
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-[#647B72] block">
                {language === 'en' ? 'Order Time:' : 'Thời gian đặt:'}
              </span>
              <span className="text-xs font-semibold text-[#3E5149]">
                {order.createdAt}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5D6F66] p-4 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8]">
            <div>
              <span className="font-bold text-[#3E5149] block mb-1">
                {language === 'en' ? 'Delivery Address:' : 'Địa chỉ nhận hàng của bé:'}
              </span>
              <p className="font-semibold text-[#3E5149]">{order.customerInfo.fullName}</p>
              <p>{order.customerInfo.phone}</p>
              <p className="mt-0.5">
                {order.customerInfo.address}, {order.customerInfo.district},{' '}
                {order.customerInfo.city}
              </p>
            </div>
            <div>
              <span className="font-bold text-[#3E5149] block mb-1">
                {language === 'en' ? 'Payment Method:' : 'Phương thức thanh toán:'}
              </span>
              <p className="font-semibold text-[#3E5149]">
                {order.customerInfo.paymentMethod === 'cod' && (language === 'en' ? 'Cash on Delivery (COD)' : 'Thanh toán tiền mặt khi nhận hàng (COD)')}
                {order.customerInfo.paymentMethod === 'bank_transfer' && (language === 'en' ? 'Bank Transfer' : 'Chuyển khoản ngân hàng')}
                {order.customerInfo.paymentMethod === 'e_wallet' && (language === 'en' ? 'E-Wallet' : 'Ví điện tử')}
              </p>
              <p className="text-[#647B72] mt-1">
                {language === 'en' ? 'Status: ' : 'Trạng thái: '}
                <strong className="text-[#4E8773]">
                  {language === 'en' ? 'Preparing Package' : 'Đang chuẩn bị gói hàng'}
                </strong>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#647B72] block">
              {language === 'en' ? 'Items in Order:' : 'Danh sách sản phẩm trong đơn:'}
            </span>
            <div className="divide-y divide-[#FAF6EC]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-15 aspect-4/5 rounded-xl object-cover object-center bg-[#FAF6EE] shrink-0 border border-[#EFE8D8]"
                    />
                    <div>
                      <p className="font-bold text-[#3E5149] font-heading">{item.product.name}</p>
                      <p className="text-[#647B72]">
                        Size: {item.selectedSize} · {language === 'en' ? 'Color' : 'Màu'}: {item.selectedColor.name} · {language === 'en' ? 'Qty' : 'SL'}: {item.quantity}
                      </p>
                      {item.personalization && (
                        <p className="text-[10px] text-[#4E8773] font-semibold mt-0.5">
                          {language === 'en' ? "Embroider child's name: " : 'Thêu tên bé: '}{item.personalization.childName} (
                          {item.personalization.position === 'chest'
                            ? (language === 'en' ? 'Front chest' : 'Trước ngực')
                            : (language === 'en' ? 'Back' : 'Sau lưng')})
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-[#4E8773] tabular-nums shrink-0 font-heading">
                    {formatVND(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF2DF] border border-[#EFE5CD] flex items-center justify-between text-xs text-[#3E5149]">
              <span className="flex items-center gap-1.5 font-bold">
                <Gift className="w-4 h-4 text-[#4E8773]" />
                {language === 'en' ? 'Complimentary Mầm Kids Canvas Tote' : 'Túi tote Mầm Kids tặng kèm'}
              </span>
              <span className="font-bold text-[#4E8773]">
                {language === 'en' ? 'Free Gift' : 'Miễn phí'}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#FAF6EC] space-y-2 text-xs text-[#5D6F66]">
            <div className="flex justify-between">
              <span>{language === 'en' ? 'Subtotal' : 'Tạm tính'}</span>
              <span className="tabular-nums font-semibold">{formatVND(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>{language === 'en' ? 'Voucher / Points Discount' : 'Giảm giá voucher / Điểm Mầm'}</span>
                <span className="tabular-nums font-bold">-{formatVND(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{language === 'en' ? 'Shipping Fee' : 'Phí vận chuyển'}</span>
              <span className="tabular-nums font-semibold">
                {order.shippingFee === 0
                  ? (language === 'en' ? 'Free' : 'Miễn phí')
                  : formatVND(order.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#FAF6EC] text-base font-bold text-[#3E5149]">
              <span>{language === 'en' ? 'Total Payment' : 'Tổng thanh toán'}</span>
              <span className="text-xl font-black text-[#4E8773] tabular-nums font-heading">
                {formatVND(order.totalAmount)}
              </span>
            </div>
          </div>

          {order.pointsEarned !== undefined && order.pointsEarned > 0 && (
            <div className="p-3.5 rounded-2xl bg-[#EAF3EF] border border-[#D2E3DC] flex items-center justify-between text-xs text-[#355F52]">
              <span className="flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4 text-[#4E8773]" />
                {language === 'en'
                  ? 'Earned Mầm Points from this order (1,000 VND = 1 point):'
                  : 'Điểm Mầm tích lũy từ đơn này (1.000đ = 1 điểm):'}
              </span>
              <span className="font-black font-heading text-sm text-[#4E8773]">
                +{order.pointsEarned.toLocaleString('vi-VN')} {language === 'en' ? 'pts' : 'điểm'}
              </span>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              to={`/theo-doi-don-hang?id=${order.orderId}`}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#4E8773] hover:bg-[#417361] text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'en' ? 'Track Order Progress' : 'Theo dõi tiến trình đơn hàng'}</span>
            </Link>

            <Link
              to="/"
              className="py-3.5 px-6 rounded-2xl bg-white hover:bg-[#FDF9F1] text-[#3E5149] font-bold text-xs sm:text-sm border border-[#EFE8D8] transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>{language === 'en' ? 'Back to Home' : 'Về trang chủ'}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-white rounded-3xl border border-[#EFE8D8] text-center space-y-3">
          <p className="text-sm text-[#647B72]">
            {language === 'en'
              ? 'Your order is saved in our system. You can look up its status anytime using the Order ID.'
              : 'Đơn hàng đã được lưu trên hệ thống. Bạn có thể tra cứu trạng thái bất kỳ lúc nào bằng mã đơn.'}
          </p>
          <Link
            to="/san-pham"
            className="inline-block px-6 py-2.5 rounded-xl bg-[#4E8773] text-white text-xs font-bold"
          >
            {language === 'en' ? 'Continue Shopping' : 'Tiếp tục mua sắm'}
          </Link>
        </div>
      )}

      <div className="mt-8 text-center text-xs text-[#647B72] flex items-center justify-center gap-2">
        <Phone className="w-3.5 h-3.5 text-[#4E8773]" />
        <span>
          {language === 'en'
            ? <>Need urgent assistance with your order? Call hotline: <strong>1900 6868</strong></>
            : <>Cần hỗ trợ gấp về đơn hàng? Gọi ngay hotline: <strong>1900 6868</strong></>}
        </span>
      </div>
    </div>
  );
};
