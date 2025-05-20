import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import WhatWeDo from './pages/WhatWeDo';
import Solutions from './pages/Solutions';
import Insights from './pages/Insights';
import AboutUs from './pages/AboutUs';
import Signin from './pages/Signin';
import Dashboard from './Dashboard/dashboard';
import Signup from './pages/Signup';
import Chatbot from './pages/Chatbot';
import ATSScoreGenerator from './pages/ATSScoreGenerator';
import ResumeCreator from './pages/ResumeCreator';
import {AuthProvider} from './context/AuthContext';


// Components
import MainLayout from './components/MainLayout';

function App() {
  return (
    <AuthProvider>
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bias-dashboard" element={<Dashboard />} />
        <Route path="/abuse-dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/ats-score-generator" element={<ATSScoreGenerator />} />
        <Route path="/resume-creator" element={<ResumeCreator />} />



      </Routes>
    </Router>
    </AuthProvider>

  );
}

export default App;
