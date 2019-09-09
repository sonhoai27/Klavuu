import * as React from 'react'
import { Link } from 'react-router-dom';

const styles = require('@app/Shared/Styles/Breadcrumb.scss')
interface IBreadCrumbProps {
  className: string;
  items: {
    title: string;
    href: string;
    active: boolean;
  }[]
}

const Breadcrumb = (props: IBreadCrumbProps) => {
  return (
    <ul className={`${props.className} ${styles['am-breadcrumb']}`}>
      {
        props.items.length > 0
        && props.items.map((element) => {
          return (
            <li key={element.title} className={element.active ? 'active' : styles['back']}>
              {element.active ? element.title : <Link to={element.href}>{element.title}</Link>}
            </li>
          )
        })
      }
    </ul>
  )
}

export default Breadcrumb
