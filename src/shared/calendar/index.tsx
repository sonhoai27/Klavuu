import * as React from 'react';
import Icon from '@app/modules/client/shared/layout/Icon';

const S = require('./Calendar.scss')

interface ICalendarProps {
  onChange: (e) => void;
  default?: string;
}

interface ICalendarStates {
  date: {
    firstDay?: any;
    lastDay?: any;
    firstDay_day?: any;
    date?: any;
  },
  currentDate: any;
  chooseDate: any;
  isShowingCalendar: boolean;
}

class Calendar extends React.Component<ICalendarProps, ICalendarStates> {
  constructor(props) {
    super(props)
    this.state = {
      date: {
        date: new Date(),
      },
      currentDate: this.getCurrentDate(),
      chooseDate: '',
      isShowingCalendar: false,
    }
  }

  componentDidMount() {
    this.initDate(new Date(this.props.default ? this.props.default : ''))
  }

  initDate = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.setState({
      date: {
        date,
        firstDay,
        lastDay,
        firstDay_day: firstDay.getDay() > 0 ? firstDay.getDay() : 7,
      },
    })
  }

  renderListDate = () => {
    const firstDay_day = this.state.date.firstDay_day
    const lastDay = this.state.date.lastDay
    let len = 0;
    let ui = [];
    if (firstDay_day && lastDay) {
      len = lastDay.getDate() + firstDay_day - 1
      let row = [];
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 1; i <= len; i++) {
        if (i < firstDay_day) {
          row = [...row, <span className={S['UICalendar__row--null']} key={Math.random()} />]
        } else {
          row = [
            ...row,
            <span
              onClick={() => {
                const { date } = this.state.date
                const calDate = i - firstDay_day + 1
                const day = calDate >= 10 ? calDate : `0${calDate}`
                // tslint:disable-next-line:max-line-length
                const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`
                const chooseDate = `${date.getFullYear()}/${month}/${day}`

                this.setState({
                  date: {
                    ...this.state.date,
                    date: new Date(chooseDate),
                  },
                  currentDate: calDate,
                }, () => {
                  this.onClickDate(chooseDate)
                })
              }}
              className={`
                ${S['UICalendar__row__item']}
                ${this.state.currentDate === (i - firstDay_day + 1)
                  ? S['UICalendar__row__item--active']
                  : ''}
              `}
              key={Math.random()}>{i - firstDay_day + 1}</span>]
        }
        if ((Math.ceil(i / 7)) === 5 || (row.length > 0 && i === len)) {
          ui = [
            ...ui,
            React.createElement(
              'div',
              {
                className: S['UICalendar__row'],
                key: Math.random(),
              },
              row,
            ),
          ]
          row = []
        }
      }
    }
    return ui;
  }

  renderMonths = () => {
    const monthString = [
      {
        t: 'một',
        n: 1,
      },
      {
        t: 'hai',
        n: 2,
      },
      {
        t: 'ba',
        n: 3,
      },
      {
        t: 'tư',
        n: 4,
      },
      {
        t: 'năm',
        n: 5,
      },
      {
        t: 'sáu',
        n: 6,
      },
      {
        t: 'bảy',
        n: 7,
      },
      {
        t: 'tám',
        n: 8,
      },
      {
        t: 'chín',
        n: 9,
      },
      {
        t: 'mười',
        n: 10,
      },
      {
        t: 'mười một',
        n: 11,
      },
      {
        t: 'mười hai',
        n: 12,
      },
    ]

    return monthString.map(element => (
      <option key={element.t} value={element.n}>
        Tháng {element.t}
      </option>
    ))
  }

  renderYears = () => {
    const currentDate = new Date()

    let years = []

    // tslint:disable-next-line:no-increment-decrement
    for (let i = (currentDate.getFullYear() - 20); i < (currentDate.getFullYear() + 10); i++) {
      years = [...years, (
        <option value={i} key={i}>{i}</option>
      )]
    }

    return years;
  }

  onClickDate = date => this.props.onChange(date)

  getCurrentYear = (): any => this.state.date.date.getFullYear()

  getCurrentMonth = (): any => (this.state.date.date.getMonth() + 1)

  getCurrentDate = (): any => (new Date()).getDate()

  renderDays = () => {
    const days = ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'Cn']

    return days.map(element => (
      <span key={element}>{element}</span>
    ))
  }

  onNextDate = () => {
    const { date } = this.state.date
    const calMonth = (date.getMonth() + 2) > 12 ? 1 : (date.getMonth() + 2)
    const year = (date.getMonth() + 2) > 12 ? (date.getFullYear() + 1) : date.getFullYear()
    const month = calMonth >= 10 ? calMonth : `0${calMonth}`

    this.setState({
      currentDate: 1,
    }, () => this.initDate(new Date(`${year}/${month}/01`)))
  }

  onPrevDate = () => {
    const { date } = this.state.date
    const calMonth = date.getMonth() > 0 ? date.getMonth() : 12
    const year = date.getMonth() > 0 ? date.getFullYear() : (date.getFullYear() - 1)
    const month = calMonth >= 10 ? calMonth : `0${calMonth}`

    this.setState({
      currentDate: 1,
    }, () => this.initDate(new Date(`${year}/${month}/01`)))
  }

  showHideCalendar = () => this.setState({ isShowingCalendar: !this.state.isShowingCalendar })

  render() {
    return (
      <div className={S['UICalendar']}>
        <input placeholder={this.props.default} onClick={this.showHideCalendar}/>
        <div className={`
          ${S['UICalendar__main']}
          ${this.state.isShowingCalendar ? S['UICalendar__main--show'] : ''}
        `}>
          <div className={S['UICalendar__toolbar']}>
            <Icon name="chevron-left" onClick={this.onPrevDate} />
            <div className={S['UICalendar__toolbar__picker']}>
              <select value={this.getCurrentMonth()} onChange={(e) => {
                const { date } = this.state.date
                // @ts-ignore
                let month: any = Number(e.target.value)
                month = month >= 10 ? month : `0${month}`

                this.initDate(new Date(`${date.getFullYear()}/${month}/01`))
              }}>
                {this.renderMonths()}
              </select>
              <select value={this.getCurrentYear()} onChange={(e) => {
                const { date } = this.state.date
                // @ts-ignore
                const year: any = Number(e.target.value)

                this.initDate(new Date(`${year}/${date.getMonth() + 1}/${date.getDate()}`))
              }}>
                {this.renderYears()}
              </select>
            </div>
            <Icon name="chevron-right" onClick={this.onNextDate} />
          </div>
          <div className={S['UICalendar__days']}>
            {this.renderDays()}
          </div>
          {this.renderListDate()}
        </div>
      </div>
    )
  }
}

export default Calendar
