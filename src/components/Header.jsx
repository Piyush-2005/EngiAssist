import { motion } from 'framer-motion';
import { FiUser, FiChevronDown, FiSettings, FiLogOut } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/UseAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

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
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 shadow-lg z-50">
      <div className="h-full px-4 flex justify-between items-center max-w-7xl mx-auto">
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-cyan-400 hover:text-cyan-600 transition-colors"
        >
          EngiAssist
        </motion.a>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-700/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
              <FiUser className="text-white" />
            </div>
            <FiChevronDown className={`text-white transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
              <button className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-gray-700/30 transition-colors">
                <FiUser className="text-cyan-400" />
                <span>Profile</span>
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-gray-700/30 transition-colors">
                <FiSettings className="text-cyan-400" />
                <span>Settings</span>
              </button>
              <div className="my-1 border-b border-gray-700"></div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-gray-700/30 transition-colors"
              >
                <FiLogOut />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
