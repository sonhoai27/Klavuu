import * as React from 'react';
import { connect } from 'react-redux';

class AdminLogin extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>Login</div>
    )
  }
}

// tslint:disable-next-line:no-unused
const mapStateToProps = storeState => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin)
