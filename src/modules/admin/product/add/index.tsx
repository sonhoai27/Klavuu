import * as React from 'react';
import { connect } from 'react-redux';
const uuidv4 = require('uuid/v4');
import CKEditor from 'ckeditor4-react';

import AdminHeader from '../../shared/layout/Header';
import Breadcrumb from '@app/modules/admin/shared/layout/Breadcrumb';
import Icon from '@app/modules/client/shared/layout/Icon';
import Tabs, { TabPanel } from '@app/shared/tabs/Tabs';
import Autocomplete from './components/Autocomplete';
import ProductModel from '@app/shared/models/ProductModel';
import ImageModel from '@app/shared/models/ImageModel';
import Moment from '@app/shared/utils/Moment';
import { actionGetTags, actionAddTag } from '@app/stores/tag/TagActions';
import { actionAddBrand, actionGetBrands } from '@app/stores/brand/BrandActions';
import { actionGetCats } from '@app/stores/cat/CatActions';
import { actionAddProduct } from '@app/stores/product/ProductActions';
import { actionAddImage } from '@app/stores/image/ImageActions';
import TagModel from '@app/shared/models/TagModel';
import CategoryModel from '@app/shared/models/CategoryModel';
import BrandModel from '@app/shared/models/BrandModel';
import Alias from '@app/shared/utils/Alias';
import UploadPhoto from './components/UploadImage';
import { configForProductIntro, configForProductInfo } from '@app/shared/CKEditorConfig';

const styles = require('./ProductAdd.scss')
const GlobalStyles = require('@app/shared/styles/Box.scss');

CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.10.1/full/ckeditor.js';

interface IAdminProductAddProps {
  match?: any;
  tagsState: { data: TagModel[] };
  catsState: { data: CategoryModel[] };
  brandsState: { data: BrandModel[] };
  actionGetTags: () => void;
  actionAddTag: (tag: TagModel) => void;
  actionAddBrand: (brand: BrandModel) => void;
  actionGetBrands: () => void;
  actionGetCats: () => void;
  actionAddProduct: (product: ProductModel) => void;
  actionAddImage: (image: ImageModel[], productId) => void;
}

interface IAdminProductAddStates {
  products: ProductModel;
  images: any[];
  brand: object;
  tags: TagModel[];
}

class AdminProductAdd extends React.Component<IAdminProductAddProps, IAdminProductAddStates> {
  constructor(props) {
    super(props);
    this.state = {
      products: {
        product_id: uuidv4((new Date()).getMilliseconds()),
        product_name: '',
        product_brand_id: '',
        product_cat_id: 0,
        product_created_date: Moment(),
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
      images: [],
      brand: {},
      tags: [],
    }
  }

  componentDidUpdate(): void {
    console.log(this.state)
  }

  componentDidMount() {
    this.props.actionGetCats()
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
            href: '/xxx/app/products',
            active: false,
          },
          {
            title: 'Tạo sản phẩm',
            href: '/xxx/app/products/add',
            active: true,
          },
        ]}
      />
    </AdminHeader>
  );

  renderCategories = () => (
    this.props.catsState.data
    && this.props.catsState.data.length > 0
    && this.props.catsState.data.map((element) => {
      return (
        <option value={element.cat_id} key={uuidv4()}>{element.cat_name}</option>
      )
    })
  )

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
              <label>Tên sản phẩm</label>
              <input type="text" name="product_name" onChange={this.onChange}/>
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Mô tả</label>
              <CKEditor
                config={{
                  ...configForProductIntro,
                }}
                onChange={(e) => {
                  this.setState({
                    products: {
                      ...this.state.products,
                      product_intro: e.editor.getData(),
                    },
                  }, () => {
                    console.log(this.state)
                  })
                }}
                data={this.state.products.product_intro} />
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Hình ảnh</div>
            <UploadPhoto
              onChange={(e) => {
                console.log(e)
              }}
            />
          </div>

          <div className={`${GlobalStyles['wrap-content']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Cấu hình</div>
            <div className="row">
              <div className="col-sm-6">
                <div className={GlobalStyles['form-item']}>
                  <label>Mã KSU</label>
                  <input type="text" name="product_ksu" onChange={this.onChange}/>
                </div>
              </div>

              <div className="col-sm-6">
                <div className={GlobalStyles['form-item']}>
                  <label>Dung tích/khối lượng</label>
                  <input type="text" name="product_volume_weight" onChange={this.onChange} />
                </div>
              </div>

              <div className="col-sm-6">
                <div className={GlobalStyles['form-item']}>
                  <label>Tồn kho</label>
                  <input type="number" name="product_inventory_number" onChange={this.onChange} />
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
                  onChange={(e) => {
                    this.setState({
                      products: {
                        ...this.state.products,
                        product_info: e.editor.getData(),
                      },
                    }, () => {
                      console.log(this.state)
                    })
                  }}
                  data={this.state.products.product_info} />
              </TabPanel>
              <TabPanel title="Cách sử dụng">
                <CKEditor
                  config={{
                    ...configForProductInfo,
                  }}
                  onChange={(e) => {
                    this.setState({
                      products: {
                        ...this.state.products,
                        product_how_to_use: e.editor.getData(),
                      },
                    }, () => {
                      console.log(this.state)
                    })
                  }}
                  data={this.state.products.product_how_to_use} />
              </TabPanel>
              <TabPanel title="Thành phần">
                <CKEditor
                  config={{
                    ...configForProductInfo,
                  }}
                  onChange={(e) => {
                    this.setState({
                      products: {
                        ...this.state.products,
                        product_more_info: e.editor.getData(),
                      },
                    }, () => {
                      console.log(this.state)
                    })
                  }}
                  data={this.state.products.product_more_info} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div className="col-sm-4">
          <div className={GlobalStyles['wrap-content__right']}>
            <div className={GlobalStyles['title-product-main']}>
              Giá sản phẩm
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Giá hiển thị</label>
              <input type="number" name="product_price" onChange={this.onChange} />
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Khuyến mãi</label>
              <input type="number" name="product_discount" onChange={this.onChange} />
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content__right']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Phân loại</div>

            <div className={GlobalStyles['form-item']}>
              <label>Hãng</label>
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
                }}
                items={this.props.brandsState.data}
                config={{
                  text: 'brand_name',
                  value: 'brand_id',
                }}
                placeholder="Tìm hoặc tạo mới hãng mới"
              />
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Danh mục</label>
              <select
                name="product_cat_id"
                onChange={this.onChange}
                value={this.state.products.product_cat_id}
              >
                <option>Chọn danh mục</option>
                {this.renderCategories()}
              </select>
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content__right']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Thẻ tag</div>

            <div className={styles['am-product-add__list-tags']}>
              <ul>
                <li>
                  <span>Trị mụn</span>
                  <span>
                    <Icon name="trash"/>
                  </span>
                </li>
                <li>
                  <span>Trị thâm</span>
                  <span>
                    <Icon name="trash"/>
                  </span>
                </li>
                <li>
                  <span>Da đen</span>
                  <span>
                    <Icon name="trash"/>
                  </span>
                </li>
                <li>
                  <span>Da khô nẻ</span>
                  <span>
                    <Icon name="trash"/>
                  </span>
                </li>
              </ul>
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Thêm các tag đã có</label>
              <Autocomplete
                onChange={(e) => {
                  this.setState({
                    tags: [...this.state.tags, e],
                  })
                }}
                onCreate={(e) => {
                  this.props.actionAddTag({
                    tag_id: uuidv4((new Date()).getMilliseconds()),
                    tag_alias: Alias(e),
                    tag_created_date: Moment(),
                    tag_name: e,
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
  catsState: storeState.catReducer.catsState,
  brandsState: storeState.brandReducer.brandsState,
});

const mapDispatchToProps = {
  actionGetTags,
  actionAddTag,
  actionAddBrand,
  actionGetBrands,
  actionGetCats,
  actionAddProduct,
  actionAddImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminProductAdd);
