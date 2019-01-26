import * as React from 'react';
import ValidateObject from '@app/shared/utils/ValidateObject';
import EscapeRegexCharacters from '@app/shared/utils/EscapeRegexCharacters';

const Styles = require('./Autocomplete.scss')

interface IAutocompleteProps {
  placeholder?: string;
  items: any[];
  onChange?: Function;
  config?: {
    value: string;
    text: string;
  }
  isMultiChooses?: boolean;
  onCreate?: (e) => void;
}

interface IAutocompleteStates {
  suggestions: any[];
  value: string;
  statusAdd: {
    code: number;
    isShowNotify: boolean;
  },
  isFocus: number;
}

class Autocomplete extends React.Component<IAutocompleteProps, IAutocompleteStates> {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      value: '',
      statusAdd: {
        code: 0,
        isShowNotify: false,
      },
      isFocus: -1,
    }
  }

  getSuggestions = (e) => {
    const { value } = e.target;
    const { items } = this.props;
    const escapedValue = EscapeRegexCharacters(value.trim());

    const suggestions = items.filter(
      el => el[this.props.config.text].toLowerCase().indexOf(escapedValue.toLowerCase()) > -1);

    if (value !== '') {
      this.setState({
        suggestions,
        value,
        isFocus: 1,
      })
    } else {
      this.setState({
        value: '',
        suggestions: [],
        isFocus: 0,
      })
    }
  };

  renderContent = () => {
    const { suggestions } = this.state;
    return (
      suggestions.length > 0
      && suggestions.map((e: any, index: number) => {
        return (
          <li
            key={index}
            onClick={() => {
              if (ValidateObject({
                name: 'isMultiChooses',
                object: this.props,
              })) {
                this.props.onChange(e)
              } else {
                this.setState({
                  suggestions: [],
                  value: '',
                }, () => {
                  this.props.onChange(e)
                })
              }
            }}
          >
            {e[this.props.config.text]}
          </li>
        )
      })
    )
  }

  renderContentWithAllItems = () => {
    const { items } = this.props;
    return (
      items.length > 0
      && items.map((e: any, index: number) => {
        return (
          <li
            key={index}
            onClick={() => {
              this.props.onChange(e)
            }}
          >
            {e[this.props.config.text]}
          </li>
        )
      })
    )
  }

  onClick = () => {
    this.setState({
      isFocus: 0,
    })
  }

  onBlur = () => {
    this.setState({
      isFocus: -1,
      suggestions: [],
      value: '',
    })
  }

  render() {
    return (
      <div className={Styles['autocomplete']}>
        <div className={Styles['autocomplete__input']}>
          <input
            onClick={this.onClick}
            onBlur={this.onBlur}
            value={this.state.value}
            type="text"
            onChange={this.getSuggestions}
            placeholder={ValidateObject({
              name: 'placeholder',
              object: this.props,
            })} />
            <span onClick={() => {
              this.setState({
                suggestions: [],
                value: '',
              })
            }}>X</span>
        </div>
        <div className={Styles['autocomplete__content-search']}>
          <ul className={Styles['autocomplete__items']}>
            {
              (this.state.isFocus === 1 && this.state.suggestions.length > 0)
              && this.renderContent()
            }
            {
              (this.state.isFocus === 0 && this.props.items.length > 0)
              && this.renderContentWithAllItems()
            }
          </ul>
          {
            this.state.value !== ''
            && (
              <div
                onClick={() => {
                  this.props.onCreate(this.state.value)
                }}
                className={Styles['autocomplete__add-new-item']}>
                + thêm mới { this.state.value }
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default Autocomplete
