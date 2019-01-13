import React, { Component } from 'react';
import Container from './components/Container';

const appStyles = {
  textAlign: 'center',
  backgroundColor: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

class App extends Component {
  render() {
    return (
      <div style={appStyles}>
        <Container />
      </div>
    );
  }
}

export default App;
