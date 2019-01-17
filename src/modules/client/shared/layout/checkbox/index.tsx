import * as React from 'react'

const Styles = require('./checbox.scss')

interface ICheckboxProps {
  name: string;
  value: string;
  onChange?: Function;
  id: string;
}

const Checkbox = (props: ICheckboxProps) => (
  <div className={Styles['cn-checkbox']}>
    <input id={props.id} type="checkbox" name={props.name}
      onChange={e => props.onChange(e)} value={props.value}/>
    <label htmlFor={props.id}>
      {props.name}
    </label>
  </div>
)

export default Checkbox
