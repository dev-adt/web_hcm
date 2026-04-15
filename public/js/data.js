// =====================================================
// DATA.JS — Nội dung đầy đủ TTHCM (50+ câu quiz, nội dung chương)
// =====================================================

const CHAPTERS = [
  { id: 1, title: "Chương 1", subtitle: "Khái niệm, nguồn gốc, quá trình hình thành và phát triển tư tưởng Hồ Chí Minh", icon: "📖", color: "#C41E3A" },
  { id: 2, title: "Chương 2", subtitle: "Tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội", icon: "🏴", color: "#D4A017" },
  { id: 3, title: "Chương 3", subtitle: "Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam", icon: "⭐", color: "#1565C0" },
  { id: 4, title: "Chương 4", subtitle: "Tư tưởng Hồ Chí Minh về đại đoàn kết dân tộc và đoàn kết quốc tế", icon: "🤝", color: "#2E7D32" },
  { id: 5, title: "Chương 5", subtitle: "Tư tưởng Hồ Chí Minh về dân chủ và nhà nước của nhân dân, do nhân dân, vì nhân dân", icon: "🏛️", color: "#6A1B9A" },
  { id: 6, title: "Chương 6", subtitle: "Tư tưởng Hồ Chí Minh về văn hoá, đạo đức và con người", icon: "🌟", color: "#00838F" },
];

// ─── Nội dung chi tiết từng chương ─────────────────
const CHAPTER_CONTENT = {
  1: {
    summary: "Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam. Được hình thành và phát triển qua nhiều giai đoạn lịch sử.",
    keyPoints: [
      { icon: "🌱", title: "Định nghĩa", content: "Hệ thống quan điểm toàn diện, sâu sắc về cách mạng Việt Nam. Kết quả vận dụng, phát triển sáng tạo Mác-Lênin trong điều kiện Việt Nam." },
      { icon: "🔑", title: "3 Nguồn gốc lý luận", content: "① Truyền thống tốt đẹp dân tộc Việt Nam ② Tinh hoa văn hoá nhân loại (phương Đông & Tây) ③ Chủ nghĩa Mác-Lênin (nguồn gốc CHỦ YẾU, quyết định bản chất cách mạng, khoa học)" },
      { icon: "⏳", title: "5 Giai đoạn hình thành", content: "1890-1911: Hình thành tư tưởng yêu nước → 1911-1920: Bổ sung, tìm tòi → 1920-1930: Hình thành cơ bản → 1930-1945: Vượt qua thử thách → 1945-1969: Phát triển hoàn thiện" },
      { icon: "👤", title: "Nhân tố chủ quan", content: "Phẩm chất cá nhân xuất sắc: tư duy độc lập sáng tạo, tầm nhìn chiến lược, lòng yêu nước thương dân, ham học hỏi, dày công nghiên cứu." },
    ],
    quotes: [
      { text: "Đọc Luận cương của Lênin năm 1920, tôi vui mừng, tin tưởng đến phát khóc lên. Luận cương đó đã chỉ cho chúng tôi thấy con đường đúng đắn.", author: "Hồ Chí Minh, 1960" }
    ],
    milestones: [
      { year: "1890", event: "Nguyễn Sinh Cung (HCM) ra đời tại làng Kim Liên, Nghệ An" },
      { year: "1911", event: "Ra đi tìm đường cứu nước trên tàu Latouche-Tréville" },
      { year: "1919", event: "Gửi Bản yêu sách 8 điểm đến Hội nghị Versailles" },
      { year: "1920", event: "Đọc Luận cương Lênin → Tìm ra con đường cứu nước" },
      { year: "1930", event: "Thành lập Đảng Cộng sản Việt Nam ngày 3/2" },
      { year: "1945", event: "Đọc Tuyên ngôn Độc lập, lập nước Việt Nam DCCH" },
    ]
  },
  2: {
    summary: "Độc lập dân tộc gắn liền với chủ nghĩa xã hội là sợi chỉ đỏ xuyên suốt tư tưởng HCM. Hai mục tiêu này gắn bó hữu cơ, bổ sung và thúc đẩy lẫn nhau.",
    keyPoints: [
      { icon: "🏴", title: "Độc lập dân tộc", content: "Quyền thiêng liêng bất khả xâm phạm. Độc lập phải THỰC SỰ, HOÀN TOÀN về chính trị, kinh tế, quân sự, ngoại giao và văn hoá. Gắn liền với tự do, hạnh phúc của nhân dân." },
      { icon: "⭐", title: "Bản chất CNXH", content: "Làm cho nhân dân thoát nạn bần cùng. Mọi người có công ăn việc làm, ăn no mặc ấm, học hành. Xã hội bình đẳng, không áp bức bóc lột. Ưu việt hơn xã hội cũ." },
      { icon: "🔗", title: "Mối quan hệ", content: "Độc lập dân tộc là ĐIỀU KIỆN TIÊN QUYẾT để thực hiện CNXH. CNXH là CON ĐƯỜNG DUY NHẤT đảm bảo nền độc lập thực sự và bền vững." },
      { icon: "🛤️", title: "Con đường quá độ", content: "Quá độ GIÁN TIẾP: từ thuộc địa nửa phong kiến → CNXH (bỏ qua TBCN). Lâu dài, gian khổ, phức tạp, phải qua nhiều bước, nhiều giai đoạn." },
    ],
    quotes: [
      { text: "Không có gì quý hơn độc lập, tự do.", author: "Hồ Chí Minh, 1965" },
      { text: "Nước độc lập mà dân không được hưởng hạnh phúc tự do thì độc lập cũng chẳng có nghĩa lý gì.", author: "Hồ Chí Minh, 1945" }
    ],
    milestones: [
      { year: "1930", event: "Cương lĩnh đầu tiên — xác định mục tiêu độc lập dân tộc, CNXH" },
      { year: "1945", event: "Tuyên ngôn Độc lập: 'Tất cả mọi người đều sinh ra bình đẳng'" },
      { year: "1954", event: "Giải phóng miền Bắc, bắt đầu xây dựng CNXH" },
      { year: "1965", event: "Câu nói nổi tiếng: 'Không có gì quý hơn độc lập, tự do'" },
    ]
  },
  3: {
    summary: "Đảng Cộng sản Việt Nam do HCM sáng lập và rèn luyện là nhân tố quyết định thắng lợi của cách mạng. Đảng phải xây dựng theo những nguyên tắc vững chắc.",
    keyPoints: [
      { icon: "🏛️", title: "Sự ra đời", content: "3/2/1930 tại Hương Cảng (HK). Sáng lập: Nguyễn Ái Quốc. Hợp nhất 3 tổ chức CS. Bước ngoặt VĨ ĐẠI của CMVN. Đảng của giai cấp công nhân VÀ của dân tộc VN." },
      { icon: "⚙️", title: "5 Nguyên tắc xây dựng", content: "① Tập trung dân chủ (CƠ BẢN NHẤT) ② Tự phê bình và phê bình ③ Kỷ luật nghiêm minh, tự giác ④ Đoàn kết thống nhất trong Đảng ⑤ Gắn bó mật thiết với nhân dân" },
      { icon: "📚", title: "Nền tảng tư tưởng", content: "Chủ nghĩa Mác-Lênin là kim chỉ nam hành động. Kết hợp lý luận với thực tiễn VN. Không thực dụng, không giáo điều." },
      { icon: "🌟", title: "Đảng cầm quyền", content: "Lãnh đạo toàn diện nhưng không bao biện, làm thay. Cán bộ đảng viên là CÔNG BỘC, ĐẦY TỚ của nhân dân. Chống: quan liêu, tham nhũng, xa dân." },
    ],
    quotes: [
      { text: "Đảng ta là đạo đức, là văn minh, là thống nhất, là độc lập, là hoà bình và tiến bộ.", author: "Hồ Chí Minh" },
      { text: "Không có Đảng thì không có cách mạng. Không có cách mạng thì không có giải phóng.", author: "Hồ Chí Minh" }
    ],
    milestones: [
      { year: "3/2/1930", event: "Hội nghị hợp nhất thành lập Đảng Cộng sản Việt Nam" },
      { year: "1930", event: "Cương lĩnh chính trị đầu tiên do HCM soạn thảo" },
      { year: "1951", event: "Đại hội lần II — Đảng Lao động Việt Nam ra hoạt động công khai" },
      { year: "1976", event: "Đại hội lần IV — Đổi tên thành Đảng Cộng sản Việt Nam" },
    ]
  },
  4: {
    summary: "Đại đoàn kết dân tộc là chiến lược cơ bản, lâu dài, nhất quán của cách mạng Việt Nam. Đoàn kết là sức mạnh tổng hợp tạo nên chiến thắng.",
    keyPoints: [
      { icon: "💪", title: "Vai trò", content: "CHIẾN LƯỢC cơ bản, lâu dài, nhất quán. NGUỒN SỨC MẠNH tổng hợp. Nhân tố QUYẾT ĐỊNH THẮNG LỢI. 'Đoàn kết = thành công. Chia rẽ = thất bại.'" },
      { icon: "🏗️", title: "Nền tảng", content: "Liên minh CÔNG – NÔNG – TRÍ THỨC: CN=lãnh đạo, NN=lực lượng chủ yếu, TT=nền tảng quan trọng. Hình thức tổ chức: Mặt trận Dân tộc Thống nhất." },
      { icon: "🌍", title: "Đoàn kết quốc tế", content: "Với phong trào CS và công nhân quốc tế. Với phong trào giải phóng dân tộc. Với lực lượng hoà bình, dân chủ tiến bộ thế giới. Nguyên tắc: trong sáng, chân thành." },
      { icon: "📌", title: "Nguyên tắc", content: "Trên cơ sở LỢI ÍCH CHUNG của dân tộc. Có lý, có tình. Không phân biệt giai cấp, tôn giáo, dân tộc. Đoàn kết thực chất, không hình thức." },
    ],
    quotes: [
      { text: "Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công.", author: "Hồ Chí Minh, 1955" },
      { text: "Dân ta có một lòng nồng nàn yêu nước. Đó là truyền thống quý báu của ta.", author: "Hồ Chí Minh" }
    ],
    milestones: [
      { year: "1930", event: "Hội Phản đế Đồng Minh — Mặt trận đầu tiên" },
      { year: "1941", event: "Mặt trận Việt Minh ra đời, tập hợp toàn dân" },
      { year: "1955", event: "Đại hội MTTQ VN lần I — câu nói 'Đoàn kết, đoàn kết, đại đoàn kết'" },
      { year: "1977", event: "Mặt trận Tổ quốc Việt Nam hợp nhất thống nhất" },
    ]
  },
  5: {
    summary: "Nhà nước của nhân dân, do nhân dân, vì nhân dân là tư tưởng cốt lõi về thể chế chính trị. Dân chủ vừa là mục tiêu, vừa là động lực của sự phát triển.",
    keyPoints: [
      { icon: "🏛️", title: "Bản chất Nhà nước", content: "CỦA nhân dân — tất cả quyền lực thuộc về nhân dân. DO nhân dân — do nhân dân làm chủ, bầu ra, kiểm tra. VÌ nhân dân — mọi hoạt động phục vụ lợi ích nhân dân." },
      { icon: "🗳️", title: "Dân chủ", content: "'Dân là chủ và dân làm chủ'. Vừa là MỤC TIÊU vừa là ĐỘNG LỰC. Thực chất, không hình thức. Dân chủ trong Đảng, trong Nhà nước, trong xã hội." },
      { icon: "⚖️", title: "Pháp quyền", content: "Nhà nước PHÁP QUYỀN XHCN. Thượng tôn pháp luật. Cán bộ Nhà nước là CÔNG BỘC của dân. Xử lý nghiêm mọi vi phạm dù bất kỳ ai." },
      { icon: "🛡️", title: "Hiệu quả", content: "Nhà nước trong sạch, vững mạnh. Chống 4 nguy cơ: quan liêu, tham nhũng, lãng phí, xa rời quần chúng. Cải cách hành chính liên tục." },
    ],
    quotes: [
      { text: "Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ.", author: "Hồ Chí Minh, 1951" },
      { text: "Chính phủ ta là chính phủ của nhân dân, chỉ có một mục đích là phụng sự cho lợi ích của nhân dân.", author: "Hồ Chí Minh, 1948" }
    ],
    milestones: [
      { year: "2/9/1945", event: "Tuyên ngôn Độc lập — Nhà nước VN DCCH ra đời" },
      { year: "6/1/1946", event: "Tổng tuyển cử tự do đầu tiên trong lịch sử VN" },
      { year: "11/1946", event: "Hiến pháp 1946 — Hiến pháp dân chủ đầu tiên" },
      { year: "1959", event: "Hiến pháp 1959 — Nhà nước XHCN đầu tiên" },
    ]
  },
  6: {
    summary: "Văn hoá, đạo đức và con người là nền tảng tinh thần của xã hội. HCM coi đạo đức là gốc của người cách mạng, văn hoá soi đường cho dân tộc.",
    keyPoints: [
      { icon: "🎭", title: "Vai trò Văn hoá", content: "'Văn hoá soi đường cho quốc dân đi'. Nền văn hoá: DÂN TỘC – KHOA HỌC – ĐẠI CHÚNG. Văn hoá là nền tảng tinh thần. Văn hoá phục vụ kháng chiến, kiến quốc." },
      { icon: "⭐", title: "5 Đức tính (Đạo đức)", content: "① Trung với nước, hiếu với dân (HÀNG ĐẦU) ② Cần, kiệm, liêm, chính, chí công vô tư ③ Thương yêu con người, sống có tình nghĩa ④ Tinh thần quốc tế trong sáng ⑤ Dũng cảm, kiên cường (bổ sung)" },
      { icon: "📌", title: "Nguyên tắc Đạo đức", content: "① Nói đi đôi với làm, phải nêu gương ② Xây đi đôi với chống ③ Tu dưỡng suốt đời — 'Đạo đức cách mạng không phải trên trời rơi xuống'" },
      { icon: "👥", title: "Con người mới", content: "Xây dựng con người mới XHCN: có lý tưởng, có đạo đức, có tri thức, có sức khoẻ, yêu lao động. Kết hợp sức mạnh truyền thống dân tộc với tinh hoa thời đại." },
    ],
    quotes: [
      { text: "Có tài mà không có đức là người vô dụng. Có đức mà không có tài thì làm việc gì cũng khó.", author: "Hồ Chí Minh" },
      { text: "Văn hoá soi đường cho quốc dân đi.", author: "Hồ Chí Minh, 1946" },
      { text: "Học không bao giờ đủ. Học mãi để tiến bộ mãi. Càng tiến bộ, càng thấy cần phải học thêm.", author: "Hồ Chí Minh" }
    ],
    milestones: [
      { year: "1943", event: "Đề cương về Văn hoá Việt Nam — nền văn hoá mới" },
      { year: "1946", event: "Hội nghị Văn hoá toàn quốc — 'Văn hoá soi đường'" },
      { year: "1958", event: "Bài báo 'Đạo đức cách mạng' — hệ thống hoá tư tưởng đạo đức" },
    ]
  }
};

