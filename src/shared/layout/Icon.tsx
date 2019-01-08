import * as React from 'react'

interface IIconProps {
  children?: any;
  className?: string;
  name: string;
}

const Icon = (props: IIconProps) => (
  <span className={`ic lnr lnr-${props.name} ${props.className ? props.className : ''}`}>
    {props.children ? props.children : ''}
  </span>
)

export default Icon
