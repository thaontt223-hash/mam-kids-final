import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, BabyInfo, MemberVoucher, MamPointsHistory } from '../types';

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  babyName?: string;
  babyBirthDate?: string;
  babyGender?: 'be-trai' | 'be-gai' | 'khac';
  babyHeight?: number;
  babyWeight?: number;
  babyPreferredSize?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  register: (data: RegisterFormData) => Promise<{ success: boolean; message?: string }>;
  login: (emailOrPhone: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  loginDemo: () => void;
  updateProfile: (data: Partial<User>) => void;
  addBaby: (baby: Omit<BabyInfo, 'id'>) => void;
  updateBaby: (babyId: string, baby: Partial<BabyInfo>) => void;
  deleteBaby: (babyId: string) => void;
  addPoints: (points: number, description: string, orderId?: string) => void;
  redeemPoints: (points: number, description: string) => boolean;
  exchangePointsForVoucher: () => { success: boolean; message?: string };
  useVoucher: (code: string) => boolean;
  getBabyRecommendedSize: (height?: number, weight?: number) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'mam_kids_current_user_v3';
const USERS_STORAGE_KEY = 'mam_kids_registered_users_v3';

const createDefaultVouchers = (): MemberVoucher[] => {
  const now = new Date();
  const plusDays = (d: number) => {
    const target = new Date(now.getTime() + d * 24 * 60 * 60 * 1000);
    return target.toLocaleDateString('vi-VN');
  };

  return [
    {
      id: 'vouch-1',
      code: 'MAMKIDS10',
      title: 'Chào mừng Mầm Kids',
      description: 'Giảm 10% cho đơn hàng đầu tiên của thành viên mới Mầm Kids',
      discountType: 'percentage',
      discountValue: 10,
      minOrderValue: 0,
      maxDiscount: 60000,
      expiryDate: plusDays(45),
      isUsed: false,
      badge: 'Chào mừng'
    },
    {
      id: 'vouch-2',
      code: 'SINHNHAT15',
      title: 'Sinh nhật của bé',
      description: 'Giảm 15% trong tháng sinh nhật bé yêu cho toàn bộ sản phẩm',
      discountType: 'percentage',
      discountValue: 15,
      minOrderValue: 200000,
      maxDiscount: 100000,
      expiryDate: plusDays(60),
      isUsed: false,
      badge: 'Sinh nhật'
    },
    {
      id: 'vouch-3',
      code: 'MAMPOINT10K',
      title: 'Đổi 100 Điểm Mầm',
      description: 'Giảm 10.000 VND quy đổi từ 100 Điểm Mầm tích lũy',
      discountType: 'fixed',
      discountValue: 10000,
      minOrderValue: 0,
      expiryDate: plusDays(90),
      isUsed: false,
      badge: 'Đổi 100 Điểm'
    },
    {
      id: 'vouch-4',
      code: 'FREESHIPMAM',
      title: 'Freeship Thành viên',
      description: 'Miễn phí vận chuyển toàn quốc cho đơn hàng từ 150.000 VND',
      discountType: 'shipping',
      discountValue: 25000,
      minOrderValue: 150000,
      expiryDate: plusDays(30),
      isUsed: false,
      badge: 'Freeship'
    }
  ];
};

const DEMO_USER: User = {
  id: 'usr-demo-01',
  fullName: 'Nguyễn Hoàng Yến',
  email: 'mevabe@mamkids.vn',
  phone: '0987654321',
  password: 'password123',
  membershipTier: 'Mầm Non',
  mamPoints: 320,
  totalSpent: 980000,
  joinedDate: '15/01/2026',
  defaultAddress: 'Số 45 ngõ 12 Đặng Thai Mai, P. Quảng An',
  defaultCity: 'Hà Nội',
  defaultDistrict: 'Quận Tây Hồ',
  babies: [
    {
      id: 'baby-1',
      name: 'Bé Bơ (Hà Linh)',
      birthDate: '2021-06-18',
      gender: 'be-gai',
      height: 106,
      weight: 16.5,
      preferredSize: '110 (4-5T)',
      note: 'Thích mặc váy mềm, màu pastel hồng và kem'
    },
    {
      id: 'baby-2',
      name: 'Bé Đậu (Minh Khang)',
      birthDate: '2023-09-22',
      gender: 'be-trai',
      height: 88,
      weight: 12.2,
      preferredSize: '90 (2-3T)',
      note: 'Ưa thích áo thun cotton cộc tay thoáng khí'
    }
  ],
  vouchers: createDefaultVouchers(),
  pointsHistory: [
    {
      id: 'pt-1',
      date: '15/01/2026',
      type: 'bonus',
      points: 100,
      description: 'Quà tặng chào mừng đăng ký thành viên mới Mầm Kids'
    },
    {
      id: 'pt-2',
      date: '15/01/2026',
      type: 'bonus',
      points: 50,
      description: 'Thưởng cập nhật hồ sơ bé yêu (Bé Bơ)'
    },
    {
      id: 'pt-3',
      date: '20/02/2026',
      type: 'earn',
      points: 170,
      description: 'Tích điểm đơn hàng MK-268924 (Trị giá 170.000đ)',
      orderId: 'MK-268924'
    }
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // List of all registered users
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [DEMO_USER];
  });

  // Current logged in user
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  // Sync current user to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        // Also update in users array
        setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Size recommendation algorithm based on height and weight
  const getBabyRecommendedSize = (height?: number, weight?: number): string => {
    if (!height && !weight) return '100 (3-4T)';
    const h = height || 100;
    const w = weight || 15;

    if (h < 85 || w < 11) return '80 (1-2T)';
    if (h < 95 || w < 13.5) return '90 (2-3T)';
    if (h < 105 || w < 16) return '100 (3-4T)';
    if (h < 115 || w < 19) return '110 (4-5T)';
    if (h < 125 || w < 23) return '120 (6-7T)';
    if (h < 135 || w < 28) return '130 (8-9T)';
    return '140 (10-12T)';
  };

  const calculateMembershipTier = (points: number): 'Mầm Non' | 'Mầm Xanh' | 'Mầm Yêu Thương' => {
    if (points >= 3000) return 'Mầm Yêu Thương';
    if (points >= 1000) return 'Mầm Xanh';
    return 'Mầm Non';
  };

  // Register
  const register = async (data: RegisterFormData): Promise<{ success: boolean; message?: string }> => {
    // Validation
    if (!data.fullName.trim()) return { success: false, message: 'Vui lòng nhập Họ và tên' };
    if (!data.email.trim()) return { success: false, message: 'Vui lòng nhập Email' };
    if (!data.phone.trim()) return { success: false, message: 'Vui lòng nhập Số điện thoại' };
    if (!data.password || data.password.length < 6) {
      return { success: false, message: 'Mật khẩu phải chứa ít nhất 6 ký tự' };
    }
    if (data.password !== data.confirmPassword) {
      return { success: false, message: 'Mật khẩu xác nhận không khớp' };
    }

    const emailTrimmed = data.email.trim().toLowerCase();
    const phoneTrimmed = data.phone.trim();

    const existingUser = users.find(
      (u) => u.email.toLowerCase() === emailTrimmed || u.phone === phoneTrimmed
    );
    if (existingUser) {
      return { success: false, message: 'Email hoặc số điện thoại đã được đăng ký trước đó' };
    }

    const todayStr = new Date().toLocaleDateString('vi-VN');
    const initialPoints = 100; // Gift 100 points upon signup

    const babies: BabyInfo[] = [];
    if (data.babyName?.trim()) {
      babies.push({
        id: `baby-${Date.now()}`,
        name: data.babyName.trim(),
        birthDate: data.babyBirthDate || '2022-01-01',
        gender: data.babyGender || 'khac',
        height: data.babyHeight || undefined,
        weight: data.babyWeight || undefined,
        preferredSize:
          data.babyPreferredSize || getBabyRecommendedSize(data.babyHeight, data.babyWeight)
      });
    }

    const pointsHistory: MamPointsHistory[] = [
      {
        id: `pt-${Date.now()}`,
        date: todayStr,
        type: 'bonus',
        points: 100,
        description: 'Quà tặng chào mừng đăng ký tài khoản thành viên Mầm Kids'
      }
    ];

    if (babies.length > 0) {
      pointsHistory.push({
        id: `pt-${Date.now() + 1}`,
        date: todayStr,
        type: 'bonus',
        points: 50,
        description: 'Tặng điểm cập nhật thông tin bé yêu ngay khi đăng ký'
      });
    }

    const totalInitPoints = babies.length > 0 ? initialPoints + 50 : initialPoints;
    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName: data.fullName.trim(),
      email: emailTrimmed,
      phone: phoneTrimmed,
      password: data.password,
      membershipTier: calculateMembershipTier(totalInitPoints),
      mamPoints: totalInitPoints,
      totalSpent: 0,
      joinedDate: todayStr,
      babies,
      vouchers: createDefaultVouchers(),
      pointsHistory
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);

    return { success: true };
  };

  // Login
  const login = async (
    emailOrPhone: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    const term = emailOrPhone.trim().toLowerCase();
    const found = users.find(
      (u) =>
        (u.email.toLowerCase() === term || u.phone === term) &&
        (u.password === password || password === '123456') // allow easy test password
    );

    if (!found) {
      return {
        success: false,
        message: 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.'
      };
    }

    setUser(found);
    return { success: true };
  };

  // Quick Demo Login
  const loginDemo = () => {
    setUser(DEMO_USER);
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  // Update Profile
  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    setUser({
      ...user,
      ...data
    });
  };

  // Add Baby
  const addBaby = (babyData: Omit<BabyInfo, 'id'>) => {
    if (!user) return;
    const newBaby: BabyInfo = {
      ...babyData,
      id: `baby-${Date.now()}`
    };

    // Bonus 50 points for adding a baby if not rewarded yet
    const bonusPoints = 50;
    const updatedPoints = user.mamPoints + bonusPoints;
    const newPointsHistory: MamPointsHistory = {
      id: `pt-${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN'),
      type: 'bonus',
      points: bonusPoints,
      description: `Thưởng thêm thông tin bé yêu (${newBaby.name})`
    };

    setUser({
      ...user,
      mamPoints: updatedPoints,
      membershipTier: calculateMembershipTier(updatedPoints),
      babies: [...user.babies, newBaby],
      pointsHistory: [newPointsHistory, ...user.pointsHistory]
    });
  };

  // Update Baby
  const updateBaby = (babyId: string, updatedFields: Partial<BabyInfo>) => {
    if (!user) return;
    setUser({
      ...user,
      babies: user.babies.map((b) => (b.id === babyId ? { ...b, ...updatedFields } : b))
    });
  };

  // Delete Baby
  const deleteBaby = (babyId: string) => {
    if (!user) return;
    setUser({
      ...user,
      babies: user.babies.filter((b) => b.id !== babyId)
    });
  };

  // Add Points (e.g. After placing an order)
  const addPoints = (points: number, description: string, orderId?: string) => {
    if (!user || points <= 0) return;
    const updatedPoints = user.mamPoints + points;
    const newEntry: MamPointsHistory = {
      id: `pt-${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN'),
      type: 'earn',
      points,
      description,
      orderId
    };

    setUser({
      ...user,
      mamPoints: updatedPoints,
      totalSpent: user.totalSpent + (orderId ? points * 1000 : 0),
      membershipTier: calculateMembershipTier(updatedPoints),
      pointsHistory: [newEntry, ...user.pointsHistory]
    });
  };

  // Redeem Points
  const redeemPoints = (points: number, description: string): boolean => {
    if (!user || user.mamPoints < points) return false;
    const updatedPoints = user.mamPoints - points;
    const newEntry: MamPointsHistory = {
      id: `pt-${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN'),
      type: 'redeem',
      points: -points,
      description
    };

    setUser({
      ...user,
      mamPoints: updatedPoints,
      membershipTier: calculateMembershipTier(updatedPoints),
      pointsHistory: [newEntry, ...user.pointsHistory]
    });
    return true;
  };

  // Use Voucher
  const useVoucher = (code: string): boolean => {
    if (!user) return false;
    const target = user.vouchers.find(
      (v) => v.code.toUpperCase() === code.toUpperCase() && !v.isUsed
    );
    if (!target) return false;

    setUser({
      ...user,
      vouchers: user.vouchers.map((v) =>
        v.id === target.id
          ? { ...v, isUsed: true, usedAt: new Date().toLocaleDateString('vi-VN') }
          : v
      )
    });
    return true;
  };

  // Exchange 100 Mam points for a 10.000 VND voucher
  const exchangePointsForVoucher = (): { success: boolean; message?: string } => {
    if (!user || user.mamPoints < 100) {
      return {
        success: false,
        message: 'Bạn cần tối thiểu 100 Điểm Mầm để đổi voucher 10.000 VND.'
      };
    }

    const updatedPoints = user.mamPoints - 100;
    const now = new Date();
    const expiry = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
    const voucherCode = `MAM${Math.floor(1000 + Math.random() * 9000)}`;

    const newVoucher: MemberVoucher = {
      id: `vouch-${Date.now()}`,
      code: voucherCode,
      title: 'Đổi 100 Điểm Mầm',
      description: 'Giảm 10.000 VND quy đổi từ 100 Điểm Mầm tích lũy',
      discountType: 'fixed',
      discountValue: 10000,
      minOrderValue: 0,
      expiryDate: expiry,
      isUsed: false,
      badge: 'Đổi 100 Điểm'
    };

    const newEntry: MamPointsHistory = {
      id: `pt-${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN'),
      type: 'redeem',
      points: -100,
      description: `Đổi 100 Điểm Mầm lấy Voucher ${voucherCode} (-10.000đ)`
    };

    setUser({
      ...user,
      mamPoints: updatedPoints,
      membershipTier: calculateMembershipTier(updatedPoints),
      vouchers: [newVoucher, ...user.vouchers],
      pointsHistory: [newEntry, ...user.pointsHistory]
    });

    return {
      success: true,
      message: `Đổi thành công voucher ${voucherCode} giảm 10.000 VND!`
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        register,
        login,
        logout,
        loginDemo,
        updateProfile,
        addBaby,
        updateBaby,
        deleteBaby,
        addPoints,
        redeemPoints,
        exchangePointsForVoucher,
        useVoucher,
        getBabyRecommendedSize
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
