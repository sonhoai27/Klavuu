import * as React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const localStyles = require('./App.css');

import { setLocalStyles } from '@app/stores/init';
import Layout from '@app/shared/layout';

interface IAppProps {
  setLocalStyles?: (styles: any) => void;
  isShowPhotoApp: boolean;
}
const Home  = () => (
  <div className="col-12"><h1>Home</h1></div>
)
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
          <Layout>
            <React.Suspense fallback={<div className="col-12">AAA</div>}>
              <Switch>
                <Route exact path="/" component={Home}/>
              </Switch>
            </React.Suspense>
          </Layout>
      </Router>
    )
  }
}

const mapStateToProps = storeState => ({
  localStyles: storeState.initReducer.localStyles,
  isShowPhotoApp: storeState.initReducer.isShowPhotoApp,
})

const mapDispatchToProps = {
  setLocalStyles,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
