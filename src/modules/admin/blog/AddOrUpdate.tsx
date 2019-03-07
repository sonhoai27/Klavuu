import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import Photo from './Photo';
import Icon from '@app/modules/client/shared/layout/Icon';
import BlogModel from '@app/shared/models/Blog';
import Alias from '@app/shared/utils/Alias';
import { actionAddBlog } from '@app/stores/blog/BlogActions';
import { actionShowHideAlert } from '@app/stores/init';

// @ts-ignore
declare var CKEDITOR: any;

const GlobalStyles = require('@app/shared/styles/Box.scss');
const S = require('./styles/Blog.scss');

interface IStates {
  isShowingPhotoApp: boolean;
  ckeditor: any;
  blog: BlogModel;
}

interface ISProps {
  match?: any;
  actionAddBlog: Function;
  actionShowHideAlert: Function;
}

class AdminBlogAddOrUpdate extends React.Component<ISProps, IStates> {
  constructor(props) {
    super(props)
    this.state = {
      isShowingPhotoApp: false,
      ckeditor: {},
      blog: {},
    }
  }

  componentDidMount() {
    this.configCKEditor()
    console.log()
  }

  showHidePhotoApp = () => this.setState({ isShowingPhotoApp: !this.state.isShowingPhotoApp })

  // false -> add
  isUpdate = () => this.props.match.params.alias

  configCKEditor = () => {
    try {
      CKEDITOR.plugins.add('insertimage', {
        init: (editor) => {
          editor.addCommand('insertImage', {
            exec: (editor) => {
              this.setState({
                ckeditor: {
                  editor,
                  type: 'insert_image',
                },
              }, () => {
                this.showHidePhotoApp()
              })
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
        height: 500,
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

  onChange = (e) => {
    const { name, value } = e.target

    this.setState({
      ...this.state,
      blog: {
        ...this.state.blog,
        [name]: value,
      },
    })
  }

  onSave = () => {
    // @ts-ignore
    const image: any = document.getElementById('cover-blog-id').src

    const blog = {
      ...this.state.blog,
      blogs_alias: Alias(this.state.blog.blogs_title),
      blogs_cover: image,
      blogs_content: CKEDITOR.instances.editor1.getData(),
    }

    if (this.checkBlogNull(blog)) {
      this.props.actionAddBlog(blog)
      .then(() => this.onShowAlert({
        type: 'success',
        title: 'Thêm thành công bài viết!',
      }))
      .catch(() => this.onShowAlert({
        type: 'error',
        title: 'Có lỗi, vui lòng xem lại!',
      }))
    } else {
      this.onShowAlert({
        type: 'warning',
        title: 'Vui lòng điền tên hoặc chọn cover',
      })
    }
  }

  checkBlogNull = (blog): boolean => (
    blog.blogs_title !== ''
    && blog.blogs_cover !== ''
  )

  onShowAlert = ({ type, title }) => {
    this.props.actionShowHideAlert({
      type,
      title,
      status: true,
    })

    setTimeout(() => {
      this.props.actionShowHideAlert({
        status: false,
      })
      this.setState({
        blog: {},
      })
    }, 1500)
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
          <div className={GlobalStyles['wrap_action']}>
            <span onClick={this.onSave}>
              Lưu
            </span>
          </div>
        </AdminHeader>
        <div className={`${S['admin-blog']} col-sm-8`}>
          <div className={GlobalStyles['wrap-content']}>
            <div className={GlobalStyles['title-product-main']}>Thông tin</div>
            <div className={GlobalStyles['form-item']}>
              <label>Tên</label>
              <input type="text" name="blogs_title" onChange={this.onChange}/>
            </div>
            <div className={GlobalStyles['form-item']}>
              <label>Mô tả</label>
              <input type="text" name="blogs_desc" onChange={this.onChange}/>
            </div>
            <div className={GlobalStyles['form-item']}>
              <label>Nội dung</label>
              <textarea cols={80} id="editor1" name="editor1" />
            </div>
          </div>
        </div>
        <div className={`${S['admin-blog']} col-sm-4`}>
          <div className={GlobalStyles['wrap-content']}>
            <div className={GlobalStyles['form-item']}>
              <label>Cover</label>
              <div className={S['image-picker']} onClick={() => {
                this.setState({
                  ckeditor: {
                    editor: 'cover-blog-id',
                    type: 'change_image',
                  },
                }, () => {
                  this.showHidePhotoApp()
                })
              }}>
                <Icon name="picture" />
                <img id="cover-blog-id" className="img-fluid"/>
              </div>
            </div>
          </div>
        </div>

        {
          this.state.isShowingPhotoApp
          && <Photo onClose={this.showHidePhotoApp} ckeditor={this.state.ckeditor}/>
        }
      </>
    )
  }
}

// tslint:disable-next-line:no-unused
const mapStateToProps = storeState => ({
})

const mapDispatchToProps = {
  actionAddBlog,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlogAddOrUpdate)