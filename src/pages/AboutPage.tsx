import React from 'react';
import { Heart, ShieldCheck, Sparkles, Sprout, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4E5DE] text-[#4E8773] text-xs font-bold shadow-xs">
          <Sprout className="w-4 h-4 text-[#4E8773]" />
          <span>Câu chuyện thương hiệu</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#355F52] font-heading">
          MẦM KIDS
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4E8773] font-heading">
          “Không chỉ mặc đẹp – cùng bé gieo thói quen xanh.”
        </p>
        <p className="text-sm sm:text-base text-[#5D6F66] max-w-2xl mx-auto leading-relaxed">
          Mầm Kids ra đời từ mong ước giản dị của những người làm cha mẹ: mang đến thời trang cho trẻ từ 3–12 tuổi thật thoải mái, an toàn và gần gũi. Chúng tôi tin rằng mỗi bộ quần áo con mặc mỗi ngày còn là một hạt mầm gieo vào tâm hồn bé tình yêu thiên nhiên, lối sống xanh và sự sẻ chia ấm áp.
        </p>
      </div>

      {/* Main Image banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#FAF6EC]">
        <img
          src="/images/hero_mam_kids_1791209393578.jpg"
          alt="Mầm Kids – Không chỉ mặc đẹp, cùng bé gieo thói quen xanh"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full aspect-16/9 object-cover"
        />
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3EF] text-[#4E8773] flex items-center justify-center border border-[#D4E5DE]">
            <ShieldCheck className="w-6 h-6 text-[#4E8773]" />
          </div>
          <h3 className="text-lg font-bold text-[#3E5149] font-heading">1. Mặc xanh & An toàn</h3>
          <p className="text-xs sm:text-sm text-[#5D6F66] leading-relaxed">
            Ưu tiên bông hữu cơ, sợi tre và lanh tự nhiên lành tính. Đường may êm dịu, không cọ xát, bảo vệ làn da non nớt của bé trong mọi hoạt động vui chơi.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF2DF] text-[#3E5149] flex items-center justify-center border border-[#EFE5CD]">
            <Sparkles className="w-6 h-6 text-[#4E8773]" />
          </div>
          <h3 className="text-lg font-bold text-[#3E5149] font-heading">2. Học xanh qua câu chuyện</h3>
          <p className="text-xs sm:text-sm text-[#5D6F66] leading-relaxed">
            Mỗi chiếc áo mở ra một câu chuyện Eco Story và thử thách nhỏ, giúp bé khám phá thế giới thiên nhiên và hình thành thói quen sống có trách nhiệm từ sớm.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF0F2] text-[#3E5149] flex items-center justify-center border border-[#F2C7CE]">
            <Heart className="w-6 h-6 text-[#E8A5B2]" />
          </div>
          <h3 className="text-lg font-bold text-[#3E5149] font-heading">3. Trao lại & Sẻ chia</h3>
          <p className="text-xs sm:text-sm text-[#5D6F66] leading-relaxed">
            Khi bé lớn lên và chật áo, phụ huynh có thể gửi lại qua chương trình Mầm Again để quyên góp, kéo dài vòng đời sản phẩm và nhận Điểm Mầm tri ân.
          </p>
        </div>
      </div>

      {/* Story & Philosophy */}
      <div id="chat-lieu" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE8D8] shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-[#3E5149] font-heading">
          Tiêu chuẩn chất liệu chuẩn lành cho bé
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-[#5D6F66] leading-relaxed">
          <p>
            Tại Việt Nam, khí hậu nhiệt đới nắng ấm đòi hỏi trang phục của trẻ em phải có khả năng thấm hút mồ hôi và thoáng khí cực tốt. Những bệnh ngoài da thường gặp như rôm sảy, dị ứng hay viêm da cơ địa ở trẻ nhỏ phần lớn xuất phát từ các loại vải sợi tổng hợp pha nilon kém chất lượng.
          </p>
          <p>
            Hiểu được điều đó, Mầm Kids kiên định chỉ sử dụng các loại sợi tự nhiên có nguồn gốc bền vững. Vải cotton chải kỹ mịn màng, xô muslin thoáng khí như làn gió mát và kaki mềm đã qua giặt enzyme chống co rút.
          </p>
          <div className="p-4 rounded-2xl bg-[#EBF3EF] border border-[#D4E5DE] flex items-center gap-3">
            <Award className="w-8 h-8 text-[#4E8773] shrink-0" />
            <p className="text-xs text-[#355E50] font-medium">
              Tất cả các sản phẩm Mầm Kids đều đạt tiêu chuẩn an toàn cho sản phẩm dệt may dành cho trẻ em theo quy chuẩn Việt Nam.
            </p>
          </div>
        </div>
      </div>

      {/* Showroom CTA */}
      <div className="p-8 rounded-3xl bg-white border border-[#EFE8D8] text-center space-y-4 shadow-xs">
        <h3 className="text-xl font-bold text-[#3E5149] font-heading">
          Ghé thăm không gian trải nghiệm Mầm Kids
        </h3>
        <p className="text-xs sm:text-sm text-[#5D6F66] max-w-lg mx-auto">
          Ba mẹ và các bé có thể đến trực tiếp hệ thống cửa hàng tại TP.HCM và Hà Nội để chạm thử chất vải mềm mượt và nhận tư vấn đo size trực tiếp.
        </p>
        <div className="pt-2">
          <Link
            to="/lien-he"
            className="inline-block px-8 py-3.5 rounded-2xl bg-[#4E8773] hover:bg-[#417361] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
          >
            Xem địa chỉ Showroom & Liên hệ
          </Link>
        </div>
      </div>

      {/* Brand Identity / Circular Logo Showcase */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EFE8D8] shadow-xs space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EBF3EF] text-[#4E8773] text-xs font-bold">
            Nhận diện thương hiệu
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#355F52] font-heading">
            Biểu Tượng Logo Tròn Mầm Kids
          </h2>
          <p className="text-xs sm:text-sm text-[#5D6F66] max-w-xl mx-auto">
            Thiết kế hình tròn gói trọn câu chuyện: “Một mầm cây nhỏ đang dần lớn lên – Bé lớn lên trong yêu thương – Cùng bé gieo thói quen xanh.”
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          {/* Logo Visual Preview (Transparent background container) */}
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-[#FDF9F1] border-2 border-dashed border-[#D4E5DE]">
            <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center p-2">
              <img
                src="/images/logo-mam-kids.png"
                alt="Logo tròn Mầm Kids – Thời trang trẻ em"
                className="w-full h-full object-contain filter drop-shadow-md select-none"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
              <a
                href="/images/logo-mam-kids-circle.png"
                download="logo-mam-kids-circle.png"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4E8773] hover:bg-[#3D6E5D] text-white text-xs font-bold transition-colors shadow-xs"
              >
                <span>💾 Tải Logo PNG (Nền trong suốt 1024px)</span>
              </a>
              <a
                href="/images/logo-mam-kids-circle.svg"
                download="logo-mam-kids-circle.svg"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F3EDE0] border border-[#D4E5DE] text-[#355F52] text-xs font-bold transition-colors shadow-xs"
              >
                <span>Tải Logo SVG</span>
              </a>
            </div>
          </div>

          {/* Meaning breakdown */}
          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#EBF3EF] text-[#4E8773] font-bold text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#355F52]">Vòng tròn trọn vẹn & Nền trong suốt</h4>
                <p className="text-xs text-[#5D6F66] mt-0.5 leading-relaxed">
                  Hình tròn bao quanh tượng trưng cho vòng tay che chở, sự an toàn và ấm áp của gia đình. Logo có nền ngoài trong suốt, sắc nét trên mọi bề mặt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#EBF3EF] text-[#4E8773] font-bold text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#355F52]">Hai chiếc lá mầm nâng đỡ chiếc áo nhỏ</h4>
                <p className="text-xs text-[#5D6F66] mt-0.5 leading-relaxed">
                  Hai phiến lá xanh non vươn lên ôm trọn chiếc áo em bé trên móc gỗ, truyền tải cảm giác mầm cây đang lớn dần lên và em bé khôn lớn từng ngày.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#EBF3EF] text-[#4E8773] font-bold text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#355F52]">Dấu ấn thời trang trẻ em rõ nét</h4>
                <p className="text-xs text-[#5D6F66] mt-0.5 leading-relaxed">
                  Dáng áo Peter Pan bo cong mềm mại với 2 cúc màu bơ ấm áp và móc áo gỗ nhỏ giúp người nhìn nhận diện ngay đây là thương hiệu thời trang trẻ em.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#EBF3EF] text-[#4E8773] font-bold text-sm flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#355F52]">Chữ “Mầm Kids” nhỏ gọn ở nửa dưới</h4>
                <p className="text-xs text-[#5D6F66] mt-0.5 leading-relaxed">
                  Chữ “Mầm” màu xanh sage đậm kết hợp “Kids” màu vàng bơ ấm áp, kèm nhãn nhỏ “THỜI TRANG TRẺ EM” cân đối và dễ đọc ở mọi kích cỡ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
