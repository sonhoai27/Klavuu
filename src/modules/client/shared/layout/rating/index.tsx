import * as React from 'react';

const Styles = require('./rating.scss')

interface IRaterProps {
  disabled?: boolean;
  rating: number;
}

interface IRaterStates {
  rating: number;
  tempRating: any;
}

class Rater extends React.Component<IRaterProps, IRaterStates> {
  static defaultProps = {
    disabled: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      rating: this.props.rating,
      tempRating: null,
    }
  }

  onRate = (i) => {
    this.setState({
      rating: i,
      tempRating: i,
    })
  }

  onStarOut = () => {
    const { tempRating } = this.state;

    this.setState({
      rating: tempRating,
    })
  }

  onStarOver = (i) => {
    const { rating } = this.state;

    this.setState({
      rating: i,
      tempRating: rating,
    })
  }

  renderStars = () => {
    const stars = []

    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < 5; i++) {
      let klass = Styles['star-rating__star']

      if (this.state.rating >= i) {
        klass += ` ${Styles['is-selected']}`
      }

      // @ts-ignore
      stars.push(
        <label
          className={klass}
          onClick={() => !this.props.disabled && this.onRate(i)}
          onMouseOver={() => !this.props.disabled && this.onStarOver(i)}
          onMouseOut={() => !this.props.disabled && this.onStarOut()}
        >
           ★
        </label>,
      )
    }

    return (
      <div className={Styles['star-rating']}>
        {stars}
      </div>
    )
  }

  render() {
    return (
      this.renderStars()
    )
  }
}

export default Rater
