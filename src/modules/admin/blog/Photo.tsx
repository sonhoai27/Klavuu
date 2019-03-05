import * as React from 'react';
import { connect } from 'react-redux';
import Icon from '@app/modules/client/shared/layout/Icon';

const S = require('./styles/Photo.scss')

class AdminPhoto extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={S['ui-photo']}>
        <div className={S['ui-photo__header']}>
          <span>Photo app</span>
          <Icon name="cross"/>
        </div>
        <div className={S['ui-photo__action']}>
        <Icon name="picture">Tải ảnh mới</Icon>
        </div>
        <div className={S['ui-photo__photos']}>
          <ul>
            <li>
              <img src="https://images.unsplash.com/flagged/photo-1551530891-42836e528e0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551667090-244e7178d53e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551651057-f3f83700a831?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/flagged/photo-1551530891-42836e528e0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551667090-244e7178d53e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551651057-f3f83700a831?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/flagged/photo-1551530891-42836e528e0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551667090-244e7178d53e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551651057-f3f83700a831?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/flagged/photo-1551530891-42836e528e0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551667090-244e7178d53e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551651057-f3f83700a831?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/flagged/photo-1551530891-42836e528e0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551667090-244e7178d53e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551651057-f3f83700a831?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/flagged/photo-1551530891-42836e528e0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551667090-244e7178d53e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551651057-f3f83700a831?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/flagged/photo-1551530891-42836e528e0d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551667090-244e7178d53e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1551651057-f3f83700a831?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjcwNjZ9" alt=""/>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

// tslint:disable-next-line:no-unused
const mapStateToProps = storeState => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPhoto)
