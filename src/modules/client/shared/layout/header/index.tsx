import * as React from 'react'
import { connect } from 'react-redux';

import './styles/index.scss'
import ActionHeader from './ActionHeader';
import PrimaryHeader from './PrimaryHeader';
import Alert from './Alert';

interface IHeaderProps {
  tagsForMenuState: any;
}

class Header extends React.Component<IHeaderProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <React.Fragment>
        <Alert/>
        <ActionHeader/>
        <PrimaryHeader menus={this.props.tagsForMenuState}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = storeState => ({
  tagsForMenuState: storeState.tagReducer.tagsForMenuState,
})

export default connect(mapStateToProps, null)(Header)
