import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import initStore from '@app/Stores';
import App from '@app/App';
import { BrowserRouter } from 'react-router-dom';
import { API_CONFIG } from './configs';

const store = initStore({}, []);
render(
  <AppContainer>
  <Provider store={store}>
    <BrowserRouter basename={API_CONFIG().BASE}>
      <App/>
    </BrowserRouter>
  </Provider>
</AppContainer>,
  document.getElementById('root'),
);
