import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, PersonalizationConfig, Order, CustomerInfo, OutfitSet } from '../types';
import { PRODUCTS, SUMMER_COMBO } from '../data/products';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  toast: ToastMessage | null;
  addToCart: (
    product: Product,
    selectedSize: string,
    selectedColor: { name: string; hex: string },
    quantity?: number,
    personalization?: PersonalizationConfig
  ) => void;
  addComboToCart: () => void;
  addOutfitSetToCart: (outfit: OutfitSet) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string) => void;
  createOrder: (
    customerInfo: CustomerInfo,
    extra?: {
      userId?: string;
      discount?: number;
      pointsUsed?: number;
      pointsEarned?: number;
      voucherCode?: string;
    }
  ) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  dismissToast: () => void;
  showToast: (title: string, description?: string) => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'mam_kids_cart_v1';
const WISHLIST_STORAGE_KEY = 'mam_kids_wishlist_v1';
const ORDERS_STORAGE_KEY = 'mam_kids_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['ao-thun-cotton-gau-nho', 'vay-hoa-mua-he'];
    } catch {
      return ['ao-thun-cotton-gau-nho', 'vay-hoa-mua-he'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (title: string, description?: string) => {
    const id = Date.now().toString();
    setToast({ id, title, description, type: 'success' });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3500);
  };

  const dismissToast = () => {
    setToast(null);
  };

  const addToCart = (
    product: Product,
    selectedSize: string,
    selectedColor: { name: string; hex: string },
    quantity: number = 1,
    personalization?: PersonalizationConfig
  ) => {
    // Generate unique ID based on product, size, color and personalization
    const persKey = personalization ? `${personalization.childName}-${personalization.icon}-${personalization.position}` : 'std';
    const itemId = `${product.id}_${selectedSize}_${selectedColor.name}_${persKey}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize,
          selectedColor,
          quantity,
          personalization
        }
      ];
    });

    showToast('Đã thêm vào giỏ hàng!', `${product.name} · ${selectedSize}`);
  };

  const addComboToCart = () => {
    const item1 = PRODUCTS.find((p) => p.id === SUMMER_COMBO.item1Id);
    const item2 = PRODUCTS.find((p) => p.id === SUMMER_COMBO.item2Id);

    if (item1 && item2) {
      addToCart(item1, item1.sizes[1] || item1.sizes[0], item1.colors[0], 1);
      addToCart(item2, item2.sizes[1] || item2.sizes[0], item2.colors[0], 1);
      showToast('Đã thêm trọn bộ COMBO MÙA HÈ vào giỏ!', 'Tiết kiệm ngay 19.000 VND');
    }
  };

  const addOutfitSetToCart = (outfit: OutfitSet) => {
    let addedCount = 0;
    outfit.items.forEach((item) => {
      const prod = PRODUCTS.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod, prod.sizes[1] || prod.sizes[0], prod.colors[0], 1);
        addedCount++;
      }
    });
    if (addedCount > 0) {
      showToast(`Đã thêm trọn bộ ${outfit.name} vào giỏ!`, `Tiết kiệm ngay ${outfit.saving.toLocaleString('vi-VN')} VND`);
    }
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Đã bỏ sản phẩm khỏi giỏ hàng');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const targetProd = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        showToast('Đã xóa khỏi danh sách yêu thích');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Đã lưu vào danh sách yêu thích', targetProd?.name);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const moveToCartFromWishlist = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (!prod) return;
    addToCart(prod, prod.sizes[0], prod.colors[0], 1);
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Financial calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 300000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25000;
  const discount = 0; // standard calculation or voucher
  const total = subtotal - discount + shippingFee;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const createOrder = (
    customerInfo: CustomerInfo,
    extra?: {
      userId?: string;
      discount?: number;
      pointsUsed?: number;
      pointsEarned?: number;
      voucherCode?: string;
    }
  ): Order => {
    const dateStr = new Date().toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MK-${new Date().getFullYear().toString().slice(-2)}${randomSuffix}`;

    const appliedDiscount = extra?.discount !== undefined ? extra.discount : discount;
    const finalTotal = Math.max(0, subtotal - appliedDiscount + shippingFee);

    const newOrder: Order = {
      orderId,
      createdAt: dateStr,
      userId: extra?.userId,
      customerInfo,
      items: [...cart],
      subtotal,
      discount: appliedDiscount,
      shippingFee,
      totalAmount: finalTotal,
      status: 'cho-xac-nhan',
      hasFreeTote: true,
      pointsEarned: extra?.pointsEarned,
      pointsUsed: extra?.pointsUsed,
      voucherCode: extra?.voucherCode
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((o) => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        toast,
        addToCart,
        addComboToCart,
        addOutfitSetToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        createOrder,
        getOrderById,
        dismissToast,
        showToast,
        cartCount,
        subtotal,
        discount,
        shippingFee,
        total,
        freeShippingThreshold,
        amountNeededForFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
