import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import Icon from '@app/modules/client/shared/layout/Icon';
import BlogModel from '@app/shared/models/Blog';
import Alias from '@app/shared/utils/Alias';
import { actionAddBlog, actionGetBlog, actionUpdateBlog } from '@app/stores/blog/BlogActions';
import { actionShowHideAlert } from '@app/stores/init';

// @ts-ignore
declare var CKEDITOR: any;
// @ts-ignore
declare var CKFinder: any;

const GlobalStyles = require('@app/shared/styles/Box.scss');
const S = require('./styles/Blog.scss');

interface IStates {
  blog: BlogModel;
}

interface ISProps {
  match?: any;
  actionAddBlog: Function;
  actionShowHideAlert: Function;
  actionGetBlog: Function;
  blogState: any;
  actionUpdateBlog: Function;
}

class AdminBlogAddOrUpdate extends React.Component<ISProps, IStates> {
  constructor(props) {
    super(props)
    this.state = {
      blog: {},
    }
  }

  componentDidMount() {
    this.configCKEditor()
    if (this.isUpdate()) {
      this.getBlog()
    }
  }

  getBlog = () => {
    this.props.actionGetBlog(this.props.match.params.alias)
      .then((result) => {
        const data: BlogModel = result.value.data
        this.setState({
          blog: {
            blogs_alias: data.blogs_alias,
            blogs_id: data.blogs_id,
            blogs_content: data.blogs_content,
            blogs_cover: data.blogs_cover,
            blogs_desc: data.blogs_desc,
            blogs_title: data.blogs_title,
            blogs_views: data.blogs_views,
          },
        })
      })
      .catch(err => console.log(err))
  }

  // false -> add
  isUpdate = () => this.props.match.params.alias

  configCKEditor = () => {
    try {
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
          { name: 'FontAwesome', items: ['Image'] },
        ],
        extraAllowedContent: 'i;span;ul;li;table;td;style;*[id];*(*);*{*}',
        allowedContent: true,
        htmlEncodeOutput: false,
        entities: false,
      });
    } catch (e) { }

    const blogsCover = document.getElementById('image-picker');
    blogsCover.onclick =  ()  => {
      CKFinder.popup({
        chooseFiles: true,
        width: 800,
        height: 600,
        onInit(finder) {
          finder.on('files:choose', (evt) => {
            const file = evt.data.files.first();
            // @ts-ignore
            document.getElementById('cover-blog-id').src = file.getUrl();
          });

          finder.on('file:choose:resizedImage', (evt) => {
            // @ts-ignore
            document.getElementById('cover-blog-id').src = evt.data.resizedUrl
          });
        },
      });
    }
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

  onUpdate = () => {
    // @ts-ignore
    const image: any = document.getElementById('cover-blog-id').src

    this.props.actionUpdateBlog(
      {
        blogs_alias: Alias(this.state.blog.blogs_title),
        blogs_content: CKEDITOR.instances.editor1.getData(),
        blogs_cover: image,
        blogs_desc: this.state.blog.blogs_desc,
        blogs_title: this.state.blog.blogs_title,
      },
      this.state.blog.blogs_id,
    )
      .then(() => {
        this.onShowAlert({
          type: 'success',
          title: 'Cập nhật thành công bài viết!',
        })
        window.location.reload()
      })
      .catch(() => this.onShowAlert({
        type: 'error',
        title: 'Có lỗi, vui lòng xem lại!',
      }))
  }

  componentWillUnmount() {
    this.setState({ blog: {} })
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
            <span onClick={() => this.isUpdate() ? this.onUpdate() : this.onSave()}>
              Lưu
            </span>
          </div>
        </AdminHeader>
        <div className={`${S['admin-blog']} col-sm-8`}>
          <div className={GlobalStyles['wrap-content']}>
            <div className={GlobalStyles['title-product-main']}>Thông tin</div>
            <div className={GlobalStyles['form-item']}>
              <label>Tên</label>
              <input
                defaultValue={this.state.blog.blogs_title}
                type="text" name="blogs_title"
                onChange={this.onChange} />
            </div>
            <div className={GlobalStyles['form-item']}>
              <label>Mô tả</label>
              <input
                defaultValue={this.state.blog.blogs_desc}
                type="text" name="blogs_desc" onChange={this.onChange} />
            </div>
            <div className={GlobalStyles['form-item']}>
              <label>Nội dung</label>
              <textarea
                cols={80}
                id="editor1"
                name="editor1"
                value={this.props.blogState.blogs_content}
              >
                {this.props.blogState.blogs_content}
              </textarea>
            </div>
          </div>
        </div>
        <div className={`${S['admin-blog']} col-sm-4`}>
          <div className={GlobalStyles['wrap-content']}>
            <div className={GlobalStyles['form-item']}>
              <label>Cover</label>
              <div className={S['image-picker']} id="image-picker">
                <Icon name="picture" />
                <img
                  src={this.props.blogState.blogs_cover}
                  id="cover-blog-id"
                  className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  blogState: storeState.blogReducer.blogState,
})

const mapDispatchToProps = {
  actionAddBlog,
  actionShowHideAlert,
  actionGetBlog,
  actionUpdateBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlogAddOrUpdate)
