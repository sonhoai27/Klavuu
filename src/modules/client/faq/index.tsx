import * as React from 'react';
import { withNamespaces } from 'react-i18next';
import Axios from 'axios';
import { API } from '@app/shared/const';
import { Link } from 'react-router-dom';

const S = require('../about/AboutUs.scss')

interface IClientFaqProps {
  t?: any;
}

interface IClientFaqStates {
  helpsState: any,
}

class ClientFaq extends React.Component<IClientFaqProps, IClientFaqStates> {
  constructor(props) {
    super(props)
    this.state = {
      helpsState: [],
    }
  }

  componentDidMount() {
    Axios.get(`${API}helps`)
      .then((result) => {
        this.setState({
          helpsState: result.data,
        })
      })
      .catch(err => console.log(err))
  }

  renderListHelps = () => (
    this.state.helpsState
    && this.state.helpsState.length > 0
    && this.state.helpsState.map(element => (
      <div className="col-sm-3" key={Math.random()}>
        <div className={S['faqs__item']}>
          <Link to={`/page/faqs/${element.helps_alias}`}>
            {element.helps_name}
          </Link>
        </div>
      </div>
    ))
  )

  render() {
    return (
      <div className={S['about-us']}>
        <div className={S['about-us__banner']}>
          <p>{this.props.t('MENU_FAQS')}</p>
          <img
            // tslint:disable-next-line:max-line-length
            src="https://2.bp.blogspot.com/-kn_-Y1Q58o8/WXuY3xZKOFI/AAAAAAAABLI/dDQWWWHZeDQynREF9HvoG5FnhtUoZq_GgCLcBGAs/s1600/innisfree_banner.jpg"
            alt="" className="img-fluid" />
        </div>
        <div className={`${S['about-us__content']} container`}>
          <div className="row">
            {this.renderListHelps()}
          </div>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(ClientFaq)
