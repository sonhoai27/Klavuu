import * as React from 'react';
import { Link } from 'react-router-dom';

const Styles = require('./Slider.scss')

interface ISliderProps {
  images: {
    title?: string;
    desc?: string;
    img: string;
  }[];
  autoChangeTime: number;
  height: number;
}
interface ISliderStates {
  activeSlide: number;
  prevSlide: number;
}

class Slider extends React.Component<ISliderProps, ISliderStates> {
  private changeTo = null;
  constructor(props) {
    super(props)
    this.state = {
      activeSlide: 0,
      prevSlide: 0,
    }
  }

  componentDidMount() {
    this.runAutoChange()
    setTimeout(() => {
      this.setState({
        activeSlide: 0,
      })
    }, 0)
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTo)
  }

  runAutoChange = (start: number = 1) => {
    this.changeTo = setTimeout(() => {
      this.changeSlides(1)
      this.runAutoChange(start)
    }, this.props.autoChangeTime)
  }

  changeSlides = (change: number) => {
    window.clearTimeout(this.changeTo)
    const { length } = this.props.images

    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change

    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;

    this.setState({
      activeSlide, prevSlide,
    }, () => {
      this.runAutoChange(activeSlide)
    })
  }

  handleActiveOrPrev = (index: number) => {
    const { activeSlide, prevSlide } = this.state

    if (activeSlide === index) return Styles['s--active']
    if (prevSlide === index) return Styles['s--prev']

    return ''
  }

  render() {

    return (
      // tslint:disable-next-line:max-line-length
      <div className={`${Styles['slider']} ${Styles['s--ready']}`} style={{ height: this.props.height }}>
        <div className={Styles['slider__slides']}>
          {
            this.props.images.map((slide: any, index: number) => (
              // tslint:disable-next-line:max-line-length
              <div className={`${Styles['slider__slide']} ${this.handleActiveOrPrev(index)}`} key={index}>
                <Link to={slide.url ? slide.url : '#'}>
                  <div className={Styles['slider__slide-content']}>
                    <h2 className={Styles['slider__slide-heading']}>
                      {slide.title ? slide.title : ''}
                    </h2>
                    <h3 className={Styles['slider__slide-description']}>
                      {slide.desc ? slide.desc : ''}
                    </h3>
                  </div>
                  <div className={Styles['slider__slide-image']}>
                    <img src={slide.img} className="img-fluid" />
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
        <div
          className={Styles['slider__control']}
          onClick={() => this.changeSlides(-1)} />
        <div
          className={`${Styles['slider__control']} ${Styles['slider__control--right']}`}
          onClick={() => this.changeSlides(1)} />
      </div>
    )
  }
}

export default Slider

export {
  ISliderProps,
  ISliderStates,
}
