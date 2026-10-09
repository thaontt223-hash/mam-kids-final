export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'ao' | 'quan' | 'vay' | 'bo-do' | 'ao-khoac' | 'the-thao' | 'phu-kien';
  categoryName: string;
  gender: 'be-trai' | 'be-gai' | 'unisex';
  genderName: string;
  collectionId?: string;
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  material: string;
  description: string;
  highlights: string[];
  stockStatus: 'con-hang' | 'sap-het' | 'dat-truoc';
  rating: number;
  reviewsCount: number;
  images: string[];
  isPersonalizable?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isSet?: boolean;
  isGreenProduct?: boolean;
  ecoStoryId?: string;
  ecoStorySnippet?: string;
  ecoStoryTitle?: string;
  greenMaterialDescription?: string;
  setItems?: string[];
  pairedProductIds?: string[];
  fabricDetail?: string;
  stylingTip?: string;
}

export interface EcoStoryChapter {
  chapterNumber: number;
  title: string;
  content: string;
  moral: string;
  icon?: string;
}

export interface EcoStory {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  readTime: string;
  targetAge: string;
  summary: string;
  coverImage: string;
  chapters: EcoStoryChapter[];
  challenge: {
    title: string;
    action: string;
    rewardDescription: string;
    pointsReward: number;
    badgeName: string;
  };
  sustainabilityMessage: string;
  materialHighlight: string;
}

export interface OutfitSet {
  id: string;
  name: string;
  gender: 'be-trai' | 'be-gai' | 'unisex';
  genderName: string;
  subtitle: string;
  description: string;
  image: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    category: string;
  }[];
  originalPrice: number;
  comboPrice: number;
  saving: number;
  badge: string;
}

export interface PersonalizationConfig {
  childName: string;
  message?: string;
  icon: 'heart' | 'star' | 'cloud' | 'rainbow' | 'none';
  position: 'chest' | 'back';
}

export interface CartItem {
  id: string; // unique item id including variant
  product: Product;
  selectedSize: string;
  selectedColor: {
    name: string;
    hex: string;
  };
  quantity: number;
  personalization?: PersonalizationConfig;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  district?: string;
  notes?: string;
  paymentMethod: 'cod' | 'bank_transfer' | 'e_wallet';
}

export interface Order {
  orderId: string;
  createdAt: string;
  userId?: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  status: 'cho-xac-nhan' | 'dang-chuan-bi' | 'dang-giao' | 'da-giao';
  hasFreeTote: boolean;
  pointsEarned?: number;
  pointsUsed?: number;
  voucherCode?: string;
}

export interface SizeRecommendation {
  size: string;
  ageText: string;
  heightRange: string;
  weightRange: string;
  notes: string;
}

export interface BabyInfo {
  id: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  gender: 'be-trai' | 'be-gai' | 'khac';
  height?: number; // cm
  weight?: number; // kg
  preferredSize: string; // e.g. "100 (3-4T)"
  note?: string;
}

export interface MemberVoucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'shipping';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  isUsed: boolean;
  usedAt?: string;
  badge?: string;
}

export interface MamPointsHistory {
  id: string;
  date: string;
  type: 'earn' | 'redeem' | 'bonus';
  points: number;
  description: string;
  orderId?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  membershipTier: 'Mầm Non' | 'Mầm Xanh' | 'Mầm Yêu Thương';
  mamPoints: number;
  totalSpent: number;
  joinedDate: string;
  defaultAddress?: string;
  defaultCity?: string;
  defaultDistrict?: string;
  babies: BabyInfo[];
  vouchers: MemberVoucher[];
  pointsHistory: MamPointsHistory[];
}

