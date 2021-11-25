import React, { useState } from 'react';
import SteamService from './api/SteamService';
import './App.css';
import AppSearch from './components/AppSearch';
import CookiePopup from './components/CookiePopup';
import UserViewer from './components/UserViewer';

function App() {
  const steamService = new SteamService();

  const [playerData, setPlayerData] = useState(undefined);
  const [error, setError] = useState(undefined);

  const renderView = () => {
    if (!playerData) {
      return (
        <>
          <AppSearch steamService={steamService} setPlayerData={setPlayerData} setError={setError} />
          {error && <p className="Error-Text">{error}</p>}
        </>
      )
    } else {
      return (
        <>
          <UserViewer playerData={playerData} />
          <button onClick={() => { setPlayerData(undefined) }}>
            Back
          </button>
        </>
      )
    }
  }

  return (
    <div className="App">
      <h1>Playtime Viewer</h1>
      <div className="App-Search">
        {renderView()}
      </div>
      <br/>
      <CookiePopup />
    </div>
  );
}

export default App;
