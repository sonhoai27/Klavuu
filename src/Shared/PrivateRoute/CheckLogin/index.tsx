import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { loadUser } from '@app/Stores/init';

interface IAppProps {
  loadUser: Function;
  history: any;
  user: any;
  isAuthenticated: any;
}

class CheckLoginLayout extends React.Component<IAppProps> {
  componentDidUpdate() {
    if (!this.props.user || !this.props.user.email) {
      this.props.loadUser()
      .then((result: any) => {
        if (!result.payload) {
          this.props.history.push('/login');
        }
      });
    }
  }

  render() {
    return (
      <>
      {this.props.children}
      </>
    );
  }
}

const mapDispatchToProps = {
  loadUser,
};

const mapStateToProps = (state: any) => ({
  user: state.initReducer.user,
  isAuthenticated: state.initReducer.isAuthenticated,
});

const WithRouter = connect(mapStateToProps, mapDispatchToProps)(CheckLoginLayout);

export default withRouter(WithRouter as any);
