import * as React from 'react'

const Styles = require('./checbox.scss')

interface ICheckboxProps {
  name: string;
  value: string;
  onChange?: Function;
  id: string;
  checked?: boolean;
}

const Checkbox = (props: ICheckboxProps) => (
  <div className={Styles['cn-checkbox']}>
    <input id={props.id} type="checkbox" checked={props.checked} name={props.name}
      onChange={e => props.onChange(e)} value={props.value}/>
    <label htmlFor={props.id}>
      {props.name}
    </label>
  </div>
)

export default Checkbox
