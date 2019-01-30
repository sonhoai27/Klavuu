import * as React from 'react';

import Header from './header';
import Footer from './footer';

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
    <div
      className="col-12">
      <div className="row">
        <Footer />
      </div>
    </div>
  </>
);

export {
  ILayoutProps,
}

export default Layout
