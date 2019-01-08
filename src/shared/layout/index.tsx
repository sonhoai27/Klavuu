import * as React from 'react';

import Header from './header';

interface ILayoutProps {
  children?: any;
  className?: string;
}

const Layout = (props: ILayoutProps) => (
  <div
    className={`col-12 ${props.className ? props.className : ''}`}>
    <div className="row">
      <Header/>
      {props.children}
    </div>
  </div>
);

export {
  ILayoutProps,
}

export default Layout