const FLASHCARDS = [
  // Chương 1 — Nguồn gốc, quá trình hình thành
  { id: 1,  chapter: 1, front: "Tư tưởng Hồ Chí Minh là gì?", back: "Là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, từ cách mạng dân tộc dân chủ nhân dân đến cách mạng xã hội chủ nghĩa; là kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác – Lênin vào điều kiện cụ thể của Việt Nam.", difficulty: 1 },
  { id: 2,  chapter: 1, front: "Ba nguồn gốc lý luận của Tư tưởng Hồ Chí Minh?", back: "① Truyền thống tốt đẹp của dân tộc Việt Nam (yêu nước, nhân nghĩa)\n② Tinh hoa văn hoá nhân loại (phương Đông & Tây)\n③ Chủ nghĩa Mác – Lênin ★ NGUỒN GỐC CHỦ YẾU NHẤT, quyết định bản chất cách mạng, khoa học", difficulty: 2 },
  { id: 3,  chapter: 1, front: "Giai đoạn hình thành tư tưởng yêu nước (1890–1911)", back: "Từ khi sinh ra đến khi rời Tổ quốc tìm đường cứu nước. Tiếp thu truyền thống yêu nước dân tộc, chứng kiến thất bại của các phong trào yêu nước → quyết tâm tìm con đường mới.", difficulty: 1 },
  { id: 4,  chapter: 1, front: "Năm 1920 Nguyễn Ái Quốc đọc tác phẩm gì và ý nghĩa?", back: "Đọc 'Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và thuộc địa' của Lênin → Tìm thấy con đường cứu nước đúng đắn: con đường cách mạng vô sản.", difficulty: 2 },
  { id: 5,  chapter: 1, front: "Nhân tố chủ quan hình thành Tư tưởng Hồ Chí Minh?", back: "Phẩm chất cá nhân xuất sắc:\n• Tư duy độc lập, sáng tạo\n• Tầm nhìn chiến lược\n• Lòng yêu nước, thương dân sâu sắc\n• Ham học hỏi, dày công nghiên cứu", difficulty: 1 },
  { id: 6,  chapter: 1, front: "Tư tưởng HCM có ý nghĩa lý luận như thế nào?", back: "• Là tài sản tinh thần vô giá của Đảng và dân tộc VN\n• Soi đường cho Đảng và nhân dân VN\n• Phong phú về nội dung, sáng tạo về phương pháp\n• Đóng góp vào kho tàng lý luận cách mạng thế giới", difficulty: 2 },
  // Chương 2 — Độc lập dân tộc và CNXH
  { id: 7,  chapter: 2, front: "Luận điểm 'Không có gì quý hơn độc lập, tự do' có ý nghĩa gì?", back: "Là chân lý thời đại: khẳng định độc lập dân tộc là quyền thiêng liêng bất khả xâm phạm. Là mục tiêu cao nhất, động lực mạnh mẽ nhất để nhân dân chiến đấu. Đưa ra năm 1965 trong kháng chiến chống Mỹ.", difficulty: 1 },
  { id: 8,  chapter: 2, front: "Mối quan hệ giữa độc lập dân tộc và CNXH theo HCM?", back: "Hai mục tiêu gắn bó HỮU CƠ:\n• Độc lập dân tộc là ĐIỀU KIỆN TIÊN QUYẾT để thực hiện CNXH\n• CNXH là CON ĐƯỜNG DUY NHẤT đảm bảo nền độc lập thực sự, bền vững\n• Giải phóng dân tộc → giải phóng giai cấp → giải phóng con người", difficulty: 3 },
  { id: 9,  chapter: 2, front: "HCM xác định bản chất của CNXH ở Việt Nam như thế nào?", back: "CNXH là:\n• Làm cho nhân dân lao động thoát nạn bần cùng\n• Mọi người có công ăn việc làm, ăn no mặc ấm, học hành\n• Xã hội bình đẳng, không có áp bức bóc lột\n• Xã hội ưu việt hơn xã hội cũ", difficulty: 2 },
  { id: 10, chapter: 2, front: "Con đường quá độ lên CNXH theo HCM?", back: "Quá độ GIÁN TIẾP: từ một nước thuộc địa nửa phong kiến, kinh tế lạc hậu tiến thẳng lên CNXH bỏ qua giai đoạn phát triển TBCN. Phải qua nhiều bước, nhiều giai đoạn, lâu dài, gian khổ.", difficulty: 2 },
  { id: 11, chapter: 2, front: "Câu nói nổi tiếng về nước độc lập nhưng dân không hạnh phúc?", back: "'Nước độc lập mà dân không được hưởng hạnh phúc tự do thì độc lập cũng chẳng có nghĩa lý gì' — HCM, 1945. Thể hiện quan điểm: độc lập phải gắn với tự do, hạnh phúc thực sự của nhân dân.", difficulty: 1 },
  // Chương 3 — Đảng Cộng sản
  { id: 12, chapter: 3, front: "Đảng Cộng sản Việt Nam ra đời ngày nào? Ai sáng lập?", back: "Ngày 3/2/1930. Người sáng lập và rèn luyện: Nguyễn Ái Quốc (Hồ Chí Minh). Hội nghị hợp nhất tại Hương Cảng (HK). Đây là bước ngoặt vĩ đại của cách mạng Việt Nam.", difficulty: 1 },
  { id: 13, chapter: 3, front: "Theo HCM, Đảng phải xây dựng trên nền tảng gì?", back: "Đảng lấy Chủ nghĩa Mác-Lênin làm nền tảng tư tưởng và kim chỉ nam hành động. Đảng phải có kỷ luật tự giác, thống nhất, gắn bó mật thiết với nhân dân.", difficulty: 1 },
  { id: 14, chapter: 3, front: "5 Nguyên tắc xây dựng Đảng theo HCM?", back: "① Tập trung dân chủ (nguyên tắc CƠ BẢN NHẤT)\n② Tự phê bình và phê bình\n③ Kỷ luật nghiêm minh, tự giác\n④ Đoàn kết thống nhất trong Đảng\n⑤ Gắn bó mật thiết với nhân dân", difficulty: 3 },
  { id: 15, chapter: 3, front: "Đảng là của giai cấp nào theo tư tưởng HCM?", back: "Đảng CSVM vừa là đảng của GIAI CẤP CÔNG NHÂN vừa là đảng của DÂN TỘC VIỆT NAM. Đại diện cho lợi ích của giai cấp công nhân, nhân dân lao động và của cả dân tộc.", difficulty: 2 },
  // Chương 4 — Đại đoàn kết
  { id: 16, chapter: 4, front: "Vai trò của đại đoàn kết dân tộc theo HCM?", back: "Là CHIẾN LƯỢC cơ bản, lâu dài, nhất quán của cách mạng VN. Là NGUỒN SỨC MẠNH, nhân tố QUYẾT ĐỊNH THẮNG LỢI. 'Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công.'", difficulty: 1 },
  { id: 17, chapter: 4, front: "Nền tảng của khối đại đoàn kết dân tộc?", back: "Liên minh CÔNG – NÔNG – TRÍ THỨC:\n• Công nhân: giai cấp lãnh đạo\n• Nông dân: lực lượng chủ yếu, đông đảo nhất\n• Trí thức: nền tảng quan trọng\nHình thức tổ chức: Mặt trận Dân tộc Thống nhất.", difficulty: 2 },
  { id: 18, chapter: 4, front: "Câu nói 'Đoàn kết, đoàn kết, đại đoàn kết' nói ở đâu?", back: "Nói tại Đại hội Mặt trận Tổ quốc Việt Nam lần thứ I (1955). Đây là lời thể hiện sức mạnh của tinh thần đoàn kết dân tộc qua nhiều thế kỷ đấu tranh cách mạng.", difficulty: 2 },
  // Chương 5 — Nhà nước và dân chủ
  { id: 19, chapter: 5, front: "Quan điểm của HCM về bản chất Nhà nước?", back: "Nhà nước CỦA nhân dân, DO nhân dân, VÌ nhân dân:\n• CỦA: tất cả quyền lực thuộc về nhân dân\n• DO: nhà nước do nhân dân làm chủ, bầu ra\n• VÌ: mọi hoạt động nhà nước vì lợi ích nhân dân", difficulty: 1 },
  { id: 20, chapter: 5, front: "Dân chủ theo tư tưởng HCM là gì?", back: "'Dân là chủ và dân làm chủ': Nhân dân là chủ thể quyền lực tối cao. Dân chủ vừa là MỤC TIÊU, vừa là ĐỘNG LỰC của sự phát triển xã hội. Phải thực hiện dân chủ thực chất, không hình thức.", difficulty: 2 },
  { id: 21, chapter: 5, front: "Tổng tuyển cử đầu tiên của nước VN DCCH?", back: "Ngày 6/1/1946 — Tổng tuyển cử tự do đầu tiên trong lịch sử VN. Thể hiện quyền làm chủ của nhân dân. Bầu ra Quốc hội đầu tiên, thể chế hoá nhà nước mới theo tư tưởng HCM.", difficulty: 2 },
  // Chương 6 — Văn hoá, đạo đức
  { id: 22, chapter: 6, front: "5 đức tính cơ bản trong đạo đức HCM?", back: "① Trung với nước, hiếu với dân (HÀNG ĐẦU)\n② Cần, kiệm, liêm, chính, chí công vô tư\n③ Thương yêu con người, sống có tình nghĩa\n④ Tinh thần quốc tế trong sáng\n⑤ Dũng cảm, kiên cường", difficulty: 2 },
  { id: 23, chapter: 6, front: "Nguyên tắc xây dựng đạo đức theo HCM?", back: "① Nói đi đôi với làm, phải nêu gương\n② Xây đi đôi với chống (xây cái tốt, chống cái xấu)\n③ Tu dưỡng đạo đức suốt đời\n'Đạo đức cách mạng không phải trên trời rơi xuống, phải kiên trì rèn luyện'", difficulty: 2 },
  { id: 24, chapter: 6, front: "Quan điểm về văn hoá của HCM?", back: "'Văn hoá soi đường cho quốc dân đi'. Nền văn hoá mới: DÂN TỘC – KHOA HỌC – ĐẠI CHÚNG. Văn hoá phục vụ kháng chiến, kiến quốc. Có tính độc lập tương đối với kinh tế.", difficulty: 1 },
  { id: 25, chapter: 6, front: "Phong cách Hồ Chí Minh gồm những phong cách nào?", back: "• Phong cách tư duy: độc lập, sáng tạo, biện chứng\n• Phong cách diễn đạt: ngắn gọn, dễ hiểu, hài hước\n• Phong cách làm việc: khoa học, dân chủ\n• Phong cách ứng xử: khiêm tốn, chân tình\n• Phong cách sinh hoạt: giản dị, tiết kiệm", difficulty: 2 },
  { id: 26, chapter: 6, front: "Câu nói về tài và đức của HCM?", back: "'Có tài mà không có đức là người vô dụng. Có đức mà không có tài thì làm việc gì cũng khó.' → HCM đặt ĐỨC trên TÀI nhưng cả hai phải kết hợp hài hoà.", difficulty: 1 },
  { id: 27, chapter: 6, front: "Đề cương về Văn hoá Việt Nam năm 1943?", back: "Do Tổng Bí thư Trường Chinh soạn thảo (1943). Nêu 3 tính chất của nền văn hoá mới: DÂN TỘC – KHOA HỌC – ĐẠI CHÚNG. Định hướng xây dựng văn hoá XHCN Việt Nam.", difficulty: 3 },
  { id: 28, chapter: 1, front: "Giai đoạn HCM bổ sung, tìm tòi con đường cứu nước (1911-1920)?", back: "Hoạt động trên nhiều nước Pháp, Mỹ, Anh, châu Phi. Tiếp cận tư tưởng dân chủ tư sản. Gửi Bản yêu sách 8 điểm (1919). Phê phán chủ nghĩa thực dân. Cuối giai đoạn gặp Luận cương Lênin.", difficulty: 2 },
  { id: 29, chapter: 1, front: "Giai đoạn hình thành cơ bản Tư tưởng HCM (1920-1930)?", back: "Đứng về phía Đệ tam Quốc tế. Thành lập Hội VN Cách mạng Thanh niên. Soạn thảo Đường Kách mệnh. Thành lập Đảng CSVN (3/2/1930). Hình thành cơ bản đường lối cứu nước, giải phóng dân tộc.", difficulty: 3 },
  { id: 30, chapter: 2, front: "Điều kiện để thực hiện thành công CNXH theo HCM?", back: "① Đảng Cộng sản lãnh đạo\n② Nhà nước của nhân dân, do dân, vì dân\n③ Xây dựng con người mới XHCN\n④ Phát triển lực lượng sản xuất\n⑤ Kết hợp sức mạnh dân tộc với sức mạnh thời đại", difficulty: 3 },
];

