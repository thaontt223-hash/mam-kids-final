export type Language = 'vi' | 'en';

export interface Translations {
  // Common & Branding
  brandName: string;
  brandSlogan: string;
  mamXanhTagline: string;
  ecoStoryTagline: string;

  // Navigation
  nav: {
    home: string;
    products: string;
    boys: string;
    girls: string;
    collections: string;
    mamXanh: string;
    sizeGuide: string;
    promotions: string;
    customerPolicy: string;
    shippingPolicy: string;
    returnPolicy: string;
    faq: string;
    orderLookup: string;
    mamAgain: string;
    ecoStory: string;
    shopCategory: string;
    servicesSupport: string;
    accountTracking: string;
    aboutUs: string;
    support: string;
    contact: string;
    cart: string;
    wishlist: string;
    account: string;
    search: string;
    searchPlaceholder: string;
    login: string;
    register: string;
    logout: string;
    menu: string;
    close: string;
  };

  // Promo Bar
  promo: {
    toteGift: string;
    freeShipping: string;
    hotline: string;
    easyReturn: string;
  };

  // Hero Section
  hero: {
    brand: string;
    slogan: string;
    description: string;
    shopNow: string;
    exploreMamXanh: string;
    featureEco: string;
    featureSmartSize: string;
    featureExchange: string;
    trustedParents: string;
  };

  // Categories
  categories: {
    title: string;
    subtitle: string;
    boys: string;
    boysDesc: string;
    girls: string;
    girlsDesc: string;
    sportswear: string;
    sportswearDesc: string;
    dailywear: string;
    dailywearDesc: string;
    accessories: string;
    accessoriesDesc: string;
    all: string;
  };

  // Mầm Xanh Section
  mamXanh: {
    title: string;
    tagline: string;
    subtitle: string;
    wearGreen: string;
    wearGreenDesc: string;
    learnGreen: string;
    learnGreenDesc: string;
    giveBack: string;
    giveBackDesc: string;
    exploreBtn: string;
    learnMore: string;
    statsEcoCount: string;
    statsEcoItems: string;
    statsMembers: string;
  };

  // Eco Story / Green QR
  ecoStory: {
    greenQrTitle: string;
    greenQrDesc: string;
    exploreBtn: string;
    sectionTitle: string;
    sectionSubtitle: string;
    story1Title: string;
    story1Subtitle: string;
    story2Title: string;
    story2Subtitle: string;
    storyTurtle: string;
    storyTurtleRole: string;
    readTime: string;
    targetAge: string;
    challengeTitle: string;
    challengeDone: string;
    challengeDo: string;
    rewardPoints: string;
    sustainabilityMsg: string;
    materialHighlight: string;
    completedBadge: string;
  };

  // Mầm Again
  mamAgain: {
    title: string;
    tagline: string;
    description: string;
    exploreBtn: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    step6: string;
    step1Desc: string;
    step2Desc: string;
    step3Desc: string;
    step4Desc: string;
    step5Desc: string;
    step6Desc: string;
    rewardVoucher: string;
    howToJoin: string;
    sendItems: string;
  };

  // Smart Size
  smartSize: {
    title: string;
    subtitle: string;
    age: string;
    height: string;
    weight: string;
    findBtn: string;
    disclaimer: string;
    recommendedResult: string;
    childSize: string;
    viewGuide: string;
    selectBaby: string;
    yearsOld: string;
  };

  // Mix & Match
  mixMatch: {
    title: string;
    subtitle: string;
    addOutfitBtn: string;
    addedBtn: string;
    comboPrice: string;
    originalPrice: string;
    saveAmount: string;
    outfitDetails: string;
    viewAllCombos: string;
  };

  // Product List & Filters
  products: {
    title: string;
    newArrivals: string;
    bestSellers: string;
    filters: string;
    category: string;
    size: string;
    priceRange: string;
    sort: string;
    viewDetails: string;
    addToCart: string;
    addedToCart: string;
    outOfStock: string;
    inStock: string;
    all: string;
    sortNewest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortRating: string;
    noProductsFound: string;
    itemsCount: string;
    filterByGender: string;
    filterAll: string;
    clearFilters: string;
  };

  // Product Detail
  productDetail: {
    chooseColor: string;
    chooseSize: string;
    sizeGuide: string;
    material: string;
    description: string;
    careInstructions: string;
    addToCart: string;
    buyNow: string;
    relatedProducts: string;
    reviews: string;
    materialsAndGreenStory: string;
    personalizeShirt: string;
    personalizeDesc: string;
    enterChildName: string;
    quantity: string;
    inStockCount: string;
    share: string;
    fabricFeature: string;
    stylingSuggestion: string;
    oekoTexSafe: string;
  };

  // Cart
  cart: {
    title: string;
    product: string;
    quantity: string;
    price: string;
    subtotal: string;
    total: string;
    continueShopping: string;
    checkout: string;
    emptyCart: string;
    emptyCartDesc: string;
    shopNow: string;
    discountCode: string;
    applyCode: string;
    shippingFee: string;
    freeShippingQualified: string;
    freeShippingRemaining: string;
    removeConfirm: string;
  };

  // Checkout
  checkout: {
    title: string;
    shippingInfo: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    note: string;
    shippingMethod: string;
    paymentMethod: string;
    placeOrder: string;
    orderSummary: string;
    cod: string;
    banking: string;
    momo: string;
    standardShipping: string;
    fastShipping: string;
    agreeTerms: string;
    processing: string;
  };

  // Account
  account: {
    title: string;
    personalInfo: string;
    kidProfile: string;
    orders: string;
    wishlist: string;
    vouchers: string;
    mamPoints: string;
    greenPoints: string;
    greenJourney: string;
    logout: string;
    welcomeBack: string;
    memberRank: string;
    pointsBalance: string;
    editProfile: string;
    saveProfile: string;
    addNewBaby: string;
    childName: string;
    childBirthDate: string;
    childGender: string;
    childHeight: string;
    childWeight: string;
    preferredSize: string;
    boy: string;
    girl: string;
  };

