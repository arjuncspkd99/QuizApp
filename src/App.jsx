import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'; // Corrected import statements
import QuizApp from "./components/QuizApp";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes> {/* Use Routes component instead of createRoutesFromElements */}
        <Route path="/" element={<Outlet />} errorElement={<Error to={"/"} />} >
          <Route index element={<Home />} />
          <Route path="quiz" element={<QuizApp />} /> {/* Use path instead of exact */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
