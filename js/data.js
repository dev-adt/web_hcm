// =====================================================
// DATA.JS — Dữ liệu nội dung môn Tư tưởng Hồ Chí Minh
// =====================================================

const CHAPTERS = [
  { id: 1, title: "Chương 1", subtitle: "Khái niệm, nguồn gốc, quá trình hình thành và phát triển tư tưởng Hồ Chí Minh", icon: "📖" },
  { id: 2, title: "Chương 2", subtitle: "Tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội", icon: "🏴" },
  { id: 3, title: "Chương 3", subtitle: "Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam", icon: "⭐" },
  { id: 4, title: "Chương 4", subtitle: "Tư tưởng Hồ Chí Minh về đại đoàn kết dân tộc và đoàn kết quốc tế", icon: "🤝" },
  { id: 5, title: "Chương 5", subtitle: "Tư tưởng Hồ Chí Minh về dân chủ và nhà nước của nhân dân, do nhân dân, vì nhân dân", icon: "🏛️" },
  { id: 6, title: "Chương 6", subtitle: "Tư tưởng Hồ Chí Minh về văn hoá, đạo đức và con người", icon: "🌟" },
];

const FLASHCARDS = [
  // Chương 1
  { id: 1, chapter: 1, front: "Tư tưởng Hồ Chí Minh là gì?", back: "Là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, từ cách mạng dân tộc dân chủ nhân dân đến cách mạng xã hội chủ nghĩa; là kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác – Lênin vào điều kiện cụ thể của Việt Nam." },
  { id: 2, chapter: 1, front: "Ba nguồn gốc lý luận của Tư tưởng Hồ Chí Minh?", back: "1. Truyền thống tốt đẹp của dân tộc Việt Nam\n2. Tinh hoa văn hoá nhân loại (Đông phương & Tây phương)\n3. Chủ nghĩa Mác – Lênin (nguồn gốc chủ yếu nhất, quyết định bản chất cách mạng, khoa học)" },
  { id: 3, chapter: 1, front: "Giai đoạn hình thành tư tưởng yêu nước và chí hướng cứu nước (1890–1911)", back: "Từ lúc sinh ra đến khi rời Tổ quốc tìm đường cứu nước. Tiếp thu truyền thống yêu nước dân tộc, chứng kiến thất bại của các phong trào yêu nước → quyết tâm tìm con đường mới." },
  { id: 4, chapter: 1, front: "Năm 1920 Nguyễn Ái Quốc đọc tác phẩm gì và ý nghĩa?", back: "Đọc 'Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và thuộc địa' của Lênin → Tìm thấy con đường cứu nước đúng đắn: con đường cách mạng vô sản." },
  { id: 5, chapter: 1, front: "Nhân tố chủ quan hình thành Tư tưởng Hồ Chí Minh?", back: "Phẩm chất cá nhân xuất sắc của Hồ Chí Minh:\n• Tư duy độc lập, sáng tạo\n• Tầm nhìn chiến lược\n• Lòng yêu nước, thương dân sâu sắc\n• Ham học hỏi, dày công nghiên cứu" },
  // Chương 2
  { id: 6, chapter: 2, front: "Luận điểm 'Không có gì quý hơn độc lập, tự do' có ý nghĩa gì?", back: "Là chân lý thời đại: khẳng định độc lập dân tộc là quyền thiêng liêng bất khả xâm phạm. Là mục tiêu cao nhất, là động lực mạnh mẽ nhất để nhân dân chiến đấu. Được thể hiện trong Tuyên ngôn Độc lập 1945." },
  { id: 7, chapter: 2, front: "Mối quan hệ giữa độc lập dân tộc và CNXH theo HCM?", back: "Hai mục tiêu gắn bó hữu cơ:\n• Độc lập dân tộc là điều kiện tiên quyết để thực hiện CNXH\n• CNXH là con đường duy nhất đảm bảo nền độc lập thực sự, bền vững\n• Giải phóng dân tộc → giải phóng giai cấp → giải phóng con người" },
  { id: 8, chapter: 2, front: "HCM xác định bản chất của CNXH ở Việt Nam như thế nào?", back: "CNXH là:\n• Làm cho nhân dân lao động thoát nạn bần cùng\n• Làm cho mọi người có công ăn việc làm, được ăn no mặc ấm, được học hành\n• Xã hội bình đẳng, không có áp bức bóc lột\n• Là xã hội ưu việt hơn xã hội cũ" },
  { id: 9, chapter: 2, front: "Con đường quá độ lên CNXH theo HCM?", back: "Quá độ gián tiếp: từ một nước thuộc địa nửa phong kiến, kinh tế lạc hậu tiến thẳng lên CNXH bỏ qua giai đoạn phát triển TBCN. Phải qua nhiều bước, nhiều giai đoạn, lâu dài, gian khổ." },
  // Chương 3
  { id: 10, chapter: 3, front: "Đảng Cộng sản Việt Nam ra đời ngày nào? Ai sáng lập?", back: "Ngày 3/2/1930. Người sáng lập và rèn luyện: Nguyễn Ái Quốc (Hồ Chí Minh). Đây là bước ngoặt vĩ đại của cách mạng Việt Nam." },
  { id: 11, chapter: 3, front: "Theo HCM, Đảng phải xây dựng trên nền tảng gì?", back: "Đảng lấy Chủ nghĩa Mác-Lênin làm nền tảng tư tưởng và kim chỉ nam hành động. Đảng phải có kỷ luật tự giác, thống nhất, gắn bó mật thiết với nhân dân." },
  { id: 12, chapter: 3, front: "Nguyên tắc xây dựng Đảng theo HCM?", back: "• Tập trung dân chủ (nguyên tắc cơ bản nhất)\n• Tự phê bình và phê bình\n• Kỷ luật nghiêm minh, tự giác\n• Đoàn kết thống nhất trong Đảng\n• Luôn gắn bó mật thiết với nhân dân" },
  // Chương 4
  { id: 13, chapter: 4, front: "Vai trò của đại đoàn kết dân tộc theo HCM?", back: "Là chiến lược cơ bản, lâu dài, nhất quán của cách mạng Việt Nam. Là nguồn sức mạnh, nhân tố quyết định thắng lợi của cách mạng. 'Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công.'" },
  { id: 14, chapter: 4, front: "Nền tảng của khối đại đoàn kết dân tộc?", back: "Liên minh công – nông – trí thức: Công nhân là giai cấp lãnh đạo, nông dân là lực lượng chủ yếu, trí thức là nền tảng quan trọng. Mặt trận Dân tộc Thống nhất là hình thức tổ chức." },
  // Chương 5
  { id: 15, chapter: 5, front: "Quan điểm của HCM về bản chất Nhà nước?", back: "Nhà nước của nhân dân, do nhân dân, vì nhân dân:\n• Tất cả quyền lực thuộc về nhân dân\n• Nhà nước do nhân dân làm chủ\n• Mọi hoạt động nhà nước vì lợi ích nhân dân" },
  { id: 16, chapter: 5, front: "Dân chủ theo tư tưởng HCM là gì?", back: "'Dân là chủ và dân làm chủ': Nhân dân là chủ thể quyền lực tối cao. Dân chủ vừa là mục tiêu, vừa là động lực của sự phát triển xã hội. Phải thực hiện dân chủ thực chất, không hình thức." },
  // Chương 6
  { id: 17, chapter: 6, front: "5 đức tính cơ bản trong đạo đức HCM?", back: "1. Trung với nước, hiếu với dân\n2. Cần, kiệm, liêm, chính, chí công vô tư\n3. Thương yêu con người, sống có tình nghĩa\n4. Tinh thần quốc tế trong sáng\n5. Dũng cảm, kiên cường (bổ sung)" },
  { id: 18, chapter: 6, front: "Nguyên tắc xây dựng đạo đức theo HCM?", back: "• Nói đi đôi với làm, phải nêu gương\n• Xây đi đôi với chống\n• Tu dưỡng đạo đức suốt đời\n• Đạo đức cách mạng không phải trên trời rơi xuống, phải do đấu tranh, rèn luyện bền bỉ" },
  { id: 19, chapter: 6, front: "Quan điểm về văn hoá của HCM?", back: "Văn hoá soi đường cho quốc dân đi. Văn hoá phải phục vụ kháng chiến, kiến quốc. Xây dựng nền văn hoá dân tộc, khoa học, đại chúng. Văn hoá là nền tảng tinh thần của xã hội." },
  { id: 20, chapter: 6, front: "Phong cách Hồ Chí Minh gồm những phong cách nào?", back: "• Phong cách tư duy (độc lập, sáng tạo, biện chứng)\n• Phong cách diễn đạt (ngắn gọn, dễ hiểu, hài hước)\n• Phong cách làm việc (khoa học, dân chủ)\n• Phong cách ứng xử (khiêm tốn, chân tình)\n• Phong cách sinh hoạt (giản dị, tiết kiệm)" },
];

