import * as React from 'react';

const S = require('./AboutUs.scss')

const AboutUS = () => (
  <div className={S['about-us']}>
    <div className={S['about-us__banner']}>
      <p>About Us</p>
      <img
        // tslint:disable-next-line:max-line-length
        src="https://2.bp.blogspot.com/-kn_-Y1Q58o8/WXuY3xZKOFI/AAAAAAAABLI/dDQWWWHZeDQynREF9HvoG5FnhtUoZq_GgCLcBGAs/s1600/innisfree_banner.jpg"
        alt="" className="img-fluid" />
    </div>
    <div className={`${S['about-us__content']} col-12`}>
      <div className="container">
        Về Leflair
        Mọi ý tưởng thường nảy sinh từ một vấn đề, và vấn đề của Leflair
        rất rõ ràng: hàng hiệu tại Việt Nam thật sự quá đắt đỏ. Nhiều
        người Việt phải ra nước ngoài để "săn lùng" các thương hiệu yêu
        thích. Một số khác lựa chọn đặt hàng qua những trang web quốc tế,
        chấp nhận phí vận chuyển đắt đỏ và chờ đợi hàng tháng trời để món hàng đến tay mình.
        Còn đâu niềm vui mua sắm? Người tiêu dùng Việt Nam xứng đáng có một trải nghiệm tốt hơn.
        Leflair ra đời để giải quyết những phiền toái đó và mang đến những
        lựa chọn mua sắm tốt hơn. Chúng tôi tin rằng mua sắm phải là niềm vui
         thuần khiết. Các thương hiệu phải tự tìm đến bạn theo cách tiện lợi
        Leflair là trang web đầu tiên tại Việt Nam giới thiệu đến người mua
         những thương hiệu hàng đầu thế giới với mức giá hấp dẫn. Mỗi ngày,
          “cửa hàng” Leflair sẽ “mở cửa” vào lúc 8 giờ sáng với những chương
           trình ưu đãi mới cho các sản phẩm hàng hiệu thời trang, làm đẹp, nội thất và hơn thế nữa.
        Leflair chỉ làm việc trực tiếp với các thương hiệu và nhà phân phối
         chính thức, vì vậy bạn có thể hoàn toàn an tâm về nguồn gốc sản phẩm,
          chất lượng sản phẩm và mức giá tốt nhất.
        Leflair mong muốn trở thành điểm đến số 1 cho nhu cầu mua sắm hàng
         hiệu trực tuyến tại Việt Nam. Hoài bão lớn hơn của chúng tôi là
         mang sản phẩm hàng hiệu với mức giá tốt nhất đến tay người tiêu
          dùng trên toàn khu vực Đông Nam Á.
    </div>
    </div>
  </div>
)

export default AboutUS
