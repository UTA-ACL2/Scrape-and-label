"use client";

import React, { useState, useEffect } from 'react';

const texts = [
  "Let’s start annotating...",
  "Let’s start uploading videos...",
  "Let’s start helping animals...",
  "Let’s start exploring annotated videos...",
  "Let’s start talking to animals..."
];

const WelcomeBack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="absolute inset-1/4 bg-white bg-opacity-30 rounded-3xl shadow-lg flex justify-center items-center">
          {/* The translucent box */}
          <div className="text-center relative z-10">
            <h1 className="text-white mb-4" style={{ fontSize: '4vw', fontWeight: 'bold' }}>Welcome Kenny!</h1>
            <div className="relative overflow-hidden h-10 mt-4 flex items-center justify-center">
              <p className="text-white fade-in-out-linear" style={{ fontSize: '2vw' }}>{texts[currentIndex]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBack;










