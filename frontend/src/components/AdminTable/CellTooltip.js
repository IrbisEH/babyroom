import React, { useState } from 'react';
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";

const CellTooltip = ({ cellEls, tooltipEls }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({top: 0, left: 0});

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (event) => {
    setTooltipPosition({
      top: event.clientY - 65,
      left: event.clientX + 45,
    });
  };

  return (
      <div style={{position: 'relative', display: 'inline-block'}}>
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{cursor: 'pointer'}}
        >
          {cellEls}
        </div>
        {isHovered && (
            <div
                style={{
                  position: 'fixed',
                  top: tooltipPosition.top,
                  left: tooltipPosition.left,
                  transform: 'translateX(-50%)',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '10px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  zIndex: 1000,
                }}
            >
              {tooltipEls}
            </div>
        )}
      </div>
  );
};

export default CellTooltip;