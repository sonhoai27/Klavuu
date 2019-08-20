import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { actionGetBlogs } from '@app/stores/blog/BlogActions';
import Pagination from '@app/shared/Pagination';
import BlogModel from '@app/shared/models/Blog';
import { API } from '@app/shared/const';

const S = require('./Blog.scss')

interface IBlogsProps {
  actionGetBlogs: Function;
  blogsState: any;
  match: any;
}

interface IBlogsStates {
  hotBlogs: any;
}

class Blogs extends React.Component<IBlogsProps, IBlogsStates> {
  constructor(props) {
    super(props)
    this.state = {
      hotBlogs: [],
    }
  }

  componentDidMount() {
    Axios.get(`${API}blog/hot`)
    .then((result) => {
      this.setState({
        hotBlogs: result.data,
      })
    })
  }

  onMakeCurrentPage = () => {
    const page = (window.location.href).split('page=')[1]
    if (page !== undefined || page != null) {
      return page
    }

    return 1
  }

  isMeta = () => {
    if (this.props.blogsState
      && this.props.blogsState.meta) {
      return this.props.blogsState.meta
    }

    return {
      total: 0,
      page_size: 0,
    }
  }

  renderBlogs = () => (
    this.props.blogsState
    && this.props.blogsState.items
    && this.props.blogsState.items.length > 0
    && this.props.blogsState.items.map((element: BlogModel) => (
      <div key={Math.random()} className={`${S['item']} row`}>
        <div className="col-sm-6"><img src={element.blogs_cover} className="img-fluid"/></div>
        <div className="col-sm-6">
          <Link to={`/page/blogs/${element.blogs_alias}`} title={element.blogs_title}>
            <h4>{element.blogs_title}</h4>
          </Link>
          <p>{element.blogs_desc}</p>
        </div>
      </div>
    ))
  )

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
      <div className={`${S['blogs']} container`}>
        <div className="row">
          <div className="col-sm-8">
            <div className={S['items']}>
              {this.renderBlogs()}
            </div>
            <Pagination
              currentPage={Number(this.onMakeCurrentPage())}
              pageLimit={Number(this.isMeta()['page_size'])}
              pageNeighbours={2}
              onPageChanged={(e) => {
                this.props.actionGetBlogs(`?page=${e.currentPage}`)
                window.scrollTo(0, 0)
                window.history.pushState('', '', `/dev${this.props.match.url}?page=${e.currentPage}`);
              }}
              totalRecords={Number(this.isMeta()['total'])}
            />
          </div>
          <div className="col-sm-4">
            <div className={S['hot']}>
              <h4>Bài viết xem nhiều</h4>
              {this.renderHotBlogs()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  blogsState: storeState.blogReducer.blogsState,
})

const mapDispatchToProps = {
  actionGetBlogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
