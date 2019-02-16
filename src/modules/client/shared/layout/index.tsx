import * as React from 'react';

import Header from './header';
import Footer from './footer';

const S = require('./header/styles/index.scss')

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
    <div className={`${S['margin-top']} col-12`}>
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
