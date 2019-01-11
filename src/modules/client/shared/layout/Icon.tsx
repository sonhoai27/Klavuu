import * as React from 'react'

const Icon = props => (
  <span {...props} className={`ic lnr lnr-${props.name} ${props.className ? props.className : ''}`}>
    {props.children ? props.children : ''}
  </span>
)

export default Icon
