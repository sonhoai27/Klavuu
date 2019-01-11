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
    {props.children}
  </>
);

export {
  ILayoutProps,
}

export default Layout
