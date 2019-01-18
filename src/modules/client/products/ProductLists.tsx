import * as React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import ContentLoader from 'react-content-loader'
const queryString = require('query-string');

import Breadcrumb from '@app/shared/Breadcrumb';
import Checkbox from '../shared/layout/checkbox';
import { actionGetProductsFiler } from '@app/stores/product/ProductActions';
import FormatNumber from '@app/shared/utils/FormatNumber';
import { CDN } from '@app/shared/const';
import { Link } from 'react-router-dom';
import Radio from '../shared/layout/checkbox/Radio';
import ProductFilterItems from './components/list/FilterItems';
import queryParams from '@app/shared/utils/Query';

const uuidv4 = require('uuid/v4');

const Styles = require('./styles/ProductLists.scss')

interface IProductListsProps {
  actionGetProductsFiler: Function;
  productsFilterState: any;
  match?: any;
  history?: any;
  location?: any;
}
interface IProductListsStates {
  filter: {
    brand: any[];
    category: any[];
    price: any[];
  };
}

class ProductLists extends React.Component<IProductListsProps, IProductListsStates> {
  constructor(props) {
    super(props)
    this.state = {
      filter: {
        brand: [],
        category: [],
        price: [],
      },
    }
  }

  componentDidMount(): void {
    this.props.actionGetProductsFiler()
    console.log(queryString.parse(this.props.location.search))
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  isProduct = () => {
    if (this.props.productsFilterState
      && this.props.productsFilterState.items) {
      return this.props.productsFilterState.items
    }
    return []
  }

  onMakePrice = (price, discount) => {
    return Number(price - ((price * discount) / 100))
  }

  onMakeFilter = () => {
    let temp = {}
    const keys = Object.keys(this.state.filter)

    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < keys.length; i++) {
      if (this.state.filter[keys[i]].length !== 0) {
        temp = {
          ...temp,
          ...this.onMakeFilterBy(keys[i]),
        }
      }
    }

    return temp
  }

  onMakeFilterBy = (type: string) => {
    let temp = ''
    const vals = this.state.filter[type]

    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < vals.length; i++) {
      if (i === 0) {
        temp += vals[i].value;
      } else {
        temp = `${temp}.${vals[i].value}`
      }
    }

