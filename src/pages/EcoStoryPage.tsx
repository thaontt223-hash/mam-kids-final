import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ECO_STORIES } from '../data/ecoStories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useStoryNarrator } from '../hooks/useStoryNarrator';
import { BookOpen, Sparkles, Award, ArrowLeft, ArrowRight, Share2, Volume2, VolumeX, Pause, Play, Square, CheckCircle2, ChevronRight, Recycle } from 'lucide-react';

export const EcoStoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, addPoints } = useAuth();
  const { showToast } = useCart();
  const { language } = useLanguage();

  const story = ECO_STORIES.find((s) => s.id === id) || ECO_STORIES[0];
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);

  useEffect(() => {
    const completedStr = localStorage.getItem(`mam_eco_challenge_${story.id}`);
    setIsChallengeCompleted(completedStr === 'true');
    setActiveChapterIndex(0);
  }, [story.id]);

  // Current chapter and bilingual text
  const currentChapter = story.chapters[activeChapterIndex] || story.chapters[0];
  const currentTitle = language === 'en' ? (currentChapter.titleEn || currentChapter.title) : currentChapter.title;
  const currentContent = language === 'en' ? (currentChapter.contentEn || currentChapter.content) : currentChapter.content;

  // Audio Story Narrator Hook
  const {
    voiceState,
    progress,
    isSupported,
    isAudioAvailable,
    errorMessage,
    clearError,
    play,
    pause,
    resume,
    stop
  } = useStoryNarrator({
    storyId: story.id,
    chapterNumber: currentChapter.chapterNumber,
    title: currentTitle,
    content: currentContent,
    lang: language === 'en' ? 'en' : 'vi'
  });

  const handleCompleteChallenge = () => {
    if (isChallengeCompleted) return;
    setIsChallengeCompleted(true);
    localStorage.setItem(`mam_eco_challenge_${story.id}`, 'true');

    if (user && addPoints) {
      addPoints(
        story.challenge.pointsReward,
        language === 'en'
          ? `Completed Mầm Xanh challenge: ${story.challenge.title}`
          : `Hoàn thành thử thách Mầm Xanh: ${story.challenge.title}`
      );
    }

    showToast(
      language === 'en' ? '🌱 Wonderful job, little hero!' : '🌱 Bé thật tuyệt vời!',
      language === 'en'
        ? `Earned +${story.challenge.pointsReward} Mầm Points & "${story.challenge.badgeName}" Badge!`
        : `Đã nhận +${story.challenge.pointsReward} Điểm Mầm & Huy hiệu "${story.challenge.badgeName}"!`
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(
        language === 'en' ? 'Link copied!' : 'Đã sao chép liên kết!',
        language === 'en' ? 'Invite friends to read this eco story together.' : 'Mời bạn bè cùng đọc câu chuyện xanh.'
      );
    }
  };

  // Green products that link to this story
  const relatedGreenProducts = PRODUCTS.filter(
    (p) => p.isGreenProduct && p.ecoStoryId === story.id
  ).slice(0, 3);

  return (
    <div className="w-full bg-[#FDF9F1] min-h-screen py-6 sm:py-10 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#5D726A]">
          <Link to="/" className="hover:text-[#355F52]">
            {language === 'en' ? 'Home' : 'Trang chủ'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/#mam-xanh" className="hover:text-[#355F52]">
            Mầm Xanh
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2F403A] font-semibold truncate">{story.title}</span>
        </nav>

        {/* Story Header Banner */}
        <div className="relative rounded-[32px] sm:rounded-[36px] bg-linear-to-r from-[#355F52] via-[#417363] to-[#4E8773] text-white p-6 sm:p-10 overflow-hidden shadow-sm">
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#F5DFA0] text-[#355F52] text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                <span>🌱</span> {story.badge}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-semibold text-[#FDF9F1]">
                ⏱ {story.readTime}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-semibold text-[#FDF9F1]">
                👶 {language === 'en' ? `Ages: ${story.targetAge}` : `Độ tuổi: ${story.targetAge}`}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#355F52]/60 text-[11px] font-bold text-[#F5DFA0]">
                🌱 {language === 'en' ? 'One outfit – One story – One green habit' : 'Một chiếc áo – Một câu chuyện – Một hành động xanh'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-[#FFF9E6] leading-tight">
              {language === 'en' ? (story.titleEn || story.title) : story.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#E8F1EC] max-w-2xl leading-relaxed">
              {language === 'en' ? (story.subtitleEn || story.subtitle) : story.subtitle}
            </p>

            {/* Audio bar & share */}
            <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                {voiceState === 'idle' ? (
                  <button
                    type="button"
                    onClick={play}
                    disabled={!isSupported}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#355F52] hover:bg-[#F5DFA0] disabled:opacity-60 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                    aria-label={language === 'en' ? 'Read story to me' : 'Bật giọng đọc cho bé'}
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#355F52]" />
                    <span>{language === 'en' ? '🔊 Read story to me' : '🔊 Bật giọng đọc cho bé'}</span>
                  </button>
                ) : voiceState === 'playing' ? (
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={pause}
                      className="px-3.5 py-1.5 rounded-full bg-[#F5DFA0] text-[#355F52] hover:bg-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                      aria-label={language === 'en' ? 'Pause' : 'Tạm dừng'}
                    >
                      <Pause className="w-3.5 h-3.5 text-[#355F52]" />
                      <span>{language === 'en' ? '⏸ Pause' : '⏸ Tạm dừng'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={stop}
                      className="px-2.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                      aria-label={language === 'en' ? 'Stop' : 'Dừng'}
                      title={language === 'en' ? 'Stop' : 'Dừng'}
                    >
                      <Square className="w-3 h-3 fill-current" />
                      <span>{language === 'en' ? '⏹ Stop' : '⏹ Dừng'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={resume}
                      className="px-3.5 py-1.5 rounded-full bg-white text-[#355F52] hover:bg-[#F5DFA0] text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                      aria-label={language === 'en' ? 'Resume' : 'Tiếp tục'}
                    >
                      <Play className="w-3.5 h-3.5 text-[#355F52] fill-current" />
                      <span>{language === 'en' ? '▶ Resume' : '▶ Tiếp tục'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={stop}
                      className="px-2.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                      aria-label={language === 'en' ? 'Stop' : 'Dừng'}
                      title={language === 'en' ? 'Stop' : 'Dừng'}
                    >
                      <Square className="w-3 h-3 fill-current" />
                      <span>{language === 'en' ? '⏹ Stop' : '⏹ Dừng'}</span>
                    </button>
                  </div>
                )}

                <span className={`text-[11px] ${errorMessage ? 'text-amber-200 font-semibold' : 'text-[#E8F1EC]'} hidden sm:inline`}>
                  {errorMessage ? (
                    `⚠️ ${errorMessage}`
                  ) : voiceState === 'playing' ? (
                    language === 'en' ? 'Reading chapter...' : 'Đang phát giọng đọc chương...'
                  ) : voiceState === 'paused' ? (
                    language === 'en' ? 'Paused' : 'Đang tạm dừng'
                  ) : (
                    language === 'en' ? 'English voice for kids' : 'Giọng đọc chuẩn tiếng Việt cho bé'
                  )}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="text-xs text-[#E8F1EC] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Share story' : 'Chia sẻ câu chuyện'}</span>
              </button>
            </div>

            {/* Device voice missing notification */}
            {errorMessage && (
              <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-300/40 text-amber-200 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">⚠️</span>
                  <span className="font-medium">{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={clearError}
                  className="text-amber-200/80 hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer"
                  aria-label="Đóng thông báo"
                >
                  ✕
                </button>
              </div>
            )}

            {(voiceState === 'playing' || voiceState === 'paused') && (
              <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#F5DFA0] h-full transition-all duration-300"
                  style={{ width: `${Math.max(5, progress)}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Chapter Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#FAF6EC] rounded-2xl border border-[#EFE8D8] overflow-x-auto">
          {story.chapters.map((ch, idx) => (
            <button
              key={ch.chapterNumber}
              onClick={() => {
                stop();
                setActiveChapterIndex(idx);
              }}
              className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                activeChapterIndex === idx
                  ? 'bg-[#355F52] text-white shadow-xs'
                  : 'text-[#5D726A] hover:text-[#355F52] hover:bg-white/60'
              }`}
            >
              <span>{ch.icon || '🌱'}</span>
              <span>{language === 'en' ? `Chapter ${ch.chapterNumber}` : `Chương ${ch.chapterNumber}`}</span>
            </button>
          ))}
        </div>

        {/* Chapter Content Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-[#EFE8D8] shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-black text-[#4E8773] uppercase tracking-wider font-heading">
            <span className="text-xl">{currentChapter.icon || '🌱'}</span>
            <span>
              {language === 'en'
                ? `Chapter ${currentChapter.chapterNumber} / ${story.chapters.length}`
                : `Chương ${currentChapter.chapterNumber} / ${story.chapters.length}`}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#2F403A] font-heading">
            {currentTitle}
          </h2>

          <p className="text-sm sm:text-base text-[#3E5149] leading-relaxed sm:leading-loose whitespace-pre-line font-normal">
            {currentContent}
          </p>

          {/* Moral box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F6FAF8] border border-[#D2E3DC] flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#4E8773] shrink-0 mt-0.5" />
            <div>
              <strong className="text-xs sm:text-sm font-bold text-[#355F52] block mb-1">
                {language === 'en' ? 'Nature lesson for child:' : 'Bài học yêu thiên nhiên cho bé:'}
              </strong>
              <p className="text-xs sm:text-sm text-[#5D726A] leading-relaxed">
                {language === 'en' ? (currentChapter.moralEn || currentChapter.moral) : currentChapter.moral}
              </p>
            </div>
          </div>

          {/* Navigation between chapters */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EFE8D8]">
            <button
              type="button"
              disabled={activeChapterIndex === 0}
              onClick={() => {
                stop();
                setActiveChapterIndex((i) => Math.max(0, i - 1));
              }}
              className={`text-xs font-bold flex items-center gap-1 ${
                activeChapterIndex === 0 ? 'opacity-30 cursor-not-allowed text-[#5D726A]' : 'text-[#355F52] hover:underline cursor-pointer'
              }`}
            >
              {language === 'en' ? '← Previous Chapter' : '← Chương trước'}
            </button>

            <span className="text-xs text-[#5D726A] font-semibold">
              {activeChapterIndex + 1} / {story.chapters.length}
            </span>

            {activeChapterIndex < story.chapters.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  stop();
                  setActiveChapterIndex((i) => i + 1);
                }}
                className="px-4 py-2 rounded-xl bg-[#355F52] hover:bg-[#2A4D42] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <span>{language === 'en' ? 'Next Chapter' : 'Chương tiếp theo'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs font-bold text-[#4E8773] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {language === 'en' ? 'Story completed' : 'Đã hoàn thành truyện'}
              </span>
            )}
          </div>
        </div>

        {/* Green Challenge Card */}
        <div className="bg-linear-to-br from-[#FFF9E6] to-[#FAF2DF] rounded-[32px] p-6 sm:p-8 border border-[#F5DFA0] shadow-xs space-y-4">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-[#F5DFA0] text-[#355F52]">
                <Award className="w-6 h-6 text-[#355F52]" />
              </span>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#355F52] block font-heading">
                  {language === 'en' ? 'GREEN CHALLENGE FOR KIDS' : 'THỬ THÁCH XANH CÙNG BÉ'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#2F403A] font-heading">
                  {story.challenge.title}
                </h3>
              </div>
            </div>

            <span className="shrink-0 px-3 py-1 rounded-full bg-[#355F52] text-[#F5DFA0] text-xs font-bold tabular-nums">
              +{story.challenge.pointsReward} {language === 'en' ? 'Mầm Points' : 'Điểm Mầm'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#3E5149] leading-relaxed bg-white/80 p-4 rounded-2xl border border-[#F5DFA0]/50">
            {story.challenge.action}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs text-[#5D726A] italic">
              🎁 {story.challenge.rewardDescription}
            </span>

            {isChallengeCompleted ? (
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#355F52] text-white text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#F5DFA0]" />
                <span>{language === 'en' ? 'Child completed with flying colors! 🌱' : 'Bé đã hoàn thành xuất sắc! 🌱'}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCompleteChallenge}
                className="px-6 py-2.5 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F5DFA0]" />
                <span>{language === 'en' ? 'Child took this challenge! 🌱' : 'Bé đã làm thử thách này! 🌱'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Trao Lại Quần Áo Cũ: Banner Mầm Again */}
        <div className="bg-[#FAF6EC] rounded-[28px] p-6 sm:p-8 border border-[#EFE8D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Recycle className="w-7 h-7 text-[#355F52] shrink-0 mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2F403A] font-heading">
                {language === 'en'
                  ? 'Program "Mầm Again" – Give back clothes as kids grow up'
                  : 'Chương trình "Mầm Again" – Trao lại áo cũ khi bé đã lớn'}
              </h3>
              <p className="text-xs text-[#5D726A] mt-1 max-w-xl leading-relaxed">
                {language === 'en'
                  ? 'When your child outgrows clothes, parents can send them back to Mầm Kids with free shipping to donate or recycle, receiving Mầm Points or 50,000 VND voucher immediately.'
                  : 'Khi bé lớn lên và áo không còn vừa, ba mẹ có thể gửi lại cho Mầm Kids hoàn toàn miễn phí vận chuyển để trao tặng hoặc tái chế, nhận ngay điểm Mầm hoặc voucher 50.000đ.'}
              </p>
            </div>
          </div>

          <Link
            to="/mam-again"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#355F52] hover:bg-[#2A4D42] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-2xs"
          >
            <span>{language === 'en' ? 'Join Mầm Again' : 'Tham gia Mầm Again'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Other Story Selector */}
        <div className="pt-4 border-t border-[#EFE8D8]">
          <h3 className="text-sm font-bold text-[#2F403A] mb-3 font-heading">
            {language === 'en' ? 'Other Mầm Xanh Stories:' : 'Các câu chuyện Mầm Xanh khác:'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ECO_STORIES.map((s) => (
              <Link
                key={s.id}
                to={`/eco-story/${s.id}`}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                  s.id === story.id
                    ? 'border-[#355F52] bg-white shadow-2xs'
                    : 'border-[#EFE8D8] bg-[#FAF6EC] hover:bg-white'
                }`}
              >
                <span className="text-xl mt-0.5">🌱</span>
                <div>
                  <h4 className="text-xs font-bold text-[#2F403A] font-heading">
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-[#5D726A] line-clamp-1 mt-0.5">
                    {s.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Green Products */}
        {relatedGreenProducts.length > 0 && (
          <div className="pt-4 space-y-4">
            <h3 className="text-base font-bold text-[#2F403A] font-heading">
              {language === 'en' ? 'Products connected with this story' : 'Sản phẩm đồng hành cùng câu chuyện này'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {relatedGreenProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