const QUIZ_QUESTIONS = [
  // === CHƯƠNG 1 ===
  { id: 1,  chapter: 1, difficulty: "easy",
    question: "Nguồn gốc lý luận CHỦ YẾU, quyết định bản chất cách mạng và khoa học của Tư tưởng HCM là gì?",
    options: ["Truyền thống tốt đẹp của dân tộc Việt Nam", "Chủ nghĩa Mác – Lênin", "Tinh hoa văn hoá phương Đông", "Tinh hoa văn hoá phương Tây"],
    correct: 1, explain: "Chủ nghĩa Mác–Lênin là nguồn gốc lý luận CHỦ YẾU NHẤT, quyết định bản chất cách mạng, khoa học của TTHCM. Truyền thống dân tộc và tinh hoa nhân loại là điều kiện, nền tảng." },

  { id: 2,  chapter: 1, difficulty: "easy",
    question: "Năm 1920, Nguyễn Ái Quốc đọc tác phẩm nào và tìm thấy con đường cứu nước?",
    options: ["Tuyên ngôn Đảng Cộng sản", "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và thuộc địa của Lênin", "Bản án chế độ thực dân Pháp", "Đường Kách mệnh"],
    correct: 1, explain: "Năm 1920, NAQ đọc 'Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và thuộc địa' của Lênin tại Pháp → Tìm thấy con đường cứu nước: con đường cách mạng vô sản." },

  { id: 3,  chapter: 1, difficulty: "medium",
    question: "Tư tưởng Hồ Chí Minh có mấy nguồn gốc lý luận chính?",
    options: ["2 nguồn gốc", "3 nguồn gốc", "4 nguồn gốc", "5 nguồn gốc"],
    correct: 1, explain: "TTHCM có 3 nguồn gốc: ① Truyền thống dân tộc VN ② Tinh hoa văn hoá nhân loại ③ Chủ nghĩa Mác-Lênin (chủ yếu nhất)." },

  { id: 4,  chapter: 1, difficulty: "medium",
    question: "Điểm xuất phát tư tưởng HCM về con đường cách mạng là gì?",
    options: ["Phải học theo con đường Liên Xô", "Muốn cứu nước và giải phóng dân tộc không có con đường nào khác ngoài con đường cách mạng vô sản", "Phải liên minh với giai cấp tư sản dân tộc trước", "Phải tiến hành cách mạng văn hóa trước"],
    correct: 1, explain: "HCM khẳng định: 'Muốn cứu nước và giải phóng dân tộc không có con đường nào khác con đường cách mạng vô sản.' Đây là điểm xuất phát căn bản." },

  { id: 5,  chapter: 1, difficulty: "hard",
    question: "Giai đoạn nào trong quá trình hình thành TTHCM được coi là 'hình thành cơ bản'?",
    options: ["1890 – 1911", "1911 – 1920", "1920 – 1930", "1930 – 1945"],
    correct: 2, explain: "Giai đoạn 1920-1930 được coi là hình thành CƠ BẢN TTHCM: HCM tìm thấy con đường (1920), sáng lập HVCMTN, soạn Đường Kách mệnh, thành lập Đảng CSVN (1930)." },

  { id: 6,  chapter: 1, difficulty: "hard",
    question: "Bản yêu sách 8 điểm (1919) do NAQ gửi tới hội nghị nào?",
    options: ["Hội nghị Yalta", "Hội nghị Versailles (Paris)", "Hội nghị Geneva", "Hội nghị San Francisco"],
    correct: 1, explain: "Năm 1919, Nguyễn Ái Quốc gửi 'Bản yêu sách của nhân dân An Nam' đến Hội nghị Hoà bình Versailles, yêu cầu các quyền tự do, dân chủ cho nhân dân Việt Nam." },

  // === CHƯƠNG 2 ===
  { id: 7,  chapter: 2, difficulty: "easy",
    question: "Câu 'Không có gì quý hơn độc lập, tự do' được HCM phát biểu trong bối cảnh nào?",
    options: ["Kháng chiến chống Pháp (1946)", "Kháng chiến chống Mỹ (1965)", "Lúc soạn Tuyên ngôn Độc lập 1945", "Đại hội Đảng lần II (1951)"],
    correct: 1, explain: "Câu nói nổi tiếng 'Không có gì quý hơn độc lập, tự do' được HCM đưa ra trong kháng chiến chống Mỹ (17/7/1966, trong Lời kêu gọi đồng bào và chiến sĩ)." },

  { id: 8,  chapter: 2, difficulty: "easy",
    question: "Theo HCM, mối quan hệ giữa độc lập dân tộc và CNXH là gì?",
    options: ["Hai mục tiêu tách biệt nhau", "Gắn bó hữu cơ, bổ sung lẫn nhau", "Chỉ cần độc lập dân tộc, không cần CNXH", "CNXH quan trọng hơn độc lập dân tộc"],
    correct: 1, explain: "Theo HCM, độc lập dân tộc và CNXH gắn bó HỮU CƠ: ĐLDT là điều kiện để thực hiện CNXH; CNXH là con đường đảm bảo ĐLDT thực sự, bền vững." },

  { id: 9,  chapter: 2, difficulty: "medium",
    question: "Con đường đi lên CNXH ở VN theo HCM là gì?",
    options: ["Quá độ trực tiếp từ chủ nghĩa tư bản", "Quá độ gián tiếp, bỏ qua giai đoạn phát triển TBCN", "Quá độ theo mô hình Liên Xô", "Quá độ qua nhiều năm tư bản chủ nghĩa"],
    correct: 1, explain: "Con đường quá độ GIÁN TIẾP: từ thuộc địa nửa phong kiến → CNXH, bỏ qua giai đoạn phát triển TBCN. Lâu dài, gian khổ, phải qua nhiều bước, nhiều giai đoạn." },

  { id: 10, chapter: 2, difficulty: "medium",
    question: "HCM mô tả bản chất CNXH ở VN bằng cách nào?",
    options: ["Theo định nghĩa kinh điển Mác-Lênin trừu tượng", "Cách diễn đạt gần gũi: dân no ấm, học hành, bình đẳng", "Theo mô hình kinh tế kế hoạch hóa tập trung", "Theo mô hình nhà nước phúc lợi phương Tây"],
    correct: 1, explain: "HCM mô tả CNXH bằng ngôn ngữ giản dị, gần gũi: 'Làm cho nhân dân thoát nạn bần cùng, mọi người có việc làm, ăn no mặc ấm, được học hành, xã hội bình đẳng'." },

  { id: 11, chapter: 2, difficulty: "hard",
    question: "Câu nào sau đây KHÔNG phải nội dung tư tưởng HCM về CNXH?",
    options: ["CNXH là xã hội bình đẳng, không áp bức", "CNXH cần tiến hành bằng bạo lực cách mạng triệt để", "CNXH là làm cho dân thoát nạn bần cùng", "CNXH là con đường đảm bảo độc lập bền vững"],
    correct: 1, explain: "CNXH theo HCM nhấn mạnh MỤC TIÊU (ăn no mặc ấm, bình đẳng, không bóc lột), không phải nhấn mạnh phương pháp bạo lực. HCM đặt yếu tố nhân văn lên hàng đầu." },

  // === CHƯƠNG 3 ===
  { id: 12, chapter: 3, difficulty: "easy",
    question: "Đảng Cộng sản Việt Nam thành lập ngày tháng năm nào?",
    options: ["19/5/1890", "3/2/1930", "2/9/1945", "21/7/1954"],
    correct: 1, explain: "Ngày 3/2/1930 tại Hương Cảng (Hồng Kông), Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất 3 tổ chức cộng sản thành Đảng CSVN — bước ngoặt vĩ đại của CMVN." },

  { id: 13, chapter: 3, difficulty: "easy",
    question: "Nguyên tắc tổ chức CƠ BẢN NHẤT của Đảng theo HCM là gì?",
    options: ["Đoàn kết thống nhất", "Tập trung dân chủ", "Kỷ luật nghiêm minh", "Gắn bó với nhân dân"],
    correct: 1, explain: "Nguyên tắc TẬP TRUNG DÂN CHỦ là cơ bản nhất: đảm bảo tập trung lãnh đạo thống nhất trong khi vẫn phát huy dân chủ nội bộ, lắng nghe ý kiến đảng viên." },

  { id: 14, chapter: 3, difficulty: "medium",
    question: "HCM xác định Đảng CSVM là đảng của ai?",
    options: ["Chỉ của giai cấp công nhân", "Chỉ của giai cấp nông dân", "Vừa của giai cấp công nhân, vừa của dân tộc VN", "Của tất cả các giai cấp"],
    correct: 2, explain: "Theo HCM, Đảng CSVN vừa là đảng của GIAI CẤP CÔNG NHÂN (mang bản chất) vừa là đảng của DÂN TỘC VN (đại diện lợi ích toàn dân tộc). Không chỉ của một giai cấp riêng." },

  { id: 15, chapter: 3, difficulty: "medium",
    question: "Cán bộ đảng viên trong Đảng cầm quyền theo HCM phải là gì?",
    options: ["Người nắm quyền lực cao nhất", "Công bộc, đầy tớ của nhân dân", "Người lãnh đạo tuyệt đối", "Người quản lý tài sản nhà nước"],
    correct: 1, explain: "HCM nhấn mạnh: cán bộ đảng viên phải là 'CÔNG BỘC, ĐẦY TỚ của nhân dân', không phải ông chủ. Đây là nguyên tắc cơ bản của Đảng cầm quyền." },

  { id: 16, chapter: 3, difficulty: "hard",
    question: "HCM chỉ ra những 'bệnh' nguy hiểm nào của cán bộ đảng viên cần phòng chống?",
    options: ["Lười biếng, thụ động", "Quan liêu, tham nhũng, xa rời quần chúng", "Học ít, thiếu kiến thức", "Thiếu kinh nghiệm thực tế"],
    correct: 1, explain: "HCM thường xuyên cảnh báo 3 nguy cơ cho đảng cầm quyền: QUAN LIÊU (xa rời thực tế, giấy tờ), THAM NHŨNG (lợi dụng chức quyền), XA RỜI QUẦN CHÚNG (mất gốc)." },

  // === CHƯƠNG 4 ===
  { id: 17, chapter: 4, difficulty: "easy",
    question: "Câu 'Đoàn kết, đoàn kết, đại đoàn kết...' được HCM nói tại sự kiện nào?",
    options: ["Tuyên ngôn Độc lập 1945", "Đại hội Mặt trận Tổ quốc lần I (1955)", "Đại hội Đảng lần III", "Lời kêu gọi toàn quốc kháng chiến"],
    correct: 1, explain: "'Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công' được HCM nói tại Đại hội Mặt trận Tổ quốc VN lần thứ I (5/9/1955)." },

  { id: 18, chapter: 4, difficulty: "easy",
    question: "Nền tảng của khối đại đoàn kết dân tộc theo HCM là gì?",
    options: ["Giai cấp công nhân", "Liên minh công – nông – trí thức", "Giai cấp nông dân", "Các tổ chức yêu nước"],
    correct: 1, explain: "Nền tảng là LIÊN MINH CÔNG – NÔNG – TRÍ THỨC: Công nhân lãnh đạo, nông dân là lực lượng chủ yếu, trí thức là nền tảng quan trọng. Ba lực lượng nòng cốt cho đại đoàn kết." },

  { id: 19, chapter: 4, difficulty: "medium",
    question: "Đại đoàn kết dân tộc theo HCM được thực hiện dựa trên nguyên tắc gì?",
    options: ["Dựa vào lợi ích của giai cấp công nhân", "Dựa vào LỢI ÍCH CHUNG của toàn dân tộc, có lý có tình", "Đặt lợi ích của Đảng lên trên hết", "Phân biệt theo giai cấp, thành phần xã hội"],
    correct: 1, explain: "Đại đoàn kết dựa trên LỢI ÍCH CHUNG của dân tộc, không phân biệt giai cấp, tôn giáo, dân tộc. Phương châm: 'có lý, có tình', đoàn kết thực chất không hình thức." },

  { id: 20, chapter: 4, difficulty: "medium",
    question: "Đoàn kết quốc tế theo HCM bao gồm những lực lượng nào?",
    options: ["Chỉ với các nước XHCN", "Với phong trào CS, phong trào GPDT và lực lượng hoà bình tiến bộ", "Chỉ với các nước châu Á", "Chỉ với Liên Xô và Trung Quốc"],
    correct: 1, explain: "Đoàn kết quốc tế bao gồm: ① Phong trào cộng sản và công nhân quốc tế ② Phong trào giải phóng dân tộc ③ Lực lượng hoà bình, dân chủ, tiến bộ trên toàn thế giới." },

  // === CHƯƠNG 5 ===
  { id: 21, chapter: 5, difficulty: "easy",
    question: "Theo HCM, ai là người chủ của Nhà nước?",
    options: ["Đảng Cộng sản Việt Nam", "Giai cấp công nhân", "Nhân dân lao động", "Hội đồng Nhà nước"],
    correct: 2, explain: "Theo HCM: 'Nhà nước của nhân dân, do nhân dân, vì nhân dân. Nhân dân là ông chủ nắm chính quyền.' Nhân dân vừa là chủ thể, vừa là mục tiêu phục vụ của Nhà nước." },

  { id: 22, chapter: 5, difficulty: "easy",
    question: "Mô hình Nhà nước theo tư tưởng HCM là gì?",
    options: ["Nhà nước pháp quyền tư sản", "Nhà nước của nhân dân, do nhân dân, vì nhân dân", "Nhà nước chuyên chính vô sản thuần túy", "Nhà nước liên bang"],
    correct: 1, explain: "HCM xây dựng Nhà nước kiểu mới: CỦA – DO – VÌ nhân dân. Mang bản chất giai cấp công nhân, có tính nhân dân rộng rãi và tính dân tộc sâu sắc." },

  { id: 23, chapter: 5, difficulty: "medium",
    question: "Hiến pháp đầu tiên của Nhà nước VN DCCH được ban hành năm nào?",
    options: ["1945", "1946", "1954", "1959"],
    correct: 1, explain: "Hiến pháp 1946 là Hiến pháp dân chủ đầu tiên của nước VN DCCH. Được Quốc hội thông qua ngày 9/11/1946. Thể hiện tư tưởng HCM về nhà nước của nhân dân." },

  { id: 24, chapter: 5, difficulty: "medium",
    question: "Tổng tuyển cử đầu tiên của nước VN DCCH diễn ra ngày nào?",
    options: ["2/9/1945", "6/1/1946", "19/12/1946", "7/5/1954"],
    correct: 1, explain: "Tổng tuyển cử tự do đầu tiên trong lịch sử VN: ngày 6/1/1946. Bầu ra Quốc hội đầu tiên. Thể hiện quyền làm chủ của nhân dân theo tư tưởng dân chủ của HCM." },

  { id: 25, chapter: 5, difficulty: "hard",
    question: "Dân chủ theo HCM có bao nhiêu ý nghĩa?",
    options: ["Chỉ là mục tiêu của cách mạng", "Vừa là mục tiêu, vừa là động lực", "Chỉ là phương tiện để đạt CNXH", "Là hình thức bầu cử định kỳ"],
    correct: 1, explain: "Dân chủ theo HCM có HAI Ý NGHĨA: ① Là MỤC TIÊU (xây dựng xã hội dân chủ, nhân dân làm chủ) ② Là ĐỘNG LỰC (phát huy sức mạnh sáng tạo, giải phóng tiềm năng nhân dân)." },

  // === CHƯƠNG 6 ===
  { id: 26, chapter: 6, difficulty: "easy",
    question: "Đức tính đầu tiên, quan trọng nhất trong đạo đức HCM là gì?",
    options: ["Cần kiệm liêm chính", "Trung với nước, hiếu với dân", "Thương yêu con người", "Tinh thần quốc tế trong sáng"],
    correct: 1, explain: "'Trung với nước, hiếu với dân' là chuẩn mực đạo đức QUAN TRỌNG HÀNG ĐẦU. Thể hiện mối quan hệ giữa cá nhân với Tổ quốc và nhân dân — bổn phận thiêng liêng nhất." },

  { id: 27, chapter: 6, difficulty: "easy",
    question: "HCM đưa ra quan điểm nào về mối quan hệ giữa đức và tài?",
    options: ["Đức và tài ngang nhau", "Tài quan trọng hơn đức", "Có tài mà không có đức là người vô dụng", "Chỉ cần đức, không cần tài"],
    correct: 2, explain: "HCM: 'Có tài mà không có đức là người vô dụng. Có đức mà không có tài thì làm việc gì cũng khó.' → ĐỨC là gốc, TÀI là quan trọng, cả hai phải kết hợp hài hoà." },

  { id: 28, chapter: 6, difficulty: "medium",
    question: "Theo HCM, văn hoá có vai trò gì trong xã hội?",
    options: ["Chỉ là nghệ thuật, giải trí", "Văn hoá soi đường cho quốc dân đi", "Phụ thuộc hoàn toàn vào kinh tế", "Chỉ quan trọng sau khi dân giàu nước mạnh"],
    correct: 1, explain: "HCM: 'Văn hoá soi đường cho quốc dân đi'. Văn hoá không phụ thuộc kinh tế mà có tính độc lập tương đối. Văn hoá là nền tảng tinh thần, định hướng toàn xã hội." },

  { id: 29, chapter: 6, difficulty: "medium",
    question: "3 tính chất của nền văn hoá mới VN theo tư tưởng HCM?",
    options: ["Truyền thống – Hiện đại – Quốc tế", "Dân tộc – Khoa học – Đại chúng", "Yêu nước – Dân chủ – Nhân văn", "Đỏ – Chuyên – Sạch"],
    correct: 1, explain: "3 tính chất nền văn hoá mới VN (theo Đề cương văn hoá 1943): ① DÂN TỘC (bản sắc VN) ② KHOA HỌC (tiến bộ, không mê tín) ③ ĐẠI CHÚNG (phục vụ và của nhân dân)." },

  { id: 30, chapter: 6, difficulty: "medium",
    question: "Nguyên tắc nào trong rèn luyện đạo đức được HCM nhấn mạnh nhất?",
    options: ["Học tập lý luận đạo đức", "Nói đi đôi với làm, phải nêu gương đạo đức", "Tham gia phê bình và tự phê bình", "Nghiên cứu kinh điển Mác-Lênin về đạo đức"],
    correct: 1, explain: "HCM nhấn mạnh nhất nguyên tắc 'NÓI ĐI ĐÔI VỚI LÀM, PHẢI NÊU GƯƠNG': cán bộ phải làm gương, không nói suông. 'Trăm lần nghe không bằng một lần thấy'." },

  { id: 31, chapter: 6, difficulty: "hard",
    question: "Phong cách diễn đạt của HCM có đặc điểm gì nổi bật?",
    options: ["Dài, chi tiết, học thuật cao", "Ngắn gọn, súc tích, dễ hiểu, phù hợp từng đối tượng", "Chỉ dùng ngôn ngữ chính trị", "Dùng nhiều thuật ngữ khoa học"],
    correct: 1, explain: "Phong cách diễn đạt HCM: NGẮN GỌN, SÚC TÍCH, DỄ HIỂU (không học thuật), SINH ĐỘNG, HÀI HƯỚC và PHÂN HOÁ ĐỐI TƯỢNG (nói với nông dân khác với cán bộ). Dân ai cũng hiểu." },

  { id: 32, chapter: 6, difficulty: "hard",
    question: "Đề cương về Văn hoá Việt Nam (1943) do ai soạn thảo?",
    options: ["Hồ Chí Minh", "Tổng Bí thư Trường Chinh", "Nguyễn Ái Quốc", "Võ Nguyên Giáp"],
    correct: 1, explain: "Đề cương về Văn hoá Việt Nam (1943) do Tổng Bí thư TRƯỜNG CHINH soạn thảo, được Hội nghị Ban Thường vụ TW Đảng thông qua. Đặt nền móng văn hoá mới VN theo định hướng TTHCM." },

  // === Câu hỏi tổng hợp ===
  { id: 33, chapter: 1, difficulty: "medium",
    question: "Tinh hoa văn hoá nhân loại ảnh hưởng đến TTHCM gồm những gì?",
    options: ["Chỉ văn hoá phương Tây (Pháp, Mỹ)", "Chỉ văn hoá phương Đông (Nho, Phật, Lão)", "Cả phương Đông (Nho, Phật, Lão) và phương Tây (tự do, bình đẳng, bác ái)", "Chỉ văn hoá Xô Viết"],
    correct: 2, explain: "HCM tiếp thu tinh hoa CẢ HAI nền văn hoá: Phương Đông (Nho giáo: nhân nghĩa; Phật giáo: từ bi; Lão giáo) và Phương Tây (tự do Pháp 1789, Tuyên ngôn Độc lập Mỹ 1776)." },

  { id: 34, chapter: 3, difficulty: "hard",
    question: "Nguyên tắc 'tự phê bình và phê bình' trong Đảng theo HCM là gì?",
    options: ["Phê bình để kỷ luật", "Trị bệnh cứu người, tăng cường đoàn kết và phát triển Đảng", "Loại bỏ phần tử xấu", "Tạo áp lực cho đảng viên"],
    correct: 1, explain: "HCM xác định tự phê bình và phê bình là 'VŨ KHÍ SẮC BÉN' để: TRỊ BỆNH CỨU NGƯỜI (không nhằm hạ uy tín nhau), TĂNG CƯỜNG ĐOÀN KẾT và THÚC ĐẨY PHÁT TRIỂN của Đảng." },

  { id: 35, chapter: 2, difficulty: "hard",
    question: "Câu nào sau đây thể hiện đúng quan điểm HCM về CNXH và hạnh phúc nhân dân?",
    options: ["CNXH trước, hạnh phúc dân tính sau", "Phát triển kinh tế là ưu tiên duy nhất", "Nước độc lập mà dân không hạnh phúc thì độc lập chẳng có nghĩa lý gì", "Phải giai đoạn khó khăn trước rồi mới có hạnh phúc"],
    correct: 2, explain: "HCM (1945): 'Nước độc lập mà dân không được hưởng hạnh phúc tự do thì độc lập cũng chẳng có nghĩa lý gì.' Thể hiện quan điểm: độc lập phải gắn với hạnh phúc THỰC SỰ của dân." },
];

