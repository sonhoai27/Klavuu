import * as React from 'react'

const Styles = require('./checbox.scss')

interface IRadioProps {
  name: string;
  value: string;
  onChange?: Function;
  label: string;
  id: string;
}

const Radio = (props: IRadioProps) => (
  <div className={Styles['cn-radio']}>
    <input id={props.id} type="radio" name={props.name}
      onChange={e => props.onChange(e)} value={props.value}/>
    <label htmlFor={props.id}>
      {props.label}
    </label>
  </div>
)

export default Radio