  // Login & Register
  auth: {
    login: string;
    signUp: string;
    createAccount: string;
    password: string;
    confirmPassword: string;
    forgotPassword: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    rememberMe: string;
    quickDemoLogin: string;
    memberBenefits: string;
    loginSuccess: string;
    registerSuccess: string;
  };

  // Footer
  footer: {
    tagline: string;
    aboutBrand: string;
    aboutMamKids: string;
    customerCare: string;
    connectWithUs: string;
    showroom1: string;
    showroom2: string;
    hotlineTime: string;
    returnPolicy: string;
    shippingPolicy: string;
    privacyPolicy: string;
    termsOfService: string;
    sizeGuide: string;
    faq: string;
    copyright: string;
    allRightsReserved: string;
  };

  // Toast & Common Actions
  common: {
    addedToWishlist: string;
    removedFromWishlist: string;
    addedToCart: string;
    copied: string;
    save: string;
    cancel: string;
    close: string;
    loading: string;
    backToHome: string;
    currency: string;
  };
}

export const translations: Record<Language, Translations> = {
  vi: {
    brandName: 'Mầm Kids',
    brandSlogan: 'Không chỉ mặc đẹp – cùng bé gieo thói quen xanh.',
    mamXanhTagline: 'Mặc xanh – Học xanh – Lớn lên xanh.',
    ecoStoryTagline: 'Một chiếc áo – Một câu chuyện – Một hành động xanh.',

    nav: {
      home: 'Trang chủ',
      products: 'Sản phẩm',
      boys: 'Bé trai',
      girls: 'Bé gái',
      collections: 'Bộ sưu tập',
      mamXanh: 'Mầm Xanh',
      sizeGuide: 'Hướng dẫn chọn size',
      promotions: 'Khuyến mãi',
      customerPolicy: 'Chính sách khách hàng',
      shippingPolicy: 'Chính sách giao hàng',
      returnPolicy: 'Chính sách đổi trả',
      faq: 'Câu hỏi thường gặp',
      orderLookup: 'Tra cứu đơn hàng',
      mamAgain: 'Mầm Again',
      ecoStory: 'Eco Story',
      shopCategory: 'Mua sắm',
      servicesSupport: 'Dịch vụ & Hỗ trợ',
      accountTracking: 'Tài khoản & Tra cứu',
      aboutUs: 'Giới thiệu',
      support: 'Hỗ trợ',
      contact: 'Liên hệ',
      cart: 'Giỏ hàng',
      wishlist: 'Yêu thích',
      account: 'Tài khoản',
      search: 'Tìm kiếm',
      searchPlaceholder: 'Tìm áo thun, váy hoa, bộ thể thao...',
      login: 'Đăng nhập',
      register: 'Đăng ký',
      logout: 'Đăng xuất',
      menu: 'Menu',
      close: 'Đóng'
    },

    promo: {
      toteGift: 'Tặng túi tote Mầm Kids cho mọi đơn hàng hôm nay',
      freeShipping: 'Miễn phí giao hàng từ 300.000đ toàn quốc',
      hotline: 'Hotline tư vấn tận tâm: 1900 6868',
      easyReturn: 'Đổi size miễn phí tận nhà trong 15 ngày'
    },

    hero: {
      brand: 'MẦM KIDS',
      slogan: 'Không chỉ mặc đẹp – cùng bé gieo thói quen xanh.',
      description: 'Thời trang trẻ em 3–12 tuổi, kết hợp trải nghiệm mua sắm thông minh và những câu chuyện xanh dành cho bé.',
      shopNow: 'MUA SẮM NGAY',
      exploreMamXanh: 'KHÁM PHÁ MẦM XANH',
      featureEco: '100% Sợi tự nhiên & Organic',
      featureSmartSize: 'Smart Size chuẩn xác 98%',
      featureExchange: 'Đổi hàng tận nhà trong 15 ngày',
      trustedParents: 'Được hơn 25.000+ ba mẹ tin chọn'
    },

    categories: {
      title: 'Danh mục tuyển chọn',
      subtitle: 'Thiết kế êm dịu, bảo vệ làn da non nớt của bé trong mọi hoạt động',
      boys: 'Bé trai',
      boysDesc: 'Năng động, bảnh bao & thoáng mát',
      girls: 'Bé gái',
      girlsDesc: 'Mềm mại, bồng bềnh & ngọt ngào',
      sportswear: 'Đồ thể thao',
      sportswearDesc: 'Co giãn 4 chiều cho bé tự do chạy nhảy',
      dailywear: 'Đồ mặc hàng ngày',
      dailywearDesc: 'Bông hữu cơ mềm mịn, êm ái suốt ngày dài',
      accessories: 'Phụ kiện',
      accessoriesDesc: 'Nón bucket, túi canvas, sandal êm dịu cho bé',
      all: 'Tất cả danh mục'
    },

    mamXanh: {
      title: 'MẦM XANH',
      tagline: 'Mặc xanh – Học xanh – Lớn lên xanh.',
      subtitle: 'Hệ sinh thái thời trang tuần hoàn đầu tiên dành cho thế hệ tương lai',
      wearGreen: 'MẶC XANH',
      wearGreenDesc: 'Ưu tiên chất liệu thân thiện hơn với môi trường như Organic Cotton, Bamboo và Linen tự nhiên.',
      learnGreen: 'HỌC XANH',
      learnGreenDesc: 'Mỗi sản phẩm Mầm Xanh mở ra những câu chuyện và thử thách nhỏ giúp bé khám phá thiên nhiên.',
      giveBack: 'TRAO LẠI',
      giveBackDesc: 'Mầm Again giúp kéo dài vòng đời quần áo khi bé không còn mặc vừa, nhận ngay ưu đãi mới.',
      exploreBtn: 'KHÁM PHÁ MẦM XANH',
      learnMore: 'Tìm hiểu thêm về Mầm Xanh',
      statsEcoCount: '12.400+',
      statsEcoItems: 'Sản phẩm xanh đến tay bé',
      statsMembers: '8.500+ Gia đình tham gia'
    },

    ecoStory: {
      greenQrTitle: 'Green QR – Câu chuyện thiên nhiên sau chiếc áo',
      greenQrDesc: 'Chiếc áo này đang giấu một câu chuyện nhỏ về thiên nhiên. Cùng bé khám phá nhé!',
      exploreBtn: 'KHÁM PHÁ ECO STORY',
      sectionTitle: 'Eco Story & Thử Thách Xanh',
      sectionSubtitle: 'Quét mã Green QR trên tem áo để mở ra thế giới thần tiên và nuôi dưỡng tâm hồn bé',
      story1Title: 'Hành Trình Của Bông Gòn Bé Nhỏ',
      story1Subtitle: 'Từ mầm cây vươn lên dưới nắng mai đến chiếc áo êm ái của con',
      story2Title: 'Chiếc Áo Biết Thở Của Bé',
      story2Subtitle: 'Bí mật của sợi vải tự nhiên mang làn gió mát lành ngày hè',
      storyTurtle: 'Câu chuyện của Tí Rùa',
      storyTurtleRole: 'Người bảo vệ đại dương',
      readTime: '3 phút cùng bé',
      targetAge: 'Dành cho bé 3–10 tuổi',
      challengeTitle: 'Thử Thách Xanh Cho Bé',
      challengeDone: 'Đã hoàn thành thử thách!',
      challengeDo: 'Bé đã làm được! Nhận 50 Điểm Mầm',
      rewardPoints: '+50 Điểm Mầm',
      sustainabilityMsg: 'Mỗi hạt mầm thói quen xanh hôm nay sẽ kết thành rừng cây tươi đẹp ngày mai.',
      materialHighlight: 'Chất liệu chuẩn Organic Oeko-Tex Class 1 an toàn tuyệt đối',
      completedBadge: 'Đã nhận huy hiệu'
    },

    mamAgain: {
      title: 'Mầm Again',
      tagline: 'Mầm Again – Cũ người, mới ta',
      description: 'Khi bé lớn và không còn mặc vừa, bố mẹ có thể gửi lại sản phẩm Mầm Kids để kéo dài vòng đời của quần áo.',
      exploreBtn: 'THAM GIA MẦM AGAIN',
      step1: 'Mua',
      step2: 'Mặc',
      step3: 'Học',
      step4: 'Bé lớn',
      step5: 'Trao lại',
      step6: 'Tái sử dụng',
      step1Desc: 'Ba mẹ chọn cho bé trang phục Mầm Kids an toàn, êm ái.',
      step2Desc: 'Bé tự do khám phá và vui chơi cùng trang phục.',
      step3Desc: 'Bé học thói quen xanh qua mã QR và câu chuyện Eco Story.',
      step4Desc: 'Bé cao lớn hơn và quần áo dần chật theo năm tháng.',
      step5Desc: 'Gửi lại sản phẩm cho Mầm Kids, nhận voucher 20% đơn mới.',
      step6Desc: 'Quần áo được làm sạch trao tặng hoặc tái chế thành sản phẩm mới.',
      rewardVoucher: 'Nhận voucher 20% cho mỗi món đồ gửi lại',
      howToJoin: 'Quy trình 6 bước đơn giản',
      sendItems: 'Gửi đồ cũ cho Mầm Kids'
    },

    smartSize: {
      title: 'Tìm size phù hợp cho bé',
      subtitle: 'Thuật toán gợi ý size chuẩn xác dựa trên chiều cao, cân nặng và độ tuổi thực tế của con',
      age: 'Độ tuổi của bé',
      height: 'Chiều cao (cm)',
      weight: 'Cân nặng (kg)',
      findBtn: 'Tìm size cho bé',
      disclaimer: 'Độ tuổi chỉ mang tính tham khảo. Nên ưu tiên số đo thực tế của bé.',
      recommendedResult: 'Size phù hợp nhất cho bé:',
      childSize: 'Size đề xuất',
      viewGuide: 'Xem bảng đo chi tiết',
      selectBaby: 'Chọn bé từ hồ sơ:',
      yearsOld: 'tuổi'
    },

    mixMatch: {
      title: 'Gợi ý phối đồ',
      subtitle: 'Từng set đồ được các stylist Mầm Kids phối sẵn chuẩn gu, tiện lợi cho ba mẹ',
      addOutfitBtn: 'Thêm cả set vào giỏ',
      addedBtn: 'Đã thêm set vào giỏ!',
      comboPrice: 'Giá combo ưu đãi:',
      originalPrice: 'Giá gốc:',
      saveAmount: 'Tiết kiệm ngay',
      outfitDetails: 'Gồm các sản phẩm:',
      viewAllCombos: 'Xem thêm gợi ý phối đồ'
    },

    products: {
      title: 'Tất cả sản phẩm',
      newArrivals: 'Sản phẩm mới',
      bestSellers: 'Bán chạy',
      filters: 'Bộ lọc',
      category: 'Danh mục',
      size: 'Kích thước',
      priceRange: 'Khoảng giá',
      sort: 'Sắp xếp',
      viewDetails: 'Xem chi tiết',
      addToCart: 'Thêm vào giỏ',
      addedToCart: 'Đã thêm',
      outOfStock: 'Hết hàng',
      inStock: 'Còn hàng',
      all: 'Tất cả',
      sortNewest: 'Mới nhất',
      sortPriceAsc: 'Giá: Thấp đến cao',
      sortPriceDesc: 'Giá: Cao đến thấp',
      sortRating: 'Đánh giá cao nhất',
      noProductsFound: 'Không tìm thấy sản phẩm phù hợp',
      itemsCount: 'sản phẩm',
      filterByGender: 'Bộ sưu tập',
      filterAll: 'Tất cả bé',
      clearFilters: 'Xóa bộ lọc'
    },

    productDetail: {
      chooseColor: 'Chọn màu sắc',
      chooseSize: 'Chọn size cho bé',
      sizeGuide: 'Hướng dẫn chọn size',
      material: 'Chất liệu vải',
      description: 'Mô tả chi tiết',
      careInstructions: 'Hướng dẫn giặt & bảo quản',
      addToCart: 'Thêm vào giỏ hàng',
      buyNow: 'Mua ngay',
      relatedProducts: 'Sản phẩm liên quan',
      reviews: 'Đánh giá từ phụ huynh',
      materialsAndGreenStory: 'Chất liệu & câu chuyện xanh',
      personalizeShirt: 'Cá nhân hóa cho bé',
      personalizeDesc: 'Thêu tên bé hoặc thông điệp đáng yêu lên ngực áo (miễn phí)',
      enterChildName: 'Nhập tên hoặc biệt danh của bé',
      quantity: 'Số lượng',
      inStockCount: 'sản phẩm có sẵn',
      share: 'Chia sẻ',
      fabricFeature: 'Đặc tính chất liệu',
      stylingSuggestion: 'Gợi ý phối đồ chuẩn gu',
      oekoTexSafe: 'Chứng nhận an toàn cho làn da trẻ em'
    },

    cart: {
      title: 'Giỏ hàng của bạn',
      product: 'Sản phẩm',
      quantity: 'Số lượng',
      price: 'Đơn giá',
      subtotal: 'Tạm tính',
      total: 'Tổng cộng',
      continueShopping: 'Tiếp tục mua sắm',
      checkout: 'Thanh toán',
      emptyCart: 'Giỏ hàng của bạn đang trống',
      emptyCartDesc: 'Hãy khám phá những trang phục êm ái và an lành nhất cho bé yêu nhé!',
      shopNow: 'Mua sắm ngay',
      discountCode: 'Mã giảm giá',
      applyCode: 'Áp dụng',
      shippingFee: 'Phí vận chuyển',
      freeShippingQualified: 'Đơn hàng của bạn được Miễn phí giao hàng!',
      freeShippingRemaining: 'Mua thêm {amount} để được Miễn phí giao hàng',
      removeConfirm: 'Bạn có chắc muốn xóa sản phẩm này?'
    },

    checkout: {
      title: 'Thanh toán đơn hàng',
      shippingInfo: 'Thông tin giao hàng',
      fullName: 'Họ và tên người nhận',
      phoneNumber: 'Số điện thoại liên hệ',
      email: 'Địa chỉ Email',
      address: 'Địa chỉ nhận hàng chi tiết',
      city: 'Tỉnh / Thành phố',
      note: 'Ghi chú cho shipper (ví dụ: giao giờ hành chính)',
      shippingMethod: 'Phương thức giao hàng',
      paymentMethod: 'Phương thức thanh toán',
      placeOrder: 'Đặt hàng ngay',
      orderSummary: 'Tóm tắt đơn hàng',
      cod: 'Thanh toán khi nhận hàng (COD)',
      banking: 'Chuyển khoản ngân hàng qua mã VietQR',
      momo: 'Ví điện tử MoMo',
      standardShipping: 'Giao hàng tiêu chuẩn (2–3 ngày)',
      fastShipping: 'Giao hàng hỏa tốc trong 24h',
      agreeTerms: 'Tôi đồng ý với điều khoản & chính sách của Mầm Kids',
      processing: 'Đang xử lý đơn hàng...'
    },

    account: {
      title: 'Tài khoản của tôi',
      personalInfo: 'Thông tin cá nhân',
      kidProfile: 'Hồ sơ bé',
      orders: 'Lịch sử đơn hàng',
      wishlist: 'Danh sách yêu thích',
      vouchers: 'Kho voucher của tôi',
      mamPoints: 'Điểm Mầm',
      greenPoints: 'Điểm Xanh',
      greenJourney: 'Hành trình xanh của bé',
      logout: 'Đăng xuất',
      welcomeBack: 'Chào mừng quay trở lại,',
      memberRank: 'Thành viên Hạt Mầm Thân Thiết',
      pointsBalance: 'Số dư Điểm Mầm hiện tại',
      editProfile: 'Cập nhật thông tin',
      saveProfile: 'Lưu thay đổi',
      addNewBaby: 'Thêm hồ sơ bé yêu',
      childName: 'Tên hoặc biệt danh của bé',
      childBirthDate: 'Ngày sinh của bé',
      childGender: 'Giới tính',
      childHeight: 'Chiều cao hiện tại (cm)',
      childWeight: 'Cân nặng hiện tại (kg)',
      preferredSize: 'Size áo quần thường mặc',
      boy: 'Bé trai',
      girl: 'Bé gái'
    },

    auth: {
      login: 'Đăng nhập',
      signUp: 'Đăng ký',
      createAccount: 'Tạo tài khoản',
      password: 'Mật khẩu',
      confirmPassword: 'Xác nhận mật khẩu',
      forgotPassword: 'Quên mật khẩu?',
      alreadyHaveAccount: 'Bạn đã có tài khoản?',
      dontHaveAccount: 'Bạn chưa có tài khoản?',
      rememberMe: 'Ghi nhớ đăng nhập',
      quickDemoLogin: 'Trải nghiệm nhanh với tài khoản mẫu',
      memberBenefits: 'Đặc quyền thành viên Mầm Kids',
      loginSuccess: 'Đăng nhập thành công!',
      registerSuccess: 'Đăng ký thành viên thành công!'
    },

    footer: {
      tagline: 'Không chỉ mặc đẹp – cùng bé gieo thói quen xanh.',
      aboutBrand: 'MẦM KIDS là thương hiệu thời trang trẻ em thuần Việt từ 3–12 tuổi. Chúng tôi tin rằng mỗi đứa trẻ là một mầm non quý giá, xứng đáng được lớn lên trong tình yêu thương, sự an toàn và ấm áp của gia đình.',
      aboutMamKids: 'Về Mầm Kids',
      customerCare: 'Chăm sóc khách hàng',
      connectWithUs: 'Kết nối cùng Mầm',
      showroom1: 'Showroom 1: 186 Nguyễn Thị Minh Khai, Quận 3, TP. Hồ Chí Minh',
      showroom2: 'Showroom 2: 45 Phố Huế, Quận Hai Bà Trưng, Hà Nội',
      hotlineTime: 'Hotline: 1900 6868 (8:00 – 21:00 hàng ngày)',
      returnPolicy: 'Chính sách đổi trả 15 ngày',
      shippingPolicy: 'Chính sách giao hàng',
      privacyPolicy: 'Chính sách bảo mật',
      termsOfService: 'Điều khoản dịch vụ',
      sizeGuide: 'Hướng dẫn chọn size chuẩn',
      faq: 'Câu hỏi thường gặp',
      copyright: 'Bản quyền thuộc về Mầm Kids',
      allRightsReserved: 'Đã đăng ký bản quyền. Được xây dựng với tình yêu dành cho các bé.'
    },

    common: {
      addedToWishlist: 'Đã lưu vào danh sách yêu thích',
      removedFromWishlist: 'Đã bỏ khỏi danh sách yêu thích',
      addedToCart: 'Đã thêm vào giỏ hàng!',
      copied: 'Đã sao chép!',
      save: 'Lưu',
      cancel: 'Hủy',
      close: 'Đóng',
      loading: 'Đang tải...',
      backToHome: 'Về trang chủ',
      currency: 'đ'
    }
  },

  en: {
    brandName: 'Mầm Kids',
    brandSlogan: 'More Than Style – Growing Green Habits Together.',
    mamXanhTagline: 'Wear Green. Learn Green. Grow Green.',
    ecoStoryTagline: 'One Outfit. One Story. One Green Action.',

    nav: {
      home: 'Home',
      products: 'Products',
      boys: 'Boys',
      girls: 'Girls',
      collections: 'Collections',
      mamXanh: 'Mầm Xanh',
      sizeGuide: 'Size Guide',
      promotions: 'Promotions',
      customerPolicy: 'Customer Policies',
      shippingPolicy: 'Shipping Policy',
      returnPolicy: 'Return & Exchange Policy',
      faq: 'Frequently Asked Questions',
      orderLookup: 'Track Order',
      mamAgain: 'Mầm Again',
      ecoStory: 'Eco Story',
      shopCategory: 'Shop by Category',
      servicesSupport: 'Services & Support',
      accountTracking: 'Account & Tracking',
      aboutUs: 'About Us',
      support: 'Support',
      contact: 'Contact',
      cart: 'Cart',
      wishlist: 'Wishlist',
      account: 'Account',
      search: 'Search',
      searchPlaceholder: 'Search t-shirts, dresses, sportswear...',
      login: 'Log In',
      register: 'Sign Up',
      logout: 'Log Out',
      menu: 'Menu',
      close: 'Close'
    },

    promo: {
      toteGift: 'Free Mầm Kids tote with every order today',
      freeShipping: 'Free shipping on orders from 300,000 VND nationwide',
      hotline: 'Dedicated support hotline: 1900 6868',
      easyReturn: 'Free doorstep size exchange within 15 days'
    },

    hero: {
      brand: 'MẦM KIDS',
      slogan: 'More Than Style – Growing Green Habits Together.',
      description: "Kids’ fashion for ages 3–12, combining smart shopping experiences with meaningful green stories for children.",
      shopNow: 'SHOP NOW',
      exploreMamXanh: 'EXPLORE MẦM XANH',
      featureEco: '100% Natural & Organic Fibers',
      featureSmartSize: '98% Accurate Smart Size AI',
      featureExchange: '15-Day Doorstep Exchange',
      trustedParents: 'Trusted by over 25,000+ parents'
    },

    categories: {
      title: 'Curated Categories',
      subtitle: 'Gentle, skin-safe designs to protect your child’s sensitive skin in every adventure',
      boys: 'Boys',
      boysDesc: 'Active, handsome & breathable',
      girls: 'Girls',
      girlsDesc: 'Soft, breezy & sweet styles',
      sportswear: 'Sportswear',
      sportswearDesc: '4-way stretch for total freedom to move',
      dailywear: 'Daily Essentials',
      dailywearDesc: 'Ultra-soft organic cotton for all-day coziness',
      accessories: 'Accessories',
      accessoriesDesc: 'Bucket hats, canvas bags, gentle sandals',
      all: 'All Categories'
    },

    mamXanh: {
      title: 'MẦM XANH',
      tagline: 'Wear Green. Learn Green. Grow Green.',
      subtitle: 'The first circular kids’ fashion ecosystem for future generations',
      wearGreen: 'WEAR GREEN',
      wearGreenDesc: 'Prioritizing materials that are friendlier to the environment like Organic Cotton, Bamboo, and natural Linen.',
      learnGreen: 'LEARN GREEN',
      learnGreenDesc: 'Each Mầm Xanh product opens up stories and small challenges that help children explore nature.',
      giveBack: 'GIVE BACK',
      giveBackDesc: 'Mầm Again helps extend the life of children’s clothing when they outgrow it, earning rewards for new outfits.',
      exploreBtn: 'EXPLORE MẦM XANH',
      learnMore: 'Discover Mầm Xanh System',
      statsEcoCount: '12,400+',
      statsEcoItems: 'Eco garments delivered',
      statsMembers: '8,500+ Green Families'
    },

    ecoStory: {
      greenQrTitle: 'Green QR – The Nature Story Behind Your Shirt',
      greenQrDesc: 'This outfit holds a little story about nature. Let’s explore it together!',
      exploreBtn: 'EXPLORE ECO STORY',
      sectionTitle: 'Eco Story & Green Challenges',
      sectionSubtitle: 'Scan the Green QR code on the clothing tag to enter a magical world and nurture your child’s love for nature',
      story1Title: 'The Journey of Little Cotton Bud',
      story1Subtitle: 'From a tiny seed beneath the morning sun to your cozy daily shirt',
      story2Title: 'The Breathable Shirt',
      story2Subtitle: 'The secret of natural plant fibers bringing summer breezes',
      storyTurtle: 'Tí the Turtle’s Story',
      storyTurtleRole: 'Ocean Protector',
      readTime: '3 min read with child',
      targetAge: 'Ages 3–10',
      challengeTitle: 'Green Challenge for Kids',
      challengeDone: 'Challenge Completed!',
      challengeDo: 'I did it! Claim 50 Mầm Points',
      rewardPoints: '+50 Mầm Points',
      sustainabilityMsg: 'Every green habit planted today grows into a flourishing forest tomorrow.',
      materialHighlight: 'Oeko-Tex Class 1 certified organic cotton safe for baby skin',
      completedBadge: 'Badge Earned'
    },

    mamAgain: {
      title: 'Mầm Again',
      tagline: 'Mầm Again – Give Clothes a New Life',
      description: 'When children outgrow their clothes, parents can return eligible Mầm Kids items to help extend their useful life.',
      exploreBtn: 'JOIN MẦM AGAIN',
      step1: 'Buy',
      step2: 'Wear',
      step3: 'Learn',
      step4: 'Outgrow',
      step5: 'Give Back',
      step6: 'Reuse',
      step1Desc: 'Parents choose safe, cozy Mầm Kids clothes for their child.',
      step2Desc: 'Kids freely explore and play in breathable natural fabrics.',
      step3Desc: 'Kids learn green habits through the Green QR Eco Story.',
      step4Desc: 'Your child grows taller and clothes start to feel snug.',
      step5Desc: 'Send items back to Mầm Kids and receive a 20% voucher.',
      step6Desc: 'Garments are sanitized for donation or recycled into new items.',
      rewardVoucher: 'Receive a 20% voucher for every returned garment',
      howToJoin: 'Simple 6-Step Circular Process',
      sendItems: 'Send Outgrown Clothes'
    },

    smartSize: {
      title: 'Find the Right Size for Your Child',
      subtitle: 'Our smart algorithm recommends the perfect fit based on your child’s height, weight, and age',
      age: 'Child’s Age',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
      findBtn: 'Find My Child’s Size',
      disclaimer: 'Age is only a reference. Please prioritize your child’s actual measurements.',
      recommendedResult: 'Best fit for your child:',
      childSize: 'Recommended Size',
      viewGuide: 'View detailed size chart',
      selectBaby: 'Select from profile:',
      yearsOld: 'years old'
    },

    mixMatch: {
      title: 'Mix & Match',
      subtitle: 'Curated outfits pre-styled by Mầm Kids stylists for easy, elegant dressing',
      addOutfitBtn: 'Add Full Outfit to Cart',
      addedBtn: 'Full Outfit Added!',
      comboPrice: 'Bundle price:',
      originalPrice: 'Original:',
      saveAmount: 'Save',
      outfitDetails: 'Includes items:',
      viewAllCombos: 'Explore More Outfit Ideas'
    },

    products: {
      title: 'All Products',
      newArrivals: 'New Arrivals',
      bestSellers: 'Best Sellers',
      filters: 'Filters',
      category: 'Category',
      size: 'Size',
      priceRange: 'Price Range',
      sort: 'Sort',
      viewDetails: 'View Details',
      addToCart: 'Add to Cart',
      addedToCart: 'Added',
      outOfStock: 'Out of Stock',
      inStock: 'In Stock',
      all: 'All',
      sortNewest: 'Newest',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortRating: 'Highest Rated',
      noProductsFound: 'No products found matching your filters',
      itemsCount: 'items',
      filterByGender: 'Collections',
      filterAll: 'All Kids',
      clearFilters: 'Clear Filters'
    },

    productDetail: {
      chooseColor: 'Choose Color',
      chooseSize: 'Choose Size',
      sizeGuide: 'Size Guide',
      material: 'Material',
      description: 'Description',
      careInstructions: 'Care Instructions',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      relatedProducts: 'You May Also Like',
      reviews: 'Parent Reviews',
      materialsAndGreenStory: 'Materials & Green Story',
      personalizeShirt: 'Personalize for Child',
      personalizeDesc: 'Embroider your child’s name or sweet initial on the chest (free)',
      enterChildName: 'Enter child’s name or nickname',
      quantity: 'Quantity',
      inStockCount: 'items available',
      share: 'Share',
      fabricFeature: 'Fabric Features',
      stylingSuggestion: 'Style Inspiration',
      oekoTexSafe: 'Certified safe for sensitive children’s skin'
    },

    cart: {
      title: 'Shopping Cart',
      product: 'Product',
      quantity: 'Quantity',
      price: 'Price',
      subtotal: 'Subtotal',
      total: 'Total',
      continueShopping: 'Continue Shopping',
      checkout: 'Checkout',
      emptyCart: 'Your cart is empty',
      emptyCartDesc: 'Explore our gentle, organic outfits for your child today!',
      shopNow: 'Shop Now',
      discountCode: 'Discount Code',
      applyCode: 'Apply',
      shippingFee: 'Shipping Fee',
      freeShippingQualified: 'Your order qualifies for Free Shipping!',
      freeShippingRemaining: 'Add {amount} more to get Free Shipping',
      removeConfirm: 'Are you sure you want to remove this item?'
    },

    checkout: {
      title: 'Checkout',
      shippingInfo: 'Shipping Information',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      email: 'Email Address',
      address: 'Shipping Address',
      city: 'City / Province',
      note: 'Order Note (e.g., deliver during business hours)',
      shippingMethod: 'Shipping Method',
      paymentMethod: 'Payment Method',
      placeOrder: 'Place Order',
      orderSummary: 'Order Summary',
      cod: 'Cash on Delivery (COD)',
      banking: 'Bank Transfer via VietQR',
      momo: 'MoMo E-Wallet',
      standardShipping: 'Standard Delivery (2–3 days)',
      fastShipping: 'Express 24h Delivery',
      agreeTerms: 'I agree to Mầm Kids Terms & Policies',
      processing: 'Processing Order...'
    },

    account: {
      title: 'My Account',
      personalInfo: 'Personal Information',
      kidProfile: 'My Kid Profile',
      orders: 'Orders',
      wishlist: 'Wishlist',
      vouchers: 'Vouchers',
      mamPoints: 'Mầm Points',
      greenPoints: 'Green Points',
      greenJourney: 'My Child’s Green Journey',
      logout: 'Log Out',
      welcomeBack: 'Welcome back,',
      memberRank: 'Close Sprout Member',
      pointsBalance: 'Current Mầm Points Balance',
      editProfile: 'Edit Profile',
      saveProfile: 'Save Changes',
      addNewBaby: 'Add Child Profile',
      childName: 'Child’s Name or Nickname',
      childBirthDate: 'Date of Birth',
      childGender: 'Gender',
      childHeight: 'Current Height (cm)',
      childWeight: 'Current Weight (kg)',
      preferredSize: 'Regular Clothing Size',
      boy: 'Boy',
      girl: 'Girl'
    },

    auth: {
      login: 'Log In',
      signUp: 'Sign Up',
      createAccount: 'Create Account',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don’t have an account?',
      rememberMe: 'Remember Me',
      quickDemoLogin: 'Quick Demo Sign In',
      memberBenefits: 'Mầm Kids Member Privileges',
      loginSuccess: 'Logged in successfully!',
      registerSuccess: 'Account registered successfully!'
    },

    footer: {
      tagline: 'More Than Style, Growing Green Habits Together.',
      aboutBrand: 'MẦM KIDS is a Vietnamese children’s clothing brand for ages 3–12. We believe every child is a precious sprout who deserves to grow up in love, comfort, and sustainable safety.',
      aboutMamKids: 'About Mầm Kids',
      customerCare: 'Customer Care',
      connectWithUs: 'Connect With Us',
      showroom1: 'Showroom 1: 186 Nguyen Thi Minh Khai, District 3, Ho Chi Minh City',
      showroom2: 'Showroom 2: 45 Pho Hue, Hai Ba Trung District, Hanoi',
      hotlineTime: 'Hotline: 1900 6868 (8:00 AM – 9:00 PM daily)',
      returnPolicy: '15-Day Exchange Policy',
      shippingPolicy: 'Shipping Policy',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      sizeGuide: 'Accurate Size Guide',
      faq: 'Frequently Asked Questions',
      copyright: 'Copyright by Mầm Kids',
      allRightsReserved: 'All rights reserved. Crafted with love for children.'
    },

    common: {
      addedToWishlist: 'Saved to wishlist',
      removedFromWishlist: 'Removed from wishlist',
      addedToCart: 'Added to cart!',
      copied: 'Copied to clipboard!',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      loading: 'Loading...',
      backToHome: 'Back to Home',
      currency: 'VND'
    }
  }
};

