import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiCamera, FiSave, FiX } from 'react-icons/fi';
import Header from '../components/Header';
import ServiceNavbar from '../components/ServiceNavbar';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    location: 'New York, USA',
    bio: 'Software Engineer with passion for building products',
    education: [
      {
        degree: 'Bachelor of Technology',
        college: 'Example University',
        year: '2020-2024'
      }
    ],
    experience: [
      {
        title: 'Software Engineer',
        company: 'Tech Corp',
        duration: '2022-Present'
      }
    ],
    skills: {
      technical: ['React', 'JavaScript', 'Node.js'],
      soft: ['Leadership', 'Communication']
    }
  });

  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="pt-16">
        <ServiceNavbar />
        <div id="main-content" className="transition-all duration-300">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Profile Header */}
              <div className="relative mb-8">
                {/* Cover Image */}
                <div className="h-48 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-xl" />
                
                {/* Profile Picture */}
                <div className="absolute left-8 -bottom-16">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800">
                      {profileImage ? (
                        <img 
                          src={profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FiCamera size={32} />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-full 
                        hover:bg-cyan-600 transition-colors"
                    >
                      <FiCamera className="text-white" size={16} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Edit Button */}
                <div className="absolute top-4 right-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm 
                      text-white rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    {isEditing ? (
                      <>
                        <FiSave />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <FiEdit2 />
                        Edit Profile
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Profile Content */}
              <div className="mt-20 space-y-6">
                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="backdrop-blur-xl bg-white/10 rounded-xl border border-gray-700/20 p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileData.fullName}
                        disabled={!isEditing}
                        className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                          focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled={!isEditing}
                        className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                          focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        disabled={!isEditing}
                        className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                          focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Location</label>
                      <input
                        type="text"
                        value={profileData.location}
                        disabled={!isEditing}
                        className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                          focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="backdrop-blur-xl bg-white/10 rounded-xl border border-gray-700/20 p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Technical Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.technical.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Soft Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.soft.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Education & Experience */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="backdrop-blur-xl bg-white/10 rounded-xl border border-gray-700/20 p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Education & Experience</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg text-white mb-3">Education</h3>
                      {profileData.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="text-cyan-400">{edu.degree}</h4>
                          <p className="text-gray-400">{edu.college}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-lg text-white mb-3">Experience</h3>
                      {profileData.experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="text-cyan-400">{exp.title}</h4>
                          <p className="text-gray-400">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;