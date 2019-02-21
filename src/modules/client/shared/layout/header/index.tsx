import * as React from 'react'
import { connect } from 'react-redux';

import ActionHeader from './ActionHeader';
import PrimaryHeader from './PrimaryHeader';
import Alert from './Alert';
import PrimaryMenuForMobile from './components/PrimaryMenuForMobile';

interface IHeaderProps {
  tagsForMenuState: any;
  settingsState: any;
  brandsState: any;
}

class Header extends React.Component<IHeaderProps> {
  constructor(props) {
    super(props)
  }

  onDetectedWithSize = () => window.screen.width

  onShowPrimaryMenu = () => {
    if (this.onDetectedWithSize() >= 768) {
      return (
        <>
          <Alert settings={this.props.settingsState}/>
          <ActionHeader/>
          <PrimaryHeader
                brands={this.props.brandsState.data ? this.props.brandsState.data : []}
                settings={this.props.settingsState}
                menus={this.props.tagsForMenuState}/>
        </>
      )
    }

    return <PrimaryMenuForMobile
              brands={this.props.brandsState.data ? this.props.brandsState.data : []}
              settings={this.props.settingsState}
              menus={this.props.tagsForMenuState}/>
  }

  render() {
    return(
      <React.Fragment>
        {this.onShowPrimaryMenu()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = storeState => ({
  tagsForMenuState: storeState.tagReducer.tagsForMenuState,
  settingsState: storeState.initReducer.settingsState,
  brandsState: storeState.brandReducer.brandsState,
})

export default connect(mapStateToProps, null)(Header)
