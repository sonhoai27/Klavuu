import * as React from 'react';
import { Link } from 'react-router-dom';

const uuidv4 = require('uuid/v4');

import ValidateObject from '@app/shared/utils/ValidateObject';

const Styles = require('../styles/PrimaryHeader.scss')

interface ISubMenuProps {
  items?: {
    text: string;
    href: string;
  }[];
  className?: string;
  kv: {
    alias: string;
    name: string;
  },
  type: string;
}

const SubMenu = (props: ISubMenuProps) => {
  console.log(props)
  const MenuChildItem = (items, kv) => {
    if (items.child) {
      return (
        <ul>
          {
            items.child.map(element => (
              <li key={uuidv4()}>
                <Link to={`/page/products/${props.type}/${element[kv.alias]}`}>
                  {element[kv.name]}
                </Link>
              </li>
            ))
          }
        </ul>
      )
    }
    return <></>
  }

  const MenuParentItem = element => (
    <div className={Styles['submenu--header']}>
      <Link to={`/page/products/${props.type}/${element[props.kv.alias]}`}>
        {element[props.kv.name]}
      </Link>
    </div>
  )

  const MakeMenu = (items: any[]) => {
    let tempParentDom = []
    let tempChildrenDom = []
    if (items && items.length > 0) {

      items.map((element, index) => {
        if ((index + 1) % 5 === 0) {

          tempChildrenDom = [...tempChildrenDom, (
            <div className={Styles['item']} key={uuidv4()}>
              {MenuParentItem(element)}
              {MenuChildItem(element, props.kv)}
            </div>
          )]

          tempParentDom = [
            ...tempParentDom,
            React.createElement('div', {
              className: 'col-sm-3',
              key: uuidv4(),
            }, tempChildrenDom),
          ]

          tempChildrenDom = []
        } else {
          tempChildrenDom = [...tempChildrenDom, (
            <div className={Styles['item']} key={uuidv4()}>
              {MenuParentItem(element)}
              {MenuChildItem(element, props.kv)}
            </div>
          )]
        }
      })

      tempParentDom = [...tempParentDom, React.createElement('div', {
        className: `${Styles['item']} col-sm-3`,
        key: uuidv4(),
      }, tempChildrenDom)]

      return tempParentDom
    }
    return []
  }

  return (
    <div className={ValidateObject({ name: 'className', object: props })}>
      <div className="container">
        <div className="row">
          <div className="col-1" />
          <div className="col-10">
            <div className="row">
              {MakeMenu(props.items)}
            </div>
            <div className="row" id={Styles['show-all']}>
              <Link to="/page/products/all">Tất cả</Link>
            </div>
          <div className="col-1" />
        </div>
        </div>
      </div>
    </div>
  )
}

export default SubMenu

export {
  ISubMenuProps,
}
