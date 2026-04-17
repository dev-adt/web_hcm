/**
 * Dữ liệu giáo trình môn Tư tưởng Hồ Chí Minh
 * Cấu trúc: 8 Đơn vị (0-7) chuẩn theo tài liệu giáo trình
 * ĐÃ MỞ RỘNG: 80+ Quiz, 80+ Flashcards, Mindmap 5 cấp độ.
 * =====================================================
 */

const CHAPTERS = [
  { id: 0, title: "Chương Mở Đầu", subtitle: "Đối tượng, phương pháp nghiên cứu và ý nghĩa học tập môn Tư tưởng Hồ Chí Minh", icon: "🔰", color: "#607D8B" },
  { id: 1, title: "Chương I", subtitle: "Cơ sở, quá trình hình thành và phát triển tư tưởng Hồ Chí Minh", icon: "📖", color: "#F44336" },
  { id: 2, title: "Chương II", subtitle: "Tư tưởng Hồ Chí Minh về vấn đề dân tộc và cách mạng giải phóng dân tộc", icon: "🚩", color: "#FFC107" },
  { id: 3, title: "Chương III", subtitle: "Tư tưởng Hồ Chí Minh về chủ nghĩa xã hội và con đường quá độ lên chủ nghĩa xã hội ở Việt Nam", icon: "🌟", color: "#FF9800" },
  { id: 4, title: "Chương IV", subtitle: "Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam", icon: "⭐", color: "#2196F3" },
  { id: 5, title: "Chương V", subtitle: "Tư tưởng Hồ Chí Minh về đại đoàn kết dân tộc và đoàn kết quốc tế", icon: "🤝", color: "#4CAF50" },
  { id: 6, title: "Chương VI", subtitle: "Tư tưởng Hồ Chí Minh về xây dựng Nhà nước của dân, do dân, vì dân", icon: "🏛️", color: "#9C27B0" },
  { id: 7, title: "Chương VII", subtitle: "Tư tưởng Hồ Chí Minh về văn hoá, đạo đức và xây dựng con người mới", icon: "🎨", color: "#00BCD4" },
];

const CHAPTER_CONTENT = {
  0: {
    summary: "Giới thiệu về đối tượng, nhiệm vụ, phương pháp nghiên cứu và ý nghĩa của việc học tập tư tưởng Hồ Chí Minh.",
    keyPoints: [
      { icon: "🎯", title: "Đối tượng nghiên cứu", content: "Hệ thống các quan điểm, luận điểm về cách mạng Việt Nam; quá trình vận động, hiện thực hóa các quan điểm đó trong thực tiễn." },
      { icon: "🛠️", title: "Phương pháp luận", content: "Dựa trên thế giới quan và phương pháp luận Mác-Lênin: Tính đảng, Tính khoa học, Lịch sử - cụ thể, Toàn diện - hệ thống." },
      { icon: "💡", title: "Ý nghĩa học tập", content: "Nâng cao tư duy lý luận; Bồi dưỡng đạo đức cách mạng; Xây dựng bản lĩnh chính trị." }
    ],
    quotes: [{ text: "Đảng lấy chủ nghĩa Mác – Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động.", author: "Đại hội VII, 1991" }]
  },
  1: {
    summary: "Nguồn gốc lý luận (Truyền thống, Nhân loại, Mác-Lênin) và 5 giai đoạn hình thành phát triển TTHCM.",
    keyPoints: [
      { icon: "🌱", title: "Cơ sở khách quan", content: "Bối cảnh lịch sử Việt Nam và thời đại đầu thế kỷ XX (CM Tháng Mười Nga)." },
      { icon: "📖", title: "Tiền đề tư tưởng", content: "Truyền thống ưu nước; Tinh hoa văn hoá nhân loại; Chủ nghĩa Mác-Lênin (nguồn gốc chủ yếu)." },
      { icon: "⏳", title: "Quá trình hình thành", content: "Năm giai đoạn từ 1890 đến 1969; mỗi giai đoạn đánh dấu một bước chuyển về nhận thức." }
    ],
    quotes: [{ text: "Lúc đầu chính là chủ nghĩa yêu nước, chứ chưa phải chủ nghĩa cộng sản đã đưa tôi tin theo Lênin.", author: "Hồ Chí Minh" }]
  },
  2: {
    summary: "Vấn đề dân tộc và con đường cách mạng giải phóng dân tộc đi tới độc lập hoàn toàn.",
    keyPoints: [
       { icon: "🏳️", title: "Độc lập dân tộc", content: "Quyền thiêng liêng nhất; gắn liền với tự do, hạnh phúc của dân." },
       { icon: "🚩", title: "Cách mạng Vô sản", content: "Con đường cứu nước duy nhất đúng đắn; do Đảng lãnh đạo." },
       { icon: "⚔️", title: "Bạo lực cách mạng", content: "Kết hợp đấu tranh chính trị và vũ trang; Đem sức ta giải phóng cho ta." }
    ],
    quotes: [{ text: "Không có gì quý hơn độc lập, tự do.", author: "Hồ Chí Minh" }]
  },
  3: {
    summary: "Bản chất CNXH và con đường quá độ đặc thù của Việt Nam.",
    keyPoints: [
      { icon: "🌟", title: "Bản chất CNXH", content: "Xã hội dân làm chủ; kinh tế phát triển; không còn bóc lột." },
      { icon: "🛤️", title: "Thời kỳ quá độ", content: "Quá độ gián tiếp, không qua TBCN; lâu dài, khó khăn." },
      { icon: "⚙️", title: "Động lực", content: "Lợi ích của dân; tinh thần đoàn kết; vai trò con người." }
    ],
    quotes: [{ text: "Muốn có chủ nghĩa xã hội, trước hết cần có những con người xã hội chủ nghĩa.", author: "Hồ Chí Minh" }]
  },
  4: {
    summary: "Xây dựng Đảng trong sạch, vững mạnh - nhân tố quyết định thắng lợi Cách mạng.",
    keyPoints: [
      { icon: "⭐", title: "Bản chất Đảng", content: "Đội tiên phong GCCN, đồng thời là Đảng của dân tộc." },
      { icon: "⚙️", title: "Nguyên tắc xây dựng", content: "Tập trung dân chủ; Tự phê bình & phê bình; Kỷ luật nghiêm minh." },
      { icon: "🌟", title: "Cán bộ Đảng viên", content: "Cần Kiệm Liêm Chính; Là công bộc của nhân dân." }
    ],
    quotes: [{ text: "Đoàn kết là sức mạnh, là then chốt của thành công.", author: "Hồ Chí Minh" }]
  },
  5: {
    summary: "Chiến lược đại đoàn kết và sự kết hợp sức mạnh dân tộc với thời đại.",
    keyPoints: [
      { icon: "🤝", title: "Đại đoàn kết dân tộc", content: "Chiến lược hàng đầu; 'Đoàn kết, đoàn kết, đại đoàn kết'." },
      { icon: "🏗️", title: "Mặt trận thống nhất", content: "Nơi tập hợp mọi lực lượng yêu nước trên nền tảng Công - Nông - Trí." },
      { icon: "🌏", title: "Đoàn kết quốc tế", content: "Thống nhất mục tiêu độc lập; Giúp bạn là tự giúp mình." }
    ],
    quotes: [{ text: "Thành công, thành công, đại thành công.", author: "Hồ Chí Minh" }]
  },
  6: {
    summary: "Kiến tạo Nhà nước kiểu mới: của dân, do dân, vì dân.",
    keyPoints: [
      { icon: "⚖️", title: "Dân chủ thực sự", content: "Dân là chủ & Dân làm chủ trong mọi hoạt động xã hội." },
      { icon: "🏛️", title: "Nhà nước Pháp quyền", content: "Quản lý bằng pháp luật; cán bộ là công bộc của dân." },
      { icon: "🚫", title: "Chống tiêu cực", content: "Tiêu diệt tham ô, lãng phí, quan liêu." }
    ],
    quotes: [{ text: "Địa vị cao nhất là dân, vì dân là chủ.", author: "Hồ Chí Minh" }]
  },
  7: {
    summary: "Phát triển Văn hoá soi đường, Đạo đức làm gốc và Con người là động lực.",
    keyPoints: [
      { icon: "🎨", title: "Văn hoá", content: "Dân tộc, Khoa học, Đại chúng; thúc đẩy kinh tế-chính trị." },
      { icon: "🔰", title: "Đạo đức", content: "Cái gốc người cách mạng; Trung với nước, Hiếu với dân." },
      { icon: "🌳", title: "Con người", content: "Mục tiêu và Động lực; Phải 'trồng người' cho tương lai." }
    ],
    quotes: [{ text: "Có đức mà không có tài làm việc gì cũng khó; có tài mà không có đức là vô dụng.", author: "Hồ Chí Minh" }]
  }
};

