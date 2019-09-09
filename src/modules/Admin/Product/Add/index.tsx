import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const uuidv4 = require('uuid/v4');
import CKEditor from 'ckeditor4-react';

import AdminHeader from '../../Shared/Layout/Header';
import Breadcrumb from '@app/modules/Admin/Shared/Layout/Breadcrumb';
import Icon from '@app/Shared/Icon';
import Tabs, { TabPanel } from '@app/Shared/Tabs/Tabs';
import Autocomplete from './Components/Autocomplete';
import ProductModel from '@app/Shared/Models/ProductModel';
import Moment from '@app/Shared/Utils/Moment';
import { actionGetTags, actionAddTag } from '@app/Stores/Tag/TagActions';
import { actionAddBrand, actionGetBrands } from '@app/Stores/Brand/BrandActions';
import {
  actionAddProduct,
  actionBrandTag,
  actionTagProduct,
} from '@app/Stores/Product/ProductActions';
import { actionAddImage } from '@app/Stores/Image/ImageActions';
import TagModel from '@app/Shared/Models/TagModel';
import BrandModel from '@app/Shared/Models/BrandModel';
import Alias from '@app/Shared/Utils/Alias';
import UploadPhoto from './Components/UploadImage';
import { configForProductIntro, configForProductInfo } from '@app/Shared/CKEditorConfig';
import { actionShowHideAlert, actionShowHideLoading } from '@app/Stores/init';

const styles = require('./ProductAdd.scss')
const GlobalStyles = require('@app/Shared/Styles/Box.scss');

CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.10.1/full/ckeditor.js';

interface IAdminProductAddProps {
  match?: any;
  tagsState: { data: TagModel[] };
  brandsState: { data: BrandModel[] };
  actionGetTags: Function;
  actionAddTag: Function;
  actionAddBrand: Function;
  actionGetBrands: Function;
  actionAddProduct: Function;
  actionAddImage: Function;
  actionTagProduct: Function;
  actionBrandTag: Function;
  actionShowHideLoading: Function;
  actionShowHideAlert: Function;
  history?: any;
}

interface IAdminProductAddStates {
  products: ProductModel;

  images: {
    images: any[],
    temp: {
      img_id: string;
      img_temp_src: string;
    }[],
  };
  brand: object;
  tags: {
    items: any[],
    tempTags: TagModel[],
  };
}

class AdminProductAdd extends React.Component<IAdminProductAddProps, IAdminProductAddStates> {
  constructor(props) {
    super(props);
    this.state = {
      products: {
        product_id: uuidv4((new Date()).getMilliseconds()),
        product_name: '',
        product_brand_id: '',
        product_created_date: Moment(),
        product_discount: 0,
        product_price: 0,
        product_ksu: 'NULL',
        product_more_info: '',
        product_volume_weight: '',
        product_inventory_number: 1,
        product_info: '',
        product_intro: '',
        product_how_to_use: '',
      },
      images: {
        images: [],
        temp: [],
      },
      brand: {},
      tags: {
        items: [],
        tempTags: [],
      },
    }
  }

