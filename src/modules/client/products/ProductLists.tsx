import * as React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import { withNamespaces } from 'react-i18next';

import Breadcrumb from '@app/shared/Breadcrumb';
import Checkbox from '../shared/layout/checkbox';
import { actionGetProductsFiler } from '@app/stores/product/ProductActions';
import FormatNumber from '@app/shared/utils/FormatNumber';
import { CDN } from '@app/shared/const';
import { Link } from 'react-router-dom';
import Radio from '../shared/layout/checkbox/Radio';
import ProductFilterItems from './components/list/FilterItems';
import queryParams from '@app/shared/utils/Query';
import { actionGetBrandTags } from '@app/stores/brand/BrandActions';
import { actionGetTagBrands } from '@app/stores/tag/TagActions';
import LazyLoading from '../shared/layout/loading';
import Pagination from '@app/shared/Pagination';

const uuidv4 = require('uuid/v4');

const Styles = require('./styles/ProductLists.scss')

interface IProductListsProps {
  actionGetProductsFiler: Function;
  actionGetBrandTags: Function;
  actionGetTagBrands: Function;
  productsFilterState: any;
  brandTagsState: any;
  tagBrandsState: any;
  match?: any;
  history?: any;
  location?: any;
  t?: any;
}
interface IProductListsStates {
  filter: {
    brand: any[];
    tag: any[];
    price: any[];
    page: any[],
  };
}

class ProductLists extends React.Component<IProductListsProps, IProductListsStates> {
  constructor(props) {
    super(props)
    this.state = {
      filter: {
        brand: [],
        tag: [],
        price: [],
        page: [],
      },
    }
  }

  componentDidMount(): void {
    this.onGetTagOrBrand()
    this.onGetProducts()
  }

  componentDidUpdate(preProps) {
    if (this.props.location !== preProps.location) {
      this.onGetProducts()
      this.onGetTagOrBrand()
    }
  }

  onGetTagOrBrand = () => {
    if (this.onCheckBrandOrTag() === 'b') {
      this.props.actionGetBrandTags(this.props.match.params.alias)
      .catch(() => {
        this.props.actionGetBrandTags(this.props.match.params.alias)
      })
    } else if (this.onCheckBrandOrTag() === 't') {
      this.props.actionGetTagBrands(this.props.match.params.alias)
      .catch(() => {
        this.props.actionGetTagBrands(this.props.match.params.alias)
      })
    } else {
      this.props.actionGetBrandTags(this.props.match.params.alias)
      .catch(() => {
        this.props.actionGetBrandTags(this.props.match.params.alias)
      })

      this.props.actionGetTagBrands(this.props.match.params.alias)
      .catch(() => {
        this.props.actionGetTagBrands(this.props.match.params.alias)
      })
    }
  }

  onGetProducts = () => {
    const { alias } = this.props.match.params
    const { search } = this.props.location
    console.log(search)
    const isNullSearch = search.length > 0 ? `&${search.substring(1)}` : ''

    if (this.onCheckBrandOrTag() === 'b') {
      this.props.actionGetProductsFiler(`?brand=${alias}${isNullSearch}`)
      .catch(() => {
        this.props.actionGetProductsFiler(`?brand=${alias}${isNullSearch}`)
      })
    } else if (this.onCheckBrandOrTag() === 't') {
      this.props.actionGetProductsFiler(`?tag=${alias}${isNullSearch}`)
      .catch(() => {
        this.props.actionGetProductsFiler(`?tag=${alias}${isNullSearch}`)
      })
    } else {
      this.props.actionGetProductsFiler(search)
      .catch(() => {
        this.props.actionGetProductsFiler(search)
      })
    }
  }