    return {
      [type]: temp,
    }
  }

  onFilterChange = (key: string, value: any) => {
    if (this.onCheckIsset(key, value)) {
      this.setState({
        filter: {
          ...this.state.filter,
          [key]: this.onRemoveItemIfIsset(key, value),
        },
      })
    } else {
      this.setState({
        filter: {
          ...this.state.filter,
          [key]: [...this.state.filter[key], value],
        },
      })
    }
  }

  onPriceChange = (value: any) => {
    this.setState({
      filter: {
        ...this.state.filter,
        price: [...[], value],
      },
    })
  }

  onCheckIsset = (key: string, value: any) => {
    const temp = this.state.filter[key].filter(e => e.value === value.value)

    return temp.length > 0
  }

  onRemoveItemIfIsset = (key: string, value: any) => {
    return this.state.filter[key].filter(e => e.value !== value.value)
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
                <Link to={`/page/product/${element.product_alias}`}>
                  <img className="img-fluid" src={`${CDN}${element.img_src}`} />
                </Link>
                <div className={Styles['product_list__item__discount']}>
                  {element.product_discount}% OFF
                </div>
              </div>
              <div className={Styles['product_list__item__brand']}>
                {element.brand_name}
              </div>
              <div className={Styles['product_list__item__name']}>
                <Link to={`/page/product/${element.product_alias}`}>
                  {element.product_name}
                </Link>
              </div>
              <div className={Styles['product_list__item__price']}>
                <span>{FormatNumber(element.product_price)}đ</span>
                <span>
                  {
                    FormatNumber(
                      this.onMakePrice(
                        element.product_price,
                        element.product_discount,
                      ),
                    )
                  }đ
                </span>
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
                      onChange={() => {
                        this.onFilterChange('brand', {
                          title: 'Apple',
                          value: 'apple',
                        })
                      }}
                      name="Apple"
                      value="apple" />
                  </li>
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={() => {
                        this.onFilterChange('brand', {
                          title: 'HTC',
                          value: 'htc',
                        })
                      }}
                      name="HTC"
                      value="htc" />
                  </li>
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={() => {
                        this.onFilterChange('brand', {
                          title: 'Nokia',
                          value: 'nokia',
                        })
                      }}
                      name="Nokia"
                      value="nokia" />
                  </li>
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={() => {
                        this.onFilterChange('brand', {
                          title: 'Samsung',
                          value: 'samsung',
                        })
                      }}
                      name="Samsung"
                      value="samsung" />
                  </li>
                </div>
              </div>
              <span
                onClick={() => {
                  this.props.history.push(
                    `${this.props.match.url}${queryParams(this.onMakeFilter())}`,
                  )
                }}
                className={Styles['product_lists__filter--btn']}>
                Áp dụng
              </span>
            </ul>
          </li>
          <li>
            <span>Danh mục</span>
            <ul className={Styles['product_lists__filter--sub']}>
              <div className="row">
                <div className="col-sm-4">
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={() => {
                        this.onFilterChange('category', {
                          title: 'Sữa',
                          value: 'sua',
                        })
                      }}
                      name="Sữa"
                      value="sua" />
                  </li>
                  <li>
                    <Checkbox
                      id={uuidv4()}
                      onChange={() => {
                        this.onFilterChange('category', {
                          title: 'Dưỡng ẩm',
                          value: 'duong-am',
                        })
                      }}
                      name="Dưỡng ẩm"
                      value="duong-am" />
                  </li>
                </div>
              </div>
              <span
                onClick={() => {
                  this.props.history.push(
                    `${this.props.match.url}${queryParams(this.onMakeFilter())}`,
                  )
                }}
                className={Styles['product_lists__filter--btn']}>
                Áp dụng
              </span>
            </ul>
          </li>
          <li>
            <span>Giá</span>
            <ul className={Styles['product_lists__filter--sub']}>
              <div className="row">
                <div className="col-sm-4">
                  <li>
                    <Radio
                      id={uuidv4()}
                      onChange={() => {
                        this.onPriceChange({
                          title: 'Dưới 500.000đ',
                          value: '500000',
                        })
                      }}
                      label="Dưới 500.000đ"
                      name="price"
                      value="500000" />
                  </li>
                  <li>
                    <Radio
                      label="Từ 500.000đ -> 1.000.000đ"
                      id={uuidv4()}
                      onChange={() => {
                        this.onPriceChange({
                          title: 'Từ 500.000đ -> 1.000.000đ',
                          value: '1000000',
                        })
                      }}
                      name="price"
                      value="1000000" />
                  </li>
                  <li>
                    <Radio
                      label="Trên 1.000.000đ"
                      id={uuidv4()}
                      onChange={() => {
                        this.onPriceChange({
                          title: 'Trên 1.000.000đ',
                          value: '1000001',
                        })
                      }}
                      name="price"
                      value="1000001" />
                  </li>
                </div>
              </div>
              <span
                onClick={() => {
                  this.props.history.push(
                    `${this.props.match.url}${queryParams(this.onMakeFilter())}`,
                  )
                }}
                className={Styles['product_lists__filter--btn']}>
                Áp dụng
              </span>
            </ul>
          </li>
        </ul>
        <ul className={Styles['product_lists__filter--choose-items']}>
          <ProductFilterItems
            items={this.state.filter.brand}
            config={{
              key: 'title',
              value: 'value',
            }}
            onRemove={e => console.log(e)}
          />
          <ProductFilterItems
            items={this.state.filter.price}
            config={{
              key: 'title',
              value: 'value',
            }}
            onRemove={e => console.log(e)}
          />
        </ul>
        <div className={`${Styles['product_lists__items']} row`}>
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
