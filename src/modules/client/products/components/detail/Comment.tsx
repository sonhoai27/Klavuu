import * as React from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
const uuidv4 = require('uuid/v4');

import Rater from '@app/modules/client/shared/layout/rating';
import {
  actionAddCMT,
  actionGetCMTSByPrdId,
  actionCheckOrderId,
} from '@app/stores/comment/CommentActions';
import Icon from '@app/modules/client/shared/layout/Icon';
import { CommentModel } from '@app/shared/models/CommentModel';
import Moment from '@app/shared/utils/Moment';
import { actionShowHideAlert, actionShowHideLoading } from '@app/stores/init';
import Pagination from '@app/shared/Pagination';

const S = require('../../styles/Comment.scss')

interface IProductCommentProps {
  actionAddCMT: Function;
  actionGetCMTSByPrdId: Function;
  cmtsByPrdIdState: any;
  prdId?: any;
  actionShowHideLoading: Function;
  actionShowHideAlert: Function;
  actionCheckOrderId: Function;
}

interface IProductCommentStates {
  isShowOrHideWriteAReview: boolean;
  valueOfStar: number;
  cmt: CommentModel;
}

class ProductComment extends React.Component<IProductCommentProps, IProductCommentStates> {
  constructor(props) {
    super(props)
    this.state = {
      isShowOrHideWriteAReview: false,
      valueOfStar: 0,
      cmt: {
        cmt_content: '',
        cmt_created_date: Moment(),
        cmt_product_id: this.props.prdId,
        cmt_stars: 0,
        cmt_user_name: '',
        cmt_verify: 0,
      },
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.prdId !== prevProps.prdId) {
      this.props.actionGetCMTSByPrdId(this.props.prdId)
    }
  }

  onChangeInput = (e) => {
    this.setState({
      cmt: {
        ...this.state.cmt,
        [e.target.name]: e.target.value,
      },
    })
  }

  onShowOrHideWriteAReview = () => {
    this.setState({
      isShowOrHideWriteAReview: !this.state.isShowOrHideWriteAReview,
    })
  }

  onAddCmt = () => {
    this.props.actionShowHideLoading(true)
    const {
      cmt_content,
      cmt_user_name,
    } = this.state.cmt

    if (cmt_content !== '' && cmt_user_name !== '') {
      this.props.actionAddCMT(this.state.cmt)
      .then(() => {
        this.props.actionShowHideLoading(false)
        this.props.actionShowHideAlert({
          status: true,
          title: 'Thành công!',
          icon: <Icon name="thumbs-up"/>,
          type: 'success',
        })
        setTimeout(() => {
          this.props.actionShowHideAlert({
            status: false,
            title: '',
            icon: undefined,
            type: '',
          })
          this.props.actionGetCMTSByPrdId(this.props.prdId)
          this.setState({
            valueOfStar: 0,
            cmt: {
              cmt_content: '',
              cmt_created_date: Moment(),
              cmt_product_id: this.props.prdId,
              cmt_stars: 0,
              cmt_user_name: '',
              cmt_verify: 0,
            },
          })
        }, 2000)
        const tempDom: any = document.getElementById('order-id-code')
        // @ts-ignore
        tempDom.value = '';
      })
      .catch(() => {
        this.props.actionShowHideLoading(false)
        this.props.actionShowHideAlert({
          status: true,
          title: 'Thất bại, vui lòng xem lại',
          icon: <Icon name="thumbs-up"/>,
          type: 'warning',
        })
        setTimeout(() => {
          this.props.actionShowHideAlert({
            status: false,
            title: '',
            icon: undefined,
            type: '',
          })
        }, 2000)
      })
    } else {
      this.props.actionShowHideLoading(false)
      this.props.actionShowHideAlert({
        status: true,
        title: 'Thất bại, vui lòng xem đủ thông tin',
        icon: <Icon name="thumbs-up"/>,
        type: 'warning',
      })
      setTimeout(() => {
        this.props.actionShowHideAlert({
          status: false,
          title: '',
          icon: undefined,
          type: '',
        })
      }, 2000)
    }
  }

