import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactApp from './componets/';


class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <MyAwesomeReactApp />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
