import React from 'react';

interface HarveyballProps {
  value: number;
}

const Harveyball: React.FC<HarveyballProps> = ({ value }) => {
  const getFillClass = (value: number) => {
    if (value === 1) return 'fill-full-green';
    if (value === 0.75) return 'fill-three-quarters-green';
    if (value === 0.5) return 'fill-half-green';
    if (value === 0.25) return 'fill-quarter-green';
    if (value === -1) return 'fill-full-red';
    if (value === -0.75) return 'fill-three-quarters-red';
    if (value === -0.5) return 'fill-half-red';
    if (value === -0.25) return 'fill-quarter-red';
    return '';
  };

  return (
    <div className={`harveyball ${getFillClass(value)}`}>
      <div className="circle"></div>
    </div>
  );
};

export default Harveyball;