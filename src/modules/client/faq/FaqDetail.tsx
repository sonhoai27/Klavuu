import * as React from 'react';
import { withNamespaces } from 'react-i18next';

import Breadcrumb from '@app/shared/Breadcrumb';
import Axios from 'axios';
import { API } from '@app/shared/const';

const S = require('../about/AboutUs.scss')

interface IClientFaqProps {
  t?: any;
  match?: any;
}

interface IClientFaqDetailStates {
  helpState: any;
}

class ClientFaqDetail extends React.Component<IClientFaqProps, IClientFaqDetailStates> {
  constructor(props) {
    super(props)

    this.state = {
      helpState: {},
    }
  }

  componentDidMount() {
    Axios.get(`${API}helps/${this.props.match.params.alias}`)
      .then((result) => {
        this.setState({
          helpState: result.data,
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container">
        <Breadcrumb
          items={[
            {
              title: this.props.t('HOME_PAGE'),
              href: '/',
              active: false,
            },
            {
              title: this.props.t('MENU_FAQS'),
              href: '/page/faqs',
              active: false,
            },
            {
              title: this.state.helpState.helps_name,
              href: '/page/faqs',
              active: true,
            },
          ]}
        />
        <div className="row">
          <div className="col-12">
            <h1 style={{ marginBottom: 32, marginTop: 64, lineHeight: 1 }}>
              {this.state.helpState.helps_name}
            </h1>
            <div className={S['faqs__img']}
              dangerouslySetInnerHTML={{ __html: this.state.helpState.helps_content }}/>
          </div>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(ClientFaqDetail)
