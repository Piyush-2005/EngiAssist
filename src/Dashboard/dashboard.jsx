import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FiUser, FiChevronDown, FiSettings, FiLogOut } from 'react-icons/fi';
import { AiOutlineFileText, AiOutlineRobot, AiOutlineFilePdf } from 'react-icons/ai';
import { BsCalculator } from 'react-icons/bs';
import { useAuth } from '../context/UseAuth.jsx';
import { useNavigate, Link } from 'react-router-dom';
import ServiceNavbar from '../components/ServiceNavbar';
import ChatButton from '../components/ChatButton.jsx';
const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 right-0 left-0 h-16 bg-gray-800/40 backdrop-blur-xl z-50 
        border-b border-gray-700/20 px-4 flex justify-between items-center">
        
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-cyan-400 hover:text-cyan-600 transition-colors"
        >
          EngiAssist
        </motion.a>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl 
              hover:bg-gray-700/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
              <FiUser className="text-white" />
            </div>
            <FiChevronDown className={`text-white transition-transform duration-200 
              ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800/80 backdrop-blur-xl 
              rounded-xl border border-gray-700/20 shadow-xl">
              <button className="flex items-center gap-3 w-full px-4 py-2 text-white 
                hover:bg-gray-700/30 transition-colors">
                <FiUser className="text-cyan-400" />
                <span>Profile</span>
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-2 text-white 
                hover:bg-gray-700/30 transition-colors">
                <FiSettings className="text-cyan-400" />
                <span>Settings</span>
              </button>
              <div className="my-1 border-b border-gray-700/20"></div>
              <button className="flex items-center gap-3 w-full px-4 py-2 text-red-400 
                hover:bg-gray-700/30 transition-colors" onClick={handleLogout}>
                <FiLogOut />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Service Navigation */}
      <div className="pt-16">
        <ServiceNavbar />
      </div>

      {/* Main Content with Service Cards */}
      <div id="main-content" className="transition-all duration-300">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-white pl-4 ml-8 mb-6">Welcome to EngiAssist</h1>
          
          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Resume Builder Card */}
            <Link to="/resume-creator">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-gray-700/50 hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <AiOutlineFileText className="text-2xl text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Resume Builder</h3>
                </div>
                <p className="text-gray-400">Create professional resumes with our AI-powered builder</p>
              </motion.div>
            </Link>

            {/* ATS Calculator Card */}
            <Link to="/ats-score-generator">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-gray-700/50 hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <BsCalculator className="text-2xl text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">ATS Score Calculator</h3>
                </div>
                <p className="text-gray-400">Check your resume's ATS compatibility score</p>
              </motion.div>
            </Link>

            {/* PDF Chatbot Card */}
            <Link to="/pdf-chat">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-gray-700/50 hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-yellow-500/20">
                    <AiOutlineFilePdf className="text-2xl text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">PDF Chatbot</h3>
                </div>
                <p className="text-gray-400">Chat with your PDF documents using AI</p>
              </motion.div>
            </Link>

            {/* AI Chatbot Card */}
            
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-gray-700/50 hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-red-500/20">
                    <AiOutlineRobot className="text-2xl text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Coding Resources</h3>
                </div>
                <p className="text-gray-400">Get the most relevant coding resources for all languages</p>
              </motion.div>
            <Link to="/chatbot">
              <ChatButton/>
            </Link>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;