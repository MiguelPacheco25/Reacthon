import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {About} from './components/About';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/about" element={<About/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