// Bilingual dictionary for product names
export const PRODUCT_NAME_TRANSLATIONS: Record<string, { vi: string; en: string }> = {
  'ao-polo-be-ngoan': {
    vi: 'Áo polo Bé Ngoan',
    en: 'Good Boy Polo Shirt'
  },
  'ao-so-mi-linen-mat-troi-nho': {
    vi: 'Áo sơ mi linen Mặt Trời Nhỏ',
    en: 'Little Sun Linen Shirt'
  },
  'set-dao-pho-xanh-mat': {
    vi: 'Set dạo phố Xanh Mát',
    en: 'Cool Green Street Set'
  },
  'quan-short-kaki-nang-dong': {
    vi: 'Quần short Kaki Năng Động',
    en: 'Active Khaki Shorts'
  },
  'hoodie-buoc-chay-nhi': {
    vi: 'Áo hoodie Bước Chạy Nhí',
    en: 'Little Steps Hoodie'
  },
  'bo-the-thao-san-choi-vui': {
    vi: 'Bộ đồ thể thao Sân Chơi Vui',
    en: 'Playground Fun Sport Set'
  },
  'mu-bucket-choi-xanh': {
    vi: 'Mũ bucket Chồi Xanh',
    en: 'Green Sprout Bucket Hat'
  },
  'tui-mini-kham-pha': {
    vi: 'Túi mini Khám Phá',
    en: 'Explorer Mini Crossbody Bag'
  },
  'sandal-be-trai-nang-dong': {
    vi: 'Sandal da Bé Trai Năng Động',
    en: 'Active Boys Leather Sandals'
  },
  'vay-hoa-nang-som': {
    vi: 'Váy hoa Nắng Sớm',
    en: 'Early Sunshine Floral Dress'
  },
  'dam-pastel-canh-buom': {
    vi: 'Đầm pastel Cánh Bướm',
    en: 'Butterfly Pastel Dress'
  },
  'ao-blouse-co-sen-diu-dang': {
    vi: 'Áo blouse cổ sen Dịu Dàng',
    en: 'Gentle Peter Pan Blouse'
  },
  'chan-vay-may-hong': {
    vi: 'Chân váy Mây Hồng',
    en: 'Pink Cloud Skirt'
  },
  'set-be-gai-ngot-ngao': {
    vi: 'Set bé gái Ngọt Ngào',
    en: 'Sweet Little Girl Set'
  },
  'dam-cong-chua-anh-mai': {
    vi: 'Đầm công chúa Ánh Mai',
    en: 'Morning Glow Princess Gown'
  },
  'bang-do-hoa-nho': {
    vi: 'Băng đô Hoa Nhỏ',
    en: 'Tiny Flower Headband'
  },
  'tui-mini-keo-bong': {
    vi: 'Túi mini Kẹo Bông',
    en: 'Cotton Candy Mini Bag'
  },
  'sandal-kem-may': {
    vi: 'Sandal kem Mây',
    en: 'Cream Cloud Sandals'
  },
  'ao-thun-cotton-gau-nho': {
    vi: 'Áo thun cotton Gấu Nhỏ',
    en: 'Little Bear Cotton T-Shirt'
  },
  'vay-hoa-mua-he': {
    vi: 'Váy hoa mùa hè',
    en: 'Summer Floral Dress'
  },
  'quan-short-nang-dong': {
    vi: 'Quần short năng động',
    en: 'Active Shorts'
  },
  'do-bo-ngay-nang': {
    vi: 'Đồ bộ Ngày Nắng',
    en: 'Sunny Day Loungewear Set'
  },
  'ao-so-mi-be-trai-lich-lam': {
    vi: 'Áo sơ mi bé trai Lịch Lãm',
    en: 'Gentleman Boys Shirt'
  },
  'ao-hoodie-cau-vong': {
    vi: 'Áo hoodie Cầu Vồng',
    en: 'Rainbow Hoodie'
  },
  'quan-jean-nang-dong': {
    vi: 'Quần jean Năng Động',
    en: 'Active Denim Jeans'
  },
  'vay-cong-chua-pastel': {
    vi: 'Váy công chúa pastel',
    en: 'Pastel Princess Dress'
  },
  'bo-do-the-thao-active-kids': {
    vi: 'Bộ đồ thể thao Active Kids',
    en: 'Active Kids Sports Set'
  },
  'ao-khoac-gio-nha-tham-hiem-nhi': {
    vi: 'Áo khoác gió Nhà Thám Hiểm Nhí',
    en: 'Little Explorer Windbreaker'
  }
};

