import {
    airbnb,
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    binance,
    coinbase,
    dropbox,
    facebook,
    instagram,
    linkedin,
    News1,
    News2,
    News3,
    rating,
    send,
    shield,
    star,
    twitter,
} from "../assets";
import {APP_NAME, loadStateFromHiddenField} from "../utils";
// import { tt} from "../utils";
// import {loadState} from "@nextcloud/initial-state";

export const tvpPhone = "01.1234.56789";
export const tvpEmail = "tvp@gmail.vn";

const tt = (text) => text;

export const navLinks = [
    {
        id: "home",
        title: tt("Trang Chủ"),
        link: "/",
    },
    {
        id: "about-us",
        title: tt("Về Chúng Tôi"),
        link: "/about-us",
    },
    {
        id: "restaurants",
        title: tt('Chuỗi Nhà Hàng'),
        type: 'DROPDOWN_SELECT',
        link: "/restaurants",
    },
    // {
    // 	id: "service",
    // 	title: tt('Dịch Vụ'),
    // 	link: "/services",
    // },
    {
        id: "contact",
        title: tt("Liên Hệ"),
        link: "/contact",
    },
];

export const features = [
    {
        id: "feature-1",
        icon: star,
        title: "Rewards",
        content:
            "The best credit cards offer some tantalizing combinations of promotions and prizes",
    },
    {
        id: "feature-2",
        icon: shield,
        title: "100% Secured",
        content:
            "We take proactive steps make sure your information and transactions are secure.",
    },
    {
        id: "feature-3",
        icon: send,
        title: "Balance Transfer",
        content:
            "A balance transfer credit card can save you a lot of money in interest charges.",
    },
];

export const feedback = [
    {
        id: "feedback-1",
        content:
            "Từ khi biết đến ứng dụng Dabi, tôi và các bạn của tôi luôn bật tính năng Thách đấu để so tài. Người chơi thắng sẽ được tích điểm để nhận quà hoặc quy đổi ra tiền mặt. Một cách kiếm lời thú vị!!!",
        name: "Trần Anh Tuấn",
        title: "Founder & Leader",
        img: avatar1,
        rating,
    },
];

export const feedbacks = [
    {
        id: "feedback-1",
        content:
            "Từ khi biết đến ứng dụng Dabi, tôi và các bạn của tôi luôn bật tính năng Thách đấu để so tài. Người chơi thắng sẽ được tích điểm để nhận quà hoặc quy đổi ra tiền mặt. Một cách kiếm lời thú vị!!!",
        name: "Trần Anh Tuấn",
        title: "Founder & Leader",
        img: avatar1,
        rating,
    },
    {
        id: "feedback-2",
        content:
            "Mình có niềm đam mê với Billiards, tuy nhiên mình không có nhiều bạn có cùng đam mê để chơi cùng. Từ khi sử dụng ứng dụng Dabi, mình đã tìm được những người bạn cũng hứng thú với bộ môn này ngay tại khu vực mình đang sống. Chúng mình giao lưu, học hỏi và kết thân với nhau.",
        name: "Ryan Vo",
        title: "Founder & Leader",
        img: avatar3,
        rating: 5,
    },
    {
        id: "feedback-3",
        content:
            "Tuyệt vời, sau khi thách đấu vài ván chơi với bạn, mình đã chọn quy đổi phần quà thành tiền mặt để đãi bạn bè một bữa ăn nhẹ vào ngày hôm đó!!",
        name: "Ngọc Trinh",
        title: "Founder & Leader",
        img: avatar2,
        rating: 5,
    },
    {
        id: "feedback-4",
        content:
            "Đấu trường Bida là nơi tuyệt vời để thể hiện đam mê và tài năng của mình. Tôi đã gặp được những đối thủ đáng gờm và học hỏi được nhiều kỹ thuật mới.",
        name: "Hải Nguyễn",
        title: "Founder & Leader",
        img: avatar4,
        rating: 5,
    },
];

