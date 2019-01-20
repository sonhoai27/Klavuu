import * as React from 'react'

const Styles = require('./checbox.scss')

interface IRadioProps {
  name: string;
  value: string;
  onChange?: Function;
  label: string;
  id: string;
  checked?: boolean;
}

const Radio = (props: IRadioProps) => (
  <div className={Styles['cn-radio']}>
    <input id={props.id} type="radio" checked={props.checked} name={props.name}
      onChange={e => props.onChange(e)} value={props.value}/>
    <label htmlFor={props.id}>
      {props.label}
    </label>
  </div>
)

export default Radio
