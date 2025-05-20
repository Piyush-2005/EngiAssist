import { motion } from 'framer-motion';
import React from 'react';

const Insights = () => {
  const insights = [
    {
      title: "The Future of AI Content Moderation",
      description: "Explore how advanced AI systems are revolutionizing content moderation and creating safer online spaces.",
      topics: [
        "AI Ethics",
        "Content Moderation",
        "Machine Learning",
        "User Safety"
      ],
      readTime: "5 min read"
    },
    {
      title: "Understanding Bias in AI Systems",
      description: "Deep dive into identifying and mitigating different types of bias in artificial intelligence systems.",
      topics: [
        "Bias Detection",
        "AI Fairness",
        "Model Training",
        "Ethical AI"
      ],
      readTime: "4 min read"
    },
    {
      title: "Advanced Abuse Detection Techniques",
      description: "Discover the latest strategies in detecting and preventing online abuse through AI-powered solutions.",
      topics: [
        "Abuse Prevention",
        "NLP",
        "Pattern Recognition",
        "Real-time Detection"
      ],
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center cursor-default group">
              <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 gradient-text-hover">
                AI Ethics Insights
              </h1>
              <div 
                className="w-24 h-1 bg-cyan-400 mx-auto transform 
                  transition-all duration-500 ease-in-out
                  group-hover:w-48 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500
                  group-hover:shadow-[0_0_15px_#06b6d4] group-hover:h-1.5"
              ></div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mt-6">
              Empowering digital spaces through ethical AI. Join us in creating a more inclusive online world where bias is detected, abuse is prevented, and every voice is heard with respect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-secondary-dark/30 p-8 rounded-2xl border border-primary/20 backdrop-blur-xl hover:border-primary/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    {insight.title}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {insight.readTime}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">
                  {insight.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {insight.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-Default/10 text-primary-Default rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-transparent hover:bg-primary-Default/10 text-primary-Default px-6 py-3 rounded-full transition-colors border border-primary"
                >
                  Read Article
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;