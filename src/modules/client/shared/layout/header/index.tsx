import * as React from 'react'
import { connect } from 'react-redux';

import './styles/index.scss'
import ActionHeader from './ActionHeader';
import PrimaryHeader from './PrimaryHeader';
import Alert from './Alert';
import { actionGetTagsForMenu } from '@app/stores/tag/TagActions';

interface IHeaderProps {
  tagsForMenuState: any;
  actionGetTagsForMenu: Function;
}

class Header extends React.Component<IHeaderProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actionGetTagsForMenu()
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

const mapDispatchToProps = {
  actionGetTagsForMenu,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
