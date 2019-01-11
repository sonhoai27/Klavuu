import * as React from 'react'

import './styles/index.scss'
import ActionHeader from './ActionHeader';
import PrimaryHeader from './PrimaryHeader';
import Alert from './Alert';

class Header extends React.Component {
  render() {
    return(
      <React.Fragment>
        <Alert/>
        <ActionHeader/>
        <PrimaryHeader/>
      </React.Fragment>
    )
  }
}

export default Header
