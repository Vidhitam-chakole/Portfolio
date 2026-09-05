import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  profileDescription,
  educationExperience,
  githubRepos,
  skills,
  ownerName,
  ownerInitials,
} from "../../data/data";

const ProjectCard = ({ repo }) => {
  const renderSkills = () => {
    return repo.techUsed.map((tech, index) => (
      <div
        key={index}
        className="bg-white bg-opacity-20 rounded-md px-2 py-1 text-xs"
      >
        {tech}
      </div>
    ));
  };

  return (
    <div className="bg-neutral-900/80 rounded-md px-4 pt-3 hover:translate-x-1 hover:-translate-y-1 duration-300 text-selection">
      <div className="flex items-center justify-between">
        {repo.githubLink ? (
          <a
            href={repo.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub repository"
          >
            <FaGithub size={30} />
          </a>
        ) : (
          <span />
        )}
        {repo.liveURL ? (
          <a
            href={repo.liveURL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit live site"
          >
            <FaExternalLinkAlt size={15} />
          </a>
        ) : (
          <span />
        )}
      </div>
      <h3 className="font-bold mt-6">{repo.name}</h3>
      <p className="text-neutral-700 mt-4 text-sm">{repo.description}</p>
      <div className="flex items-center mt-4 gap-2 flex-wrap">
        {renderSkills()}
      </div>
    </div>
  );
};

const Skill = ({ icon, name, size }) => (
  <div
    className={`w-[${
      size === 48 ? "6em" : "5em"
    }] h-24 flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2`}
  >
    {icon ? React.cloneElement(icon, { size }) : null}
    <div className="text-balance text-center text-sm select-none pt-2">
      {name}
    </div>
  </div>
);

const SkillsList = ({ x, y }) => (
  <div className="flex flex-wrap gap-2">
    <>
      {skills.slice(x, y).map((skill) => (
        <Skill key={skill.key} icon={skill.icon} name={skill.name} size={48} />
      ))}
    </>
  </div>
);

const AboutMe = ({ page, handleDivClick, expandedDiv }) => {
  const renderPageContent = () => {
    switch (page) {
      case "About Me":
        return (
          <div className="hero min-h-auto justify-start">
            <div className="hero-content flex-col lg:flex-row">
              <div
                className="max-w-sm rounded-lg shadow-2xl h-96 w-96 bg-neutral-800 flex items-center justify-center text-7xl font-bold select-none"
                aria-label="Profile placeholder"
              >
                {ownerInitials}
              </div>
              <div>
                <h1 className="text-5xl font-bold">{ownerName}</h1>
                <p className="py-6">{profileDescription}</p>
              </div>
            </div>
          </div>
        );
      case "Education":
        if (!educationExperience.length) {
          return (
            <div className="text-neutral-400 p-8">No education listed.</div>
          );
        }
        return (
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical my-8">
            {educationExperience.map((item, index) => (
              <li key={item.key ?? index}>
                {index > 0 && <hr className="bg-gray-500" />}
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  className={`${
                    index % 2 === 0 ? "timeline-end" : "timeline-start md:text-end"
                  } mb-10`}
                >
                  <time className="font-mono text-lg italic">
                    {item.graduation}
                  </time>
                  <div className="text-xl font-bold font-3xl">
                    {item.institution}
                  </div>
                  {item.degree}
                </div>
                <hr className="bg-gray-500" />
              </li>
            ))}
          </ul>
        );
      case "Skills":
        return (
          <div className="main-container flex h-screen relative">
            {expandedDiv === 0 && (
              <>
                <div
                  className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20"
                  onDoubleClick={() => handleDivClick(1)}
                >
                  <img
                    src="/images/apps/folder.png"
                    alt="Technical"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Technical Skills
                  </div>
                </div>

                <div
                  className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20"
                  onDoubleClick={() => handleDivClick(2)}
                >
                  <img
                    src="/images/apps/folder.png"
                    alt="Soft"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Soft Skills
                  </div>
                </div>

                <div
                  className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20"
                  onDoubleClick={() => handleDivClick(3)}
                >
                  <img
                    src="/images/apps/folder.png"
                    alt="Design"
                    className="w-12 h-12"
                  />
                  <div className="text-balance text-center text-sm select-none pt-2">
                    Design Skills
                  </div>
                </div>
              </>
            )}

            {expandedDiv === 1 && (
              <div className="flex absolute top-0 gap-2">
                {skills.length ? (
                  <SkillsList x={0} y={skills.length} />
                ) : (
                  <div className="text-neutral-400 p-4">No skills listed.</div>
                )}
              </div>
            )}

            {expandedDiv === 2 && (
              <div className="flex absolute top-0 gap-1">
                <div className="w-[6.5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/communication.png"
                    alt="Communication"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Communication
                  </div>
                </div>
                <div className="w-[6em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/teamwork.png"
                    alt="Teamwork"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Teamwork
                  </div>
                </div>
                <div className="w-[5em] h-28 flex flex-col pt-2 items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/problem.png"
                    alt="Problem"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Problem Solving
                  </div>
                </div>
                <div className="w-[6em] h-28 flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20">
                  <img
                    src="/images/folders/management.png"
                    alt="Project"
                    className="w-12 h-12"
                  />
                  <div className="text-pretty text-center text-sm select-none pt-2">
                    Project Management
                  </div>
                </div>
              </div>
            )}

            {expandedDiv === 3 && (
              <div className="flex absolute top-0 gap-2">
                <div className="text-neutral-400 p-4">No skills listed.</div>
              </div>
            )}
          </div>
        );
      case "My Stuffs":
        return (
          <div className="w-full h-full overflow-y-auto p-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#666 transparent' }}>
            {githubRepos.length ? (
              <div className="grid sm:grid-cols-2 gap-2">
                {githubRepos.map((repo, index) => (
                  <ProjectCard key={index} repo={repo} />
                ))}
              </div>
            ) : (
              <div className="text-neutral-400 p-8">No projects listed.</div>
            )}
          </div>
        );
      default:
        return "404 not found";
    }
  };

  return (
    <main className="h-[100vh] w-full ml-2.5 mt-2">
      {renderPageContent()}
    </main>
  );
};

export default AboutMe;
