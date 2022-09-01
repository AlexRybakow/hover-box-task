import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Field from './components/main/Field';
import SelectedItems from './components/sidebar/SelectedItems';
import AppContext from './context/AppContext';
import logo from './assets/table_cell.png';

const App = () => {
  const [mode, setMode] = useState(null);
  const [activeMode, setActiveMode] = useState(0);
  const [field, setField] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('https://demo7919674.mockable.io/');
        const data = await res.json();
        setMode(data);
        setError(null);
      } catch (err) {
        return new Error('No items');
      }
    }
    fetchItems();
  }, [])

  const selectMode = useCallback(e => {
    const chosenMode = +e.target.value;
    setActiveMode(chosenMode);

    if(mode) {
      setField(Array(chosenMode).fill(Array(chosenMode).fill(false)));
    }
  });

  const start = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setIsStarted(true);
  }, 2000);
}

const reset = () => {
  setActiveMode(0)
  setIsStarted(false);
  setField([])
}
  
  
  return (
    <AppContext.Provider value={{ field, setField }}>
    <div className="App">
      <div className={isStarted === false ? 'before-wrapper' : 'wrapper'}>
          <header>
            <div className="title">
            <img src={logo} className='logo' alt='image' />
            <h1 className='task-name'>"Hover Box"</h1>
            </div>
            <h2 className='task-descr'>Test task</h2>
          </header>
        <main>
          <div className='choose'>
            <select 
              className='choose-mode'
              value={activeMode} 
              onChange={selectMode}>
              <option value={0} disabled>Pick a mode</option>
                {mode && mode.map(({ field, name }) => (
                  <option value={field} key={field}>{name}</option>))}
            </select>
            <div className='button-section'>
            <button
                className='app-btn'
                onClick={start}
                disabled={activeMode === 0}
              ><span className='btn-text'>Start</span></button>
              <button
                className='app-btn'
                onClick={reset}
                disabled={isStarted === false}
              ><span className='btn-text'>Reset</span></button>
            </div>
          </div>
          {loading && <p className='loading-msg'>Loading...</p>}
          {error && <div>Data fetching failed, please try again.</div>}
          {isStarted && <Field /> }
        </main>
        {isStarted && 
          <div className="selected-section">
            <SelectedItems/>
          </div>
        }
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default App;
