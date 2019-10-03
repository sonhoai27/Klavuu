import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CKEditor from 'ckeditor4-react';

import AdminHeader from '../Shared/Layout/Header';
import Breadcrumb from '../Shared/Layout/Breadcrumb';
import Icon from '@app/Shared/Icon';
import BlogModel from '@app/Shared/Models/Blog';
import Alias from '@app/Shared/Utils/Alias';
import { actionAddBlog, actionGetBlog, actionUpdateBlog } from '@app/Stores/Blog/BlogActions';
import { actionShowHideAlert } from '@app/Stores/init';
import { configForProductInfo } from '@app/Shared/CKEditorConfig';

const GlobalStyles = require('@app/Shared/Styles/Box.scss');
const S = require('@app/modules/Admin/Blog/Styles/Blog.scss');

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

CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.10.1/full/ckeditor.js';

class AdminBlogAddOrUpdate extends React.Component<ISProps, IStates> {
  private editor: any = React.createRef();
  constructor(props) {
    super(props)
    this.state = {
      blog: {},
    }
  }

  componentDidMount() {
    if (this.isUpdate()) {
      this.getBlog()
    }
  }

  componentDidUpdate() {
    if (this.editor.editor) {
      console.log(this.editor.editor.instances)
    }
  }

  imagePicker = (options: any, cb: any) => {
    const routePrefix = (options && options.prefix) ? options.prefix : '/finder';
    // tslint:disable-next-line: max-line-length
    window.open(`${routePrefix}?type=${options.type}` || 'file', 'FileManager', 'width=900,height=600');
    // @ts-ignore
    window.SetUrl = cb;
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
      blogs_alias: Alias(this.state.blog.blogs_title || ''),
      blogs_cover: image,
      blogs_content: '',
    }

    if (this.checkBlogNull(blog)) {
      this.props.actionAddBlog(blog)
        .then(() => {
          this.onShowAlert({
            type: 'success',
            title: 'Thêm thành công bài viết!',
          })
          setTimeout(() => {
            window.location.href = '/blogs'
          }, 1000)
        })
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
        blogs_alias: Alias(this.state.blog.blogs_title || ''),
        blogs_content: '',
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
                href: '/',
                active: false,
              },
              {
                title: 'Blogs',
                href: '/blogs',
                active: false,
              },
              {
                title: 'Thêm',
                href: '/blogs/addd',
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
              <CKEditor
                ref={(editor: any) => this.editor = editor}
                config={{
                  ...configForProductInfo,
                }}
                data="<h1>Xin chao</h1>" />
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
