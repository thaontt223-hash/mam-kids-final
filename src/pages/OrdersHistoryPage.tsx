import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  Package,
  Clock,
  ChevronRight,
  ExternalLink,
  ShoppingBag,
  RotateCcw,
  Sparkles,
  MapPin,
  CheckCircle2,
  Truck
} from 'lucide-react';

export const OrdersHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { orders, addToCart, showToast } = useCart();

  const [filterStatus, setFilterStatus] = useState<string>('all');

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/dang-nhap');
    }
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  // Filter orders by user ID (or fallback if empty)
  const userOrders = orders.filter((o) => !o.userId || o.userId === user.id);

  const filteredOrders = userOrders.filter((order) => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  const handleReorder = (order: typeof orders[0]) => {
    let count = 0;
    order.items.forEach((item) => {
      addToCart(item.product, item.selectedSize, item.selectedColor, item.quantity, item.personalization);
      count++;
    });
    showToast(`Đã thêm ${count} sản phẩm từ đơn #${order.orderId} vào giỏ hàng!`);
    navigate('/gio-hang');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'cho-xac-nhan':
        return { label: 'Chờ xác nhận', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'dang-chuan-bi':
        return { label: 'Đang chuẩn bị', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'dang-giao':
        return { label: 'Đang giao hàng', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'da-giao':
        return { label: 'Giao thành công', bg: 'bg-[#EAF3EF] text-[#355F52] border-[#D2E3DC]' };
      default:
        return { label: status, bg: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
        <span className="text-[#355F52] font-semibold">Lịch sử đơn hàng</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EFE8D8]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tracking-tight">
            Lịch sử đơn hàng ({userOrders.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6A7F77] mt-1">
            Quản lý, xem lại chi tiết và theo dõi hành trình giao nhận các đơn hàng của bạn
          </p>
        </div>

        {/* Status filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'cho-xac-nhan', label: 'Chờ xác nhận' },
            { id: 'dang-chuan-bi', label: 'Đang chuẩn bị' },
            { id: 'dang-giao', label: 'Đang giao' },
            { id: 'da-giao', label: 'Hoàn thành' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-[#355F52] text-white shadow-xs'
                  : 'bg-white text-[#6A7F77] hover:bg-[#FDF9F1] border border-[#EFE8D8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <div
                key={order.orderId}
                className="bg-white rounded-3xl border border-[#EFE8D8] p-5 sm:p-7 shadow-xs hover:border-[#D2E3DC] transition-all"
              >
                {/* Top row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#FAF6EC]">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-black text-base sm:text-lg text-[#2F403A] font-heading">
                      #{order.orderId}
                    </span>
                    <span className="text-xs text-[#6A7F77] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {order.createdAt}
                    </span>
                    {order.voucherCode && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF6EC] text-[#355F52] border border-[#F5DFA0]">
                        Voucher: {order.voucherCode}
                      </span>
                    )}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Items list */}
                <div className="py-4 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-14 h-17 sm:w-16 sm:h-20 aspect-4/5 rounded-2xl object-cover object-center bg-[#FAF6EE] shrink-0 border border-[#EFE8D8]"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/san-pham/${item.product.id}`}
                            className="font-bold text-xs sm:text-sm text-[#2F403A] hover:text-[#4E8773] transition-colors truncate block font-heading"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-[#6A7F77] mt-0.5">
                            Phân loại: {item.selectedSize} · Màu {item.selectedColor.name}
                          </p>
                          {item.personalization && (
                            <span className="inline-block text-[10px] font-bold text-[#355F52] bg-[#EAF3EF] px-1.5 py-0.5 rounded-md mt-1">
                              Thêu tên: &quot;{item.personalization.childName}&quot;
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-[#355F52] tabular-nums font-heading">
                          {item.product.price.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="block text-xs text-[#6A7F77]">x{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom row summary & Actions */}
                <div className="pt-4 border-t border-[#FAF6EC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-xs text-[#6A7F77] space-y-1">
                    <p>
                      Giao tới:{' '}
                      <strong className="text-[#2F403A]">
                        {order.customerInfo.fullName}
                      </strong>{' '}
                      ({order.customerInfo.phone}) - {order.customerInfo.address}, {order.customerInfo.city}
                    </p>
                    <p>
                      Tổng tiền hàng: <strong>{order.subtotal.toLocaleString('vi-VN')} đ</strong>
                      {order.discount > 0 && (
                        <span className="text-green-600 font-semibold ml-2">
                          · Giảm voucher: -{order.discount.toLocaleString('vi-VN')} đ
                        </span>
                      )}
                      {order.shippingFee > 0 && (
                        <span className="ml-2">
                          · Phí ship: +{order.shippingFee.toLocaleString('vi-VN')} đ
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <div className="text-right mr-2 hidden sm:block">
                      <span className="text-[11px] text-[#6A7F77] block">Tổng thanh toán:</span>
                      <span className="font-black text-lg text-[#355F52] font-heading tabular-nums">
                        {order.totalAmount.toLocaleString('vi-VN')} đ
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      className="px-3.5 py-2 rounded-xl bg-white border border-[#D2E3DC] hover:bg-[#EAF3EF] text-[#355F52] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Mua lại</span>
                    </button>

                    <Link
                      to={`/xac-nhan-don-hang?id=${order.orderId}`}
                      className="px-4 py-2 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Theo dõi đơn</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE8D8] shadow-xs">
          <Package className="w-12 h-12 text-[#C1D2CB] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#2F403A]">Không tìm thấy đơn hàng nào</h3>
          <p className="text-xs text-[#6A7F77] mt-1 max-w-sm mx-auto">
            Bạn chưa có đơn hàng nào phù hợp với bộ lọc hiện tại. Khám phá các thiết kế mới nhất cho bé ngay nhé!
          </p>
          <Link
            to="/san-pham"
            className="inline-flex items-center gap-1.5 mt-5 px-5 py-2.5 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Xem bộ sưu tập trang phục</span>
          </Link>
        </div>
      )}
    </div>
  );
};
