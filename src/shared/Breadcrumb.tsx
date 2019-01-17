import * as React from 'react'
import { Link } from 'react-router-dom';
const uuidv4 = require('uuid/v4');

const styles = require('./styles/Breadcrumb.scss')
interface IBreadCrumbProps {
  items: {
    title: string;
    href: string;
    active: boolean;
  }[]
}

const Breadcrumb = (props: IBreadCrumbProps) => {
  return (
    <ul className={`${styles['cn-breadcrumb']}`}>
      {
        props.items.length > 0
        && props.items.map((element) => {
          return (
            <li key={uuidv4()} className={element.active ? 'active' : styles['back']}>
              {element.active ? element.title : <Link to={element.href}>{element.title}</Link>}
            </li>
          )
        })
      }
    </ul>
  )
}

export default Breadcrumb
