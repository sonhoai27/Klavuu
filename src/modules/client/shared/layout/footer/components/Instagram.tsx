import * as React from 'react';
import LazyLoad from 'react-lazyload';

const S = require('./InfoSection.scss')

const Instagram = props =>  (
  <div className={S['info-section']}>
    <div className="container">
      <div className="row">
        <div className="col-sm-12" style={{ textAlign: 'center', padding: 0 }}>
          <div className={S['instagram']}>
            <p>#22ZONES</p>
            <div className={S['instagram__items']}>
              {
                props.data.map((element, index) => (
                  <LazyLoad
                    height={'100'}
                    once
                    key={index}
                    throttle={1000}>
                    <a target="_blank" href={element.link}>
                      <img src={element.image}/>
                    </a>
                  </LazyLoad>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Instagram
