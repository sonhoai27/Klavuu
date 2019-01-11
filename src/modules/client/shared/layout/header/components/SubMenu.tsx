import * as React from 'react';

import ValidateObject from '@app/shared/utils/ValidateObject';

interface ISubMenuProps {
  items?: {
    text: string;
    href: string;
  }[];
  className?: string;
}

const SubMenu = (props: ISubMenuProps) => {
  return (
    <div className={ValidateObject({ name: 'className', object: props })}>
      <div className="container">
        <div className="row">
          <div className="col-1" />
          <div className="col-10">
            <div className="row">
              <div className="col-sm-4 item">
                <div className="submenu--header">
                  Glow Picks
              </div>
                <ul>
                  <li>
                    <a href="">CURATIONS FOR MEN</a>
                  </li>
                  <li>
                    <a href="">SPECIAL OFFERS</a>
                  </li>
                  <li>
                    <a href="">GIFT CARDS</a>
                  </li>
                  <li>
                    <a href="">AS SEEN ON SHARK TANK</a>
                  </li>
                  <li>
                    <a href="">K-BEAUTY KITS</a>
                  </li>
                  <li>
                    <a href="">GLOW MERCH</a>
                  </li>
                  <li>
                    <a href="">AWARD WINNERS</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4 item">
                <div className="submenu--header">
                  Glow Picks
              </div>
                <ul>
                  <li>
                    <a href="">CURATIONS FOR MEN</a>
                  </li>
                  <li>
                    <a href="">SPECIAL OFFERS</a>
                  </li>
                  <li>
                    <a href="">GIFT CARDS</a>
                  </li>
                  <li>
                    <a href="">AS SEEN ON SHARK TANK</a>
                  </li>
                  <li>
                    <a href="">K-BEAUTY KITS</a>
                  </li>
                  <li>
                    <a href="">GLOW MERCH</a>
                  </li>
                  <li>
                    <a href="">AWARD WINNERS</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4 item">
                <div className="submenu--header">
                  Glow Picks
              </div>
                <ul>
                  <li>
                    <a href="">CURATIONS FOR MEN</a>
                  </li>
                  <li>
                    <a href="">SPECIAL OFFERS</a>
                  </li>
                  <li>
                    <a href="">GIFT CARDS</a>
                  </li>
                  <li>
                    <a href="">AS SEEN ON SHARK TANK</a>
                  </li>
                  <li>
                    <a href="">K-BEAUTY KITS</a>
                  </li>
                  <li>
                    <a href="">GLOW MERCH</a>
                  </li>
                  <li>
                    <a href="">AWARD WINNERS</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-1" />
        </div>
      </div>
    </div>
  )
}

export default SubMenu

export {
  ISubMenuProps,
}
