import React, { useState } from 'react';
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";

const CellTooltip = ({ parentId, tooltipEl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({top: 0, left: 0});

  const Id = parentId + "CellToolTip";

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (event) => {
    setTooltipPosition({
      top: event.clientY,
      left: event.clientX + 40,
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
          {tooltipEl.slice(0, 2).map((item, i) => (
              <div key={Id + i}>{item}</div>
          ))}
        <div>...</div>
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
              {tooltipEl.map((item, i) => (
                  <div key={Id + i}>{item}</div>
              ))}
            </div>
        )}
      </div>
  );
};

export default CellTooltip;