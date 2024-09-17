import React from 'react';
import './App.css';
import RevenueTable from './components/RevenueTable';

function App() {
    return (
        <div className="App">
            <header className="App-header">
      <h1>Revenue Report</h1>
            </header>
        <RevenueTable />
        </div>
    );
}

export default App;
