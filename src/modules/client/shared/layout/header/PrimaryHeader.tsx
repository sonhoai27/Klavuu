import * as React from 'react';
import { Link } from 'react-router-dom';

const Styles = require('./styles/PrimaryHeader.scss')
import SubMenu from './components/SubMenu';
import { CDN } from '@app/shared/const';

interface IPrimaryHeaderProps {
  menus: any;
  settings: any;
  brands: any;
}

interface IPrimaryHeaderStates {
  choose: any;
}

class PrimaryHeader extends React.Component<IPrimaryHeaderProps, IPrimaryHeaderStates> {
  private menuRef;
  constructor(props) {
    super(props)
    this.state = {
      choose: '',
    }
  }

  componentWillMount() {
    window.addEventListener(
      'mousedown',
      this.onClickHideMenu,
      false,
    );
  }
  componentWillUnMount() {
    window.addEventListener(
      'mousedown',
      this.onClickHideMenu,
      false,
    );
  }

  onClickHideMenu = (e) => {
    try {
      if (!this.menuRef.contains(e.target)) {
        this.setState({
          choose: '',
        });
        return;
      }
    } catch (e) {}
  }

  isChoose = ({ menu, type, kv, items }) => (
    <SubMenu
      onCloseMenu={this.onCloseMenu}
      type={type}
      kv={kv}
      items={items}
      className={
        `${Styles['primary-menu__submenu']}
        ${Styles[this.state.choose === menu ? 'on' : 'off']}`
      } />
  )

  onCloseMenu = () => this.setState({ choose: '' })

  onSetCurrentItemMenu = (choose: string) => this.setState({ choose })

  render() {
    return (
      <div className={`${Styles['primary-header']} col-12`}>
        <div className="container">
          <div className={`${Styles['row']} row`}>
            <div className={Styles['primary-header__logo']}>
              <a href="/">
                {
                  this.props.settings.WEBSITE_LOGO
                  ? <img
                  src={`${CDN}icons/${this.props.settings.WEBSITE_LOGO}`}
                  className={`${Styles['logo']} img-fluid`} />
                  : 'ZONE 22'
                }
              </a>
            </div>
            <ul ref={node => this.menuRef = node}>
              <li>
                <a onClick={() => this.onSetCurrentItemMenu('shop-by')}>Shop By</a>
                {
                  this.isChoose({
                    menu: 'shop-by',
                    items: this.props.menus,
                    type: 't',
                    kv: {
                      alias: 'tag_alias',
                      name: 'tag_name',
                    },
                  })
                }
              </li>
              <li>
                <a onClick={() => this.onSetCurrentItemMenu('brands')}>Brands</a>
                  {
                  this.isChoose({
                    menu: 'brands',
                    items: this.props.brands,
                    type: 'b',
                    kv: {
                      alias: 'brand_alias',
                      name: 'brand_name',
                    },
                  })
                }
              </li>
              <li>
                <Link to="/page/about-us">About us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PrimaryHeader
