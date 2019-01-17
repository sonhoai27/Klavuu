import * as React from 'react';

import Header from './header';

interface ILayoutProps {
  children?: any;
}

const Layout = (props: ILayoutProps) => (
  <>
    <div
      className="col-12">
      <div className="row">
        <Header />
      </div>
    </div>
    <div className="col-12">
      <div className="row">
      {props.children}
      </div>
    </div>
  </>
);

export {
  ILayoutProps,
}

export default Layout
