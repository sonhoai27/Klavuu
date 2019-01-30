import * as React from 'react';

import Icon from '../Icon';
import ValidateObject from '@app/shared/utils/ValidateObject';

interface IBackToTopProps {
  title: string;
  className?: string;
}

const BackToTop = (props: IBackToTopProps) => {
  return (
    <Icon
      className={ValidateObject({
        name: 'className',
        object: props,
      })}
      name="chevron-up">
        <p>{props.title}</p>
      </Icon>
  )
}

export default BackToTop
