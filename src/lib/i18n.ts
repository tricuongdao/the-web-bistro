/*
 * THE WEB BISTRO — translation dictionary.
 *
 * English strings are the source of truth; `tr(lang, s)` looks up the
 * Vietnamese. Every user-visible string in the app goes through `t()`
 * from the LangProvider (see src/components/providers/LangProvider.tsx).
 *
 * House punctuation rules (kept site-wide): no em dashes, no en dashes.
 * Hyphen only.
 */

export type Lang = 'en' | 'vi';

export const LANG_STORAGE_KEY = 'wb-lang';

export const I18N: Record<string, string> = {
  /* ── chrome ─────────────────────────────────────────────────────────── */
  'Skip to content': 'Tới nội dung chính',
  'Web development': 'Thiết kế web',
  'Front of house': 'Trang chính',
  'The menu': 'Thực đơn',
  'Opening offer': 'Ưu đãi khai trương',
  'Reservations': 'Đặt bàn',
  'Email me': 'Gửi email',
  'Pages': 'Trang',
  'Get in touch': 'Liên hệ',
  '@thewebbistro on Instagram': '@thewebbistro trên Instagram',
  'Open 7 days a week, 9 to 6': 'Mở cả 7 ngày, 9 giờ đến 18 giờ',
  'Privacy': 'Quyền riêng tư',

  /* ── hero ───────────────────────────────────────────────────────────── */
  'Two of three opening tables free': 'Còn trống 2 trong 3 bàn khai trương',
  'Websites that bring customers in.': 'Website mang khách hàng đến cho bạn.',
  'You tell me what your business needs to do. I build the site that does it, then hand you the keys. No page builders, no plugin sprawl, and no invoice you cannot read.':
    'Bạn cho tôi biết doanh nghiệp cần gì. Tôi xây website làm đúng việc đó rồi giao chìa khoá cho bạn. Không page builder, không nhồi plugin, không hoá đơn khó hiểu.',
  'Read the menu': 'Xem thực đơn',
  'You will get a reply within a day': 'Bạn sẽ nhận phản hồi trong vòng một ngày',
  'Take the lid off': 'Mở vung xem thử',
  'Every site leaves the kitchen like this. One order, built end to end, served on its own domain.': 'Mọi website ra khỏi bếp đều như thế này. Một đơn hàng, làm từ đầu đến cuối, dọn lên tên miền riêng của bạn.',
  'Performance': 'Hiệu năng',
  's first paint': 's để hiện trang',
  'Firing…': 'Đang lên món…',
  'Order complete': 'Xong đơn',
  'Served · 0.6s': 'Đã phục vụ · 0,6s',
  'Plating up…': 'Đang bày món…',

  /* ── marquee ────────────────────────────────────────────────────────── */
  'On the board tonight': 'Tối nay trên bảng',

  /* ── on the pass (process) ──────────────────────────────────────────── */
  'On the pass': 'Trên quầy giao món',
  'Every job leaves the kitchen the same way.': 'Mọi dự án ra khỏi bếp theo cùng một cách.',
  'Brief in, ticket up, built, served. Ask me on a Tuesday what happened on Monday and you get a straight answer, not a status page.':
    'Nhận đề bài, lên phiếu, làm, giao món. Hỏi tôi thứ Ba về việc thứ Hai, bạn nhận câu trả lời thẳng thắn chứ không phải một trang trạng thái.',
  'Put a ticket in': 'Lên phiếu ngay',
  'Served hot': 'Phục vụ nóng',
  'Order #0142': 'Đơn #0142',
  'The order ticket': 'Phiếu gọi món',

  /* process stations */
  'Brief in': 'Nhận đề bài',
  'You send two lines about the business and what the site has to do. One call or a few messages later, the plan comes back in writing, in your language.':
    'Bạn gửi hai dòng về doanh nghiệp và việc website phải làm. Sau một cuộc gọi hoặc vài tin nhắn, kế hoạch gửi lại bằng văn bản, đúng ngôn ngữ bạn dùng.',
  'Day one': 'Ngày đầu',
  'Ticket up': 'Lên phiếu',
  'You get a fixed quote and a start date before I write a line of code. Approve both and the ticket goes on the rail. If the job grows mid-build, you hear the cost before I touch it.':
    'Bạn nhận báo giá chốt và ngày bắt đầu trước khi tôi viết dòng code đầu tiên. Duyệt cả hai là phiếu lên giá. Nếu công việc phình ra giữa chừng, bạn biết chi phí trước khi tôi đụng vào.',
  'Inside a day': 'Trong một ngày',
  'Built': 'Vào bếp',
  'Real pages in your browser inside the first week. You watch it cook and course-correct early, instead of judging a slide deck.':
    'Trang thật hiện trên trình duyệt ngay tuần đầu. Bạn xem nó chín dần và chỉnh hướng sớm, thay vì phán đoán qua slide.',
  'Week one': 'Tuần đầu',
  'Served': 'Giao món',
  'Launch day comes with the keys: code, domain, logins, content, and a written walkthrough. Hosting & Care keeps the lights on after service.':
    'Ngày lên sóng, bạn nhận chìa khoá: code, tên miền, tài khoản, nội dung, kèm hướng dẫn viết sẵn. Hosting & Care giữ đèn sáng sau khi giao món.',
  'After launch': 'Sau khi lên sóng',
  'How service runs': 'Cách bếp vận hành',

  /* ── the pass board ─────────────────────────────────────────────────── */
  'The pass board': 'Bảng trên quầy',
  'Tonight the kitchen is cooking': 'Tối nay bếp đang nấu',
  'Next up': 'Món kế tiếp',

  /* ── specials ───────────────────────────────────────────────────────── */
  "Today's specials": 'Món đặc biệt hôm nay',
  'Three things I cook most': 'Ba món tôi nấu nhiều nhất',
  'See the opening offer →': 'Xem ưu đãi khai trương →',
  'Starter': 'Món khai vị',
  'Landing Page': 'Trang đích',
  'One page, one job: turn a visitor into an enquiry. You get the copy, the form, and the tracking that proves it pays.':
    'Một trang, một mục tiêu: biến người xem thành khách hỏi hàng. Bạn nhận cả nội dung, form và phần đo lường chứng minh nó hiệu quả.',
  'Copy · build · launch': 'Nội dung · xây · chạy',
  'Main': 'Món chính',
  'Online Store': 'Cửa hàng trực tuyến',
  'Products, payments, stock and shipping, set up so you can run the shop without calling me.':
    'Sản phẩm, thanh toán, tồn kho và vận chuyển, thiết lập sẵn để bạn tự vận hành mà không cần gọi tôi.',
  'Payments · stock · training': 'Thanh toán · tồn kho · hướng dẫn',
  'Standing order': 'Đặt hàng thường kỳ',
  'Hosting & Care': 'Hosting & bảo trì',
  'Hosting, backups, updates and small changes each month. You email a person, not a ticket queue.':
    'Hosting, sao lưu, cập nhật và chỉnh sửa nhỏ mỗi tháng. Bạn email cho một con người, không phải hàng đợi ticket.',
  'Monthly · cancel any time': 'Hàng tháng · huỷ bất cứ lúc nào',
  'From': 'Từ',
  '/ month': '/ tháng',

  /* ── numbers ────────────────────────────────────────────────────────── */
  'By the numbers': 'Vài con số',
  'Opening tables': 'Bàn khai trương',
  'Reply, at the latest': 'Phản hồi chậm nhất',
  'Performance target': 'Mục tiêu hiệu năng',
  'Kitchen open weekly': 'Bếp mở mỗi tuần',

  /* ── house rules ────────────────────────────────────────────────────── */
  'House rules': 'Nội quy nhà hàng',
  'What you get, in writing': 'Những gì bạn nhận, ghi rõ trên giấy',
  "The kitchen is new, so I'll skip the wall of client logos. These four rules go in every quote I send. Hold me to them.":
    'Bếp này mới mở, nên tôi bỏ qua bức tường logo khách hàng. Bốn điều dưới đây có trong mọi báo giá tôi gửi. Cứ giữ tôi đúng lời.',
  'Fixed quote first': 'Báo giá chốt trước',
  'You approve a number and a start date before I write a line of code. If the job grows, I tell you what it costs before I touch it.':
    'Bạn duyệt con số và ngày bắt đầu trước khi tôi viết dòng code đầu tiên. Nếu công việc phát sinh, tôi nói rõ chi phí trước khi làm.',
  'You own the lot': 'Bạn sở hữu tất cả',
  'Code, domain, hosting login, content. Walk away whenever you like and take all of it with you.':
    'Code, tên miền, tài khoản hosting, nội dung. Bạn rời đi lúc nào cũng được và mang theo toàn bộ.',
  'Real pages in week one': 'Trang thật ngay tuần đầu',
  'You click through your site in a browser within the first week. No slide decks and no mockups you cannot use.':
    'Bạn bấm thử website trên trình duyệt trong tuần đầu tiên. Không slide, không bản mockup vô dụng.',
  'Words you can follow': 'Cách nói bạn hiểu được',
  'I write emails in plain English. When a technical choice matters, I tell you what it costs and let you pick.':
    'Tôi viết email bằng ngôn ngữ bình thường. Khi một lựa chọn kỹ thuật quan trọng, tôi nói rõ nó tốn gì rồi để bạn chọn.',
  'One chef in this kitchen. No account managers, no handoffs, no telephone game.':
    'Một đầu bếp duy nhất trong bếp này. Không quản lý trung gian, không bàn giao qua lại, không chơi trò điện thoại truyền tin.',

  /* ── FAQ ────────────────────────────────────────────────────────────── */
  'Ask the kitchen': 'Hỏi nhà bếp',
  'Fair questions, straight answers.': 'Câu hỏi thẳng, trả lời thẳng.',
  'How long will my site take?': 'Website của tôi mất bao lâu?',
  'A landing page leaves the kitchen in about a week. A full site takes 3-4 weeks once the brief is agreed. The dates go in the quote, and I hold them.':
    'Một trang đích ra khỏi bếp trong khoảng một tuần. Website đầy đủ mất 3-4 tuần sau khi chốt đề bài. Ngày tháng nằm trong báo giá, và tôi giữ đúng.',
  'Who owns what when we finish?': 'Khi xong thì ai sở hữu gì?',
  'You. Code, domain, hosting login, content. It is written into the quote on day one, and you can walk away with all of it whenever you like.':
    'Bạn. Code, tên miền, tài khoản hosting, nội dung. Điều này nằm trong báo giá ngay ngày đầu, và bạn có thể rời đi cùng toàn bộ bất cứ lúc nào.',
  'What do you need from me to start?': 'Bạn cần gì từ tôi để bắt đầu?',
  'Your logo if you have one, a line on what you sell, your services or prices, and any photos you like. Two lines about what the site must do is enough to begin; I send the full checklist with the quote.':
    'Logo nếu có, một dòng về thứ bạn bán, dịch vụ hoặc giá của bạn, và ảnh bạn thích. Hai dòng về việc website phải làm là đủ để bắt đầu; tôi gửi danh sách đầy đủ kèm báo giá.',
  "What if I don't like the first draft?": 'Nếu tôi không thích bản đầu tiên thì sao?',
  'You tell me, and your deposit comes back with no argument. That promise is in every quote I send.':
    'Bạn nói thẳng, tiền cọc trả lại không tranh luận. Lời hứa đó có trong mọi báo giá tôi gửi.',
  'Are these templates?': 'Đây có phải mẫu có sẵn không?',
  'No templates, no page builders, no plugin sprawl. Every site is written and built for the business it serves. That is also why the quote is per job, not per template.':
    'Không mẫu có sẵn, không page builder, không nhồi plugin. Mỗi website được viết và dựng riêng cho doanh nghiệp nó phục vụ. Vì vậy báo giá theo từng việc, không theo mẫu.',
  'Will I rank on Google?': 'Tôi có được lên top Google không?',
  'No honest cook promises page one. What you get is the groundwork: speed, clean structure, and the words your customers actually type.':
    'Không đầu bếp tử tế nào hứa trang một. Bạn nhận phần nền móng: tốc độ, cấu trúc sạch và đúng từ khách hàng gõ.',
  'What happens after launch?': 'Sau khi lên sóng thì sao?',
  'Hosting & Care keeps it running: backups, updates and a slice of my time for small changes each month. Cancel any time, and the site stays yours.':
    'Hosting & Care giữ mọi thứ chạy êm: sao lưu, cập nhật và một phần thời gian của tôi cho các chỉnh sửa nhỏ mỗi tháng. Huỷ lúc nào cũng được, website vẫn là của bạn.',

  /* ── closing CTA ────────────────────────────────────────────────────── */
  'Hungry? Tell me what you need.': 'Đói chưa? Nói tôi biết bạn cần gì.',
  'Send two lines about your business and what the site has to do. You get a quote and a start date, not a five-email sales sequence. Two of my three opening slots are still free.':
    'Gửi hai dòng về doanh nghiệp và việc website phải làm. Bạn nhận báo giá và ngày bắt đầu, không phải chuỗi email bán hàng. Hai trong ba bàn khai trương vẫn còn trống.',
  'Book a table': 'Đặt bàn ngay',

  /* ── the menu page ──────────────────────────────────────────────────── */
  'Everything I serve': 'Toàn bộ món tôi phục vụ',
  'Every dish has a starting price. No two jobs are the same size, so the final quote is cut to your plate and lands inside a day.':
    'Mỗi món có giá khởi điểm. Không dự án nào giống dự án nào, nên báo giá cuối cắt theo đúng phần của bạn và về trong một ngày.',
  'Quote in a day': 'Báo giá trong ngày',
  'Starters': 'Khai vị',
  'Small, fast, done in a week': 'Nhỏ, nhanh, xong trong một tuần',
  '1 page · 1 week': '1 trang · 1 tuần',
  'One page built around a single action: call, book or buy. Copy, form and tracking come with it.':
    'Một trang xoay quanh một hành động: gọi, đặt hoặc mua. Kèm nội dung, form và phần đo lường.',
  'Site Rescue': 'Cứu hộ website',
  'Audit · fix · hand back': 'Rà soát · sửa · trả lại',
  'Your current site, fast and readable again. I strip the bloat, fix what broke, and write down every change I made.':
    'Website hiện tại của bạn, nhanh và dễ đọc trở lại. Tôi bỏ phần nặng nề, sửa chỗ hỏng và ghi lại mọi thay đổi.',
  'Mains': 'Các món chính',
  'The full build': 'Bản đầy đủ',
  'Marketing Website': 'Website giới thiệu',
  '5-8 pages · 3-4 weeks': '5-8 trang · 3-4 tuần',
  'The site your customers judge you by. Structure, words and design built around what you sell, plus an editor you can use without me.':
    'Website mà khách hàng dùng để đánh giá bạn. Cấu trúc, câu chữ và thiết kế xoay quanh thứ bạn bán, kèm trình quản lý nội dung bạn tự dùng được.',
  'Payments · stock · shipping': 'Thanh toán · tồn kho · vận chuyển',
  "A shop that takes money without drama and holds up at Christmas. Handover walks you through every screen you'll touch.":
    'Một cửa hàng nhận tiền êm ru và trụ vững mùa cao điểm. Lúc bàn giao tôi dẫn bạn qua từng màn hình bạn sẽ dùng.',
  'Web App': 'Ứng dụng web',
  'Scoped per project': 'Báo giá theo dự án',
  'Booking systems, client portals, dashboards. Custom software with a front door your customers understand.':
    'Hệ thống đặt lịch, cổng khách hàng, dashboard. Phần mềm riêng với mặt tiền khách hàng hiểu ngay.',
  'Sides': 'Món phụ',
  'Good with anything above': 'Ăn kèm món nào cũng hợp',
  'SEO Groundwork': 'Nền tảng SEO',
  'Speed, structure and the words your customers type. I build it in from day one instead of bolting it on.':
    'Tốc độ, cấu trúc và đúng từ khách hàng gõ. Tôi làm từ ngày đầu chứ không chắp vá sau.',
  'Analytics Setup': 'Thiết lập phân tích',
  'Privacy-friendly tracking that shows you which page brought the money in.':
    'Theo dõi tôn trọng quyền riêng tư, cho bạn thấy trang nào mang tiền về.',
  'Monthly hosting, backups, updates and a slice of my time for small changes. Cancel when you like. Your site and domain stay yours.':
    'Hosting, sao lưu, cập nhật hàng tháng và một phần thời gian của tôi cho các chỉnh sửa nhỏ. Huỷ khi nào cũng được. Website và tên miền vẫn là của bạn.',
  'Nothing here quite fits?': 'Chưa có món nào vừa ý?',

  /* ── opening offer (work page) ──────────────────────────────────────── */
  'The first three tables eat at the opening rate.': 'Ba bàn đầu tiên dùng giá khai trương.',
  "Here's the honest trade. I opened this kitchen in 2026 and I need three sites worth showing off. You need a site that brings in work. So for the first three bookings I cut a third off the quote and put the saved hours straight back into the build.":
    'Đây là trao đổi thẳng thắn. Tôi mở bếp này năm 2026 và cần ba website đáng để trưng ra. Bạn cần một website mang việc về. Nên với ba đơn đầu tiên, tôi giảm một phần ba báo giá và dồn số giờ tiết kiệm được vào chính bản build đó.',
  'In return I ask two things: let me photograph the finished site for this page, and tell me the truth about what it changed for your business.':
    'Đổi lại tôi xin hai điều: cho tôi chụp lại website hoàn thiện để đăng ở trang này, và nói thật nó đã thay đổi gì cho doanh nghiệp bạn.',
  'Two of three opening tables still free': 'Vẫn còn trống 2 trong 3 bàn khai trương',
  'Bookings close as soon as the third one goes.': 'Ngừng nhận đơn ngay khi bàn thứ ba có khách.',
  'Table one': 'Bàn một',
  'Shops, cafés and trades': 'Cửa hàng, quán ăn và thợ dịch vụ',
  'A site that answers the three questions people phone you to ask': 'Website trả lời ba câu hỏi khách hay gọi điện để hỏi',
  'Menu, price list or service pages you can edit yourself': 'Thực đơn, bảng giá hoặc trang dịch vụ bạn tự sửa được',
  'Bookings or enquiries landing in your inbox, not a portal': 'Đơn đặt và tin hỏi hàng vào thẳng hộp thư của bạn',
  'Google Business and maps set up properly': 'Thiết lập Google Business và bản đồ đúng cách',
  'Table two': 'Bàn hai',
  'Startups and founders': 'Startup và nhà sáng lập',
  'A launch page written to explain what you actually do': 'Trang ra mắt viết rõ bạn thật sự làm gì',
  'Waitlist or sign-up wired to your email tool': 'Danh sách chờ hoặc đăng ký nối sẵn với công cụ email',
  'Room to add pages as the story changes': 'Chỗ để thêm trang khi câu chuyện thay đổi',
  'Analytics that show which message lands': 'Phân tích cho thấy thông điệp nào hiệu quả',
  'Table three': 'Bàn ba',
  'Agencies and studios': 'Agency và studio',
  'Your designs built to the pixel, on the date I gave you': 'Bản thiết kế của bạn được build đúng từng pixel, đúng ngày tôi hẹn',
  'Clean handover: readable code and a written walkthrough': 'Bàn giao gọn: code dễ đọc kèm hướng dẫn viết sẵn',
  'I stay invisible to your client if that is how you want it': 'Tôi ẩn mình trước khách của bạn nếu bạn muốn vậy',
  'Cover for overflow weeks without a full-time hire': 'Gánh giúp tuần cao điểm mà không cần tuyển người toàn thời gian',
  'The risk is mine': 'Rủi ro thuộc về tôi',
  'Nothing to lose by ordering': 'Đặt món không mất gì',
  'A new business asking for money up front should give you something back. Here it is.':
    'Một cơ sở mới xin tiền trước thì phải đưa lại cho bạn thứ gì đó. Đây là những thứ đó.',
  'See the first draft in week one. If you hate it, your deposit comes back with no argument.':
    'Xem bản đầu tiên trong tuần đầu. Nếu bạn không thích, tiền cọc trả lại, không tranh luận.',
  'The quote holds. I absorb my own mistakes and estimate errors.':
    'Báo giá không đổi. Sai sót và ước lượng lệch là phần tôi chịu.',
  'I keep working past launch until your site does the job we agreed on.':
    'Tôi làm tiếp sau khi lên sóng cho tới khi website đạt đúng mục tiêu đã thoả thuận.',
  'Every login, file and line of code lands in your hands on day one.':
    'Mọi tài khoản, tệp và dòng code về tay bạn ngay ngày đầu.',
  'Want one of the three?': 'Muốn một trong ba bàn?',
  'Claim a table': 'Nhận bàn',

  /* ── booking page ───────────────────────────────────────────────────── */
  'Two lines are plenty: what your business does, and what the site needs to do. I come back with a quote, a start date, and the list of what I need from you.':
    'Hai dòng là đủ: doanh nghiệp bạn làm gì và website cần làm gì. Tôi quay lại với báo giá, ngày bắt đầu và danh sách những gì tôi cần từ bạn.',
  'Kitchen hours': 'Giờ mở bếp',
  'Open 7 days a week, 9 to 6. You get a reply within a day.': 'Mở cả 7 ngày, 9 giờ đến 18 giờ. Bạn nhận phản hồi trong vòng một ngày.',
  'Taking bookings for': 'Đang nhận đơn cho',
  'Two of the three opening tables are still free. Bookings close when the third one goes.':
    'Còn trống hai trong ba bàn khai trương. Ngừng nhận khi bàn thứ ba có khách.',
  "Table's booked.": 'Đã đặt bàn.',
  'Thanks. I have your details and I will reply within a day.': 'Cảm ơn bạn. Tôi đã nhận thông tin và sẽ trả lời trong vòng một ngày.',
  'Send another': 'Gửi đơn khác',
  'Your name': 'Tên bạn',
  'What are you after?': 'Bạn đang cần gì?',
  'The order': 'Nội dung đơn',
  'Send the order': 'Gửi đơn',
  'Or email': 'Hoặc email tới',
  '. Same inbox, same reply time.': '. Cùng hộp thư, cùng thời gian phản hồi.',
  'Your details go to my inbox and nowhere else.': 'Thông tin của bạn đi thẳng vào hộp thư của tôi, không đi đâu khác.',
  'Please add your name.': 'Vui lòng cho biết tên bạn.',
  'Please add a valid email address.': 'Vui lòng nhập địa chỉ email hợp lệ.',
  'Sending…': 'Đang gửi…',
  'Something went wrong. Please email me directly:': 'Có lỗi xảy ra. Bạn hãy gửi email trực tiếp cho tôi:',

  /* ── privacy page ───────────────────────────────────────────────────── */
  'House policy': 'Quy định của nhà',
  'Privacy, in plain words': 'Quyền riêng tư, nói thẳng',
  'The only thing this site collects is what you type into the booking form: your name, email and the note you send. The order is delivered to my inbox through Formspree, an email service, and it is used for one thing only: replying to you.':
    'Trang này chỉ thu đúng những gì bạn gõ vào form đặt bàn: tên, email và lời nhắn. Đơn được gửi vào hộp thư của tôi qua Formspree, một dịch vụ email, và chỉ dùng cho một việc: trả lời bạn.',
  'No analytics scripts, no advertising cookies, no tracking pixels. If you email me directly, the same applies. Your message lives in my inbox and nowhere else.':
    'Không script phân tích, không cookie quảng cáo, không pixel theo dõi. Nếu bạn email trực tiếp, điều tương tự cũng đúng. Tin nhắn của bạn nằm trong hộp thư của tôi và không đi đâu khác.',
  'Want your details gone? Ask and I delete them, confirmation included.':
    'Muốn xoá thông tin? Chỉ cần hỏi, tôi xoá và xác nhận lại.',
  'Back to the front of house': 'Về trang chính',

  /* ── 404 ────────────────────────────────────────────────────────────── */
  "This table's not set.": 'Bàn này chưa dọn.',
  'The page you asked for is not on the menu. It may have moved, or it may never have existed.':
    'Trang bạn tìm không có trên thực đơn. Có thể nó đã dời đi, hoặc chưa từng tồn tại.',

  /* ── language toggle label is per-language, handled in COPY ─────────── */
  'Tiếng Việt': 'English',
};

