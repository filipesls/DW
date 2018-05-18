import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ModalGallery from './components/ModalGallery'
// import Gallery from './components/Gallery'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Test - Filipe Santana</h1>
        </header>
        <div className="container">
          <ModalGallery />
          {/* <Gallery /> */}
        </div>
      </div>
    );
  }

}

export default App;
