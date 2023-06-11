import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../src/index.css';
import '../src/bootstrap.min.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import store from './store/store.js';

const initialOptions = {
  clientId: 'test',
  currency: 'USD',
  intent: 'capture',
  components: 'buttons',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={false} options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