export const news = [
    {
        id: "news-1",
        cover: News1,
        title:
            "Lịch thi đấu Billiards SEA Games 32 hôm nay 14/5: Chung kết pool 9 bi đôi nam. Lịch thi đấu Billiards SEA Games 32 hôm nay 14/5: Chung kết pool 9 bi đôi nam",
        created_date: 1684750860,
        content: `<article class="noidung_bai nd_1">
    <span id="daubai"></span>
  <p>Có rất nhiều thể loại bida, một trong những thể loại phổ biến nhất là bida 3 bi (<a href="https://vi.wikipedia.org/wiki/Snooker" target="_blank">bida Carom</a>), là kiểu chơi bida gồm 3 bi trắng, đỏ và vàng. Kiểu chơi của bida Carom gồm có: bida 3 bi tự do, 1 băng và 3 băng. Người chơi bida rất đa dạng, từ nhân viên văn phòng đến những bác thợ xây, công nhân…, họ chơi bida để giải trí sau một ngày làm việc vất vả. Chúng ta cùng tìm hiểu xem điều gì làm bida 3 bi cuốn hút đến vậy.</p>

  <p style="text-align:center"><img alt="Bida 3 bi - luật cơ bản" src="//cohoi.tuoitre.vn/upload/hinhbaiviet/images/2017/thang-11/02-11/021117_bidathanhminh_1.jpg"></p>

  <p><strong>Các luật trong bida 3 bi</strong></p>

  <p><strong>A. Luật thi đấu chung của bida 3 bi (bida Carom)</strong></p>

  <p>Chọn người đánh khai cuộc (đánh đề-pa)</p>

  <p>Đầu tiên, trọng tài đặt 2 bi trên đường ngang điểm cuối và điểm đầu sẽ là mốc để phân chia thành 2 phần của đối thủ.</p>

  <p>Tiếp theo, hai cơ thủ cùng lúc đánh bi về phía băng đỉnh, sau khi chạm băng đỉnh bi sẽ dội trở lại, bi nào gần băng đầu bàn nhất thì sẽ là người đánh khai cuộc (đánh đề-pa).</p>

  <p><strong>Những trường hợp trong game bida 3 bi cần phải lưu ý:</strong><br>
  - Trường hợp 2 bi chạm nhau thì phải đánh lại.<br>
  - Nếu đánh bi ra khỏi phần bàn của mình sẽ bị thua và mất quyền khai cuộc.<br>
  - Người đánh khai cuộc có quyền nhường cho đối phương.<br>
  - Có thể bốc thăm thay cho lựa chọn người đánh khai cuộc để bắt đầu trận đấu.</p>

  <p><strong>Tiếp theo, chúng ta cần phải biết những vị trí đặt bi khi đánh khai cuộc:</strong><br>
  - Bi đỏ sẽ được đặt ở điểm đầu (là điểm nằm trên đường tâm dọc của bàn, cách băng đỉnh 142 cm).<br>
  - Bi của cơ thủ đối phương sẽ được đặt ở điểm cuối (là điểm nằm trên đường tâm dọc của bàn, cách băng cuối 71 cm).<br>
  - Bi của người khai cuộc được đặt ngang với bi của đối phương, cách bi này 18 cm về phía bên trái hoặc bên phải.</p>

  <p style="text-align:center"><img alt="Bida 3 bi - luật cơ bản" src="//cohoi.tuoitre.vn/upload/hinhbaiviet/images/2017/thang-11/02-11/021117_bidathanhminh_2.jpg"></p>

  <p><strong>Những lỗi phạm luật làm mất lượt đánh trong bida 3 bi</strong><br>
  1. Bi bị đánh rơi ra khỏi bàn (tham khảo hơn 20 loại <a href="https://billiardsthanhminh.com/collections/ban-bida" target="_blank">bàn bida</a> đủ tiêu chuẩn).<br>
  2. Đánh bi khi bi còn chưa dừng hẳn (không kể bi chủ hay bi mục tiêu).<br>
  3. Dùng phần khác của cơ (tham khảo hơn 30 loại <a href="https://billiardsthanhminh.com/collections/co-dauco" target="_blank">cơ bida</a> giá rẻ khác nhau) ngoài đầu da để đánh.<br>
  4. Chạm tay, quần áo hay bất cứ bộ phận cơ thể nào khác vào bất cứ bi nào.<br>
  5. Lúc đánh, chân bạn không chạm sàn.<br>
  6. Đẩy cơ (dùng đầu cơ chạm vào bi với lượng thời gian vượt quá cú đánh hợp lệ).<br>
  7. Đánh chạm bi 2 lần.<br>
  8. Đánh sai bi. (Trong lỗi này, trọng tài và đấu thủ đều có quyền bắt lỗi bạn. Tuy nhiên, cơ thủ có thể bắt lỗi này bất cứ lúc nào trước hoặc sau khi đánh, còn trọng tài chỉ được bắt lỗi sau khi cú đánh đã được thực hiện. Còn lại, những điểm ghi trước khi phạm lỗi đều được tính).<br>
  9. Sử dụng không đúng kỹ thuật khi đánh nhảy bi.</p>

  <p><strong>Qua những lỗi trong quá trình đánh bida 3 bi kể trên, bạn cần lưu ý những điểm sau:</strong><br>
  - Bi nhảy lên thành băng rồi quay trở lại bàn thì được coi là hợp lệ. Nếu bi vẫn còn nằm lại trên thành băng hay thành bàn thì được cho là phạm lỗi và cơ thủ sẽ mất lượt.<br>
  - Những lỗi xảy ra không cố ý sẽ được đánh tiếp.<br>
  - Việc phạm lỗi xảy ra do sự va chạm từ bên ngoài, cơ thủ sẽ không bị bắt lỗi. Nếu bi bị xê dịch do tác động bên ngoài thì sẽ được đặt lại vị trí cũ và cơ thủ được tiếp tục đánh.<br>
  - Đánh trượt cơ không phạm lỗi (không làm mất lượt) và vẫn tính điểm nếu đánh trúng như bình thường (trừ khi bị phần sắt bịt đầu cơ hay cán cơ chạm bi cái).</p>

  <p><strong>Sau khi đã nắm rõ các bước cơ bản trên rồi, tiếp theo chúng ta cần phải biết đến cách xử lý những diễn biến trong chơi bida 3 bi – bida Carom:</strong><br>
  - Đầu tiên, có những lý do ngoài sự kiểm soát của đấu thủ mà đấu thủ không thể bắt đầu trận đấu thì trận đấu có thể bị hoãn hoặc ban tổ chức sẽ quyết định.<br>
  - Nếu cơ thủ không thể kết thúc trận đấu theo điều lệ thì cơ thủ đó sẽ bị xử thua, trừ khi cơ thủ kia chấp nhận tình huống đó và đồng ý kết thúc trận đấu vào lúc thích hợp do ban tổ chức đề ra.<br>
  - Tiếp theo, nếu một đấu thủ bị tước quyền thi đấu trong 1 trận đấu thì đấu thủ đó sẽ bị xử thua và đấu thủ kia được công nhận thắng cuộc, lúc đó sẽ có số điểm ghi được trong trận đấu này.<br>
  - Hơn nữa, nếu 1 đấu thủ bị truất quyền trong cả cuộc đấu thì tất cả các trận đấu của đấu thủ này sẽ bị hủy bỏ (bao gồm cả các trận đã chơi và các trận còn lại).<br>
  - Nếu vì những lý do ngoài sự kiểm soát của đấu thủ, không thể bắt đầu chơi được thì đấu thủ này phải thông báo cho trọng tài đúng lúc để thay đấu thủ hoặc cặp đấu thủ khác. Tất cả đấu thủ phải chịu sự triệu tập khẩn cấp đó, nếu sự thay thế là cần thiết.<br>
  - Nếu đánh chạy bi có chủ đích là không được phép. Nếu trường hợp này xảy ra thì đấu thủ tiếp theo có quyền đánh với các bi ở vị trí đó hay có quyền yêu cầu khai cuộc lại.<br>
  - Bên cạnh đó, nếu đấu thủ dùng một lượng thời gian khác thường giữa các cú đánh hoặc để xác định sự lựa chọn cú đánh với ý định làm mất ổn định tâm lý thi đấu của đối phương, thì trọng tài sẽ đưa ra lời cảnh cáo đấu thủ có thể bị mất lượt cơ. Nếu vẫn tiếp tục, trọng tài sẽ truất quyền cú đánh đó (khi cảnh cáo, trọng tài sẽ thông báo lượng thời gian cho phép là 45 giây).</p>

  <p><strong>Cuối cùng là những điều bạn cần biết về cách kết thúc trận đấu.</strong></p>

  <p>Trận đấu kết thúc hợp lệ là khi cơ thủ ghi điểm hoặc đánh đủ số lượt cơ mà ban tổ chức quy định. Nếu không quy định lượt cơ thì cơ thủ nào có đủ số điểm mà ban tổ chức đề ra trước sẽ thắng cuộc.</p>

  <p>Chúng ta cần nắm được rằng trong trường hợp 2 bên bằng điểm thì cách quyết định như sau:<br>
  - So sánh chỉ số trung bình của 2 bên ở những trận trước.<br>
  - Thi đấu luân lưu bằng cú đánh khai cuộc cho đến khi có sự cách biệt về điểm.<br>
  - Bốc thăm.</p>

  <p><strong>B. Luật thi đấu Billiards Libre – Bida 3 bi tự do</strong></p>

  <p>Billiards Libre – Bida 3 bi tự do là một nội dung của bida Carom, trong đó cơ thủ phải đánh bi cái trực tiếp hay gián tiếp trúng 2 bi mục tiêu thì ghi được 1 điểm; cơ thủ tiếp tục đánh cho đến khi đánh trượt hoặc phạm lỗi. Ngoài những điều luật chung của bida 3 bi được áp dụng như trên.</p>

  <p>Tuy nhiên, Bida 3 trái tự do còn có quy định riêng khi tính điểm trong VÙNG GIỚI HẠN (đó là 4 vùng ở 4 góc bàn, được đánh dấu bởi vạch kẻ thành hình tam giác với cạnh dài 71 cm và cạnh ngắn 35,5 cm).</p>

  <p>Như vậy, các cú đánh nhiều điểm sẽ bị giới hạn trong vùng này. Cụ thể như sau:<br>
  Khi cả 2 bi mục tiêu vào vùng giới hạn (kể cả khi tâm của bi nằm trên đường giới hạn) thì cơ thủ chỉ được quyền đánh 1 điểm; sau khi ghi điểm thứ hai, cơ thủ phải đưa ít nhất 1 bi mục tiêu ra khỏi vùng giới hạn. Nếu bi mục tiêu được đưa ra ngoài vùng giới hạn và sau đó lại quay vào vùng giới hạn thì sẽ bắt đầu tính là “vào”. Vì vậy, nếu cơ thủ không thực hiện được những điều trên sẽ bị xem là phạm lỗi và mất lượt cơ của mình.</p>

  <p><strong>C. Luật thi đấu bida Carom 1 băng hay còn được gọi là bida 3 bi 1 băng</strong></p>

  <p>Ngoài những điều luật chung của Billiards Carom (như mục A nêu trên) được áp dụng thì trong bida Carom 1 băng, đấu thủ phải đánh bi cái chạm ít nhất 1 băng trước khi chạm vào bi mục tiêu thứ 2, nếu không thực hiện được thì sẽ bị xem như phạm lỗi và mất lượt.</p>

  <p><strong>D. Luật thi đấu Billiards Tree cushion - Bida 3 băng (Carom 3 băng)</strong></p>

  <p>Ngoài những điều luật chung của bida Carom, trong bida 3 bi 3 băng còn có một số quy định riêng như sau:</p>

  <p style="text-align:center"><img alt="Bida 3 bi - luật cơ bản" src="//cohoi.tuoitre.vn/upload/hinhbaiviet/images/2017/thang-11/02-11/021117_bidathanhminh_3.jpg"></p>

  <p><strong>Quy định 1: Cách đánh bi cái (bi chủ)</strong></p>

  <p>Cơ thủ phải đánh bi cái chạm ít nhất 3 lần với 1 hay nhiều băng trước khi chạm vào bi mục tiêu thứ 2, nếu không thực hiện được thì sẽ bị xem như phạm lỗi. Như vậy, sẽ có 3 trường hợp cụ thể như sau:<br>
  - Bi chủ sau khi chạm vào bi cái thì phải chạm ít nhất 3 băng nữa rồi mới chạm bi còn lại.<br>
  - Bi chủ chạm trước 3 băng rồi chạm lần lượt 2 bi còn lại.<br>
  - Bi chủ chạm trước 1 hoặc 2 băng sau đó chạm 1 bi rồi tiếp tục chạm thêm băng rồi chạm bi còn lại.</p>

  <p>Trường hợp bi cái nhảy lên một hay nhiều thành bàn, thành băng rồi quay trở lại bàn thì được xem như cú đánh hợp lệ và mỗi thành băng hay thành bàn sẽ được tính là chạm 1 băng.</p>

  <p>Nếu bi cái bị dính vào thành băng thì cơ thủ có thể đánh vào chính băng đó nhưng lần chạm đó sẽ không được tính, chỉ được tính ở những lần chạm tiếp theo.</p>

  <p><strong>Quy định 2: Về bàn, cơ, bi và vị trí đặt bi</strong></p>

  <p>Khác với các trận đánh bida 3 bi thông thường, thể loại bida 3 băng sử dụng bàn loại lớn, có sưởi, dùng bộ bi chấm (bi trắng và vàng có 6 chấm đỏ xung quanh), cơ nặng hơn cơ đánh trong bida tự do.</p>

  <p><strong>Tiếp theo, bạn cần biết về vị trí đặt bi quy định:</strong><br>
  - Bi đỏ: Đặt ngay điểm đặt như trong luật bida Carom.<br>
  - Bi chủ: Đặt ngay điểm đề-pa ban đầu của bi đối phương.<br>
  - Bi đối phương: Đặt ngay giữa bàn.</p>

  <p><strong>Bên cạnh đó, khi bị dính hoặc rơi khỏi bàn ta sẽ đặt lại bi về vị trí cũ:</strong><br>
  - Trường hợp bi văng ra ngoài: Chỉ đặt bi đó lại 1 trong 3 vị trí đặt bi quy định; 2 bi còn lại giữ nguyên (nếu 2 bi văng ra ngoài thì đặt lại 2 bi, bi còn lại giữ nguyên).<br>
  - Trường hợp 2 bi dính (hay còn gọi là côn bi), trong đó có bi cái: Đặt 2 bi bị côn vào vị trí đặt bi quy định. Nếu điểm quy định bị chiếm chỗ thì bi chiếm chỗ đó sẽ được đặt lại tại điểm quy định như sau: Nếu là bi đỏ sẽ được đặt tại điểm đầu, nếu là bi của đấu thủ kia sẽ được đặt tại điểm giữa.</p>

  <p>Đó là tất cả thông tin cơ bản về luật bida 3 bi. Hãy tham khảo trang <a href="https://billiardsthanhminh.com/" target="_blank">Billiards Thanh Minh</a> để có thể tự sắm cho mình một bộ bàn - cơ bida, tự luyện tập với trò chơi hấp dẫn này.</p>
    <span id="hetbai"></span>
  </article>`,
    },
    {
        id: "news-2",
        cover: News2,
        title:
            "Nguyễn Trần Thanh Tự tạo nên trận chung kết carom 3 băng toàn Việt Nam cùng Anh Chiến",
        created_date: 1684750860,
        content:
            "Đánh bại cơ thủ chủ nhà Woo Donghoon, Nguyễn Trần Thanh Tự giành quyền vào chơi ở chung kết nội dung carom 3 băng đơn nam, nơi anh sẽ chạm mặt người đồng đội Nguyễn Đức Anh Chiến.",
    },
    {
        id: "news-3",
        cover: News3,
        title:
            "Nguyễn Đức Anh Chiến vào chung kết carom 3 băng nam ở kỳ SEA Games thứ hai liên tiếp",
        created_date: 1684750860,
        content:
            "Cơ thủ số 1 Việt Nam Trần Quyết Chiến mất chức vô địch dù chỉ còn 1 điểm trước Bao Phương Vinh, qua đó 2 lần liên tiếp không thể đăng quang giải đấu carom 3 băng tại Bình Thuận có giải thưởng khá cao.",
    },
    {
        id: "news-4",
        cover: News3,
        title:
            "Nguyễn Đức Anh Chiến vào chung kết carom 3 băng nam ở kỳ SEA Games thứ hai liên tiếp",
        created_date: 1684750860,
        content:
            "Cơ thủ số 1 Việt Nam Trần Quyết Chiến mất chức vô địch dù chỉ còn 1 điểm trước Bao Phương Vinh, qua đó 2 lần liên tiếp không thể đăng quang giải đấu carom 3 băng tại Bình Thuận có giải thưởng khá cao.",
    },
    {
        id: "news-5",
        cover: News3,
        title:
            "Nguyễn Đức Anh Chiến vào chung kết carom 3 băng nam ở kỳ SEA Games thứ hai liên tiếp",
        created_date: 1684750860,
        content:
            "Cơ thủ số 1 Việt Nam Trần Quyết Chiến mất chức vô địch dù chỉ còn 1 điểm trước Bao Phương Vinh, qua đó 2 lần liên tiếp không thể đăng quang giải đấu carom 3 băng tại Bình Thuận có giải thưởng khá cao.",
    },
    {
        id: "news-6",
        cover: News3,
        title:
            "Nguyễn Đức Anh Chiến vào chung kết carom 3 băng nam ở kỳ SEA Games thứ hai liên tiếp",
        created_date: 1684750860,
        content:
            "Cơ thủ số 1 Việt Nam Trần Quyết Chiến mất chức vô địch dù chỉ còn 1 điểm trước Bao Phương Vinh, qua đó 2 lần liên tiếp không thể đăng quang giải đấu carom 3 băng tại Bình Thuận có giải thưởng khá cao.",
    },
    {
        id: "news-7",
        cover: News3,
        title:
            "Nguyễn Đức Anh Chiến vào chung kết carom 3 băng nam ở kỳ SEA Games thứ hai liên tiếp",
        created_date: 1684750860,
        content:
            "Cơ thủ số 1 Việt Nam Trần Quyết Chiến mất chức vô địch dù chỉ còn 1 điểm trước Bao Phương Vinh, qua đó 2 lần liên tiếp không thể đăng quang giải đấu carom 3 băng tại Bình Thuận có giải thưởng khá cao.",
    },
];

