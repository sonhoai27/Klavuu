import * as React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import Breadcrumb from '@app/shared/Breadcrumb';
import { actionGetProductsFiler } from '@app/stores/product/ProductActions';
import Pagination from '@app/shared/Pagination';
import LazyLoading from '../shared/layout/loading';
import { CDN } from '@app/shared/const';
import FormatNumber from '@app/shared/utils/FormatNumber';

const Styles = require('../products/styles/ProductLists.scss')

interface IClientSearchProps {
  t?: any;
  actionGetProductsFiler: Function;
  match?: any;
  productsFilterState: any;
}

class ClientSearch extends React.Component<IClientSearchProps> {
  constructor(props) {
    super(props)
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

  isProduct = () => {
    if (this.props.productsFilterState
      && this.props.productsFilterState.items) {
      return this.props.productsFilterState.items
    }
    return []
  }

  onMakeCurrentPage = () => {
    const page = (window.location.href).split('page=')[1]
    if (page !== undefined || page != null) {
      return page
    }

    return 1
  }

  onMakePrice = (price, discount) => {
    return Number(price - ((price * discount) / 100))
  }

  renderProducts = () => (
    this.isProduct().map((element) => {
      return (
        <div className="col-sm-3" key={Math.random()} style={{ marginBottom: 40 }}>
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

  render() {
    const { query } = this.props.match.params

    return (
      <div className="container">
        <Breadcrumb
          items={[
            {
              title: this.props.t('HOME_PAGE'),
              href: '/',
              active: false,
            },
          ]}
        />
        <h5 style={{ marginBottom: 32 }}>Có {Number(this.isMeta()['total'])} kết quả cho:
        {` ${query}`}</h5>
        <div className="row">
          {this.renderProducts()}
        </div>
        <Pagination
          currentPage={Number(this.onMakeCurrentPage())}
          pageLimit={Number(this.isMeta()['page_size'])}
          pageNeighbours={2}
          onPageChanged={(e) => {
            this.props.actionGetProductsFiler(`?page=${e.currentPage}&q=${query}`)
            window.scrollTo(0, 0)
            window.history.pushState(
              '', '', `${this.props.match.url}?page=${e.currentPage}`);
          }}
          totalRecords={Number(this.isMeta()['total'])}
        />
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

const TwithNamespaces = withNamespaces()(ClientSearch)

export default connect(mapStateToProps, mapDispatchToProps)(TwithNamespaces)
