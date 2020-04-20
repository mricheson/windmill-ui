import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './component/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router>
      <Layout />
    </Router>
  </React.Fragment>
);

export default App;
