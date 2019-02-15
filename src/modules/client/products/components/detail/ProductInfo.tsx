import * as React from 'react';

import Rater from '@app/modules/client/shared/layout/rating';
import Icon from '@app/modules/client/shared/layout/Icon';

const ProductInfo = ({
  Styles,
  isProduct,
  isReviews,
  onFormatNumber,
  onMakePrice,
  onAddToCart,
  currentProductImage,
  onCollapse,
  renderTags,
}) => (
  <>
    <h4 className="brand">
      {isProduct()['brand_name']}
    </h4>
    <h4 className={Styles['title']}>
      {isProduct()['product_name']}
    </h4>
    <div className={Styles['product-rating']}>
      <Rater disabled={true} rating={isReviews()['avg']} />
      ({isReviews()['num_rows']} reviews)
            </div>
    <div className={Styles['price']}>
      {
        Number(isProduct()['product_discount']) !== 0
          ? <span className={Styles['price']}>{onFormatNumber(isProduct()['product_price'])}đ</span>
          : ''
      }
      <span className={Styles['discount']}>
        {
          onFormatNumber(
            onMakePrice(
              isProduct()['product_price'],
              isProduct()['product_discount'],
            ),
          )
        }đ
              </span>
    </div>
    <div className={Styles['product_volume_weight']}>
      <h4>{isProduct()['product_volume_weight']}</h4>
    </div>
    <div className={Styles['add-to-cart']}>
      <div
        onClick={() => onAddToCart({
          qty: 1,
          product_name: isProduct()['product_name'],
          product_alias: isProduct()['product_alias'],
          product_price: isProduct()['product_price'],
          product_discount: isProduct()['product_discount'],
          product_id: isProduct()['product_id'],
          product_image: currentProductImage.img_src,
        })}
        className={`${Styles['add-to-cart__btn']} btn`}>
        Thêm vào giỏ hàng
              </div>
    </div>
    <ul className={Styles['additional-info']}>
      <li><Icon name="thumbs-up" /> Cam kết 100% chính hãng</li>
      <li><Icon name="train" /> Giao hàng dự kiến: Thứ 5 17/1 - Thứ 3 22/1</li>
      <li><Icon name="sync" /> Đổi trả trong 7 ngày</li>
    </ul>
    <div className={Styles['product-tags']}>
      {renderTags()}
    </div>
    <div className={Styles['product-description']}>
      <div className={Styles['product-description__session']}>
        <div
          onClick={onCollapse}
          className={Styles['product-description__title']}>
          Thông tin sản phẩm <Icon name="chevron-down" />
        </div>
        <div className={Styles['product-description__content']}>
          <div dangerouslySetInnerHTML={{ __html: isProduct()['product_info'] }} />
        </div>
      </div>
      <div
        onClick={onCollapse}
        className={Styles['product-description__session']}>
        <div className={Styles['product-description__title']}>
          Cách sử dụng <Icon name="chevron-down" />
        </div>
        <div className={Styles['product-description__content']}>
          <div
            dangerouslySetInnerHTML={{ __html: isProduct()['product_how_to_use'] }} />
        </div>
      </div>
      <div
        onClick={onCollapse}
        className={Styles['product-description__session']}>
        <div className={Styles['product-description__title']}>
          Thông tin khác <Icon name="chevron-down" />
        </div>
        <div className={Styles['product-description__content']}>
          <div
            dangerouslySetInnerHTML={{ __html: isProduct()['product_more_info'] }} />
        </div>
      </div>
    </div>
  </>
)

export default ProductInfo
