import * as React from 'react';

import Icon from '../Icon';
import ValidateObject from '@app/shared/utils/ValidateObject';

interface IBackToTopProps {
  title: string;
  className?: string;
  scrollStepInPx?: number;
  delayInMs?: number;
}

let intervalId;
const BackToTop = (props: IBackToTopProps) => {
  const scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }

    window.scroll(0, window.pageYOffset - props.scrollStepInPx);
  }

  const scrollToTop = () => {
    intervalId = setInterval(scrollStep, props.delayInMs);
  }

  return (
    <Icon
      onClick={scrollToTop}
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
