import React from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import WindowTitleBar from "./WindowTitleBar";

/**
 * Reusable draggable window wrapper component
 */
const DraggableWindow = ({
  children,
  isOpen,
  isMinimized = false,
  title,
  onClose,
  onMinimize,
  onMaximize,
  bounds,
  windowRef,
  className = "",
  showMaximize = true,
  isActive = false,
  bringToFront,
}) => {
  const [internalMaximized, setInternalMaximized] = React.useState(false);
  const isMax = onMaximize ? false : internalMaximized;
  const handleMax = onMaximize || (() => setInternalMaximized((prev) => !prev));

  if (!isOpen) return null;

  return (
    <div className={`${isMinimized ? 'hidden' : ''} ${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none`}>
      <Draggable
        handle=".title-bar"
        nodeRef={windowRef}
        bounds={bounds}
        disabled={isMax}
        position={isMax ? { x: 0, y: 0 } : undefined}
      >
        <div
          ref={windowRef}
          className={`window bg-black overflow-hidden border-neutral-700 pointer-events-auto shadow-2xl transition-all duration-150 ${
            isMax
              ? "!fixed !top-0 !left-0 !w-screen !h-[calc(100vh-3rem)] !max-h-none !max-w-none !rounded-none !border-0"
              : `rounded-xl border-[1.5px] ${className}`
          }`}
          onMouseDown={bringToFront}
        >
          <WindowTitleBar
            title={title}
            onMinimize={onMinimize}
            onMaximize={handleMax}
            onClose={onClose}
            showMaximize={showMaximize}
            bringToFront={bringToFront}
            isMaximized={isMax}
          />
          <div className="content text-white">{children}</div>
        </div>
      </Draggable>
    </div>
  );
};

DraggableWindow.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isMinimized: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onMinimize: PropTypes.func,
  onMaximize: PropTypes.func,
  bounds: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
  }),
  windowRef: PropTypes.object,
  className: PropTypes.string,
  showMaximize: PropTypes.bool,
  isActive: PropTypes.bool,
  bringToFront: PropTypes.func,
};

export default React.memo(DraggableWindow);
