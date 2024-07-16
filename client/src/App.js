import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Books from './Books';
// import AddBook from './AddBook'; // Import AddBook component
import Authors from './Authors'; // Import the Authors component
import Genres from './Genres'; 
import { Link } from 'react-router-dom';
import AddBook from './AddBook';


function App() {
  return (
    <Router>
      
        <Navbar />
        <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/addbook" element={<AddBook/>} /> {/* Add route for AddBook */}
          <Route path="/authors" element={<Authors />} /> {/* Add Authors route */}
          <Route path="/genres" element={<Genres />} /> {/* Add Authors route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
