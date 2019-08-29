import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import initStore from '@app/stores';
import App from '@app/App';

const store = initStore({}, []);
render(
  <AppContainer>
  <Provider store={store}>
    <App/>
  </Provider>
</AppContainer>,
  document.getElementById('root'),
);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () =>
//       navigator.serviceWorker.register('./sw.js')
//       .then(() => console.log('Service Worker registered'))
//       .catch(() => 'SW registration failed'));
// }
