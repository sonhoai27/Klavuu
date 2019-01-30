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
              renderBottomCenterControls={(e) => {
                console.log(e)
                return []
              }}
              renderCenterLeftControls={({ previousSlide }) => (
                <Icon className={S['new-products__action']}
                  name="chevron-left" onClick={previousSlide}/>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <Icon className={S['new-products__action']}
                  name="chevron-right" onClick={nextSlide}/>
              )}
              slidesToShow={4}>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>0</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>1</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>2</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>3</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>4</p>
                  <div>200.000đ</div>
                </Link>
              </div>
              <div className={S['new-products__item']}>
                <Link to="/">
                  <img src="http://22.zonesgroup.vn/api/uploads/53fb3f5546773958600000.jpg" />
                  <p>5</p>
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