// Bilingual dictionary for outfit set names
export const OUTFIT_NAME_TRANSLATIONS: Record<string, { vi: string; en: string }> = {
  'combo-mua-he-mam-kids': {
    vi: 'Combo Mùa Hè Mầm Kids',
    en: 'Mầm Kids Summer Combo'
  },
  'outfit-dao-pho-be-trai': {
    vi: 'Set Dạo Phố Bảnh Bao Bé Trai',
    en: 'Smart Explorer Boy Set'
  },
  'outfit-mua-he-diu-dang-be-gai': {
    vi: 'Set Dịu Êm Nắng Mai Bé Gái',
    en: 'Gentle Morning Girl Set'
  },
  'outfit-kham-pha-be-trai': {
    vi: 'Set Thám Hiểm Năng Động Bé Trai',
    en: 'Active Adventurer Boy Set'
  },
  'outfit-cong-chua-pastel-be-gai': {
    vi: 'Set Công Chúa Dạ Tiệc Bé Gái',
    en: 'Pastel Princess Party Set'
  },
  'outfit-be-gai-ngot-ngao': {
    vi: 'Set Dạo Chơi Ngọt Ngào Bé Gái',
    en: 'Sweet Playtime Girl Set'
  }
};

// Bilingual dictionary for categories
export const CATEGORY_NAME_TRANSLATIONS: Record<string, { vi: string; en: string }> = {
  'all': { vi: 'Tất cả sản phẩm', en: 'All Products' },
  'ao': { vi: 'Áo thun & sơ mi', en: 'T-Shirts & Shirts' },
  'quan': { vi: 'Quần short & jean', en: 'Shorts & Jeans' },
  'vay': { vi: 'Váy & đầm công chúa', en: 'Dresses & Skirts' },
  'bo-do': { vi: 'Đồ bộ mặc nhà', en: 'Loungewear Sets' },
  'ao-khoac': { vi: 'Áo khoác & hoodie', en: 'Jackets & Hoodies' },
  'the-thao': { vi: 'Đồ thể thao', en: 'Sportswear' },
  'phu-kien': { vi: 'Phụ kiện cho bé', en: 'Accessories' }
};

