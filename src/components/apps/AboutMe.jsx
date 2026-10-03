import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaPhoneAlt,
} from "react-icons/fa";
import {
  profileDescription,
  educationExperience,
  workExperienceTemplate,
  certifications,
  technicalSkills,
  ownerName,
  ownerInitials,
  ownerHeadline,
  ownerLocation,
  socialMediaLinks,
} from "../../data/data";

const AboutMe = ({ page, handleDivClick, expandedDiv }) => {
  const renderPageContent = () => {
    switch (page) {
      case "About Me":
        return (
          <div className="space-y-6 py-2 px-2 max-w-4xl">
            {/* Top Profile Card */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-xl">
              <div
                className="rounded-2xl w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center text-4xl sm:text-5xl font-bold text-white select-none border border-white/20 shrink-0 shadow-lg"
                aria-label="Profile Initials"
              >
                {ownerInitials}
              </div>

              <div className="text-center md:text-left flex-1 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {ownerName}
                  </h1>
                  {ownerLocation && (
                    <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-neutral-400">
                      <FaMapMarkerAlt className="text-red-400" />
                      <span>{ownerLocation}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm font-medium text-blue-400 leading-snug">
                  {ownerHeadline}
                </p>

                {/* Official Social Media Links Bar */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-2">
                  {/* LinkedIn */}
                  {socialMediaLinks.linkedin && (
                    <a
                      href={socialMediaLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A66C2]/15 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/40 rounded-lg text-xs font-semibold transition-all duration-150"
                      title="LinkedIn Profile"
                    >
                      <FaLinkedin size={15} />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {/* GitHub */}
                  {socialMediaLinks.github && (
                    <a
                      href={socialMediaLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 rounded-lg text-xs font-semibold transition-all duration-150"
                      title="GitHub Profile"
                    >
                      <FaGithub size={15} />
                      <span>GitHub</span>
                    </a>
                  )}

                  {/* Instagram */}
                  {socialMediaLinks.instagram && (
                    <a
                      href={socialMediaLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E4405F]/15 hover:bg-[#E4405F] text-[#E4405F] hover:text-white border border-[#E4405F]/40 rounded-lg text-xs font-semibold transition-all duration-150"
                      title="Instagram Profile"
                    >
                      <FaInstagram size={15} />
                      <span>Instagram</span>
                    </a>
                  )}

                  {/* Email */}
                  {socialMediaLinks.email && (
                    <a
                      href={socialMediaLinks.email}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EA4335]/15 hover:bg-[#EA4335] text-[#EA4335] hover:text-white border border-[#EA4335]/40 rounded-lg text-xs font-semibold transition-all duration-150"
                      title="Send Email"
                    >
                      <FaEnvelope size={14} />
                      <span>Email</span>
                    </a>
                  )}

                  {/* Phone */}
                  {socialMediaLinks.phone && (
                    <a
                      href={socialMediaLinks.phone}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 rounded-lg text-xs font-semibold transition-all duration-150"
                      title="Phone Contact"
                    >
                      <FaPhoneAlt size={12} />
                      <span>Contact</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Summary / Bio Narrative */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3 shadow-md">
              <h2 className="text-lg font-bold text-white border-b border-neutral-800 pb-2">
                Summary & Perspective
              </h2>
              <div className="text-neutral-300 text-sm leading-relaxed space-y-2.5">
                {Array.isArray(profileDescription) ? (
                  profileDescription.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <p>{profileDescription}</p>
                )}
              </div>
            </div>

            {/* Certifications Card */}
            {certifications && certifications.length > 0 && (
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3 shadow-md">
                <h2 className="text-lg font-bold text-white border-b border-neutral-800 pb-2 flex items-center gap-2">
                  <FaCertificate className="text-yellow-400" />
                  <span>Certifications & Specialized Training</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {certifications.map((cert) => (
                    <div
                      key={cert.key}
                      className="bg-neutral-800/70 border border-neutral-700/60 p-3.5 rounded-lg space-y-1"
                    >
                      <div className="text-xs font-bold text-white">{cert.title}</div>
                      <div className="text-xs text-neutral-400">{cert.subtitle}</div>
                      <div className="text-[11px] font-medium text-blue-400 pt-1">{cert.issuer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "Experience":
        return (
          <div className="max-w-4xl py-2 px-2 space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <FaBriefcase className="text-blue-400 text-lg" />
              <h2 className="text-xl font-bold text-white">Experience & Leadership</h2>
            </div>

            <div className="space-y-4">
              {workExperienceTemplate.map((item) => (
                <div
                  key={item.key}
                  className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-white">{item.company}</h3>
                      <div className="text-sm font-semibold text-blue-400">{item.designation}</div>
                    </div>
                    <div className="text-xs font-mono text-neutral-400 bg-neutral-800/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
                      {item.duration}
                    </div>
                  </div>

                  {item.location && (
                    <div className="flex items-center gap-1 text-xs text-neutral-500 mt-1">
                      <FaMapMarkerAlt size={11} />
                      <span>{item.location}</span>
                    </div>
                  )}

                  <ul className="mt-3 space-y-1 text-xs sm:text-sm text-neutral-300 list-disc list-inside">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case "Education":
        if (!educationExperience.length) {
          return <div className="text-neutral-400 p-8">No education listed.</div>;
        }
        return (
          <div className="max-w-4xl py-2 px-2 space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <FaGraduationCap className="text-purple-400 text-xl" />
              <h2 className="text-xl font-bold text-white">Education History</h2>
            </div>

            <div className="space-y-4">
              {educationExperience.map((item, index) => (
                <div
                  key={item.key ?? index}
                  className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-white">{item.institution}</h3>
                      <div className="text-sm font-semibold text-purple-300">{item.degree}</div>
                    </div>
                    <div className="text-xs font-mono text-neutral-400 bg-neutral-800/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
                      {item.graduation || item.duration}
                    </div>
                  </div>

                  {item.location && (
                    <div className="flex items-center gap-1 text-xs text-neutral-500 mt-1">
                      <FaMapMarkerAlt size={11} />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "Skills":
        return (
          <div className="max-w-4xl py-2 px-2 space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <h2 className="text-xl font-bold text-white">Skills & Competencies</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  expandedDiv === 0 || expandedDiv === 1
                    ? "bg-neutral-900 border-blue-500/50"
                    : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                }`}
                onClick={() => handleDivClick(1)}
              >
                <div className="flex items-center gap-3">
                  <img src="/images/apps/folder.png" alt="Technical" className="w-10 h-10" />
                  <div>
                    <div className="font-bold text-white text-sm">Technical & AI</div>
                    <div className="text-xs text-neutral-400">RAG, MCP, Web, Python</div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  expandedDiv === 2
                    ? "bg-neutral-900 border-blue-500/50"
                    : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                }`}
                onClick={() => handleDivClick(2)}
              >
                <div className="flex items-center gap-3">
                  <img src="/images/folders/teamwork.png" alt="Soft Skills" className="w-10 h-10" />
                  <div>
                    <div className="font-bold text-white text-sm">Soft Skills & Leadership</div>
                    <div className="text-xs text-neutral-400">Leadership, Storytelling</div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  expandedDiv === 3
                    ? "bg-neutral-900 border-blue-500/50"
                    : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                }`}
                onClick={() => handleDivClick(3)}
              >
                <div className="flex items-center gap-3">
                  <img src="/images/folders/management.png" alt="Certifications" className="w-10 h-10" />
                  <div>
                    <div className="font-bold text-white text-sm">Certifications</div>
                    <div className="text-xs text-neutral-400">Red Hat, C#, AWS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Content Display */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-5">
              {expandedDiv === 2 ? (
                <div className="space-y-3">
                  <h3 className="font-bold text-white text-sm">Interpersonal & Leadership Skills</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: "Volunteer Coordination", icon: "teamwork.png" },
                      { name: "Creative Writing & Books", icon: "communication.png" },
                      { name: "Video & Storytelling", icon: "gallery.png" },
                      { name: "Problem Solving", icon: "problem.png" },
                      { name: "Team Leadership", icon: "management.png" },
                      { name: "Public Communication", icon: "communication.png" },
                    ].map((s, idx) => (
                      <div
                        key={idx}
                        className="bg-neutral-800/70 border border-neutral-700/60 rounded-lg p-3 flex flex-col items-center text-center gap-2"
                      >
                        <img src={`/images/folders/${s.icon}`} alt={s.name} className="w-8 h-8" />
                        <span className="text-xs font-medium text-neutral-200">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : expandedDiv === 3 ? (
                <div className="space-y-3">
                  <h3 className="font-bold text-white text-sm">Certified Credentials</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {certifications.map((c) => (
                      <div key={c.key} className="bg-neutral-800/80 border border-neutral-700 p-3.5 rounded-lg space-y-1">
                        <div className="text-xs font-bold text-yellow-400">{c.title}</div>
                        <div className="text-xs text-neutral-300">{c.subtitle}</div>
                        <div className="text-[11px] text-neutral-500">{c.issuer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-bold text-white text-sm">Technical & Engineering Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.map((tech, idx) => (
                      <div
                        key={idx}
                        className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-200 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        <span>{tech.name}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">({tech.category})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return "404 not found";
    }
  };

  return (
    <main
      className="h-full max-h-[calc(82vh-7rem)] w-full ml-2.5 mt-2 overflow-y-auto pr-3 pb-16"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#666 transparent" }}
    >
      {renderPageContent()}
    </main>
  );
};

export default AboutMe;
