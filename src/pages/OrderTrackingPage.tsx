import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, CheckCircle2, Clock, AlertCircle, Phone, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatVND } from '../data/products';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { getOrderById, orders } = useCart();
  const [searchCode, setSearchCode] = useState(searchParams.get('id') || '');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setSearchCode(id);
      handleSearch(id);
    } else if (orders.length > 0) {
      setSearchedOrder(orders[0]);
    }
  }, [searchParams, orders]);

  const handleSearch = (codeToSearch?: string) => {
    const targetCode = (codeToSearch || searchCode).trim();
    if (!targetCode) return;

    const found = getOrderById(targetCode);
    if (found) {
      setSearchedOrder(found);
      setNotFound(false);
    } else {
      const foundByPhone = orders.find((o) => o.customerInfo.phone.includes(targetCode));
      if (foundByPhone) {
        setSearchedOrder(foundByPhone);
        setNotFound(false);
      } else {
        setSearchedOrder(null);
        setNotFound(true);
      }
    }
  };

  const steps = [
    { title: 'Tiếp nhận đơn', desc: 'Đã nhận đơn và tạo mã', done: true },
    { title: 'Chuẩn bị hàng', desc: 'Kiểm tra chất vải & thêu tên', done: true },
    { title: 'Đang vận chuyển', desc: 'Bưu tá đang giao đến bé', done: false },
    { title: 'Giao thành công', desc: 'Bé nhận trang phục xinh', done: false }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <Link
          to="/"
          className="text-xs font-semibold text-[#647B72] hover:text-[#4E8773] flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về trang chủ</span>
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider text-[#4E8773] block font-heading">
          Tra cứu bưu phẩm
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#3E5149] font-heading">
          Theo dõi tiến trình đơn hàng
        </h1>
        <p className="text-xs sm:text-sm text-[#5D6F66] mt-1">
          Nhập mã đơn hàng (ví dụ: MK-26...) hoặc số điện thoại người nhận để kiểm tra trạng thái
        </p>
      </div>

      {/* Search Input Box */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Nhập mã đơn hàng hoặc số điện thoại..."
              className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] placeholder-[#8B9D95] focus:outline-hidden focus:border-[#4E8773]"
            />
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#8B9D95]" />
          </div>
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-[#4E8773] hover:bg-[#417361] text-white font-bold text-sm transition-colors shadow-xs"
          >
            Tra cứu đơn
          </button>
        </form>
      </div>

      {notFound && (
        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-center space-y-2">
          <AlertCircle className="w-6 h-6 text-amber-700 mx-auto" />
          <h4 className="font-bold text-amber-900 text-sm">Chưa tìm thấy đơn hàng này</h4>
          <p className="text-xs text-amber-800">
            Vui lòng kiểm tra lại mã đơn hàng hoặc liên hệ hotline <strong>1900 6868</strong> để được hỗ trợ kiểm tra trực tiếp.
          </p>
        </div>
      )}

      {/* Result Display */}
      {searchedOrder && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8D8] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#FAF6EC] gap-2">
            <div>
              <span className="text-xs text-[#647B72]">Mã đơn hàng:</span>
              <h3 className="text-xl font-black text-[#4E8773] font-heading">{searchedOrder.orderId}</h3>
            </div>
            <div className="text-left sm:text-right text-xs text-[#647B72]">
              <div>Ngày đặt: <strong>{searchedOrder.createdAt}</strong></div>
              <div>Dự kiến nhận hàng: <strong>Sau 2-3 ngày</strong></div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#647B72] block mb-4">
              Tiến độ giao hàng:
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {steps.map((st, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
                    st.done
                      ? 'bg-[#EBF3EF] border-[#D4E5DE] text-[#355E50]'
                      : 'bg-[#FDF9F1] border-[#EFE8D8] text-[#8B9D95]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">{st.title}</span>
                    {st.done ? (
                      <CheckCircle2 className="w-4 h-4 text-[#4E8773]" />
                    ) : (
                      <Clock className="w-4 h-4 opacity-50" />
                    )}
                  </div>
                  <p className="text-[11px] leading-tight opacity-90">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Receiver Info */}
          <div className="p-4 rounded-2xl bg-[#FDF9F1] text-xs space-y-1 text-[#5D6F66] border border-[#EFE8D8]">
            <p>
              Người nhận: <strong>{searchedOrder.customerInfo.fullName}</strong> · SĐT:{' '}
              <strong>{searchedOrder.customerInfo.phone}</strong>
            </p>
            <p>
              Địa chỉ:{' '}
              {searchedOrder.customerInfo.address}, {searchedOrder.customerInfo.district},{' '}
              {searchedOrder.customerInfo.city}
            </p>
            <p>
              Tổng số tiền:{' '}
              <strong className="text-[#4E8773] font-bold">
                {formatVND(searchedOrder.totalAmount)}
              </strong>
            </p>
          </div>

          {/* Items */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-[#3E5149]">Trang phục trong kiện:</span>
            {searchedOrder.items.map((it: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-[#FAF6EC]">
                <span>
                  {it.product.name} ({it.selectedSize}) x {it.quantity}
                </span>
                <span className="font-bold tabular-nums text-[#4E8773] font-heading">
                  {formatVND(it.product.price * it.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center text-xs text-[#647B72] flex items-center justify-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#4E8773]" />
            <span>Cần thay đổi địa chỉ hoặc giờ giao hàng? Vui lòng gọi: <strong>1900 6868</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
