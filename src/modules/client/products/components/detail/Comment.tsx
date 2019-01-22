import * as React from 'react';
import { connect } from 'react-redux';
import Rater from '@app/modules/client/shared/layout/rating';

const S = require('../../styles/Comment.scss')

interface IProductCommentStates {
  isShowOrHideWriteAReview: boolean;
}

class ProductComment extends React.Component<{}, IProductCommentStates> {
  constructor(props) {
    super(props)
    this.state = {
      isShowOrHideWriteAReview: false,
    }
  }

  onShowOrHideWriteAReview = () => {
    this.setState({
      isShowOrHideWriteAReview: !this.state.isShowOrHideWriteAReview,
    })
  }

  renderEditor = () => (
    <div className={S['comment__write-review']}>
      <div className={S['comment__write-review__item']}>
        <p>Score:</p>
        <Rater rating={0} />
      </div>
      <div className={S['comment__write-review__item']}>
        <p>Name:</p>
        <input type="text" />
      </div>
      <div className={S['comment__write-review__item']}>
        <p>Order Id:</p>
        <input type="text" />
      </div>
      <div className={S['comment__write-review__item']}>
        <p>Review:</p>
        <textarea rows={3} />
      </div>
      <div className={S['comment__submit']}>
        <span>POST</span>
      </div>
    </div>
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
        {this.state.isShowOrHideWriteAReview && this.renderEditor()}
        <div className={S['comment__comments']}>
          <ul>
            <li>
              <div className={S['user']}>
                <span>Nguyen Hoai Son</span>
                <span>Verified Reviewer</span>
              </div>
              <div className={S['score']}>
                <Rater disabled={true} rating={2} />
              </div>
              <div className={S['review']}>
                I used this product as a sleeping mask.
                The application was nice, I had no
                problems with the consistency. However,
                I awoke with no peeling and an intensely
                dry face. I wrote to Glow Recipe and received a
                onse stating that there were no other customers
                who have had this reaction and that maybe my skin
                didn't respond well to AHA's.
              </div>
            </li>
            <li>
              <div className={S['user']}>
                <span>Nguyen Hoai Son</span>
                <span>Verified Reviewer</span>
              </div>
              <div className={S['score']}>
                <Rater disabled={true} rating={2} />
              </div>
              <div className={S['review']}>
                I used this product as a sleeping mask.
                The application was nice, I had no
                problems with the consistency. However,
                I awoke with no peeling and an intensely
                dry face. I wrote to Glow Recipe and received a
                onse stating that there were no other customers
                who have had this reaction and that maybe my skin
                didn't respond well to AHA's.
              </div>
            </li>

            <li>
              <div className={S['user']}>
                <span>Nguyen Hoai Son</span>
                <span>Verified Reviewer</span>
              </div>
              <div className={S['score']}>
                <Rater disabled={true} rating={2} />
              </div>
              <div className={S['review']}>
                I used this product as a sleeping mask.
                The application was nice, I had no
                problems with the consistency. However,
                I awoke with no peeling and an intensely
                dry face. I wrote to Glow Recipe and received a
                onse stating that there were no other customers
                who have had this reaction and that maybe my skin
                didn't respond well to AHA's.
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

// tslint:disable-next-line:no-unused
const mapStateToProps = storeState => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComment)
