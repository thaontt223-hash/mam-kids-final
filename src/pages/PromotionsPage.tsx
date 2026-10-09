import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Gift,
  Ticket,
  Sparkles,
  Copy,
  Check,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Percent,
  Leaf,
  Baby,
  Star,
  ShoppingBag,
  Clock,
  Tag,
  Info,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  Truck,
  Layers,
  Award,
  ChevronRight,
  Search
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';

type PromoCategory = 'all' | 'voucher' | 'member' | 'combo' | 'seasonal' | 'eco';

interface VoucherItem {
  id: string;
  code: string;
  discount: {
    vi: string;
    en: string;
  };
  discountType: 'percent' | 'cash' | 'gift' | 'shipping';
  title: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  condition: {
    vi: string;
    en: string;
  };
  validity: {
    vi: string;
    en: string;
  };
  badge: {
    vi: string;
    en: string;
  };
  category: 'voucher' | 'member' | 'combo' | 'seasonal' | 'eco';
  featured?: boolean;
}

interface MemberPerkItem {
  id: string;
  icon: React.ReactNode;
  levelBadge: {
    vi: string;
    en: string;
  };
  title: {
    vi: string;
    en: string;
  };
  highlight: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  condition: {
    vi: string;
    en: string;
  };
  time: {
    vi: string;
    en: string;
  };
  ctaText: {
    vi: string;
    en: string;
  };
  ctaLink: string;
}

interface ComboDealItem {
  id: string;
  tag: {
    vi: string;
    en: string;
  };
  title: {
    vi: string;
    en: string;
  };
  saving: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  itemsIncluded: {
    vi: string[];
    en: string[];
  };
  condition: {
    vi: string;
    en: string;
  };
  time: {
    vi: string;
    en: string;
  };
  ctaText: {
    vi: string;
    en: string;
  };
  ctaLink: string;
}

interface SeasonalCampaignItem {
  id: string;
  emoji: string;
  tag: {
    vi: string;
    en: string;
  };
  title: {
    vi: string;
    en: string;
  };
  benefit: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  period: {
    vi: string;
    en: string;
  };
  code?: string;
  ctaText: {
    vi: string;
    en: string;
  };
  ctaLink: string;
}

interface EcoCampaignItem {
  id: string;
  icon: React.ReactNode;
  badge: {
    vi: string;
    en: string;
  };
  title: {
    vi: string;
    en: string;
  };
  reward: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  steps: {
    vi: string;
    en: string;
  };
  period: {
    vi: string;
    en: string;
  };
  ctaText: {
    vi: string;
    en: string;
  };
  ctaLink: string;
}

