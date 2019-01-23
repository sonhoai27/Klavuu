import * as React from 'react'
import Carousel from 'nuka-carousel';

class Banner extends React.PureComponent {
  private carousel;
  constructor(props) {
    super(props)
  }

  handleLoadImage = () => {
    this.carousel.setDimensions()
  }

  render() {
    return (
      <Carousel ref={c => this.carousel = c} >
        <div>
          <img
            onLoad={this.handleLoadImage}
            style={{ width: '100%' }}
            className="img-fluid"
            src="https://images.leflair.vn/w1440/q85/5c46eb20adc03f1f0a0b8e30.jpg" />
        </div>
        <div>
          <img
            onLoad={this.handleLoadImage}
            style={{ width: '100%' }}
            className="img-fluid"
            src="https://images.leflair.vn/w1440/q85/5c4051e82cc27f748bbfac5a.jpg" />
        </div>
        <div>
          <img
            onLoad={this.handleLoadImage}
            style={{ width: '100%' }}
            className="img-fluid"
            src="https://images.leflair.vn/w1440/q85/5c46eb20adc03f1f0a0b8e30.jpg" />
        </div>
      </Carousel>
    )
  }
}

export default Banner
