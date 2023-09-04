import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@material-tailwind/react';
import {Provider} from 'react-redux';
import store from './store/store.ts';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
