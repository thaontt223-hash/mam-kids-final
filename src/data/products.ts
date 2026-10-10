import { Product, OutfitSet } from '../types';

export const PRODUCTS: Product[] = [
  // --- BÉ TRAI ---
  {
    id: 'ao-polo-be-ngoan',
    name: 'Áo polo Bé Ngoan',
    price: 189000,
    originalPrice: 229000,
    category: 'ao',
    categoryName: 'Áo polo & sơ mi',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'be-trai-nang-dong',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Xanh sage dịu mát', hex: '#4E8773' },
      { name: 'Beige cát mộc', hex: '#EFE7DA' },
      { name: 'Trắng mây ban mai', hex: '#FAF9F6' }
    ],
    material: '100% Cotton cá sấu Organic chải kỹ, bo cổ dệt kim mềm không cọ xát cổ bé',
    fabricDetail: 'Vải cotton piqué thoáng khí dạng tổ ong giúp thấm mồ hôi nhanh, bé vận động cả ngày không bị bí bách.',
    stylingTip: 'Phối hoàn hảo cùng Quần short Kaki Năng Động và Mũ bucket Chồi Xanh để bé có set đồ dạo phố cuối tuần cực bảnh.',
    description: 'Chiếc áo polo chuẩn mực cho bé trai diện đi học, đi chơi hay dự tiệc gia đình. Cổ bẻ thanh lịch nhưng chất liệu siêu mềm mại, cúc bọc vải an toàn không làm trầy xước làn da non nớt của con.',
    highlights: [
      'Chất vải sợi bông tự nhiên chuẩn Oeko-Tex Class 1',
      'Đường may giấu chỉ phẳng mịn quanh cổ và nách áo',
      'Hỗ trợ thêu tên bé hoặc chữ cái đầu trên ngực áo',
      'Giữ form áo đứng dáng sau hàng chục lần giặt'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 142,
    images: [
      '/images/test_kids_polo_1791213587392.jpg',
      '/images/polo_sage_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: true,
    isNew: true,
    isGreenProduct: true,
    ecoStoryId: 'chuyen-bong-gon-be-nho',
    ecoStoryTitle: 'Hành Trình Của Bông Gòn Bé Nhỏ',
    ecoStorySnippet: 'Chiếc áo này được dệt từ sợi Organic Cotton chải kỹ êm ái, mang theo câu chuyện về hạt mầm bông gòn thức giấc dưới nắng ấm.',
    greenMaterialDescription: 'Mầm Kids ưu tiên các chất liệu thân thiện hơn với môi trường như Organic Cotton, Bamboo hoặc recycled fabrics khi phù hợp với từng sản phẩm.',
    pairedProductIds: ['quan-short-kaki-nang-dong', 'mu-bucket-choi-xanh', 'sandal-be-trai-nang-dong']
  },
  {
    id: 'ao-so-mi-linen-mat-troi-nho',
    name: 'Áo sơ mi linen Mặt Trời Nhỏ',
    price: 249000,
    originalPrice: 289000,
    category: 'ao',
    categoryName: 'Áo polo & sơ mi',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'dao-choi-cuoi-tuan',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Trắng kem vintage', hex: '#FDFBF7' },
      { name: 'Xanh lanh pastel', hex: '#CBDAD5' },
      { name: 'Vàng bơ mặt trời', hex: '#F7E7BE' }
    ],
    material: 'Linen sợi lanh tự nhiên pha cotton mềm êm, đã qua công nghệ giặt enzym sinh học',
    fabricDetail: 'Vải đũi lanh mộc mạc, tạo cảm giác thoáng mát tự nhiên như làn gió hè và thân thiện tuyệt đối với môi trường.',
    stylingTip: 'Mặc cùng Quần short Kaki hoặc Quần jean xắn gấu, mang thêm Túi mini Khám Phá.',
    description: 'Thiết kế cổ tàu thanh lịch mang hơi thở mộc mạc ấm áp. Họa tiết thêu mầm non và mặt trời nhỏ ở túi ngực tạo điểm nhấn tinh tế cho bé trai tự tin trong mọi dịp lễ hội, dạo phố hay du xuân.',
    highlights: [
      'Cổ trụ mềm mại không bó sát, khuy gỗ dừa tự nhiên',
      'Thấm hút mồ hôi gấp 3 lần vải sợi nhân tạo',
      'Độ bền sợi lanh cao, giặt càng nhiều sợi vải càng mềm mịn'
    ],
    stockStatus: 'con-hang',
    rating: 4.8,
    reviewsCount: 98,
    images: [
      '/images/linen_shirt_boy_1791213667396.jpg',
      '/images/linen_shirt_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: false,
    isNew: true,
    isGreenProduct: true,
    ecoStoryId: 'chiec-ao-biet-tho',
    ecoStoryTitle: 'Chiếc Áo Biết Thở Của Bé',
    ecoStorySnippet: 'Chiếc áo linen mộc mạc thoáng mát, chứa đựng bí mật của loài cây lanh dẻo dai bên sườn đồi xanh mát.',
    greenMaterialDescription: 'Mầm Kids ưu tiên các chất liệu thân thiện hơn với môi trường như Linen sợi lanh tự nhiên và Organic Cotton khi phù hợp với từng sản phẩm.',
    pairedProductIds: ['quan-short-kaki-nang-dong', 'tui-mini-kham-pha']
  },
  {
    id: 'set-dao-pho-xanh-mat',
    name: 'Set Dạo Phố Xanh Mát',
    price: 329000,
    originalPrice: 389000,
    category: 'bo-do',
    categoryName: 'Set phối hoàn chỉnh',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'dao-choi-cuoi-tuan',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)'],
    colors: [
      { name: 'Xanh sage & Kaki be', hex: '#4E8773' },
      { name: 'Trắng kem & Nâu đất', hex: '#FDFBF7' }
    ],
    material: 'Combo gồm Áo polo cotton organic và Quần short kaki đũi mềm',
    fabricDetail: 'Cả bộ trang phục đạt tiêu chuẩn an toàn cho trẻ nhỏ, vải không chứa formaldehyde và kim loại nặng.',
    stylingTip: 'Set đã được phối màu chuẩn phong cách Mầm Kids, bố mẹ chỉ cần diện thêm nón bucket là bé sẵn sàng ra ngoài.',
    description: 'Set trang phục hoàn chỉnh được các nhà thiết kế Mầm Kids phối sẵn tỉ mỉ. Tone xanh sage mát mắt kết hợp cùng quần short kaki be giúp bé trai trông vừa đáng yêu vừa đĩnh đạc.',
    highlights: [
      'Tiết kiệm 60.000 VND so với mua từng sản phẩm rời',
      'Phom dáng chuẩn form trẻ em Việt Nam từ 3–12 tuổi',
      'Tặng kèm 01 túi tote canvas Mầm Kids cao cấp'
    ],
    stockStatus: 'con-hang',
    rating: 5.0,
    reviewsCount: 88,
    images: [
      '/images/outfit_dao_pho_xanh_mat_flatlay.jpg',
      '/images/test_kids_polo_1791213587392.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: true,
    isNew: true,
    isSet: true,
    setItems: ['Áo polo Bé Ngoan (Xanh sage)', 'Quần short Kaki Năng Động (Beige)', 'Huy hiệu mầm cây may mắn']
  },
  {
    id: 'quan-short-kaki-nang-dong',
    name: 'Quần short Kaki Năng Động',
    price: 159000,
    originalPrice: 189000,
    category: 'quan',
    categoryName: 'Quần bé trai',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'be-trai-nang-dong',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Kaki be tự nhiên', hex: '#EAE1D2' },
      { name: 'Nâu caramel ấm', hex: '#CDB19B' },
      { name: 'Xanh olive dịu', hex: '#A3B18A' }
    ],
    material: 'Kaki cotton 100% sợi dệt mật độ cao chống xước, co giãn nhẹ',
    fabricDetail: 'Xử lý giặt enzyme đặc biệt giúp bề mặt kaki mềm mại tựa như nhung, không gây ráp da đùi khi bé chạy nhảy.',
    stylingTip: 'Phối cùng áo polo, áo thun hay sơ mi đều chuẩn thời trang.',
    description: 'Chiếc quần short quốc dân cho mọi bé trai. Thiết kế cạp chun bản rộng êm ái, có 2 túi hông sâu tiện lợi để bé cất những món đồ chơi yêu thích trong chuyến thám hiểm thiên nhiên.',
    highlights: [
      'Chun quần co giãn linh hoạt không để lại vết hằn đỏ trên bụng',
      'Đường may đúp chỉ kép gia cố độ bền cao',
      'Dễ giặt sạch các vết bùn đất khi bé vui chơi'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 115,
    images: [
      '/images/khaki_shorts_boy_1791213677552.jpg',
      '/images/khaki_shorts_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: false,
    pairedProductIds: ['ao-polo-be-ngoan', 'mu-bucket-choi-xanh']
  },
  {
    id: 'hoodie-buoc-chay-nhi',
    name: 'Hoodie Bước Chạy Nhí',
    price: 299000,
    originalPrice: 349000,
    category: 'ao',
    categoryName: 'Đồ thể thao & Áo khoác',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'the-thao-nhi',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Xanh sage thể thao', hex: '#355F52' },
      { name: 'Beige cát mộc', hex: '#EFE7DA' },
      { name: 'Xám melange', hex: '#A7A2A9' }
    ],
    material: 'Cotton nỉ da cá chải kỹ 100% bông tự nhiên dầy dặn, mặt trong dệt vòng tròn mịn màng',
    fabricDetail: 'Không bí hơi, giữ ấm tốt khi trời chuyển mùa hoặc trong phòng máy lạnh.',
    stylingTip: 'Phối cùng quần jogger và sneaker cho phong cách thể thao sành điệu.',
    description: 'Áo hoodie phom thể thao năng động với túi kangaroo rộng rãi trước bụng. Mũ áo 2 lớp dày dặn bảo vệ tai và gáy bé mỗi khi trời trở gió hay trong những buổi tập thể thao ngoài trời.',
    highlights: [
      'Bo cổ tay và gấu áo dệt thun co giãn êm dịu',
      'Không bai nhão, không xù lông sau khi giặt máy',
      'Hỗ trợ thêu số áo và tên bé độc quyền phía sau lưng'
    ],
    stockStatus: 'con-hang',
    rating: 4.8,
    reviewsCount: 82,
    images: [
      '/images/hoodie_boy_sage_1791213696766.jpg',
      '/images/hoodie_sage_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: false,
    isNew: true,
    pairedProductIds: ['quan-short-kaki-nang-dong', 'mu-bucket-choi-xanh']
  },
  {
    id: 'bo-the-thao-san-choi-vui',
    name: 'Bộ thể thao Sân Chơi Vui',
    price: 289000,
    originalPrice: 339000,
    category: 'the-thao',
    categoryName: 'Đồ thể thao',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'the-thao-nhi',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Xanh sage phối kem mộc', hex: '#4E8773' },
      { name: 'Beige cát hữu cơ', hex: '#EFE7DA' }
    ],
    material: 'Thun cotton hữu cơ 4 chiều phối màu Sage Green và Kem tinh tế',
    fabricDetail: 'Công nghệ dệt mắt chim thoáng khí giúp lưu thông không khí liên tục khi bé chạy nhảy cường độ cao.',
    stylingTip: 'Cả set đồng bộ áo thun + quần short thể thao.',
    description: 'Trang phục thể thao lý tưởng cho những giờ học thể dục, lớp bóng rổ hay những buổi chạy nhảy cuối tuần ở công viên. Thiết kế khỏe khoắn với đường viền thể thao tinh tế.',
    highlights: [
      'Gồm 01 áo ngắn tay thể thao và 01 quần short có túi khoá kéo',
      'Chất vải co giãn 4 chiều vận động không giới hạn',
      'Khô nhanh chỉ sau 30 phút giặt phơi'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 74,
    images: [
      '/images/san_choi_vui_sage_cream_1791289011381.jpg',
      '/images/bo_the_thao_active_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: false,
    isNew: true,
    isSet: true,
    setItems: ['Áo thun thể thao thoáng khí', 'Quần short chạy bộ có túi zip an toàn']
  },
  {
    id: 'mu-bucket-choi-xanh',
    name: 'Mũ bucket Chồi Xanh',
    price: 99000,
    originalPrice: 129000,
    category: 'phu-kien',
    categoryName: 'Phụ kiện bé trai',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'be-trai-nang-dong',
    sizes: ['Freesize 3–7 tuổi', 'Freesize 8–12 tuổi'],
    colors: [
      { name: 'Xanh sage mầm non', hex: '#4E8773' },
      { name: 'Beige cát mộc', hex: '#EAE1D2' },
      { name: 'Vàng bơ nhạt', hex: '#F7E7BE' }
    ],
    material: 'Vải Canvas Cotton 100% sợi dệt tự nhiên, vành lót vải xô mềm thấm mồ hôi',
    fabricDetail: 'Vải chống tia cực tím UPF 50+ bảo vệ đầu và gáy bé khỏi nắng gay gắt.',
    stylingTip: 'Điểm nhấn hoàn hảo khi phối với áo polo, áo sơ mi hay đồ thể thao.',
    description: 'Mũ tai bèo bucket xinh xắn với họa tiết mầm non thêu nổi tỉ mỉ. Có quai rút điều chỉnh êm ái chống bay khi trời có gió, giúp bé thoải mái đi biển, cắm trại hay dạo phố.',
    highlights: [
      'Quai đeo có chốt an toàn tự mở khi bị vướng',
      'Vành mũ rộng vừa phải, không che khuất tầm nhìn của bé',
      'Gấp gọn nhét túi áo khoác hay balo không gãy form'
    ],
    stockStatus: 'con-hang',
    rating: 5.0,
    reviewsCount: 167,
    images: [
      '/images/bucket_hat_sage_1791213748501.jpg',
      '/images/bucket_hat_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: false,
    isGreenProduct: true,
    ecoStoryId: 'chuyen-bong-gon-be-nho',
    ecoStoryTitle: 'Hành Trình Của Bông Gòn Bé Nhỏ',
    ecoStorySnippet: 'Mũ được may từ sợi Canvas Cotton 100% tự nhiên, vành lót xô mềm bảo vệ bé dưới ánh nắng mai.',
    greenMaterialDescription: 'Mầm Kids ưu tiên các chất liệu thân thiện hơn với môi trường như sợi bông tự nhiên và vải canvas mộc khi phù hợp với từng sản phẩm.'
  },
  {
    id: 'tui-mini-kham-pha',
    name: 'Túi mini Khám Phá',
    price: 119000,
    originalPrice: 149000,
    category: 'phu-kien',
    categoryName: 'Phụ kiện bé trai',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'be-trai-nang-dong',
    sizes: ['Freesize (16x12x5cm)'],
    colors: [
      { name: 'Nâu kaki đất', hex: '#CDB19B' },
      { name: 'Xanh sage tự nhiên', hex: '#4E8773' }
    ],
    material: 'Canvas sợi tự nhiên trượt nước nhẹ, quai dù bản mềm không siết vai',
    fabricDetail: 'Khóa kéo mượt mà có dây rút vải giúp đôi tay nhỏ của bé dễ dàng đóng mở.',
    stylingTip: 'Đeo chéo ngực phối cùng áo sơ mi linen hoặc áo polo.',
    description: 'Túi đeo chéo mini phong cách phiêu lưu cho các cậu bé tò mò. Vừa vặn để đựng khăn tay, khẩu trang, đồ chơi nhỏ hay vài chiếc kẹo ngọt khi cùng bố mẹ dạo phố cuối tuần.',
    highlights: [
      'Trọng lượng siêu nhẹ chỉ 80g không nặng vai bé',
      'Dây đeo tăng giảm độ dài từ 40cm đến 85cm',
      'Họa tiết thêu la bàn mầm non độc quyền Mầm Kids'
    ],
    stockStatus: 'con-hang',
    rating: 4.8,
    reviewsCount: 53,
    images: [
      '/images/kids_crossbody_bag_1791213759841.jpg',
      '/images/crossbody_bag_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: false,
    isNew: true
  },
  {
    id: 'sandal-be-trai-nang-dong',
    name: 'Sandal Bé Trai Năng Động',
    price: 149000,
    originalPrice: 189000,
    category: 'phu-kien',
    categoryName: 'Phụ kiện bé trai',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'be-trai-nang-dong',
    sizes: ['Size 26 (16cm)', 'Size 28 (17.5cm)', 'Size 30 (19cm)', 'Size 32 (20.5cm)'],
    colors: [
      { name: 'Nâu da bò vintage', hex: '#8C6751' },
      { name: 'Beige cát mộc', hex: '#EFE7DA' }
    ],
    material: 'Da microfiber mềm kháng nước, đế cao su non đúc rãnh chống trượt',
    fabricDetail: 'Quai dán Velcro cao cấp điều chỉnh linh hoạt theo mu bàn chân bé, êm ái không cọ xát gót chân.',
    stylingTip: 'Phối cùng quần short kaki và tất cổ ngắn.',
    description: 'Đôi sandal dã ngoại nâng đỡ từng bước chạy của bé. Đế cao su non uốn dẻo 360 độ giúp bàn chân non phát triển tự nhiên mà không bị gò ép.',
    highlights: [
      'Đế rãnh sóng chống trượt tuyệt đối trên mọi bề mặt ướt',
      'Đệm lót chân bọc vải thoáng khí kháng khuẩn',
      'Bé tự xỏ và tháo quai dễ dàng chỉ với một thao tác'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 91,
    images: [
      '/images/boy_leather_sandals_1791213771096.jpg',
      '/images/boy_sandals_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: false
  },

  // --- BÉ GÁI ---
  {
    id: 'vay-hoa-nang-som',
    name: 'Váy hoa Nắng Sớm',
    price: 239000,
    originalPrice: 279000,
    category: 'vay',
    categoryName: 'Váy & Đầm bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'mua-he-nhe-em',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Hoa nhí nắng mai', hex: '#F9EAD4' },
      { name: 'Hồng phấn mơ màng', hex: '#F5D7CE' },
      { name: 'Xanh thảo mộc dịu mát', hex: '#D6E2D5' }
    ],
    material: 'Linen sợi tre pha cotton dệt thưa mềm rủ, lót cotton habutai mỏng nhẹ siêu mát',
    fabricDetail: 'Họa tiết hoa cúc dại vẽ tay độc quyền in bằng mực gốc nước an toàn thực phẩm trên sợi vải tự nhiên.',
    stylingTip: 'Phối cùng Băng đô Hoa Nhỏ và Sandal Kem Mây để bé hóa thành nàng thơ mùa hạ.',
    description: 'Thiết kế dáng xòe tự nhiên mang phong cách đồng quê Pháp thơ mộng. Tay bồng nhẹ viền bèo tinh xảo, cổ vuông retro tôn lên vẻ trong trẻo đáng yêu của bé gái.',
    highlights: [
      'Lót trong 100% sợi tự nhiên mát lịm không bết dính mồ hôi',
      'Dây kéo giấu êm dịu có lớp lót che không cấn vào lưng bé',
      'Độ xòe bồng bềnh tự nhiên cho bé thỏa sức xoay tròn'
    ],
    stockStatus: 'con-hang',
    rating: 5.0,
    reviewsCount: 156,
    images: [
      '/images/product_vay_hoa_1791209422010.jpg',
      '/images/floral_dress_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: true,
    isGreenProduct: true,
    ecoStoryId: 'chiec-ao-biet-tho',
    ecoStoryTitle: 'Chiếc Áo Biết Thở Của Bé',
    ecoStorySnippet: 'Sợi tre tự nhiên hòa quyện cùng bông mềm, in họa tiết hoa cúc với mực gốc nước bảo vệ làn da bé.',
    greenMaterialDescription: 'Mầm Kids ưu tiên các chất liệu thân thiện hơn với môi trường như Linen sợi tre và cotton hữu cơ khi phù hợp với từng sản phẩm.',
    pairedProductIds: ['bang-do-hoa-nho', 'sandal-kem-may', 'tui-mini-keo-bong']
  },
  {
    id: 'dam-pastel-canh-buom',
    name: 'Đầm pastel Cánh Bướm',
    price: 269000,
    originalPrice: 319000,
    category: 'vay',
    categoryName: 'Váy & Đầm bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'cong-chua-pastel',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Hồng phấn pastel', hex: '#F3D2CB' },
      { name: 'Tím hoa oải hương', hex: '#E3DAEB' },
      { name: 'Kem vani ngọt ngào', hex: '#F9F1E2' }
    ],
    material: 'Tơ xốp tự nhiên xếp ly bay bổng, lót lụa habutai organic',
    fabricDetail: 'Vải tơ nhẹ như mây, tạo độ phồng tự nhiên mà hoàn toàn không cần khung gọng cứng nhắc.',
    stylingTip: 'Đi kèm kẹp tóc nơ pastel và giày búp bê mềm mại.',
    description: 'Chiếc đầm biến ước mơ thành công chúa của mọi bé gái thành hiện thực. Tay áo cách điệu cánh bướm dập ly tinh tế, ruy băng buộc nơ sau lưng tạo điểm nhấn thanh thoát dịu dàng.',
    highlights: [
      'Chất vải không gây ngứa hay kích ứng vùng da nách bé',
      'Tone màu pastel nhã nhặn, tôn sáng làn da trẻ thơ',
      'Thích hợp dự sinh nhật, tiệc cưới hay chụp ảnh kỷ niệm'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 124,
    images: [
      '/images/set_cong_chua_pastel_1791211362885.jpg',
      '/images/princess_tulle_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: true,
    pairedProductIds: ['bang-do-hoa-nho', 'tui-mini-keo-bong']
  },
  {
    id: 'ao-blouse-co-sen-diu-dang',
    name: 'Áo blouse Cổ Sen Dịu Dàng',
    price: 199000,
    originalPrice: 239000,
    category: 'ao',
    categoryName: 'Áo kiểu & Áo thun bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'be-vui-den-truong',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Trắng kem hoa cúc', hex: '#FAF9F6' },
      { name: 'Hồng phấn mơ màng', hex: '#FDF0F2' }
    ],
    material: 'Cotton xô tơ 100% sợi dệt tự nhiên, viền ren thêu cotton mềm mại',
    fabricDetail: 'Chất vải mỏng nhẹ mát rượi, cổ sen 2 lớp thêu họa tiết mầm hoa nhỏ li ti.',
    stylingTip: 'Phối cùng Chân váy Mây Hồng hoặc quần short đũi be.',
    description: 'Mẫu áo blouse ngọt ngào với cổ sen tròn cổ điển viền bèo ren tinh xảo. Cúc bọc vải xinh xắn phía sau lưng giúp bé mặc vào tháo ra dễ dàng mà không cấn tóc.',
    highlights: [
      'Cổ áo đệm lót êm không gây cọ xát cổ họng bé',
      'Hỗ trợ thêu tên bé ở góc ngực áo làm dấu ấn riêng',
      'Dễ phối đồ cùng mọi loại chân váy hoặc quần jean'
    ],
    stockStatus: 'con-hang',
    rating: 4.8,
    reviewsCount: 78,
    images: [
      '/images/peter_pan_blouse_1791213717068.jpg',
      '/images/peter_pan_blouse_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: false,
    isNew: true,
    pairedProductIds: ['chan-vay-may-hong', 'bang-do-hoa-nho']
  },
  {
    id: 'chan-vay-may-hong',
    name: 'Chân váy Mây Hồng',
    price: 169000,
    originalPrice: 199000,
    category: 'quan',
    categoryName: 'Chân váy bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'be-vui-den-truong',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Hồng phấn mây ngọt', hex: '#F2C7CE' },
      { name: 'Beige cát mộc', hex: '#EAE1D2' },
      { name: 'Xanh sage pastel', hex: '#4E8773' }
    ],
    material: 'Vải cotton đũi thêu hoa chìm, bên trong may kèm quần đùi bảo hộ 100% cotton',
    fabricDetail: 'Quần lót bảo hộ may liền cùng chất liệu cotton mềm mát, bé thỏa sức nhảy dây, chạy nhảy không lo hớ hênh.',
    stylingTip: 'Phối cùng Áo blouse Cổ Sen Dịu Dàng tạo thành set đồ hoàn hảo.',
    description: 'Chân váy xếp ly chữ A mềm rủ tôn nét ngây thơ trong sáng. Cạp chun co giãn ôm vừa vặn vòng bụng bé mà không thít chặt, đính kèm chiếc nơ nhỏ xinh xắn ở hông.',
    highlights: [
      'Quần bảo hộ may liền bảo vệ bé kín đáo và an toàn',
      'Xếp ly nhiệt bền đẹp không mất nếp sau khi giặt',
      'Vải tự nhiên thoáng khí, thấm hút mồ hôi tối đa'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 86,
    images: [
      '/images/pink_pleated_skirt_1791213726732.jpg',
      '/images/pink_skirt_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: false,
    pairedProductIds: ['ao-blouse-co-sen-diu-dang', 'tui-mini-keo-bong']
  },
  {
    id: 'set-be-gai-ngot-ngao',
    name: 'Set Bé Gái Ngọt Ngào',
    price: 349000,
    originalPrice: 399000,
    category: 'bo-do',
    categoryName: 'Set phối hoàn chỉnh',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'dao-choi-cuoi-tuan',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)'],
    colors: [
      { name: 'Áo trắng & Váy hồng mây', hex: '#F2C7CE' },
      { name: 'Áo kem & Váy sage pastel', hex: '#D2E3DC' }
    ],
    material: 'Combo gồm Áo blouse cổ sen ren và Chân váy chữ A kèm quần bảo hộ',
    fabricDetail: 'Cả bộ đồng điệu về tone màu pastel dịu nhẹ, phong cách thanh lịch Pháp dành cho bé gái.',
    stylingTip: 'Kèm thêm Băng đô Hoa Nhỏ và Sandal Kem Mây là bé đã có diện mạo hoàn hảo.',
    description: 'Outfit được yêu thích nhất mùa tựu trường và dạo phố cuối tuần. Thiết kế tiểu thư điệu đà nhưng cực kỳ thoải mái để bé tự do vui chơi suốt cả ngày.',
    highlights: [
      'Tiết kiệm 50.000 VND so với mua lẻ',
      'Đã phối sẵn bảng màu chuẩn thẩm mỹ Mầm Kids',
      'Tặng kèm 01 túi tote Mầm Kids xinh xắn'
    ],
    stockStatus: 'con-hang',
    rating: 5.0,
    reviewsCount: 112,
    images: [
      '/images/outfit_be_gai_ngot_ngao_flatlay.jpg',
      '/images/pink_pleated_skirt_1791213726732.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: true,
    isNew: true,
    isSet: true,
    setItems: ['Áo blouse Cổ Sen Dịu Dàng', 'Chân váy Mây Hồng (có quần bảo hộ)', 'Nơ cài tóc nhỏ xinh']
  },
  {
    id: 'dam-cong-chua-anh-mai',
    name: 'Đầm công chúa Ánh Mai',
    price: 289000,
    originalPrice: 339000,
    category: 'vay',
    categoryName: 'Váy & Đầm bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'cong-chua-pastel',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Vàng bơ ánh mai', hex: '#F5DFA0' },
      { name: 'Hồng phấn thiên thần', hex: '#F2C7CE' },
      { name: 'Kem vani ngọt ngào', hex: '#FDF9F1' }
    ],
    material: 'Voan tơ màng mỏng 3 lớp cao cấp, lót trong bằng lụa cotton tự nhiên mát lịm',
    fabricDetail: 'Lớp voan mềm không hề gây ngứa dặm, các đường viền gấu được cuốn biên tơ tỉ mỉ.',
    stylingTip: 'Phối cùng Băng đô Hoa Nhỏ và Túi mini Kẹo Bông.',
    description: 'Thiết kế đầm dạ tiệc bồng bềnh biến bé gái thành nàng thơ rạng rỡ. Hạt ngọc trai nhỏ đính viền cổ tinh tế, tùng váy xếp 3 tầng xòe nhẹ theo từng bước chân của bé.',
    highlights: [
      'Lót lụa cotton an toàn thấm hút mồ hôi 100%',
      'Nơ ruy băng lụa sau lưng có thể điều chỉnh độ rộng ngực',
      'Thích hợp dự tiệc thôi nôi, sinh nhật hay biểu diễn văn nghệ'
    ],
    stockStatus: 'con-hang',
    rating: 5.0,
    reviewsCount: 94,
    images: [
      '/images/yellow_princess_dress_1791213706637.jpg',
      '/images/princess_tulle_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: true,
    pairedProductIds: ['bang-do-hoa-nho', 'tui-mini-keo-bong', 'sandal-kem-may']
  },
  {
    id: 'bang-do-hoa-nho',
    name: 'Băng đô Hoa Nhỏ',
    price: 69000,
    originalPrice: 89000,
    category: 'phu-kien',
    categoryName: 'Phụ kiện bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'cong-chua-pastel',
    sizes: ['Freesize co giãn (6 tháng - 10 tuổi)'],
    colors: [
      { name: 'Hoa kem pastel', hex: '#FAF9F6' },
      { name: 'Hoa hồng mơ màng', hex: '#F2C7CE' },
      { name: 'Hoa vàng bơ nhạt', hex: '#F5DFA0' }
    ],
    material: 'Chun co giãn bản mềm bọc vải cotton xô êm ái, đính hoa vải thủ công',
    fabricDetail: 'Không dùng keo dán công nghiệp, toàn bộ cánh hoa được may đính thủ công an toàn.',
    stylingTip: 'Phối cùng váy hoa hoặc đầm công chúa.',
    description: 'Món phụ kiện ngọt ngào nâng niu mái tóc xinh của bé. Dây thun co giãn siêu êm không làm đau đầu hay để lại vết hằn trên trán bé.',
    highlights: [
      'Độ co giãn êm ái thích hợp cho cả bé sơ sinh và bé lớn',
      'Hoa vải mềm không cấn khi bé nằm tựa đầu',
      'Tạo điểm nhấn xinh xắn khi chụp ảnh kỷ niệm'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 148,
    images: [
      '/images/girl_flower_headband_1791213782133.jpg',
      '/images/headband_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: false
  },
  {
    id: 'tui-mini-keo-bong',
    name: 'Túi mini Kẹo Bông',
    price: 109000,
    originalPrice: 139000,
    category: 'phu-kien',
    categoryName: 'Phụ kiện bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'dao-choi-cuoi-tuan',
    sizes: ['Freesize (14x14x6cm)'],
    colors: [
      { name: 'Hồng pastel kẹo ngọt', hex: '#F2C7CE' },
      { name: 'Kem vani ấm', hex: '#FDF9F1' }
    ],
    material: 'Vải cotton chần bông êm ái, quai đeo bọc vải mềm',
    fabricDetail: 'Trần bông hình quả trám thủ công, đính nơ nhỏ xinh xắn.',
    stylingTip: 'Đeo chéo vai cùng mọi set đầm bé gái.',
    description: 'Chiếc túi nhỏ xinh tựa viên kẹo ngọt mà bé gái nào cũng mê mẩn. Đựng vừa kẹp tóc, thỏi son dưỡng hữu cơ hay những món đồ lưu niệm nhỏ bé mang theo bên mình.',
    highlights: [
      'Chất vải chần bông mềm mại, có thể giặt sạch bằng tay',
      'Khóa nam châm hít nhẹ nhàng bé tự mở dễ dàng',
      'Trọng lượng siêu nhẹ chỉ 65g'
    ],
    stockStatus: 'con-hang',
    rating: 4.8,
    reviewsCount: 63,
    images: [
      '/images/girl_pink_handbag_1791213793616.jpg',
      '/images/girl_handbag_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: false,
    isNew: true
  },
  {
    id: 'sandal-kem-may',
    name: 'Sandal Kem Mây Bé Gái',
    price: 149000,
    originalPrice: 189000,
    category: 'phu-kien',
    categoryName: 'Phụ kiện bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'mua-he-nhe-em',
    sizes: ['Size 25 (15.5cm)', 'Size 27 (17cm)', 'Size 29 (18.5cm)', 'Size 31 (20cm)'],
    colors: [
      { name: 'Kem mây vani', hex: '#FDF9F1' },
      { name: 'Hồng phấn tiểu thư', hex: '#F2C7CE' }
    ],
    material: 'Da microfiber mềm như nhung, đế đệm cao su non êm nhẹ',
    fabricDetail: 'Quai quấn ngang bèo nhún điệu đà, lớp lót đế chân chống bám mùi hôi.',
    stylingTip: 'Phối cùng váy hoa mùa hè hoặc đầm pastel.',
    description: 'Đôi sandal êm ái như bước đi trên mây dành cho các nàng công chúa nhỏ. Đế nhẹ tênh nâng niu cổ chân và vòm bàn chân bé suốt cả ngày dài dạo chơi.',
    highlights: [
      'Quai dán tiện lợi bé tự mang giày không cần bố mẹ giúp',
      'Đế uốn cong đàn hồi tốt theo chuyển động tự nhiên của bàn chân',
      'Chống trơn trượt tối ưu khi đi trên sàn gạch hoa'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 105,
    images: [
      '/images/girl_cream_sandals_1791213804798.jpg',
      '/images/girl_sandals_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: false
  },

  // --- EXISTING POPULAR FAVORITES ---
  {
    id: 'ao-thun-cotton-gau-nho',
    name: 'Áo thun cotton Gấu Nhỏ',
    price: 149000,
    originalPrice: 179000,
    category: 'ao',
    categoryName: 'Đồ mặc hàng ngày',
    gender: 'unisex',
    genderName: 'Unisex (Bé trai & Bé gái)',
    collectionId: 'mua-he-nhe-em',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Beige cát mộc', hex: '#EFE7DA' },
      { name: 'Nâu sữa ngọt ngào', hex: '#CDB19B' },
      { name: 'Trắng tinh khôi', hex: '#FAF9F6' },
      { name: 'Vàng bơ ấm áp', hex: '#F7E7BE' }
    ],
    material: '100% Cotton hữu cơ chải kỹ, chứng nhận an toàn Oeko-Tex cho làn da bé',
    fabricDetail: 'Vải cotton 4 chiều mềm mượt, thấm mồ hôi tối đa không kích ứng da.',
    stylingTip: 'Phối cùng quần short năng động hoặc quần jean co giãn.',
    description: 'Chiếc áo thun best-seller của Mầm Kids với chất liệu cotton hữu cơ 4 chiều siêu thoáng khí. Họa tiết chú gấu nhỏ thêu tinh xảo trên ngực áo mang lại nét đáng yêu và ấm áp cho bé trong mọi hoạt động vui chơi mỗi ngày.',
    highlights: [
      'Chất vải sợi bông tự nhiên thấm hút mồ hôi tối đa',
      'Đường may phẳng mịn, không gây cọ xát ngứa ngáy cho da nhạy cảm',
      'Hỗ trợ thêu / in tên bé và lời nhắn yêu thương độc quyền',
      'Bền màu sau nhiều lần giặt máy'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 158,
    images: [
      '/images/product_ao_gau_1791209408030.jpg',
      '/images/bear_tee_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: true,
    isNew: false,
    isGreenProduct: true,
    ecoStoryId: 'chuyen-bong-gon-be-nho',
    ecoStoryTitle: 'Hành Trình Của Bông Gòn Bé Nhỏ',
    ecoStorySnippet: '100% sợi bông Organic chuẩn Oeko-Tex Class 1, ôm ấp làn da bé mỗi ngày như cái ôm ấm áp của mẹ.',
    greenMaterialDescription: 'Mầm Kids ưu tiên các chất liệu thân thiện hơn với môi trường như Organic Cotton, Bamboo hoặc recycled fabrics khi phù hợp với từng sản phẩm.',
    pairedProductIds: ['quan-short-nang-dong', 'mu-bucket-choi-xanh']
  },
  {
    id: 'vay-hoa-mua-he',
    name: 'Váy hoa mùa hè',
    price: 229000,
    originalPrice: 269000,
    category: 'vay',
    categoryName: 'Váy & Đầm bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'mua-he-nhe-em',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Hoa nhí nắng mai', hex: '#F9EAD4' },
      { name: 'Hồng phấn mơ màng', hex: '#F5D7CE' },
      { name: 'Xanh thảo mộc dịu mát', hex: '#D6E2D5' }
    ],
    material: 'Cotton thô đũi organic mềm rủ, lót cotton habutai mỏng nhẹ',
    fabricDetail: 'Lớp lót cotton thoáng mát tự nhiên, giữ phom váy xòe duyên dáng.',
    stylingTip: 'Phối cùng băng đô hoa nhỏ và sandal kem mây.',
    description: 'Thiết kế dáng xòe tự nhiên mang phong cách đồng quê dịu dàng. Họa tiết hoa nhí vẽ tay độc quyền tại Mầm Kids, tay bồng nhẹ nhàng giúp bé vừa thanh lịch vừa thoải mái chạy nhảy vui đùa dưới nắng hạ.',
    highlights: [
      'Dáng suông thoải mái, cổ tròn viền bèo mềm mại',
      'Lót trong 100% sợi tự nhiên không gây dính bí',
      'Dây kéo giấu êm dịu không cấn lưng bé'
    ],
    stockStatus: 'con-hang',
    rating: 4.8,
    reviewsCount: 96,
    images: [
      '/images/vay_hoa_mua_he_1791555693164.jpg',
      '/images/floral_dress_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: false,
    isGreenProduct: true,
    ecoStoryId: 'chiec-ao-biet-tho',
    ecoStoryTitle: 'Chiếc Áo Biết Thở Của Bé',
    ecoStorySnippet: 'Váy hoa thô đũi organic mềm rủ tự nhiên, nhẹ như một làn gió mát trong vườn hoa.',
    greenMaterialDescription: 'Mầm Kids ưu tiên các chất liệu thân thiện hơn với môi trường như Organic Cotton, Bamboo hoặc recycled fabrics khi phù hợp với từng sản phẩm.',
    pairedProductIds: ['bang-do-hoa-nho', 'sandal-kem-may']
  },
  {
    id: 'quan-short-nang-dong',
    name: 'Quần short năng động',
    price: 159000,
    originalPrice: 189000,
    category: 'quan',
    categoryName: 'Đồ mặc hàng ngày',
    gender: 'unisex',
    genderName: 'Unisex (Bé trai & Bé gái)',
    collectionId: 'mua-he-nhe-em',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Nâu kaki nhạt', hex: '#D7C4B7' },
      { name: 'Beige tự nhiên', hex: '#EAE1D2' },
      { name: 'Xanh olive dịu', hex: '#A3B18A' }
    ],
    material: 'Kaki cotton pha đũi mềm đã qua xử lý giặt enzyme chống co rút',
    fabricDetail: 'Vải mộc thoáng khí, bền bỉ qua nhiều lần giặt sấy.',
    stylingTip: 'Phối cùng Áo thun cotton Gấu Nhỏ tạo thành combo mùa hè siêu hot.',
    description: 'Quần short với cạp chun mềm co giãn linh hoạt, có túi tiện lợi hai bên cho bé đựng những viên sỏi nhỏ hay món đồ chơi yêu thích. Dễ dàng phối cùng áo thun, áo sơ mi hay áo polo.',
    highlights: [
      'Cạp chun bản rộng êm ái không hằn bụng',
      'Form dáng suông rộng rãi chuẩn vận động',
      'Dễ giặt sạch các vết bẩn bụi đất của trẻ nhỏ'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 84,
    images: [
      '/images/quan_short_unisex_nang_dong_1791555723938.jpg',
      '/images/quan_short_unisex_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: false,
    pairedProductIds: ['ao-thun-cotton-gau-nho', 'mu-bucket-choi-xanh']
  },
  {
    id: 'do-bo-ngay-nang',
    name: 'Đồ bộ Ngày Nắng',
    price: 199000,
    originalPrice: 239000,
    category: 'bo-do',
    categoryName: 'Đồ mặc hàng ngày',
    gender: 'unisex',
    genderName: 'Unisex (Bé trai & Bé gái)',
    collectionId: 'mua-he-nhe-em',
    sizes: ['Size 90 (2-3 tuổi)', 'Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)'],
    colors: [
      { name: 'Vàng kem mầm nắng', hex: '#F9E7BA' },
      { name: 'Cam đất dịu nhẹ', hex: '#E29578' },
      { name: 'Xanh xám mint', hex: '#C2D8D3' }
    ],
    material: 'Vải xô muslin 2 lớp dệt sợi tre tự nhiên, kháng khuẩn sinh học',
    fabricDetail: 'Vải xô mềm như mây, điều hòa nhiệt độ cực tốt cho bé.',
    stylingTip: 'Mặc nhà hoặc dạo chơi công viên mùa hè.',
    description: 'Set đồ bộ mặc nhà và đi dạo lý tưởng cho những ngày hè oi ả. Vải xô muslin nổi tiếng với độ mềm mại như mây và khả năng điều hòa thân nhiệt cực tốt cho cơ thể bé con.',
    highlights: [
      'Càng giặt càng mềm êm, thấm hút mồ hôi cực nhanh',
      'Chống hăm bí, thoáng khí tối đa',
      'Có thể thêu tên bé dễ thương ở góc áo'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 112,
    images: [
      '/images/muslin_loungewear_set_1791213737375.jpg',
      '/images/muslin_set_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: true,
    isNew: true
  },
  {
    id: 'ao-so-mi-be-trai-lich-lam',
    name: 'Áo sơ mi Bé Trai Lịch Lãm',
    price: 249000,
    originalPrice: 289000,
    category: 'ao',
    categoryName: 'Đồ mặc hàng ngày',
    gender: 'be-trai',
    genderName: 'Bé trai',
    collectionId: 'be-vui-den-truong',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Trắng kem vintage', hex: '#FDFBF7' },
      { name: 'Xanh lanh pastel', hex: '#CBDAD5' }
    ],
    material: 'Cotton linen dệt cao cấp, ít nhăn và giữ form đứng dáng',
    fabricDetail: 'Vải cotton linen thoáng mát cho ngày dài học tập tại trường.',
    stylingTip: 'Phối cùng quần kaki hoặc quần jean.',
    description: 'Thiết kế cổ tàu thanh lịch mang hơi thở hoài niệm, tạo phong thái đĩnh đạc nhưng vẫn giữ trọn vẻ hồn nhiên của bé trai. Rất phù hợp cho các dịp lễ tựu trường, dự tiệc hay đi chúc Tết.',
    highlights: [
      'Cổ trụ mềm mại không bó sát cổ bé',
      'Cúc bấm chắc chắn bọc vải tinh xảo',
      'Dáng suông hiện đại phối đẹp cùng quần tây hay quần jean'
    ],
    stockStatus: 'con-hang',
    rating: 4.7,
    reviewsCount: 73,
    images: [
      '/images/so_mi_be_trai_lich_lam_1791555713926.jpg',
      '/images/linen_shirt_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: false,
    isNew: false
  },
  {
    id: 'ao-hoodie-cau-vong',
    name: 'Áo hoodie Cầu Vồng',
    price: 299000,
    originalPrice: 349000,
    category: 'ao',
    categoryName: 'Đồ mặc hàng ngày',
    gender: 'unisex',
    genderName: 'Unisex (Bé trai & Bé gái)',
    collectionId: 'gia-dinh-yeu-thuong',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Beige ấm áp', hex: '#F0E5D8' },
      { name: 'Nâu caramel', hex: '#A2704E' }
    ],
    material: 'Cotton nỉ chân cua 100% bông tự nhiên dầy dặn, mặt trong mịn màng',
    fabricDetail: 'Ấm áp, mềm mại, thêu cầu vồng pastel tinh xảo.',
    stylingTip: 'Phối cùng quần jean hoặc quần jogger.',
    description: 'Áo hoodie ấm áp với họa tiết cầu vồng pastel thêu tay nổi bật. Mũ áo 2 lớp dày dặn bảo vệ đầu và tai bé khi trời trở gió. Hỗ trợ in thêu tên bé ở sau lưng hoặc trước ngực.',
    highlights: [
      'Chất nỉ mềm mại không xù lông sau khi giặt',
      'Túi kangaroo rộng phía trước giữ ấm đôi bàn tay nhỏ',
      'Hỗ trợ in thêu thông điệp gia đình ý nghĩa'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 145,
    images: [
      '/images/hoodie_cau_vong_beige.jpg',
      '/images/hoodie_cau_vong_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: true,
    isNew: false
  },
  {
    id: 'quan-jean-nang-dong',
    name: 'Quần jean năng động',
    price: 279000,
    originalPrice: 320000,
    category: 'quan',
    categoryName: 'Đồ mặc hàng ngày',
    gender: 'unisex',
    genderName: 'Unisex (Bé trai & Bé gái)',
    collectionId: 'be-vui-den-truong',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Xanh denim nhạt', hex: '#8FA8BE' },
      { name: 'Xanh chàm truyền thống', hex: '#58728C' }
    ],
    material: 'Denim dệt bông cotton pha sợi co giãn spandex 5% siêu mềm',
    fabricDetail: 'Đã xử lý làm mềm giặt vi sinh không gây khô ráp da bé.',
    stylingTip: 'Phối cùng áo thun, hoodie hoặc áo sơ mi.',
    description: 'Khác biệt hoàn toàn với jean thông thường khô cứng, quần jean Mầm Kids đã qua xử lý làm mềm đặc biệt cho trẻ nhỏ. Bé có thể thoải mái leo trèo, đạp xe, vận động mà không lo gò bó khó chịu.',
    highlights: [
      'Chun chỉnh eo thông minh bên trong giúp vừa vặn theo vòng bụng bé',
      'Đường chỉ may đôi chắc chắn, chịu lực cao khi bé vui chơi',
      'Không dùng hóa chất tẩy độc hại'
    ],
    stockStatus: 'con-hang',
    rating: 4.8,
    reviewsCount: 67,
    images: [
      '/images/kids_denim_jeans_1791213816631.jpg',
      '/images/denim_jeans_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: false,
    isNew: false
  },
  {
    id: 'vay-cong-chua-pastel',
    name: 'Váy công chúa pastel',
    price: 269000,
    originalPrice: 319000,
    category: 'vay',
    categoryName: 'Váy & Đầm bé gái',
    gender: 'be-gai',
    genderName: 'Bé gái',
    collectionId: 'cong-chua-pastel',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Hồng phấn công chúa', hex: '#F3D2CB' },
      { name: 'Kem vani dịu dàng', hex: '#F9F1E2' }
    ],
    material: 'Voan tơ mềm xếp tầng, lót trong bằng lụa cotton tự nhiên mát rượi',
    fabricDetail: 'Lớp voan tơ xếp ly nhẹ tênh bồng bềnh mà không hề gây ráp ngứa.',
    stylingTip: 'Phối kèm băng đô hoa nhỏ và giày búp bê.',
    description: 'Món quà ngọt ngào biến các bé gái thành nàng công chúa nhỏ trong cổ tích. Lớp voan tơ xếp ly nhẹ tênh bồng bềnh mà không hề gây ráp ngứa, cho bé nụ cười rạng rỡ trong mọi buổi tiệc.',
    highlights: [
      'Chất voan tơ mềm không dặm ngứa da',
      'Lót lụa cotton an toàn thấm mồ hôi 100%',
      'Nơ ruy băng sau lưng có thể điều chỉnh độ rộng ngực'
    ],
    stockStatus: 'con-hang',
    rating: 5.0,
    reviewsCount: 89,
    images: [
      '/images/vay_cong_chua_pastel_1791555703651.jpg',
      '/images/princess_tulle_detail.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: false
  },
  {
    id: 'bo-do-the-thao-active-kids',
    name: 'Bộ đồ thể thao Active Kids',
    price: 299000,
    originalPrice: 349000,
    category: 'the-thao',
    categoryName: 'Đồ thể thao',
    gender: 'unisex',
    genderName: 'Unisex (Bé trai & Bé gái)',
    collectionId: 'the-thao-nhi',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Xanh navy phối trắng', hex: '#1E2D4A' },
      { name: 'Trắng mây thể thao', hex: '#FAF9F6' }
    ],
    material: 'Thun thể thao cao cấp Dry-Fit, phối sọc trắng hiện đại khỏe khoắn',
    fabricDetail: 'Bền màu và co giãn êm ái cho giờ thể dục và chạy nhảy.',
    stylingTip: 'Cả bộ phối sẵn cho bé tham gia các hoạt động ngoại khóa.',
    description: 'Bộ đồ thể thao Active Kids mang phong cách thể thao hiện đại với tone màu xanh navy khoẻ khoắn phối sọc trắng tinh tế. Chất vải co giãn 4 chiều thoáng khí, cho bé tự tin chạy nhảy suốt ngày dài.',
    highlights: [
      'Thiết kế sọc thể thao hiện đại, phong cách sporty năng động',
      'Thun Dry-Fit co giãn 4 chiều cực êm ái cho giờ thể dục',
      'Chống bai dão và bạc màu sau nhiều lần giặt sấy'
    ],
    stockStatus: 'con-hang',
    rating: 4.8,
    reviewsCount: 76,
    images: [
      '/images/active_kids_navy_white_1791289037323.jpg',
      '/images/bo_the_thao_active_detail.jpg'
    ],
    isPersonalizable: true,
    isBestSeller: false,
    isNew: false
  },
  {
    id: 'ao-khoac-gio-nha-tham-hiem-nhi',
    name: 'Áo khoác gió Nhà Thám Hiểm Nhí',
    price: 349000,
    originalPrice: 399000,
    category: 'ao-khoac',
    categoryName: 'Đồ mặc hàng ngày',
    gender: 'unisex',
    genderName: 'Unisex (Bé trai & Bé gái)',
    collectionId: 'dao-choi-cuoi-tuan',
    sizes: ['Size 100 (3-4 tuổi)', 'Size 110 (5-6 tuổi)', 'Size 120 (7-8 tuổi)', 'Size 130 (9-10 tuổi)', 'Size 140 (11-12 tuổi)'],
    colors: [
      { name: 'Vàng mù tạt dã ngoại', hex: '#CCA43B' },
      { name: 'Xanh rêu rừng thông', hex: '#526A51' },
      { name: 'Beige đá sa mạc', hex: '#DDD2C3' }
    ],
    material: 'Vải dù nano trượt nước công nghệ mới, lót cotton mềm bên trong',
    fabricDetail: 'Cản gió tốt, trượt nước nhẹ nhưng lót trong vẫn thoáng khí không đọng mồ hôi.',
    stylingTip: 'Mang theo trong ba lô khi đi dã ngoại, cắm trại hay đi học ngày mưa gió.',
    description: 'Chiếc áo khoác bảo vệ bé toàn diện trong những chuyến dã ngoại, cắm trại hay đi học ngày mưa gió. Vừa cản gió tốt, vừa kháng nước nhẹ nhưng lớp lót trong vẫn thoáng khí không đọng mồ hôi.',
    highlights: [
      'Bề mặt chống thấm nước dạng lá sen, dễ lau sạch bụi bẩn',
      'Có dải phản quang an toàn khi bé di chuyển lúc chiều tối',
      'Gấp siêu gọn vào túi nhỏ tiện mang theo trong ba lô bé'
    ],
    stockStatus: 'con-hang',
    rating: 4.9,
    reviewsCount: 104,
    images: [
      '/images/windbreaker_jacket_yellow_1791213827122.jpg',
      '/images/ao_khoac_gio_detail_1791555733192.jpg'
    ],
    isPersonalizable: false,
    isBestSeller: true,
    isNew: true
  }
];

export const SUMMER_COMBO = {
  id: 'combo-mua-he-mam-kids',
  title: 'COMBO MÙA HÈ',
  subtitle: 'Set phối năng động & thoáng mát cho bé yêu',
  item1Name: 'Áo thun cotton Gấu Nhỏ',
  item1Id: 'ao-thun-cotton-gau-nho',
  item2Name: 'Quần short năng động',
  item2Id: 'quan-short-nang-dong',
  originalPrice: 308000,
  comboPrice: 289000,
  saving: 19000,
  image: '/images/product_combo_he_1791209439469.jpg'
};

// 5 Complete Outfit Sets for "GỢI Ý PHỐI CÙNG"
export const OUTFIT_SETS: OutfitSet[] = [
  {
    id: 'outfit-dao-pho-be-trai',
    name: 'Set Dạo Phố Cuối Tuần (Bé Trai)',
    gender: 'be-trai',
    genderName: 'Bé trai',
    subtitle: 'Thanh lịch, thoáng mát & đậm chất nhí bảnh bao',
    description: 'Sự kết hợp ăn ý giữa Áo polo cotton cá sấu mềm mát, Quần short kaki đùi co giãn và Mũ bucket chồi xanh che nắng UPF 50+.',
    image: '/images/outfit_dao_pho_xanh_mat_flatlay.jpg',
    items: [
      { productId: 'ao-polo-be-ngoan', productName: 'Áo polo Bé Ngoan', price: 189000, category: 'Áo' },
      { productId: 'quan-short-kaki-nang-dong', productName: 'Quần short Kaki Năng Động', price: 159000, category: 'Quần' },
      { productId: 'mu-bucket-choi-xanh', productName: 'Mũ bucket Chồi Xanh', price: 99000, category: 'Phụ kiện' }
    ],
    originalPrice: 447000,
    comboPrice: 389000,
    saving: 58000,
    badge: 'Outfit Bé Trai Bán Chạy'
  },
  {
    id: 'outfit-mua-he-diu-dang-be-gai',
    name: 'Set Mùa Hè Dịu Dàng (Bé Gái)',
    gender: 'be-gai',
    genderName: 'Bé gái',
    subtitle: 'Tiểu thư nhí trong trẻo dưới nắng mai',
    description: 'Váy hoa thô đũi mát lạnh phối cùng Băng đô hoa nhỏ mềm êm và Đôi sandal kem mây nâng đỡ bước chân.',
    image: '/images/outfit_be_gai_vay_nang_som_1791211350114.jpg',
    items: [
      { productId: 'vay-hoa-nang-som', productName: 'Váy hoa Nắng Sớm', price: 239000, category: 'Váy' },
      { productId: 'bang-do-hoa-nho', productName: 'Băng đô Hoa Nhỏ', price: 69000, category: 'Phụ kiện' },
      { productId: 'sandal-kem-may', productName: 'Sandal Kem Mây Bé Gái', price: 149000, category: 'Giày dép' }
    ],
    originalPrice: 457000,
    comboPrice: 399000,
    saving: 58000,
    badge: 'Outfit Bé Gái Yêu Thích'
  },
  {
    id: 'outfit-kham-pha-be-trai',
    name: 'Set Khám Phá Năng Động (Bé Trai)',
    gender: 'be-trai',
    genderName: 'Bé trai',
    subtitle: 'Cậu bé thám hiểm mộc mạc và năng động',
    description: 'Sơ mi linen đũi mộc mạc phối Quần short cotton và Túi mini khám phá cho bé tha hồ thu thập những viên sỏi xinh xắn.',
    image: '/images/outfit_be_trai_kham_pha_flatlay.jpg',
    items: [
      { productId: 'ao-so-mi-linen-mat-troi-nho', productName: 'Áo sơ mi linen Mặt Trời Nhỏ', price: 249000, category: 'Áo' },
      { productId: 'quan-short-nang-dong', productName: 'Quần short năng động', price: 159000, category: 'Quần' },
      { productId: 'tui-mini-kham-pha', productName: 'Túi mini Khám Phá', price: 119000, category: 'Phụ kiện' }
    ],
    originalPrice: 527000,
    comboPrice: 459000,
    saving: 68000,
    badge: 'Phong Cách Linen'
  },
  {
    id: 'outfit-cong-chua-pastel-be-gai',
    name: 'Set Công Chúa Pastel (Bé Gái)',
    gender: 'be-gai',
    genderName: 'Bé gái',
    subtitle: 'Bồng bềnh cổ tích cho các buổi tiệc ngọt ngào',
    description: 'Đầm công chúa ánh mai với voan tơ xếp lớp, điểm thêm băng đô hoa nhỏ và chiếc túi mini kẹo bông xinh xắn.',
    image: '/images/set_cong_chua_pastel_1791211362885.jpg',
    items: [
      { productId: 'dam-cong-chua-anh-mai', productName: 'Đầm công chúa Ánh Mai', price: 289000, category: 'Đầm dạ tiệc' },
      { productId: 'bang-do-hoa-nho', productName: 'Băng đô Hoa Nhỏ', price: 69000, category: 'Phụ kiện' },
      { productId: 'tui-mini-keo-bong', productName: 'Túi mini Kẹo Bông', price: 109000, category: 'Túi xách' }
    ],
    originalPrice: 467000,
    comboPrice: 399000,
    saving: 68000,
    badge: 'Dự Tiệc & Chụp Ảnh'
  },
  {
    id: 'outfit-be-gai-ngot-ngao',
    name: 'Set Bé Gái Ngọt Ngào (Bé Gái)',
    gender: 'be-gai',
    genderName: 'Bé gái',
    subtitle: 'Áo blouse cổ sen phối chân váy mây hồng',
    description: 'Sự kết hợp ngọt lịm giữa áo blouse cổ sen viền ren và chân váy chữ A xếp ly có quần bảo hộ bên trong an toàn.',
    image: '/images/outfit_be_gai_ngot_ngao_flatlay.jpg',
    items: [
      { productId: 'ao-blouse-co-sen-diu-dang', productName: 'Áo blouse Cổ Sen Dịu Dàng', price: 199000, category: 'Áo kiểu' },
      { productId: 'chan-vay-may-hong', productName: 'Chân váy Mây Hồng', price: 169000, category: 'Chân váy' },
      { productId: 'sandal-kem-may', productName: 'Sandal Kem Mây Bé Gái', price: 149000, category: 'Giày dép' }
    ],
    originalPrice: 517000,
    comboPrice: 449000,
    saving: 68000,
    badge: 'Phối Sẵn Hoàn Hảo'
  }
];

export const COLLECTIONS = [
  {
    id: 'mua-he-nhe-em',
    title: 'Bộ sưu tập Mùa Hè Nhẹ Êm',
    tagline: 'Mát lành như giọt sương mai',
    description: 'Chất liệu lanh, xô muslin và cotton hữu cơ siêu thoáng khí giúp bé yêu tự do khám phá thiên nhiên suốt mùa hè sôi động.',
    colorScheme: 'from-[#FAF2E6] to-[#FFFDF8]',
    accentColor: '#4E8773',
    count: 6,
    image: '/images/product_vay_hoa_1791209422010.jpg'
  },
  {
    id: 'be-trai-nang-dong',
    title: 'Bộ sưu tập Bé Trai Năng Động',
    tagline: 'Khỏe khoắn, tự do khám phá thế giới',
    description: 'Áo polo thoáng mát, quần kaki mềm co giãn và mũ bucket chống nắng giúp các chàng trai nhỏ tha hồ chạy nhảy.',
    colorScheme: 'from-[#EFF5F2] to-[#FFFDF8]',
    accentColor: '#355F52',
    count: 6,
    image: '/images/test_kids_polo_1791213587392.jpg'
  },
  {
    id: 'cong-chua-pastel',
    title: 'Bộ sưu tập Công Chúa Pastel',
    tagline: 'Ngọt ngào như giấc mơ cổ tích',
    description: 'Đầm voan tơ xếp ly bồng bềnh, băng đô hoa nhỏ và túi kẹo bông biến bé gái thành nàng thơ xinh xắn trong mọi bữa tiệc.',
    colorScheme: 'from-[#FDF0F2] to-[#FFFDF8]',
    accentColor: '#F2C7CE',
    count: 5,
    image: '/images/yellow_princess_dress_1791213706637.jpg'
  },
  {
    id: 'be-vui-den-truong',
    title: 'Bộ sưu tập Bé Vui Đến Trường',
    tagline: 'Tự tin bước vào năm học mới rạng rỡ',
    description: 'Sơ mi cổ tàu, áo blouse cổ sen và quần jean co giãn chỉn chu, lịch sự mà vẫn cực kỳ êm ái cho ngày dài hoạt động tại lớp.',
    colorScheme: 'from-[#FCF5E3] to-[#FFFDF8]',
    accentColor: '#F5DFA0',
    count: 5,
    image: '/images/linen_shirt_boy_1791213667396.jpg'
  },
  {
    id: 'dao-choi-cuoi-tuan',
    title: 'Bộ sưu tập Dạo Chơi Cuối Tuần',
    tagline: 'Thanh lịch và rộn rã tiếng cười gia đình',
    description: 'Các set phối sẵn đồng điệu tone màu pastel, tiện lợi cho bố mẹ chuẩn bị trang phục dạo phố chỉ trong tích tắc.',
    colorScheme: 'from-[#FAF1ED] to-[#FFFDF8]',
    accentColor: '#F4B99B',
    count: 6,
    image: '/images/product_combo_he_1791209439469.jpg'
  },
  {
    id: 'the-thao-nhi',
    title: 'Bộ sưu tập Thể Thao Nhí',
    tagline: 'Bứt phá năng lượng cùng bạn bè',
    description: 'Co giãn 4 chiều, thun cotton dry-fit thấm hút mồ hôi siêu tốc cho các môn thể thao, bóng đá, bơi lội và đạp xe.',
    colorScheme: 'from-[#EFF5F2] to-[#FFFDF8]',
    accentColor: '#4E8773',
    count: 3,
    image: '/images/sport_set_boy_1791213687885.jpg'
  },
  {
    id: 'gia-dinh-yeu-thuong',
    title: 'Bộ sưu tập Gia Đình Yêu Thương',
    tagline: 'Đồng điệu sắc màu, chan chứa tình thân',
    description: 'Trang phục cá nhân hóa thêu tên bé, câu chúc yêu thương và những biểu tượng ngọt ngào gắn kết cả nhà.',
    colorScheme: 'from-[#FAF2DF] to-[#FFFDF8]',
    accentColor: '#355F52',
    count: 4,
    image: '/images/muslin_loungewear_set_1791213737375.jpg'
  }
];

export const SIZE_CHART = [
  { size: 'Size 90', age: '2–3 tuổi', height: '85 – 95 cm', weight: '11 – 13 kg', chest: '52 cm', shirtLength: '38 cm' },
  { size: 'Size 100', age: '3–4 tuổi', height: '95 – 105 cm', weight: '13 – 16 kg', chest: '56 cm', shirtLength: '41 cm' },
  { size: 'Size 110', age: '5–6 tuổi', height: '105 – 115 cm', weight: '16 – 20 kg', chest: '60 cm', shirtLength: '44 cm' },
  { size: 'Size 120', age: '7–8 tuổi', height: '115 – 125 cm', weight: '20 – 25 kg', chest: '64 cm', shirtLength: '48 cm' },
  { size: 'Size 130', age: '9–10 tuổi', height: '125 – 135 cm', weight: '25 – 30 kg', chest: '68 cm', shirtLength: '52 cm' },
  { size: 'Size 140', age: '11–12 tuổi', height: '135 – 145 cm', weight: '30 – 38 kg', chest: '72 cm', shirtLength: '56 cm' }
];

export function calculateSizeRecommendation(age: number, height: number, weight: number) {
  if (weight >= 31 || height >= 135 || age >= 11) {
    return {
      recommendedSize: 'Size 140',
      ageRange: '11–12 tuổi',
      heightRange: '135 – 145 cm',
      weightRange: '30 – 38 kg',
      advice: 'Size 140 là kích thước chuẩn nhất. Nếu bé có tạng người mũm mĩm hoặc thích mặc form rộng rãi giấu dáng, bố mẹ có thể hoàn toàn yên tâm chọn size này.'
    };
  }
  if (weight >= 25 || height >= 125 || age >= 9) {
    return {
      recommendedSize: 'Size 130',
      ageRange: '9–10 tuổi',
      heightRange: '125 – 135 cm',
      weightRange: '25 – 30 kg',
      advice: 'Size 130 sẽ vừa vặn và tôn dáng bé nhất. Chiều dài áo và ống quần vừa vặn cử động tự do.'
    };
  }
  if (weight >= 20 || height >= 115 || age >= 7) {
    return {
      recommendedSize: 'Size 120',
      ageRange: '7–8 tuổi',
      heightRange: '115 – 125 cm',
      weightRange: '20 – 25 kg',
      advice: 'Size 120 chuẩn cho độ tuổi tiểu học năng động. Vải co giãn tốt giúp bé thoải mái chạy nhảy.'
    };
  }
  if (weight >= 16 || height >= 105 || age >= 5) {
    return {
      recommendedSize: 'Size 110',
      ageRange: '5–6 tuổi',
      heightRange: '105 – 115 cm',
      weightRange: '16 – 20 kg',
      advice: 'Size 110 rất phù hợp. Nếu chiều cao bé ở mức cận trên (115cm), bố mẹ có thể cân nhắc chọn Size 120 để bé mặc được lâu hơn.'
    };
  }
  if (weight >= 13 || height >= 95 || age >= 3) {
    return {
      recommendedSize: 'Size 100',
      ageRange: '3–4 tuổi',
      heightRange: '95 – 105 cm',
      weightRange: '13 – 16 kg',
      advice: 'Size 100 là lựa chọn tối ưu cho bé mầm non, chất liệu 100% cotton bảo vệ tối đa làn da nhạy cảm.'
    };
  }
  return {
    recommendedSize: 'Size 90',
    ageRange: '2–3 tuổi',
    heightRange: '85 – 95 cm',
    weightRange: '11 – 13 kg',
    advice: 'Size 90 thiết kế cúc cài mềm hoặc cạp chun co giãn cực kỳ êm dịu cho các bé chập chững.'
  };
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'VND');
}
