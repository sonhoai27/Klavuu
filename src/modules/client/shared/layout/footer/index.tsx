import * as React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import BackToTop from './BackToTop';
import Socials from './components/Socials';
import FooterLinks from './components/FooterLinks';
import { actionGetSettings } from '@app/stores/init';
import InfoSection from './components/InfoSection';
import Instagram from './components/Instagram';
import Axios from 'axios';
import { INSTAGRAM } from '@app/shared/const';

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

interface IFooterStates{
  instagram: any;
}

class Footer extends React.Component<IFooterProps, IFooterStates> {
  constructor(props) {
    super(props)

    this.state = {
      instagram: [],
    }
  }

  componentDidMount() {
    this.props.actionGetSettings()
    Axios.get(INSTAGRAM)
    .then((result) => {
      this.setState({
        instagram: result.data,
      })
    })
    .catch(err => console.log(err))
  }
  render() {
    const { t } = this.props
    return (
      <div className={`${S['footer']} container`}>
        <Instagram data={this.state.instagram}/>
        <InfoSection t={t}/>
        <BackToTop
          scrollStepInPx={50}
          delayInMs={16.66}
          className={S['back-to-top']} title={t('HOME_BACK_TO_TOP')}/>
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
