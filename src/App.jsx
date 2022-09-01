import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Field from './components/Field';
import SelectedItems from './components/SelectedItems';
import AppContext from './context/AppContext';
import logo from './assets/table_cell.png';

const App = () => {
  const [mode, setMode] = useState(null);
  const [activeMode, setActiveMode] = useState(0);
  const [field, setField] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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

  const start = useCallback(() => setIsStarted(true), []);
  
  return (
    <AppContext.Provider value={{ field, setField }}>
    <div className="App">
      <div className={isStarted === false ? 'before-wrapper' : 'wrapper'}>
          <header>
            <img src={logo} className='logo' alt='logo' />
            <h1>Test task <span className='task-name'>"Hover Box"</span></h1>
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
            <button 
              className='start-btn'
              onClick={start} 
              disabled={activeMode === 0}
              ><span className='btn-text'>Start</span></button>
          </div>
          {loading && <p>Loading...</p>}
          {error && <div>Data fetching failed, please try again.</div>}
          {isStarted && 
            <Field />
          }
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
