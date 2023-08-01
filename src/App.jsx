// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes, Outlet, useLocation, Link } from 'react-router-dom'; // Corrected import statements
import QuizApp from "./components/QuizApp";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizWrapper />} />
      </Routes>

    </Router>
  );
};

const QuizWrapper = () => {
  const location = useLocation();
  const { state } = location;

  if (!state || !state.name || !state.email) {
    return <Link to="/" />;
  }

  const { name, email } = state;
  return <QuizApp name={name} email={email} />;
};

export default App;