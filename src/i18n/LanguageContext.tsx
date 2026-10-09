import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  Translations,
  translations,
  PRODUCT_NAME_TRANSLATIONS,
  OUTFIT_NAME_TRANSLATIONS,
  CATEGORY_NAME_TRANSLATIONS,
  COLOR_NAME_TRANSLATIONS
} from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string) => string;
  trans: Translations;
  getProductName: (product: { id: string; name?: string | { vi: string; en: string }; nameEn?: string }) => string;
  getOutfitName: (outfit: { id: string; name?: string }) => string;
  getCategoryName: (categoryId: string) => string;
  getColorName: (colorName: string) => string;
  formatPrice: (amount: number) => string;
}

const LANGUAGE_STORAGE_KEY = 'mamkids-language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'vi') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  // Sync <html lang="vi|en"> and document title
  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'en') {
      document.title = 'Mầm Kids – More Than Style, Growing Green Habits Together | Kids Fashion 3–12';
    } else {
      document.title = 'MẦM KIDS – Không chỉ mặc đẹp, cùng bé gieo thói quen xanh | Thời Trang Trẻ Em 3–12 Tuổi';
    }
  }, [language]);

  const trans = translations[language];

  // Helper function to resolve dot-notation keys like "nav.home" or "hero.slogan"
  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = trans;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }
    return typeof current === 'string' ? current : fallback || path;
  };

  // Helper to translate product name
  const getProductName = (product: {
    id: string;
    name?: string | { vi: string; en: string };
    nameEn?: string;
  }): string => {
    if (!product) return '';

    // Check mapped dictionary by ID
    const mapped = PRODUCT_NAME_TRANSLATIONS[product.id];
    if (mapped) {
      return language === 'en' ? mapped.en : mapped.vi;
    }

    // Check if name is object { vi, en }
    if (typeof product.name === 'object' && product.name !== null) {
      return language === 'en' ? product.name.en || product.name.vi : product.name.vi;
    }

    // Check nameEn prop
    if (language === 'en' && product.nameEn) {
      return product.nameEn;
    }

    return typeof product.name === 'string' ? product.name : '';
  };

  // Helper to translate outfit name
  const getOutfitName = (outfit: { id: string; name?: string }): string => {
    if (!outfit) return '';
    const mapped = OUTFIT_NAME_TRANSLATIONS[outfit.id];
    if (mapped) {
      return language === 'en' ? mapped.en : mapped.vi;
    }
    return outfit.name || '';
  };

  // Helper to translate category name
  const getCategoryName = (categoryId: string): string => {
    const mapped = CATEGORY_NAME_TRANSLATIONS[categoryId];
    if (mapped) {
      return language === 'en' ? mapped.en : mapped.vi;
    }
    return categoryId;
  };

  // Helper to translate color name
  const getColorName = (colorName: string): string => {
    const mapped = COLOR_NAME_TRANSLATIONS[colorName];
    if (mapped) {
      return language === 'en' ? mapped.en : mapped.vi;
    }
    return colorName;
  };

  // Helper to format currency
  const formatPrice = (amount: number): string => {
    if (language === 'en') {
      return `${amount.toLocaleString('en-US')} VND`;
    }
    return `${amount.toLocaleString('vi-VN')}đ`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        trans,
        getProductName,
        getOutfitName,
        getCategoryName,
        getColorName,
        formatPrice
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
