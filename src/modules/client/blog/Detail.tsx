import * as React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet'

import BlogModel from '@app/shared/models/Blog';
import { actionGetBlog } from '@app/stores/blog/BlogActions';
import { API } from '@app/shared/const';

const S = require('./Blog.scss')

interface IBlogDetailProps {
  actionGetBlog: Function;
  blogState: any;
  match: any;
}

interface IBlogDetailStates {
  hotBlogs: any;
}

class BlogDetail extends React.Component<IBlogDetailProps, IBlogDetailStates> {
  constructor(props) {
    super(props)
    this.state = {
      hotBlogs: [],
    }
  }

  componentDidMount() {
    try {
      this.props.actionGetBlog(this.props.match.params.alias)
    } catch (e) {}
    Axios.get(`${API}blog/hot`)
    .then((result) => {
      this.setState({
        hotBlogs: result.data,
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match !== prevProps.match) {
      try {
        this.props.actionGetBlog(this.props.match.params.alias)
      } catch (e) {}
    }
  }

  renderHotBlogs = () => (
    this.state.hotBlogs.map((element: BlogModel) => (
      <div key={Math.random()} className={S['hot__item']}>
        <Link to={`/page/blogs/${element.blogs_alias}`} title={element.blogs_title}>
          <p>{element.blogs_title}</p>
        </Link>
      </div>
    ))
  )

  render() {
    return (
      <>
        <Helmet>
          <title>{this.props.blogState.blogs_title}</title>
        </Helmet>
        <div className={`${S['blogs']} container`}>
          <div className="row">
            <div className="col-sm-8">
              <h1>{this.props.blogState.blogs_title}</h1>
              <div
                style={{ marginTop: 32, textAlign: 'justify' }}
                dangerouslySetInnerHTML={{ __html: this.props.blogState.blogs_content }}/>
            </div>
            <div className="col-sm-4">
              <div className={S['hot']}>
                <h4>Bài viết xem nhiều</h4>
                {this.renderHotBlogs()}
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
  actionGetBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail)
