import React, { useState } from "react";
import Draggable from "react-draggable";
import { MdMinimize, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscSettingsGear,
  VscAccount,
  VscChevronDown,
  VscChevronRight,
  VscFolderOpened,
  VscMarkdown,
  VscLinkExternal,
  VscStarFull,
  VscGitCompare,
  VscCheck,
  VscClose as VscTabClose,
} from "react-icons/vsc";
import { FaGithub, FaPython, FaJs, FaHtml5, FaReact, FaCode, FaTerminal, FaTag, FaBookOpen } from "react-icons/fa";
import { githubRepos } from "../../data/data";

// Helper to determine file icon and extension based on repo language
const getFileInfo = (repo) => {
  const lang = (repo.language || "").toLowerCase();
  if (lang.includes("python")) {
    return { ext: ".py", icon: <FaPython className="text-[#3572A5] text-sm shrink-0" />, langName: "Python" };
  }
  if (lang.includes("react") || repo.name.toLowerCase().includes("portfolio") || repo.name.toLowerCase().includes("laptopstand")) {
    return { ext: ".jsx", icon: <FaReact className="text-[#61DAFB] text-sm shrink-0" />, langName: "JavaScript React" };
  }
  if (lang.includes("html")) {
    return { ext: ".html", icon: <FaHtml5 className="text-[#E34F26] text-sm shrink-0" />, langName: "HTML" };
  }
  if (lang.includes("c")) {
    return { ext: ".c", icon: <FaCode className="text-[#555555] text-sm shrink-0" />, langName: "C" };
  }
  return { ext: ".js", icon: <FaJs className="text-[#F7DF1E] text-sm shrink-0" />, langName: "JavaScript" };
};

