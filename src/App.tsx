import * as React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
// @ts-ignore
import Loadable from 'react-loadable';

import Layout from '@app/modules/client/shared/layout';

const localStyles = require('./App.css');

import { setLocalStyles } from '@app/stores/init';
import GlobalLoading from './shared/global-loading';

interface IAppProps {
  setLocalStyles?: (styles: any) => void;
}

const Client = Loadable({
  loader: () => import(
    /*webpackChunkName: "client" */ '@app/modules/client'),
  loading: () => <GlobalLoading/>,
});

const Admin = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin" */ '@app/modules/admin'),
  loading: () => <GlobalLoading/>,
});

const Home = Loadable({
  loader: () => import(
    /*webpackChunkName: "client_home" */ '@app/modules/client/home'),
  loading: () => <GlobalLoading/>,
});

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
      <Router basename="/dev/">
        <Switch>
          {/* <Route exact path="/" render={props => <Layout><Home {...props}/></Layout>}/>
          <Route path="/page" component={Client}/> */}
          <Route path="/xxx" component={Admin}/>
          <Redirect from="/" to="/xxx"/>
        </Switch>
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
