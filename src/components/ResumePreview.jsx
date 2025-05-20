import React from 'react';

const ResumePreview = ({ data }) => {
  return (
    <div className="max-w-[8.5in] mx-auto bg-white text-gray-800 p-8">
      {/* Personal Information */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.personal.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
          <span>{data.personal.location}</span>
        </div>
      </div>
      
      {/* Education Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <strong>{edu.school}</strong>
              <span>{edu.startDate} - {edu.endDate}</span>
            </div>
            <div>{edu.degree}</div>
            <div className="text-gray-600">{edu.location}</div>
            {edu.gpa && <div>GPA: {edu.gpa}</div>}
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <strong>{exp.company}</strong>
              <span>{exp.startDate} - {exp.endDate}</span>
            </div>
            <div>{exp.title}</div>
            <div className="text-gray-600">{exp.location}</div>
            <ul className="list-disc ml-4 mt-2">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.technical.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.soft.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <strong>{project.name}</strong>
              {project.link && (
                <a href={project.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              )}
            </div>
            <div className="text-gray-600">{project.technologies}</div>
            <p className="mt-1">{project.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ResumePreview;