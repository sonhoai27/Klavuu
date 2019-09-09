import * as React from 'react';

const tabStyles = require('./Tabs.scss')

interface ITabsProps {
  selected: number;
  children: any[];
}

interface ITabsStates {
  selected: any;
}

const TabPanel = (props: {
  children: any;
  title: string;
}) => <div>{props.children}</div>

class Tabs extends React.Component<ITabsProps, ITabsStates> {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
    }
  }

  componentDidMount() {
    this.setState({
      selected: this.props.selected,
    })
  }

  onChange = selected => this.setState({ selected })

  render() {
    return (
      <>
      <ul className={tabStyles['am-tabs']}>
        {this.props.children.map((elem, index) => {

          const style = index === this.state.selected
          ? `${tabStyles['am-tabs_item']} ${tabStyles['active']}`
          : tabStyles['am-tabs_item']

          return (
            <li
              className={style}
              key={index}
              onClick={() => this.onChange(index)}
            >
                {elem.props.title}
            </li>
          )
        })}
      </ul>
      <div className={tabStyles['am-tabs-content']}>{this.props.children[this.state.selected]}</div>
      </>
    )
  }
}

export default Tabs

export {
  ITabsProps,
  TabPanel,
}
