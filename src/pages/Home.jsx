import { motion } from 'framer-motion';
import BubbleBackground from '../components/BubbleBg';
import StarRing from '../components/StarRing';
import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Check if there's a scroll parameter in the URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('scrollTo') === 'features') {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        // Clean up the URL
        window.history.replaceState({}, '', '/');
      }
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-screen">
        <BubbleBackground />
        <StarRing />
        
        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-8 text-left lg:ml-4 xl:ml-40">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block"><span className="text-cyan-600">AI</span>-Powered Bias &</span>
              <span className="block">Abuse Detection</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl">
              <span className="block">Ensuring Fair and Safe Online Conversations</span>
              <span className="block">Powered by Advanced AI Technology</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-cyan-400 hover:bg-cyan-400-dark text-white px-8 py-3 rounded-full text-lg transition-colors">
                Try Detection
              </button>
              <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 rounded-full text-lg transition-colors">
                View Documentation
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Add id here */}
      <section id="features" className="py-32 bg-gradient-to-b from-[rgb(17,17,17)] to-[rgb(23,23,23)]">
        <div className="container mx-auto px-4 mb-16 group">
          <div className="text-center cursor-default">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 gradient-text-hover">
              What We Do
            </h2>
            <div 
              className="w-24 h-1 bg-cyan-400 mx-auto transform 
                transition-all duration-500 ease-in-out
                group-hover:w-48 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500
                group-hover:shadow-[0_0_15px_#06b6d4] group-hover:h-1.5"
            ></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-32 last:mb-0"
            >
              <div className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content Side */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-cyan-400">
                      <div className="w-10 h-10">
                        {feature.icon}
                      </div>
                    </div>
                    <h2 className="text-4xl font-bold text-white">
                      {feature.title}
                    </h2>
                  </div>

                  {/* Content Column */}
                  <div className="ml-14">
                    <p className="text-xl text-gray-300 leading-relaxed mb-8 text-justify">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
                          <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="relative bg-secondary-dark/30 p-8 rounded-2xl border border-cyan-400/20 overflow-hidden backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent backdrop-blur-md"></div>

                    <motion.img
                      src={feature.image}
                      alt={feature.title}
                      className="relative w-full h-[300px] object-cover rounded-xl shadow-lg shadow-cyan-400/10"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    // image: diagnosisImage,
    title: "Bias Detection",
    description: " Identifies explicit and implicit biases using NLP and machine learning, including transformer models.",
    features: [
      "Explicit & Implicit Bias Identification",
      "Advanced NLP & Machine Learning",
      "Transformer Model Integration",
      "AFair & Inclusive Content Moderation "
    ]
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    // image: treatmentImage,
    title: "Language Refinement",
    description: "Suggests alternative phrasing for neutrality and clarity. For example: Replacing biased words with neutral ones.",
    features: [
      "Neutrality Enhancement ",
      "Clarity Improvement ",
      "AI-Powered Rewriting",
      "Context-Aware Adjustments"
    ]
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    // image: trackingImage,
    title: "Value Proposition",
    description: " Faster, more accurate, and scalable solution compared to existing methods and manual review.",
    features: [
      "Speed & Efficiency",
      "Higher Accuracy",
      "Scalability",
      "Reduced Manual Effort"
    ]
  }
];

export default Home;
