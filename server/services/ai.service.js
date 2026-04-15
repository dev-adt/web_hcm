// =====================================================
// server/services/ai.service.js — AI Response Engine
// =====================================================

const AI_KB = {
  nguon_goc: {
    keys: ['nguồn gốc','hình thành','ra đời','xuất phát','cơ sở lý luận','tiền đề'],
    response: `## Nguồn gốc Tư tưởng Hồ Chí Minh\n\nTư tưởng HCM có **3 nguồn gốc lý luận** chính:\n\n### 1. 🇻🇳 Truyền thống dân tộc Việt Nam\n- Chủ nghĩa yêu nước và ý chí bất khuất\n- Truyền thống nhân nghĩa, đoàn kết cộng đồng\n\n### 2. 🌏 Tinh hoa văn hoá nhân loại\n- **Phương Đông**: Nho giáo, Phật giáo, Lão giáo\n- **Phương Tây**: Tư tưởng khai sáng Pháp, Tuyên ngôn Độc lập Mỹ 1776\n\n### 3. ⭐ Chủ nghĩa Mác–Lênin *(Nguồn gốc chủ yếu, quyết định nhất)*\n- Cung cấp thế giới quan và phương pháp luận khoa học\n- HCM đọc Luận cương Lênin năm 1920 → tìm ra con đường cứu nước\n\n> 💡 **Ghi nhớ thi**: Mác-Lênin là nguồn gốc **chủ yếu** và **quyết định bản chất cách mạng, khoa học** của TTHCM.`
  },
  doc_lap: {
    keys: ['độc lập','tự do','quý hơn','giải phóng dân tộc','thuộc địa','dân tộc tự quyết'],
    response: `## Tư tưởng về Độc lập Dân tộc\n\n### 🏴 Luận điểm cốt lõi\n**"Không có gì quý hơn độc lập, tự do"** – HCM, 1965\n\n### Nội dung chính:\n\n**1. Độc lập hoàn toàn, thực sự**\n- Không phải độc lập hình thức\n- Toàn diện: chính trị, kinh tế, quân sự, ngoại giao, văn hoá\n\n**2. Gắn liền tự do, hạnh phúc nhân dân**\n- "Nước độc lập mà dân không được hưởng hạnh phúc tự do thì độc lập cũng chẳng có nghĩa lý gì"\n\n**3. Gắn liền với CNXH**\n- Độc lập → điều kiện để thực hiện CNXH\n- CNXH → đảm bảo độc lập bền vững\n\n> 📝 **Tips thi**: Câu nói nổi tiếng nói trong **kháng chiến chống Mỹ (1965)**, không phải 1945.`
  },
  cnxh: {
    keys: ['xã hội chủ nghĩa','cnxh','quá độ','xây dựng xã hội','chủ nghĩa xã hội'],
    response: `## Tư tưởng về Chủ nghĩa Xã hội\n\n### 🌟 Bản chất CNXH theo HCM\nKhông trừu tượng — diễn đạt gần gũi:\n- "Làm cho nhân dân lao động **thoát nạn bần cùng**"\n- "Mọi người có **công ăn việc làm**, ăn no mặc ấm, học hành"\n- Xã hội **bình đẳng**, không áp bức bóc lột\n\n### 📋 Con đường quá độ\n**Quá độ gián tiếp**: từ thuộc địa nửa phong kiến → CNXH (bỏ qua TBCN)\n- Lâu dài, gian khổ, nhiều bước\n- Học hỏi kinh nghiệm, sáng tạo\n\n### 🔑 Điều kiện xây dựng CNXH\n1. Đảng Cộng sản lãnh đạo\n2. Nhà nước của nhân dân, do dân, vì dân\n3. Xây dựng con người mới XHCN\n4. Phát triển lực lượng sản xuất`
  },
  dao_duc: {
    keys: ['đạo đức','cần kiệm','liêm chính','trung với nước','hiếu với dân','phẩm chất','tu dưỡng'],
    response: `## Tư tưởng Đạo đức Hồ Chí Minh\n\n### ⭐ 5 Đức tính cơ bản\n\n| Đức tính | Nội dung |\n|----------|----------|\n| **Trung với nước, hiếu với dân** | Đức tính hàng đầu, quan trọng nhất |\n| **Cần, kiệm, liêm, chính, chí công vô tư** | Chuẩn mực người cách mạng |\n| **Thương yêu con người** | Sống có tình nghĩa, nhân ái |\n| **Tinh thần quốc tế trong sáng** | Đoàn kết chân thành |\n\n### 📌 Nguyên tắc rèn luyện đạo đức\n1. **Nói đi đôi với làm** – nêu gương đạo đức\n2. **Xây đi đôi với chống**\n3. **Tu dưỡng suốt đời** – không phải "trên trời rơi xuống"\n\n> 💬 *"Có tài mà không có đức là người vô dụng. Có đức mà không có tài thì làm việc gì cũng khó."* – HCM`
  },
  dang: {
    keys: ['đảng','đảng cộng sản','xây dựng đảng','lãnh đạo','3/2/1930','thành lập đảng'],
    response: `## Tư tưởng về Đảng Cộng sản Việt Nam\n\n### 📅 Sự ra đời\n- **Ngày**: 3/2/1930\n- **Nơi**: Hương Cảng (Hồng Kông)\n- **Người sáng lập**: Nguyễn Ái Quốc (HCM)\n\n### ⚙️ 5 Nguyên tắc xây dựng Đảng\n1. **Tập trung dân chủ** *(nguyên tắc cơ bản nhất)*\n2. Tự phê bình và phê bình\n3. Kỷ luật nghiêm minh, tự giác\n4. Đoàn kết thống nhất trong Đảng\n5. Gắn bó mật thiết với nhân dân\n\n### 🌟 Đảng cầm quyền\n- Lãnh đạo toàn diện nhưng không bao biện, làm thay\n- Cán bộ đảng viên phải là **công bộc, đầy tớ** của nhân dân\n- Chống: quan liêu, tham nhũng, xa dân`
  },
  dai_doan_ket: {
    keys: ['đại đoàn kết','đoàn kết dân tộc','mặt trận','liên minh','thống nhất','đoàn kết'],
    response: `## Tư tưởng Đại đoàn kết Dân tộc\n\n> *"Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công"*\n\n### 💪 Vai trò\n- Là **chiến lược cơ bản, lâu dài, nhất quán** của cách mạng\n- Là **nguồn sức mạnh**, nhân tố **quyết định thắng lợi**\n\n### 🏗️ Nền tảng\n**Liên minh công – nông – trí thức:**\n- Công nhân: giai cấp lãnh đạo\n- Nông dân: lực lượng chủ yếu\n- Trí thức: nền tảng quan trọng\n\n**Hình thức tổ chức**: Mặt trận Dân tộc Thống nhất\n\n### 🌍 Đoàn kết quốc tế\n- Với phong trào cộng sản và công nhân quốc tế\n- Với các dân tộc bị áp bức\n- Với lực lượng hoà bình, dân chủ tiến bộ`
  },
  phong_cach: {
    keys: ['phong cách','lối sống','giản dị','khiêm tốn','tư duy độc lập'],
    response: `## Phong cách Hồ Chí Minh\n\n### 🎯 5 Phong cách nổi bật\n\n**1. Phong cách tư duy**\n- Độc lập, tự chủ, sáng tạo; luôn gắn lý luận với thực tiễn\n\n**2. Phong cách diễn đạt**\n- Ngắn gọn, súc tích, dễ hiểu; phù hợp từng đối tượng\n\n**3. Phong cách làm việc**\n- Khoa học, có kế hoạch; dân chủ, lắng nghe\n\n**4. Phong cách ứng xử**\n- Khiêm tốn, chân tình; gần gũi nhân dân\n\n**5. Phong cách sinh hoạt**\n- Giản dị, tiết kiệm, thanh bạch\n- Chiếc áo vải, đôi dép cao su — biểu tượng của sự giản dị`
  },
  nha_nuoc: {
    keys: ['nhà nước','dân chủ','dân làm chủ','quyền lực nhân dân','pháp quyền','hiến pháp'],
    response: `## Tư tưởng về Nhà nước và Dân chủ\n\n### 🏛️ Bản chất Nhà nước\n**"Nhà nước của nhân dân, do nhân dân, vì nhân dân"**\n- Tất cả quyền lực thuộc về nhân dân\n- Nhà nước do nhân dân làm chủ\n- Mọi hoạt động vì lợi ích nhân dân\n\n### 🗳️ Dân chủ theo HCM\n*"Dân là chủ và dân làm chủ"*\n- Nhân dân là chủ thể quyền lực tối cao\n- Dân chủ là mục tiêu VÀ động lực phát triển\n- Phải thực chất, không hình thức\n\n### ⚖️ Nhà nước pháp quyền\n- Thượng tôn pháp luật\n- Cán bộ nhà nước là **công bộc của dân**\n- Chống quan liêu, tham nhũng, lãng phí`
  },
  van_hoa: {
    keys: ['văn hoá','văn hóa','giáo dục','học tập','con người mới','văn học','nghệ thuật'],
    response: `## Tư tưởng về Văn hoá và Con người\n\n### 🎭 Vai trò văn hoá\n*"Văn hoá soi đường cho quốc dân đi"*\n- Văn hoá phục vụ kháng chiến, kiến quốc\n- Nền văn hoá: **dân tộc, khoa học, đại chúng**\n- Văn hoá là nền tảng tinh thần của xã hội\n\n### 📚 Quan điểm về Giáo dục\n*"Học không bao giờ đủ. Học mãi để tiến bộ mãi."*\n- Học để làm việc, làm người\n- Kết hợp lý luận với thực tiễn\n- Giáo dục toàn diện: Đức, Trí, Thể, Mỹ\n\n### 👥 Con người mới XHCN\n- Có lý tưởng, đạo đức cách mạng\n- Có năng lực, trí tuệ\n- Kết hợp sức mạnh dân tộc với thời đại`
  },
};

