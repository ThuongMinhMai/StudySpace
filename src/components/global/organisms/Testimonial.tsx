import React, { useEffect, useRef, useState } from 'react';

const Testimonial = () => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let scrollInterval;
    
    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (containerRef.current && !isPaused) {
          containerRef.current.scrollBy({
            top: 0,
            left: 1, // Adjust the scroll speed
            behavior: 'smooth',
          });

          // Reset scroll position to start if reached the end
          if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth - containerRef.current.clientWidth) {
            containerRef.current.scrollLeft = 0;
          }
        }
      }, 20); // Interval in milliseconds, adjust for speed
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="testimonial-container overflow-x-auto whitespace-nowrap scroll-smooth"
      style={{ width: '100%', height: 'auto', display: 'flex', gap: '20px' }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="testimonial-card bg-white shadow-md rounded-lg p-6 flex-shrink-0 w-80">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="ml-4">
              <p className="text-gray-800 font-semibold">Vo Thi My Tien</p>
              <p className="text-sm text-gray-500">UI/UX Designer</p>
            </div>
          </div>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id turpis in neque tempor dignissim.
          </p>
          <div className="flex items-center justify-between mt-4">
            <span>5</span>
            <span className="text-yellow-500">⭐</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonial;
