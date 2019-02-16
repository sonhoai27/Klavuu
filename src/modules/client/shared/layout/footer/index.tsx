import * as React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

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
  t?: any;
}

class Footer extends React.Component<IFooterProps> {
  componentDidMount() {
    this.props.actionGetSettings()
  }
  render() {
    const { t } = this.props
    return (
      <div className={`${S['footer']} container`}>
        <BackToTop className={S['back-to-top']} title={t('HOME_BACK_TO_TOP')}/>
        <div className="col-12">
          <Socials t={t} items={socials} settings={this.props.settingsState}/>
        </div>
        <FooterLinks t={t} settings={this.props.settingsState}/>
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

const TFooter = withNamespaces()(Footer as any)

export default connect(mapStateToProps, mapDispatchToProps)(TFooter)