const FLASHCARDS = [
  // C0: 10
  { id: 1, chapter: 0, front: "Định nghĩa TTHCM theo Đại hội XI?", back: "Hệ thống quan điểm toàn diện, sâu sắc về những vấn đề cơ bản của CMVN.", difficulty: 2 },
  { id: 2, chapter: 0, front: "Đối tượng nghiên cứu chính?", back: "Hệ thống các quan điểm, lý luận và quá trình hiện thực hóa trong thực tiễn CM.", difficulty: 1 },
  { id: 3, chapter: 0, front: "Sáu phương pháp luận cơ bản?", back: "Tính đảng-khoa học; Lý luận-thực tiễn; Lịch sử; Toàn diện; Kế thừa; Nghiên cứu cụ thể.", difficulty: 3 },
  { id: 4, chapter: 0, front: "Hạt nhân cốt lõi của TTHCM?", back: "Độc lập dân tộc gắn liền với Chủ nghĩa xã hội.", difficulty: 1 },
  { id: 5, chapter: 0, front: "Nhiệm vụ nghiên cứu hàng đầu?", back: "Làm rõ nguồn gốc, quá trình hình thành và nội dung bản chất của TTHCM.", difficulty: 2 },
  { id: 6, chapter: 0, front: "Ý nghĩa về mặt lý luận?", back: "Nâng cao tư duy lý luận và phương pháp làm việc cho cán bộ, đảng viên.", difficulty: 1 },
  { id: 7, chapter: 0, front: "Quan điểm 'Lấy dân làm gốc' thể hiện phương pháp luận nào?", back: "Quan điểm quần chúng và sự thống nhất giữa lý luận với thực tiễn.", difficulty: 2 },
  { id: 8, chapter: 0, front: "Đại hội VII (1991) đánh dấu điều gì?", back: "Khẳng định lấy Chủ nghĩa Mác-Lênin và TTHCM làm nền tảng tư tưởng.", difficulty: 1 },
  { id: 9, chapter: 0, front: "Ý nghĩa bồi dưỡng phẩm chất?", back: "Giúp rèn luyện đạo đức cách mạng, chống chủ nghĩa cá nhân.", difficulty: 1 },
  { id: 10, chapter: 0, front: "Sự khác biệt giữa Tư tưởng HCM và cuộc đời HCM?", back: "Tư tưởng là hệ thống lý luận, cuộc đời là quá trình hoạt động thực tiễn sinh động.", difficulty: 2 },
  // C1: 10
  { id: 11, chapter: 1, front: "Ba nguồn gốc lý luận chính?", back: "1. Truyền thống dân tộc; 2. Tinh hoa văn hóa nhân loại; 3. Chủ nghĩa Mác-Lênin.", difficulty: 1 },
  { id: 12, chapter: 1, front: "Nguồn gốc quan trọng nhất?", back: "Chủ nghĩa Mác-Lênin (quyết định bản chất).", difficulty: 1 },
  { id: 13, chapter: 1, front: "5 giai đoạn hình thành?", back: "1890-1911; 1911-1920; 1920-1930; 1930-1945; 1945-1969.", difficulty: 2 },
  { id: 14, chapter: 1, front: "Ý nghĩa của CM Tháng Mười Nga (1917)?", back: "Lôi cuốn Người hướng về phía Lênin và tin theo con đường CM vô sản.", difficulty: 2 },
  { id: 15, chapter: 1, front: "Yếu tố phương Tây HCM tiếp thu?", back: "Tự do, Bình đẳng, Bác ái và tư tưởng dân chủ đại nghị.", difficulty: 2 },
  { id: 16, chapter: 1, front: "Tư tưởng Nho giáo được HCM kế thừa?", back: "Triết lý hành động, nhập thế và tu thân dưỡng tính.", difficulty: 2 },
  { id: 17, chapter: 1, front: "Sự kiện 1920 tại Đại hội Tours?", back: "Bỏ phiếu tán thành Quốc tế III, trở thành người cộng sản VN đầu tiên.", difficulty: 1 },
  { id: 18, chapter: 1, front: "Mục đích 'Tìm đường cứu nước'?", back: "Tìm con đường thực sự mang lại độc lập cho dân tộc và tự do cho đồng bào.", difficulty: 1 },
  { id: 19, chapter: 1, front: "Tên gọi giai đoạn 1945 - 1969?", back: "Giai đoạn TTHCM tiếp tục phát triển, soi đường cho sự nghiệp kháng chiến, kiến quốc.", difficulty: 2 },
  { id: 20, chapter: 1, front: "Nhân tố chủ quan quan trọng nhất?", back: "Tư duy độc lập, tự chủ, sáng tạo và lòng yêu nước thương dân vô hạn.", difficulty: 2 },
  // C2: 10
  { id: 21, chapter: 2, front: "Nội dung cốt lõi của vấn đề dân tộc?", back: "Độc lập cho dân tộc, tự do cho nhân dân.", difficulty: 1 },
  { id: 22, chapter: 2, front: "Mối quan hệ Dân tộc - Giai cấp?", back: "Giải phóng dân tộc là nhiệm vụ hàng đầu, là tiền đề giải phóng giai cấp.", difficulty: 2 },
  { id: 23, chapter: 2, front: "Hình thái bạo lực cách mạng?", back: "Kết hợp đấu tranh chính trị với đấu tranh vũ trang.", difficulty: 2 },
  { id: 24, chapter: 2, front: "Tính chất của CM GPDT ở VN?", back: "Cách mạng dân tộc dân chủ nhân dân tiến lên CM vô sản.", difficulty: 2 },
  { id: 25, chapter: 2, front: "Ai là chủ thể của CM GPDT?", back: "Nhân dân lao động, nòng cốt là công nhân và nông dân.", difficulty: 1 },
  { id: 26, chapter: 2, front: "Nhiệm vụ cấp bách sau 1945?", back: "Diệt giặc đói, giặc dốt, giặc ngoại xâm; bảo vệ nền độc lập.", difficulty: 2 },
  { id: 27, chapter: 2, front: "TTHCM về chủ quyền biển đảo?", back: "Khẳng định chủ quyền toàn vẹn lãnh thổ, không để mất một tấc đất.", difficulty: 2 },
  { id: 28, chapter: 2, front: "Vai trò của trí thức trong CM?", back: "Là bầu bạn của công nông, truyền bá lý luận cách mạng.", difficulty: 2 },
  { id: 29, chapter: 2, front: "Sức mạnh tự lực cánh sinh?", back: "Đem sức ta mà giải phóng cho ta, không ỷ lại bên ngoài.", difficulty: 1 },
  { id: 30, chapter: 2, front: "Mục tiêu cuối cùng của CM GPDT?", back: "Đi tới chủ nghĩa xã hội và chủ nghĩa cộng sản.", difficulty: 2 },
  // C3: 10
  { id: 31, chapter: 3, front: "Định nghĩa đơn giản nhất về CNXH?", back: "Là xã hội không còn người bóc lột người, ai cũng có cơm ăn, áo mặc.", difficulty: 1 },
  { id: 32, chapter: 3, front: "Động lực nội lực then chốt?", back: "Sợi dây liên kết giữa Đảng với quần chúng nhân dân.", difficulty: 2 },
  { id: 33, chapter: 3, front: "Đặc điểm cơ bản của thời kỳ quá độ?", back: "Xen kẽ giữa cái cũ và cái mới, có sự đấu tranh quyết liệt.", difficulty: 2 },
  { id: 34, chapter: 3, front: "Lĩnh vực kinh tế ưu tiên ban đầu?", back: "Phát triển nông nghiệp và tiểu thủ công nghiệp.", difficulty: 2 },
  { id: 35, chapter: 3, front: "Vai trò của trí thức trong CNXH?", back: "Lực lượng then chốt để nắm bắt và ứng dụng khoa học kỹ thuật.", difficulty: 2 },
  { id: 36, chapter: 3, front: "Mối quan hệ Độc lập - CNXH?", back: "Độc lập dân tộc là tiền đề, CNXH là mục tiêu hướng tới.", difficulty: 1 },
  { id: 37, chapter: 3, front: "Kẻ thù nguy hiểm nhất của CNXH?", back: "Chủ nghĩa cá nhân.", difficulty: 1 },
  { id: 38, chapter: 3, front: "Phương châm xây dựng CNXH?", back: "Tiến nhanh, tiến mạnh, tiến vững chắc.", difficulty: 2 },
  { id: 39, chapter: 3, front: "Học tập kinh nghiệm quốc tế?", back: "Học tập có chọn lọc, không áp dụng máy móc rập khuôn.", difficulty: 2 },
  { id: 40, chapter: 3, front: "Thành phần kinh tế quốc doanh?", back: "Giữ vai trò chủ đạo trong nền kinh tế nhiều thành phần.", difficulty: 3 },
  // C4: 10
  { id: 41, chapter: 4, front: "Đảng là gì đối với dân tộc?", back: "Là đội tiên phong, là bộ tham mưu chiến đấu.", difficulty: 1 },
  { id: 42, chapter: 4, front: "5 nguyên tắc xây dựng Đảng?", back: "1.Tập trung dân chủ; 2.Tự phê bình; 3.Kỷ luật; 4.Đoàn kết; 5.Gần dân.", difficulty: 3 },
  { id: 43, chapter: 4, front: "Định nghĩa 'Đảng đạo đức, văn minh'?", back: "Tiêu biểu cho trí tuệ, danh dự, lương tâm của dân tộc.", difficulty: 2 },
  { id: 44, chapter: 4, front: "Nhiệm vụ của Đảng viên?", back: "Phục vụ nhân dân, là công bộc trung thành của dân.", difficulty: 1 },
  { id: 45, chapter: 4, front: "Cơ sở của đoàn kết trong Đảng?", back: "Dựa trên đường lối và tình đồng chí thương yêu lẫn nhau.", difficulty: 2 },
  { id: 46, chapter: 4, front: "Đảng cầm quyền có nghĩa là gì?", back: "Lãnh đạo nhân dân xây dựng và quản lý xã hội mới.", difficulty: 2 },
  { id: 47, chapter: 4, front: "Chống chủ nghĩa bè phái?", back: "Loại bỏ thói kéo bè kéo cánh, cục bộ địa phương.", difficulty: 2 },
  { id: 48, chapter: 4, front: "Vai trò của phê bình?", back: "Vũ khí sắc bén để Đảng tiến bộ và trong sạch.", difficulty: 1 },
  { id: 49, chapter: 4, front: "Kỷ luật của Đảng?", back: "Kỷ luật sắt, nghiêm minh một cách tự giác.", difficulty: 2 },
  { id: 50, chapter: 4, front: "Di chúc dặn dò về sự đoàn kết?", back: "Phải giữ gìn như giữ gìn con ngươi của mắt mình.", difficulty: 1 },
  // C5: 10
  { id: 51, chapter: 5, front: "Sức mạnh của đại đoàn kết?", back: "Là chiến lược hàng đầu quyết định mọi thắng lợi.", difficulty: 1 },
  { id: 52, chapter: 5, front: "Nền tảng của Mặt trận dân tộc?", back: "Liên minh công-nông-trí và sự lãnh đạo của Đảng.", difficulty: 2 },
  { id: 53, chapter: 5, front: "Nguyên tắc hoạt động của Mặt trận?", back: "Hiệp thương dân chủ, thống nhất hành động tự nguyện.", difficulty: 2 },
  { id: 54, chapter: 5, front: "Ba lực lượng đoàn kết quốc tế?", back: "Phong trào CS-CN; Phong trào GPDT; Các lực lượng hòa bình.", difficulty: 3 },
  { id: 55, chapter: 5, front: "Tinh thần quốc tế HCM?", back: "Hữu nghị, hợp tác, tôn trọng chủ quyền lẫn nhau.", difficulty: 2 },
  { id: 56, chapter: 5, front: "Lòng khoan dung độ lượng?", back: "Tập hợp mọi người dân yêu nước, không hẹp hòi thành kiến.", difficulty: 2 },
  { id: 57, chapter: 5, front: "Chống chủ nghĩa nào trong quan hệ?", back: "Chống chủ nghĩa dân tộc hẹp hòi, vị kỷ.", difficulty: 3 },
  { id: 58, chapter: 5, front: "Câu nói nổi tiếng về Khmer-Lào?", back: "Giúp bạn là tự giúp mình.", difficulty: 1 },
  { id: 59, chapter: 5, front: "Đoàn kết tôn giáo?", back: "Đoàn kết lương-giáo vì mục tiêu độc lập, tự do.", difficulty: 1 },
  { id: 60, chapter: 5, front: "Yếu tố thời đại?", back: "Kết hợp sức mạnh trong nước với xu thế tiến bộ thế giới.", difficulty: 2 },
  // C6: 10
  { id: 61, chapter: 6, front: "Nhà nước 'Của dân' là gì?", back: "Mọi quyền bính trong nước đều thuộc về toàn dân.", difficulty: 1 },
  { id: 62, chapter: 6, front: "Nhà nước 'Vì dân' là gì?", back: "Mọi hoạt động đều lấy lợi ích của dân làm mục tiêu.", difficulty: 1 },
  { id: 63, chapter: 6, front: "Pháp quyền HCM?", back: "Quản lý bằng pháp luật, thượng tôn hiến pháp.", difficulty: 2 },
  { id: 64, chapter: 6, front: "Cán bộ là 'Công bộc'?", back: "Là người phục vụ lợi ích của dân, không phải 'quan cách mạng'.", difficulty: 1 },
  { id: 65, chapter: 6, front: "Giặc nội xâm là ai?", back: "Tham ô, lãng phí và bệnh quan liêu.", difficulty: 2 },
  { id: 66, chapter: 6, front: "Yêu cầu cán bộ: Đức & Tài?", back: "Cần cả hai, trong đó Đức là nền tảng của Tài.", difficulty: 2 },
  { id: 67, chapter: 6, front: "Quyền kiểm soát của dân?", back: "Dân bầu ra và có quyền bãi miễn cán bộ sai phạm.", difficulty: 2 },
  { id: 68, chapter: 6, front: "Chống đặc quyền đặc lợi?", back: "Xây dựng nhà nước trong sạch, liêm chính.", difficulty: 2 },
  { id: 69, chapter: 6, front: "Mối quan hệ Dân làm chủ?", back: "Quyền tối thượng đặt ở nơi dân.", difficulty: 1 },
  { id: 70, chapter: 6, front: "Nghĩa vụ công dân?", back: "Sống và làm việc theo hiến pháp, pháp luật.", difficulty: 1 },
  // C7: 10
  { id: 71, chapter: 7, front: "Định nghĩa văn hoá của HCM?", back: "Toàn bộ những sáng tạo vì sinh tồn và mục đích cuộc sống.", difficulty: 2 },
  { id: 72, chapter: 7, front: "3 tính chất văn hoá mới?", back: "Dân tộc, Khoa học, Đại chúng.", difficulty: 1 },
  { id: 73, chapter: 7, front: "Văn hoá SOI ĐƯỜNG?", back: "Định hướng tâm lý, niềm tin và hành động cho dân tộc.", difficulty: 2 },
  { id: 74, chapter: 7, front: "Đạo đức là GỐC?", back: "Làm CM mà không có đức thì không thể lãnh đạo dân.", difficulty: 1 },
  { id: 75, chapter: 7, front: "Cần Kiệm Liêm Chính?", back: "Nền tảng của đời sống mới, tinh hoa đạo đức Việt Nam.", difficulty: 1 },
  { id: 76, chapter: 7, front: "Chí công vô tư?", back: "Không nghĩ đến mình trước, lo cho dân cho nước.", difficulty: 2 },
  { id: 77, chapter: 7, front: "Xây đi đôi với Chống?", back: "Xây phẩm chất mới đồng thời loại bỏ thói hư tật xấu.", difficulty: 2 },
  { id: 78, chapter: 7, front: "Mục tiêu trồng người?", back: "Đào tạo con người xã hội chủ nghĩa có đức và tài.", difficulty: 1 },
  { id: 79, chapter: 7, front: "Văn nghệ sĩ là chiến sĩ?", back: "Tham gia cuộc chiến giữa chính-tà trên mặt trận văn hoá.", difficulty: 2 },
  { id: 80, chapter: 7, front: "Lối sống tinh nghĩa?", back: "Sống có nghĩa tình, thuỷ chung theo đạo lý VN.", difficulty: 1 }
];