  onCheckOrderId = (e) => {
    const id = e.target.value;
    this.props.actionCheckOrderId(id)
    .then(((result) => {
      const { order_id } = result.value.data

      if (order_id && order_id === id) {
        this.setState({
          cmt: {
            ...this.state.cmt,
            cmt_verify: 1,
          },
        })
      }
    }))
  }

  renderEditor = () => (
    <Fade opposite collapse when={this.state.isShowOrHideWriteAReview}>
      <div className={S['comment__write-review']}>
        <div className={S['comment__write-review__item']}>
          <p>Score:</p>
          <div className={S['comment__write-review__star']}>
            <Rater
              onChange={(e) => {
                this.setState({
                  valueOfStar: e,
                  cmt: {
                    ...this.state.cmt,
                    cmt_stars: e,
                  },
                })
              }}
              rating={this.state.valueOfStar} />
            {
              this.state.valueOfStar > 0 && <Icon
              onClick={() => {
                this.setState({
                  valueOfStar: 0,
                  cmt: {
                    ...this.state.cmt,
                    cmt_stars: 0,
                  },
                })
              }}
              name="cross"/>
            }
          </div>
        </div>
        <div className={S['comment__write-review__item']}>
          <p>* Name:</p>
          <input
            value={this.state.cmt.cmt_user_name}
            name="cmt_user_name"
            onChange={this.onChangeInput}
            type="text" />
        </div>
        <div className={S['comment__write-review__item']}>
          <p>* Review:</p>
          <textarea
            value={this.state.cmt.cmt_content}
            name="cmt_content"
            onChange={this.onChangeInput}
            rows={3} />
        </div>
        <div className={S['comment__write-review__item']}>
          <p>Order Id:</p>
          <input
            onChange={this.onCheckOrderId} type="text"
            id="order-id-code"
          />
          <p className={S['comment__write-review__item--verify']}>
            {this.state.cmt.cmt_verify === 1 ? 'Verified Reviewer' : ''}
          </p>
        </div>
        <div className={S['comment__submit']}>
          <span onClick={this.onAddCmt}>POST</span>
        </div>
      </div>
    </Fade>
  )

  renderListCmt = () => (
    this.props.cmtsByPrdIdState
    && this.props.cmtsByPrdIdState.items
    && this.props.cmtsByPrdIdState.items.length > 0
    && this.props.cmtsByPrdIdState.items.map((element: CommentModel) => (
      <li key={uuidv4()}>
        <div className={S['user']}>
          <span>{element.cmt_user_name}</span>
          <span>
            {Number(element.cmt_verify) === 1 ? 'Verified Reviewer' : ''}
          </span>
        </div>
        <div className={S['score']}>
          <Rater disabled={true} rating={element.cmt_stars} />
        </div>
        <div className={S['review']}>
          {element.cmt_content}
        </div>
      </li>
    ))
  )

  render() {
    return (
      <div className={`${S['comment']} col-12`}>
        <div className={S['comment__header']}>
          <p>REVIEWS</p>
          <p onClick={this.onShowOrHideWriteAReview}>
            Write a review
          </p>
        </div>
        {this.renderEditor()}
        <div className={S['comment__comments']}>
          <ul>
            {this.renderListCmt()}
          </ul>
          <Pagination
            totalRecords={
              this.props.cmtsByPrdIdState.meta
              ? Number(this.props.cmtsByPrdIdState.meta.total)
              : 0
            }
            pageLimit={
              this.props.cmtsByPrdIdState.meta
              ? Number(this.props.cmtsByPrdIdState.meta.page_size)
              : 0
            }
            pageNeighbours={2}
            onPageChanged={(e) => {
              this.props.actionGetCMTSByPrdId(`${this.props.prdId}?page=${e.currentPage}`)
            }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  cmtsByPrdIdState: storeState.cmtReducer.cmtsByPrdIdState,
})

const mapDispatchToProps = {
  actionAddCMT,
  actionGetCMTSByPrdId,
  actionShowHideAlert,
  actionShowHideLoading,
  actionCheckOrderId,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComment)
