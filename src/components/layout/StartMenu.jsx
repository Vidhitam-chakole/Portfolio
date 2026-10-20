import React, { useState, useEffect } from "react";
import Power from "../utilities/Power";
import { generateInitials } from "../user/UserProfile";
import { useParams } from "react-router-dom";

const PINNED_APPS = [
  { name: "Chrome", icon: "/images/apps/chrome.png", alt: "Google Chrome" },
  { name: "WhatsApp", icon: "/images/apps/whatsapp.svg", alt: "WhatsApp", url: "https://wa.me/917720803992" },
  { name: "Word", icon: "https://laaouatni.github.io/w11CSS/images/word-icon.png", alt: "Word" },
  { name: "Excel", icon: "https://laaouatni.github.io/w11CSS/images/excel-icon.png", alt: "Excel" },
  { name: "Powerpoint", icon: "https://laaouatni.github.io/w11CSS/images/powerpoint-icon.png", alt: "Powerpoint" },
  { name: "Office", icon: "https://laaouatni.github.io/w11CSS/images/ms-office.ico", alt: "Office" },
  { name: "Calender", icon: "https://laaouatni.github.io/w11CSS/images/calendar-icon.png", alt: "Calendar" },
  { name: "Microsoft Store", icon: "https://laaouatni.github.io/w11CSS/images/ms-store-icon.png", alt: "Microsoft Store" },
  { name: "Photos", icon: "https://laaouatni.github.io/w11CSS/images/ms-foto-icon.ico", alt: "Photos" },
  { name: "Film & TV", icon: "https://laaouatni.github.io/w11CSS/images/ms-video-icon.ico", alt: "Film & TV" },
  { name: "Paint", icon: "https://laaouatni.github.io/w11CSS/images/Paint-2D.ico", alt: "Paint" },
  { name: "Paint 3D", icon: "https://laaouatni.github.io/w11CSS/images/Paint-3D.ico", alt: "Paint 3D" },
  { name: "WhiteBoard", icon: "https://laaouatni.github.io/w11CSS/images/Whiteboard.ico", alt: "Whiteboard" },
  { name: "Settings", icon: "https://laaouatni.github.io/w11CSS/images/ms-impostazioni-icon.ico", alt: "Settings" },
  { name: "Skype", icon: "https://laaouatni.github.io/w11CSS/images/ms-skype.ico", alt: "Skype" },
  { name: "My Projects", icon: "https://laaouatni.github.io/w11CSS/images/vs-code.ico", alt: "My Projects" },
  { name: "Visual Studio", icon: "https://laaouatni.github.io/w11CSS/images/vs-normal.ico", alt: "Visual Studio" },
  { name: "File Explorer", icon: "https://laaouatni.github.io/w11CSS/images/ms-file-explorer.ico", alt: "File Explorer" },
];

function StartMenu({
  toggleStart,
  isStartOpen,
  setInput,
  setIsSleeping,
  setActionType,
}) {
  const { name } = useParams();
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (isStartOpen) {
      setHasBeenOpened(true);
    }
  }, [isStartOpen]);

  return (
    <>
      <section
        id="w11-start-section"
        className={`fixed left-1/2 transform -translate-x-1/2 z-50 bg-neutral-800/95 backdrop-blur-xl w-[95%] sm:w-[92%] max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl shadow-2xl border border-white/10 ${
          isStartOpen ? "bottom-14 sm:bottom-16" : "bottom-[-900px]"
        }`}
        style={{ transition: "bottom 300ms ease" }}
      >
        <div className="input-div-start">
          <input
            type="text"
            id="cerca-input-start"
            placeholder="Search for apps, settings, and documents"
            disabled={!isStartOpen}
          />
        </div>
        <div className="padding-start">
          <div id="apps-container">
            <div className="app-container-header">
              <span>Pinned</span>
              <div>
                <span>All apps</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="rgba(0, 0, 0, 1)"
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
              </div>
            </div>
            <div id="second-app-container">
              {(hasBeenOpened || isStartOpen) &&
                PINNED_APPS.map((app) => (
                  <div
                    key={app.name}
                    className="app-icon cursor-pointer hover:bg-white/10 rounded-lg p-1 transition-colors"
                    onClick={() => {
                      if (app.url) {
                        window.open(app.url, "_blank", "noopener,noreferrer");
                        if (toggleStart) toggleStart();
                      }
                    }}
                  >
                    <img
                      src={app.icon}
                      alt={app.alt}
                      width="32"
                      height="32"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{app.name}</span>
                  </div>
                ))}
            </div>
          </div>
          <div id="article-div">
            <div className="app-container-header">
              <span>Recommended</span>
              <div>
                <span>More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="rgba(0, 0, 0, 1)"
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
              </div>
            </div>
            <div id="article-container">
              {(hasBeenOpened || isStartOpen) && (
                <>
                  <div className="recent">
                    <div>
                      <img
                        src="https://laaouatni.github.io/w11CSS/images/vs-code.ico"
                        alt="My Projects icon"
                        width="32"
                        height="32"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <div>My Projects</div>
                      <div>Recently added</div>
                    </div>
                  </div>
                  <div className="recent">
                    <div>
                      <img
                        src="https://laaouatni.github.io/w11CSS/images/vs-normal.ico"
                        alt="visual studio icon"
                        width="32"
                        height="32"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <div>Visual Studio</div>
                      <div>Recently added</div>
                    </div>
                  </div>
                  <div className="recent">
                    <div>
                      <img
                        src="https://laaouatni.github.io/w11CSS/images/Photos-folder.ico"
                        alt="folder microsoft"
                        width="32"
                        height="32"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <div>Study Materials</div>
                      <div>30 minutes ago</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div id="footer-start-section">
          <div className="nome-utente-start-section">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-white rounded-full w-8">
                {name && (
                  <div className="text-white text-xl font-normal">
                    {generateInitials(name)}
                  </div>
                )}
              </div>
            </div>
            <div>
              {name ? <div className="capitalize">{name}</div> : "User"}
            </div>
          </div>
          <div className="spegni-pc-start-section">
            <Power
              toggleStart={toggleStart}
              setInput={setInput}
              setIsSleeping={setIsSleeping}
              setActionType={setActionType}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default React.memo(StartMenu);