/*
 * The ticket lines typed onto the order ticket, per language.
 */
export const TICKET: string[] = [
  '1× brief, no jargon',
  '2× calls or texts',
  '1× plan + fixed quote',
  '1× site, start to finish',
  '1× handover, you drive',
];

export const TICKET_VI: string[] = [
  '1× đề bài, không thuật ngữ',
  '2× cuộc gọi hoặc tin nhắn',
  '1× kế hoạch + báo giá chốt',
  '1× website, từ đầu đến cuối',
  '1× bàn giao, bạn cầm lái',
];

/*
 * Split-flap board words, per language.
 */
export const FLAP = {
  en: ['Landing pages', 'Online stores', 'Web apps', 'Site rescues', 'SEO groundwork', 'Hosting & care'],
  vi: ['Trang đích', 'Cửa hàng trực tuyến', 'Ứng dụng web', 'Cứu hộ website', 'Nền tảng SEO', 'Hosting & bảo trì'],
};

/*
 * Per-language interface words that are not translation lookups.
 */
export const COPY = {
  en: {
    lang: 'Tiếng Việt',
    firing: 'Firing…',
    done: 'Order complete',
    served: 'Served · 0.6s',
    plating: 'Plating up…',
    perf: 'Performance',
    paint: 's first paint',
    phName: 'Kelvin Nguyen',
    phEmail: 'you@yourbusiness.com',
    phNote: 'We run a two-site bakery and take orders over the phone. I want people to order cakes online.',
  },
  vi: {
    lang: 'English',
    firing: 'Đang lên món…',
    done: 'Xong đơn',
    served: 'Đã phục vụ · 0,6s',
    plating: 'Đang bày món…',
    perf: 'Hiệu năng',
    paint: 's để hiện trang',
    phName: 'Kelvin Nguyễn',
    phEmail: 'ban@doanhnghiep.com',
    phNote: 'Chúng tôi có hai tiệm bánh và đang nhận đơn qua điện thoại. Tôi muốn khách đặt bánh online.',
  },
};

/** Translate one English string for the given language. */
export function tr(lang: Lang, s: string): string {
  return lang === 'vi' ? I18N[s] ?? s : s;
}
