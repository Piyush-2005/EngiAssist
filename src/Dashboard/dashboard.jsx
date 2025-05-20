import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX, FiMessageSquare, FiAlertTriangle, FiShield, FiClock, 
         FiUser, FiChevronDown, FiSettings, FiLogOut } from 'react-icons/fi';
// import biasDetectionImg from '/assets/images/bias.webp';
// import abuseDetectionImg from '/assets/images/Abuse.jpg';
import ATSimg from '/assets/images/ATSimg.png';
import Resume from '/assets/images/resume.png';
import PDFChat from '/assets/images/pdf-chat.jpg'
import Notes from '/assets/images/notes.png'

import ChatButton from '../components/ChatButton.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  
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

  const [pastChats] = useState([
    { 
      id: 1, 
      title: "Bias Analysis - Social Media Posts", 
      timestamp: "10 min ago" 
    },
    { 
      id: 2, 
      title: "Content Moderation - Blog Comments", 
      timestamp: "2h ago" 
    },
    { 
      id: 3, 
      title: "Hate Speech Detection Report", 
      timestamp: "5h ago" 
    },
    { 
      id: 4, 
      title: "Gender Bias Analysis - Job Listings", 
      timestamp: "Yesterday" 
    },
    { 
      id: 5, 
      title: "Forum Comments Analysis", 
      timestamp: "2 days ago" 
    },
    { 
      id: 6, 
      title: "AI Bias Detection - News Articles", 
      timestamp: "3 days ago" 
    },
    { 
      id: 7, 
      title: "Harassment Detection Report", 
      timestamp: "1 week ago" 
    },
    { 
      id: 8, 
      title: "Language Analysis - Support Tickets", 
      timestamp: "2 weeks ago" 
    }
  ]);

  return (
    <div className="flex h-screen bg-gray-900 relative">
      {/* Horizontal Navbar */}
      <div className={`fixed top-0 right-0 h-14 sm:h-16 bg-gray-800/40 backdrop-blur-xl z-50 
        border-b border-gray-700/20 px-2 sm:px-4 flex justify-between items-center transition-all duration-300
        ${isNavOpen ? 'left-0 lg:left-[280px]' : 'left-0'}`}>
        
        {/* Left section with menu button and logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="p-1.5 sm:p-2 rounded-xl backdrop-blur-xl bg-gray-600 border border-black 
              hover:bg-gray-800 transition-all duration-300"
          >
            {isNavOpen ? (
              <FiX size={18} className="text-white" />
            ) : (
              <FiMenu size={18} className="text-white" />
            )}
          </button>
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg sm:text-xl font-bold text-cyan-400 hover:text-cyan-600 transition-colors"
          >
            EchoSense
          </motion.a>
        </div>

        {/* Profile section remains unchanged */}
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

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 py-2 bg-gray-800/80 backdrop-blur-xl 
                  rounded-xl border border-gray-700/20 shadow-xl"
              >
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
                  hover:bg-gray-700/30 transition-colors">
                  <FiLogOut />
                  <span>Log Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Adjust main content padding to account for navbar */}
      <div className="pt-16 w-full overflow-x-hidden min-h-screen">
        <div className="flex flex-col lg:flex-row bg-gray-900 relative min-h-screen">
          {/* Spider Cursor Background */}
        {/* //   <div className="absolute inset-0 z-0">
          //     <SpiderCursor />
          //   </div> */}

          {/* Sidebar with Glassmorphism */}
          <AnimatePresence>
            {isNavOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed lg:relative top-16 bottom-0 left-0 backdrop-blur-xl bg-gray-800/40 shadow-xl z-50 border-r border-gray-800/50 overflow-y-auto"
              >
 

                {/* Past Chats List */}
                <div className="p-4 border-b border-gray-700/20">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center gap-2">
                      <FiClock className="text-cyan-600 text-lg" />
                      <h3 className="font-semibold text-white">Recent Sessions</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {pastChats.map((chat) => (
                      <motion.div
                        key={chat.id}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(55, 65, 81, 0.3)' }}
                        className="p-3 rounded-xl border border-gray-700/20 hover:shadow-lg 
                          transition-all duration-100 bg-gray-900"
                      >
                        <div className="flex items-center gap-3">
                          <FiMessageSquare className="text-cyan-600 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-white">{chat.title}</h3>
                            <p className="text-sm text-gray-400">{chat.timestamp}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content with Glassmorphism */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 lg:pl-16 z-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8"
            >
              AI Analysis Dashboard
            </motion.h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Bias Detection Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 sm:p-6 backdrop-blur-xl bg-white/10 rounded-xl border border-gray-700/20 
                  hover:shadow-xl transition-all duration-300 flex flex-col min-h-[350px]"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 bg-cyan-50 rounded-xl">
                    <FiAlertTriangle className="text-xl sm:text-2xl text-cyan-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">ATS Score</h2>
                </div>
                
                {/* Content Container */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-grow">
                  {/* Image Container */}
                  <div className="relative w-full sm:w-52 h-40 sm:h-52 rounded-xl overflow-hidden group flex-shrink-0">
                    <img 
                      src={ATSimg}
                      alt="ATS Illustration"
                      className="w-[90%] h-[90%] object-contain mx-auto my-auto transition-transform duration-300 
                        group-hover:scale-105"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="text-sm sm:text-base text-white leading-relaxed">
                      Instantly evaluate your resume with our ATS score tool. Get actionable feedback to boost job success.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/ats-score-generator')}
                      className="w-full mt-4 py-2 sm:py-3 px-4 bg-cyan-500 text-white rounded-xl font-semibold 
                        hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                      Start Analysis
                    </motion.button>
                  </div>
                </div>
              </motion.div>


              {/* Abusive Language Detection Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 sm:p-6 backdrop-blur-xl bg-white/10 rounded-xl border border-gray-700/20 
                  hover:shadow-xl transition-all duration-300 flex flex-col min-h-[350px]"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 bg-cyan-50 rounded-xl">
                    <FiShield className="text-xl sm:text-2xl text-cyan-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">AI Resume Creator</h2>
                </div>

                {/* Content Container */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-grow">
                  {/* Image Container */}
                  <div className="relative w-full sm:w-52 h-40 sm:h-52 rounded-xl overflow-hidden group flex-shrink-0">
                    <img 
                      src={Resume}
                      alt="Language Detection Illustration"
                      className="w-[90%] h-[90%] object-contain mx-auto my-auto transition-transform duration-300 
                        group-hover:scale-105"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="text-sm sm:text-base text-white leading-relaxed">
                      Create professional resumes effortlessly with our AI-powered builder. Customize and export in minutes.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/resume-creator')}
                      className="w-full mt-4 py-2 sm:py-3 px-4 bg-cyan-500 text-white rounded-xl font-semibold 
                        hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                      Create Resume
                    </motion.button>
                    
                  </div>
                </div>
              </motion.div>

              {/* Chat with PDF Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 sm:p-6 backdrop-blur-xl bg-white/10 rounded-xl border border-gray-700/20 
                  hover:shadow-xl transition-all duration-300 flex flex-col min-h-[350px]"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 bg-cyan-50 rounded-xl">
                    <FiMessageSquare className="text-xl sm:text-2xl text-cyan-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Chat with PDF</h2>
                </div>

                {/* Content Container */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-grow">
                  {/* Image Container */}
                  <div className="relative w-full sm:w-52 h-40 sm:h-52 rounded-xl overflow-hidden group flex-shrink-0">
                    <img 
                      src={PDFChat}
                      alt="PDF Chat Illustration"
                      className="w-[90%] h-[90%] object-contain mx-auto my-auto transition-transform duration-300 
                        group-hover:scale-105"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="text-sm sm:text-base text-white leading-relaxed">
                      Upload and chat with your PDF documents. Get instant answers and insights from your files.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 py-2 sm:py-3 px-4 bg-cyan-500 text-white rounded-xl font-semibold 
                        hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                      Upload PDF
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Notes Section Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 sm:p-6 backdrop-blur-xl bg-white/10 rounded-xl border border-gray-700/20 
                  hover:shadow-xl transition-all duration-300 flex flex-col min-h-[350px]"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 bg-cyan-50 rounded-xl">
                    <FiMessageSquare className="text-xl sm:text-2xl text-cyan-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Smart Notes</h2>
                </div>

                {/* Content Container */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-grow">
                  {/* Image Container */}
                  <div className="relative w-full sm:w-52 h-40 sm:h-52 rounded-xl overflow-hidden group flex-shrink-0">
                    <img 
                      src={Notes}
                      alt="Notes Illustration"
                      className="w-[90%] h-[90%] object-contain mx-auto my-auto transition-transform duration-300 
                        group-hover:scale-105"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="text-sm sm:text-base text-white leading-relaxed">
                      Create, organize, and enhance your notes with AI assistance. Generate summaries and key insights.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 py-2 sm:py-3 px-4 bg-cyan-500 text-white rounded-xl font-semibold 
                        hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                      Open Notes
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              <div className="z-50">
                <ChatButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;