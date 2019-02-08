import * as React from 'react'
import Carousel from 'nuka-carousel';
import { connect } from 'react-redux';
import { actionGetBanners } from '@app/stores/banner/BannerActions';
import { CDN } from '@app/shared/const';

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
      </div>
    ))
  )

  handleLoadImage = () => {
    this.carousel.setDimensions()
  }

  render() {
    return (
      <Carousel ref={c => this.carousel = c} >
        {this.renderListBanners()}
      </Carousel>
    )
  }
}

const mapStateToProps = storeState => ({
  bannersState: storeState.bannerReducer.bannersState,
})

const mapDispatchToProps = {
  actionGetBanners,
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
