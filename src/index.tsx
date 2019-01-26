import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import ErrorBoundary from './Configs/ErrorBoundary';
import initStore from '@app/stores';
import App from '@app/App';

// if (location.hostname === 'localhost' || location.protocol === 'http:') {
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () =>
//         navigator.serviceWorker.register('./sw.js')
//         .then(() => console.log('Service Worker registered'))
//         .catch(() => 'SW registration failed'));
//   }
// }

const store = initStore({}, []);
render(
  <ErrorBoundary>
    <AppContainer>
      <Provider store={store}>
        <App/>
      </Provider>
    </AppContainer>
  </ErrorBoundary>,
  document.getElementById('root'),
);
