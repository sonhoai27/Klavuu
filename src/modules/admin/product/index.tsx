import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Divider, Tag, Badge } from 'antd';

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '@app/modules/admin/shared/layout/Breadcrumb';
import { actionGetProducts, actionDeleteProduct } from '@app/stores/product/ProductActions';
import Icon from '@app/modules/client/shared/layout/Icon';
import FormatNumber from '@app/shared/utils/FormatNumber';
import { ADMIN_URL, CDN } from '@app/shared/const';
import { actionShowHidePopup, actionShowHideAlert } from '@app/stores/init';
import queryParams, { getParameterByName } from '@app/shared/utils/Query';
import { actionGetBrands } from '@app/stores/brand/BrandActions';

const GlobalStyles = require('@app/shared/styles/Box.scss');
import './styles.css'

interface IProductsProps {
  actionGetProducts: Function;
  productsState: any;
  actionShowHidePopup: Function;
  actionDeleteProduct: Function;
  actionShowHideAlert: Function;
  match?: any;
  location?: any;
  actionGetBrands: Function;
  brandsState: any;
}

interface IProductsStates {
  meta: any;
  loading: boolean;
  brand: string;
  brandName: string;
  filterDropdownVisible: boolean;
}

class Products extends React.Component<IProductsProps, IProductsStates> {
  constructor(props) {
    super(props)

    this.state = {
      meta: {
        page: 1,
        total: 0,
        limit: 15,
      },
      brand: '',
      loading: true,
      filterDropdownVisible: false,
      brandName: '',
    }
  }

  componentDidMount() {
    const page = getParameterByName('page', this.props.location.history)
    const brand = getParameterByName('brand', this.props.location.history)

    this.setState({
      brand: brand ? brand : '',
      meta: {
        ...this.state.meta,
        page: page ? page : 1,
      },
      brandName: (brand || '').replace('-', ' '),
    }, () => {
      this.props.actionGetBrands()
      this.onGetProducts()
    })
  }

  columns = () => [
    {
      title: 'Name',
      dataIndex: 'product_name',
      width: '30%',
      render: (text: any, row: any) => <a href={`${ADMIN_URL}product/${row.product_alias}`}>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'product_price',
      render: (text: any) => <span>{FormatNumber(text)}đ</span>,
    },
    {
      title: () => (
        <div className="title-table-filter">
          <span>Brand</span>
          {
            this.state.brandName
            && (
              <span style={{
                display: 'flex',
                alignItems: 'center',
              }}>
               <Badge
                count={this.state.brandName || ''}
                style={{ backgroundColor: '#52c41a', marginRight: 8 }} />
               <Icon
                onClick={() => {
                  this.setState({
                    brand: '',
                    brandName: '',
                    meta: {
                      ...this.state.meta,
                      page: 1,
                    },
                    loading: true,
                  }, () => {
                    window.scrollTo(0, 0)
                    this.onGetProducts()
                  })
                }}
                className="close-filter" name="cross"/>
              </span>
            )
          }
        </div>
      ),
      onFilterDropdownVisibleChange: () => {
        this.setState({
          filterDropdownVisible: true,
        })
      },
      filterDropdownVisible: this.state.filterDropdownVisible,
      dataIndex: 'product_alias',
      filterDropdown: () => {
        const {
          brandsState,
        } = this.props;
        const brands = brandsState.data || []

        return (
          <ul className="product-table-filter">
            {
              brands.map((brand: any) => (
                <li
                  onClick={() => this.onClickBrand(brand)}
                  key={brand.brand_id}>
                  {brand.brand_name}
                </li>
              ))
            }
          </ul>
        )
      },
      render: (_: any, row: any) => (
        <Tag color="blue" key={row.brand.brand_name || ''}>
          {row.brand.brand_name || ''}
        </Tag>
      ),
    },
    {
      title: 'Action',
      render: (_: any, row: any) => (
        <span>
          <a href={`https://22.zonesgroup.vn/products/${row.product_alias}`} target="_blank">
            <Icon name="store" />
          </a>
          <Divider type="vertical" />
          <Icon name="trash" />
        </span>
      ),
    },
  ];

  onClickBrand = (brand: any) => {
    this.setState({
      brand: brand.brand_alias,
      brandName: brand.brand_name,
      loading: true,
      meta: {
        ...this.state.meta,
        page: 1,
      },
      filterDropdownVisible: false,
    }, () => this.onGetProducts())
  }

  onGetProducts = () => {
    const {
      meta,
      brand,
    } = this.state;

    window.scrollTo(0, 0)

    this.props.actionGetProducts(queryParams({
      brand,
      page: meta.page,
    }))
    .then((result: any) => {
      if (result.value && result.value.data && result.value.data.meta) {
        this.setState({
          meta: result.value.data.meta,
          loading: false,
        }, () => {
          const {
            meta,
            brand,
          } = this.state;
          // tslint:disable-next-line: max-line-length
          window.history.pushState('', '', `/backend${this.props.match.url}${queryParams({
            brand,
            page: meta.page,
          })}`);
        })
      }
    })
  }

  onMakeCurrentPage = () => {
    const page = (window.location.href).split('page=')[1]
    if (page !== undefined || page != null) {
      return page
    }

    return 1
  }

  onDelete = (id) => {
    this.props.actionShowHidePopup({
      status: true,
      onClose: () => this.props.actionShowHidePopup({ status: false }),
      poBtn: {
        title: 'OK',
        func: () => {
          this.props.actionShowHidePopup({ status: false })
          this.props.actionDeleteProduct(id)
            .then(() => {
              this.props.actionGetProducts(`?page=${this.onMakeCurrentPage()}`)
                .then(() => {
                  this.props.actionShowHideAlert({
                    type: 'success',
                    title: 'Xóa thành công hãng!',
                    status: true,
                  })
                  setTimeout(() => {
                    this.props.actionShowHideAlert({
                      status: false,
                    })
                  }, 1500)
                })
            })
            .catch(() => {
              this.props.actionShowHideAlert({
                type: 'warning',
                title: 'Có lỗi khi xóa!',
                status: true,
              })
              setTimeout(() => {
                this.props.actionShowHideAlert({
                  status: false,
                })
              }, 1500)
            })
        },
      },
      neBtn: {
        title: 'Cancel',
        func: () => {
          this.props.actionShowHidePopup({ status: false })
        },
      },
      title: 'Warning',
      message: 'If you click OK, This product will be delete.',
      icon: <Icon name="smile" />,
    })
  }

  render() {
    return (
      <>
        <AdminHeader>
          <Breadcrumb
            className="am-bc-product-add"
            items={[
              {
                title: 'Trang chủ',
                href: '/',
                active: false,
              },
              {
                title: 'Quản lý sản phẩm',
                href: '/products',
                active: true,
              },
            ]}
          />
          <div className={GlobalStyles['wrap_action']}>
            <span>
              <a href={`${ADMIN_URL}product/add`}>Thêm mới</a>
            </span>
          </div>
        </AdminHeader>
        <div className="w-full">
          <div className={GlobalStyles['wrap-content']}>
            <div className="table-responsive">
              <Table
                loading={this.state.loading}
                pagination={{
                  total: this.state.meta.total,
                  current: this.state.meta.page,
                  pageSize: 15,
                  onChange: (page: any) => {
                    this.setState({
                      meta: {
                        ...this.state.meta,
                        page,
                      },
                      loading: true,
                    }, () => this.onGetProducts())
                  },
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50', '100', '150', '200'],
                  onShowSizeChange: (_, limit) => this.setState({
                    meta: {
                      ...this.state.meta,
                      limit,
                      page: 1,
                    },
                    loading: true,
                  }, () => {
                    this.onGetProducts()
                  }),
                }}
                rowKey={record => record.product_id}
                columns={this.columns()}
                dataSource={this.props.productsState.items} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  productsState: storeState.productReducer.productsState,
  brandsState: storeState.brandReducer.brandsState,
})

const mapDispatchToProps = {
  actionGetProducts,
  actionShowHidePopup,
  actionDeleteProduct,
  actionShowHideAlert,
  actionGetBrands,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