const QUIZ_QUESTIONS = [
  { id: 1, chapter: 1, question: "Nguồn gốc lý luận chủ yếu, quyết định bản chất cách mạng và khoa học của Tư tưởng Hồ Chí Minh là gì?", options: ["Truyền thống tốt đẹp của dân tộc Việt Nam", "Chủ nghĩa Mác – Lênin", "Tinh hoa văn hoá phương Đông", "Tinh hoa văn hoá phương Tây"], correct: 1, explain: "Chủ nghĩa Mác – Lênin là nguồn gốc lý luận chủ yếu nhất, quyết định bản chất cách mạng, khoa học của Tư tưởng Hồ Chí Minh. Nó cung cấp thế giới quan, phương pháp luận khoa học cho HCM." },
  { id: 2, chapter: 1, question: "Năm nào Nguyễn Ái Quốc tìm thấy con đường cứu nước?", options: ["1911", "1919", "1920", "1930"], correct: 2, explain: "Năm 1920, Nguyễn Ái Quốc đọc 'Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và thuộc địa' của Lênin → Tìm thấy con đường cứu nước: con đường cách mạng vô sản." },
  { id: 3, chapter: 2, question: "Luận điểm 'Không có gì quý hơn độc lập, tự do' được HCM đưa ra trong bối cảnh nào?", options: ["Kháng chiến chống Pháp", "Kháng chiến chống Mỹ cứu nước", "Lúc soạn Tuyên ngôn Độc lập 1945", "Đại hội Đảng lần II"], correct: 1, explain: "Luận điểm 'Không có gì quý hơn độc lập, tự do' được Hồ Chí Minh đưa ra trong thời kỳ kháng chiến chống Mỹ cứu nước (năm 1965), trở thành chân lý thời đại." },
  { id: 4, chapter: 2, question: "Theo HCM, độc lập hoàn toàn có nghĩa là gì?", options: ["Chỉ cần không còn quân nước ngoài", "Độc lập về chính trị, kinh tế, văn hóa, quân sự", "Chỉ cần có chủ quyền lãnh thổ", "Được các nước lớn công nhận"], correct: 1, explain: "Theo HCM, độc lập thực sự là độc lập hoàn toàn, không phụ thuộc vào bất kỳ thế lực nào, bao gồm cả các mặt chính trị, kinh tế, quân sự, ngoại giao và văn hoá." },
  { id: 5, chapter: 3, question: "Đảng Cộng sản Việt Nam được thành lập vào ngày tháng năm nào?", options: ["19/5/1890", "3/2/1930", "2/9/1945", "21/7/1954"], correct: 1, explain: "Đảng Cộng sản Việt Nam thành lập ngày 3/2/1930 tại Hương Cảng (Hồng Kông) do Nguyễn Ái Quốc triệu tập và chủ trì Hội nghị hợp nhất các tổ chức cộng sản." },
  { id: 6, chapter: 3, question: "Nguyên tắc tổ chức cơ bản nhất của Đảng theo HCM là gì?", options: ["Đoàn kết thống nhất", "Tập trung dân chủ", "Kỷ luật nghiêm minh", "Gắn bó với nhân dân"], correct: 1, explain: "Nguyên tắc tập trung dân chủ là nguyên tắc tổ chức cơ bản nhất của Đảng Cộng sản, đảm bảo sự thống nhất ý chí và hành động trong khi vẫn phát huy dân chủ nội bộ." },
  { id: 7, chapter: 4, question: "Câu nói 'Đoàn kết, đoàn kết, đại đoàn kết...' được HCM nói trong dịp nào?", options: ["Tuyên ngôn Độc lập 1945", "Đại hội Mặt trận Tổ quốc 1955", "Đại hội Đảng lần III", "Lời kêu gọi toàn quốc kháng chiến"], correct: 1, explain: "Câu nói 'Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công' được HCM nói tại Đại hội Mặt trận Tổ quốc Việt Nam lần thứ I (1955)." },
  { id: 8, chapter: 4, question: "Lực lượng nào làm nền tảng của khối đại đoàn kết dân tộc theo HCM?", options: ["Giai cấp công nhân", "Liên minh công – nông – trí thức", "Giai cấp nông dân", "Tầng lớp trí thức"], correct: 1, explain: "Theo HCM, nền tảng của khối đại đoàn kết dân tộc là liên minh công – nông – trí thức, trong đó công nhân lãnh đạo, nông dân là lực lượng chủ yếu." },
  { id: 9, chapter: 5, question: "Theo HCM, ai là người chủ của Nhà nước?", options: ["Đảng Cộng sản Việt Nam", "Giai cấp công nhân", "Nhân dân lao động", "Hội đồng Nhà nước"], correct: 2, explain: "Theo HCM, nhân dân là người chủ của Nhà nước. 'Nhà nước ta là nhà nước của nhân dân, do nhân dân, vì nhân dân. Nhân dân là ông chủ nắm chính quyền'." },
  { id: 10, chapter: 5, question: "Mô hình Nhà nước lý tưởng theo tư tưởng HCM là?", options: ["Nhà nước pháp quyền tư sản", "Nhà nước của nhân dân, do nhân dân, vì nhân dân", "Nhà nước chuyên chính vô sản thuần túy", "Nhà nước liên bang"], correct: 1, explain: "HCM xây dựng lý luận về Nhà nước kiểu mới: nhà nước của nhân dân, do nhân dân, vì nhân dân – mang bản chất giai cấp công nhân, có tính nhân dân rộng rãi và tính dân tộc sâu sắc." },
  { id: 11, chapter: 6, question: "Đức tính đầu tiên và quan trọng nhất trong đạo đức HCM là gì?", options: ["Cần kiệm liêm chính", "Trung với nước, hiếu với dân", "Thương yêu con người", "Tinh thần quốc tế trong sáng"], correct: 1, explain: "'Trung với nước, hiếu với dân' là chuẩn mực đạo đức quan trọng hàng đầu trong tư tưởng đạo đức HCM, thể hiện mối quan hệ giữa cá nhân với Tổ quốc và nhân dân." },
  { id: 12, chapter: 6, question: "HCM đưa ra quan điểm nào về mối quan hệ giữa đạo đức và tài năng?", options: ["Đức quan trọng hơn tài", "Tài quan trọng hơn đức", "Có tài mà không có đức là người vô dụng", "Đức và tài ngang nhau"], correct: 2, explain: "Hồ Chí Minh nói: 'Có tài mà không có đức là người vô dụng. Có đức mà không có tài thì làm việc gì cũng khó'. Người đặt đức lên trên tài nhưng cả hai phải kết hợp." },
  { id: 13, chapter: 1, question: "Điểm xuất phát của tư tưởng Hồ Chí Minh về con đường cách mạng là gì?", options: ["Muốn cứu nước và giải phóng dân tộc không có con đường nào khác ngoài con đường cách mạng vô sản", "Phải học theo con đường của Liên Xô", "Phải liên minh với giai cấp tư sản dân tộc", "Phải tiến hành cách mạng văn hóa trước"], correct: 0, explain: "HCM khẳng định: 'Muốn cứu nước và giải phóng dân tộc không có con đường nào khác con đường cách mạng vô sản.' Đây là điểm xuất phát căn bản trong tư tưởng của Người." },
  { id: 14, chapter: 2, question: "Tư tưởng HCM về CNXH nhấn mạnh điều gì trước tiên?", options: ["Phát triển kinh tế mạnh mẽ", "Con người là trung tâm, vì con người, do con người", "Xây dựng quân đội vững mạnh", "Phát triển khoa học công nghệ"], correct: 1, explain: "Theo HCM, CNXH lấy con người làm trung tâm, vì con người, do con người xây dựng. Mục tiêu cao nhất là giải phóng và phát triển toàn diện con người." },
  { id: 15, chapter: 6, question: "Theo HCM, văn hoá có vai trò gì?", options: ["Chỉ là nghệ thuật, giải trí", "Soi đường cho quốc dân đi", "Phụ thuộc vào kinh tế hoàn toàn", "Chỉ quan trọng sau khi dân giàu nước mạnh"], correct: 1, explain: "HCM khẳng định: 'Văn hoá soi đường cho quốc dân đi'. Văn hoá có vai trò định hướng, dẫn dắt cách mạng, không phải là phụ thuộc mà có tính độc lập tương đối." },
];

