import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Trang phục của Mầm Kids có an toàn cho da bé dễ bị dị ứng không?',
      a: 'Hoàn toàn an toàn. Mầm Kids cam kết 100% sản phẩm sử dụng chất liệu bông cotton hữu cơ tự nhiên, vải xô muslin sợi tre hoặc đũi tự nhiên. Vải được chứng nhận không chứa chất huỳnh quang, không formaldehyde và phẩm nhuộm azo kim loại nặng độc hại. Các đường may đều được bọc viền phẳng êm ái để không cọ xát vào da bé.'
    },
    {
      q: 'Thời gian giao hàng bao lâu và phí vận chuyển như thế nào?',
      a: 'Mầm Kids miễn phí giao hàng toàn quốc cho tất cả đơn hàng từ 300.000 VND. Với đơn dưới 300.000 VND, phí vận chuyển đồng giá là 25.000 VND trên toàn quốc. Thời gian nhận hàng dự kiến từ 1–2 ngày đối với nội thành TP.HCM và Hà Nội, từ 2–3 ngày đối với các tỉnh thành khác.'
    },
    {
      q: 'Nếu nhận về bé mặc không vừa, tôi có được đổi size không?',
      a: 'Chắc chắn có! Mầm Kids áp dụng chính sách đổi hàng trong vòng 15 ngày kể từ ngày nhận hàng. Nếu bé mặc chưa vừa vặn, chúng tôi sẽ cho shipper mang size mới đến tận nhà đổi cho bạn. Bạn chỉ cần giữ sản phẩm còn nguyên tem mác chưa qua giặt tẩy.'
    },
    {
      q: 'Tính năng cá nhân hóa thêu / in tên bé hoạt động như thế nào?',
      a: 'Trên các sản phẩm có nhãn "In/Thêu tên bé" (như Áo thun Gấu Nhỏ, Áo hoodie Cầu Vồng, Đồ bộ Ngày Nắng), bạn có thể nhập tên bé, chọn biểu tượng (trái tim, ngôi sao, đám mây, cầu vồng) và vị trí in. Mầm Kids sử dụng chỉ tơ cotton mềm mại không gây ngứa ngáy lưng bé. Thời gian thêu chỉ mất thêm vài giờ nên đơn hàng vẫn được giao đúng tiến độ.'
    },
    {
      q: 'Quà tặng túi tote Mầm Kids áp dụng cho những đơn hàng nào?',
      a: 'Tất cả mọi đơn hàng đặt tại website Mầm Kids đều được tặng miễn phí 01 túi tote canvas thân thiện môi trường, không giới hạn giá trị đơn hàng. Đây là món quà nhỏ thay lời tri ân của Mầm Kids gửi đến gia đình bé!'
    },
    {
      q: 'Cách giặt và bảo quản trang phục cotton trẻ em tốt nhất là gì?',
      a: 'Bạn nên giặt bằng nước lạnh hoặc nước ấm dưới 30°C với xà phòng dịu nhẹ dành riêng cho trẻ em. Hạn chế dùng chất tẩy trắng mạnh. Khi phơi, nên lộn trái mặt áo và phơi nơi thoáng gió râm mát để bảo vệ màu sắc tự nhiên và sợi vải bông mềm mại lâu bền.'
    }
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#4E8773] block font-heading">
          Giải đáp thắc mắc
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#3E5149] font-heading">
          Câu hỏi thường gặp (FAQ)
        </h1>
        <p className="text-sm text-[#5D6F66]">
          Tổng hợp những câu hỏi phụ huynh thường quan tâm nhất khi mua sắm tại Mầm Kids.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-3xl bg-white border border-[#EFE8D8] overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-[#3E5149] hover:text-[#4E8773] transition-colors font-heading"
              >
                <span className="text-sm sm:text-base">{item.q}</span>
                <span className="p-1.5 rounded-xl bg-[#FDF9F1] text-[#4E8773] shrink-0 border border-[#EFE8D8]">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5D6F66] leading-relaxed border-t border-[#FAF6EC]">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl bg-white border border-[#EFE8D8] text-center space-y-3 shadow-xs">
        <h3 className="font-bold text-[#3E5149] text-base font-heading">
          Chưa tìm thấy câu trả lời cho thắc mắc của bạn?
        </h3>
        <p className="text-xs text-[#647B72]">
          Hãy liên hệ trực tiếp với chúng tôi qua số hotline 1900 6868 để nhận hỗ trợ tận tình.
        </p>
        <Link
          to="/lien-he"
          className="inline-block mt-2 px-6 py-2.5 rounded-2xl bg-[#4E8773] hover:bg-[#417361] text-white text-xs font-bold transition-colors shadow-xs"
        >
          Liên hệ nhân viên tư vấn
        </Link>
      </div>
    </div>
  );
};
