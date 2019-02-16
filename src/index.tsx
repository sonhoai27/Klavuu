import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import ErrorBoundary from './Configs/ErrorBoundary';
import initStore from '@app/stores';
import App from '@app/App';
import i18n from './services/i18n/i18n'; // initialized i18next instance

const store = initStore({}, []);
render(
  <ErrorBoundary>
    <AppContainer>
      <Provider store={store}>
        <I18nextProvider i18n={ i18n }>
          <App/>
        </I18nextProvider>
      </Provider>
    </AppContainer>
  </ErrorBoundary>,
  document.getElementById('root'),
);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () =>
//       navigator.serviceWorker.register('./sw.js')
//       .then(() => console.log('Service Worker registered'))
//       .catch(() => 'SW registration failed'));
// }