const SUGGESTED_RESPONSES = [
  `Câu hỏi thú vị! Dựa vào nội dung môn Tư tưởng Hồ Chí Minh, tôi sẽ giải thích cho bạn...\n\nVui lòng thử hỏi cụ thể hơn, ví dụ:\n- "Nguồn gốc của Tư tưởng HCM là gì?"\n- "5 đức tính cơ bản trong đạo đức HCM?"\n- "Đảng Cộng sản VN ra đời năm nào?"`,
  `Tôi hiểu bạn đang hỏi về Tư tưởng Hồ Chí Minh. Để trả lời chính xác hơn, bạn có thể hỏi theo các chủ đề:\n\n📖 **Chương 1**: Nguồn gốc, quá trình hình thành\n🏴 **Chương 2**: Độc lập dân tộc và CNXH\n⭐ **Chương 3**: Đảng Cộng sản\n🤝 **Chương 4**: Đại đoàn kết\n🏛️ **Chương 5**: Nhà nước và dân chủ\n🌟 **Chương 6**: Văn hoá, đạo đức, con người`,
];

function getAIResponse(userText, mode = 'qa') {
  const lower = userText.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g,'d').replace(/Đ/g,'D');

  let matched = null;
  for (const [key, data] of Object.entries(AI_KB)) {
    const normalizedKeys = data.keys.map(k =>
      k.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase()
    );
    if (normalizedKeys.some(kw => lower.includes(kw))) {
      matched = data.response;
      break;
    }
  }

  let response = matched || SUGGESTED_RESPONSES[Math.floor(Math.random() * SUGGESTED_RESPONSES.length)];

  // Mode-specific additions
  if (mode === 'exam' && matched) {
    response += '\n\n---\n### 📝 Câu hỏi luyện thi\nDựa vào nội dung trên, hãy thử trả lời câu hỏi trong phần **Quiz** để kiểm tra mức độ hiểu bài của bạn!';
  } else if (mode === 'summary' && matched) {
    response = '## 📋 Tóm tắt ngắn gọn\n\n' + response;
  }

  return response;
}

module.exports = { getAIResponse };