export const stats = [
    {
        id: "stats-1",
        title: tt("Cơ thủ"),
        value: "3800+",
    },
    {
        id: "stats-2",
        title: tt("Câu lạc bộ"),
        value: "230+",
    },
    {
        id: "stats-3",
        title: "Giải thưởng",
        value: "$230M+",
    },
];


const chainStore = JSON.parse(loadStateFromHiddenField(APP_NAME, 'chain-store', '[]'));
const mapToLink = () => {
    let array = []
    for (let i of chainStore) {
        array.push({
            name: i.name,
            link: `/restaurant/${i.id}`,
        })
    }
    return array
}

export const footerLinks = [
    {
        id: "footer-1",
        title: "",
        links: [
            {
                name: tt("Trang chủ"),
                link: "/",
            },
            {
                name: tt("Về chúng tôi"),
                link: "/about-us",
            },
            {
                name: tt("Liên hệ"),
                link: "/contact",
            },
        ],
    },
    mapToLink().length > 0 && {
        id: "footer-2",
        title: "",
        links: mapToLink()
    },
    // {
    // 	id: "footer-3",
    // 	title: "",
    // 	links: [
    // 		{
    // 			name: tt("Dịch vụ"),
    // 			link: "/services",
    // 		},
    // 		{
    // 			name: tt("Liên hệ"),
    // 			link: "/contact",
    // 		},
    // 	],
    // },
];

export const socialMedia = [
    {
        id: "social-media-1",
        icon: instagram,
        link: "https://www.instagram.com/",
    },
    {
        id: "social-media-2",
        icon: facebook,
        link: "https://www.facebook.com/",
    },
    {
        id: "social-media-3",
        icon: twitter,
        link: "https://www.twitter.com/",
    },
    {
        id: "social-media-4",
        icon: linkedin,
        link: "https://www.linkedin.com/",
    },
];

export const clients = [
    {
        id: "client-1",
        logo: airbnb,
    },
    {
        id: "client-2",
        logo: binance,
    },
    {
        id: "client-3",
        logo: coinbase,
    },
    {
        id: "client-4",
        logo: dropbox,
    },
];

export const LIMIT = 6;
export const LIMIT_ITEM_MENU = 16;
