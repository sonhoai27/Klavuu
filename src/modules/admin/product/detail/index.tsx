import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const uuidv4 = require('uuid/v4');
import CKEditor from 'ckeditor4-react';

import AdminHeader from '../../shared/layout/Header';
import Breadcrumb from '@app/modules/admin/shared/layout/Breadcrumb';
import Icon from '@app/modules/client/shared/layout/Icon';
import Tabs, { TabPanel } from '@app/shared/tabs/Tabs';
import Autocomplete from '../add/components/Autocomplete';
import ProductModel from '@app/shared/models/ProductModel';
import Moment from '@app/shared/utils/Moment';
import { actionGetTags, actionAddTag } from '@app/stores/tag/TagActions';
import { actionAddBrand, actionGetBrands } from '@app/stores/brand/BrandActions';
import {
  actionBrandTag,
  actionTagProduct,
  actionGetProduct,
  actionGetTagsProduct,
  actionDeleteTagProduct,
  actionUpdateProduct,
} from '@app/stores/product/ProductActions';
import {
  actionAddImage,
  actionGetImagesByProductId,
  actionDeleteImage,
} from '@app/stores/image/ImageActions';
import TagModel from '@app/shared/models/TagModel';
import BrandModel from '@app/shared/models/BrandModel';
import Alias from '@app/shared/utils/Alias';
import { configForProductIntro, configForProductInfo } from '@app/shared/CKEditorConfig';
import { actionShowHideAlert, actionShowHideLoading } from '@app/stores/init';
import UploadPhoto from './UploadImage';

const styles = require('../add/ProductAdd.scss')
const GlobalStyles = require('@app/shared/styles/Box.scss');

CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.10.1/full/ckeditor.js';

interface IAdminProductAddProps {
  match?: any;
  tagsState: { data: TagModel[] };
  brandsState: { data: BrandModel[] };
  actionGetTags: Function;
  actionAddTag: Function;
  actionAddBrand: Function;
  actionGetBrands: Function;
  actionUpdateProduct: Function;
  actionAddImage: Function;
  actionTagProduct: Function;
  actionBrandTag: Function;
  actionShowHideLoading: Function;
  actionShowHideAlert: Function;
  history?: any;
  actionGetProduct: Function;
  productState: any;
  actionGetImagesByProductId: Function;
  actionDeleteImage: Function;
  actionGetTagsProduct: Function;
  actionDeleteTagProduct: Function;
  tagsProductsState: any;
}

interface IAdminProductAddStates {
  products: ProductModel;

  images: {
    images: any[],
  };

  brand: object;

  tags: {
    tempTags: any[],
  };
}

class AdminProductDetail extends React.Component<IAdminProductAddProps, IAdminProductAddStates> {
  constructor(props) {
    super(props);
    this.state = {
      products: {
        product_id: '',
        product_name: '',
        product_brand_id: '',
        product_created_date: '',
        product_discount: 0,
        product_price: 0,
        product_ksu: '',
        product_more_info: '',
        product_volume_weight: '',
        product_inventory_number: 1,
        product_info: '',
        product_intro: '',
        product_how_to_use: '',
      },
      images: {
        images: [],
      },
      brand: {},
      tags: {
        tempTags: [],
      },
    }
  }

  componentDidMount() {
    this.props.actionGetTags()
    this.props.actionGetBrands()
    this.props.actionGetProduct(this.props.match.params.alias)
  }

  componentDidUpdate(preProps) {
    if (preProps.productState !== this.props.productState) {
      const { product } = this.props.productState
      this.props.actionGetTagsProduct(product.product_id)
      this.setState({
        images: this.props.productState.images,
        products: {
          product_id: product.product_id,
          product_alias: product.product_alias,
          product_brand_id: product.product_brand_id,
          product_created_date: product.product_created_date,
          product_name: product.product_name,
          product_intro: product.product_intro,
          product_discount: product.product_discount,
          product_how_to_use: product.product_how_to_use,
          product_info: product.product_info,
          product_inventory_number: product.product_inventory_number,
          product_ksu: product.product_ksu,
          product_more_info: product.product_more_info,
          product_price: product.product_price,
          product_volume_weight: product.product_volume_weight,
        },
        brand: {
          brand_id: product.product_brand_id,
          brand_name: product.brand_name,
        },
      })
    }
    if (preProps.tagsProductsState !== this.props.tagsProductsState) {
      this.onMakeTags()
    }
  }

