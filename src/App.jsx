
import React, { useState } from 'react';
import './App.css';
import WebTorrentPlayerComponent from './components/WebTorrentPlayer';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [magnetURI, setMagnetURI] = useState('');

  const handleLoadVideo = () => {
    setMagnetURI(inputValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WebTorrent Player</h1>
        <p>Paste a magnet link below and click "Load Video" to start playing.</p>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="magnet:?xt=urn:btih:..."
            style={{ width: '400px', marginRight: '10px' }}
          />
          <button onClick={handleLoadVideo}>Load Video</button>
        </div>
      </header>
      {/* The player component will only be rendered when a magnetURI is set */}
      {magnetURI && <WebTorrentPlayerComponent magnetURI={magnetURI} />}
    </div>
  );
}

export default App;
