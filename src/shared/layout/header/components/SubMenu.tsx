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
            <ul>
              <li>
                <div className="submenu--header">
                  Glow Picks
                </div>
              </li>
              <li>
                <div className="submenu--header">
                  Glow Picks
                </div>
              </li>
              <li>
                <div className="submenu--header">
                  Glow Picks
                </div>
              </li>
            </ul>
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
