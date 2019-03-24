import * as React from 'react';
import { connect } from 'react-redux';

const S = require('./AboutUs.scss')

const AboutUS = (props) => {
  console.log(props)
  return (
    <div className={S['about-us']}>
      <div className={S['about-us__banner']}>
        <p>About Us</p>
        <img
          // tslint:disable-next-line:max-line-length
          src="https://2.bp.blogspot.com/-kn_-Y1Q58o8/WXuY3xZKOFI/AAAAAAAABLI/dDQWWWHZeDQynREF9HvoG5FnhtUoZq_GgCLcBGAs/s1600/innisfree_banner.jpg"
          alt="" className="img-fluid" />
      </div>
      <div className={`${S['about-us__content']} col-12`}>
        <div className="container"
          dangerouslySetInnerHTML={{ __html: props.settingsState.WEBSITE_ABOUTUS }}>
      </div>
      </div>
    </div>
  )
}

const mapStateToProps = storeState => ({
  settingsState: storeState.initReducer.settingsState,
})

export default connect(mapStateToProps, null)(AboutUS)