const AI_RESPONSES = {
  "nguon goc tu tuong": {
    keywords: ["nguồn gốc", "hình thành", "ra đời", "xuất phát", "cơ sở"],
    response: `## Nguồn gốc Tư tưởng Hồ Chí Minh

Tư tưởng Hồ Chí Minh có **3 nguồn gốc lý luận** chính:

### 1. 🇻🇳 Truyền thống dân tộc Việt Nam
- Chủ nghĩa yêu nước, ý chí bất khuất, kiên cường
- Truyền thống nhân nghĩa, tương thân tương ái
- Tinh thần cố kết cộng đồng, ý thức cộng đồng

### 2. 🌏 Tinh hoa văn hoá nhân loại
- **Văn hoá phương Đông**: Nho giáo (nhân, nghĩa, lễ, trí, tín), Phật giáo (từ bi, bác ái), Lão giáo
- **Văn hoá phương Tây**: Tự do, bình đẳng, bác ái (Cách mạng Pháp 1789); tư tưởng tiến bộ của Mỹ (Tuyên ngôn Độc lập 1776)

### 3. ⭐ Chủ nghĩa Mác – Lênin *(Nguồn gốc chủ yếu và quyết định nhất)*
- Cung cấp thế giới quan, phương pháp luận khoa học
- Giúp HCM nhận ra con đường cứu nước đúng đắn (1920)
- Là nền tảng lý luận của toàn bộ tư tưởng HCM

> 💡 **Lưu ý thi cử**: Chủ nghĩa Mác-Lênin là nguồn gốc *chủ yếu nhất*, quyết định *bản chất cách mạng và khoa học* của Tư tưởng HCM.`
  },
  "doc lap dan toc": {
    keywords: ["độc lập", "dân tộc", "tự do", "quý hơn", "giải phóng dân tộc"],
    response: `## Tư tưởng về Độc lập Dân tộc

### 🏴 Luận điểm cơ bản
**"Không có gì quý hơn độc lập, tự do"** – được HCM đưa ra năm 1965 trong kháng chiến chống Mỹ, trở thành chân lý của thời đại.

### Nội dung tư tưởng độc lập dân tộc:

**1. Độc lập hoàn toàn, thực sự**
- Không phải độc lập hình thức
- Độc lập về chính trị, kinh tế, quân sự, ngoại giao, văn hoá
- Gắn liền với thống nhất Tổ quốc

**2. Độc lập dân tộc gắn liền với tự do, hạnh phúc của nhân dân**
- "Nước độc lập mà dân không được hưởng hạnh phúc tự do thì độc lập cũng chẳng có nghĩa lý gì"
- Quyền sống, tự do, mưu cầu hạnh phúc

**3. Độc lập dân tộc gắn liền với CNXH**
- Độc lập dân tộc là điều kiện để thực hiện CNXH
- CNXH bảo đảm nền độc lập thực sự, lâu dài

> 📝 **Tips**: Nhớ năm 1945 (Tuyên ngôn Độc lập) và năm 1965 (câu nói nổi tiếng) để trả lời đúng context.`
  },
  "chu nghia xa hoi": {
    keywords: ["xã hội chủ nghĩa", "CNXH", "chủ nghĩa xã hội", "quá độ", "xây dựng xã hội"],
    response: `## Tư tưởng về Chủ nghĩa Xã hội

### 🌟 Bản chất CNXH theo HCM
Không định nghĩa trừu tượng mà diễn đạt theo cách gần gũi:
- "Làm cho nhân dân lao động **thoát nạn bần cùng**"
- "Mọi người có **công ăn việc làm**, ăn no mặc ấm, học hành"
- Xã hội **bình đẳng**, không áp bức bóc lột
- Xã hội **ưu việt** hơn xã hội cũ

### 📋 Con đường đi lên CNXH
**Quá độ gián tiếp**: Từ thuộc địa nửa phong kiến → CNXH (bỏ qua TBCN)

Đặc điểm:
- Lâu dài, gian khổ, phức tạp
- Cần nhiều bước, nhiều giai đoạn
- Phải học tập kinh nghiệm, sáng tạo

### 🔑 Điều kiện để xây dựng CNXH
1. Phải có Đảng lãnh đạo
2. Nhà nước của nhân dân, do nhân dân, vì nhân dân
3. Phải xây dựng con người mới
4. Phát triển lực lượng sản xuất
5. Kết hợp sức mạnh dân tộc với sức mạnh thời đại`
  },
  "dao duc ho chi minh": {
    keywords: ["đạo đức", "cần kiệm", "liêm chính", "trung với nước", "hiếu với dân", "phẩm chất"],
    response: `## Tư tưởng Đạo đức Hồ Chí Minh

### ⭐ 5 Đức tính cơ bản

| Đức tính | Nội dung |
|----------|----------|
| **Trung với nước, hiếu với dân** | Đức tính hàng đầu, quan trọng nhất |
| **Cần, kiệm, liêm, chính, chí công vô tư** | Đức tính của người cách mạng |
| **Thương yêu con người** | Sống có tình nghĩa, nhân ái |
| **Tinh thần quốc tế trong sáng** | Đoàn kết quốc tế chân thành |

### 📌 Nguyên tắc xây dựng đạo đức
1. **Nói đi đôi với làm**, phải nêu gương đạo đức
2. **Xây đi đôi với chống** (xây dựng cái tốt, chống cái xấu)
3. **Tu dưỡng đạo đức suốt đời** – "Đạo đức cách mạng... phải kiên trì gian khổ từng ngày"

### 💬 Câu nói quan trọng
> *"Có tài mà không có đức là người vô dụng. Có đức mà không có tài thì làm việc gì cũng khó."*
– Hồ Chí Minh`
  },
  "dang cong san": {
    keywords: ["Đảng", "Đảng Cộng sản", "xây dựng Đảng", "lãnh đạo", "thành lập Đảng"],
    response: `## Tư tưởng về Đảng Cộng sản Việt Nam

### 📅 Sự ra đời của Đảng
- **Ngày thành lập**: 3/2/1930
- **Địa điểm**: Hương Cảng (Hồng Kông)
- **Người sáng lập**: Nguyễn Ái Quốc (HCM)
- **Ý nghĩa**: Bước ngoặt vĩ đại của cách mạng Việt Nam

### 🏗️ Nền tảng tư tưởng Đảng
- Chủ nghĩa Mác – Lênin là **kim chỉ nam** hành động
- Kết hợp lý luận Mác-Lênin với thực tiễn Việt Nam

### ⚙️ 5 Nguyên tắc xây dựng Đảng
1. **Tập trung dân chủ** *(nguyên tắc cơ bản nhất)*
2. Tự phê bình và phê bình
3. Kỷ luật nghiêm minh, tự giác
4. Đoàn kết thống nhất trong Đảng
5. Gắn bó mật thiết với nhân dân

### 🌟 Đảng cầm quyền
- Đảng lãnh đạo toàn diện nhưng không bao biện, làm thay
- Cán bộ đảng viên phải là công bộc, đầy tớ của nhân dân
- Chống "bệnh lãnh đạo": quan liêu, tham nhũng, xa dân`
  },
  "dai doan ket": {
    keywords: ["đại đoàn kết", "đoàn kết dân tộc", "mặt trận", "thống nhất"],
    response: `## Tư tưởng Đại đoàn kết Dân tộc

### 💪 Vai trò của Đại đoàn kết
> *"Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công"*

- Là **chiến lược cơ bản, lâu dài, nhất quán** của cách mạng
- Là **nguồn sức mạnh**, nhân tố **quyết định thắng lợi**
- Không đoàn kết thì thất bại

### 🏗️ Nền tảng đại đoàn kết
**Liên minh công – nông – trí thức:**
- Công nhân: giai cấp lãnh đạo
- Nông dân: lực lượng chủ yếu, đông đảo nhất
- Trí thức: nền tảng quan trọng

**Hình thức tổ chức**: Mặt trận Dân tộc Thống nhất (Mặt trận Tổ quốc ngày nay)

### 🌍 Đoàn kết quốc tế
- Đoàn kết với phong trào cộng sản và công nhân quốc tế
- Đoàn kết với phong trào giải phóng dân tộc
- Đoàn kết với lực lượng hoà bình, dân chủ tiến bộ` 
  },
  "phong cach ho chi minh": {
    keywords: ["phong cách", "lối sống", "giản dị", "khiêm tốn"],
    response: `## Phong cách Hồ Chí Minh

### 🎯 5 Phong cách nổi bật

**1. Phong cách tư duy**
- Độc lập, tự chủ, sáng tạo
- Luôn gắn lý luận với thực tiễn
- Tư duy biện chứng, nhìn xa trông rộng

**2. Phong cách diễn đạt**
- Ngắn gọn, súc tích, dễ hiểu
- Sinh động, hấp dẫn, hài hước
- Phù hợp với từng đối tượng

**3. Phong cách làm việc**
- Khoa học, có kế hoạch
- Dân chủ, lắng nghe ý kiến
- Quyết đoán, tập trung vào điểm mấu chốt

**4. Phong cách ứng xử**
- Khiêm tốn, chân tình, tế nhị
- Gần gũi với nhân dân, yêu thương con người
- Tôn trọng mọi người

**5. Phong cách sinh hoạt**
- Giản dị, tiết kiệm, thanh bạch
- Chiếc áo vải, đôi dép cao su
- Không nhận phong bì, quà tặng không phù hợp`
  },
  "default": {
    response: `Cảm ơn bạn đã đặt câu hỏi! 🎓

Tôi là **Trợ lý AI học Tư tưởng Hồ Chí Minh**, sẵn sàng hỗ trợ bạn ôn tập và hiểu sâu môn học này.

### 📚 Tôi có thể giúp bạn về:

| Chủ đề | Ví dụ câu hỏi |
|--------|---------------|
| Nguồn gốc TTHCM | Nguồn gốc lý luận của TTHCM là gì? |
| Độc lập dân tộc | Ý nghĩa câu 'Không có gì quý hơn...'? |
| Chủ nghĩa xã hội | Bản chất CNXH theo HCM? |
| Đạo đức HCM | 5 đức tính cơ bản là gì? |
| Đảng Cộng sản | Nguyên tắc xây dựng Đảng? |
| Đại đoàn kết | Vai trò của đại đoàn kết? |
| Phong cách HCM | Các phong cách của Người? |

Hãy đặt câu hỏi cụ thể và tôi sẽ giải thích chi tiết! 💪`
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
  "Quan điểm của HCM về Nhà nước?",
  "Tư tưởng HCM về văn hoá?",
  "Con đường quá độ lên CNXH theo HCM?"
];

const CASE_STUDIES = [
  {
    id: 1,
    title: "Tình huống: Cán bộ tham nhũng",
    context: "Ông A là một cán bộ xã, lợi dụng chức vụ để nhận hối lộ trong việc cấp phép xây dựng. Khi bị phát hiện, ông khăng khăng rằng 'ai cũng làm vậy' và 'tiền lương quá thấp'.",
    question: "Dựa vào tư tưởng đạo đức của Hồ Chí Minh, hãy phân tích hành vi của ông A và chỉ ra các vi phạm đạo đức cụ thể?",
    analysis: `**Phân tích theo Tư tưởng Hồ Chí Minh:**

**Vi phạm 1: "Cần, kiệm, liêm, chính"**
Ông A đã vi phạm đức "liêm": không trong sạch, lợi dụng quyền hạn vơ vét của công.

**Vi phạm 2: "Chí công vô tư"**
Đặt lợi ích cá nhân lên trên lợi ích tập thể và nhân dân.

**Vi phạm 3: Nguyên tắc "Nói đi đôi với làm"**
Là cán bộ nhưng không nêu gương đạo đức, trái với lời thề đảng viên.

**Lý luận "Ai cũng làm vậy" là sai vì:**
HCM dạy: "Tu dưỡng đạo đức phải suốt đời" – không thể lấy người khác làm chuẩn.

**Hậu quả**: Mất lòng dân, phá hoại khối đại đoàn kết, suy yếu Đảng.`,
    tags: ["Đạo đức", "Cán bộ", "Tham nhũng"]
  },
  {
    id: 2,
    title: "Tình huống: Sinh viên và tinh thần học tập",
    context: "Sinh viên B học môn Tư tưởng Hồ Chí Minh nhưng chỉ học vẹt để qua môn, không cố gắng hiểu và vận dụng vào thực tế. B cho rằng môn học này không thực tế và không cần thiết.",
    question: "Theo tư tưởng HCM về giáo dục và đạo đức, nhận xét thái độ của B và đề xuất phương pháp học đúng đắn?",
    analysis: `**Phân tích:**

**Sai lầm của B:**
- Vi phạm tinh thần "Học để làm việc, làm người" mà HCM nhấn mạnh
- Không kết hợp học với hành – trái với tư tưởng HCM về giáo dục

**HCM về học tập:**
"Học không bao giờ đủ. Học mãi để tiến bộ mãi. Càng tiến bộ, càng thấy cần phải học thêm."

**Phương pháp học đúng đắn:**
1. Học để hiểu lý luận, không học vẹt
2. Kết hợp lý luận với thực tiễn cuộc sống
3. Tự rèn luyện đạo đức theo gương Bác
4. Liên hệ với các sự kiện thực tế hiện nay`,
    tags: ["Giáo dục", "Sinh viên", "Thực hành"]
  },
  {
    id: 3,
    title: "Tình huống: Xung đột lợi ích nhóm",
    context: "Trong một cuộc họp, một nhóm đề xuất chính sách chỉ có lợi cho người giàu với lý do 'thu hút đầu tư'. Nhóm khác phản đối vì ảnh hưởng người nghèo. Hai bên tranh cãi gay gắt.",
    question: "Áp dụng tư tưởng HCM về đại đoàn kết và nhà nước, hãy phân tích thế nào là giải pháp đúng đắn?",
    analysis: `**Vận dụng Tư tưởng HCM:**

**Nguyên tắc nhà nước "vì nhân dân":**
Nhà nước của nhân dân, DO nhân dân, VÌ nhân dân – không phải vì một nhóm lợi ích.

**Quan điểm đại đoàn kết:**
- Đoàn kết trên cơ sở lợi ích chung của dân tộc
- Không hi sinh lợi ích của số đông vì lợi ích của thiểu số

**Giải pháp theo TTHCM:**
1. Lấy lợi ích nhân dân làm tiêu chuẩn
2. Dân chủ: lắng nghe ý kiến nhân dân rộng rãi
3. Phát triển kinh tế nhưng phải đảm bảo công bằng xã hội
4. "Làm cho mọi người có cơm ăn áo mặc, học hành"`,
    tags: ["Nhà nước", "Đại đoàn kết", "Công bằng xã hội"]
  }
];

// Export to window
window.AppData = {
  CHAPTERS,
  FLASHCARDS,
  QUIZ_QUESTIONS,
  AI_RESPONSES,
  SUGGESTED_PROMPTS,
  CASE_STUDIES
};