const QUIZ_QUESTIONS = [
  // C0: 10
  { id: 1, chapter: 0, question: "Phương pháp luận cơ bản nhất khi nghiên cứu TTHCM là gì?", options: ["Lịch sử-cụ thể", "Thống nhất tính đảng và tính khoa học", "Toàn diện", "Thực tiễn"], correct: 1, explain: "Sự kết hợp giữa lập trường giai cấp và sự khách quan khoa học." },
  { id: 2, chapter: 0, question: "Khái niệm TTHCM được hoàn thiện tại Đại hội nào?", options: ["Đại hội VI", "Đại hội VII", "Đại hội XI", "Đại hội XII"], correct: 2, explain: "Năm 2011, định nghĩa được bổ sung đầy đủ các nguồn gốc." },
  { id: 3, chapter: 0, question: "Đối tượng nghiên cứu của môn học bao gồm:", options: ["Chỉ các tác phẩm của HCM", "Chỉ cuộc đời hoạt động của HCM", "Hệ thống quan điểm và quá trình hiện thực hóa", "Lịch sử Đảng"], correct: 2, explain: "Phải bao gồm cả tư tưởng và kết quả thực tiễn của nó." },
  { id: 4, chapter: 0, question: "Môn TTHCM giúp sinh viên củng cố điều gì?", options: ["Kỹ năng ngoại ngữ", "Đạo đức cách mạng & Bản lĩnh chính trị", "Kiến thức kinh tế", "Kỹ năng lập trình"], correct: 1, explain: "Mục tiêu cốt lõi của giáo dục lý luận chính trị." },
  { id: 5, chapter: 0, question: "Hạt nhân của TTHCM là gì?", options: ["Chủ nghĩa yêu nước", "Giải phóng phong kiến", "Độc lập dân tộc gắn liền CNXH", "Phát triển công nghiệp"], correct: 2, explain: "Đây là sợi chỉ đỏ xuyên suốt toàn bộ tư tưởng của Người." },
  { id: 6, chapter: 0, question: "Quan điểm 'Lịch sử - cụ thể' yêu cầu:", options: ["Xem xét sự vật trong sự vận động", "Đặt sự vật vào bối cảnh ra đời của nó", "Ghi nhớ ngày tháng", "So sánh với tương lai"], correct: 1, explain: "Hiểu đúng tư tưởng phải hiểu hoàn cảnh lịch sử tạo ra nó." },
  { id: 7, chapter: 0, question: "TTHCM có nguồn gốc lý luận từ đâu?", options: ["Văn hoá Hy Lạp", "Chủ nghĩa Mác-Lênin & Truyền thống dân tộc", "Cách mạng công nghiệp", "Nho giáo thuần túy"], correct: 1, explain: "Sự kết hợp giữa tinh hoa dân tộc và trí tuệ thời đại." },
  { id: 8, chapter: 0, question: "Nhiệm vụ nghiên cứu TTHCM là:", options: ["Làm rõ vai trò lãnh đạo của Đảng", "Chứng minh TTHCM là đúng", "Làm rõ nguồn gốc, quá trình, nội dung bản chất", "Kể chuyện lịch sử"], correct: 2, explain: "Nhiệm vụ khoa học đòi hỏi phân tích cấu trúc và quy luật phát triển." },
  { id: 9, chapter: 0, question: "Phương pháp 'Toàn diện - Hệ thống' giúp gì?", options: ["Học được nhiều kiến thức", "Thấy được mối liên hệ giữa các chuẩn mực tư tưởng", "Ghi nhớ nhanh", "Tìm ra điểm yếu"], correct: 1, explain: "Các tư tưởng của Người luôn nằm trong một chỉnh thể thống nhất." },
  { id: 10, chapter: 0, question: "Đại hội VII (1991) khẳng định TTHCM là:", options: ["Một tài liệu tham khảo", "Nền tảng tư tưởng, kim chỉ nam cho hành động", "Một phong trào văn hoá", "Lý thuyết kinh tế"], correct: 1, explain: "Dấu mốc lý luận quan trọng bậc nhất của Đảng ta." },
  // C1: 10
  { id: 11, chapter: 1, question: "Nguồn gốc chủ yếu, quyết định bản chất TTHCM là:", options: ["Văn hoá Đông Phương", "Chủ nghĩa Mác-Lênin", "Truyền thống ưu nước", "Văn hoá Tây Phương"], correct: 1, explain: "Cơ sở lý luận khoa học và cách mạng nhất thế giới." },
  { id: 12, chapter: 1, question: "Bước ngoặt từ yêu nước đến cộng sản của HCM là năm nào?", options: ["1911", "1917", "1920", "1930"], correct: 2, explain: "Sự kiện đọc Luận cương Lênin và tham gia Đảng Xã hội Pháp." },
  { id: 13, chapter: 1, question: "HCM tiếp thu gì từ Nho giáo?", options: ["Tam tòng tứ đức", "Triết lý hành động, tu thân dưỡng tính", "Chủ nghĩa bá quyền", "Trật tự quân thần"], correct: 1, explain: "Chọn lọc yếu tố tích cực về nhân cách và trách nhiệm xã hội." },
  { id: 14, chapter: 1, question: "Nhân tố chủ quan quan trọng nhất hình thành TTHCM?", back: "Tư duy độc lập, tự chủ, sáng tạo", options: ["Sức khoẻ", "Tư duy độc lập, sáng tạo", "Gia đình giàu có", "Học vị cao"], correct: 1, explain: "Giải quyết các mâu thuẫn thực tiễn bằng trí tuệ riêng biệt." },
  { id: 15, chapter: 1, question: "Thời kỳ 1920-1930 là giai đoạn gì?", options: ["Tìm đường cứu nước", "Hình thành cơ bản tư tưởng về CMVN", "Hoàn thiện tư tưởng", "Thử thách"], correct: 1, explain: "Dưới sự dẫn dắt của CN Mác-Lênin qua tác phẩm 'Đường Cách mệnh'." },
  { id: 16, chapter: 1, question: "Tác phẩm chuẩn bị chính trị cho việc lập Đảng là:", options: ["Bản án thực dân Pháp", "Đường Cách mệnh", "Cương lĩnh", "Di chúc"], correct: 1, explain: "Hệ thống bài giảng chính trị của Người tại Quảng Châu." },
  { id: 17, chapter: 1, question: "HCM sinh ra trong gia đình như thế nào?", options: ["Nông dân giàu", "Trí thức hủ nho", "Nhà nho yêu nước", "Công nhân"], correct: 2, explain: "Phụ thân là cụ Nguyễn Sinh Sắc, một nhà nho cấp tiến yêu nước." },
  { id: 18, chapter: 1, question: "Địa danh HCM ra đi tìm đường cứu nước?", options: ["Cửa Hội", "Hướng Hoá", "Bến Nhà Rồng", "Hải Phòng"], correct: 2, explain: "Ngày 5/6/1911, xuất hành từ Sài Gòn." },
  { id: 19, chapter: 1, question: "HCM tiếp thu gì từ Phật giáo?", options: ["Kinh kệ", "Sự cứu rỗi thần linh", "Lòng nhân từ, tinh thần bình đẳng, bác ái", "Xóa bỏ gia đình"], correct: 2, explain: "Trân trọng tính nhân văn sâu sắc của nhà Phật." },
  { id: 20, chapter: 1, question: "Giai đoạn 1930-1945 là thời kỳ:", options: ["Tiếp nhận CM", "Thử thách, giữ vững đường lối", "Cầm quyền", "Ra đi cứu nước"], correct: 1, explain: "Bảo vệ quan điểm CM giải phóng dân tộc trước những thay đổi quốc tế." },
  // C2: 10
  { id: 21, chapter: 2, question: "Thực chất vấn đề dân tộc ở thuộc địa là gì?", options: ["Đòi bình đẳng xã hội", "Đấu tranh chống thực dân, giành độc lập", "Phát triển thương mại", "Giữ gìn tiếng Việt"], correct: 1, explain: "Mâu thuẫn giữa dân tộc bị áp bức và chủ nghĩa thực dân." },
  { id: 22, chapter: 2, question: "Lực lượng của CM giải phóng dân tộc bao gồm:", options: ["Công nhân & Nông dân", "Toàn dân tộc (Công-Nông là gốc)", "Chỉ tầng lớp trí thức", "Địa chủ & Tư sản"], correct: 1, explain: "Chiến lược đoàn kết toàn dân để tạo sức mạnh tổng hợp." },
  { id: 23, chapter: 2, question: "Mối quan hệ CM thuộc địa & CM chính quốc?", options: ["Thuộc địa lệ thuộc", "Thuộc địa có thể thắng lợi trước", "Chính quốc quan trọng hơn", "Không liên quan"], correct: 1, explain: "Sáng tạo lớn của HCM so với lý luận cũ." },
  { id: 24, chapter: 2, question: "Bạo lực cách mạng theo HCM là:", options: ["Chỉ đánh bom", "Kết hợp đấu tranh chính trị và vũ trang", "Chỉ đấu tranh nghị trường", "Chỉ đình công"], correct: 1, explain: "Sử dụng sức mạnh tổng hợp của quần chúng." },
  { id: 25, chapter: 2, question: "Câu nói nổi tiếng tại Versailles (1919) liên quan đến:", options: ["Bản Yêu sách 8 điểm", "Tuyên ngôn Độc lập", "Đường Cách mệnh", "Khuyên thanh niên"], correct: 0, explain: "Gây chấn động dư luận thế giới về vấn đề Việt Nam." },
  { id: 26, chapter: 2, question: "Kháng chiến Toàn dân, Toàn diện, Lâu dài là để:", options: ["Làm suy yếu địch dần dần", "Huy động mọi nguồn lực, đem sức ta tự giải phóng", "Chờ viện trợ", "Trốn tránh đối đầu"], correct: 1, explain: "Chiến lược dựa vào sức mình là chính." },
  { id: 27, chapter: 2, question: "'Nước độc lập mà dân không hưởng tự do hạnh phúc' thì sao?", options: ["Không sao cả", "Vẫn tốt hơn thuộc địa", "Độc lập chẳng nghĩa lý gì", "Cần phát triển kinh tế thêm"], correct: 2, explain: "Độc lập phải đi đôi với dân sinh, dân quyền." },
  { id: 28, chapter: 2, question: "Con đường cứu nước duy nhất HCM chọn là:", options: ["CM Tư sản", "CM Vô sản", "Cải cách hiến pháp", "Đấu tranh tôn giáo"], correct: 1, explain: "Chi theo con đường vô sản mới giải phóng tận gốc." },
  { id: 29, chapter: 2, question: "Lãnh đạo CM giải phóng dân tộc là:", options: ["Giai cấp tư sản", "Các sĩ phu yêu nước", "Đảng Cộng sản", "Giới học giả"], correct: 2, explain: "Đảng là bộ tham mưu nắm vững lý luận CM." },
  { id: 30, chapter: 2, question: "Năm khẳng định: 'Không có gì quý hơn độc lập, tự do'?", options: ["1945", "1954", "1966", "1969"], correct: 2, explain: "Lời kêu gọi quyết tâm đánh thắng giặc Mỹ." },
  // C3: 10
  { id: 31, chapter: 3, question: "Mục tiêu cao nhất của CNXH là:", options: ["Phát triển công nghiệp nặng", "Nâng cao đời sống vật chất & tinh thần của dân", "Tiêu diệt kẻ thù", "Xây dựng quân đội"], correct: 1, explain: "CNXH vì con người và do con người." },
  { id: 32, chapter: 3, question: "Đặc điểm lớn nhất thời kỳ quá độ lên CNXH ở VN?", options: ["Quá độ trực tiếp", "Quá độ gián tiếp từ nông nghiệp lạc hậu", "Dựa hoàn toàn vào máy móc", "Đã giàu có sẵn"], correct: 1, explain: "Đặc trưng bỏ qua giai đoạn phát triển TBCN." },
  { id: 33, chapter: 3, question: "Động lực quan trọng của CNXH là gì?", options: ["Của cải", "Khoa học công nghệ", "Đại đoàn kết & Lợi ích bền vững của dân", "Vũ khí"], correct: 2, explain: "Lòng tin và sức mạnh của khối đại đoàn kết." },
  { id: 34, chapter: 3, question: "Trong kinh tế, HCM chủ trương phát triển gì trước?", options: ["Công nghiệp nặng", "Nông nghiệp & Công nghiệp nhẹ", "Tín dụng ngân hàng", "Thương mại điện tử"], correct: 1, explain: "Tính đến điều kiện cụ thể của một nước nông nghiệp." },
  { id: 35, chapter: 3, question: "Quản lý kinh tế trong CNXH dựa trên:", options: ["Kế hoạch hóa tập trung tuyệt đối", "Kết hợp kế hoạch với thị trường, hạch toán kinh tế", "Tự do hoàn toàn", "Chợ đen"], correct: 1, explain: "Sự linh hoạt trong quản lý kinh tế của Người." },
  { id: 36, chapter: 3, question: "Kẻ thù nguy hiểm nhất của CNXH là:", options: ["Lũ lụt", "Thực dân", "Chủ nghĩa cá nhân", "Sâu bệnh"], correct: 2, explain: "Nó đục khoét tâm tính người cách mạng từ bên trong." },
  { id: 37, chapter: 3, question: "Hình thức sở hữu nào cần ưu tiên xây dựng?", options: ["Sở hữu tư nhân", "Sở hữu toàn dân & tập thể", "Sở hữu nước ngoài", "Vô sở hữu"], correct: 1, explain: "Tạo nền tảng cho quan hệ sản xuất mới." },
  { id: 38, chapter: 3, question: "Biện pháp xây dựng CNXH là:", options: ["Dần dần, từng bước", "Dồn dập", "Làm trong 1 đêm", "Không làm gì"], correct: 0, explain: "Phải vững chắc và phù hợp với quy luật khách quan." },
  { id: 39, chapter: 3, question: "Vị trí của con người trong CNXH?", options: ["Công cụ lao động", "Vừa là mục tiêu, vừa là động lực", "Được hưởng thụ không cần làm", "Vô hình"], correct: 1, explain: "Trung tâm của sự phát triển xã hội." },
  { id: 40, chapter: 3, question: "Muốn xây dựng CNXH, Đảng phải:", options: ["Làm thay việc dân", "Thật sự trong sạch, vững mạnh", "Chỉ lo kinh doanh", "Ít gắn bó với dân"], correct: 1, explain: "Lãnh đạo bằng trí tuệ và đạo đức." },
  // C4: 10
  { id: 41, chapter: 4, question: "Nguyên tắc tổ chức sinh hoạt Đảng quan trọng nhất?", options: ["Kỷ luật", "Tập trung dân chủ", "Phê bình", "Đoàn kết"], correct: 1, explain: "Đảm bảo tính thống nhất và sức mạnh của Đảng." },
  { id: 42, chapter: 4, question: "Quy luật phát triển của Đảng là:", options: ["Sát nhập", "Tự phê bình và phê bình", "Đấu tranh giai cấp", "Tăng số lượng"], correct: 1, explain: "Để sửa lỗi và tiến bộ không ngừng." },
  { id: 43, chapter: 4, question: "Đảng là gì trong hệ thống chính trị?", options: ["Cơ quan thừa hành", "Tổ chức xã hội", "Lực lượng lãnh đạo nhà nước và xã hội", "Câu lạc bộ"], correct: 2, explain: "Sứ mệnh lịch sử của Đảng Cộng sản." },
  { id: 44, chapter: 4, question: "Trọng tâm của công tác xây dựng Đảng là:", options: ["Công tác cán bộ", "Công tác hậu cần", "Xây dựng nhà xưởng", "Du lịch"], correct: 0, explain: "Cán bộ là cái gốc của mọi công việc." },
  { id: 45, chapter: 4, question: "Phẩm chất quan trọng của người Đảng viên?", options: ["Biết làm giàu nhanh", "Cần, Kiệm, Liêm, Chính, Chí công vô tư", "Mưu mẹo", "Sành điệu"], correct: 1, explain: "Gương mẫu cho quần chúng noi theo." },
  { id: 46, chapter: 4, question: "Cơ sở hình thành Đảng CS Việt Nam?", options: ["CN Mác + Phong trào công nhân", "CN Mác + PT công nhân + PT yêu nước", "Ý chí cá nhân", "Viện trợ nước ngoài"], correct: 1, explain: "Sự sáng tạo của HCM trong quy luật lập Đảng tại VN." },
  { id: 47, chapter: 4, question: "Đoàn kết trong Đảng như giữ gìn:", options: ["Tiền bạc", "Danh tiếng", "Con ngươi của mắt mình", "Sức khoẻ"], correct: 2, explain: "Lời dặn trong Di chúc về sự sống còn của Đảng." },
  { id: 48, chapter: 4, question: "Nguyên tắc 'Tập trung dân chủ' nghĩa là:", options: ["Cá nhân quyết hết", "Tự do tuyệt đối", "Dân chủ dưới sự lãnh đạo tập trung", "Không cần lắng nghe"], correct: 2, explain: "Sự kết hợp hoàn hảo giữa ý chí tập thể và sự linh hoạt." },
  { id: 49, chapter: 4, question: "Chống chủ nghĩa cá nhân trong Đảng là để:", options: ["Tiêu diệt tự do", "Nâng cao năng lực lãnh đạo và phẩm chất đạo đức", "Tiết kiệm thời gian", "Phân chia quyền lực"], correct: 1, explain: "Đảm bảo Đảng luôn 'là đạo đức, là văn minh'." },
  { id: 50, chapter: 4, question: "Phương thức lãnh đạo của Đảng là:", options: ["Mệnh lệnh áp đặt", "Lãnh đạo bằng đường lối, gương mẫu và thuyết phục", "Làm thay nhà nước", "Sử dụng quân hiệu"], correct: 1, explain: "Lãnh đạo khéo léo và có sức hút." },
  // C5: 10
  { id: 51, chapter: 5, question: "Vị trí của Đại đoàn kết dân tộc?", options: ["Sách lược tạm thời", "Chiến lược hàng đầu, lâu dài", "Phụ trợ", "Yếu tố phụ"], correct: 1, explain: "Chìa khóa của mọi thắng lợi." },
  { id: 52, chapter: 5, question: "Ai là nòng cốt của khối đại đoàn kết?", options: ["Địa chủ-Tư sản", "Công-Nông-Trí", "Sinh viên", "Kiều bào"], correct: 1, explain: "Lực lượng đông đảo và cách mạng nhất." },
  { id: 53, chapter: 5, question: "Hình thức tổ chức khối đại đoàn kết?", options: ["Đảng", "Chính phủ", "Mặt trận dân tộc thống nhất", "Phường xã"], correct: 2, explain: "Nơi quy tụ mọi thành phần yêu nước." },
  { id: 54, chapter: 5, question: "Châm ngôn: 'Đoàn kết, đoàn kết, ...'?", options: ["Đại đoàn kết", "Thành công", "Khỏe mạnh", "Cố gắng"], correct: 0, explain: "Vế thứ nhất của câu khẩu hiệu bất hủ." },
  { id: 55, chapter: 5, question: "Trong quan hệ với Lào-Cam, Bác dặn gì?", options: ["Phải cạnh tranh", "Giúp bạn là tự giúp mình", "Phải quản lý bạn", "Chỉ lo cho mình"], correct: 1, explain: "Sứ mệnh đoàn kết khu vực và quốc tế." },
  { id: 56, chapter: 5, question: "Đoàn kết dân tộc phải dựa trên cơ sở:", options: ["Chia rẽ", "Thống nhất lợi ích dân tộc & quyền lợi dân nhân", "Áp đặt", "Sở thích"], correct: 1, explain: "Điểm chung lớn nhất của mọi người Việt Nam." },
  { id: 57, chapter: 5, question: "Hồ Chí Minh chủ trương đoàn kết với ai?", options: ["Chỉ những người theo Đảng", "Tất cả những ai có lòng yêu nước", "Chỉ những người giàu", "Học sinh thôi"], correct: 1, explain: "Chính sách bao dung và rộng rãi." },
  { id: 58, chapter: 5, question: "Đại đoàn kết quốc tế có vai trò:", options: ["Phân chia thế giới", "Kết hợp sức mạnh dân tộc với sức mạnh thời đại", "Làm đẹp hình ảnh", "Thu phí"], correct: 1, explain: "Tăng cường nội lực thông qua ngoại lực." },
  { id: 59, chapter: 5, question: "Chống chủ nghĩa hẹp hòi trong đoàn kết để:", options: ["Dễ quản lý", "Mở rộng khối đoàn kết tối đa", "Gây chia rẽ", "Tiết kiệm"], correct: 1, explain: "Lấy tình thương dân tộc xóa bỏ định kiến." },
  { id: 60, chapter: 5, question: "Mặt trận Việt Minh ra đời năm nào?", options: ["1930", "1941", "1945", "1954"], correct: 1, explain: "Cột mốc tập hợp dân tộc cho CM Tháng Tám." },
  // C6: 10
  { id: 61, chapter: 6, question: "Nhà nước 'Vì dân' là nhà nước như thế nào?", options: ["Chỉ phục vụ quan lại", "Chăm lo lợi ích chính đáng của nhân dân", "Chỉ lo đánh giặc", "Áp bức dân"], correct: 1, explain: "Lấy dân làm đối tượng phục vụ cao nhất." },
  { id: 62, chapter: 6, question: "Để chống tham ô, Bác gọi đó là:", options: ["Giặc nội xâm", "Rác rưởi", "Sai lầm nhỏ", "Tai nạn"], correct: 0, explain: "Nguy hiểm hơn cả giặc ngoại xâm." },
  { id: 63, chapter: 6, question: "Quyền lực cao nhất trong nhà nước là ai?", options: ["Chủ tịch nước", "Quân đội", "Nhân dân", "Tòa án"], correct: 2, explain: "Bản chất của dân chủ nhân dân." },
  { id: 64, chapter: 6, question: "Cán bộ là 'Công bộc' có nghĩa là:", options: ["Làm quan", "Đầy tớ trung thành phục vụ nhân dân", "Ông chủ của dân", "Tự do cá nhân"], correct: 1, explain: "Mối quan hệ đúng đắn giữa cán bộ và quần chúng." },
  { id: 65, chapter: 6, question: "Nhà nước Pháp quyền theo HCM quản lý bằng:", options: ["Mệnh lệnh", "Hiến pháp và Pháp luật", "Lòng tin", "Tôn giáo"], correct: 1, explain: "TTHCM về tính thượng tôn pháp luật." },
  { id: 66, chapter: 6, question: "Tội lỗi tham ô lãng phí Bác ví với:", options: ["Tội ngộ sát", "Tội Việt gian, mật thám", "Sai sót hành chính", "Sơ suất"], correct: 1, explain: "Sự nghiêm khắc đối với những hành vi hại dân hại nước." },
  { id: 67, chapter: 6, question: "Cơ quan hành chính cao nhất nước ta là:", options: ["Quốc hội", "Chính phủ", "Tòa án", "Mặt trận"], correct: 1, explain: "Nhiệm vụ thi hành các quyết định của dân." },
  { id: 68, chapter: 6, question: "Nhà nước dân chủ theo HCM đảm bảo:", options: ["Tự do vô kỷ luật", "Dân là chủ & Dân làm chủ", "Mọi người đều giàu như nhau", "Không có biên giới"], correct: 1, explain: "Hai mặt của quyền và nghĩa vụ công dân." },
  { id: 69, chapter: 6, question: "Hồ Chí Minh phê bình bệnh 'Cậy thế' để:", options: ["Hù dọa dân", "Hách dịch, cửa quyền", "Tiết kiệm", "Làm việc nhanh"], correct: 1, explain: "Nhằm xây dựng hình ảnh cán bộ thân dân." },
  { id: 70, chapter: 6, question: "Xây dựng nhà nước trong sạch cần kết hợp:", options: ["Chỉ dùng pháp luật", "Pháp luật & Giáo dục đạo đức", "Chỉ dùng giáo dục", "Bỏ qua kỉ luật"], correct: 1, explain: "Sức mạnh của cả kỉ cương và lương tâm." },
  // C7: 10
  { id: 71, chapter: 7, question: "Định nghĩa văn hoá của HCM nhấn mạnh yếu tố gì?", options: ["Học thức", "Sự sáng tạo vì sinh tồn và mục đích cuộc sống", "Nghệ thuật", "Du lịch"], correct: 1, explain: "Nhìn nhận văn hoá ở góc độ nhân sinh quan rộng lớn." },
  { id: 72, chapter: 7, question: "Tính chất nào KHÔNG thuộc nền văn hoá mới?", options: ["Dân tộc", "Khoa học", "Đại chúng", "Kinh viện"], correct: 3, explain: "Nền văn hoá mới phải thực tế và hướng về dân." },
  { id: 73, chapter: 7, question: "Vị trí của Đạo đức trong cách mạng?", options: ["Là cái gốc", "Là đồ trang trí", "Là thứ yếu", "Để khoe khoang"], correct: 0, explain: "Nền tảng của nhân cách người cách mạng." },
  { id: 74, chapter: 7, question: "Mối quan hệ Hồng & Chuyên là gì?", options: ["Hồng quan trọng hơn", "Chuyên quan trọng hơn", "Thống nhất giữa Đức & Tài", "Tách rời nhau"], correct: 2, explain: "Yêu cầu toàn diện đối với cán bộ, sinh viên." },
  { id: 75, chapter: 7, question: "Để 'Trồng người', nhiệm vụ quan trọng là gì?", options: ["Bán sách", "Xây nhiều nhà", "Giáo dục & rèn luyện toàn diện", "Chụp ảnh"], correct: 2, explain: "Sự nghiệp lâu dài vì tương lai dân tộc." },
  { id: 76, chapter: 7, question: "Chống chủ nghĩa cá nhân để làm gì?", options: ["Loại bỏ tính riêng tư", "Khơi dậy lòng yêu nước, tinh thần vị tha", "Làm máy móc", "Tiết kiệm"], correct: 1, explain: "Vượt qua sự ích kỷ để cống hiến." },
  { id: 77, chapter: 7, question: "Lối sống mới theo HCM cần tránh:", options: ["Giản dị", "Khiêm tốn", "Phù hoa xa xỉ", "Sạch sẽ"], correct: 2, explain: "Tránh thói khoe khoang, hưởng lạc phí phạm." },
  { id: 78, chapter: 7, question: "Văn hoá SOI ĐƯỜNG cho quốc dân đi nghĩa là:", options: ["Dùng đèn pin", "Định hướng giá trị và niềm tin", "Chỉ đường giao thông", "Làm biển báo"], correct: 1, explain: "Vai trò dẫn dắt tinh thần của văn hoá." },
  { id: 79, chapter: 7, question: "Trong 'Di chúc', Bác dặn điều gì đầu tiên?", options: ["Mua sắm", "Công việc đối với con người", "Xây nhà", "Học tiếng Anh"], correct: 1, explain: "Tư tưởng nhân văn sâu sắc về con người." },
  { id: 80, chapter: 7, question: "Phẩm chất 'Trung với nước, Hiếu với dân' mang nghĩa gì?", options: ["Lòng trung thành mù quán", "Suốt đời phấn đấu vì lợi ích quốc gia và nhân dân", "Phụng sự vua", "Bỏ qua gia đình"], correct: 1, explain: "Chuẩn mực đạo đức cao nhất của CM mới." }
];

