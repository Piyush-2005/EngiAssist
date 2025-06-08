import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiFileText, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ServiceNavbar from '../components/ServiceNavbar';
import Header from '../components/Header';

const ATSScoreGenerator = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) {
      alert('Please provide both resume and job description');
      return;
    }

    setIsLoading(true);
    // TODO: Implement API call to process resume and job description
    // const formData = new FormData();
    // formData.append('resume', resumeFile);
    // formData.append('jobDescription', jobDescription);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // TODO: Handle response
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <ServiceNavbar />
      <div id="main-content" className="transition-all duration-300 pt-16">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6"
            >
              <FiArrowLeft />
              <span>Back to Dashboard</span>
            </button>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              ATS Score Generator
            </h1>

            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/10 rounded-xl border border-gray-700/20 p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Resume Upload Section */}
                <div>
                  <label className="block text-white mb-2">Upload Resume (PDF)</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <FiUpload className="text-cyan-400 text-3xl" />
                      <span className="text-white">
                        {resumeFile ? resumeFile.name : 'Click to upload PDF'}
                      </span>
                      <span className="text-gray-400 text-sm">
                        Maximum file size: 5MB
                      </span>
                    </label>
                  </div>
                </div>

                {/* Job Description Section */}
                <div>
                  <label className="block text-white mb-2">Job Description</label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-48 bg-gray-800/50 text-white rounded-xl border border-gray-700/20 p-4 
                      focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="Paste the job description here..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 bg-cyan-500 text-white rounded-xl font-semibold 
                    hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg 
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                >
                  {isLoading ? 'Analyzing...' : 'Generate ATS Score'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreGenerator;