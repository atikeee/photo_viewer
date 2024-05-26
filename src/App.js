import React from 'react';
import './App.css';
import ImageViewer from './components/ImageViewer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Personal Images</h1>
      </header>
      <ImageViewer />
    </div>
  );
}

export default App;