const AI_RESPONSES = {
  "nguon goc tu tuong": {
    keywords: ["nguồn gốc","hình thành","ra đời","xuất phát","cơ sở","tiền đề"],
    response: `## Nguồn gốc Tư tưởng Hồ Chí Minh\n\nTư tưởng HCM có **3 nguồn gốc lý luận** chính:\n\n### 1. 🇻🇳 Truyền thống dân tộc Việt Nam\n- Chủ nghĩa yêu nước, ý chí bất khuất, kiên cường\n- Truyền thống nhân nghĩa, tương thân tương ái\n- Tinh thần cố kết cộng đồng, ý thức cộng đồng\n\n### 2. 🌏 Tinh hoa văn hoá nhân loại\n- **Văn hoá phương Đông**: Nho giáo (nhân, nghĩa, lễ), Phật giáo (từ bi, bác ái), Lão giáo\n- **Văn hoá phương Tây**: Tự do, bình đẳng, bác ái (Cách mạng Pháp 1789); Tuyên ngôn Độc lập Mỹ 1776\n\n### 3. ⭐ Chủ nghĩa Mác – Lênin *(Nguồn gốc chủ yếu và quyết định nhất)*\n- Cung cấp thế giới quan, phương pháp luận khoa học\n- Giúp HCM nhận ra con đường cứu nước đúng đắn (1920)\n- Là nền tảng lý luận của toàn bộ tư tưởng HCM\n\n> 💡 **Lưu ý thi cử**: Mác-Lênin là nguồn gốc *chủ yếu nhất*, quyết định *bản chất cách mạng và khoa học* của TTHCM.`
  },
  "doc lap dan toc": {
    keywords: ["độc lập","dân tộc","tự do","quý hơn","giải phóng","thuộc địa"],
    response: `## Tư tưởng về Độc lập Dân tộc\n\n### 🏴 Luận điểm cơ bản\n**"Không có gì quý hơn độc lập, tự do"** – được HCM đưa ra năm 1965-1966 trong kháng chiến chống Mỹ.\n\n### Nội dung tư tưởng độc lập dân tộc:\n\n**1. Độc lập hoàn toàn, thực sự**\n- Không phải độc lập hình thức\n- Độc lập về chính trị, kinh tế, quân sự, ngoại giao và văn hoá\n- Gắn liền với thống nhất Tổ quốc\n\n**2. Độc lập gắn với tự do, hạnh phúc dân**\n- *"Nước độc lập mà dân không được hưởng hạnh phúc tự do thì độc lập cũng chẳng có nghĩa lý gì"* — HCM, 1945\n\n**3. Độc lập gắn liền với CNXH**\n- Độc lập dân tộc là điều kiện để thực hiện CNXH\n- CNXH bảo đảm nền độc lập thực sự, lâu dài\n\n> 📝 **Tips thi**: Câu *"Không có gì quý hơn..."* nói trong **kháng chiến chống Mỹ (1965-1966)**, không phải 1945.`
  },
  "chu nghia xa hoi": {
    keywords: ["xã hội chủ nghĩa","cnxh","quá độ","xây dựng xã hội"],
    response: `## Tư tưởng về Chủ nghĩa Xã hội\n\n### 🌟 Bản chất CNXH theo HCM\nKhông định nghĩa trừu tượng — diễn đạt gần gũi:\n- *"Làm cho nhân dân lao động **thoát nạn bần cùng**"*\n- *"Mọi người có **công ăn việc làm**, ăn no mặc ấm, được học hành"*\n- Xã hội **bình đẳng**, không áp bức bóc lột\n- Xã hội **ưu việt** hơn xã hội cũ\n\n### 📋 Con đường đi lên CNXH\n**Quá độ gián tiếp**: Từ thuộc địa nửa phong kiến → CNXH (bỏ qua TBCN)\n\nĐặc điểm:\n- Lâu dài, gian khổ, phức tạp\n- Cần nhiều bước, nhiều giai đoạn\n- Học tập kinh nghiệm, sáng tạo\n\n### 🔑 Điều kiện để xây dựng CNXH\n1. Phải có Đảng lãnh đạo\n2. Nhà nước của nhân dân, do dân, vì dân\n3. Xây dựng con người mới XHCN\n4. Phát triển lực lượng sản xuất\n5. Kết hợp sức mạnh dân tộc với sức mạnh thời đại`
  },
  "dao duc ho chi minh": {
    keywords: ["đạo đức","cần kiệm","liêm chính","trung với nước","hiếu với dân","phẩm chất","tu dưỡng"],
    response: `## Tư tưởng Đạo đức Hồ Chí Minh\n\n### ⭐ 5 Đức tính cơ bản\n\n| Đức tính | Nội dung |\n|----------|----------|\n| **Trung với nước, hiếu với dân** | Đức tính hàng đầu, quan trọng nhất |\n| **Cần, kiệm, liêm, chính, chí công vô tư** | Chuẩn mực người cách mạng |\n| **Thương yêu con người** | Sống có tình nghĩa, nhân ái |\n| **Tinh thần quốc tế trong sáng** | Đoàn kết chân thành |\n\n### 📌 3 Nguyên tắc rèn luyện đạo đức\n1. **Nói đi đôi với làm**, phải nêu gương đạo đức\n2. **Xây đi đôi với chống** (xây dựng cái tốt, chống cái xấu)\n3. **Tu dưỡng đạo đức suốt đời** — *"Đạo đức cách mạng... phải kiên trì rèn luyện từng ngày"*\n\n### 💬 Câu nói quan trọng\n> *"Có tài mà không có đức là người vô dụng. Có đức mà không có tài thì làm việc gì cũng khó."*\n> — Hồ Chí Minh`
  },
  "dang cong san": {
    keywords: ["đảng","đảng cộng sản","xây dựng đảng","lãnh đạo","3/2/1930","thành lập đảng"],
    response: `## Tư tưởng về Đảng Cộng sản Việt Nam\n\n### 📅 Sự ra đời của Đảng\n- **Ngày thành lập**: 3/2/1930\n- **Địa điểm**: Hương Cảng (Hồng Kông)\n- **Người sáng lập**: Nguyễn Ái Quốc (HCM)\n- **Ý nghĩa**: Bước ngoặt vĩ đại của cách mạng Việt Nam\n\n### 🏗️ Nền tảng tư tưởng Đảng\n- Chủ nghĩa Mác – Lênin là **kim chỉ nam** hành động\n- Kết hợp lý luận Mác-Lênin với thực tiễn Việt Nam\n\n### ⚙️ 5 Nguyên tắc xây dựng Đảng\n1. **Tập trung dân chủ** *(nguyên tắc cơ bản nhất)*\n2. Tự phê bình và phê bình\n3. Kỷ luật nghiêm minh, tự giác\n4. Đoàn kết thống nhất trong Đảng\n5. Gắn bó mật thiết với nhân dân\n\n### 🌟 Đảng cầm quyền\n- Lãnh đạo toàn diện nhưng không bao biện, làm thay\n- Cán bộ đảng viên phải là **công bộc, đầy tớ** của nhân dân`
  },
  "dai doan ket": {
    keywords: ["đại đoàn kết","đoàn kết dân tộc","mặt trận","liên minh","thống nhất"],
    response: `## Tư tưởng Đại đoàn kết Dân tộc\n\n> *"Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công"*\n\n### 💪 Vai trò của Đại đoàn kết\n- Là **chiến lược cơ bản, lâu dài, nhất quán** của cách mạng\n- Là **nguồn sức mạnh**, nhân tố **quyết định thắng lợi**\n- Không đoàn kết thì thất bại\n\n### 🏗️ Nền tảng đại đoàn kết\n**Liên minh công – nông – trí thức:**\n- Công nhân: giai cấp lãnh đạo\n- Nông dân: lực lượng chủ yếu, đông đảo nhất\n- Trí thức: nền tảng quan trọng\n\n**Hình thức tổ chức**: Mặt trận Dân tộc Thống nhất\n\n### 🌍 Đoàn kết quốc tế\n- Với phong trào cộng sản và công nhân quốc tế\n- Với phong trào giải phóng dân tộc\n- Với lực lượng hoà bình, dân chủ tiến bộ`
  },
  "phong cach ho chi minh": {
    keywords: ["phong cách","lối sống","giản dị","khiêm tốn","tư duy độc lập"],
    response: `## Phong cách Hồ Chí Minh\n\n### 🎯 5 Phong cách nổi bật\n\n**1. Phong cách tư duy**\n- Độc lập, tự chủ, sáng tạo; luôn gắn lý luận với thực tiễn\n- Tư duy biện chứng, nhìn xa trông rộng\n\n**2. Phong cách diễn đạt**\n- Ngắn gọn, súc tích, dễ hiểu; phù hợp từng đối tượng\n- Sinh động, hấp dẫn, hài hước có mức độ\n\n**3. Phong cách làm việc**\n- Khoa học, có kế hoạch; dân chủ, lắng nghe\n- Quyết đoán, tập trung vào điểm mấu chốt\n\n**4. Phong cách ứng xử**\n- Khiêm tốn, chân tình, tế nhị; gần gũi nhân dân\n- Tôn trọng mọi người, không phân biệt địa vị\n\n**5. Phong cách sinh hoạt**\n- Giản dị, tiết kiệm, thanh bạch\n- Chiếc áo vải, đôi dép cao su — biểu tượng của sự giản dị`
  },
  "nha nuoc dan chu": {
    keywords: ["nhà nước","dân chủ","dân là chủ","quyền lực nhân dân","pháp quyền","hiến pháp","bầu cử"],
    response: `## Tư tưởng về Nhà nước và Dân chủ\n\n### 🏛️ Bản chất Nhà nước\n**"Nhà nước của nhân dân, do nhân dân, vì nhân dân"**\n- **CỦA**: Tất cả quyền lực thuộc về nhân dân\n- **DO**: Nhà nước do nhân dân làm chủ, bầu ra\n- **VÌ**: Mọi hoạt động vì lợi ích nhân dân\n\n### 🗳️ Dân chủ theo HCM\n> *"Dân là chủ và dân làm chủ"*\n\n- Nhân dân là chủ thể quyền lực tối cao\n- Dân chủ là **MỤC TIÊU** (xã hội dân chủ thực sự) **VÀ ĐỘNG LỰC** (phát huy sức sáng tạo)\n- Phải thực chất, không hình thức\n\n### ⚖️ Nhà nước pháp quyền\n- Thượng tôn pháp luật\n- Cán bộ Nhà nước là **công bộc của dân**\n- Chống quan liêu, tham nhũng, lãng phí`
  },
  "van hoa giao duc": {
    keywords: ["văn hoá","văn hóa","giáo dục","học tập","con người mới","soi đường"],
    response: `## Tư tưởng về Văn hoá và Giáo dục\n\n### 🎭 Vai trò Văn hoá\n> *"Văn hoá soi đường cho quốc dân đi"* — HCM, 1946\n\n**3 tính chất nền văn hoá mới:**\n- **Dân tộc**: Bản sắc, truyền thống Việt Nam\n- **Khoa học**: Tiến bộ, chống mê tín dị đoan\n- **Đại chúng**: Phục vụ và của nhân dân\n\n### 📚 Quan điểm Giáo dục\n> *"Học không bao giờ đủ. Học mãi để tiến bộ mãi."*\n\n- Học để làm việc, làm người\n- Kết hợp lý luận với thực tiễn\n- Giáo dục toàn diện: Đức – Trí – Thể – Mỹ\n\n### 👥 Con người mới XHCN\n- Có lý tưởng, đạo đức cách mạng\n- Có năng lực, trí tuệ\n- Kết hợp sức mạnh truyền thống dân tộc với tinh hoa thời đại`
  },
  "default": {
    response: `Cảm ơn bạn đã đặt câu hỏi! 🎓\n\nTôi là **Trợ lý AI học Tư tưởng Hồ Chí Minh**, sẵn sàng hỗ trợ bạn ôn tập và hiểu sâu môn học này.\n\n### 📚 Tôi có thể giúp bạn về:\n\n| Chủ đề | Ví dụ câu hỏi |\n|--------|---------------|\n| Nguồn gốc TTHCM | Nguồn gốc lý luận của TTHCM là gì? |\n| Độc lập dân tộc | Ý nghĩa câu 'Không có gì quý hơn...'? |\n| Chủ nghĩa xã hội | Bản chất CNXH theo HCM? |\n| Đạo đức HCM | 5 đức tính cơ bản là gì? |\n| Đảng Cộng sản | Nguyên tắc xây dựng Đảng? |\n| Đại đoàn kết | Vai trò của đại đoàn kết? |\n| Nhà nước & Dân chủ | Bản chất Nhà nước theo HCM? |\n| Văn hoá & Giáo dục | Vai trò văn hoá theo HCM? |\n\nHãy đặt câu hỏi cụ thể và tôi sẽ giải thích chi tiết! 💪`
  }
};

