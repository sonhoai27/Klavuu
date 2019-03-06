import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';

// @ts-ignore
declare var CKEDITOR: any;

const GlobalStyles = require('@app/shared/styles/Box.scss');

interface IStates {
}

class AdminBlogAddOrUpdate extends React.Component<{}, IStates> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.configCKEditor()
  }

  configCKEditor = () => {
    try {
      CKEDITOR.plugins.add('insertimage', {
        init: (editor) => {
          editor.addCommand('insertImage', {
            exec: (editor) => {
              editor.insertHtml('The current date and time is: <em>');
            },
          });
          editor.ui.addButton('insertimage', {
            label: 'Insert Image',
            command: 'insertImage',
            icon: '/images/icons/picture.svg',
          });
        },
      });

      CKEDITOR.replace('editor1', {
        toolbar: [
          {
            name: 'document', groups: ['mode', 'document', 'doctools'],
            items: ['Source'],
          },
          {
            name: 'basicstyles', groups: ['basicstyles', 'cleanup'],
            items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript',
              'Superscript', '-', 'CopyFormatting', 'RemoveFormat'],
          },
          { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
          { name: 'colors', items: ['TextColor', 'BGColor'] },
          {
            name: 'paragraph', groups: ['list', 'indent', 'blocks',
              'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-',
                'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft',
                'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
                'BidiLtr', 'BidiRtl', 'Language'],
          },
          { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
          {
            name: 'insert', items: ['Table', 'HorizontalRule', 'Smiley',
              'SpecialChar', 'PageBreak', 'Iframe'],
          },
          { name: 'FontAwesome', items: ['insertimage'] },
        ],
        extraAllowedContent: 'i;span;ul;li;table;td;style;*[id];*(*);*{*}',
        allowedContent: true,
        extraPlugins: 'insertimage',
        htmlEncodeOutput: false,
        entities: false,
      });
    } catch (e) {}
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Thêm mới bài viết</title>
        </Helmet>
        <AdminHeader>
          <Breadcrumb
            className="am-orders"
            items={[
              {
                title: 'Trang chủ',
                href: '/xxx/app',
                active: false,
              },
              {
                title: 'Blogs',
                href: '/xxx/app/blogs',
                active: false,
              },
              {
                title: 'Thêm',
                href: '/xxx/app/blogs/addd',
                active: true,
              },
            ]}
          />
        </AdminHeader>
        <div className="col-sm-8">
          <div className={GlobalStyles['wrap-content']}>
            <div className={GlobalStyles['title-product-main']}>Thông tin</div>
            <div className={GlobalStyles['form-item']}>
              <label>Tên</label>
              <input type="text" name="product_volume_weight" />
            </div>
            <div className={GlobalStyles['form-item']}>
              <label>Mô tả</label>
              <input type="text" name="product_volume_weight" />
            </div>
            <div className={GlobalStyles['form-item']}>
              <label>Nội dung</label>
              <textarea cols={80} id="editor1" name="editor1" rows={10} />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className={GlobalStyles['wrap-content']}>
          </div>
        </div>
      </>
    )
  }
}

// tslint:disable-next-line:no-unused
const mapStateToProps = storeState => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlogAddOrUpdate)
