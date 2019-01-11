import * as React from 'react';

import Banner from './banner';

class Home extends React.Component {
  constructor (props) {
    super(props)
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
