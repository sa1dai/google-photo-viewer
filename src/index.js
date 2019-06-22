import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from "src/components/app";
import { ServiceProvider } from 'src/hoc/service-context';
import GooglePhotosApiService from "src/google-photos-api-service";

import store from './store';

const service = new GooglePhotosApiService();

ReactDOM.render(
  <Provider store={store}>
    <ServiceProvider value={service}>
      <App />
    </ServiceProvider>
  </Provider>,
  document.getElementById('root')
);
