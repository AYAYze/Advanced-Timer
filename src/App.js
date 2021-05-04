import React, { useState, useEffect } from 'react'
//import ReactDOM from 'react-dom';
import Timer from './Timer';
import './app.css';

function App() {
  const [timers, setTimers] = useState([]);
  const [addTimerName, setAddTimerName] = useState('');

  function addTimer(){
    setTimers(timers => { 
      if(!timers.some(timer => timer.name === addTimerName))
        return [...timers, { name:addTimerName }];
      else
        return [...timers];
    });
    setAddTimerName("");
  }

  function handleKeyDown(e){
    if(e.key === 'Enter') { //  
      addTimer();
    }
  }

  function remove(name) {
    setTimers(timers.filter(timer => !(timer.name === name)))
  }


  return (
    <div className="App">
      <div className="add-timer">
        <input type="text" value={addTimerName} onChange={e => setAddTimerName(e.target.value)} onKeyDown={handleKeyDown}/>
        <button onClick={addTimer}>{'+'}</button>
      </div>
      {
        timers.map((data, i) => <Timer key={data.name} name={data.name} remove={remove} />) 
      }
    </div>  
  );
}

export default App;
