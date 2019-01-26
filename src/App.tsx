import * as React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const localStyles = require('./App.css');

import { setLocalStyles } from '@app/stores/init';
import Layout from '@app/modules/client/shared/layout';

interface IAppProps {
  setLocalStyles?: (styles: any) => void;
}

const Client = React.lazy(() => import(
  /*webpackChunkName: "client" */ '@app/modules/client'));

const Admin = React.lazy(() => import(
  /*webpackChunkName: "admin" */ '@app/modules/admin'));

const Home = React.lazy(() => import(
  /*webpackChunkName: "client_home" */ '@app/modules/client/home'));

class App extends React.Component<IAppProps> {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.setLocalStyles(localStyles)
    if (!localStorage.getItem('admin') === null) {
      window.location.href = '/coming-soon.html'
    }
  }
  render() {

    return (
      <Router>
        <React.Suspense fallback={''}>
          <Switch>
            <Route exact path="/" render={props => <Layout><Home {...props}/></Layout>}/>
            <Route path="/page" component={Client}/>
            <Route path="/xxx" component={Admin}/>
          </Switch>
        </React.Suspense>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
