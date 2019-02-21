import * as React from 'react';

interface TRuleProps {
  children: any;
  r: string;
  permision: any[],
}

class Rule extends React.Component<TRuleProps> {
  render() {
    const temp = this.props.permision.filter(e => this.props.r === e)

    if (temp.length > 0) {
      return this.props.children
      // tslint:disable-next-line:no-else-after-return
    } else {
      return (
        <span/>
      )
    }
  }
}

export default Rule
