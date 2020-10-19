import theme from './theme';
import { UserStoreProvider } from './Stores/UserStore/UserStoreProvider';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import './style.scss';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <UserStoreProvider>
      <App />
    </UserStoreProvider>
  </ThemeProvider>, document.querySelector('#root'));