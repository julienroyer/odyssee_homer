import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Signup from './Signup';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
export default () => <MuiThemeProvider theme={theme}><Signup /></MuiThemeProvider>;