const SUGGESTED_PROMPTS = [
  "Nguồn gốc lý luận của Tư tưởng Hồ Chí Minh là gì?",
  "Luận điểm 'Không có gì quý hơn độc lập, tự do' có ý nghĩa gì?",
  "5 đức tính cơ bản trong đạo đức Hồ Chí Minh?",
  "Đảng Cộng sản Việt Nam ra đời như thế nào?",
  "Vai trò của đại đoàn kết dân tộc?",
  "Phong cách Hồ Chí Minh gồm những phong cách nào?",
  "Bản chất của chủ nghĩa xã hội theo HCM?",
  "Quan điểm của HCM về Nhà nước và dân chủ?",
  "Văn hoá có vai trò gì theo HCM?",
  "Con đường quá độ lên CNXH theo HCM?"
];

const CASE_STUDIES = [
  {
    id: 1,
    title: "Cán bộ tham nhũng biện hộ bằng 'ai cũng làm vậy'",
    context: "Ông A là một cán bộ xã, lợi dụng chức vụ để nhận hối lộ trong việc cấp phép xây dựng. Khi bị phát hiện, ông khăng khăng rằng 'ai cũng làm vậy' và 'tiền lương quá thấp'.",
    question: "Dựa vào tư tưởng đạo đức của Hồ Chí Minh, hãy phân tích hành vi của ông A và chỉ ra các vi phạm đạo đức cụ thể?",
    analysis: `**Phân tích theo Tư tưởng Hồ Chí Minh:**\n\n**Vi phạm 1: "Cần, kiệm, liêm, chính"**\nÔng A đã vi phạm đức "liêm": không trong sạch, lợi dụng quyền hạn vơ vét của công.\n\n**Vi phạm 2: "Chí công vô tư"**\nĐặt lợi ích cá nhân lên trên lợi ích tập thể và nhân dân.\n\n**Vi phạm 3: Nguyên tắc "Nói đi đôi với làm"**\nLà cán bộ nhưng không nêu gương đạo đức, trái với lời thề đảng viên.\n\n**Lý luận "Ai cũng làm vậy" là sai vì:**\nHCM dạy: "Tu dưỡng đạo đức phải suốt đời" – không thể lấy người khác làm chuẩn.\n\n→ **Hậu quả**: Mất lòng dân, phá hoại khối đại đoàn kết, suy yếu Đảng.`,
    tags: ["Đạo đức", "Cán bộ", "Tham nhũng"]
  },
  {
    id: 2,
    title: "Sinh viên học vẹt, coi thường môn TTHCM",
    context: "Sinh viên B học môn TTHCM nhưng chỉ học vẹt để qua môn, không cố gắng hiểu và vận dụng vào thực tế. B cho rằng môn học này không thực tế và không cần thiết.",
    question: "Theo tư tưởng HCM về giáo dục và đạo đức, nhận xét thái độ của B và đề xuất phương pháp học đúng đắn?",
    analysis: `**Phân tích:**\n\n**Sai lầm của B:**\n- Vi phạm tinh thần "Học để làm việc, làm người" mà HCM nhấn mạnh\n- Không kết hợp học với hành – trái với tư tưởng HCM về giáo dục\n\n**HCM về học tập:**\n"Học không bao giờ đủ. Học mãi để tiến bộ mãi."\n\n**Phương pháp học đúng đắn:**\n1. Học để HIỂU lý luận, không học vẹt\n2. Kết hợp lý luận với thực tiễn cuộc sống\n3. Tự rèn luyện đạo đức theo gương Bác\n4. Liên hệ với các sự kiện thực tế hiện nay`,
    tags: ["Giáo dục", "Sinh viên", "Thực hành"]
  },
  {
    id: 3,
    title: "Xung đột lợi ích nhóm trong hoạch định chính sách",
    context: "Trong một cuộc họp, một nhóm đề xuất chính sách chỉ có lợi cho người giàu với lý do 'thu hút đầu tư'. Nhóm khác phản đối vì ảnh hưởng người nghèo. Hai bên tranh cãi gay gắt.",
    question: "Áp dụng tư tưởng HCM về đại đoàn kết và nhà nước, hãy phân tích thế nào là giải pháp đúng đắn?",
    analysis: `**Vận dụng Tư tưởng HCM:**\n\n**Nguyên tắc nhà nước "vì nhân dân":**\nNhà nước của nhân dân, DO nhân dân, VÌ nhân dân – không phải vì một nhóm lợi ích.\n\n**Quan điểm đại đoàn kết:**\n- Đoàn kết trên cơ sở lợi ích CHUNG của dân tộc\n- Không hi sinh lợi ích của số đông vì lợi ích của thiểu số\n\n**Giải pháp theo TTHCM:**\n1. Lấy lợi ích nhân dân làm tiêu chuẩn\n2. Dân chủ: lắng nghe ý kiến nhân dân rộng rãi trước khi quyết định\n3. Phát triển kinh tế phải đảm bảo công bằng xã hội\n4. "Làm cho mọi người có cơm ăn áo mặc, học hành"`,
    tags: ["Nhà nước", "Đại đoàn kết", "Công bằng xã hội"]
  },
  {
    id: 4,
    title: "Bảo tồn văn hoá truyền thống trong thời đại hội nhập",
    context: "Một thành phố đang xem xét phá dỡ khu phố cổ 100 năm tuổi để xây dựng trung tâm thương mại hiện đại. Một số người cho rằng phát triển kinh tế quan trọng hơn bảo tồn văn hoá.",
    question: "Theo tư tưởng HCM về văn hoá và dân tộc, bạn phân tích và đề xuất hướng giải quyết phù hợp?",
    analysis: `**Phân tích theo Tư tưởng HCM về Văn hoá:**\n\n**Quan điểm HCM về văn hoá:**\n- "Văn hoá soi đường cho quốc dân đi"\n- Văn hoá có tính ĐỘC LẬP TƯƠNG ĐỐI với kinh tế, không đơn thuần phụ thuộc\n\n**Tính chất Dân tộc trong văn hoá:**\n- Nền văn hoá phải mang bản sắc DÂN TỘC\n- Không thể đánh đổi văn hoá lấy tăng trưởng kinh tế đơn thuần\n\n**Đề xuất theo TTHCM:**\n1. Bảo tồn và phát huy giá trị của khu phố cổ\n2. Phát triển kinh tế DU LỊCH VĂN HOÁ — kết hợp bảo tồn với kinh tế\n3. Lấy ý kiến nhân dân (dân chủ thực chất)\n4. Phát triển cần ĐẶT NHÂN DÂN LÀM TRUNG TÂM`,
    tags: ["Văn hoá", "Phát triển", "Bản sắc dân tộc"]
  }
];

