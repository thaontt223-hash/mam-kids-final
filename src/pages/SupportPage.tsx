import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, HelpCircle, Truck, RefreshCw, Ruler, ShieldCheck, ArrowRight } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const supportTopics = [
    {
      title: 'Tư vấn chọn size chuẩn',
      desc: 'Công cụ tính toán size theo chiều cao, cân nặng và bảng quy đổi cho bé 3–12 tuổi.',
      icon: Ruler,
      link: '/huong-dan-size'
    },
    {
      title: 'Chính sách giao hàng toàn quốc',
      desc: 'Miễn phí giao hàng từ 300k, thời gian giao 2-3 ngày làm việc trên khắp cả nước.',
      icon: Truck,
      link: '/chinh-sach-giao-hang'
    },
    {
      title: 'Chính sách đổi trả 15 ngày',
      desc: 'Đổi size miễn phí tận nhà nếu bé mặc không vừa, thủ tục đơn giản và nhanh gọn.',
      icon: RefreshCw,
      link: '/chinh-sach-doi-tra'
    },
    {
      title: 'Câu hỏi thường gặp (FAQ)',
      desc: 'Giải đáp thắc mắc về chất liệu hữu cơ, cách giặt ủi và tính năng in thêu tên bé.',
      icon: HelpCircle,
      link: '/cau-hoi-thuong-gap'
    },
    {
      title: 'Theo dõi đơn hàng',
      desc: 'Tra cứu hành trình vận chuyển kiện hàng đến tay bé mọi lúc mọi nơi.',
      icon: ShieldCheck,
      link: '/theo-doi-don-hang'
    },
    {
      title: 'Liên hệ & Góp ý',
      desc: 'Địa chỉ 2 showroom và đường dây nóng phản hồi dịch vụ chăm sóc khách hàng.',
      icon: Phone,
      link: '/lien-he'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#4E8773] block font-heading">
          Đồng hành cùng phụ huynh
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#3E5149] font-heading">
          Trung tâm hỗ trợ Mầm Kids
        </h1>
        <p className="text-sm text-[#5D6F66]">
          Chúng tôi ở đây để giúp trải nghiệm mua sắm cho bé yêu của bạn trở nên dịu êm và tiện lợi nhất.
        </p>
      </div>

      {/* Grid of help topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportTopics.map((topic, i) => {
          const Icon = topic.icon;
          return (
            <Link
              key={i}
              to={topic.link}
              className="p-6 rounded-[22px] bg-white border border-[#EFE8D8] hover:border-[#4E8773] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EBF3EF] text-[#4E8773] border border-[#D4E5DE] flex items-center justify-center mb-4 group-hover:bg-[#4E8773] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#3E5149] group-hover:text-[#4E8773] transition-colors font-heading">
                  {topic.title}
                </h3>
                <p className="text-xs text-[#5D6F66] mt-2 leading-relaxed">
                  {topic.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#FAF6EC] flex items-center justify-between text-xs font-bold text-[#4E8773]">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Emergency contact box */}
      <div className="p-8 rounded-3xl bg-white border border-[#EFE8D8] text-center space-y-4 shadow-xs">
        <h3 className="text-xl font-bold text-[#3E5149] font-heading">
          Bạn vẫn cần hỗ trợ thêm?
        </h3>
        <p className="text-xs sm:text-sm text-[#5D6F66] max-w-lg mx-auto">
          Đội ngũ tư vấn viên Mầm Kids luôn trực máy từ 8:00 đến 21:00 hàng ngày kể cả thứ 7, Chủ Nhật và ngày lễ.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="tel:19006868"
            className="px-6 py-3 rounded-2xl bg-[#4E8773] hover:bg-[#417361] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Gọi Hotline: 1900 6868</span>
          </a>
          <a
            href="mailto:chamsockhachhang@mamkids.vn"
            className="px-6 py-3 rounded-2xl bg-[#FDF9F1] hover:bg-white text-[#3E5149] border border-[#EFE8D8] text-xs font-bold transition-colors shadow-xs flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Gửi Email hỗ trợ</span>
          </a>
        </div>
      </div>
    </div>
  );
};
