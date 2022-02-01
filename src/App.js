import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <h1>Star Wars Planets - Trybe</h1>
      <Table />
    </Provider>
  );
}

export default App;
