import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './component/Layout';
import { HashRouter as Router } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Layout />
      </Router>
    </React.Fragment>
  );
}

export default App;
