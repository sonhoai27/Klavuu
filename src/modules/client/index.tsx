import * as React from 'react';
import { setLocalStyles } from '@app/stores/init';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Layout from './shared/layout';

const Home = React.lazy(() => import(
  /*webpackChunkName: "client_home" */ '@app/modules/client/home'));

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
            <Switch>
              <Route exact path={match.url} component={Home}/>
            </Switch>
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
