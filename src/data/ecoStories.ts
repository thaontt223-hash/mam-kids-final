import { EcoStory } from '../types';

export const ECO_STORIES: EcoStory[] = [
  {
    id: 'chuyen-bong-gon-be-nho',
    title: 'Hành Trình Của Bông Gòn Bé Nhỏ',
    subtitle: 'Từ mầm cây vươn lên dưới nắng mai đến chiếc áo êm ái của con',
    badge: 'Mầm Xanh Story #01',
    readTime: '3 phút cùng bé',
    targetAge: '3–10 tuổi',
    summary: 'Một câu chuyện dịu dàng kể cho bé nghe về cách hạt mầm thức giấc dưới đất mẹ, dệt nên chiếc áo con mặc mỗi ngày và bài học trao lại yêu thương khi áo đã chật.',
    coverImage: '/src/assets/images/test_kids_polo_1791213587392.jpg',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Hạt mầm thức giấc dưới nắng ấm',
        content:
          'Ngày xửa ngày xưa, có một hạt mầm bông gòn nhỏ xíu ngủ yên dưới lòng đất mẹ ấm áp. Khi những giọt sương mai dịu dàng thì thầm và ông mặt trời chiếu những tia nắng vàng rực rỡ, hạt mầm cựa mình thức giấc. Hạt mầm vươn lên hai chiếc lá xanh non, rồi lớn nhanh như thổi thành một bụi cây khỏe khoắn.',
        moral: 'Thiên nhiên cần đất lành, nước sạch và ánh nắng ấm áp để lớn lên mỗi ngày – cũng giống như bé cần tình yêu thương của ba mẹ vậy.',
        icon: '🌱'
      },
      {
        chapterNumber: 2,
        title: 'Bông hoa trắng mềm ôm ấp làn da bé',
        content:
          'Vào một sớm mùa hè trong lành, những nụ hoa nở bung thành từng túm bông trắng muốt, bồng bềnh như những đám mây nhỏ xíu sà xuống mặt đất. Bác nông dân cẩn thận thu hoạch từng túm sợi bông tự nhiên, không dùng thuốc trừ sâu độc hại. Qua bàn tay khéo léo của thợ dệt, những sợi bông hữu cơ hóa thành chiếc áo mềm mịn như một cái ôm ấp, đồng hành cùng bé trong mỗi giờ chơi và giấc ngủ ngon.',
        moral: 'Mỗi sợi vải tự nhiên đều chứa đựng giọt mồ hôi và sự nâng niu của bao người để bé được mặc chiếc áo an lành nhất.',
        icon: '☁️'
      },
      {
        chapterNumber: 3,
        title: 'Vòng đời xanh tiếp nối cùng Mầm Again',
        content:
          'Thời gian trôi qua, bé ngày một cao lớn và chiếc áo thân thương năm nào đã hơi chật. Thay vì bỏ quên trong góc tủ, ba mẹ cùng bé gấp chiếc áo thật gọn gàng, thơm tho để gửi về chương trình "Mầm Again". Chiếc áo được giặt sạch, phân loại và trao tặng cho một bạn nhỏ khác hoặc tái sinh thành món đồ hữu ích mới. Hạt mầm yêu thương lại tiếp tục nảy nở!',
        moral: 'Biết chia sẻ và gìn giữ đồ đạc là thói quen xanh tuyệt vời nhất giúp hành tinh chúng mình luôn tươi đẹp.',
        icon: '♻️'
      }
    ],
    challenge: {
      title: 'Thử Thách Xanh: Đôi Bàn Tay Nhỏ Xíu',
      action: 'Bé hãy cùng ba mẹ tưới cho một chậu cây xanh trong nhà hoặc tự tay gấp gọn 01 chiếc áo vào ngăn tủ nhé!',
      rewardDescription: 'Tặng ngay 50 Điểm Mầm & Huy hiệu "Mầm Xanh Tí Hon" vào tài khoản gia đình!',
      pointsReward: 50,
      badgeName: 'Mầm Xanh Tí Hon 🌱'
    },
    sustainabilityMessage:
      'Mầm Kids tin rằng tình yêu thiên nhiên không bắt đầu từ những điều to tát, mà nảy mầm từ chính chiếc áo bé mặc và bài học sẻ chia đầu đời.',
    materialHighlight:
      '100% Cotton Organic chải kỹ, không kích ứng da nhạy cảm và hoàn toàn tự phân hủy sinh học trong đất mẹ.'
  },
  {
    id: 'chiec-ao-biet-tho',
    title: 'Chiếc Áo Biết Thở Của Bé',
    subtitle: 'Bí mật của sợi vải tự nhiên mang làn gió mát lành ngày hè',
    badge: 'Mầm Xanh Story #02',
    readTime: '2 phút cùng bé',
    targetAge: '3–10 tuổi',
    summary: 'Khám phá bí mật vì sao chiếc áo linen và cotton của bé luôn thoáng mát, không đọng mồ hôi và cách bảo vệ nguồn nước trong veo.',
    coverImage: '/src/assets/images/vay_hoa_mua_he_1791555693164.jpg',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Cây lanh mộc mạc bên dòng suối nhỏ',
        content:
          'Ở một cánh đồng xanh mát bên triền đồi, những khóm cây lanh mảnh mai đung đưa trong gió. Khác với những loại sợi nhân tạo phải nấu trong các nhà máy hóa chất khổng lồ, cây lanh chỉ uống nước mưa tự nhiên và hút dưỡng chất từ đất. Thân cây dẻo dai chứa đựng hàng ngàn ống dẫn khí li ti – bí mật giúp sợi vải luôn mát rượi.',
        moral: 'Cây cỏ tự nhiên luôn có cách tự điều hòa nhiệt độ kì diệu mà không cần đến máy lạnh hay hóa chất.',
        icon: '🌾'
      },
      {
        chapterNumber: 2,
        title: 'Bí mật chiếc áo "biết thở"',
        content:
          'Khi may thành áo cho bé, những sợi lanh và cotton dệt xen kẽ tạo nên những khoảng hở siêu nhỏ. Khi bé chạy nhảy nô đùa toát mồ hôi, chiếc áo nhanh chóng đón làn gió mát ùa vào và đẩy hơi ẩm ra ngoài. Chiếc áo như đang "thở" nhịp nhàng cùng từng bước chạy của bé, bảo vệ làn da con khỏi rôm sảy suốt cả ngày hè.',
        moral: 'Chọn quần áo từ sợi tự nhiên là cách ba mẹ bảo bọc làn da bé và giữ cho nguồn nước sông suối không bị ô nhiễm vi nhựa.',
        icon: '💨'
      },
      {
        chapterNumber: 3,
        title: 'Lời hứa của bạn nhỏ yêu thiên nhiên',
        content:
          'Mỗi lần giặt đồ xong, bé cùng mẹ mang áo ra phơi dưới ánh nắng ấm dịu và gió trời thoang thoảng. Áo khô tự nhiên thơm mùi nắng, không cần sấy máy tiêu tốn điện năng. Bé mỉm cười thì thầm: "Cảm ơn chiếc áo đã mang gió mát cho con hôm nay nhé!".',
        moral: 'Yêu quý từng món đồ mình có là khởi đầu của một lối sống bền vững và văn minh.',
        icon: '☀️'
      }
    ],
    challenge: {
      title: 'Thử Thách Xanh: Tiết Kiệm Nước Cùng Bé',
      action: 'Bé hãy nhớ vặn chặt vòi nước sau khi rửa tay và nhắc người lớn tắt bớt 01 bóng đèn khi rời khỏi phòng nhé!',
      rewardDescription: 'Tặng ngay 50 Điểm Mầm & Huy hiệu "Chiến Binh Xanh" vào tài khoản gia đình!',
      pointsReward: 50,
      badgeName: 'Chiến Binh Xanh 💧'
    },
    sustainabilityMessage:
      'Mỗi lựa chọn chất liệu thân thiện là một phiếu bầu cho tương lai xanh mà các con sẽ lớn lên và tận hưởng.',
    materialHighlight:
      'Sợi Linen tự nhiên kết hợp Cotton hữu cơ, thoáng khí gấp 3 lần vải thông thường và giảm 60% lượng nước tiêu thụ khi canh tác.'
  }
];

export const getEcoStoryById = (id: string): EcoStory | undefined => {
  return ECO_STORIES.find((s) => s.id === id);
};
