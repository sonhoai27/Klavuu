import * as React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const localStyles = require('./App.css');

import { setLocalStyles } from '@app/stores/init';

interface IAppProps {
  setLocalStyles?: (styles: any) => void;
}

const Client = React.lazy(() => import(
  /*webpackChunkName: "client" */ '@app/modules/client'));

const Admin = React.lazy(() => import(
  /*webpackChunkName: "admin" */ '@app/modules/admin'));

class App extends React.Component<IAppProps> {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.setLocalStyles(localStyles)
  }
  render() {

    return (
      <Router>
        <React.Suspense fallback={''}>
          <Switch>
            <Route exact path="/" component={Client}/>
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
