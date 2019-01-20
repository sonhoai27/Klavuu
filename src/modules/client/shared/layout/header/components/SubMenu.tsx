import * as React from 'react';

import ValidateObject from '@app/shared/utils/ValidateObject';

const Styles = require('../styles/PrimaryHeader.scss')

interface ISubMenuProps {
  items: any[];
  className?: string;
}
const renderListBrandCatsOrCatBrand = (
  propsName: string,
  type: string,
  aliasOfType: string,
  nameOfType: string,
) => {
  let tempParentDom = []
  let tempChildrenDom = []

  if (this.props[propsName] && this.props[propsName].length > 0) {
    this.props[propsName].map((element, index) => {
      if ((index + 1) % 10 === 0) {
        tempParentDom = [...tempParentDom, React.createElement('div', {
          className: 'col-sm-4',
          key: uuidv4(),
        }, tempChildrenDom)]
        tempChildrenDom = []
      } else {
        tempChildrenDom = [...tempChildrenDom, (
          <li key={uuidv4()}>
            <Checkbox
              id={uuidv4()}
              onChange={() => {
                this.onFilterChange(type, {
                  title: element[nameOfType],
                  value: element[aliasOfType],
                })
              }}
              checked={
                this.state.filter[type].map(e => e.value).indexOf(element[aliasOfType]) !== -1
              }
              name={element[nameOfType]}
              value={element[aliasOfType]} />
          </li>
        )]
      }
    })
    if (this.props[propsName].length <= 10) {
      tempParentDom = [...tempParentDom, React.createElement('div', {
        className: 'col-sm-4',
        key: uuidv4(),
      }, tempChildrenDom)]
    }
    return tempParentDom
  }

  return []
}

const SubMenu = (props: ISubMenuProps) => {
  return (
    <div className={ValidateObject({ name: 'className', object: props })}>
      <div className="container">
        <div className="row">
          <div className="col-1" />
          <div className="col-10">
            <div className="row">
              {renderListBrandCatsOrCatBrand()}
            </div>
          </div>
          <div className="col-1" />
        </div>
      </div>
    </div>
  )
}

export default SubMenu

export {
  ISubMenuProps,
}
