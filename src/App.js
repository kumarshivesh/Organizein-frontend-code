// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Form from './pages/Form';
import Admin from './pages/Admin';
import AdminManagement from './pages/AdminManagement'; // New import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-management" element={<AdminManagement />} /> {/* New route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
