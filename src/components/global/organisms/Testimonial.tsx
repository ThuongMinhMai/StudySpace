import React, { useEffect, useRef, useState } from 'react';

const Testimonial = () => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (container && !isPaused) {
          container.scrollBy({
            top: 0,
            left: 1, // Adjust the scroll speed
            behavior: 'smooth',
          });

          // Check if the scroll position is near the end
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0; // Reset to the start
          }
        }
      }, 10); // Interval in milliseconds, adjust for speed
    };

    startScrolling();

    return () => {
      clearInterval(scrollInterval);
    };
  }, [isPaused]);

  // Optional: Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="testimonial-container overflow-x-hidden whitespace-nowrap"
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        gap: '20px',
        position: 'relative',
      }}
    >
      {/* Original and Cloned Content for Infinite Loop */}
      <div style={{ display: 'flex', flex: 'none' }}>
        {[...Array(2)].map((_, cloneIndex) => (
          <div key={cloneIndex} style={{ display: 'flex' }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`${cloneIndex}-${index}`}
                className="testimonial-card bg-white shadow-md rounded-lg p-6 flex-shrink-0 w-80"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="ml-4">
                    <p className="text-gray-800 font-semibold">
                      Vo Thi My Tien
                    </p>
                    <p className="text-sm text-gray-500">UI/UX Designer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque id turpis in neque tempor dignissim.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span>5</span>
                  <span className="text-yellow-500">⭐</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