  onMakeTags = () => {
    let tempTags = []
    if (this.props.tagsProductsState && this.props.tagsProductsState.length > 0) {
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 0; i < this.props.tagsProductsState.length; i++) {
        tempTags =  [...tempTags, this.props.tagsProductsState[i]]
      }
    }
    this.setState({
      tags: {
        tempTags,
      },
    })
  }

  onUploadImage = (e) => {
    const formData = new FormData();
    formData.append('images[]', e)
    this.props.actionAddImage(formData, this.state.products.product_id)
    .then(() => {
      return this.props.actionGetImagesByProductId(this.state.products.product_id)
    })
    .then((result) => {
      this.setState({
        images: result.value.data,
      })
    })
    .catch(err => console.log(err))
  }

  onDeleteImage = (e) => {
    this.props.actionDeleteImage(e)
    .then(() => {
      return this.props.actionGetImagesByProductId(this.state.products.product_id)
    })
    .then((result) => {
      this.setState({
        images: result.value.data,
      })
    })
    .catch(err => console.log(err))
  }

  onChange = (e) => {
    const { value, name } = e.target
    this.setState({
      products: {
        ...this.state.products,
        [name]: value,
      },
    })
  }

  onDeleteTagOfProduct = (tagId) => {
    this.props.actionDeleteTagProduct(tagId)
    .then(() => {
      this.props.actionGetTagsProduct(this.state.products.product_id)
    })
    .catch(err => console.log(err))
  }

  renderHeader = () => (
    <AdminHeader>
      <Breadcrumb
        className="am-bc-product-add"
        items={[
          {
            title: 'Quản lý sản phẩm',
            href: '/xxx/app/products',
            active: false,
          },
          {
            title: this.state.products.product_name,
            href: '',
            active: true,
          },
        ]}
      />
      <div className={GlobalStyles['wrap_action']}>
        <span style={{ background: '#999' }} >
          <Link to="/xxx/app/products">Hủy</Link>
        </span>
        <span onClick={() => {
          this.props.actionShowHideLoading(true)
          if (this.state.products.product_name !== '') {
            this.props.actionUpdateProduct({
              ...this.state.products,
              product_alias: Alias(this.state.products.product_name),
            }, this.state.products.product_id)
              .then(() => {
                this.showSuccessNotifyAfterAddingproduct()
                window.location.href = `/xxx/app/product/${Alias(this.state.products.product_name)}`
              })
              .catch(() => {
                this.showDangerNotifyAfterAddingproduct()
              })
          } else {
            this.showDangerNotifyAfterAddingproduct()
          }

        }}>Cập nhật</span>
      </div>
    </AdminHeader>
  );

  showSuccessNotifyAfterAddingproduct = () => {
    this.props.actionShowHideLoading(false)

    this.props.actionShowHideAlert({
      status: true,
      type: 'success',
      title: 'Thêm mới thành công',
    })

    setTimeout(() => {
      this.props.actionShowHideAlert({
        status: false,
      })
    }, 2500)
  }

  showDangerNotifyAfterAddingproduct = () => {
    this.props.actionShowHideLoading(false)

    this.props.actionShowHideAlert({
      status: true,
      type: 'danger',
      title: 'Thất bại, vui lòng xem lại',
    })

    setTimeout(() => {
      this.props.actionShowHideAlert({
        status: false,
      })
    }, 2500)
  }

  onAddTagsProduct = (tag) => {
    this.props.actionTagProduct([tag])
    .then(() => {
      this.props.actionGetTagsProduct(this.state.products.product_id)
    })
  }

  onChangeCKEditor = (e, name) => {
    this.setState({
      products: {
        ...this.state.products,
        [name]: e.editor.getData(),
      },
    })
  }

  render() {
    const { products } = this.state

    return (
      <>
        {this.renderHeader()}
        <div className="col-sm-8">
          <div className={GlobalStyles['wrap-content']}>
            <div className={GlobalStyles['title-product-main']}>
              Thông tin chung
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Tên sản phẩm(*)</label>
              <input
                defaultValue={products.product_name}
                type="text"
                name="product_name"
                onChange={this.onChange}/>
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Mô tả</label>
              <CKEditor
                config={{
                  ...configForProductIntro,
                }}
                onChange={e => this.onChangeCKEditor(e, 'product_intro')}
                data={this.state.products.product_intro}/>
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Hình ảnh</div>
            <UploadPhoto
              onDelete={this.onDeleteImage}
              images={this.state.images}
              onChange={this.onUploadImage}
            />
          </div>

          <div className={`${GlobalStyles['wrap-content']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Cấu hình</div>
            <div className="row">

              <div className="col-sm-6">
                <div className={GlobalStyles['form-item']}>
                  <label>Dung tích/khối lượng</label>
                  <input
                    defaultValue={products.product_volume_weight}
                    type="text"
                    name="product_volume_weight"
                    onChange={this.onChange}/>
                </div>
              </div>

              <div className="col-sm-6">
                <div className={GlobalStyles['form-item']}>
                  <label>Tồn kho</label>
                  <input
                    defaultValue={`${products.product_inventory_number}`}
                    type="number"
                    name="product_inventory_number"
                    onChange={this.onChange}/>
                </div>
              </div>
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content']} mg-t-16 pd-0`}>
            <Tabs selected={0}>
              <TabPanel title="Thông tin sản phẩm">
                <CKEditor
                  config={{
                    ...configForProductInfo,
                  }}
                  onChange={e => this.onChangeCKEditor(e, 'product_info')}
                  data={this.state.products.product_info}/>
              </TabPanel>
              <TabPanel title="Cách sử dụng">
                <CKEditor
                  config={{
                    ...configForProductInfo,
                  }}
                  onChange={e => this.onChangeCKEditor(e, 'product_how_to_use')}
                  data={this.state.products.product_how_to_use}/>
              </TabPanel>
              <TabPanel title="Thành phần">
                <CKEditor
                  config={{
                    ...configForProductInfo,
                  }}
                  onChange={e => this.onChangeCKEditor(e, 'product_more_info')}
                  data={this.state.products.product_more_info}/>
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div className="col-sm-4">
          <div className={GlobalStyles['wrap-content__right']}>
            <div className={GlobalStyles['title-product-main']}>
              Giá sản phẩm/KSU
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Giá hiển thị</label>
              <input
                value={`${products.product_price}`}
                type="number"
                name="product_price" onChange={this.onChange}/>
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Khuyến mãi</label>
              <input
                value={`${products.product_discount}`}
                type="number"
                name="product_discount"
                onChange={this.onChange}/>
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Mã KSU(*)</label>
              <input
                defaultValue={products.product_ksu}
                type="text"
                name="product_ksu"
                onChange={this.onChange}/>
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content__right']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Phân loại</div>

            <div className={GlobalStyles['form-item']}>
              <label>Hãng(*)</label>

              {
                this.state.brand['brand_name']
                && (
                  <div className={styles['am-product-add__list-tags']}>
                    <ul>
                      <li>
                        <span style={{ margin: 0 }}>{this.state.brand['brand_name']}</span>
                      </li>
                    </ul>
                  </div>
                )
              }

              <Autocomplete
                onChange={(e) => {
                  this.setState({
                    brand: e,
                  }, () => {
                    this.setState({
                      products: {
                        ...this.state.products,
                        product_brand_id: this.state.brand['brand_id'],
                      },
                    })
                  })
                }}
                onCreate={(e) => {
                  this.props.actionAddBrand({
                    brand_id: uuidv4((new Date()).getMilliseconds()),
                    brand_alias: Alias(e),
                    brand_created_date: Moment(),
                    brand_name: e,
                  })
                  .then(() => this.props.actionGetBrands())
                }}
                items={this.props.brandsState.data}
                config={{
                  text: 'brand_name',
                  value: 'brand_id',
                }}
                placeholder="Tìm hoặc tạo mới hãng mới"
              />
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content__right']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Thẻ tag(*)</div>

            <div className={styles['am-product-add__list-tags']}>
              <ul>
                {
                  this.state.tags.tempTags.length > 0
                  && this.state.tags.tempTags.map((element) => {
                    return (
                      <li
                      onClick={() => this.onDeleteTagOfProduct(element.tp_id)}
                      key={uuidv4()}>
                        <span>{element.tag_name}</span>
                        <span>
                        <Icon name="trash"/>
                        </span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Thêm các tag đã có</label>
              <Autocomplete
                onChange={(e) => {
                  this.setState({
                    tags: {
                      tempTags: [...this.state.tags.tempTags, e],
                    },
                  }, () => {
                    this.onAddTagsProduct({
                      tp_product_id: this.state.products.product_id,
                      tp_tag_id: e.tag_id,
                    })
                    this.props.actionBrandTag([
                      {
                        bt_brand_id: this.state.products.product_brand_id,
                        bt_tag_id: e.tag_id,
                      },
                    ])
                  })
                }}
                onCreate={(e) => {
                  this.props.actionAddTag({
                    tag_id: uuidv4((new Date()).getMilliseconds()),
                    tag_alias: Alias(e),
                    tag_created_date: Moment(),
                    tag_path: `/${Alias(e)}`,
                    tag_name: e,
                  })
                  .then(() => {
                    this.props.actionGetTags()
                  })
                }}
                isMultiChooses={true}
                items={this.props.tagsState.data}
                config={{
                  text: 'tag_name',
                  value: 'tag_id',
                }}
                placeholder="Tìm hoặc tạo mới tag"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

// tslint:disable-next-line:no-unused
const mapStateToProps = storeState => ({
  tagsState: storeState.tagReducer.tagsState,
  brandsState: storeState.brandReducer.brandsState,
  productState: storeState.productReducer.productState,
  tagsProductsState: storeState.productReducer.tagsProductsState,
});

const mapDispatchToProps = {
  actionGetTags,
  actionAddTag,
  actionAddBrand,
  actionGetBrands,
  actionUpdateProduct,
  actionAddImage,
  actionTagProduct,
  actionBrandTag,
  actionShowHideLoading,
  actionShowHideAlert,
  actionGetProduct,
  actionGetImagesByProductId,
  actionDeleteImage,
  actionGetTagsProduct,
  actionDeleteTagProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminProductDetail);
