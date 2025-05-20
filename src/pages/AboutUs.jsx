import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const AboutUs = () => {
  const stats = [
    {
      value: "1000+",
      label: "Content Reviews"
    },
    {
      value: "95%",
      label: "Detection Accuracy"
    },
    {
      value: "80%",
      label: "Bias Reduction"
    },
    {
      value: "24/7",
      label: "Support Available"
    }
  ];

  const team = [
    {
      name: "Manvi",
      role: "CEO & Founder",
      bio: "AI ethics expert with 15+ years of experience in content moderation.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Richa Shukla",
      role: "CTO",
      bio: "AI and machine learning specialist focused on bias detection solutions.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Piyush",
      role: "Head of Operations",
      bio: "Content moderation expert with focus on ethical AI implementation.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Ananya Singh",
      role: "Head of Research",
      bio: "Leading research initiatives in advanced bias detection algorithms and ML models.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Dev Patel",
      role: "Lead Engineer",
      bio: "Expert in developing scalable AI solutions for content moderation systems.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const location = useLocation();
  const pageOrder = ['/', '/what-we-do', '/solutions', '/insights', '/about'];
  const currentIndex = pageOrder.indexOf(location.pathname);
  const nextPath = pageOrder[(currentIndex + 1) % pageOrder.length];

  const getPageName = (path) => {
    switch(path) {
      case '/': return 'Home';
      case '/what-we-do': return 'What We Do';
      case '/solutions': return 'Solutions';
      case '/insights': return 'Insights';
      case '/about': return 'About Us';
      default: return 'Home';
    }
  };

  const nextPageName = getPageName(nextPath);

  return (
    <div className="min-h-screen bg-secondary-dark">
      <section className="relative pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center cursor-default group">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 gradient-text-hover">
              About EchoSense
            </h1>
            <div 
              className="w-24 h-1 bg-cyan-400 mx-auto transform 
                transition-all duration-500 ease-in-out
                group-hover:w-48 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500
                group-hover:shadow-[0_0_15px_#06b6d4] group-hover:h-1.5"
            ></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center px-4 mt-6">
            We're on a mission to revolutionize content moderation through intelligent bias detection and automated content analysis solutions.
          </p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 backdrop-blur-xl"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-xl text-gray-300">
                  To transform digital content moderation by leveraging AI and automation to create more ethical, bias-free online spaces. We strive to identify harmful content, optimize bias detection, and improve overall content quality.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 backdrop-blur-xl"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
                <p className="text-xl text-gray-300">
                  To be the global leader in bias detection and content moderation, setting new standards for ethical AI through innovative technology solutions.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center cursor-default group mb-12">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4 gradient-text-hover">
                Our Team
              </h2>
              <div 
                className="w-24 h-1 bg-cyan-400 mx-auto transform 
                  transition-all duration-500 ease-in-out
                  group-hover:w-48 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500
                  group-hover:shadow-[0_0_15px_#06b6d4] group-hover:h-1.5"
              ></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-secondary-dark/30 p-6 rounded-2xl border border-primary/20 backdrop-blur-xl text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <div className="text-cyan-400 mb-4">{member.role}</div>
                  <p className="text-gray-300">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Page Section */}
        <div className="mt-16">
          <Link to={nextPath}>
            <motion.div
              className="flex flex-col items-start gap-2 group cursor-pointer pl-4"
              whileHover="hover"
            >
              <span className="text-[30px] text-gray-400 group-hover:text-primary transition-colors">
                Next Page
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[70px] text-gray-400 group-hover:text-primary transition-colors font-semibold">
                  {nextPageName}
                </span>
                <motion.svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  variants={{
                    hover: {
                      rotate: 315,
                      transition: { 
                        duration: 0.3
                      }
                    }
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lg">
              © {new Date().getFullYear()} EchoSense. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-lg">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-lg">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;