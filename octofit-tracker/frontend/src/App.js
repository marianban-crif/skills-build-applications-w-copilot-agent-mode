import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <span className="navbar-brand">OctoFit Tracker</span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink end to="/" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Activities</NavLink></li>
            <li className="nav-item"><NavLink to="/leaderboard" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Leaderboard</NavLink></li>
            <li className="nav-item"><NavLink to="/teams" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Teams</NavLink></li>
            <li className="nav-item"><NavLink to="/users" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Users</NavLink></li>
            <li className="nav-item"><NavLink to="/workouts" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Workouts</NavLink></li>
          </ul>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
