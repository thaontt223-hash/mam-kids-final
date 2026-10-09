import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  Ticket,
  Copy,
  Check,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Info,
  Calendar,
  Gift
} from 'lucide-react';

export const VouchersPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState<'available' | 'used'>('available');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState('');

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/dang-nhap');
    }
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  const availableVouchers = user.vouchers.filter((v) => !v.isUsed);
  const usedVouchers = user.vouchers.filter((v) => v.isUsed);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast('Đã sao chép mã voucher!', code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const handleApplyCustomCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    showToast('Mã voucher hợp lệ!', `Đã thêm mã ${inputCode.toUpperCase()} vào ví của bạn.`);
    setInputCode('');
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
        <span className="text-[#355F52] font-semibold">Kho voucher của tôi</span>
      </nav>

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FAF6EC] to-[#FDF9F1] border border-[#F5DFA0] p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF3EF] text-[#355F52] mb-3">
            <Ticket className="w-3.5 h-3.5" />
            Đặc quyền thành viên Mầm
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tracking-tight">
            Kho voucher của tôi ({availableVouchers.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6A7F77] mt-1 max-w-xl">
            Sử dụng mã ưu đãi khi thanh toán hoặc tự động chọn trực tiếp ngay tại trang thanh toán đơn hàng.
          </p>
        </div>

        {/* Input claim custom code */}
        <form onSubmit={handleApplyCustomCode} className="w-full md:w-auto flex items-center gap-2">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Nhập mã voucher mới..."
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#EFE8D8] text-xs text-[#2F403A] placeholder-[#8B9D95] focus:outline-hidden focus:border-[#4E8773] uppercase font-bold"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-2xl bg-[#355F52] hover:bg-[#28473D] text-white text-xs font-bold transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            Lưu mã
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-[#EFE8D8] mb-8">
        <button
          onClick={() => setActiveTab('available')}
          className={`pb-3 text-sm font-bold transition-colors relative cursor-pointer ${
            activeTab === 'available' ? 'text-[#355F52]' : 'text-[#6A7F77] hover:text-[#2F403A]'
          }`}
        >
          <span>Khả dụng ({availableVouchers.length})</span>
          {activeTab === 'available' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-[#355F52] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('used')}
          className={`pb-3 text-sm font-bold transition-colors relative cursor-pointer ${
            activeTab === 'used' ? 'text-[#355F52]' : 'text-[#6A7F77] hover:text-[#2F403A]'
          }`}
        >
          <span>Đã sử dụng / Hết hạn ({usedVouchers.length})</span>
          {activeTab === 'used' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-[#355F52] rounded-full" />
          )}
        </button>
      </div>

      {/* Voucher List */}
      {activeTab === 'available' ? (
        availableVouchers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableVouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="bg-white rounded-3xl border border-[#EFE8D8] p-5 sm:p-6 shadow-xs hover:border-[#4E8773] hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Decorative border stub left */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#4E8773]" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF6EC] text-[#355F52] border border-[#F5DFA0]">
                      <Gift className="w-3 h-3 text-[#ECA032]" />
                      {voucher.badge || 'Ưu đãi'}
                    </span>
                    <span className="text-[11px] text-[#6A7F77] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      HSD: {voucher.expiryDate}
                    </span>
                  </div>

                  <h3 className="font-black text-base sm:text-lg text-[#2F403A] font-heading">
                    {voucher.title}
                  </h3>
                  <p className="text-xs text-[#6A7F77] mt-1 leading-relaxed">
                    {voucher.description}
                  </p>

                  <div className="mt-4 p-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#6A7F77] block font-semibold uppercase">
                        Mã voucher:
                      </span>
                      <span className="font-black text-base text-[#355F52] font-heading tracking-wider">
                        {voucher.code}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(voucher.code)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#D2E3DC] hover:bg-[#EAF3EF] text-[#355F52] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedCode === voucher.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-600">Đã sao chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#FAF6EC] flex items-center justify-between">
                  <span className="text-[11px] text-[#6A7F77]">
                    {voucher.minOrderValue > 0
                      ? `Áp dụng đơn từ ${voucher.minOrderValue.toLocaleString('vi-VN')} đ`
                      : 'Áp dụng cho mọi giá trị đơn hàng'}
                  </span>
                  <Link
                    to="/san-pham"
                    className="px-4 py-2 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Dùng ngay</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#EFE8D8]">
            <Ticket className="w-12 h-12 text-[#C1D2CB] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#2F403A]">Hiện chưa có voucher khả dụng</h3>
            <p className="text-xs text-[#6A7F77] mt-1">
              Bạn hãy theo dõi các chương trình mùa mới hoặc tích Điểm Mầm để đổi voucher nhé!
            </p>
          </div>
        )
      ) : (
        usedVouchers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-75">
            {usedVouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="bg-white rounded-3xl border border-[#EFE8D8] p-5 sm:p-6 shadow-xs relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">
                    ĐÃ SỬ DỤNG
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Sử dụng ngày: {voucher.usedAt || 'Trước đây'}
                  </span>
                </div>
                <h3 className="font-bold text-base text-gray-600 font-heading">
                  {voucher.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{voucher.description}</p>
                <div className="mt-3 text-xs font-mono font-bold text-gray-500">
                  Mã: {voucher.code}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#EFE8D8]">
            <p className="text-xs text-[#6A7F77]">Chưa có voucher nào đã sử dụng.</p>
          </div>
        )
      )}
    </div>
  );
};