  componentDidMount() {
    this.props.actionGetTags()
    this.props.actionGetBrands()
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

  renderHeader = () => (
    <AdminHeader>
      <Breadcrumb
        className="am-bc-product-add"
        items={[
          {
            title: 'Quản lý sản phẩm',
            href: '/products',
            active: false,
          },
          {
            title: 'Tạo sản phẩm',
            href: '/products/add',
            active: true,
          },
        ]}
      />
      <div className={GlobalStyles['wrap_action']}>
        <span>
          <Link to="/products">Hủy</Link>
        </span>
        <span onClick={() => {
          this.props.actionShowHideLoading(true)
          if (this.state.products.product_brand_id !== ''
              && this.state.products.product_name !== ''
              && this.state.products.product_ksu !== ''
              && this.state.tags.items.length > 0) {
            this.props.actionAddProduct({
              ...this.state.products,
              product_alias: Alias(this.state.products.product_name),
            })
              .then(() => {
                return this.onAddImageTagAndBrandTag()
              })
              .then(() => {
                this.showSuccessNotifyAfterAddingproduct()
              })
              .catch(() => {
                this.showDangerNotifyAfterAddingproduct()
              })
          } else {
            this.showDangerNotifyAfterAddingproduct()
          }

        }}>Thêm</span>
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

      this.props.history.push('/products')
    }, 2500)
  }

  showDangerNotifyAfterAddingproduct = () => {
    this.props.actionShowHideLoading(false)

    this.props.actionShowHideAlert({
      status: true,
      type: 'danger',
      title: 'Thất bại, vui lòng xem lại các trường bắt buộc',
    })

    setTimeout(() => {
      this.props.actionShowHideAlert({
        status: false,
      })
    }, 2500)
  }

  onAddImageTagAndBrandTag = () => {
    const lenOfImg = this.state.images.images.length;
    const lenOfTag = this.state.tags.items.length;

    if (lenOfImg > 0 && lenOfTag > 0) {

      return this.onAddImagesToProduct()
        .then(() => {
          return this.onAddBrandTag()
        })
        .then(() => {
          return this.onAddTagsProduct()
        })
    // tslint:disable-next-line:no-else-after-return
    } else if (lenOfImg > 0 && lenOfTag <= 0) {

      return this.onAddImagesToProduct()
        .then(() => {
          return this.onAddBrandTag()
        })
    } else if (lenOfImg <= 0 && lenOfTag > 0) {

      return this.onAddBrandTag()
        .then(() => {
          return this.onAddTagsProduct()
        })
    }

    return this.onAddBrandTag()
  }

  onAddImagesToProduct = () => {
    const data = new FormData();
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < this.state.images.images.length; i++) {
      data.append('images[]', this.state.images.images[i]);
    }

    return this.props.actionAddImage(data, this.state.products.product_id)
  }

  onAddTagsProduct = () => {
    return this.props.actionTagProduct(this.state.tags.items)
  }

  onAddBrandTag = () => {
    let tempBrandTag = []

    if (this.state.products.product_brand_id !== '') {
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 0; i < this.state.tags.items.length; i++) {
        tempBrandTag = [...tempBrandTag, {
          bt_brand_id: this.state.products.product_brand_id,
          bt_tag_id: this.state.tags.items[i].tp_tag_id,
        }]
      }
    }
    return (
      this.props.actionBrandTag(tempBrandTag)
    )
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
              <input type="text" name="product_name" onChange={this.onChange}/>
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
              onChange={(e) => {
                this.setState({
                  images: e,
                })
              }}
            />
          </div>

          <div className={`${GlobalStyles['wrap-content']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Cấu hình</div>
            <div className="row">

              <div className="col-sm-6">
                <div className={GlobalStyles['form-item']}>
                  <label>Dung tích/khối lượng</label>
                  <input type="text" name="product_volume_weight" onChange={this.onChange}/>
                </div>
              </div>

              <div className="col-sm-6">
                <div className={GlobalStyles['form-item']}>
                  <label>Tồn kho</label>
                  <input type="number" name="product_inventory_number" onChange={this.onChange}/>
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
              Giá sản phẩm/SKU
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Giá hiển thị</label>
              <input type="number" name="product_price" onChange={this.onChange}/>
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Khuyến mãi</label>
              <input type="number" name="product_discount" onChange={this.onChange}/>
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Mã KSU(*)</label>
              <input type="text" name="product_ksu" onChange={this.onChange}/>
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
                        <span>{this.state.brand['brand_name']}</span>
                        <span>
                    <Icon name="trash"/>
                  </span>
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
                      <li key={uuidv4()}>
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
                      items: [...this.state.tags.items, {
                        tp_product_id: this.state.products.product_id,
                        tp_tag_id: e.tag_id,
                      }],
                      tempTags: [...this.state.tags.tempTags, e],
                    },
                  })
                }}
                onCreate={(e) => {
                  this.props.actionAddTag({
                    tag_alias: Alias(e),
                    tag_path: `/${Alias(e)}`,
                    tag_created_date: Moment(),
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
});

const mapDispatchToProps = {
  actionGetTags,
  actionAddTag,
  actionAddBrand,
  actionGetBrands,
  actionAddProduct,
  actionAddImage,
  actionTagProduct,
  actionBrandTag,
  actionShowHideLoading,
  actionShowHideAlert,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminProductAdd);
