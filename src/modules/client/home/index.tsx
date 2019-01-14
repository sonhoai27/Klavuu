import * as React from 'react';

import Banner from './banner';

interface IHomeProps {
  match?: any;
}

class Home extends React.Component<IHomeProps> {
  constructor (props) {
    super(props)
    console.log(this.props.match)
  }

  render () {
    return (
      <div className="col-12">
        <div className="row">
          <Banner/>
        </div>
      </div>
    )
  }
}

export default Home
