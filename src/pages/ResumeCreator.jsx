import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPlus, FiTrash2, FiDownload, FiEye, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePDF } from 'react-to-pdf';
import ResumePreview from '../components/ResumePreview';
import ServiceNavbar from '../components/ServiceNavbar';
import Header from '../components/Header';

// Form validation schema
const resumeSchema = z.object({
  personal: z.object({
    fullName: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
    location: z.string().min(2, 'Location is required'),
    linkedin: z.string().url().optional(),
    portfolio: z.string().url().optional(),
  }),
  education: z.array(z.object({
    degree: z.string().min(2, 'Degree is required'),
    college: z.string().min(2, 'college is required'),
    location: z.string().min(2, 'Location is required'),
    startDate: z.string().min(4, 'Graduation start year is required'),
    endDate: z.string().min(4, 'Graduation end year is required'),
    gpa: z.string().optional(),
  })),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.array(z.string()),
  })).optional(),
  skills: z.object({
    technical: z.array(z.string()),
    soft: z.array(z.string()),
  }).optional(),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.string(),
    link: z.string().url().optional(),
  })).optional(),
});

// Add degree options array
const degreeOptions = [
  "Bachelor of Engineering (B.E.)",
  "Bachelor of Technology (B.Tech)",
  "Bachelor of Science (B.S.)",
  "Bachelor of Arts (B.A.)",
  "Bachelor of Commerce (B.Com)",
  "Master of Engineering (M.E.)",
  "Master of Technology (M.Tech)",
  "Master of Science (M.S.)",
  "Master of Arts (M.A.)",
  "Master of Business Administration (MBA)",
  "Doctor of Philosophy (Ph.D.)",
  "Associate Degree",
  "High college Diploma",
  "Other"
];

