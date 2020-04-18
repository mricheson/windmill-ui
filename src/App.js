import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import GoogleSecurity from './component/GoogleSecurity';
import Layout from './component/Layout';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <GoogleSecurity>
        <Layout />
      </GoogleSecurity>
    </React.Fragment>
  );
}

export default App;