export const PromotionsPage: React.FC = () => {
  const { language } = useLanguage();
  const { showToast } = useCart();
  const [activeTab, setActiveTab] = useState<PromoCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    showToast(
      language === 'en' ? 'Voucher Code Copied!' : 'Đã sao chép mã ưu đãi!',
      language === 'en'
        ? `Code "${code}" is ready. Apply it in your cart at checkout.`
        : `Mã "${code}" đã sẵn sàng. Dán mã tại bước thanh toán để nhận ưu đãi.`
    );
    setTimeout(() => {
      setCopiedCode(null);
    }, 2800);
  };

  // 1. Voucher List (Mã ưu đãi độc quyền)
  const vouchers: VoucherItem[] = [
    {
      id: 'mam-new-10',
      code: 'MAMNEW10',
      discount: {
        vi: 'GIẢM 10%',
        en: '10% OFF'
      },
      discountType: 'percent',
      badge: {
        vi: 'BẠN MỚI',
        en: 'NEW FRIEND'
      },
      title: {
        vi: 'Chào Mầm Mới – Giảm 10% đơn đầu tiên',
        en: 'Welcome Little Sprout – 10% Off First Order'
      },
      description: {
        vi: 'Món quà làm quen yêu thương dành tặng gia đình nhỏ lần đầu mua sắm tại Mầm Kids.',
        en: 'A warm welcome gift for young families experiencing Mầm Kids apparel for the first time.'
      },
      condition: {
        vi: 'Đơn từ 250.000đ (giảm tối đa 100.000đ), 1 lần/tài khoản',
        en: 'Orders from 250k VND (max discount 100k VND), 1 time/account'
      },
      validity: {
        vi: 'Xuyên suốt năm 2026',
        en: 'Valid through 2026'
      },
      category: 'voucher',
      featured: true
    },
    {
      id: 'mam-ship-0k',
      code: 'FREESHIP300',
      discount: {
        vi: 'FREESHIP',
        en: 'FREE SHIP'
      },
      discountType: 'shipping',
      badge: {
        vi: 'TOÀN QUỐC',
        en: 'NATIONWIDE'
      },
      title: {
        vi: 'Miễn phí giao hàng tận nhà',
        en: 'Free Doorstep Shipping'
      },
      description: {
        vi: 'Giao hàng tận nơi chu đáo, kiểm tra hàng thoải mái trước khi thanh toán.',
        en: 'Careful doorstep delivery with full unboxing check before payment.'
      },
      condition: {
        vi: 'Đơn hàng từ 300.000đ trở lên, áp dụng toàn quốc',
        en: 'Orders from 300,000 VND and above, nationwide'
      },
      validity: {
        vi: 'Áp dụng mọi ngày',
        en: 'Active everyday'
      },
      category: 'voucher',
      featured: true
    },
    {
      id: 'mam-save-50k',
      code: 'MAMSAVE50',
      discount: {
        vi: 'GIẢM 50.000đ',
        en: '50,000đ OFF'
      },
      discountType: 'cash',
      badge: {
        vi: 'TIẾT KIỆM',
        en: 'SAVING'
      },
      title: {
        vi: 'Ưu Đãi Tủ Đồ Yêu Thương',
        en: 'Loving Wardrobe Saver'
      },
      description: {
        vi: 'Mua sắm các món đồ cơ bản hữu cơ mềm dịu cho bé cả tuần thoải mái.',
        en: 'Stock up on ultra-soft organic basics for your little one all week long.'
      },
      condition: {
        vi: 'Áp dụng cho đơn hàng từ 599.000đ',
        en: 'Applicable for orders from 599,000 VND'
      },
      validity: {
        vi: 'Hạn dùng: Đến 31/12/2026',
        en: 'Expires: Dec 31, 2026'
      },
      category: 'voucher'
    },
    {
      id: 'mam-save-100k',
      code: 'MAMGREEN100',
      discount: {
        vi: 'GIẢM 100.000đ',
        en: '100,000đ OFF'
      },
      discountType: 'cash',
      badge: {
        vi: 'SIÊU ƯU ĐÃI',
        en: 'SUPER OFFER'
      },
      title: {
        vi: 'Đơn Lớn Tiết Kiệm Lớn',
        en: 'Big Cart, Big Savings'
      },
      description: {
        vi: 'Trọn gói trang phục đi học, dạo phố và mặc nhà an lành cho các bé.',
        en: 'Full wardrobe package for school, outings, and cozy home wear.'
      },
      condition: {
        vi: 'Áp dụng cho đơn hàng từ 999.000đ',
        en: 'Applicable for orders from 999,000 VND'
      },
      validity: {
        vi: 'Số lượng 500 lượt/tháng',
        en: 'Limit: 500 redemptions/month'
      },
      category: 'voucher'
    },
    {
      id: 'mam-gift-tote',
      code: 'TOTEGIFT',
      discount: {
        vi: 'TẶNG TÚI TOTE',
        en: 'FREE TOTE'
      },
      discountType: 'gift',
      badge: {
        vi: 'QUÀ TẶNG',
        en: 'FREE GIFT'
      },
      title: {
        vi: 'Tặng 01 Túi Canvas Hạt Mầm Eco',
        en: 'Free Mầm Eco Canvas Tote Bag'
      },
      description: {
        vi: 'Túi vải canvas 100% tự nhiên quai êm, đựng bình nước và đồ chơi cho bé dạo chơi.',
        en: '100% natural canvas tote with soft straps, perfect for picnic water bottles and toys.'
      },
      condition: {
        vi: 'Đơn từ 400.000đ, tự động tặng kèm khi thanh toán',
        en: 'Orders from 400,000 VND, automatically added'
      },
      validity: {
        vi: 'Đến khi hết quà tặng',
        en: 'While stock lasts'
      },
      category: 'voucher'
    },
    {
      id: 'mam-twin-8',
      code: 'MAMTWIN8',
      discount: {
        vi: 'GIẢM 8%',
        en: '8% OFF'
      },
      discountType: 'percent',
      badge: {
        vi: 'MUA TỪ 3 MÓN',
        en: 'BUY 3+ ITEMS'
      },
      title: {
        vi: 'Càng Mua Càng Hời',
        en: 'Multi-item Wardrobe Saver'
      },
      description: {
        vi: 'Ưu đãi cho phụ huynh sắm trọn đồ đôi cho anh chị em trong nhà.',
        en: 'Extra discount for parents dressing siblings in coordinated outfits.'
      },
      condition: {
        vi: 'Mua từ 3 sản phẩm bất kỳ trong giỏ hàng',
        en: 'Buy any 3+ products in single order'
      },
      validity: {
        vi: 'Áp dụng suốt tuần',
        en: 'Active every week'
      },
      category: 'voucher'
    }
  ];

  // 2. Member Perks (Ưu đãi thành viên Mầm)
  const memberPerks: MemberPerkItem[] = [
    {
      id: 'point-system',
      icon: <Sparkles className="w-6 h-6 text-[#F4C95D]" />,
      levelBadge: {
        vi: 'TÍCH ĐIỂM XANH',
        en: 'GREEN POINTS'
      },
      title: {
        vi: '1.000 VND = 1 Điểm Mầm (Đổi Voucher)',
        en: '1,000 VND = 1 Mầm Point (Redeem Vouchers)'
      },
      highlight: {
        vi: 'Tích lũy tự động sau mỗi đơn hàng thành công',
        en: 'Earn points automatically on every completed order'
      },
      description: {
        vi: 'Cứ mỗi 100 Điểm Mầm đổi ngay voucher 10.000đ trực tiếp khi thanh toán. Không giới hạn số điểm tối đa.',
        en: 'Every 100 Mầm Points can be redeemed for a 10,000 VND direct discount voucher. No point cap.'
      },
      condition: {
        vi: 'Áp dụng tự động cho tài khoản đăng ký thành viên Mầm Kids.',
        en: 'Automatically active for registered Mầm Kids member accounts.'
      },
      time: {
        vi: 'Tích lũy vĩnh viễn, điểm không hết hạn',
        en: 'Permanent accumulation, points never expire'
      },
      ctaText: {
        vi: 'XEM VÍ ĐIỂM MẦM',
        en: 'VIEW MẦM POINTS'
      },
      ctaLink: '/diem-mam'
    },
    {
      id: 'birthday-gift',
      icon: <Baby className="w-6 h-6 text-[#F39A73]" />,
      levelBadge: {
        vi: 'SINH NHẬT BÉ',
        en: 'KIDS BIRTHDAY'
      },
      title: {
        vi: 'Voucher 15% Trong Tháng Sinh Nhật Của Bé',
        en: '15% Off Voucher During Child’s Birthday Month'
      },
      highlight: {
        vi: 'Giảm 15% tối đa 150.000đ + Thiệp chúc mừng viết tay',
        en: '15% discount up to 150,000 VND + handwritten postcard'
      },
      description: {
        vi: 'Gửi trọn tình yêu thương tới bé con nhân dịp tròn thêm một tuổi. Voucher được gửi thẳng vào ví tài khoản của mẹ.',
        en: 'Sending boundless love to your little star on their birthday month. Voucher loaded directly to your wallet.'
      },
      condition: {
        vi: 'Chỉ cần cập nhật ngày sinh của bé trong mục Hồ Sơ Bé trước 7 ngày.',
        en: 'Simply register child’s birthday in Little Profile 7 days in advance.'
      },
      time: {
        vi: 'Có hiệu lực trong trọn vẹn 30 ngày tháng sinh nhật của bé',
        en: 'Valid for all 30 days of the child’s birthday month'
      },
      ctaText: {
        vi: 'CẬP NHẬT HỒ SƠ BÉ',
        en: 'UPDATE BABY PROFILE'
      },
      ctaLink: '/thong-tin-be'
    },
    {
      id: 'tier-privilege',
      icon: <Award className="w-6 h-6 text-[#4E8773]" />,
      levelBadge: {
        vi: 'HẠNG THÀNH VIÊN',
        en: 'TIER REWARDS'
      },
      title: {
        vi: 'Đặc Quyền Thăng Hạng: Mầm Ươm ➔ Rừng Xanh',
        en: 'Tier Upgrades: Sprout Seed ➔ Green Forest'
      },
      highlight: {
        vi: 'Tặng quà tri ân mỗi khi lên hạng thành viên',
        en: 'Celebration gifts upon unlocking each tier milestone'
      },
      description: {
        vi: 'Từ hạng Mầm Xanh trở lên, gia đình được ưu tiên trải nghiệm bộ sưu tập mới sớm 48 giờ và nhận quà giáng sinh độc quyền.',
        en: 'From Green Sprout tier, members enjoy 48-hour early drop access and exclusive festive gift packages.'
      },
      condition: {
        vi: 'Tự động tính theo tổng chi tiêu tích lũy trong năm.',
        en: 'Calculated automatically based on annual cumulative spend.'
      },
      time: {
        vi: 'Duy trì thứ hạng 12 tháng liên tục',
        en: 'Tier maintained across 12 rolling months'
      },
      ctaText: {
        vi: 'QUẢN LÝ TÀI KHOẢN',
        en: 'MANAGE ACCOUNT'
      },
      ctaLink: '/tai-khoan'
    }
  ];

  // 3. Smart Combo Deals (Ưu đãi Combo Tiết Kiệm)
  const comboDeals: ComboDealItem[] = [
    {
      id: 'combo-play-all-day',
      tag: {
        vi: 'SET TIẾT KIỆM',
        en: 'VALUE SET'
      },
      title: {
        vi: 'Combo “Ngày Nắng Năng Động” (Áo Polo + Quần Short)',
        en: '“Active Sunny Days” Set (Polo Shirt + Linen Shorts)'
      },
      saving: {
        vi: 'Tiết kiệm 50.000đ so với mua lẻ',
        en: 'Save 50,000 VND vs single items'
      },
      description: {
        vi: 'Set phối sẵn tông màu trang nhã, chất liệu cotton organic co giãn nhẹ giúp bé thoải mái chạy nhảy cả ngày dài.',
        en: 'Pre-matched set in calm earth tones, breathable organic cotton giving freedom for all-day play.'
      },
      itemsIncluded: {
        vi: ['01 Áo polo cotton organic cổ mềm', '01 Quần short linen lưng thun co giãn'],
        en: ['01 Organic soft-collar polo', '01 Elastic-waist linen short']
      },
      condition: {
        vi: 'Áp dụng trực tiếp khi chọn mua nguyên bộ trong mục Bộ sưu tập.',
        en: 'Applied automatically when buying matched sets under Collections.'
      },
      time: {
        vi: 'Diễn ra thường niên trong năm',
        en: 'Ongoing year-round bundle'
      },
      ctaText: {
        vi: 'KHÁM PHÁ COMBO',
        en: 'EXPLORE SETS'
      },
      ctaLink: '/bo-suu-tap'
    },
    {
      id: 'combo-sweet-dress',
      tag: {
        vi: 'SET BÉ GÁI',
        en: 'GIRL BUNDLE'
      },
      title: {
        vi: 'Combo “Nàng Thơ Nhí” (Váy Xòe + Băng Đô Hoa Tặng Kèm)',
        en: '“Little Muse” Set (Flared Dress + Matching Hairband)'
      },
      saving: {
        vi: 'Tiết kiệm 60.000đ + Tặng băng đô 45k',
        en: 'Save 60,000 VND + Free 45k Hairband'
      },
      description: {
        vi: 'Váy xòe vải sợi tre kháng khuẩn êm ái, tặng kèm phụ kiện đồng điệu cho bé diện đi tiệc, đi chơi cuối tuần.',
        en: 'Hypoallergenic bamboo flared dress with complimentary matching headpiece for lovely weekend outings.'
      },
      itemsIncluded: {
        vi: ['01 Váy hoa xòe pastel công chúa', '01 Băng đô vải cotton hữu cơ êm tai'],
        en: ['01 Pastel botanical floral dress', '01 Soft zero-pressure organic headpiece']
      },
      condition: {
        vi: 'Số lượng 300 set phối sẵn mỗi tháng.',
        en: 'Limited to 300 coordinated sets monthly.'
      },
      time: {
        vi: 'Áp dụng cho mùa dạo phố cuối tuần',
        en: 'Active for weekend outings'
      },
      ctaText: {
        vi: 'XEM CHI TIẾT',
        en: 'VIEW DETAILS'
      },
      ctaLink: '/bo-suu-tap'
    },
    {
      id: 'combo-basics-pack',
      tag: {
        vi: 'COMBO 3 ÁO',
        en: '3-TEE PACK'
      },
      title: {
        vi: 'Gói 3 Áo Thun Basic Kháng Khuẩn Tuần Mới',
        en: '3-Pack Daily Antibacterial Basic Tees'
      },
      saving: {
        vi: 'Mua 3 tính tiền 2.5 (Tiết kiệm 75.000đ)',
        en: 'Buy 3 Pay 2.5 (Save 75,000 VND)'
      },
      description: {
        vi: 'Bộ ba màu sắc dịu lành (Trắng sữa, Xanh bơ, Be ấm) cho bé thay đổi mỗi ngày tới trường mà không lo bí bách.',
        en: 'Trio of soothing tones (Milk White, Sage Olive, Warm Beige) for fresh daily school changes.'
      },
      itemsIncluded: {
        vi: ['3 Áo thun organic cotton 100% không nhãn may cổ gây ngứa'],
        en: ['3 100% organic cotton tees with tagless printed neckline']
      },
      condition: {
        vi: 'Tự chọn size cho từng áo hoặc cùng 1 size.',
        en: 'Freely choose different sizes or same size per shirt.'
      },
      time: {
        vi: 'Ưu đãi liên tục quanh năm',
        en: 'Active all year round'
      },
      ctaText: {
        vi: 'CHỌN GÓI 3 ÁO',
        en: 'CHOOSE 3-PACK'
      },
      ctaLink: '/san-pham'
    }
  ];

  // 4. Seasonal Campaigns (Ưu đãi theo mùa)
  const seasonalCampaigns: SeasonalCampaignItem[] = [
    {
      id: 'season-back-to-school',
      emoji: '🎒',
      tag: {
        vi: 'MÙA TỰU TRƯỜNG',
        en: 'BACK TO SCHOOL'
      },
      title: {
        vi: 'Mùa Tựu Trường Rạng Rỡ – Bé Vui Đến Lớp',
        en: 'Bright Back to School – Joyful Learning Days'
      },
      benefit: {
        vi: 'Giảm 5% khi mua từ 2 áo polo hoặc set đồ học đường',
        en: 'Extra 5% off when buying 2+ polos or school-ready sets'
      },
      description: {
        vi: 'Chất liệu thoáng khí thấm hút mồ hôi vượt trội, đồng hành cùng con trong những tiết học và giờ ra chơi năng động.',
        en: 'Superior moisture-wicking organic fabric, keeping kids fresh and happy during lively school days.'
      },
      period: {
        vi: 'Áp dụng cho mùa nhập học (Tháng 8 – Tháng 10)',
        en: 'Valid during back-to-school season (Aug – Oct)'
      },
      code: 'SCHOOL5',
      ctaText: {
        vi: 'XEM ĐỒ ĐI HỌC',
        en: 'EXPLORE SCHOOL LOOKS'
      },
      ctaLink: '/bo-suu-tap'
    },
    {
      id: 'season-summer-active',
      emoji: '☀️',
      tag: {
        vi: 'MÙA HÈ XANH',
        en: 'SUMMER SUNSHINE'
      },
      title: {
        vi: 'Nắng Hè Tươi Vui – Dã Ngoại Khám Phá',
        en: 'Fresh Summer Picnic – Nature Discovery'
      },
      benefit: {
        vi: 'Tặng nón bucket che nắng và túi canvas cho combo đồ dạo hè',
        en: 'Free sun-protective bucket hat & canvas pouch with summer sets'
      },
      description: {
        vi: 'Chống tia UV nhẹ tự nhiên từ sợi dệt mật độ cao, bảo vệ làn da non nớt của bé dưới ánh nắng vàng ươm.',
        en: 'Natural UV shelter weave, gently protecting sensitive little skin under warm sunny breezes.'
      },
      period: {
        vi: 'Áp dụng trong mùa hè (Tháng 5 – Tháng 7)',
        en: 'Active during summer holidays (May – Jul)'
      },
      code: 'SUMMERHAT',
      ctaText: {
        vi: 'KHÁM PHÁ BST HÈ',
        en: 'SUMMER COLLECTION'
      },
      ctaLink: '/bo-suu-tap'
    },
    {
      id: 'season-family-month',
      emoji: '👨‍👩‍👧‍👦',
      tag: {
        vi: 'TRI ÂN GIA ĐÌNH',
        en: 'FAMILY MONTH'
      },
      title: {
        vi: 'Tháng Tri Ân Gia Đình Mầm – Nhân Đôi Yêu Thương',
        en: 'Mầm Family Gratitude Month – Double The Joy'
      },
      benefit: {
        vi: 'Nhân đôi (x2) Điểm Mầm tích lũy cho toàn bộ đơn hàng',
        en: '2x Double Mầm Points multiplier for all qualifying purchases'
      },
      description: {
        vi: 'Cơ hội tuyệt vời để mẹ tích lũy điểm thưởng xanh, đổi ngay những phần quà bất ngờ dành cho cả gia đình.',
        en: 'A wonderful moment to double green reward points and redeem delightful gifts for the entire family.'
      },
      period: {
        vi: 'Áp dụng trong tháng gia đình',
        en: 'Active during Family Celebration Month'
      },
      ctaText: {
        vi: 'TÍCH ĐIỂM NGAY',
        en: 'EARN 2X POINTS'
      },
      ctaLink: '/diem-mam'
    }
  ];

  // 5. Eco Circular Campaigns (Chiến dịch Mầm Xanh Tuần Hoàn)
  const ecoCampaigns: EcoCampaignItem[] = [
    {
      id: 'mam-again-trade',
      icon: <RefreshCw className="w-6 h-6 text-[#285A48]" />,
      badge: {
        vi: 'MẦM AGAIN – TUẦN HOÀN',
        en: 'MẦM AGAIN – CIRCULAR'
      },
      title: {
        vi: 'Chương Trình “Mầm Again” – Trao Lại Quần Áo Cũ',
        en: '“Mầm Again” Program – Pass On Pre-Loved Clothes'
      },
      reward: {
        vi: 'Nhận Voucher 30.000đ – 50.000đ cho mỗi món đồ gửi lại',
        en: 'Get 30,000đ – 50,000đ voucher for each piece passed on'
      },
      description: {
        vi: 'Bé lớn nhanh, quần áo chật? Mẹ hãy gửi lại Mầm Kids để được khử khuẩn, sửa chữa trao cho các em nhỏ vùng cao hoặc tái chế sợi vải.',
        en: 'Outgrown clothes? Send them back to Mầm Kids for hygienic renewal, donation to mountainous children, or fiber recycling.'
      },
      steps: {
        vi: 'Đóng gói đồ cũ ➔ Đặt lịch gom miễn phí tại nhà ➔ Nhận voucher gửi vào ví mẹ.',
        en: 'Pack items ➔ Book free home doorstep pickup ➔ Voucher instantly credited.'
      },
      period: {
        vi: 'Chương trình diễn ra liên tục quanh năm',
        en: 'Continuous year-round circular mission'
      },
      ctaText: {
        vi: 'ĐẶT LỊCH GỬI ĐỒ CŨ',
        en: 'BOOK RECYCLE PICKUP'
      },
      ctaLink: '/mam-again'
    },
    {
      id: 'green-qr-mission',
      icon: <Leaf className="w-6 h-6 text-[#4E8773]" />,
      badge: {
        vi: 'TEM THÔNG MINH GREEN QR',
        en: 'SMART GREEN QR TAG'
      },
      title: {
        vi: 'Quét Tem Áo Cùng Bé Nhận Điểm Mầm Xanh',
        en: 'Scan Garment Tag With Your Child For Green Points'
      },
      reward: {
        vi: 'Tặng ngay 50 Điểm Mầm + Huy hiệu Hiệp Sĩ Xanh',
        en: 'Instant 50 Mầm Points + Eco Knight Badge'
      },
      description: {
        vi: 'Mỗi chiếc áo Mầm Kids đều có tem QR dẫn tới mẩu chuyện thiên nhiên và 1 nhiệm vụ bảo vệ môi trường nhỏ cho bé.',
        en: 'Every garment tag has a smart QR leading to an interactive nature bedtime tale and gentle kid-friendly eco-quest.'
      },
      steps: {
        vi: 'Dùng điện thoại quét mã QR trên mác áo ➔ Nghe truyện cùng con ➔ Bấm hoàn thành nhiệm vụ.',
        en: 'Scan QR tag on collar ➔ Listen to story together ➔ Complete the daily green quest.'
      },
      period: {
        vi: 'Áp dụng trên mọi sản phẩm Mầm Kids có tem Green QR',
        en: 'Available on all products with Green QR tags'
      },
      ctaText: {
        vi: 'KHÁM PHÁ MẦM XANH',
        en: 'EXPLORE MẦM XANH'
      },
      ctaLink: '/mam-xanh'
    }
  ];

  // Filtering vouchers by tab & query
  const filteredVouchers = useMemo(() => {
    return vouchers.filter((v) => {
      const matchesSearch =
        searchQuery === '' ||
        v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.title.vi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.discount.vi.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeTab === 'all' || activeTab === 'voucher') {
        return matchesSearch;
      }
      return false;
    });
  }, [vouchers, activeTab, searchQuery]);

  return (
    <div className="bg-[#FFF9F0] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#4E8773]" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#285A48] transition-colors font-medium">
            {language === 'en' ? 'Home' : 'Trang chủ'}
          </Link>
          <span className="text-[#C96852]/60">/</span>
          <span className="font-bold text-[#285A48]">
            {language === 'en' ? 'Promotion Hub' : 'Khuyến mãi & Ưu đãi'}
          </span>
        </nav>

        {/* =========================================================================
            1. HERO / TITLE SECTION (PROMOTION HUB HEADER)
            ========================================================================= */}
        <header className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#FFF9F0] via-[#E6F1EB] to-[#FFF4DE] p-8 sm:p-14 border-2 border-[#4E8773]/20 shadow-sm text-center">
          {/* Subtle floating background icons */}
          <div className="absolute top-5 left-6 sm:left-12 text-3xl sm:text-4xl opacity-50 select-none animate-bounce duration-1000">
            🎁
          </div>
          <div className="absolute top-6 right-8 sm:right-16 text-3xl sm:text-4xl opacity-50 select-none">
            🎟️
          </div>
          <div className="absolute bottom-6 right-10 sm:right-24 text-3xl sm:text-4xl opacity-40 select-none animate-pulse">
            ✨
          </div>
          <div className="absolute bottom-6 left-8 sm:left-20 text-3xl sm:text-4xl opacity-40 select-none">
            🌱
          </div>

          <div className="max-w-3xl mx-auto relative z-10 space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#285A48] text-white text-xs sm:text-[13px] font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span>{language === 'en' ? 'EXCLUSIVE OFFERS FOR YOU' : 'ƯU ĐÃI DÀNH RIÊNG CHO BẠN'}</span>
              <Gift className="w-3.5 h-3.5 text-[#F4C95D]" />
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#285A48] tracking-tight font-heading">
              {language === 'en' ? 'MẦM KIDS PROMOTIONS & OFFERS' : 'KHUYẾN MÃI & ƯU ĐÃI MẦM KIDS'}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[#253A32]/90 leading-relaxed max-w-2xl mx-auto font-medium">
              {language === 'en'
                ? 'Discover vouchers, smart combos, complimentary gifts, and eco-reward campaigns curated especially for the Mầm Kids family.'
                : 'Khám phá voucher, combo, quà tặng và những chương trình ưu đãi dành riêng cho gia đình Mầm Kids.'}
            </p>

            {/* Key trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3 text-xs font-bold text-[#285A48]">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/90 border border-[#4E8773]/25 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#4E8773]" />
                {language === 'en' ? 'Transparent Conditions' : 'Điều kiện rõ ràng, minh bạch'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/90 border border-[#4E8773]/25 shadow-2xs">
                <Truck className="w-4 h-4 text-[#4E8773]" />
                {language === 'en' ? 'Free Shipping from 300K' : 'Freeship đơn từ 300.000đ'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/90 border border-[#4E8773]/25 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#4E8773]" />
                {language === 'en' ? 'Doorstep Exchange 15 Days' : 'Đổi size tại nhà 15 ngày'}
              </span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            2. CHƯƠNG TRÌNH NỔI BẬT: FEATURED HERO PROMOTION BANNER
            ========================================================================= */}
        <section className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] bg-gradient-to-r from-[#285A48] via-[#4E8773] to-[#C96852] p-7 sm:p-11 text-white shadow-lg">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4C95D]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-black/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black uppercase tracking-wider text-[#FFF9F0] border border-white/30">
                <span>🌿</span> {language === 'en' ? 'FEATURED CAMPAIGN' : 'CHƯƠNG TRÌNH NỔI BẬT'}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading leading-tight tracking-tight">
                {language === 'en' ? 'GREEN GIFTS FOR KIDS' : 'QUÀ XANH CHO BÉ'}
              </h2>

              <p className="text-sm sm:text-base text-white/95 leading-relaxed font-medium max-w-xl">
                {language === 'en'
                  ? 'Shop consciously with Mầm Kids and receive meaningful green gifts for your little ones: complimentary tote bags, double Mầm Points, and eco-stickers.'
                  : 'Mua sắm cùng Mầm Kids và nhận thêm những món quà nhỏ dành cho bé: túi canvas thân thiện, Điểm Mầm xanh và quà tặng sinh nhật bất ngờ.'}
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-bold text-[#253A32]">
                <div className="p-3 rounded-2xl bg-white/95 text-center shadow-xs">
                  <span className="block text-lg mb-0.5">🎟️</span>
                  <span className="text-[12px]">{language === 'en' ? 'Voucher 10%' : 'Voucher 10% Bạn Mới'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/95 text-center shadow-xs">
                  <span className="block text-lg mb-0.5">👜</span>
                  <span className="text-[12px]">{language === 'en' ? 'Tote Bag Gift' : 'Túi Tote Eco'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/95 text-center shadow-xs">
                  <span className="block text-lg mb-0.5">🌱</span>
                  <span className="text-[12px]">{language === 'en' ? 'Mầm Points' : 'Điểm Mầm Xanh'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/95 text-center shadow-xs">
                  <span className="block text-lg mb-0.5">🎁</span>
                  <span className="text-[12px]">{language === 'en' ? 'Seasonal Gift' : 'Quà Theo Mùa'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 sm:p-7 rounded-3xl bg-white/15 backdrop-blur-md border border-white/30 space-y-3">
              <span className="text-xs uppercase font-black tracking-widest text-[#F4C95D]">
                {language === 'en' ? 'Active Campaign' : 'Đang diễn ra toàn hệ thống'}
              </span>
              <p className="text-xs text-white/90 leading-relaxed">
                {language === 'en'
                  ? 'Applies automatically at checkout with qualifying orders'
                  : 'Tự động áp dụng quà tặng và voucher ngay tại trang giỏ hàng'}
              </p>
              <div className="w-full pt-2">
                <Link
                  to="/san-pham"
                  className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-[#FFF9F0] text-[#285A48] font-black text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{language === 'en' ? 'EXPLORE APPAREL' : 'MUA SẮM NHẬN QUÀ'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. PROMOTION HUB CATEGORY TABS (BỘ LỌC CHUYÊN DỤNG CHO PROMOTIONS)
            ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E6F1EB] shadow-2xs w-full sm:w-auto">
              {[
                { key: 'all', labelVi: 'Tất cả ưu đãi', labelEn: 'All Offers', icon: Sparkles },
                { key: 'voucher', labelVi: 'Voucher & Mã giảm', labelEn: 'Vouchers & Codes', icon: Ticket },
                { key: 'member', labelVi: 'Ưu đãi thành viên', labelEn: 'Member Perks', icon: Star },
                { key: 'combo', labelVi: 'Combo tiết kiệm', labelEn: 'Smart Sets', icon: ShoppingBag },
                { key: 'seasonal', labelVi: 'Ưu đãi theo mùa', labelEn: 'Seasonal Deals', icon: Calendar },
                { key: 'eco', labelVi: 'Chiến dịch Mầm Xanh', labelEn: 'Eco Campaigns', icon: Leaf }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key as PromoCategory)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#285A48] text-white shadow-xs'
                        : 'text-[#253A32] hover:bg-[#E6F1EB] hover:text-[#285A48]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F4C95D]' : 'text-[#4E8773]'}`} />
                    <span>{language === 'en' ? tab.labelEn : tab.labelVi}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick search voucher by code or name */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#4E8773] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'en' ? 'Search voucher code...' : 'Tìm mã ưu đãi, voucher...'}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-white border border-[#E6F1EB] text-[#253A32] placeholder-[#4E8773]/60 focus:outline-none focus:border-[#285A48] shadow-2xs font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#253A32]/60 hover:text-[#253A32] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. VOUCHERS SECTION (MÃ ƯU ĐÃI & COUPON CARDS DẠNG VÉ)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'voucher') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[#E6F1EB] pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#4E8773] font-heading block mb-1">
                  {language === 'en' ? 'VOUCHER WALLET' : 'MÃ ƯU ĐÃI ĐỘC QUYỀN'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
                  {language === 'en' ? 'Vouchers & Discount Codes' : 'Voucher & Mã Giảm Giá'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#253A32]/80">
                {language === 'en'
                  ? 'Click "Copy" to copy code and apply directly at checkout'
                  : 'Bấm "Sao chép" để lấy mã và nhập tại bước thanh toán'}
              </p>
            </div>

            {filteredVouchers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-[#E6F1EB] space-y-2">
                <Ticket className="w-10 h-10 text-[#4E8773]/50 mx-auto" />
                <p className="text-sm font-bold text-[#253A32]">
                  {language === 'en' ? 'No vouchers match your search.' : 'Không tìm thấy mã ưu đãi phù hợp.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-[#285A48] underline cursor-pointer"
                >
                  {language === 'en' ? 'Reset search' : 'Xóa tìm kiếm'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredVouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="relative rounded-3xl bg-white border-2 border-[#E6F1EB] hover:border-[#4E8773] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Decorative side ticket notches */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFF9F0] border border-[#E6F1EB]" />
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFF9F0] border border-[#E6F1EB]" />

                    <div className="space-y-3.5 pl-2 pr-2">
                      {/* Top Bar: Badge & Discount Value */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#E6F1EB] text-[#285A48] border border-[#4E8773]/20">
                          {language === 'en' ? voucher.badge.en : voucher.badge.vi}
                        </span>
                        <div className="text-right">
                          <span className="text-lg sm:text-xl font-black text-[#C96852] font-heading block">
                            {language === 'en' ? voucher.discount.en : voucher.discount.vi}
                          </span>
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <div>
                        <h3 className="text-base font-bold text-[#285A48] font-heading group-hover:text-[#4E8773] transition-colors">
                          {language === 'en' ? voucher.title.en : voucher.title.vi}
                        </h3>
                        <p className="text-xs text-[#253A32]/80 mt-1 leading-relaxed">
                          {language === 'en' ? voucher.description.en : voucher.description.vi}
                        </p>
                      </div>

                      {/* Code Box with instant copy */}
                      <div className="p-2.5 rounded-2xl bg-[#FFF9F0] border border-[#F4C95D]/40 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-[#C96852]" />
                          <span className="font-mono text-xs sm:text-sm font-black text-[#285A48] tracking-wider">
                            {voucher.code}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(voucher.code)}
                          className="px-3 py-1.5 rounded-xl bg-[#285A48] hover:bg-[#4E8773] text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          {copiedCode === voucher.code ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#F4C95D]" />
                              <span className="text-[11px] text-[#F4C95D]">
                                {language === 'en' ? 'Copied' : 'Đã chép'}
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">
                                {language === 'en' ? 'Copy Code' : 'Sao chép'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Conditions & Validity */}
                      <div className="text-[11px] text-[#253A32]/70 space-y-1 pt-1 border-t border-dashed border-[#E6F1EB]">
                        <div className="flex items-start gap-1">
                          <span className="text-[#285A48] font-bold">📋</span>
                          <span>
                            <strong>{language === 'en' ? 'Condition:' : 'Điều kiện:'}</strong>{' '}
                            {language === 'en' ? voucher.condition.en : voucher.condition.vi}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[#4E8773]">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>{language === 'en' ? voucher.validity.en : voucher.validity.vi}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-4 pt-3 border-t border-[#E6F1EB] flex items-center justify-between pl-2 pr-2">
                      <Link
                        to="/san-pham"
                        className="text-xs font-bold text-[#285A48] hover:text-[#4E8773] flex items-center gap-1 transition-colors"
                      >
                        <span>{language === 'en' ? 'Use Now' : 'Dùng ngay'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[10px] text-[#253A32]/60 uppercase tracking-wider font-semibold">
                        {language === 'en' ? 'Online only' : 'Áp dụng online'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
            5. MEMBER PERKS SECTION (ƯU ĐÃI THÀNH VIÊN)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'member') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[#E6F1EB] pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#F4C95D] font-heading block mb-1">
                  {language === 'en' ? 'LOYALTY PRIVILEGES' : 'HỘI VIÊN MẦM KIDS'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
                  {language === 'en' ? 'Membership Perks & Rewards' : 'Ưu Đãi Dành Cho Hội Viên'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#253A32]/80">
                {language === 'en'
                  ? 'Every order plants seeds for your family to earn green privileges'
                  : 'Mỗi đơn hàng đều tích lũy hạt mầm giúp mẹ nhận nhiều đặc quyền'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {memberPerks.map((perk) => (
                <div
                  key={perk.id}
                  className="rounded-3xl bg-white p-6 sm:p-7 border-2 border-[#E6F1EB] hover:border-[#4E8773] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-[#E6F1EB] text-[#285A48] shadow-2xs">
                        {perk.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#FFF9F0] text-[#285A48] text-xs font-black border border-[#F4C95D]/40">
                        {language === 'en' ? perk.levelBadge.en : perk.levelBadge.vi}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#285A48] font-heading leading-tight">
                        {language === 'en' ? perk.title.en : perk.title.vi}
                      </h3>
                      <div className="mt-2 p-2.5 rounded-xl bg-[#E6F1EB]/50 border border-[#4E8773]/20 text-xs font-bold text-[#285A48]">
                        ✨ {language === 'en' ? perk.highlight.en : perk.highlight.vi}
                      </div>
                      <p className="text-xs text-[#253A32]/80 mt-2.5 leading-relaxed font-medium">
                        {language === 'en' ? perk.description.en : perk.description.vi}
                      </p>
                    </div>

                    <div className="text-[11px] text-[#253A32]/70 space-y-1 pt-2 border-t border-[#E6F1EB]">
                      <div>
                        <strong>{language === 'en' ? 'Condition:' : 'Điều kiện:'}</strong>{' '}
                        {language === 'en' ? perk.condition.en : perk.condition.vi}
                      </div>
                      <div className="flex items-center gap-1 text-[#4E8773]">
                        <Clock className="w-3 h-3" />
                        <span>{language === 'en' ? perk.time.en : perk.time.vi}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6F1EB]">
                    <Link
                      to={perk.ctaLink}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#285A48] hover:bg-[#4E8773] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>{language === 'en' ? perk.ctaText.en : perk.ctaText.vi}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            6. SMART COMBOS (COMBO & MUA SET TIẾT KIỆM)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'combo') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[#E6F1EB] pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#C96852] font-heading block mb-1">
                  {language === 'en' ? 'SMART SET SAVINGS' : 'COMBO BÉ XINH TIẾT KIỆM'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
                  {language === 'en' ? 'Coordinated Set Combos' : 'Combo & Mua Theo Set Tiết Kiệm'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#253A32]/80">
                {language === 'en'
                  ? 'Pre-styled full lookbook bundles that save parents styling time and money'
                  : 'Tiết kiệm thời gian phối đồ mỗi sáng cùng các set trang phục đồng bộ'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comboDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="rounded-3xl bg-white p-6 sm:p-7 border-2 border-[#E6F1EB] hover:border-[#C96852] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#FFF9F0] text-[#C96852] text-xs font-black border border-[#C96852]/30">
                        {language === 'en' ? deal.tag.en : deal.tag.vi}
                      </span>
                      <span className="text-xs font-black text-[#285A48] bg-[#E6F1EB] px-2.5 py-1 rounded-lg">
                        {language === 'en' ? deal.saving.en : deal.saving.vi}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#285A48] font-heading leading-tight">
                        {language === 'en' ? deal.title.en : deal.title.vi}
                      </h3>
                      <p className="text-xs text-[#253A32]/80 mt-2 leading-relaxed font-medium">
                        {language === 'en' ? deal.description.en : deal.description.vi}
                      </p>
                    </div>

                    {/* Items included in the combo */}
                    <div className="p-3 rounded-2xl bg-[#FFF9F0] border border-[#E6F1EB] space-y-1.5">
                      <span className="text-[11px] font-black uppercase text-[#285A48] tracking-wider block">
                        📦 {language === 'en' ? 'Includes in set:' : 'Trọn bộ combo gồm:'}
                      </span>
                      <ul className="text-xs text-[#253A32]/90 space-y-1 font-medium">
                        {(language === 'en' ? deal.itemsIncluded.en : deal.itemsIncluded.vi).map(
                          (item, index) => (
                            <li key={index} className="flex items-center gap-1.5">
                              <span className="text-[#4E8773] font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="text-[11px] text-[#253A32]/70 space-y-1 pt-1">
                      <div>
                        <strong>{language === 'en' ? 'Terms:' : 'Điều kiện:'}</strong>{' '}
                        {language === 'en' ? deal.condition.en : deal.condition.vi}
                      </div>
                      <div className="flex items-center gap-1 text-[#4E8773]">
                        <Clock className="w-3 h-3" />
                        <span>{language === 'en' ? deal.time.en : deal.time.vi}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6F1EB]">
                    <Link
                      to={deal.ctaLink}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#C96852] hover:bg-[#285A48] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>{language === 'en' ? deal.ctaText.en : deal.ctaText.vi}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            7. SEASONAL CAMPAIGNS (ƯU ĐÃI THEO MÙA)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'seasonal') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[#E6F1EB] pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#F4C95D] font-heading block mb-1">
                  {language === 'en' ? 'SEASONAL HIGHLIGHTS' : 'KHOẢNH KHẮC THEO MÙA'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
                  {language === 'en' ? 'Seasonal Campaigns' : 'Ưu Đãi & Chiến Dịch Theo Mùa'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#253A32]/80">
                {language === 'en'
                  ? 'Memorable milestones celebrated alongside your child’s sweet growth'
                  : 'Đồng hành cùng những cột mốc lớn lên rạng rỡ của con qua từng mùa'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {seasonalCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="rounded-3xl p-6 sm:p-7 bg-white border-2 border-[#E6F1EB] hover:border-[#4E8773] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl select-none">{camp.emoji}</span>
                      <span className="px-3 py-1 rounded-full bg-[#FFF9F0] text-[#285A48] text-xs font-black border border-[#F4C95D]/40">
                        {language === 'en' ? camp.tag.en : camp.tag.vi}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#285A48] font-heading leading-tight">
                        {language === 'en' ? camp.title.en : camp.title.vi}
                      </h3>
                      <div className="mt-2 p-2.5 rounded-xl bg-[#FFF9F0] border border-[#F4C95D]/30 text-xs font-bold text-[#C96852]">
                        🎁 {language === 'en' ? camp.benefit.en : camp.benefit.vi}
                      </div>
                      <p className="text-xs text-[#253A32]/80 mt-2 leading-relaxed font-medium">
                        {language === 'en' ? camp.description.en : camp.description.vi}
                      </p>
                    </div>

                    {camp.code && (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-[#E6F1EB] border border-[#4E8773]/20">
                        <span className="text-[11px] font-bold text-[#285A48]">
                          {language === 'en' ? 'Promo Code:' : 'Mã chiến dịch:'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-black text-[#285A48]">{camp.code}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(camp.code!)}
                            className="p-1 rounded bg-white text-[#285A48] hover:bg-[#285A48] hover:text-white transition-colors cursor-pointer"
                            title="Copy code"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="text-[11px] font-semibold text-[#4E8773] flex items-center gap-1.5 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#285A48]" />
                      <span>{language === 'en' ? camp.period.en : camp.period.vi}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6F1EB]">
                    <Link
                      to={camp.ctaLink}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#285A48] hover:bg-[#4E8773] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>{language === 'en' ? camp.ctaText.en : camp.ctaText.vi}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            8. ECO CIRCULAR CAMPAIGN CARDS (CHIẾN DỊCH MẦM XANH & TUẦN HOÀN)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'eco') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[#E6F1EB] pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#4E8773] font-heading block mb-1">
                  {language === 'en' ? 'CIRCULAR & ECO QUESTS' : 'MẦM XANH TUẦN HOÀN'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#285A48] font-heading">
                  {language === 'en' ? 'Eco Campaigns & Circular Rewards' : 'Chiến Dịch Xanh & Quà Tặng Tuần Hoàn'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#253A32]/80">
                {language === 'en'
                  ? 'Join our green journey: trade in outgrown clothes and complete nature quests'
                  : 'Cùng bé hình thành thói quen xanh, trao lại đồ cũ và tích lũy phần thưởng'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ecoCampaigns.map((eco) => (
                <div
                  key={eco.id}
                  className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white to-[#E6F1EB]/30 border-2 border-[#4E8773]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="px-3.5 py-1 rounded-full bg-[#285A48] text-white text-xs font-black tracking-wider">
                        {language === 'en' ? eco.badge.en : eco.badge.vi}
                      </span>
                      <div className="p-2.5 rounded-2xl bg-white border border-[#4E8773]/20 shadow-2xs">
                        {eco.icon}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#285A48] font-heading leading-tight">
                        {language === 'en' ? eco.title.en : eco.title.vi}
                      </h3>
                      <div className="mt-2.5 p-3 rounded-2xl bg-[#FFF9F0] border border-[#F4C95D]/40 text-xs sm:text-sm font-black text-[#285A48]">
                        🌿 {language === 'en' ? eco.reward.en : eco.reward.vi}
                      </div>
                      <p className="text-xs sm:text-sm text-[#253A32]/85 mt-2.5 leading-relaxed font-medium">
                        {language === 'en' ? eco.description.en : eco.description.vi}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#E6F1EB] space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#4E8773] block">
                        {language === 'en' ? 'How to participate:' : 'Các bước tham gia:'}
                      </span>
                      <p className="text-xs text-[#253A32]/85 font-medium leading-relaxed">
                        {language === 'en' ? eco.steps.en : eco.steps.vi}
                      </p>
                    </div>

                    <div className="text-[11px] font-semibold text-[#4E8773] flex items-center gap-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5 text-[#285A48]" />
                      <span>{language === 'en' ? eco.period.en : eco.period.vi}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6F1EB]">
                    <Link
                      to={eco.ctaLink}
                      className="w-full py-3 px-5 rounded-2xl bg-[#285A48] hover:bg-[#4E8773] text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>{language === 'en' ? eco.ctaText.en : eco.ctaText.vi}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            9. TRANSPARENT CONDITIONS & USAGE GUIDE (HƯỚNG DẪN ÁP DỤNG & ĐIỀU KIỆN)
            ========================================================================= */}
        <section className="rounded-3xl bg-white p-7 sm:p-10 border-2 border-[#E6F1EB] shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#E6F1EB] pb-4">
            <div className="p-2.5 rounded-2xl bg-[#FFF9F0] text-[#285A48] border border-[#F4C95D]/30">
              <Info className="w-6 h-6 text-[#285A48]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#285A48] font-heading">
                {language === 'en' ? 'How to Apply Vouchers & Terms' : 'Hướng Dẫn Sử Dụng Mã & Quy Định Chung'}
              </h3>
              <p className="text-xs text-[#253A32]/80 mt-0.5">
                {language === 'en'
                  ? 'Simple 4-step redemption process for a hassle-free shopping experience'
                  : '4 bước áp dụng đơn giản để nhận trọn vẹn ưu đãi khi mua sắm tại Mầm Kids'}
              </p>
            </div>
          </div>

          {/* 4 Steps Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                titleVi: 'Sao chép mã',
                titleEn: 'Copy Code',
                descVi: 'Bấm nút "Sao chép" ở thẻ voucher trên trang này để lưu mã vào bộ nhớ tạm.',
                descEn: 'Click "Copy Code" on any voucher card above to copy the coupon.'
              },
              {
                step: '02',
                titleVi: 'Chọn đồ cho bé',
                titleEn: 'Pick Outfits',
                descVi: 'Lựa chọn các sản phẩm ưng ý và kiểm tra đúng size theo gợi ý Smart Size.',
                descEn: 'Pick favorite clothes and check sizes according to Smart Size.'
              },
              {
                step: '03',
                titleVi: 'Dán mã tại giỏ hàng',
                titleEn: 'Paste Code in Cart',
                descVi: 'Tại trang Giỏ hàng hoặc Thanh toán, dán mã vào ô "Mã ưu đãi" và bấm Áp dụng.',
                descEn: 'In your Cart or Checkout page, paste code into "Voucher Box" & hit Apply.'
              },
              {
                step: '04',
                titleVi: 'Nhận ưu đãi & Quà',
                titleEn: 'Enjoy Perks & Gifts',
                descVi: 'Hệ thống tự động trừ tiền và bổ sung quà tặng tương ứng vào kiện hàng.',
                descEn: 'Total price decreases instantly and complimentary gifts are attached.'
              }
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#E6F1EB] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#C96852] font-mono">BƯỚC {st.step}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4E8773]" />
                </div>
                <h4 className="text-sm font-bold text-[#285A48] font-heading">
                  {language === 'en' ? st.titleEn : st.titleVi}
                </h4>
                <p className="text-xs text-[#253A32]/75 leading-relaxed font-medium">
                  {language === 'en' ? st.descEn : st.descVi}
                </p>
              </div>
            ))}
          </div>

          {/* Transparent Notice */}
          <div className="p-4 rounded-2xl bg-[#E6F1EB]/60 border border-[#4E8773]/25 text-xs text-[#253A32]/85 space-y-1.5 font-medium">
            <span className="font-bold text-[#285A48] block">
              📌 {language === 'en' ? 'Important Notes:' : 'Lưu ý về chính sách ưu đãi:'}
            </span>
            <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] sm:text-xs">
              <li>
                {language === 'en'
                  ? 'Each order can apply 01 discount code voucher + automatically combine free shipping if qualifying.'
                  : 'Mỗi đơn hàng được áp dụng 01 mã voucher giảm giá + tự động kết hợp miễn phí vận chuyển nếu đạt giá trị tối thiểu.'}
              </li>
              <li>
                {language === 'en'
                  ? 'Mầm Points can be redeemed concurrently with regular promotions without restrictions.'
                  : 'Điểm Mầm tích lũy có thể quy đổi đồng thời cùng các chương trình khuyến mãi khác mà không bị giới hạn.'}
              </li>
              <li>
                {language === 'en'
                  ? 'Free 15-day doorstep exchange still fully applies to discounted and promotional items.'
                  : 'Chính sách đổi size miễn phí tận nhà 15 ngày vẫn áp dụng trọn vẹn cho các sản phẩm trong chương trình khuyến mãi.'}
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            10. FOOTER CALLOUT: HỖ TRỢ & HỎI ĐÁP
            ========================================================================= */}
        <section className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-[#E6F1EB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F1EB] text-[#285A48] flex items-center justify-center shrink-0 text-xl shadow-2xs">
              💬
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#285A48] font-heading">
                {language === 'en'
                  ? 'Have questions about voucher application or gift redemption?'
                  : 'Ba mẹ có thắc mắc về cách áp dụng voucher hoặc nhận quà?'}
              </h4>
              <p className="text-xs text-[#253A32]/75 mt-0.5">
                {language === 'en'
                  ? 'Our friendly team is always here to guide you: Hotline 1900 6868 (8:00 – 21:00).'
                  : 'Đội ngũ Mầm Kids luôn sẵn lòng hỗ trợ tận tâm: Hotline 1900 6868 (8:00 – 21:00 hằng ngày).'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/cau-hoi-thuong-gap"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FFF9F0] hover:bg-[#E6F1EB] text-[#285A48] font-bold text-xs text-center border border-[#E6F1EB] transition-colors"
            >
              {language === 'en' ? 'FAQ' : 'Câu hỏi thường gặp'}
            </Link>
            <Link
              to="/lien-he"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#285A48] hover:bg-[#4E8773] text-white font-bold text-xs text-center transition-colors shadow-2xs"
            >
              {language === 'en' ? 'Contact Support' : 'Liên hệ hỗ trợ'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
