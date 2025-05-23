import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import React from 'react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('hospital');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  const handleSolutionsMouseEnter = () => {
    setShowSolutionsDropdown(true);
  };

  const handleSolutionsMouseLeave = () => {
    setShowSolutionsDropdown(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleViewDetails = (path) => {
    navigate(path);
    setShowSolutionsDropdown(false);
  };

  const handleWhatWeDoClick = (e) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    
    if (window.location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/?scrollTo=features');
    } else if (featuresSection) {
      // If already on home page, scroll to features
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-4 right-4 z-50">
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-black/30 rounded-2xl border border-cyan-400/20"></div>
        
        <div className="relative px-4 sm:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-cyan-400">
              EchoSense
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <a 
                href="#features"
                onClick={handleWhatWeDoClick}
                className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                What We Do
              </a>
              <div 
                className="relative"
                onMouseEnter={handleSolutionsMouseEnter}
                onMouseLeave={handleSolutionsMouseLeave}
              >
                <Link to="/solutions" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Solutions
                </Link>
                
                {/* Solutions Dropdown */}
                <AnimatePresence>
                  {showSolutionsDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-96 bg-black/80 backdrop-blur-xl rounded-xl border border-cyan-400/20 shadow-lg shadow-cyan-400/20 z-50"
                    >
                      <div className="p-4">
                        {/* Tab Navigation */}
                        <div className="flex border-b border-gray-700 mb-4">
                          <button
                            className={`px-4 py-2 ${activeTab === 'hospital' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-300'}`}
                            onClick={() => handleTabClick('hospital')}
                          >
                            Bias Detection 
                          </button>
                          <button
                            className={`px-4 py-2 ${activeTab === 'patient' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-300'}`}
                            onClick={() => handleTabClick('patient')}
                          >
                            Content Moderation 
                          </button>
                        </div>
                        
                        {/* Tab Content */}
                        {activeTab === 'hospital' ? (
                          <div className="flex space-x-4">
                            <div className="w-32 h-24 overflow-hidden rounded-lg">
                              <img 
                                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" 
                                alt="Hospital Dashboard Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium mb-1">Bias Detection</h4>
                              <p className="text-gray-300 text-sm mb-2">Comprehensive management system for hospitals</p>
                              <button 
                                className="text-sm bg-cyan-400 hover:bg-cyan-400-dark text-white px-3 py-1 rounded-full transition-colors"
                                onClick={() => handleViewDetails('/hpreview')}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex space-x-4">
                            <div className="w-32 h-24 overflow-hidden rounded-lg">
                              <img 
                                src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80" 
                                alt="Patient Dashboard Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium mb-1">Abusive </h4>
                              <p className="text-gray-300 text-sm mb-2">Patient-centric healthcare management</p>
                              <button 
                                className="text-sm bg-cyan-400 hover:bg-cyan-400-dark text-white px-3 py-1 rounded-full transition-colors"
                                onClick={() => handleViewDetails('/ppreview')}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/insights" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Insights
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">
                About Us
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="bg-cyan-400 hover:bg-cyan-400-dark text-white px-6 py-2 rounded-full transition-colors"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignup}
                className="bg-transparent hover:bg-cyan-400/10 text-cyan-400 px-6 py-2 rounded-full transition-colors border border-cyan-400"
              >
                Sign Up
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-gray-300 hover:text-cyan-400 transition-colors relative w-6 h-6"
                aria-label="Toggle menu"
              >
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 right-4 w-64 bg-black/30 backdrop-blur-xl rounded-2xl border border-cyan-400/20 z-50"
          >
            <div className="p-4 space-y-4">
              <Link 
                to="/" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#features"
                onClick={handleWhatWeDoClick}
                className="block text-gray-300 hover:text-cyan-400 transition-colors"
              >
                What We Do
              </a>
              <Link 
                to="/solutions" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                to="/insights" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Insights
              </Link>
              <Link 
                to="/about" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              <div className="space-y-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-cyan-400 hover:bg-cyan-400-dark text-white px-4 py-2 rounded-full transition-colors"
                  onClick={handleLogin}
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-transparent hover:bg-cyan-400/10 text-cyan-400 px-4 py-2 rounded-full transition-colors border border-cyan-400"
                  onClick={handleSignup}
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;