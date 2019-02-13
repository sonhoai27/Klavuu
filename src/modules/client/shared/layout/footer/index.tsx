import * as React from 'react';
import { connect } from 'react-redux';

import BackToTop from './BackToTop';
import Socials from './components/Socials';
import FooterLinks from './components/FooterLinks';
import { actionGetSettings } from '@app/stores/init';

const S = require('./Footer.scss')

const socials = [
  {
    title: 'Facebook',
    icon: 'facebook.svg',
    href: 'FB',
  },
  {
    title: 'Twitter',
    icon: 'twitter.svg',
    href: 'TWITTER',
  },
  {
    title: 'Youtube',
    icon: 'youtube.svg',
    href: 'YOUTUBE',
  },
  {
    title: 'Instagram',
    icon: 'instagram.svg',
    href: 'INSTAGRAM',
  },
]

interface IFooterProps {
  actionGetSettings: Function;
  settingsState: any;
}

class Footer extends React.Component<IFooterProps> {
  componentDidMount() {
    this.props.actionGetSettings()
  }
  render() {
    return (
      <div className={`${S['footer']} container`}>
        <BackToTop className={S['back-to-top']} title="BACK TO TOP"/>
        <div className="col-12">
          <Socials items={socials} settings={this.props.settingsState}/>
        </div>
        <FooterLinks settings={this.props.settingsState}/>
      </div>
    )
  }
}
const mapStateToProps = storeState => ({
  settingsState: storeState.initReducer.settingsState,
})

const mapDispatchToProps = {
  actionGetSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
