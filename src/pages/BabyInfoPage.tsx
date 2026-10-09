import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { BabyInfo } from '../types';
import {
  Baby,
  PlusCircle,
  Edit2,
  Trash2,
  Sparkles,
  Calendar,
  Ruler,
  Weight,
  Heart,
  Gift,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const BabyInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, addBaby, updateBaby, deleteBaby, getBabyRecommendedSize } = useAuth();
  const { showToast } = useCart();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBabyId, setEditingBabyId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'be-trai' | 'be-gai' | 'khac'>('be-gai');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [preferredSize, setPreferredSize] = useState('');
  const [note, setNote] = useState('');

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/dang-nhap');
    }
  }, [isLoggedIn, navigate]);

  // Auto calculate recommended size when height or weight inputs change
  React.useEffect(() => {
    const h = height ? parseFloat(height) : undefined;
    const w = weight ? parseFloat(weight) : undefined;
    if (h || w) {
      setPreferredSize(getBabyRecommendedSize(h, w));
    }
  }, [height, weight, getBabyRecommendedSize]);

  if (!user) return null;

  const handleOpenAdd = () => {
    setEditingBabyId(null);
    setName('');
    setBirthDate('');
    setGender('be-gai');
    setHeight('');
    setWeight('');
    setPreferredSize('100 (3-4T)');
    setNote('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (baby: BabyInfo) => {
    setEditingBabyId(baby.id);
    setName(baby.name);
    setBirthDate(baby.birthDate);
    setGender(baby.gender);
    setHeight(baby.height ? baby.height.toString() : '');
    setWeight(baby.weight ? baby.weight.toString() : '');
    setPreferredSize(baby.preferredSize);
    setNote(baby.note || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Vui lòng nhập tên bé');
      return;
    }

    const hNum = height ? parseFloat(height) : undefined;
    const wNum = weight ? parseFloat(weight) : undefined;
    const finalSize = preferredSize || getBabyRecommendedSize(hNum, wNum);

    if (editingBabyId) {
      updateBaby(editingBabyId, {
        name: name.trim(),
        birthDate,
        gender,
        height: hNum,
        weight: wNum,
        preferredSize: finalSize,
        note: note.trim() || undefined
      });
      showToast(`Đã cập nhật thông tin bé ${name.trim()}!`);
    } else {
      addBaby({
        name: name.trim(),
        birthDate: birthDate || '2022-01-01',
        gender,
        height: hNum,
        weight: wNum,
        preferredSize: finalSize,
        note: note.trim() || undefined
      });
      showToast(`Đã thêm bé ${name.trim()} thành công!`, 'Bạn nhận được +50 Điểm Mầm thưởng');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (baby: BabyInfo) => {
    if (window.confirm(`Bạn có chắc muốn xóa hồ sơ của bé ${baby.name}?`)) {
      deleteBaby(baby.id);
      showToast(`Đã xóa hồ sơ bé ${baby.name}`);
    }
  };

  const calculateAge = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const birth = new Date(dateStr);
      const now = new Date();
      const diffMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
      if (diffMonths < 12) {
        return `${Math.max(1, diffMonths)} tháng tuổi`;
      }
      const years = Math.floor(diffMonths / 12);
      const remainingMonths = diffMonths % 12;
      return remainingMonths > 0 ? `${years} tuổi ${remainingMonths} tháng` : `${years} tuổi`;
    } catch {
      return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6A7F77] mb-6">
        <Link to="/" className="hover:text-[#4E8773] transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <Link to="/tai-khoan" className="hover:text-[#4E8773] transition-colors">
          Tài khoản
        </Link>
        <span>/</span>
        <span className="text-[#355F52] font-semibold">Thông tin của bé</span>
      </nav>

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FAF6EC] to-[#FDF9F1] border border-[#F5DFA0] p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF3EF] text-[#355F52] mb-3">
            <Baby className="w-3.5 h-3.5" />
            Trợ lý chọn size thông minh Mầm Kids
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2F403A] font-heading tracking-tight">
            Hồ sơ bé yêu ({user.babies.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6A7F77] mt-1 max-w-xl">
            Lưu thông tin chiều cao, cân nặng và ngày sinh để Mầm Kids tự động gợi ý kích cỡ vừa vặn nhất và gửi quà sinh nhật cho bé mỗi năm.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl bg-[#4E8773] hover:bg-[#355F52] text-white font-bold text-xs tracking-wide transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>THÊM HỒ SƠ BÉ MỚI (+50 điểm)</span>
        </button>
      </div>

      {/* Baby Profiles Grid */}
      {user.babies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.babies.map((baby) => {
            const ageText = calculateAge(baby.birthDate);
            return (
              <div
                key={baby.id}
                className="bg-white rounded-3xl border border-[#EFE8D8] p-6 shadow-xs hover:border-[#4E8773] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#FAF6EC]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-[#FAF6EC] border border-[#F5DFA0] flex items-center justify-center text-2xl shadow-inner">
                        {baby.gender === 'be-gai' ? '👧' : baby.gender === 'be-trai' ? '👦' : '👶'}
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-[#2F403A] font-heading">
                          {baby.name}
                        </h3>
                        <p className="text-xs text-[#6A7F77]">
                          {baby.gender === 'be-gai' ? 'Bé gái' : 'Bé trai'}
                          {ageText && ` · ${ageText}`}
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EAF3EF] text-[#355F52] border border-[#D2E3DC]">
                      Size {baby.preferredSize}
                    </span>
                  </div>

                  {/* Body metrics cards */}
                  <div className="grid grid-cols-2 gap-3 my-4">
                    <div className="p-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] flex items-center gap-2.5">
                      <Ruler className="w-4 h-4 text-[#4E8773]" />
                      <div>
                        <span className="text-[10px] text-[#6A7F77] block">Chiều cao:</span>
                        <span className="text-sm font-bold text-[#2F403A] font-heading">
                          {baby.height ? `${baby.height} cm` : 'Chưa cập nhật'}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FDF9F1] border border-[#EFE8D8] flex items-center gap-2.5">
                      <Weight className="w-4 h-4 text-[#4E8773]" />
                      <div>
                        <span className="text-[10px] text-[#6A7F77] block">Cân nặng:</span>
                        <span className="text-sm font-bold text-[#2F403A] font-heading">
                          {baby.weight ? `${baby.weight} kg` : 'Chưa cập nhật'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#6A7F77]">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#8B9D95]" />
                      <span>Ngày sinh: <strong className="text-[#2F403A]">{baby.birthDate}</strong></span>
                    </p>
                    {baby.note && (
                      <p className="italic text-[11px] text-[#8B9D95] bg-[#FAF6EC] p-2.5 rounded-xl border border-[#F5DFA0]">
                        &quot;{baby.note}&quot;
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#FAF6EC] flex items-center justify-between">
                  <Link
                    to="/san-pham"
                    className="text-xs font-bold text-[#4E8773] hover:text-[#355F52] hover:underline flex items-center gap-1"
                  >
                    <span>Xem đồ vừa size {baby.preferredSize} →</span>
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(baby)}
                      className="p-2 rounded-xl text-[#355F52] hover:bg-[#EAF3EF] transition-colors"
                      title="Chỉnh sửa thông tin"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(baby)}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                      title="Xóa hồ sơ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE8D8] shadow-xs">
          <Baby className="w-14 h-14 text-[#C1D2CB] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#2F403A] font-heading">
            Chưa có thông tin bé yêu nào
          </h3>
          <p className="text-xs text-[#6A7F77] mt-1 max-w-sm mx-auto">
            Thêm thông tin bé ngay hôm nay để nhận voucher sinh nhật 50.000đ và nhận thêm +50 Điểm Mầm tích lũy.
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Thêm hồ sơ bé ngay (+50 điểm)</span>
          </button>
        </div>
      )}

      {/* Modal Add / Edit Baby */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#2F403A]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EFE8D8] p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF6EC] mb-5">
              <div>
                <h3 className="text-lg font-bold text-[#2F403A] font-heading">
                  {editingBabyId ? 'Chỉnh sửa hồ sơ bé' : 'Thêm hồ sơ bé yêu'}
                </h3>
                <p className="text-xs text-[#6A7F77]">
                  {editingBabyId ? 'Cập nhật lại số đo để gợi ý size chính xác' : 'Nhận ngay +50 Điểm Mầm khi lưu thông tin bé'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-bold text-[#8B9D95] hover:text-[#2F403A]"
              >
                Đóng
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-1.5">
                  Tên gọi ở nhà hoặc Họ tên của bé <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Bé Bơ, Bé Sóc, Gia Hưng..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-1.5">
                    Ngày sinh của bé
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-1.5">
                    Giới tính của bé
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                  >
                    <option value="be-gai">Bé gái</option>
                    <option value="be-trai">Bé trai</option>
                    <option value="khac">Khác / Chưa rõ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-1.5">
                    Chiều cao của bé (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Ví dụ: 105"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-1.5">
                    Cân nặng của bé (kg)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Ví dụ: 16"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-1.5">
                  Size thường mặc gợi ý
                </label>
                <input
                  type="text"
                  value={preferredSize}
                  onChange={(e) => setPreferredSize(e.target.value)}
                  placeholder="Ví dụ: 100 (3-4T)"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                />
                <p className="text-[11px] text-[#6A7F77] mt-1">
                  💡 Hệ thống tự động tính toán kích cỡ vừa vặn nhất dựa trên chiều cao & cân nặng.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2F403A] uppercase tracking-wider mb-1.5">
                  Ghi chú sở thích của bé
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Thích màu pastel, sợ chất vải thô ráp, thích form rộng rãi..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDF9F1] border border-[#EFE8D8] text-sm text-[#2F403A] focus:outline-hidden focus:border-[#4E8773]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#FAF6EC]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EFE8D8] text-xs font-bold text-[#6A7F77] hover:bg-[#FDF9F1]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4E8773] hover:bg-[#355F52] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {editingBabyId ? 'Lưu thay đổi' : 'Thêm hồ sơ bé'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
