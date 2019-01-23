import * as React from 'react'
import Carousel from 'nuka-carousel';
import { Link } from 'react-router-dom';
import Icon from '../../shared/layout/Icon';
const S = require('./NewProducts.scss')

class NewProducts extends React.Component {
  render() {

    return (
      <div className={`${S['new-products']} container`}>
        <div className="row">
          <div className="col-12">
            <Carousel
              autoplay={true}
              renderCenterLeftControls={({ previousSlide }) => (
                <Icon className={S['new-products__action']}
                  name="chevron-left" onClick={previousSlide}/>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <Icon className={S['new-products__action']}
                  name="chevron-right" onClick={nextSlide}/>
              )}
              slidesToShow={4}
              cellAlign="left">
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>From start to finish, the right products</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>From start to finish, the right products</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>From start to finish, the right products</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>From start to finish, the right products</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>From start to finish, the right products</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>From start to finish, the right products</p>
                  <div>200.000đ</div>
                </Link>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}

export default NewProducts
