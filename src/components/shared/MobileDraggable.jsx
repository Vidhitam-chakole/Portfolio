import React from "react";
import Draggable from "react-draggable";
import { useIsMobile } from "../../hooks/useIsMobile";

/**
 * Draggable windows stay fullscreen-ish on phones so they are not dragged off-screen.
 */
const MobileDraggable = ({ children, disabled, ...props }) => {
  const isMobile = useIsMobile();

  return (
    <Draggable
      {...props}
      disabled={disabled || isMobile}
      position={isMobile ? { x: 0, y: 0 } : undefined}
    >
      {children}
    </Draggable>
  );
};

export default MobileDraggable;
