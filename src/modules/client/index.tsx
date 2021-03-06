import * as React from 'react';
import { setLocalStyles } from '@app/stores/init';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Layout from './shared/layout';

const ProductDetail = React.lazy(() => import(
  /*webpackChunkName: "home_detail" */ '@app/modules/client/products/ProductDetail'));

const ProductList = React.lazy(() => import(
  /*webpackChunkName: "home_list_product" */ '@app/modules/client/products/ProductLists'));

interface IClientProps {
  match?: any;
}

class Client extends React.Component<IClientProps> {
  constructor(props) {
    super(props)
  }

  render() {
    const { match } = this.props;

    return (
      <Router>
        <Layout>
          <React.Suspense fallback={<div className="loading">loading...</div>}>
            <Route exact path={`${match.url}/product/:alias`} component={ProductDetail}/>
            <Route path={`${match.url}/products/:type/:alias`} component={ProductList}/>
          </React.Suspense>
        </Layout>
      </Router>
    )
  }
}

const mapStateToProps = storeState => ({
  localStyles: storeState.initReducer.localStyles,
})

const mapDispatchToProps = {
  setLocalStyles,
}

export {
  IClientProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
