import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const ServiceNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Add effect to manage body margin
  useEffect(() => {
    const content = document.getElementById('main-content');
    if (content) {
      content.style.marginLeft = isOpen ? '256px' : '0'; // 256px = 16rem (w-64)
      content.style.transition = 'margin-left 300ms ease-in-out';
    }
  }, [isOpen]);

  const navItems = [
    { title: 'Resume Creator', path: '/resume-creator', icon: '📝' },
    { title: 'Chat with PDF', path: '/pdf-chat', icon: '💬' },
    { title: 'PDF Operations', path: '/pdf-ops', icon: '📄' },
    { title: 'ATS Score Calculator', path: '/ats-calculator', icon: '🎯' },
    { title: 'Notes Section', path: '/notes', icon: '📔' },
    { title: 'Question Practice', path: '/practice', icon: '✍️' },
    { title: 'Coding Resources', path: '/coding', icon: '💻' },
    { title: 'Quiz', path: '/quiz', icon: '❓' }
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-20 left-4 z-40 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 shadow-lg
          transition-transform duration-300 ${isOpen ? 'translate-x-64' : 'translate-x-0'}`}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Vertical Navbar */}
      <nav 
        className={`fixed left-0 top-16 h-screen bg-gray-800/95 backdrop-blur-sm text-white w-64 
        transform transition-transform duration-300 ease-in-out shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-30`}
      >
        <div className="py-6">
          <div className="flex flex-col space-y-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium 
                transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-gray-900/80 text-white'
                    : 'text-gray-300 hover:bg-gray-700/80 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default ServiceNavbar;