const MINDMAP_DATA = {
  id: "root",
  label: "Tư tưởng Hồ Chí Minh",
  color: "#C41E3A",
  children: [
    {
      id: "c0",
      label: "Chương Mở Đầu",
      desc: "Đối tượng, phương pháp và ý nghĩa",
      children: [
        {
          label: "Đối tượng nghiên cứu",
          children: [
            { label: "Quan điểm CMVN", desc: "Hệ thống lý luận toàn diện về cách mạng giải phóng dân tộc và xây dựng xã hội mới." },
            { label: "Quá trình hiện thực hóa", desc: "Sự vận động, phát triển lý luận trong thực tiễn đấu tranh cách mạng." }
          ]
        },
        {
          label: "Phương pháp luận",
          children: [
            { label: "Tính đảng & Khoa học", desc: "Sự thống nhất giữa lập trường chính trị vững vàng và phương pháp nghiên cứu khách quan." },
            { label: "Lý luận & Thực tiễn", desc: "Lý luận phải gắn liền với thực hành, tránh giáo điều và kinh nghiệm chủ nghĩa." },
            { label: "Lịch sử - Cụ thể", desc: "Xem xét sự vật trong bối cảnh lịch sử và điều kiện thực tế của đất nước." }
          ]
        }
      ]
    },
    {
      id: "c1",
      label: "Chương I: Cơ sở & Quá trình",
      children: [
        {
          label: "Nguồn gốc lý luận",
          children: [
            { label: "Truyền thống yêu nước", desc: "Giá trị tinh thần hàng đầu, động lực thúc đẩy tìm đường cứu nước." },
            { label: "Chủ nghĩa Mác-Lênin", desc: "Cơ sở thế giới quan và phương pháp luận khoa học, quyết định bản chất TTHCM." },
            { label: "Tinh hoa nhân loại", desc: "Sự kết hợp giữa tư tưởng phương Đông (Nho, Phật, Lão) và văn hóa phương Tây." }
          ]
        },
        {
          label: "Các giai đoạn",
          children: [
            { label: "1890-1911", desc: "Giai đoạn hình thành tư tưởng yêu nước và chí hướng cứu nước." },
            { label: "1911-1920", desc: "Tìm tòi, khảo sát thực tiễn thế giới, đến với chủ nghĩa Mác-Lênin." },
            { label: "1920-1930", desc: "Hình thành cơ bản hệ thống lý luận về cách mạng Việt Nam." },
            { label: "1930-1945", desc: "Vượt qua thử thách, giữ vững đường lối cách mạng đúng đắn." },
            { label: "1945-1969", desc: "Bổ sung, phát triển và hoàn thiện tư tưởng về xây dựng chế độ mới." }
          ]
        }
      ]
    },
    {
      id: "c2",
      label: "Chương II: Dân tộc & CM GPDT",
      children: [
        {
          label: "Vấn đề Dân tộc",
          children: [
            { label: "Độc lập dân tộc", desc: "Quyền tối cao, thiêng liêng; 'Không có gì quý hơn độc lập tự do'." },
            { label: "Chống thực dân", desc: "Bản chất là giải phóng thuộc địa, chống lại ách áp bức của chủ nghĩa đế quốc." },
            { label: "Chủ nghĩa dân tộc", desc: "Sức mạnh to lớn của dân tộc, động lực vĩ đại của đất nước." }
          ]
        },
        {
          label: "Cách mạng GPDT",
          children: [
            { label: "Cách mạng vô sản", desc: "Lựa chọn duy nhất đúng để giành độc lập thực sự và hướng tới CNXH." },
            { label: "Đảng lãnh đạo", desc: "Nhân tố quyết định thắng lợi hàng đầu của cách mạng." },
            { label: "Sức mạnh nội lực", desc: "Chủ động, tự lực cánh sinh: 'Đem sức ta mà giải phóng cho ta'." }
          ]
        }
      ]
    },
    {
      id: "c3",
      label: "Chương III: CNXH & Quá độ",
      children: [
        {
          label: "Bản chất CNXH",
          children: [
            { label: "Chính trị", desc: "Chế độ do nhân dân lao động làm chủ, quyền lực thuộc về dân." },
            { label: "Kinh tế", desc: "Nền kinh tế phát triển cao, gắn với khoa học kĩ thuật và sở hữu công cộng." },
            { label: "Văn hoá - Đạo đức", desc: "Xã hội văn minh, con người phát triển toàn diện, không còn bóc lột." }
          ]
        },
        {
          label: "Mục tiêu & Động lực",
          children: [
            { label: "Mục tiêu", desc: "Nâng cao đời sống nhân dân, dân giàu nước mạnh, xã hội công bằng." },
            { label: "Lợi ích con người", desc: "Con người là mục tiêu đồng thời là động lực then chốt của CNXH." },
            { label: "Sức mạnh đoàn kết", desc: "Khối đại đoàn kết dân tộc là nguồn sức mạnh vô tận." }
          ]
        },
        {
          label: "Thời kì quá độ",
          children: [
            { label: "Đặc điểm", desc: "Là cuộc đấu tranh giữa cái cũ kĩ và cái mới mẻ, tốt tươi." },
            { label: "Bước đi", desc: "Lâu dài, gian khổ, tiến từng bước vững chắc, không nôn nóng." }
          ]
        }
      ]
    },
    {
      id: "c4",
      label: "Chương IV: Đảng Cộng sản VN",
      children: [
        {
          label: "Sự ra đời của Đảng",
          children: [
            { label: "3 yếu tố kết hợp", desc: "Chủ nghĩa Mác-Lênin + Phong trào công nhân + Phong trào yêu nước." },
            { label: "Bản chất Đảng", desc: "Đội tiên phong của giai cấp công nhân, của nhân dân lao động và dân tộc." }
          ]
        },
        {
          label: "Vai trò lãnh đạo",
          children: [
            { label: "Người cầm lái", desc: "Đảng vững cách mệnh mới thành công, như người cầm lái vững thuyền mới chạy." },
            { label: "Đảng cầm quyền", desc: "Vừa là người lãnh đạo, vừa là người đầy tớ thật trung thành của nhân dân." }
          ]
        },
        {
          label: "Xây dựng Đảng",
          children: [
            { label: "Nhiệm vụ then chốt", desc: "Phải giữ gìn sự đoàn kết nhất trí như giữ gìn con ngươi của mắt mình." },
            { label: "Tự phê bình", desc: "Vũ khí sắc bén để Đảng luôn trong sạch, vững mạnh." },
            { label: "Cấp bách & Lâu dài", desc: "Chống chủ nghĩa cá nhân, nâng cao đạo đức cách mạng." }
          ]
        }
      ]
    },
    {
      id: "c5",
      label: "Chương V: Đại đoàn kết",
      children: [
        {
          label: "Đoàn kết dân tộc",
          children: [
            { label: "Chiến lược hàng đầu", desc: "Đoàn kết, đoàn kết, đại đoàn kết - Thành công, thành công, đại thành công." },
            { label: "Lực lượng", desc: "Đại đoàn kết toàn dân, nòng cốt là liên minh Công - Nông - Trí thức." },
            { label: "Mặt trận DTTN", desc: "Hình thức tổ chức thực tế của khối đại đoàn kết dân tộc." }
          ]
        },
        {
          label: "Đoàn kết quốc tế",
          children: [
            { label: "Sức mạnh thời đại", desc: "Kết hợp sức mạnh dân tộc với sức mạnh thời đại để giành thắng lợi." },
            { label: "Lợi ích chung", desc: "Giúp bạn là tự giúp mình, giữ vững hòa bình và độc lập dân tộc." },
            { label: "Hữu nghị 5 châu", desc: "Làm bạn với tất cả các nước dân chủ và không gây thù chuốc oán với ai." }
          ]
        }
      ]
    },
    {
      id: "c6",
      label: "Chương VI: Nhà nước dân chủ",
      children: [
        {
          label: "Bản chất Nhà nước",
          children: [
            { label: "Của dân", desc: "Mọi quyền lực trong nước đều là của toàn thể nhân dân Việt Nam." },
            { label: "Do dân", desc: "Dân lập ra, dân ủng hộ, dân tham gia quản lí và giám sát." },
            { label: "Vì dân", desc: "Mọi việc đều nhằm đưa lại lợi ích cho dân, là công bộc của dân." }
          ]
        },
        {
          label: "Nhà nước pháp quyền",
          children: [
            { label: "Thượng tôn pháp luật", desc: "Quản lí xã hội bằng Hiến pháp và hệ thống pháp luật chặt chẽ." },
            { label: "Công bằng nghiêm minh", desc: "Pháp luật phải được thực thi công bằng, không có ngoại lệ." }
          ]
        },
        {
          label: "Trong sạch vững mạnh",
          children: [
            { label: "Chống tham ô", desc: "Tham ô, lãng phí và bệnh quan liêu là bạn đồng minh của giặc ngoại xâm." },
            { label: "Xây dựng cán bộ", desc: "Đào tạo những người có đức, có tài để phục vụ Tổ quốc." }
          ]
        }
      ]
    },
    {
      id: "c7",
      label: "Chương VII: Văn hoá & Đạo đức",
      children: [
        {
          label: "Quan điểm Văn hoá",
          children: [
            { label: "3 Tính chất", desc: "Tính dân tộc - Tính khoa học - Tính đại chúng." },
            { label: "Vị trí", desc: "Văn hóa soi đường cho quốc dân đi, nằm trong kinh tế và chính trị." },
            { label: "Động lực", desc: "Văn hóa là mục tiêu đồng thời là động lực của sự phát triển." }
          ]
        },
        {
          label: "Đạo đức cách mạng",
          children: [
            { label: "Cái gốc", desc: "Đạo đức là gốc của người cách mạng, như sông có nguồn, cây có gốc." },
            { label: "Chuẩn mực", desc: "Trung với nước hiếu với dân; Cần Kiệm Liêm Chính Chí công vô tư." },
            { label: "Nguyên tắc", desc: "Nói đi đôi với làm; Xây đi đôi với chống; Tu dưỡng suốt đời." }
          ]
        },
        {
          label: "Xây dựng con người",
          children: [
            { label: "Vì lợi ích 100 năm", desc: "'Vì lợi ích mười năm phải trồng cây, vì lợi ích trăm năm phải trồng người'." },
            { label: "Con người mới", desc: "Vừa 'Hồng' vừa 'Chuyên', có đức có tài, có ý thức làm chủ xã hội." }
          ]
        }
      ]
    }
  ]
};

const AI_RESPONSES = {
  "giới thiệu": "Chào mừng bạn! Tôi là trợ lý ảo hỗ trợ học tập môn Tư tưởng Hồ Chí Minh. Bạn có thể hỏi về bất kỳ chương nào từ 0 đến 7.",
  "độc lập": "Quan điểm của Bác: 'Không có gì quý hơn độc lập, tự do'. Đây là giá trị cốt lõi nhất của dân tộc.",
  "đạo đức": "Đạo đức là GỐC của người cách mạng. Người nhấn mạnh 4 tính chất: Cần - Kiệm - Liêm - Chính.",
  "đảng": "Đảng là đạo đức, là văn minh. Đảng phải giữ gìn sự đoàn kết như giữ gìn con ngươi của mắt mình.",
  "nhà nước": "Nhà nước của dân, do dân, vì dân. Quyền lực tối thượng thuộc về nhân dân."
};

const SUGGESTED_PROMPTS = [
  "Tóm tắt 5 giai đoạn hình thành TTHCM",
  "Nội dung chuẩn mực đạo đức cách mạng",
  "Mối quan hệ giữa độc lập dân tộc và CNXH",
  "Các nguyên tắc xây dựng Đảng",
  "Đặc điểm nhà nước pháp quyền HCM"
];

const CASE_STUDIES = [
  {
    id: 1,
    title: "Vận dụng TTHCM trong kinh tế thị trường",
    context: "Làm thế nào để phát triển kinh tế mà không mất đi định hướng XHCN?",
    question: "Quan điểm của Người về động lực con người được áp dụng như thế nào?",
    analysis: "Hài hòa lợi ích cá nhân, tập thể và xã hội; khơi dậy lòng yêu nước và sáng tạo.",
    tags: ["Kinh tế", "CNXH"]
  }
];

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
