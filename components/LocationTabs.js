import React from 'react';

const LocationTabs = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="flex justify-center">
        <div className="flex w-full max-w-md">
          <button
            onClick={() => scrollToSection('bachata-location')}
            className="flex-1 px-6 py-4 text-center font-bold text-almostBlack bg-white border-b-2 border-transparent hover:border-shine hover:text-shine transition-colors duration-200 font-bigShoulder uppercase text-bodyS"
          >
            Bachata Location
          </button>
          <button
            onClick={() => scrollToSection('salsa-location')}
            className="flex-1 px-6 py-4 text-center font-bold text-almostBlack bg-white border-b-2 border-transparent hover:border-shine hover:text-shine transition-colors duration-200 font-bigShoulder uppercase text-bodyS"
          >
            Salsa Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationTabs; 