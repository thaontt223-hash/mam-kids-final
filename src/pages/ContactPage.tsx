import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#4E8773] block font-heading">
          {language === 'en' ? 'Connect with Mầm Kids' : 'Kết nối cùng Mầm Kids'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#3E5149] font-heading">
          {language === 'en' ? 'Contact & Showrooms' : 'Liên hệ & Hệ thống Showroom'}
        </h1>
        <p className="text-sm text-[#5D6F66]">
          {language === 'en'
            ? 'We are always glad to assist parents anytime.'
            : 'Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ quý phụ huynh 24/7.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs space-y-6">
            <h3 className="font-bold text-[#3E5149] text-lg border-b border-[#FAF6EC] pb-3 font-heading">
              {language === 'en' ? 'Direct Contact Information' : 'Thông tin liên hệ trực tiếp'}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#5D6F66]">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#4E8773] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#3E5149]">
                    {language === 'en' ? 'Support & Ordering Hotline:' : 'Hotline tư vấn & đặt hàng:'}
                  </strong>
                  <a href="tel:19006868" className="font-bold text-base text-[#4E8773] hover:underline">
                    1900 6868
                  </a>
                  <p className="text-[11px] text-[#8B9D95]">
                    {language === 'en'
                      ? 'Standard rate 1,000 VND/min (8:00 AM – 9:00 PM daily)'
                      : 'Cước phí 1.000đ/phút (8:00 – 21:00 hàng ngày)'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#4E8773] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#3E5149]">
                    {language === 'en' ? 'Email Support:' : 'Hòm thư điện tử:'}
                  </strong>
                  <p>chamsockhachhang@mamkids.vn</p>
                  <p className="text-[11px] text-[#8B9D95]">
                    {language === 'en' ? 'Replies within 2 working hours' : 'Phản hồi trong vòng 2 giờ làm việc'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#4E8773] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#3E5149]">
                    {language === 'en' ? 'Operating Hours:' : 'Thời gian mở cửa:'}
                  </strong>
                  <p>
                    {language === 'en'
                      ? 'Monday – Sunday: 8:30 AM – 9:30 PM'
                      : 'Thứ Hai – Chủ Nhật: 8:30 – 21:30'}
                  </p>
                  <p className="text-[11px] text-[#8B9D95]">
                    {language === 'en' ? 'Open on holidays and Tet' : 'Mở cửa cả ngày lễ và Tết'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Showrooms list */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs space-y-4">
            <h3 className="font-bold text-[#3E5149] text-lg border-b border-[#FAF6EC] pb-3 font-heading">
              {language === 'en' ? 'Store System' : 'Hệ thống cửa hàng'}
            </h3>

            <div className="space-y-4 text-xs text-[#5D6F66]">
              <div className="p-4 rounded-2xl bg-[#FDF9F1] space-y-1 border border-[#EFE8D8]">
                <div className="flex items-center gap-1.5 font-bold text-[#3E5149] text-sm">
                  <MapPin className="w-4 h-4 text-[#4E8773]" />
                  <span>{language === 'en' ? 'Showroom 1 (Ho Chi Minh City)' : 'Showroom 1 (TP. Hồ Chí Minh)'}</span>
                </div>
                <p>186 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận 3, TP.HCM</p>
                <p className="text-[#8B9D95]">{language === 'en' ? 'Phone:' : 'Điện thoại:'} 028 3822 6868</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDF9F1] space-y-1 border border-[#EFE8D8]">
                <div className="flex items-center gap-1.5 font-bold text-[#3E5149] text-sm">
                  <MapPin className="w-4 h-4 text-[#4E8773]" />
                  <span>{language === 'en' ? 'Showroom 2 (Hanoi)' : 'Showroom 2 (Hà Nội)'}</span>
                </div>
                <p>45 Phố Huế, Phường Hàng Bài, Quận Hai Bà Trưng, Hà Nội</p>
                <p className="text-[#8B9D95]">{language === 'en' ? 'Phone:' : 'Điện thoại:'} 024 3943 6868</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs space-y-5">
            <div>
              <h3 className="font-bold text-[#3E5149] text-lg font-heading">
                {language === 'en' ? 'Leave a Message for Mầm Kids' : 'Gửi lời nhắn cho Mầm Kids'}
              </h3>
              <p className="text-xs text-[#647B72] mt-1">
                {language === 'en'
                  ? 'Need tailored advice or bulk ordering? Please leave your details.'
                  : 'Bạn cần tư vấn trang phục theo yêu cầu hoặc đặt hàng số lượng lớn? Hãy để lại thông tin nhé.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#EBF3EF] border border-[#D4E5DE] text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#4E8773] mx-auto" />
                <h4 className="font-bold text-[#355E50] text-base font-heading">
                  {language === 'en' ? 'Thank You for Your Message!' : 'Cảm ơn lời nhắn của bạn!'}
                </h4>
                <p className="text-xs text-[#5D6F66]">
                  {language === 'en'
                    ? 'Our Mầm Kids customer support specialist will contact you shortly.'
                    : 'Chuyên viên chăm sóc khách hàng của Mầm Kids sẽ liên hệ lại với bạn sớm nhất.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-[#4E8773] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {language === 'en' ? 'Send another message' : 'Gửi lời nhắn khác'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                    {language === 'en' ? 'Your Full Name' : 'Họ và tên của bạn'}{' '}
                    <span className="text-[#F4B99B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'en' ? 'e.g. Mary Nguyen' : 'Ví dụ: Hoàng Lan'}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                      {language === 'en' ? 'Phone Number' : 'Số điện thoại'}{' '}
                      <span className="text-[#F4B99B]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912345678"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] focus:outline-hidden focus:border-[#4E8773]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                      {language === 'en' ? 'Email Address (Optional)' : 'Địa chỉ Email'}
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

                <div>
                  <label className="block text-xs font-bold text-[#3E5149] mb-1.5">
                    {language === 'en' ? 'Message Content' : 'Nội dung lời nhắn'}{' '}
                    <span className="text-[#F4B99B]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      language === 'en'
                        ? 'Enter questions or sizing, fabric, name embroidery requests for your child...'
                        : 'Nhập câu hỏi hoặc yêu cầu tư vấn kích thước, chất liệu, thêu tên cho bé...'
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#3E5149] focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#4E8773] hover:bg-[#417361] text-white font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'en' ? 'Send Message Now' : 'Gửi lời nhắn ngay'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
