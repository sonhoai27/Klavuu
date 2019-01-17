import * as React from 'react';
import { connect } from 'react-redux';
const uuidv4 = require('uuid/v4');
import LazyLoad from 'react-lazyload';
import ContentLoader from 'react-content-loader'

import Breadcrumb from '@app/shared/Breadcrumb';
import Checkbox from '../shared/layout/checkbox';
import Icon from '../shared/layout/Icon';
import { actionGetProductsFiler } from '@app/stores/product/ProductActions';
import FormatNumber from '@app/shared/utils/FormatNumber';
import { CDN } from '@app/shared/const';
const Styles = require('./styles/ProductLists.scss')

interface IProductListsProps {
  actionGetProductsFiler: Function;
  productsFilterState: any;
}

class ProductLists extends React.Component<IProductListsProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount(): void {
    this.props.actionGetProductsFiler()
  }

  isProduct = () => {
    if (this.props.productsFilterState
      && this.props.productsFilterState.items) {
      return this.props.productsFilterState.items
    }
    return []
  }

  onLoading = () => (
    <ContentLoader
      height={475}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="27.75" y="18.61" rx="0" ry="0" width="244%" height="284" />
      <rect x="27.75" y="318.61" rx="0" ry="0" width="127.4" height="8.01" />
      <rect x="27.75" y="334.61" rx="0" ry="0" width="234.78" height="8.01" />
      <rect x="27.75" y="352.61" rx="0" ry="0" width="234.78" height="8.01" />
    </ContentLoader>
  )

  renderProducts = () => (
    this.isProduct().map((element) => {
      return (
        <div className="col-sm-3" key={uuidv4()} >
          <LazyLoad
            height={'100vh'}
            once
            placeholder={this.onLoading()}
            debounce={800}>
            <div className={Styles['product_list__item__product']}>
              <div className={Styles['product_list__items__image']}>
                <img className="img-fluid" src={`${CDN}${element.img_src}`} />
                <div className={Styles['product_list__item__discount']}></div>
              </div>
              <div className={Styles['product_list__item__brand']}>
                {element.brand_name}
              </div>
              <div className={Styles['product_list__item__name']}>
                {element.product_name}
              </div>
              <div className={Styles['product_list__item__price']}>
                <span>{FormatNumber(element.product_price)}đ</span>
                <span>{element.product_price}</span>
              </div>
            </div>
          </LazyLoad>
        </div >
      )
    })
  )

  render() {
    return (
      <div className={`${Styles['product_lists']} container`}>
        <Breadcrumb
          items={[
            {
              title: 'Trang chủ',
              href: '/',
              active: false,
            },
            {
              title: 'Danh sách sản phẩm',
              href: '/page/products',
              active: true,
            },
          ]}
        />
        <ul className={Styles['product_lists__sort']}>
          <span>Sắp xếp: <span>Gợi ý</span></span>
          <li>Giá từ thấp đến cao</li>
          <li>Giá từ cao đến thấp</li>
        </ul>
        <ul className={Styles['product_lists__filter']}>
          <li>
            <span>Hãng</span>
            <ul className={Styles['product_lists__filter--sub']}>
              <div className="row">
                <div className="col-sm-4">
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      name="Apple"
                      value="apple" />
                  </li>
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      name="HTC"
                      value="htc" />
                  </li>
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      name="Nokia"
                      value="nokia" />
                  </li>
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      name="Samsung"
                      value="samsung" />
                  </li>
                </div>
              </div>
              <span className={Styles['product_lists__filter--btn']}>Áp dụng</span>
            </ul>
          </li>
          <li>Danh mục</li>
          <li>
            <span>Giá</span>
            <ul className={Styles['product_lists__filter--sub']}>
              <div className="row">
                <div className="col-sm-4">
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      name="Dưới 500.000đ"
                      value="500000" />
                  </li>
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      name="Từ 500.000đ -> 1.000.000đ"
                      value="1000000" />
                  </li>
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      name="Trên 1.000.000đ"
                      value="1000001" />
                  </li>
                </div>
              </div>
              <span className={Styles['product_lists__filter--btn']}>Áp dụng</span>
            </ul>
          </li>
        </ul>
        <ul className={Styles['product_lists__filter--choose-items']}>
          <li>
            <span>Nokia</span>
            <Icon name="cross" />
          </li>
          <li>
            <span>Dưới 500.000đ</span>
            <Icon name="cross" />
          </li>
        </ul>
        <div className={`${Styles['product-list__items']} row`}>
          {this.renderProducts()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  productsFilterState: storeState.productReducer.productsFilterState,
})

const mapDispatchToProps = {
  actionGetProductsFiler,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductLists)