  onCheckBrandOrTag = () => {
    return this.props.match.params.type
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
          page: [],
        },
      }, () => {
        this.props.history.push(
          `${this.props.match.url}${queryParams(this.onMakeFilter())}`,
        )
      })
    } else {
      this.setState({
        filter: {
          ...this.state.filter,
          [key]: [...this.state.filter[key], value],
          page: [],
        },
      }, () => {
        this.props.history.push(
          `${this.props.match.url}${queryParams(this.onMakeFilter())}`,
        )
      })
    }
  }

  onPriceChange = (value: any) => {
    this.setState({
      filter: {
        ...this.state.filter,
        price: [...[], value],
        page: [],
      },
    }, () => {
      this.props.history.push(
        `${this.props.match.url}${queryParams(this.onMakeFilter())}`,
      )
    })
  }

  onCheckIsset = (key: string, value: any) => {
    const temp = this.state.filter[key].filter(e => e.value === value.value)

    return temp.length > 0
  }

  onRemoveItemIfIsset = (key: string, value: any) => {
    return this.state.filter[key].filter(e => e.value !== value.value)
  }

  onRemoveFilterItemWhenClickX = (key: string, value: string) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [key]: this.onRemoveItemIfIsset(key, value),
      },
    }, () => {
      this.props.history.push(
        `${this.props.match.url}${queryParams(this.onMakeFilter())}`,
      )
    })
  }

  isMeta = () => {
    if (this.props.productsFilterState
      && this.props.productsFilterState.meta) {
      return this.props.productsFilterState.meta
    }

    return {
      total: 0,
      page_size: 0,
    }
  }

  renderProducts = () => (
    this.isProduct().map((element) => {
      return (
        <div className="col-sm-3" key={uuidv4()} >
          <LazyLoad
            height={'100vh'}
            once
            placeholder={<LazyLoading/>}
            throttle={1000}>
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
                {
                  Number(element.product_discount) !== 0
                  && <span className={Styles['price']}>
                      ${FormatNumber(element.product_price)}đ
                    </span>
                }
                <span className={Styles['discount']}>
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

  renderTagFilter = () => (
    (this.onCheckBrandOrTag() === 't' || this.onCheckBrandOrTag() === undefined)
    && (
      <li>
        <span>{this.props.t('MENU_BRANDS')}</span>
        <ul className={Styles['product_lists__filter--sub']}>
          <div className="row">
            {this.renderListBrandTagsOrTagBrands(
              'tagBrandsState', 'brand', 'brand_alias', 'brand_name',
            )}
          </div>
        </ul>
      </li>
    )
  )

  renderBrandFilter = () => (
    (this.onCheckBrandOrTag() === 'b' || this.onCheckBrandOrTag() === undefined)
    && (
      <li>
        <span>{this.props.t('MENU_SHOP_BY')}</span>
        <ul className={Styles['product_lists__filter--sub']}>
          <div className="row">
            {this.renderListBrandTagsOrTagBrands(
              'brandTagsState', 'tag', 'tag_alias', 'tag_name',
            )}
          </div>
        </ul>
      </li>
    )
  )

  renderListBrandTagsOrTagBrands = (
      propsName: string,
      type: string,
      aliasOfType: string,
      nameOfType: string,
    ) => {
    let tempParentDom = []
    let tempChildrenDom = []

    if (this.props[propsName] && this.props[propsName].length > 0) {
      this.props[propsName].map((element, index) => {
        if ((index + 1) % 5 === 0) {
          tempChildrenDom = [...tempChildrenDom, (
            <li key={uuidv4()}>
              <Checkbox
                id={uuidv4()}
                onChange={() => {
                  this.onFilterChange(type, {
                    title: element[nameOfType],
                    value: element[aliasOfType],
                  })
                }}
                checked={
                  this.state.filter[type].map(e => e.value).indexOf(element[aliasOfType]) !== -1
                }
                name={element[nameOfType]}
                value={element[aliasOfType]} />
            </li>
          )]
          tempParentDom = [...tempParentDom, React.createElement('div', {
            className: 'col-sm-2',
            key: uuidv4(),
          }, tempChildrenDom)]
          tempChildrenDom = []
        } else {
          tempChildrenDom = [...tempChildrenDom, (
            <li key={uuidv4()}>
              <Checkbox
                id={uuidv4()}
                onChange={() => {
                  this.onFilterChange(type, {
                    title: element[nameOfType],
                    value: element[aliasOfType],
                  })
                }}
                checked={
                  this.state.filter[type].map(e => e.value).indexOf(element[aliasOfType]) !== -1
                }
                name={element[nameOfType]}
                value={element[aliasOfType]} />
            </li>
          )]
        }
      })
      tempParentDom = [...tempParentDom, React.createElement('div', {
        className: 'col-sm-2',
        key: uuidv4(),
      }, tempChildrenDom)]

      return tempParentDom
    }

    return []
  }

  renderLazyLoading = () => (
    <>
      <div className="col-sm-3">
        <LazyLoading/>
      </div>
      <div className="col-sm-3">
        <LazyLoading/>
      </div>
      <div className="col-sm-3">
        <LazyLoading/>
      </div>
      <div className="col-sm-3">
        <LazyLoading/>
      </div>
    </>
  )

  render() {
    return (
      <div className={`${Styles['product_lists']} container`}>
        <Breadcrumb
          items={[
            {
              title: this.props.t('HOME_PAGE'),
              href: '/',
              active: false,
            },
            {
              title: this.props.t('PRODUCTS'),
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
          {this.renderBrandFilter()}
          {this.renderTagFilter()}
          <li>
            <span>{this.props.t('PRICE')}</span>
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
                      checked={
                        this.state.filter['price'].map(e => e.value).indexOf('500000') !== -1
                      }
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
                      checked={
                        this.state.filter['price'].map(e => e.value).indexOf('1000000') !== -1
                      }
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
                      checked={
                        this.state.filter['price'].map(e => e.value).indexOf('1000001') !== -1
                      }
                      name="price"
                      value="1000001" />
                  </li>
                </div>
              </div>
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
            onRemove={e => this.onRemoveFilterItemWhenClickX('brand', e)}
          />
          <ProductFilterItems
            items={this.state.filter.tag}
            config={{
              key: 'title',
              value: 'value',
            }}
            onRemove={e =>  this.onRemoveFilterItemWhenClickX('tag', e)}
          />
          <ProductFilterItems
            items={this.state.filter.price}
            config={{
              key: 'title',
              value: 'value',
            }}
            onRemove={e =>  this.onRemoveFilterItemWhenClickX('price', e)}
          />
        </ul>
        <div className={`${Styles['product_lists__items']} row`}>
          {
            this.props.productsFilterState
            && this.props.productsFilterState.items
            ? this.renderProducts()
            : this.renderLazyLoading()
          }
        </div>

        <Pagination
          currentPage={Number(this.state.filter.page)}
          pageLimit={Number(this.isMeta()['page_size'])}
          pageNeighbours={2}
          onPageChanged={(e) => {
            this.setState({
              filter: {
                ...this.state.filter,
                page: [...[], {
                  title: e.currentPage,
                  value: e.currentPage,
                }],
              },
            }, () => {
              console.log(this.state.filter)
              this.props.history.push(
                `${this.props.match.url}${queryParams(this.onMakeFilter())}`,
              )
            })
            window.scrollTo(0, 0)
          }}
          totalRecords={Number(this.isMeta()['total'])}
        />
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  productsFilterState: storeState.productReducer.productsFilterState,
  brandTagsState: storeState.brandReducer.brandTagsState,
  tagBrandsState: storeState.tagReducer.tagBrandsState,
})

const mapDispatchToProps = {
  actionGetProductsFiler,
  actionGetBrandTags,
  actionGetTagBrands,
}

const TwithNamespaces = withNamespaces()(ProductLists)

export default connect(mapStateToProps, mapDispatchToProps)(TwithNamespaces)
