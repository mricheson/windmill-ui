import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './component/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { isLoggedIn } from './store/Token';

const App = () => {
  const authenticated = isLoggedIn();
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Layout authenticated={authenticated} />
      </Router>
    </React.Fragment>
  );
};

export default App;
