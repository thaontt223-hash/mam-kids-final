import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, formatVND } from '../data/products';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, moveToCartFromWishlist } = useCart();

  const favoriteProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-[#EFE8D8] flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#4E8773] block mb-1 font-heading">
            Bộ sưu tập lưu giữ
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3E5149] font-heading">
            Sản phẩm yêu thích của bé ({favoriteProducts.length})
          </h1>
        </div>

        <Link
          to="/san-pham"
          className="text-xs font-bold text-[#4E8773] hover:text-[#355E50] flex items-center gap-1"
        >
          <span>Khám phá thêm</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[22px] overflow-hidden border border-[#EFE8D8] shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between group"
            >
              <div className="relative aspect-4/5 w-full bg-[#FAF6EE] overflow-hidden">
                <Link to={`/san-pham/${product.id}`} className="block w-full h-full">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                  />
                </Link>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#F4B99B] hover:bg-white shadow-xs z-10 cursor-pointer"
                  title="Xóa khỏi yêu thích"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-[#647B72] mb-1">
                    {product.genderName} · {product.categoryName}
                  </div>
                  <Link
                    to={`/san-pham/${product.id}`}
                    className="font-bold text-[#3E5149] text-sm hover:text-[#4E8773] transition-colors line-clamp-1 font-heading"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-2 text-base font-bold text-[#4E8773] tabular-nums font-heading">
                    {formatVND(product.price)}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#FAF6EC] flex gap-2">
                  <button
                    onClick={() => moveToCartFromWishlist(product.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#4E8773] hover:bg-[#417361] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Chuyển vào giỏ hàng</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#EFE8D8] space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF3EF] flex items-center justify-center text-[#4E8773] shadow-xs">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#3E5149] font-heading">
            Chưa có sản phẩm nào trong danh sách yêu thích
          </h3>
          <p className="text-xs sm:text-sm text-[#647B72] max-w-sm mx-auto">
            Khi duyệt xem các mẫu áo thun, váy, quần short... bạn hãy bấm vào biểu tượng trái tim để lưu lại xem sau nhé!
          </p>
          <div className="pt-2">
            <Link
              to="/san-pham"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#4E8773] hover:bg-[#417361] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>Xem danh mục sản phẩm</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
