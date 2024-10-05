import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import AddForm from './pages/AddForm'
import EmployeeDetails from './pages/EmployeeDetails'
import SingleEmployee from './pages/SingleEmployee';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Authusecontext from './context/authusecontext'
import Signup from './pages/signup';
import Login from './pages/login';

function App() {
  const { user } = Authusecontext()
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <EmployeeDetails /> : <Navigate to="/login" />} />
            <Route path="/addform" element={user ? <AddForm /> : <Navigate to="/login" />} />
            <Route path="/employee/:id" element={user ? <SingleEmployee /> : <Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