// Bilingual dictionary for colors
export const COLOR_NAME_TRANSLATIONS: Record<string, { vi: string; en: string }> = {
  'Xanh sage dịu mát': { vi: 'Xanh sage dịu mát', en: 'Cool Sage Green' },
  'Beige cát mộc': { vi: 'Beige cát mộc', en: 'Natural Sand Beige' },
  'Trắng mây ban mai': { vi: 'Trắng mây ban mai', en: 'Morning Cloud White' },
  'Trắng kem vintage': { vi: 'Trắng kem vintage', en: 'Vintage Cream White' },
  'Xanh rêu nhạt': { vi: 'Xanh rêu nhạt', en: 'Soft Moss Green' },
  'Vàng bơ nhạt': { vi: 'Vàng bơ nhạt', en: 'Light Butter Yellow' },
  'Xanh baby blue': { vi: 'Xanh baby blue', en: 'Baby Blue' },
  'Beige cát': { vi: 'Beige cát', en: 'Sand Beige' },
  'Nâu caramel': { vi: 'Nâu caramel', en: 'Caramel Brown' },
  'Xanh navy': { vi: 'Xanh navy', en: 'Navy Blue' },
  'Xám lông chuột': { vi: 'Xám lông chuột', en: 'Heather Grey' },
  'Xanh lá mạ': { vi: 'Xanh lá mạ', en: 'Sprout Green' },
  'Xanh olive': { vi: 'Xanh olive', en: 'Olive Green' },
  'Xanh mint': { vi: 'Xanh mint', en: 'Mint Green' },
  'Hồng đào pastel': { vi: 'Hồng đào pastel', en: 'Pastel Peach Pink' },
  'Vàng nhạt': { vi: 'Vàng nhạt', en: 'Pale Yellow' },
  'Tím lilac pastel': { vi: 'Tím lilac pastel', en: 'Pastel Lilac' },
  'Hồng phấn': { vi: 'Hồng phấn', en: 'Soft Pink' },
  'Hồng pastel': { vi: 'Hồng pastel', en: 'Pastel Pink' },
  'Xanh dương nhạt': { vi: 'Xanh dương nhạt', en: 'Light Blue' }
};
