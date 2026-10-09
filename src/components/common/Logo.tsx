import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  showSubtitle?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
  isLink?: boolean;
  iconOnly?: boolean;
}

/**
 * Brand Logo component for "Mầm Kids"
 * Concept:
 * - Icon: Sprout leaves blooming from a children's clothes hanger & baby collar silhouette
 * - Typography: "Mầm" (Deep Forest Green #285A48) + "Kids" (Warm Honey Gold #F2B544)
 * - Subtitle: "THỜI TRANG TRẺ EM" (Primary Sage #4E8773)
 * - Style: Clean, modern, friendly, vector-sharp with 0% font errors or raster blur
 */
export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSlogan = false,
  showSubtitle = true,
  variant = 'light',
  className = '',
  isLink = true,
  iconOnly = false
}) => {
  const isDark = variant === 'dark';

  // Pixel sizing for the vector icon
  const iconPixelSizes = {
    sm: 34,
    md: 42,
    lg: 48,
    xl: 60
  };

  const currentIconSize = iconPixelSizes[size];

  // Responsive font sizes for the brand typography
  const textClasses = {
    sm: {
      brand: 'text-[19px] sm:text-[20px]',
      gap: 'ml-1',
      sub: 'text-[8.5px] sm:text-[9px] tracking-[0.16em] mt-0.5'
    },
    md: {
      brand: 'text-[22px] sm:text-[24px] lg:text-[25px]',
      gap: 'ml-1 sm:ml-1.5',
      sub: 'text-[9.5px] sm:text-[10px] tracking-[0.18em] mt-0.5'
    },
    lg: {
      brand: 'text-[26px] sm:text-[28px] lg:text-[30px]',
      gap: 'ml-1.5',
      sub: 'text-[10.5px] sm:text-[11.5px] tracking-[0.2em] mt-0.5'
    },
    xl: {
      brand: 'text-[32px] sm:text-[36px] lg:text-[40px]',
      gap: 'ml-2',
      sub: 'text-[12.5px] sm:text-[13.5px] tracking-[0.22em] mt-1'
    }
  }[size];

  const logoContent = (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
      style={{ direction: 'ltr', transform: 'none' }}
    >
      {/* =========================================================================
          1. ICON BIỂU TƯỢNG (BÊN TRÁI)
          Kết hợp tinh tế: Mầm lá non vươn lên từ móc áo & cổ áo em bé
          ========================================================================= */}
      <svg
        viewBox="0 0 48 48"
        width={currentIconSize}
        height={currentIconSize}
        className="shrink-0 transition-transform duration-200 group-hover:scale-103"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Nền Squircle mềm mại */}
        <rect
          x="1.5"
          y="1.5"
          width="45"
          height="45"
          rx="13.5"
          fill={isDark ? '#1F4638' : '#E6F1EB'}
          stroke={isDark ? '#3A6F5C' : '#CDE0D7'}
          strokeWidth="1.5"
        />

        {/* Dáng áo em bé màu trắng tinh khiết */}
        <path
          d="M 15.5 26.5
             L 18 37 C 18 38.5 19.5 39.5 21 39.5
             L 27 39.5 C 28.5 39.5 30 38.5 30 37
             L 32.5 26.5
             C 30 28 27.5 28.8 24 28.8
             C 20.5 28.8 18 28 15.5 26.5 Z"
          fill="#FFFFFF"
          stroke={isDark ? '#E6F1EB' : '#285A48'}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Cổ áo tròn Peter Pan dịu dàng */}
        <path
          d="M 19 26.5 C 21 29 27 29 29 26.5"
          stroke={isDark ? '#285A48' : '#4E8773'}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* 2 Cúc áo vàng ấm #F2B544 (Tượng trưng hạt mầm yêu thương) */}
        <circle cx="24" cy="33.5" r="1.6" fill="#F2B544" />
        <circle cx="24" cy="37" r="1.2" fill="#F2B544" opacity="0.85" />

        {/* Đường cong bờ vai móc áo em bé */}
        <path
          d="M 13 26.5 C 16.5 22.8 31.5 22.8 35 26.5"
          stroke={isDark ? '#E6F1EB' : '#285A48'}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Trục thân mầm vươn lên từ móc áo */}
        <path
          d="M 24 23 L 24 16"
          stroke={isDark ? '#E6F1EB' : '#285A48'}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Khớp nối mầm non */}
        <circle cx="24" cy="16.5" r="1.5" fill={isDark ? '#E6F1EB' : '#285A48'} />

        {/* Lá mầm bên trái (Xanh Sage #4E8773) */}
        <path
          d="M 24 16.5 C 18.5 15.5 16 9.5 20.5 7 C 23.5 8.5 24 13 24 16.5 Z"
          fill={isDark ? '#68C29D' : '#4E8773'}
        />

        {/* Lá mầm bên phải (Xanh lá non tràn đầy sức sống #8BC34A) */}
        <path
          d="M 24 16.5 C 25.5 12 29 7.5 32.5 9.5 C 33 13.5 28.8 15.8 24 16.5 Z"
          fill={isDark ? '#9EE05B' : '#8BC34A'}
        />

        {/* Giọt sương mai lấp lánh */}
        <circle cx="20.5" cy="8" r="0.8" fill="#FFF9F0" />
      </svg>

      {/* =========================================================================
          2. CHỮ THƯƠNG HIỆU (BÊN PHẢI)
          “Mầm Kids” + dòng phụ “THỜI TRANG TRẺ EM”
          ========================================================================= */}
      {!iconOnly && (
        <div className="flex flex-col justify-center text-left leading-none">
          {/* Tên chính: Mầm Kids */}
          <div className="flex items-baseline tracking-tight font-heading">
            <span
              className={`font-black tracking-tight ${textClasses.brand} ${
                isDark ? 'text-white' : 'text-[#285A48]'
              }`}
              style={{
                fontFamily: "'Baloo 2', 'Quicksand', 'Be Vietnam Pro', sans-serif"
              }}
            >
              Mầm
            </span>
            <span
              className={`font-black tracking-tight ${textClasses.gap} ${textClasses.brand} text-[#F2B544] relative`}
              style={{
                fontFamily: "'Baloo 2', 'Quicksand', 'Be Vietnam Pro', sans-serif"
              }}
            >
              Kids
              {/* Chiếc lá nhỏ trang trí vi diệu trên chữ i */}
              <span
                className="absolute -top-1 left-[14px] sm:left-[16px] w-1.5 h-1.5 rounded-full pointer-events-none select-none opacity-90 hidden"
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Dòng phụ định vị ngành hàng: THỜI TRANG TRẺ EM */}
          {showSubtitle && (
            <span
              className={`font-bold uppercase tracking-wider font-sans ${textClasses.sub} ${
                isDark ? 'text-[#E6F1EB]/90' : 'text-[#4E8773]'
              }`}
            >
              Thời trang trẻ em
            </span>
          )}

          {/* Slogan thương hiệu dài (Dành riêng cho Footer hoặc Showcase) */}
          {showSlogan && (
            <span
              className={`text-xs font-semibold tracking-normal mt-1.5 ${
                isDark ? 'text-[#F4C95D]' : 'text-[#3E6F5D]'
              }`}
            >
              Không chỉ mặc đẹp – cùng bé gieo thói quen xanh
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (isLink) {
    return (
      <Link
        to="/"
        className="inline-flex items-center group bg-transparent focus:outline-hidden hover:opacity-95 transition-opacity"
        title="Mầm Kids – Thời trang trẻ em"
        aria-label="Về trang chủ Mầm Kids"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
