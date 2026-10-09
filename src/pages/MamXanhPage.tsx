import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  Recycle,
  Leaf,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Heart,
  QrCode,
  Volume2,
  Award,
  ChevronRight
} from 'lucide-react';
import { ECO_STORIES } from '../data/ecoStories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { EcoStoryModal } from '../components/common/EcoStoryModal';
import { EcoStory } from '../types';

export const MamXanhPage: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<EcoStory | null>(null);

  // Products with isGreenProduct flag
  const greenProducts = PRODUCTS.filter((p) => p.isGreenProduct).slice(0, 8);

  return (
    <div className="w-full bg-[#FDF9F1] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#5D726A]">
          <Link to="/" className="hover:text-[#355F52]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2F403A] font-semibold">Mầm Xanh</span>
        </nav>

        {/* Hero Banner Mầm Xanh */}
        <section className="relative rounded-[32px] sm:rounded-[36px] bg-linear-to-br from-[#355F52] via-[#3E6C5E] to-[#4E8773] text-white p-8 sm:p-14 overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5DFA0] text-[#355F52] text-xs font-black uppercase tracking-wider shadow-2xs">
              <Leaf className="w-3.5 h-3.5" />
              <span>Điểm khác biệt thương hiệu Mầm Kids</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#FFF9E6]">
              MẦM XANH
            </h1>

            <p className="text-xl sm:text-2xl font-extrabold text-[#F5DFA0] font-heading">
              “Mặc xanh – Học xanh – Lớn lên xanh.”
            </p>

            <p className="text-sm sm:text-base text-[#E8F1EC] leading-relaxed max-w-2xl font-normal">
              Một hành trình nhỏ để bé học cách yêu thiên nhiên từ những điều gần gũi mỗi ngày.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#FFF9E6]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5DFA0]" /> Mặc xanh an lành
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5DFA0]" /> Học xanh qua truyện
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5DFA0]" /> Trao lại sẻ chia
              </span>
            </div>
          </div>

          <div className="absolute -right-12 -bottom-12 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-white/5 pointer-events-none blur-2xl" />
        </section>

        {/* 3 Trụ Cột Chi Tiết: Mặc xanh – Học xanh – Lớn lên xanh */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#4E8773] block font-heading">
              TRIẾT LÝ PHÁT TRIỂN
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#355F52] font-heading">
              Mặc xanh – Học xanh – Lớn lên xanh
            </h2>
            <p className="text-xs sm:text-sm text-[#5D726A]">
              Ba trụ cột gắn liền với từng sản phẩm và hoạt động của Mầm Kids
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Trụ cột 1: MẶC XANH */}
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#D8E6DF] shadow-xs flex flex-col justify-between hover:border-[#355F52] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F1EC] text-[#355F52] flex items-center justify-center font-black text-2xl shadow-2xs">
                  🌱
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#4E8773] block font-heading">
                    TRỤ CỘT 01
                  </span>
                  <h3 className="text-xl font-bold text-[#2F403A] font-heading mt-0.5">
                    1. MẶC XANH
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5D726A] leading-relaxed">
                  Mầm Kids ưu tiên các chất liệu thân thiện hơn với môi trường như Organic Cotton, Bamboo hoặc recycled fabrics khi phù hợp với từng sản phẩm.
                </p>
                <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#EFE8D8] text-xs text-[#355F52] space-y-1.5 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4E8773] shrink-0" />
                    <span>Chứng nhận dệt an toàn Oeko-Tex Standard 100</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4E8773] shrink-0" />
                    <span>Minh bạch thành phần trên từng nhãn áo</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EFE8D8]">
                <Link
                  to="/san-pham"
                  className="text-xs font-bold text-[#355F52] hover:underline flex items-center gap-1"
                >
                  Xem sản phẩm Mầm Xanh
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Trụ cột 2: HỌC XANH */}
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#D8E6DF] shadow-xs flex flex-col justify-between hover:border-[#F5DFA0] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9E6] text-[#355F52] border border-[#F5DFA0] flex items-center justify-center font-black text-2xl shadow-2xs">
                  📖
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#B88E28] block font-heading">
                    TRỤ CỘT 02
                  </span>
                  <h3 className="text-xl font-bold text-[#2F403A] font-heading mt-0.5">
                    2. HỌC XANH
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5D726A] leading-relaxed">
                  Mỗi sản phẩm Mầm Xanh có Green QR / Eco Story. Bé có thể đọc truyện ngắn hoặc làm thử thách nhỏ về môi trường như tưới cây, gấp áo để nhận Điểm Mầm.
                </p>
                <div className="p-3.5 rounded-2xl bg-[#FFF9E6] border border-[#F5DFA0] text-xs text-[#355F52] space-y-1.5 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4E8773] shrink-0" />
                    <span>Giọng đọc audio ấm áp, ru bé vào giấc ngủ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4E8773] shrink-0" />
                    <span>Thử thách xanh nhận +50 Điểm Mầm mỗi bài</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EFE8D8]">
                <button
                  type="button"
                  onClick={() => setSelectedStory(ECO_STORIES[0])}
                  className="text-xs font-bold text-[#355F52] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Đọc thử câu chuyện mẫu
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Trụ cột 3: TRAO LẠI */}
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#D8E6DF] shadow-xs flex flex-col justify-between hover:border-[#F8B195] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FCE7D8] text-[#355F52] flex items-center justify-center font-black text-2xl shadow-2xs">
                  ♻️
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#D96B43] block font-heading">
                    TRỤ CỘT 03
                  </span>
                  <h3 className="text-xl font-bold text-[#2F403A] font-heading mt-0.5">
                    3. TRAO LẠI
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5D726A] leading-relaxed">
                  Khi bé không còn mặc vừa, phụ huynh có thể gửi lại đồ qua chương trình Mầm Again. Quần áo được phân loại để tái sử dụng, quyên góp hoặc xử lý phù hợp.
                </p>
                <div className="p-3.5 rounded-2xl bg-[#FCE7D8]/60 border border-[#F8B195]/40 text-xs text-[#355F52] space-y-1.5 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4E8773] shrink-0" />
                    <span>Thu nhận tận nhà hoàn toàn miễn phí</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4E8773] shrink-0" />
                    <span>Tặng voucher hoặc Điểm Mầm tri ân</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EFE8D8]">
                <Link
                  to="/mam-again"
                  className="text-xs font-bold text-[#355F52] hover:underline flex items-center gap-1"
                >
                  Tham gia gửi đồ qua Mầm Again
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ECO STORIES: Một chiếc áo – Một câu chuyện – Một hành động xanh */}
        <section className="bg-white rounded-[32px] p-8 sm:p-12 border border-[#EFE8D8] shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#4E8773] block mb-1 font-heading">
                THƯ VIỆN ECO STORIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#355F52] font-heading">
                Một chiếc áo – Một câu chuyện – Một hành động xanh
              </h2>
              <p className="text-xs sm:text-sm text-[#5D726A] mt-1">
                Quét Green QR trên nhãn áo hoặc bấm vào câu chuyện để đọc và nghe cùng con
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ECO_STORIES.map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-[24px] bg-[#FDF9F1] border border-[#EFE8D8] hover:border-[#4E8773] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#EAF3EF] text-[#355F52] text-xs font-black uppercase">
                      🌱 {story.badge}
                    </span>
                    <span className="text-xs text-[#8B9D95] font-semibold">
                      ⏱ {story.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#2F403A] font-heading">
                    {story.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#4E8773] italic">
                    {story.subtitle}
                  </p>

                  <p className="text-xs text-[#5D726A] leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE8D8] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStory(story)}
                    className="px-4 py-2.5 rounded-xl bg-[#355F52] hover:bg-[#28473D] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#F5DFA0]" />
                    <span>Đọc truyện ngay</span>
                  </button>

                  <Link
                    to={`/eco-story/${story.id}`}
                    className="text-xs font-bold text-[#4E8773] hover:underline flex items-center gap-1"
                  >
                    Trang chi tiết
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sản phẩm Mầm Xanh nổi bật */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#4E8773] block mb-1 font-heading">
                THỜI TRANG BỀN VỮNG
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#355F52] font-heading">
                Sản phẩm gắn liền với Mầm Xanh
              </h2>
              <p className="text-xs sm:text-sm text-[#5D726A] mt-1">
                Các sản phẩm mang huy hiệu 🌱 Mầm Xanh và chứa câu chuyện Eco Story
              </p>
            </div>
            <Link
              to="/san-pham"
              className="text-xs sm:text-sm font-bold text-[#4E8773] hover:underline flex items-center gap-1"
            >
              Xem tất cả sản phẩm
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {greenProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Trao lại cùng Mầm Again Banner */}
        <section className="bg-linear-to-r from-[#FAF6EE] to-[#F2EADB] rounded-[32px] p-8 sm:p-12 border border-[#E8DFC9] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3EF] text-[#355F52] text-xs font-black uppercase">
              <Recycle className="w-3.5 h-3.5 text-[#4E8773]" />
              <span>CHƯƠNG TRÌNH MẦM AGAIN</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading">
              Bé lớn rồi? Cùng gửi lại áo cho bạn nhỏ tiếp theo
            </h3>
            <p className="text-xs sm:text-sm text-[#5D726A] leading-relaxed">
              Mầm Kids thu gom đồ cũ miễn phí tận nhà, giặt ủi và phân loại để quyên góp đến các em nhỏ khó khăn, đồng thời tặng ba mẹ Điểm Mầm và voucher mua sắm mới.
            </p>
            <div className="pt-2">
              <Link
                to="/mam-again"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#355F52] hover:bg-[#28473D] text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                <span>ĐĂNG KÝ GỬI ĐỒ QUA MẦM AGAIN</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="shrink-0 text-center p-6 bg-white rounded-2xl border border-[#EFE8D8] shadow-2xs w-full md:w-64 space-y-2">
            <div className="text-3xl">🌱 ➡️ 💖</div>
            <div className="text-xs font-bold text-[#355F52] font-heading">
              +100 Điểm Mầm
            </div>
            <p className="text-[11px] text-[#5D726A]">
              Tặng ngay cho mỗi lần gửi lại đồ đạt chuẩn cùng Mầm Kids.
            </p>
          </div>
        </section>
      </div>

      {/* Eco Story Modal */}
      {selectedStory && (
        <EcoStoryModal
          story={selectedStory}
          isOpen={Boolean(selectedStory)}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};
