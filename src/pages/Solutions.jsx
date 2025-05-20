import { useNavigate } from 'react-router-dom';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import biasDetectionImg from '/assets/images/bias.webp';
// import abuseDetectionImg from '/assets/images/Abuse.jpg';
import { motion } from 'framer-motion';
const Solutions = () => {
  const navigate = useNavigate();
  
  const solutions = [
    {
      title: "Bias Detection Dashboard",
      image: biasDetectionImg,  // Remove the curly braces
      description: "Advanced platform for detecting and analyzing various forms of bias in text content, helping maintain ethical AI systems.",
      benefits: [
        "Real-time bias detection",
        "Multi-language support",
        "Bias pattern analysis",
        "Automated reporting",
        "Custom bias rule configuration",
        "Historical trend analysis"
      ],
      path: "/bias-dashboard"
    },
    {
      title: "Abuse Detection Dashboard", // Updated title to match the functionality
      image: abuseDetectionImg,  // Remove the curly braces
      description: "Advanced platform for detecting and analyzing abusive content, ensuring safe online spaces through automated content moderation.",
      benefits: [
        "Real-time abuse detection",
        "Multi-language support",
        "Pattern recognition",
        "Automated content filtering",
        "Custom moderation rules",
        "Incident reporting"
      ],
      path: "/abuse-dashboard"
    }
  ];

  const handleLearnMore = (e, path) => {
    e.preventDefault();
    
    // Use navigate for routing instead of changing location directly
    // If paths aren't set up yet, prevent default behavior until they're ready
    if (path) {
      navigate(path);
    } else {
      // Fallback if path isn't available - just prevent default behavior
      console.log("Path not yet available");
    }
  };

  return (
    <div className="min-h-screen bg-secondary-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center cursor-default group"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 gradient-text-hover">
              Our Solutions
            </h1>
            <div 
              className="w-24 h-1 bg-cyan-400 mx-auto transform 
                transition-all duration-500 ease-in-out
                group-hover:w-48 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500
                group-hover:shadow-[0_0_15px_#06b6d4] group-hover:h-1.5"
            ></div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 backdrop-blur-xl hover:border-primary/40 transition-colors overflow-hidden"
              >
                <div className="relative mb-6 rounded-xl overflow-hidden h-48">
                  <motion.img
                    src={solution.image}
                    alt={`${solution.title} Preview`}
                    className="w-full h-full object-fill rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 to-transparent"></div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {solution.title}
                </h2>
                <p className="text-gray-300 mb-6">
                  {solution.description}
                </p>
                <ul className="space-y-3">
                  {solution.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-primary-Default mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-cyan-400 hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-colors"
                  onClick={(e) => handleLearnMore(e, solution.path)}
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      

    </div>
  );
};

export default Solutions;
