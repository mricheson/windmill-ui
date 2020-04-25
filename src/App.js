import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './component/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Layout />
      </MuiPickersUtilsProvider>
    </Router>
  </React.Fragment>
);

export default App;
