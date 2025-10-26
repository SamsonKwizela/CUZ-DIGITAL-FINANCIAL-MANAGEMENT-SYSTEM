
import './App.css';
import { MantineProvider } from '@mantine/core';
import { Login } from './auth/Login';
import { Hero } from './landingPage/Hero';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from './component/NavBar';
import { ContactUs } from './landingPage/contactUs';
import { ForgotPassword } from './auth/ForgotPassword';


function App() {



  return (
    
  <MantineProvider>
    <Navigation />
    <Router>
      <Routes>
        <Route path = "/" element={<Hero />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/contact" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </Router>


    
    
  </MantineProvider>

  );
}

export default App; 
