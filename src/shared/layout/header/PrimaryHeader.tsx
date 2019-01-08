import * as React from 'react';

import './styles/PrimaryHeader.scss'

const PrimaryHeader = () => (
  <div className="col-12 primary-header">
    <div className="container">
      <div className="row">
        <div className="col-sm-2">
          <img
            src="http://en.klavuu.com/img/logo/logo.png"
            className="img-fluid logo"/>
        </div>
        <div className="col-sm-10">
          <ul>
            <li>
              <a href="#">Shop By</a>
            </li>
            <li>
              <a href="#">New arrivals</a>
            </li>
            <li>
              <a href="#">Brands</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default PrimaryHeader
