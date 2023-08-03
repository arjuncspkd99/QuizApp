import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, useLocation, Link } from 'react-router-dom'; // Corrected import statements
import QuizApp from "./components/QuizApp";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<QuizApp />} />
      </Routes>
    </Router>
  );
};


export default App;
