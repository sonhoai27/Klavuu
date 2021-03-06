import * as React from 'react';

const Styles = require('./styles/Loading.scss')

const Loading  = () => (
  <div className={Styles['lds-spinner__main']}>
    <div className={Styles['lds-spinner']}>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  </div>
)

export default Loading
