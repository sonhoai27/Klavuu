import * as React from 'react'
import Carousel from 'nuka-carousel';
import { connect } from 'react-redux';

import { actionGetBanners } from '@app/stores/banner/BannerActions';
import { CDN } from '@app/shared/const';
import BannerLazyLoading from './loading';
import Icon from '../../shared/layout/Icon';
import { Link } from 'react-router-dom';
const S = require('../new-products/NewProducts.scss')

const uuidv4 = require('uuid/v4');

interface IBannerProps {
  bannersState: any[];
  actionGetBanners: Function;
}

class Banner extends React.PureComponent<IBannerProps> {
  private carousel;
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actionGetBanners()
  }

  renderListBanners = () => (
    this.props.bannersState
    && this.props.bannersState.length > 0
    && this.props.bannersState.map(element => (
      <div key={uuidv4()}>
        <img
          onLoad={this.handleLoadImage}
          style={{ width: '100%' }}
          className="img-fluid"
          src={`${CDN}banners/${element.banner_image}`} />
          {
            element.banner_title !== null
            && (
              <div className={S['new-products__link']}>
                <Link to={element.banner_link}>
                  <div className={S['new-products__link__info']}>
                    <h3>{element.banner_title}</h3>
                    <p>{element.banner_desc}</p>
                  </div>
                </Link>
              </div>
            )
          }
      </div>
    ))
  )

  handleLoadImage = () => {
    this.carousel.setDimensions()
  }

  render() {
    if (this.props.bannersState && this.props.bannersState.length > 0) {
      return (
        <Carousel
          renderCenterLeftControls={({ previousSlide }) => (
            <Icon className={S['new-products__action']}
              name="chevron-left" onClick={previousSlide}/>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <Icon className={S['new-products__action']}
              name="chevron-right" onClick={nextSlide}/>
          )}
          ref={c => this.carousel = c} >
            {this.renderListBanners()}
        </Carousel>
      )
    }
    return <BannerLazyLoading/>
  }
}

const mapStateToProps = storeState => ({
  bannersState: storeState.bannerReducer.bannersState,
})

const mapDispatchToProps = {
  actionGetBanners,
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
