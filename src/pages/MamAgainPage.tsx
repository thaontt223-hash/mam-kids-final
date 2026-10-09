import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Heart, Gift, Award, CheckCircle2, ArrowRight, ShieldCheck, Truck, Sparkles, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const MamAgainPage: React.FC = () => {
  const { user, addPoints } = useAuth();
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    parentName: user?.fullName || '',
    phone: user?.phone || '',
    address: user?.defaultAddress ? `${user.defaultAddress}, ${user.defaultDistrict || ''}, ${user.defaultCity || ''}` : '',
    itemCount: '2-3',
    itemCondition: 'tot',
    rewardType: 'points', // 'points' | 'voucher'
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone || !formData.address) {
      showToast('Vui lòng điền đủ thông tin', 'Ba mẹ hãy cung cấp tên, số điện thoại và địa chỉ nhận đồ nhé!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);

      // Reward points if points selected
      if (formData.rewardType === 'points' && user && addPoints) {
        addPoints(100, 'Trao lại đồ cũ qua chương trình Mầm Again 🌱');
      }

      showToast(
        '🌱 Gửi yêu cầu Mầm Again thành công!',
        formData.rewardType === 'points'
          ? 'Đã cộng +100 Điểm Mầm vào tài khoản của ba mẹ!'
          : 'Mã voucher Mầm Again 50K đã được gửi vào hòm thư / tin nhắn của ba mẹ!'
      );
    }, 800);
  };

  return (
    <div className="w-full bg-[#FDF9F1] min-h-screen py-8 sm:py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Hero Banner Section */}
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-linear-to-br from-[#355F52] via-[#3E6C5E] to-[#4E8773] text-white p-8 sm:p-12 overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5DFA0] text-[#355F52] text-xs font-black uppercase tracking-wider shadow-2xs">
              <Recycle className="w-3.5 h-3.5" />
              <span>Chương trình Mầm Again · Vòng Đời Xanh</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-[#FFF9E6] leading-tight">
              Trao Lại Áo Cũ – Tiếp Nối Yêu Thương
            </h1>

            <p className="text-sm sm:text-base text-[#E8F1EC] leading-relaxed font-normal">
              Khi bé yêu đã lớn khôn và chiếc áo thân thương vừa chật, hãy để Mầm Kids cùng ba mẹ trao lại cho bạn nhỏ khác hoặc tái sinh thành sản phẩm hữu ích. Bé học cách sẻ chia, mẹ nhận quà xanh!
            </p>

            <div className="pt-2 flex items-center gap-4 flex-wrap text-xs text-[#FFF9E6]">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-[#F5DFA0]" /> Shipper nhận tận nhà miễn phí
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-[#F5DFA0]" /> Tích 100 Điểm Mầm hoặc Voucher 50K
              </span>
            </div>
          </div>

          {/* Decorative Background Accent */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute right-12 top-10 text-8xl opacity-15 select-none pointer-events-none">
            🌱
          </div>
        </div>

        {/* Vòng tuần hoàn khép kín: Mua → Mặc → Học → Bé lớn → Trao lại → Tái sử dụng */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CDE0D7] shadow-xs text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4E8773] block mb-2 font-heading">
            VÒNG TUẦN HOÀN THỜI TRANG MẦM KIDS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-black text-[#285A48]">
            <span className="px-3 py-1 rounded-xl bg-[#EAF3EF]">1. Mua</span>
            <span className="text-[#A8D5BA]">→</span>
            <span className="px-3 py-1 rounded-xl bg-[#EAF3EF]">2. Mặc</span>
            <span className="text-[#A8D5BA]">→</span>
            <span className="px-3 py-1 rounded-xl bg-[#EAF3EF]">3. Học</span>
            <span className="text-[#A8D5BA]">→</span>
            <span className="px-3 py-1 rounded-xl bg-[#FDF0ED] text-[#C96852]">4. Bé lớn</span>
            <span className="text-[#C96852]">→</span>
            <span className="px-3 py-1 rounded-xl bg-[#FDF0ED] text-[#C96852]">5. Trao lại</span>
            <span className="text-[#C96852]">→</span>
            <span className="px-3 py-1 rounded-xl bg-[#F4C95D] text-[#285A48]">6. Tái sử dụng & Tái sinh</span>
          </div>
        </div>

        {/* 3 Pillars / 4 Steps of Mầm Again */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#4E8773] block mb-1 font-heading">
              CÁCH THỨC HOẠT ĐỘNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#355F52] font-heading">
              Quy trình 4 bước đơn giản
            </h2>
            <p className="text-xs sm:text-sm text-[#5D726A] mt-1.5">
              Ba mẹ chỉ cần gom đồ vào túi, mọi khâu vận chuyển và làm sạch đã có Mầm Kids lo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-[24px] p-6 border border-[#EFE8D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="w-9 h-9 rounded-2xl bg-[#E8F1EC] text-[#355F52] flex items-center justify-center font-black text-sm mb-4">
                  1
                </span>
                <h3 className="text-base font-bold text-[#2F403A] mb-1.5 font-heading">
                  Gom đồ của bé
                </h3>
                <p className="text-xs text-[#5D726A] leading-relaxed">
                  Soạn các món quần áo Mầm Kids mà bé đã mặc chật, giặt sạch sẽ và gấp gọn gàng.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFE8D8] text-[11px] text-[#4E8773] font-semibold">
                ✓ Áp dụng cho mọi sản phẩm Mầm Kids
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-[#EFE8D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="w-9 h-9 rounded-2xl bg-[#FAF2DF] text-[#355F52] flex items-center justify-center font-black text-sm mb-4">
                  2
                </span>
                <h3 className="text-base font-bold text-[#2F403A] mb-1.5 font-heading">
                  Đăng ký gửi đồ
                </h3>
                <p className="text-xs text-[#5D726A] leading-relaxed">
                  Điền form đăng ký bên dưới. Shipper Mầm Kids sẽ liên hệ lấy đồ tận cửa nhà ba mẹ.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFE8D8] text-[11px] text-[#4E8773] font-semibold">
                ✓ Hoàn toàn miễn phí vận chuyển
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-[#EFE8D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="w-9 h-9 rounded-2xl bg-[#FCE7D8] text-[#355F52] flex items-center justify-center font-black text-sm mb-4">
                  3
                </span>
                <h3 className="text-base font-bold text-[#2F403A] mb-1.5 font-heading">
                  Phân loại & Tái sinh
                </h3>
                <p className="text-xs text-[#5D726A] leading-relaxed">
                  Đồ còn mới 90%+ được trao tặng cho các em nhỏ vùng cao; đồ sờn được tái chế thành túi vải.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFE8D8] text-[11px] text-[#4E8773] font-semibold">
                ✓ Minh bạch 100% điểm đến yêu thương
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-[#EFE8D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="w-9 h-9 rounded-2xl bg-[#E8F1EC] text-[#355F52] flex items-center justify-center font-black text-sm mb-4">
                  4
                </span>
                <h3 className="text-base font-bold text-[#2F403A] mb-1.5 font-heading">
                  Nhận quà tri ân
                </h3>
                <p className="text-xs text-[#5D726A] leading-relaxed">
                  Nhận ngay 100 Điểm Mầm tích lũy hoặc Voucher giảm 50.000đ cho đơn hàng tiếp theo.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFE8D8] text-[11px] text-[#4E8773] font-semibold">
                ✓ Cộng trực tiếp vào tài khoản
              </div>
            </div>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 border border-[#EFE8D8] shadow-xs">
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F1EC] text-[#355F52] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#2F403A] font-heading">
                  Cảm ơn ba mẹ đã cùng bé gieo mầm xanh! 🌱
                </h3>
                <p className="text-sm text-[#5D726A] max-w-md mx-auto leading-relaxed">
                  Đội ngũ Mầm Kids đã tiếp nhận yêu cầu gửi đồ của ba mẹ ({formData.phone}). Shipper sẽ liên hệ nhận hàng trong vòng 24–48 giờ tới.
                </p>
                <div className="pt-4 flex items-center justify-center gap-3">
                  <Link
                    to="/diem-mam"
                    className="px-5 py-2.5 rounded-xl bg-[#355F52] text-white text-xs font-bold hover:bg-[#2A4D42] transition-colors"
                  >
                    Xem Điểm Mầm của bạn
                  </Link>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#EFE8D8] text-[#5D726A] text-xs font-bold hover:bg-[#FDF9F1] transition-colors"
                  >
                    Gửi thêm đơn khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#4E8773] block mb-1 font-heading">
                    ĐĂNG KÝ GỬI ĐỒ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#2F403A] font-heading">
                    Thông tin gửi lại đồ qua Mầm Again
                  </h3>
                  <p className="text-xs text-[#5D726A] mt-1">
                    Điền thông tin để shipper Mầm Kids đến nhận hàng tận nhà nhé!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2F403A] mb-1.5">
                      Họ tên phụ huynh <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Phương Thảo"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EFE8D8] focus:border-[#355F52] focus:ring-1 focus:ring-[#355F52] outline-hidden text-xs bg-[#FDF9F1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2F403A] mb-1.5">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EFE8D8] focus:border-[#355F52] focus:ring-1 focus:ring-[#355F52] outline-hidden text-xs bg-[#FDF9F1]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2F403A] mb-1.5">
                    Địa chỉ nhận đồ tận nhà <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE8D8] focus:border-[#355F52] focus:ring-1 focus:ring-[#355F52] outline-hidden text-xs bg-[#FDF9F1]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2F403A] mb-1.5">
                      Số lượng món đồ gửi lại
                    </label>
                    <select
                      value={formData.itemCount}
                      onChange={(e) => setFormData({ ...formData, itemCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EFE8D8] focus:border-[#355F52] outline-hidden text-xs bg-[#FDF9F1]"
                    >
                      <option value="1">1 món đồ</option>
                      <option value="2-3">2 – 3 món đồ</option>
                      <option value="4-6">4 – 6 món đồ</option>
                      <option value="7+">7 món trở lên</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2F403A] mb-1.5">
                      Tình trạng đồ
                    </label>
                    <select
                      value={formData.itemCondition}
                      onChange={(e) => setFormData({ ...formData, itemCondition: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EFE8D8] focus:border-[#355F52] outline-hidden text-xs bg-[#FDF9F1]"
                    >
                      <option value="tot">Còn mới trên 90% (tặng lại cho bạn nhỏ khác)</option>
                      <option value="son">Đã sờn vải nhẹ (tái chế làm phụ kiện / túi vải)</option>
                      <option value="hon_hop">Hỗn hợp cả hai</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2F403A] mb-2">
                    Phần quà ba mẹ muốn nhận tri ân:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        formData.rewardType === 'points'
                          ? 'border-[#355F52] bg-[#E8F1EC]/50 text-[#355F52]'
                          : 'border-[#EFE8D8] bg-white text-[#5D726A]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="rewardType"
                        value="points"
                        checked={formData.rewardType === 'points'}
                        onChange={() => setFormData({ ...formData, rewardType: 'points' })}
                        className="mt-0.5 text-[#355F52] focus:ring-[#355F52]"
                      />
                      <div>
                        <strong className="block text-xs font-bold text-[#2F403A]">
                          Tích 100 Điểm Mầm
                        </strong>
                        <span className="text-[11px] text-[#5D726A]">
                          Cộng ngay vào tài khoản thành viên để đổi voucher bất kỳ lúc nào.
                        </span>
                      </div>
                    </label>

                    <label
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        formData.rewardType === 'voucher'
                          ? 'border-[#355F52] bg-[#FAF2DF] text-[#355F52]'
                          : 'border-[#EFE8D8] bg-white text-[#5D726A]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="rewardType"
                        value="voucher"
                        checked={formData.rewardType === 'voucher'}
                        onChange={() => setFormData({ ...formData, rewardType: 'voucher' })}
                        className="mt-0.5 text-[#355F52] focus:ring-[#355F52]"
                      />
                      <div>
                        <strong className="block text-xs font-bold text-[#2F403A]">
                          Nhận Voucher 50.000đ
                        </strong>
                        <span className="text-[11px] text-[#5D726A]">
                          Mã giảm giá 50.000đ áp dụng cho mọi đơn hàng từ 250.000đ.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2F403A] mb-1.5">
                    Lời nhắn gửi nhỏ của bé tới bạn tiếp theo (không bắt buộc)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Áo này từng đồng hành cùng bé Bơ đi sở thú, chúc bạn mới mặc thật vui nhé!"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE8D8] focus:border-[#355F52] outline-hidden text-xs bg-[#FDF9F1]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-[#355F52] hover:bg-[#2A4D42] text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Recycle className="w-4 h-4 text-[#F5DFA0]" />
                  <span>{loading ? 'Đang gửi thông tin...' : 'Xác nhận gửi đồ qua Mầm Again 🌱'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ about Mầm Again */}
        <div className="bg-[#FAF6EC] rounded-[28px] p-6 sm:p-8 border border-[#EFE8D8] space-y-4">
          <div className="flex items-center gap-2 text-[#355F52]">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-base font-bold font-heading">
              Câu hỏi thường gặp về chương trình Mầm Again
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#5D726A]">
            <div className="p-4 bg-white rounded-2xl border border-[#EFE8D8]">
              <strong className="text-[#2F403A] block mb-1 font-semibold">
                Đồ không phải của Mầm Kids có được gửi không?
              </strong>
              <p>
                Hiện tại chương trình ưu tiên thu nhận trang phục do Mầm Kids sản xuất để đảm bảo nguồn gốc chất liệu sợi tự nhiên có thể phân loại và tái chế tối ưu.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#EFE8D8]">
              <strong className="text-[#2F403A] block mb-1 font-semibold">
                Tôi có mất phí vận chuyển khi gửi đồ không?
              </strong>
              <p>
                Hoàn toàn không! Mầm Kids tài trợ 100% cước phí vận chuyển. Shipper sẽ đến tận cửa nhà ba mẹ để lấy đồ theo thời gian hẹn trước.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
