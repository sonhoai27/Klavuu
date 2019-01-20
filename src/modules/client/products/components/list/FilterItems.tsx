import * as React from 'react';
const uuidv4 = require('uuid/v4');

import Icon from '@app/modules/client/shared/layout/Icon';

interface IProductFilterItemsProps {
  items: any[];
  config: {
    key: string;
    value: string;
  };
  onRemove: Function;
}

class ProductFilterItems extends React.Component<IProductFilterItemsProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      this.props.items
      && this.props.items.map(element => (
        <li key={uuidv4()}>
          <span>{element[this.props.config.key]}</span>
          <Icon
            onClick={() => {
              this.props.onRemove && this.props.onRemove(element)
            }}
            name="cross" />
        </li>
      ))
    )
  }
}

export {
  ProductFilterItems,
}

export default ProductFilterItems
