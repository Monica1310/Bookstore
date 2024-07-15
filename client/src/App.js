import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Books from './Books';
import AddBook from './AddBook'; // Import AddBook component
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/addbook" element={<AddBook />} /> {/* Add route for AddBook */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
