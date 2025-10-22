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
    <div className="app-wrapper">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">OctoFit Tracker</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink end to="/" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Activities</NavLink></li>
              <li className="nav-item"><NavLink to="/leaderboard" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Leaderboard</NavLink></li>
              <li className="nav-item"><NavLink to="/teams" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Teams</NavLink></li>
              <li className="nav-item"><NavLink to="/users" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Users</NavLink></li>
              <li className="nav-item"><NavLink to="/workouts" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>Workouts</NavLink></li>
            </ul>
            <span className="navbar-text small text-muted">Fitness data dashboard</span>
          </div>
        </div>
      </nav>
      <main className="container pb-5">
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