function VsCode({
  isAppOpen,
  toggleVsCode,
  bounds,
  isActive = false,
  bringToFront,
  isMinimized = false,
  minimizeWindow,
}) {
  const windowRef = React.useRef(null);
  const [selectedRepoId, setSelectedRepoId] = useState(githubRepos[0]?.id || "readme");
  const [openTabs, setOpenTabs] = useState(() => {
    return githubRepos.slice(0, 3).map((r) => r.id);
  });
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const [activeActivityTab, setActiveActivityTab] = useState("explorer");

  const selectedRepo = githubRepos.find((r) => r.id === selectedRepoId);
  const selectedFileInfo = selectedRepo ? getFileInfo(selectedRepo) : null;

  const handleSelectFile = (id) => {
    setSelectedRepoId(id);
    if (id !== "readme" && !openTabs.includes(id)) {
      setOpenTabs((prev) => [...prev, id]);
    }
  };

  const handleCloseTab = (e, id) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((tabId) => tabId !== id);
    setOpenTabs(newTabs);
    if (selectedRepoId === id) {
      if (newTabs.length > 0) {
        setSelectedRepoId(newTabs[newTabs.length - 1]);
      } else {
        setSelectedRepoId("readme");
      }
    }
  };

  return (
    <div
      className={`${
        isAppOpen && !isMinimized ? "" : "hidden"
      } ${isActive ? "z-40" : "z-30"} w-full h-screen pointer-events-none absolute transition-none`}
    >
      <Draggable handle=".title-bar" nodeRef={windowRef} bounds={bounds}>
        <div
          ref={windowRef}
          className="window bg-[#1e1e1e] h-[84vh] max-h-[48rem] w-[96vw] max-w-[72rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] font-sans pointer-events-auto flex flex-col shadow-2xl"
          onMouseDown={bringToFront}
        >
          {/* Top Title Bar */}
          <div className="title-bar flex justify-between items-center bg-[#2d2d2d] text-neutral-300 h-9 select-none px-2 text-xs border-b border-[#3c3c3c]">
            <div className="flex items-center gap-2">
              <img
                src="https://laaouatni.github.io/w11CSS/images/vs-code.ico"
                alt="VS Code Icon"
                className="w-4 h-4 ml-1"
              />
              <div className="hidden md:flex items-center gap-3 text-neutral-400 text-xs ml-2">
                <span className="hover:text-white cursor-pointer">File</span>
                <span className="hover:text-white cursor-pointer">Edit</span>
                <span className="hover:text-white cursor-pointer">Selection</span>
                <span className="hover:text-white cursor-pointer">View</span>
                <span className="hover:text-white cursor-pointer">Go</span>
                <span className="hover:text-white cursor-pointer">Run</span>
                <span className="hover:text-white cursor-pointer">Terminal</span>
                <span className="hover:text-white cursor-pointer">Help</span>
              </div>
            </div>

            <div className="font-medium text-neutral-300 truncate max-w-[40%] text-center text-xs">
              {selectedRepo
                ? `${selectedRepo.name}/README.md — My Projects (Vidhitam Chakole)`
                : "README.md — My Projects (Vidhitam Chakole)"}
            </div>

            <div className="flex items-center -mr-2">
              <button
                className="hover:bg-[#3e3e3e] w-11 h-9 flex justify-center items-center text-neutral-300 hover:text-white text-base"
                onClick={minimizeWindow}
                aria-label="Minimize"
              >
                <MdMinimize />
              </button>
              <button
                className="hover:bg-[#3e3e3e] w-11 h-9 flex justify-center items-center text-neutral-300 hover:text-white text-xs"
                aria-label="Maximize"
              >
                <MdCheckBoxOutlineBlank />
              </button>
              <button
                className="hover:bg-[#e81123] w-12 h-9 flex justify-center items-center text-neutral-300 hover:text-white text-lg"
                onClick={toggleVsCode}
                aria-label="Close"
              >
                <MdClose />
              </button>
            </div>
          </div>

          {/* Main App Layout */}
          <div className="flex flex-1 overflow-hidden bg-[#1e1e1e]">
            {/* Left Activity Bar */}
            <div className="w-12 bg-[#333333] flex flex-col justify-between items-center py-2 shrink-0 border-r border-[#252526] select-none text-neutral-400">
              <div className="flex flex-col items-center w-full gap-4">
                <button
                  onClick={() => setActiveActivityTab("explorer")}
                  className={`w-full flex justify-center py-1.5 relative hover:text-white ${
                    activeActivityTab === "explorer" ? "text-white border-l-2 border-white" : ""
                  }`}
                  title="Explorer (Ctrl+Shift+E)"
                >
                  <VscFiles size={22} />
                </button>
                <button
                  onClick={() => setActiveActivityTab("search")}
                  className={`w-full flex justify-center py-1.5 relative hover:text-white ${
                    activeActivityTab === "search" ? "text-white border-l-2 border-white" : ""
                  }`}
                  title="Search (Ctrl+Shift+F)"
                >
                  <VscSearch size={22} />
                </button>
                <button
                  onClick={() => setActiveActivityTab("git")}
                  className={`w-full flex justify-center py-1.5 relative hover:text-white ${
                    activeActivityTab === "git" ? "text-white border-l-2 border-white" : ""
                  }`}
                  title="Source Control (Ctrl+Shift+G)"
                >
                  <VscSourceControl size={22} />
                  <span className="absolute top-1 right-2 bg-[#007acc] text-white text-[9px] rounded-full px-1 font-bold">
                    {githubRepos.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveActivityTab("debug")}
                  className={`w-full flex justify-center py-1.5 relative hover:text-white ${
                    activeActivityTab === "debug" ? "text-white border-l-2 border-white" : ""
                  }`}
                  title="Run and Debug"
                >
                  <VscDebugAlt size={22} />
                </button>
                <button
                  onClick={() => setActiveActivityTab("extensions")}
                  className={`w-full flex justify-center py-1.5 relative hover:text-white ${
                    activeActivityTab === "extensions" ? "text-white border-l-2 border-white" : ""
                  }`}
                  title="Extensions"
                >
                  <VscExtensions size={22} />
                </button>
              </div>

              <div className="flex flex-col items-center w-full gap-4">
                <button className="hover:text-white" title="Accounts">
                  <VscAccount size={20} />
                </button>
                <button className="hover:text-white" title="Manage / Settings">
                  <VscSettingsGear size={20} />
                </button>
              </div>
            </div>

            {/* Explorer Sidebar */}
            <div className="w-60 bg-[#252526] text-neutral-300 flex flex-col shrink-0 border-r border-[#1e1e1e] select-none text-xs">
              <div className="px-4 py-2.5 flex items-center justify-between font-semibold tracking-wide text-neutral-400 text-[11px] border-b border-[#1e1e1e]">
                <span>EXPLORER</span>
                <span className="text-neutral-500 font-normal">...</span>
              </div>

              <div className="overflow-y-auto flex-1 py-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#424242 transparent" }}>
                {/* Workspace Folder Header */}
                <div
                  className="flex items-center gap-1 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer font-bold text-neutral-200"
                  onClick={() => setIsFolderOpen(!isFolderOpen)}
                >
                  {isFolderOpen ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
                  <span className="truncate uppercase text-[11px]">VIDHITAM-CHAKOLE (GITHUB)</span>
                </div>

                {isFolderOpen && (
                  <div className="ml-2 flex flex-col">
                    {/* All Projects Overview Readme */}
                    <div
                      className={`flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#2a2d2e] ${
                        selectedRepoId === "readme" ? "bg-[#37373d] text-white font-medium" : "text-neutral-400"
                      }`}
                      onClick={() => handleSelectFile("readme")}
                    >
                      <VscMarkdown className="text-[#42a5f5] text-sm shrink-0" />
                      <span className="truncate font-semibold">ALL_PROJECTS.md</span>
                    </div>

                    {/* Projects Subfolder */}
                    <div className="flex items-center gap-1 px-2 py-1 text-neutral-300 font-semibold mt-1">
                      <VscFolderOpened className="text-[#dcb67a] text-sm shrink-0" />
                      <span>projects/</span>
                      <span className="ml-auto text-[10px] text-neutral-500 font-normal mr-2">({githubRepos.length})</span>
                    </div>

                    {/* Repository README Files List */}
                    <div className="ml-3 flex flex-col border-l border-[#333333]">
                      {githubRepos.map((repo) => {
                        const fileInfo = getFileInfo(repo);
                        const isSelected = selectedRepoId === repo.id;
                        return (
                          <div
                            key={repo.id}
                            className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[#2a2d2e] transition-colors ${
                              isSelected ? "bg-[#37373d] text-white font-medium" : "text-neutral-400"
                            }`}
                            onClick={() => handleSelectFile(repo.id)}
                            title={`${repo.name}/README.md`}
                          >
                            <VscMarkdown className="text-[#42a5f5] text-sm shrink-0" />
                            <span className="truncate">
                              {repo.name}
                              <span className="text-neutral-500 font-normal text-[11px]">.md</span>
                            </span>
                            {repo.stargazers_count > 0 && (
                              <span className="ml-auto text-[10px] text-yellow-500 font-normal flex items-center gap-0.5">
                                ★{repo.stargazers_count}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Editor Section */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
              {/* Tab Bar */}
              <div className="flex items-center bg-[#252526] overflow-x-auto text-xs border-b border-[#1e1e1e] select-none" style={{ scrollbarWidth: "none" }}>
                {/* All Projects Readme Tab */}
                <div
                  className={`flex items-center gap-2 px-3 py-2 border-r border-[#1e1e1e] cursor-pointer shrink-0 ${
                    selectedRepoId === "readme"
                      ? "bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]"
                      : "bg-[#2d2d2d] text-neutral-400 hover:bg-[#2a2a2a]"
                  }`}
                  onClick={() => setSelectedRepoId("readme")}
                >
                  <VscMarkdown className="text-[#42a5f5] text-sm" />
                  <span>ALL_PROJECTS.md</span>
                </div>

                {/* Open Project Tabs */}
                {openTabs.map((tabId) => {
                  const repo = githubRepos.find((r) => r.id === tabId);
                  if (!repo) return null;
                  const isActiveTab = selectedRepoId === tabId;
                  return (
                    <div
                      key={tabId}
                      className={`flex items-center gap-2 px-3 py-2 border-r border-[#1e1e1e] cursor-pointer group shrink-0 ${
                        isActiveTab
                          ? "bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]"
                          : "bg-[#2d2d2d] text-neutral-400 hover:bg-[#2a2a2a]"
                      }`}
                      onClick={() => setSelectedRepoId(tabId)}
                    >
                      <VscMarkdown className="text-[#42a5f5] text-sm" />
                      <span className="truncate max-w-[130px]">
                        {repo.name}.md
                      </span>
                      <button
                        onClick={(e) => handleCloseTab(e, tabId)}
                        className="opacity-0 group-hover:opacity-100 hover:bg-neutral-700 rounded p-0.5 ml-1 text-neutral-300"
                        title="Close Tab"
                      >
                        <VscTabClose size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-1.5 px-4 py-1 text-[11px] text-neutral-500 bg-[#1e1e1e] border-b border-[#282828] select-none">
                <span>vidhitam-chakole</span>
                <span>›</span>
                <span>projects</span>
                <span>›</span>
                <span className="text-neutral-300 flex items-center gap-1">
                  <VscMarkdown className="text-[#42a5f5]" />
                  {selectedRepo ? `${selectedRepo.name}.md (Preview)` : "ALL_PROJECTS.md (Preview)"}
                </span>
              </div>

              {/* Markdown README Render View Area */}
              <div
                className="flex-1 overflow-y-auto px-6 py-6 font-sans text-neutral-200 select-text"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#424242 transparent" }}
              >
                {selectedRepo ? (
                  <div className="max-w-3xl mx-auto space-y-6">
                    {/* Project Title & Header */}
                    <div className="border-b border-[#3c3c3c] pb-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                          <FaBookOpen className="text-[#42a5f5] text-2xl" />
                          <span>{selectedRepo.name}</span>
                        </h1>
                        <div className="flex items-center gap-2">
                          {selectedRepo.githubLink && (
                            <a
                              href={selectedRepo.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 bg-[#2ea043] hover:bg-[#2c974b] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors shadow"
                            >
                              <FaGithub size={14} />
                              <span>GitHub Repo</span>
                              <VscLinkExternal size={13} />
                            </a>
                          )}
                          {selectedRepo.liveURL && (
                            <a
                              href={selectedRepo.liveURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 bg-[#007acc] hover:bg-[#0062a3] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors shadow"
                            >
                              <span>Live Preview</span>
                              <VscLinkExternal size={13} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Badges Bar */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-xs px-2.5 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded-full flex items-center gap-1 font-medium">
                          <VscStarFull size={12} /> {selectedRepo.stargazers_count} stars
                        </span>
                        <span className="text-xs px-2.5 py-1 bg-[#007acc]/15 text-[#61afef] border border-[#007acc]/40 rounded-full font-medium">
                          {selectedRepo.language || "Code"}
                        </span>
                        <span className="text-xs px-2.5 py-1 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-full font-medium">
                          branch: {selectedRepo.default_branch || "main"}
                        </span>
                        <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-medium">
                          Author: @Vidhitam-chakole
                        </span>
                      </div>
                    </div>

                    {/* About & Description Section */}
                    <div className="space-y-3">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#2d2d2d] pb-1.5">
                        <span>📖 About the Project</span>
                      </h2>
                      <div className="bg-[#252526] p-4 rounded-lg border border-[#333333] text-neutral-300 leading-relaxed text-sm">
                        {selectedRepo.description || "No description provided for this project."}
                      </div>
                    </div>

                    {/* Tech Stack Section */}
                    <div className="space-y-3">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#2d2d2d] pb-1.5">
                        <FaTag className="text-[#61afef] text-sm" />
                        <span>Technologies & Tools</span>
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedRepo.techUsed.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-[#2d2d2d] hover:bg-[#383838] border border-neutral-700 text-neutral-200 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Clone / Setup Guide */}
                    <div className="space-y-3">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#2d2d2d] pb-1.5">
                        <FaTerminal className="text-[#98c379] text-sm" />
                        <span>Quick Setup & Clone</span>
                      </h2>
                      <div className="bg-[#141414] p-3.5 rounded-lg border border-[#2d2d2d] font-mono text-xs text-neutral-300 space-y-1.5 overflow-x-auto">
                        <div className="text-neutral-500"># Clone this repository</div>
                        <div className="text-[#98c379]">
                          git clone {selectedRepo.githubLink}.git
                        </div>
                        <div className="text-neutral-500 pt-1"># Navigate into directory</div>
                        <div className="text-[#61afef]">
                          cd {selectedRepo.name}
                        </div>
                      </div>
                    </div>

                    {/* Repository Metadata Table */}
                    <div className="space-y-3 pt-2">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#2d2d2d] pb-1.5">
                        <span>📊 Repository Details</span>
                      </h2>
                      <div className="bg-[#252526] rounded-lg border border-[#333333] overflow-hidden text-xs">
                        <div className="grid grid-cols-2 p-3 border-b border-[#333333]">
                          <span className="text-neutral-400">Repository Name</span>
                          <span className="font-semibold text-white">{selectedRepo.name}</span>
                        </div>
                        <div className="grid grid-cols-2 p-3 border-b border-[#333333]">
                          <span className="text-neutral-400">Owner</span>
                          <span className="text-white">Vidhitam-chakole</span>
                        </div>
                        <div className="grid grid-cols-2 p-3 border-b border-[#333333]">
                          <span className="text-neutral-400">Primary Language</span>
                          <span className="text-white">{selectedRepo.language || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-2 p-3 border-b border-[#333333]">
                          <span className="text-neutral-400">GitHub Stars</span>
                          <span className="text-yellow-400 font-semibold">★ {selectedRepo.stargazers_count}</span>
                        </div>
                        {selectedRepo.liveURL && (
                          <div className="grid grid-cols-2 p-3">
                            <span className="text-neutral-400">Live URL</span>
                            <a
                              href={selectedRepo.liveURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#58a6ff] hover:underline truncate"
                            >
                              {selectedRepo.liveURL}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ALL_PROJECTS.md Preview */
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="border-b border-[#3c3c3c] pb-4">
                      <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                        <FaGithub size={30} />
                        <span>Vidhitam Chakole's Projects</span>
                      </h1>
                      <p className="text-neutral-400 mt-2 text-sm leading-relaxed">
                        Curated collection of all {githubRepos.length} repositories crawled directly from GitHub profile (
                        <a
                          href="https://github.com/Vidhitam-chakole"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#58a6ff] hover:underline"
                        >
                          @Vidhitam-chakole
                        </a>
                        ). Click any project in the left sidebar or below to view its complete README.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {githubRepos.map((repo) => {
                        const fileInfo = getFileInfo(repo);
                        return (
                          <div
                            key={repo.id}
                            onClick={() => handleSelectFile(repo.id)}
                            className="bg-[#252526] border border-[#333333] hover:border-[#007acc] rounded-lg p-4 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <div className="font-bold text-white flex items-center gap-2 text-sm truncate">
                                  {fileInfo.icon}
                                  <span className="truncate">{repo.name}</span>
                                </div>
                                <span className="text-xs px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full shrink-0 flex items-center gap-0.5">
                                  <VscStarFull size={11} /> {repo.stargazers_count}
                                </span>
                              </div>
                              <p className="text-neutral-400 text-xs mt-2.5 line-clamp-3 leading-relaxed">
                                {repo.description || "No description provided."}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-[#333333] flex items-center justify-between text-xs">
                              <span className="text-neutral-400">{repo.language || "Code"}</span>
                              <div className="flex items-center gap-2">
                                {repo.githubLink && (
                                  <a
                                    href={repo.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-neutral-400 hover:text-white p-1"
                                    title="View GitHub Repository"
                                  >
                                    <FaGithub size={14} />
                                  </a>
                                )}
                                {repo.liveURL && (
                                  <a
                                    href={repo.liveURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-[#58a6ff] hover:text-[#79b8ff] p-1"
                                    title="Visit Live Site"
                                  >
                                    <VscLinkExternal size={14} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Status Bar */}
              <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] select-none shrink-0 font-sans">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold">
                    <VscGitCompare size={12} /> main*
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-white/90">
                    <VscCheck size={12} /> 0 errors, 0 warnings
                  </span>
                  <span className="hidden md:inline text-white/80">Vidhitam-chakole/Portfolio</span>
                </div>

                <div className="flex items-center gap-3 text-white/90">
                  <span className="hidden sm:inline">Ln 1, Col 1</span>
                  <span className="hidden sm:inline">Spaces: 2</span>
                  <span>UTF-8</span>
                  <span>Markdown (Preview)</span>
                  <span className="hidden md:inline font-medium">Prettier ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default VsCode;