// ─── Mindmap data chi tiết theo từng chương ─────────
const MINDMAP_DATA = {
  0: {
    label: "Tư tưởng Hồ Chí Minh",
    color: "#C41E3A",
    desc: "Hệ thống tư tưởng toàn diện về CMVN",
    children: [
      { label: "Nguồn gốc", color: "#8B0000", desc: "Dân tộc, nhân loại, Mác-Lênin", children: [
        { label: "Mác-Lênin ★", color: "#7b0b0b", desc: "Nguồn gốc chủ yếu, quyết định bản chất CM, KH" },
        { label: "Truyền thống DT", color: "#7b0b0b", desc: "Yêu nước, nhân nghĩa, đoàn kết" },
        { label: "Tinh hoa nhân loại", color: "#7b0b0b", desc: "Phương Đông (Nho, Phật) & Tây (tự do, bình đẳng)" },
      ]},
      { label: "Độc lập DT & CNXH", color: "#D4A017", desc: "Hai mục tiêu gắn bó hữu cơ", children: [
        { label: "Độc lập thực sự", color: "#b7791f", desc: "Toàn diện: CT, KT, QS, NG, VH" },
        { label: "Gắn với hạnh phúc dân", color: "#b7791f", desc: "'Nước độc lập mà dân không hạnh phúc...'" },
        { label: "CNXH – con đường", color: "#b7791f", desc: "Quá độ gián tiếp, lâu dài" },
      ]},
      { label: "Đảng CS VN", color: "#1565C0", desc: "Thành lập 3/2/1930", children: [
        { label: "Nền tảng Mác-Lênin", color: "#0d47a1", desc: "Kim chỉ nam hành động" },
        { label: "Tập trung dân chủ", color: "#0d47a1", desc: "Nguyên tắc CƠ BẢN NHẤT" },
        { label: "Công bộc của dân", color: "#0d47a1", desc: "Đảng viên là đầy tớ nhân dân" },
      ]},
      { label: "Đại đoàn kết DT", color: "#2E7D32", desc: "Chiến lược cơ bản, lâu dài", children: [
        { label: "Liên minh C-N-TT", color: "#1b5e20", desc: "Nền tảng đoàn kết" },
        { label: "Mặt trận Thống nhất", color: "#1b5e20", desc: "Hình thức tổ chức" },
        { label: "Đoàn kết quốc tế", color: "#1b5e20", desc: "CS, GPDT, hoà bình tiến bộ" },
      ]},
      { label: "Nhà nước & DC", color: "#6A1B9A", desc: "Của dân, do dân, vì dân", children: [
        { label: "Dân là chủ", color: "#4a148c", desc: "Quyền lực thuộc về nhân dân" },
        { label: "Dân chủ = Mục tiêu + Động lực", color: "#4a148c", desc: "Thực chất, không hình thức" },
        { label: "Pháp quyền XHCN", color: "#4a148c", desc: "Thượng tôn pháp luật" },
      ]},
      { label: "Văn hoá, Đạo đức", color: "#00838F", desc: "'Văn hoá soi đường cho quốc dân'", children: [
        { label: "5 Đức tính", color: "#006064", desc: "Trung-Cần-Thương-QT-Dũng" },
        { label: "Nói đi đôi làm", color: "#006064", desc: "Nguyên tắc đạo đức số 1" },
        { label: "Phong cách HCM", color: "#006064", desc: "Tư duy, Diễn đạt, Ứng xử, Sinh hoạt" },
      ]},
    ]
  }
};

// Export
window.AppData = {
  CHAPTERS,
  CHAPTER_CONTENT,
  FLASHCARDS,
  QUIZ_QUESTIONS,
  AI_RESPONSES,
  SUGGESTED_PROMPTS,
  CASE_STUDIES,
  MINDMAP_DATA,
};
