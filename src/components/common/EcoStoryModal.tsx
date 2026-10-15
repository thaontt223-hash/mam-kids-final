import React, { useState, useEffect } from 'react';
import { X, BookOpen, Volume2, VolumeX, Pause, Play, Square, Sparkles, Award, ArrowRight, Heart, Share2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EcoStory } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useStoryNarrator } from '../../hooks/useStoryNarrator';

interface EcoStoryModalProps {
  story: EcoStory;
  isOpen: boolean;
  onClose: () => void;
}

export const EcoStoryModal: React.FC<EcoStoryModalProps> = ({ story, isOpen, onClose }) => {
  const { user, addPoints } = useAuth();
  const { showToast } = useCart();
  const { language } = useLanguage();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Check if this challenge was already completed in localStorage
  useEffect(() => {
    if (!isOpen) return;
    const completedStr = localStorage.getItem(`mam_eco_challenge_${story.id}`);
    if (completedStr === 'true') {
      setIsChallengeCompleted(true);
    } else {
      setIsChallengeCompleted(false);
    }
  }, [story.id, isOpen]);

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

  const handleClose = () => {
    stop();
    onClose();
  };

  // Prevent background scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Stop voice narration if modal is closed
  useEffect(() => {
    if (!isOpen) {
      stop();
    }
  }, [isOpen, stop]);

  // Handle ESC key to close modal and stop voice
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

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
      language === 'en' ? '🌱 Amazing job!' : '🌱 Bé thật tuyệt vời!',
      language === 'en'
        ? `Earned +${story.challenge.pointsReward} Mầm Points & "${story.challenge.badgeName}" Badge!`
        : `Đã nhận +${story.challenge.pointsReward} Điểm Mầm & Huy hiệu "${story.challenge.badgeName}"!`
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      showToast(
        language === 'en' ? 'Link copied!' : 'Đã sao chép liên kết!',
        language === 'en' ? 'Invite friends to read this eco story with kids.' : 'Mời bạn bè cùng đọc câu chuyện xanh cho bé yêu.'
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in"
      onClick={handleClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl bg-[#FDF9F1] rounded-[28px] sm:rounded-[36px] shadow-2xl border border-[#E8F1EC] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="relative bg-linear-to-r from-[#355F52] via-[#437565] to-[#4E8773] text-white p-5 sm:p-6 pb-6">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label={language === 'en' ? 'Close story' : 'Đóng câu chuyện'}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#F5DFA0] text-[#355F52] text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
              <span>🌱</span> {story.badge}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-semibold text-[#FDF9F1]">
              ⏱ {story.readTime}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-semibold text-[#FDF9F1]">
              👶 {language === 'en' ? 'Age:' : 'Độ tuổi:'} {story.targetAge}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#355F52]/60 text-[11px] font-bold text-[#F5DFA0]">
              {language === 'en' ? '🌱 1 Outfit – 1 Story – 1 Green Habit' : '🌱 Một chiếc áo – Một câu chuyện – Một hành động xanh'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-heading leading-tight tracking-tight text-[#FFF9E6]">
            {language === 'en' ? (story.titleEn || story.title) : story.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#E8F1EC] mt-1 max-w-xl font-medium">
            {language === 'en' ? (story.subtitleEn || story.subtitle) : story.subtitle}
          </p>

          {/* Interactive Audio Player Bar */}
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between gap-3 flex-wrap">
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
              className="text-xs text-[#E8F1EC] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? (language === 'en' ? 'Copied' : 'Đã sao chép') : (language === 'en' ? 'Share story' : 'Chia sẻ truyện')}</span>
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

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 bg-[#FDF9F1]">
          {/* Chapter Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-[#FAF6EC] rounded-2xl border border-[#EFE8D8] overflow-x-auto">
            {story.chapters.map((ch, idx) => (
              <button
                key={ch.chapterNumber}
                onClick={() => {
                  stop();
                  setActiveChapterIndex(idx);
                }}
                className={`flex-1 min-w-[130px] sm:min-w-0 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeChapterIndex === idx
                    ? 'bg-[#355F52] text-white shadow-xs'
                    : 'text-[#5D726A] hover:text-[#355F52] hover:bg-white/60'
                }`}
              >
                <span>{ch.icon || '📖'}</span>
                <span>{language === 'en' ? `Chapter ${ch.chapterNumber}` : `Chương ${ch.chapterNumber}`}</span>
              </button>
            ))}
          </div>

          {/* Active Chapter Reading Card */}
          <div className="bg-white rounded-[24px] p-5 sm:p-7 border border-[#EFE8D8] shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-black text-[#4E8773] uppercase tracking-wider mb-2 font-heading">
              <span className="text-lg">{currentChapter.icon || '🌱'}</span>
              <span>
                {language === 'en'
                  ? `Chapter ${currentChapter.chapterNumber} of ${story.chapters.length}`
                  : `Chương ${currentChapter.chapterNumber} trên ${story.chapters.length}`}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[#2F403A] font-heading mb-4">
              {currentTitle}
            </h3>

            <p className="text-sm sm:text-base text-[#3E5149] leading-relaxed sm:leading-loose font-normal mb-5 whitespace-pre-line">
              {currentContent}
            </p>

            {/* Moral / Message for baby */}
            <div className="p-4 rounded-2xl bg-[#F6FAF8] border border-[#D2E3DC] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#4E8773] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-[#355F52] block mb-0.5">
                  {language === 'en' ? 'Nature lesson for your child:' : 'Bài học yêu thiên nhiên cho bé:'}
                </strong>
                <p className="text-xs text-[#5D726A] leading-relaxed">
                  {language === 'en' ? (currentChapter.moralEn || currentChapter.moral) : currentChapter.moral}
                </p>
              </div>
            </div>

            {/* Pagination between chapters */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#EFE8D8]">
              <button
                type="button"
                disabled={activeChapterIndex === 0}
                onClick={() => {
                  stop();
                  setActiveChapterIndex((i) => Math.max(0, i - 1));
                }}
                className={`text-xs font-bold flex items-center gap-1 transition-opacity ${
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
                  <span>{language === 'en' ? 'Next Chapter' : 'Chương kế tiếp'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs font-bold text-[#4E8773] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {language === 'en' ? 'Completed story' : 'Đã đọc hết truyện'}
                </span>
              )}
            </div>
          </div>

          {/* Green Challenge Section (Thử Thách Xanh Cho Bé) */}
          <div className="bg-linear-to-br from-[#FFF9E6] to-[#FAF2DF] rounded-[24px] p-5 sm:p-6 border border-[#F5DFA0] shadow-xs">
            <div className="flex items-start sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#F5DFA0] text-[#355F52]">
                  <Award className="w-5 h-5 text-[#355F52]" />
                </span>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#355F52] block font-heading">
                    {language === 'en' ? 'GREEN CHALLENGE WITH KIDS' : 'THỬ THÁCH XANH CÙNG BÉ'}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#2F403A] font-heading">
                    {story.challenge.title}
                  </h4>
                </div>
              </div>

              <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#355F52] text-[#F5DFA0] text-xs font-bold tabular-nums">
                +{story.challenge.pointsReward} {language === 'en' ? 'Mầm Points' : 'Điểm Mầm'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#3E5149] leading-relaxed mb-4 bg-white/70 p-3.5 rounded-xl border border-[#F5DFA0]/50">
              {story.challenge.action}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[#5D726A] italic">
                🎁 {story.challenge.rewardDescription}
              </span>

              {isChallengeCompleted ? (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#355F52] text-white text-xs font-bold shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#F5DFA0]" />
                  <span>{language === 'en' ? 'Challenge completed brilliantly! 🌱' : 'Bé đã hoàn thành xuất sắc! 🌱'}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCompleteChallenge}
                  className="px-5 py-2.5 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#F5DFA0]" />
                  <span>{language === 'en' ? 'Mark Challenge Done! 🌱' : 'Bé đã làm thử thách này! 🌱'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Pillar 3: Trao Lại Yêu Thương (Mầm Again Teaser) */}
          <div className="bg-[#FAF6EC] rounded-[24px] p-5 sm:p-6 border border-[#EFE8D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">♻️</span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#2F403A] font-heading">
                  {language === 'en' ? 'Outgrown Clothes? Pass Them On via Mầm Again' : 'Khi áo đã chật? Cùng trao lại qua "Mầm Again"'}
                </h4>
                <p className="text-xs text-[#5D726A] mt-1 max-w-md leading-relaxed">
                  {language === 'en'
                    ? 'When outgrown, send Mầm Kids clothes back to us for donation or upcycling to earn Mầm Points or shopping vouchers.'
                    : 'Quần áo Mầm Kids khi bé mặc không còn vừa có thể gửi lại về cho chúng tôi để trao tặng hoặc tái sinh, ba mẹ sẽ nhận lại Điểm Mầm hoặc voucher giảm giá.'}
                </p>
              </div>
            </div>

            <Link
              to="/mam-again"
              onClick={onClose}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-white border border-[#355F52] hover:bg-[#355F52] hover:text-white text-[#355F52] text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              <span>{language === 'en' ? 'Learn about Mầm Again' : 'Tìm hiểu Mầm Again'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#EFE8D8] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-[#5D726A]">
            <Heart className="w-4 h-4 text-[#F3B59A] fill-[#F3B59A]" />
            <span>
              {language === 'en'
                ? 'Accompanying parents in nurturing lovely green sprouts'
                : 'Đồng hành cùng ba mẹ nuôi dưỡng mầm xanh yêu thương'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#355F52] hover:bg-[#2A4D42] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Close Story' : 'Đóng câu chuyện'}
          </button>
        </div>
      </div>
    </div>
  );
};