const ResumeCreator = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toPDF, targetRef } = usePDF({
    filename: 'resume.pdf',
    page: { margin: 20 }
  });

  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personal: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: ''
      },
      education: [{
        degree: '',
        college: '',
        location: '',
        startDate: new Date().getFullYear().toString(), // current year as default
        endDate: (new Date().getFullYear() + 4).toString(), // current year + 4 as default
        gpa: ''
      }],
      experience: [{
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ['']
      }],
      skills: {
        technical: [''],
        soft: ['']
      },
      projects: [{
        name: '',
        description: '',
        technologies: '',
        link: ''
      }]
    }
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = 
    useFieldArray({ control, name: 'education' });
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = 
    useFieldArray({ control, name: 'experience' });
  const { fields: projectFields, append: appendProject, remove: removeProject } = 
    useFieldArray({ control, name: 'projects' });

  const onSubmit = async (data) => {
    try {
      // Format experience descriptions from string to array
      const formattedData = {
        ...data,
        experience: data.experience?.map(exp => ({
          ...exp,
          description: exp.description.toString().split('\n')
        }))
      };

      // Call AI processing endpoint
      const response = await fetch('/api/process-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error('Failed to process resume');
      }

      // Show preview with processed data
      setIsPreviewOpen(true);
      
      // Generate PDF using the existing toPDF function
      await toPDF();

    } catch (error) {
      console.error('Error processing resume:', error);
      // Add error handling UI feedback here
    }
  };

  const exportAsPDF = async () => {
    try {
      await toPDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleNext = () => {
    const sections = ['personal', 'education', 'experience', 'skills', 'projects'];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const addSkill = (type) => {
    const currentSkills = watch(`skills.${type}`);
    setValue(`skills.${type}`, [...currentSkills, '']);
  };

  const removeSkill = (type, index) => {
    const currentSkills = watch(`skills.${type}`);
    setValue(
      `skills.${type}`,
      currentSkills.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="pt-16"> {/* Add padding-top to account for fixed header */}
        <ServiceNavbar />
        <div id="main-content" className="transition-all duration-300">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Navigation and Header */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                >
                  <FiArrowLeft />
                  <span>Back to Dashboard</span>
                </button>
              
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg"
                  >
                    <FiEye />
                    Preview
                  </motion.button>
                
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={exportAsPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg"
                  >
                    <FiDownload />
                    Export PDF
                  </motion.button>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Section Navigation */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['personal', 'education', 'experience', 'skills', 'projects'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2
                        ${activeSection === section 
                          ? 'bg-cyan-500 text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                      <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                      {(section === 'experience' || section === 'skills' || section === 'projects') && (
                        <span className="text-xs text-gray-400">(Optional)</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Form Sections */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="backdrop-blur-xl bg-white/10 rounded-xl border border-gray-700/20 p-6"
                >
                  {/* Personal Information Section */}
                  {activeSection === 'personal' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white mb-2">Full Name</label>
                        <input
                          {...register('personal.fullName')}
                          className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                        {errors.personal?.fullName && (
                          <span className="text-red-400 text-sm mt-1">
                            {errors.personal.fullName.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-white mb-2">Email</label>
                        <input
                          {...register('personal.email')}
                          className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                        {errors.personal?.email && (
                          <span className="text-red-400 text-sm mt-1">
                            {errors.personal.email.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-white mb-2">Phone</label>
                        <input
                          {...register('personal.phone')}
                          className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                        {errors.personal?.phone && (
                          <span className="text-red-400 text-sm mt-1">
                            {errors.personal.phone.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-white mb-2">Location</label>
                        <input
                          {...register('personal.location')}
                          className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                        {errors.personal?.location && (
                          <span className="text-red-400 text-sm mt-1">
                            {errors.personal.location.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-white mb-2">LinkedIn</label>
                        <input
                          {...register('personal.linkedin')}
                          className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Portfolio</label>
                        <input
                          {...register('personal.portfolio')}
                          className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                      </div>
                    </div>
                  )}

                  {/* Education Section */}
                  {activeSection === 'education' && (
                    <div className="space-y-6">
                      {educationFields.map((edu, index) => (
                        <div key={edu.id} className="border border-gray-700/20 rounded-lg p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white mb-2">Degree</label>
                              <select
                                {...register(`education.${index}.degree`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              >
                                <option value="">Select Degree</option>
                                {degreeOptions.map((degree) => (
                                  <option key={degree} value={degree}>
                                    {degree}
                                  </option>
                                ))}
                              </select>
                              {errors.education?.[index]?.degree && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.education[index].degree.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">College</label>
                              <input
                                {...register(`education.${index}.college`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.education?.[index]?.college && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.education[index].college.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">Location</label>
                              <input
                                {...register(`education.${index}.location`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.education?.[index]?.location && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.education[index].location.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">Graduation Start Year</label>
                              <input
                                {...register(`education.${index}.startDate`)}
                                type="number"
                                min="1900"
                                max="2099"
                                placeholder="YYYY"
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.education?.[index]?.startDate && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.education[index].startDate.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">Graduation End Year</label>
                              <input
                                {...register(`education.${index}.endDate`)}
                                type="number"
                                min="1900"
                                max="2099"
                                placeholder="YYYY"
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.education?.[index]?.endDate && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.education[index].endDate.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">GPA</label>
                              <input
                                {...register(`education.${index}.gpa`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              type="button"
                              onClick={() => removeEducation(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendEducation({ 
                          degree: '', 
                          college: '', 
                          location: '', 
                          startDate: new Date().getFullYear().toString(),
                          endDate: (new Date().getFullYear() + 4).toString(),
                          gpa: '' 
                        })}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                      >
                        <FiPlus /> Add Education
                      </button>
                    </div>
                  )}

                  {/* Experience Section */}
                  {activeSection === 'experience' && (
                    <div className="space-y-6">
                      {experienceFields.map((exp, index) => (
                        <div key={exp.id} className="border border-gray-700/20 rounded-lg p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white mb-2">Job Title</label>
                              <input
                                {...register(`experience.${index}.title`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.experience?.[index]?.title && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.experience[index].title.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">Company</label>
                              <input
                                {...register(`experience.${index}.company`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.experience?.[index]?.company && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.experience[index].company.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">Location</label>
                              <input
                                {...register(`experience.${index}.location`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.experience?.[index]?.location && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.experience[index].location.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">Start Date</label>
                              <input
                                {...register(`experience.${index}.startDate`)}
                                type="date"
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.experience?.[index]?.startDate && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.experience[index].startDate.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">End Date</label>
                              <input
                                {...register(`experience.${index}.endDate`)}
                                type="date"
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.experience?.[index]?.endDate && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.experience[index].endDate.message}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-4 mt-4">
                            <div>
                              <label className="block text-white mb-2">Description</label>
                              <textarea
                                {...register(`experience.${index}.description`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                rows="3"
                              />
                              {errors.experience?.[index]?.description && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.experience[index].description.message}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            {(experienceFields.length > 1 || 
                              watch(`experience.${index}.title`) || 
                              watch(`experience.${index}.company`) || 
                              watch(`experience.${index}.location`) || 
                              watch(`experience.${index}.description`)) && (
                              <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <FiTrash2 />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendExperience({ title: '', company: '', location: '', startDate: '', endDate: '', description: [''] })}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                      >
                        <FiPlus /> Add Experience
                      </button>
                    </div>
                  )}

                  {/* Skills Section */}
                  {activeSection === 'skills' && (
                    <div className="space-y-4">
                      {['technical', 'soft'].map((type) => (
                        <div key={type}>
                          <h3 className="text-lg font-semibold text-white mb-4 capitalize">{type} Skills</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {watch(`skills.${type}`)?.map((_, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <input
                                  {...register(`skills.${type}.${index}`)}
                                  placeholder={`Enter ${type} skill`}
                                  className="flex-1 bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                />
                                {(watch(`skills.${type}`).length > 1 || watch(`skills.${type}.${index}`)) && (
                                  <button
                                    type="button"
                                    onClick={() => removeSkill(type, index)}
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <FiTrash2 />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => addSkill(type)}
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mt-2"
                          >
                            <FiPlus /> Add {type} Skill
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Projects Section */}
                  {activeSection === 'projects' && (
                    <div className="space-y-6">
                      {projectFields.map((proj, index) => (
                        <div key={proj.id} className="border border-gray-700/20 rounded-lg p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white mb-2">Project Name</label>
                              <input
                                {...register(`projects.${index}.name`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.projects?.[index]?.name && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.projects[index].name.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">Technologies</label>
                              <input
                                {...register(`projects.${index}.technologies`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                              {errors.projects?.[index]?.technologies && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.projects[index].technologies.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <label className="block text-white mb-2">Link</label>
                              <input
                                {...register(`projects.${index}.link`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-4 mt-4">
                            <div>
                              <label className="block text-white mb-2">Description</label>
                              <textarea
                                {...register(`projects.${index}.description`)}
                                className="w-full bg-gray-800/50 text-white rounded-lg border border-gray-700/20 p-3 
                                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                rows="3"
                              />
                              {errors.projects?.[index]?.description && (
                                <span className="text-red-400 text-sm mt-1">
                                  {errors.projects[index].description.message}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            {(projectFields.length > 1 || 
                              watch(`projects.${index}.name`) || 
                              watch(`projects.${index}.description`) || 
                              watch(`projects.${index}.technologies`) || 
                              watch(`projects.${index}.link`)) && (
                              <button
                                type="button"
                                onClick={() => removeProject(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <FiTrash2 />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendProject({ name: '', description: '', technologies: '', link: '' })}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                      >
                        <FiPlus /> Add Project
                      </button>
                    </div>
                  )}

                  <div className="mt-6">
                    {activeSection === 'projects' ? (
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-cyan-500 text-white rounded-xl font-semibold 
                          hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg"
                      >
                        Generate Resume
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-cyan-500 text-white rounded-xl font-semibold 
                          hover:bg-cyan-600 transition-colors shadow-md hover:shadow-lg"
                      >
                        Next
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </form>

              {/* Preview Modal */}
              {isPreviewOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className="bg-white rounded-xl p-8 max-w-4xl max-h-[90vh] overflow-auto" ref={targetRef}>
                    <ResumePreview data={watch()} />
                  </div>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCreator;