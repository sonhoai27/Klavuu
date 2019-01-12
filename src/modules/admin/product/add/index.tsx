import * as React from 'react';
import { connect } from 'react-redux';
const uuidv4 = require('uuid/v4');

import AdminHeader from '../../shared/layout/Header';
import Breadcrumb from '@app/modules/admin/shared/layout/Breadcrumb';
import Icon from '@app/modules/client/shared/layout/Icon';
import Tabs, { TabPanel } from '@app/shared/tabs/Tabs';
import LiteEditor from '@app/shared/LiteEditor';
import Autocomplete from './components/Autocomplete';
import ProductModel from '@app/shared/models/ProductModel';
import ImageModel from '@app/shared/models/ImageModel';
import Moment from '@app/shared/utils/Moment';

const styles = require('./ProductAdd.scss')
const GlobalStyles = require('@app/shared/styles/Box.scss');

const Editor = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 1 * 800)).then(() =>
    Math.floor(Math.random() * 10) >= 1
      ? import('@app/shared/Editor')
      : Promise.reject(new Error()),
  );
});

interface IAdminProductAddProps {
}

interface IAdminProductAddStates {
  products: ProductModel;
  images: ImageModel[];
}

class AdminProductAdd extends React.Component<IAdminProductAddProps, IAdminProductAddStates> {
  constructor(props) {
    super(props);
    this.state = {
      products: {
        product_id: uuidv4((new Date()).getMilliseconds()),
        product_name: '',
        product_brand_id: '',
        product_cat_id: '',
        product_created_date: Moment(),
      },
      images: [
        {
          img_id: uuidv4(),
          img_src: 'https://cdn-images-1.medium.com/max/1000/1*D8Wwwce8wS3auLAiM3BQKA.jpeg',
        },
        {
          img_id: uuidv4(),
          img_src: 'https://cdn-images-1.medium.com/max/1000/1*D8Wwwce8wS3auLAiM3BQKA.jpeg',
        },
        {
          img_id: uuidv4(),
          img_src: 'https://cdn-images-1.medium.com/max/1000/1*D8Wwwce8wS3auLAiM3BQKA.jpeg',
        },
        {
          img_id: uuidv4(),
          img_src: 'https://cdn-images-1.medium.com/max/1000/1*D8Wwwce8wS3auLAiM3BQKA.jpeg',
        },
      ],
    }
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

  renderImages = () => (
    this.state.images.length > 0
    && this.state.images.map((element) => {
      return (
        <li key={uuidv4()}>
          <img
          src={element.img_src}
          className="img-fluid"/>
          <div>
            <span><Icon name="trash"/></span>
          </div>
        </li>
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
              <input type="text" />
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Mô tả</label>
              <React.Suspense fallback={<span>Loading...</span>}>
                <Editor
                  onChange={(evt) => {
                    console.log(evt);
                  }}
                  data="<h1>AHAA</h1>"
                />
              </React.Suspense>
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Hình ảnh</div>
            <div className={GlobalStyles['form-item']}>
              <div className={GlobalStyles['image-picker']}>
                <input type="file" />
                <Icon name="picture" />
                <p>Kéo hoặc nhấn vào để tài hình</p>
              </div>
              <ul className={GlobalStyles['image-picker__items']}>
                {this.renderImages()}
              </ul>
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Cấu hình</div>
            <div className="row">
              <div className="col-sm-6">
                <div className={GlobalStyles['form-item']}>
                  <label>Mã KSU</label>
                  <input type="text" />
                </div>
              </div>
              <div className="col-sm-6">
                <div className={GlobalStyles['form-item']}>
                  <label>Dung tích/khối lượng</label>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content']} mg-t-16 pd-0`}>
            <Tabs selected={0}>
              <TabPanel title="Thông tin sản phẩm">
                <LiteEditor
                  className="am-product-info"
                />
              </TabPanel>
              <TabPanel title="Cách sử dụng">
                <LiteEditor
                  className="am-product-info"
                />
              </TabPanel>
              <TabPanel title="Thành phần">
                <LiteEditor
                  value={'<h1>Thành phầm</h1>'}
                  className="am-product-info"
                />
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
              <input type="text" />
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Khuyến mãi</label>
              <input type="text" />
            </div>
          </div>

          <div className={`${GlobalStyles['wrap-content__right']} mg-t-16`}>
            <div className={GlobalStyles['title-product-main']}>Phân loại</div>

            <div className={GlobalStyles['form-item']}>
              <label>Hãng</label>
              <Autocomplete
                items={[]}
                placeholder="Tìm hoặc tạo mới hãng mới"
              />
            </div>

            <div className={GlobalStyles['form-item']}>
              <label>Danh mục</label>
              <input type="text" />
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
                  console.log(e)
                }}
                isMultiChooses={true}
                items={[
                  {
                    name: 'trị mụn',
                    id: 1,
                  },
                  {
                    name: 'Chống nắng',
                    id: 2,
                  },
                  {
                    name: 'Dưỡng da',
                    id: 3,
                  },
                ]}
                config={{
                  text: 'name',
                  value: 'id',
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
const mapStateToProps = storeState => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminProductAdd);
