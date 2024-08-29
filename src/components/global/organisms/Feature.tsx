import { Coffee, Settings, TrendingUp } from 'lucide-react';
import React from 'react';
import service from '../../../assets/service.jpg'; // Replace this with the correct image path
import './Feature.css'
function Feature() {
  return (
    <section className="relative flex items-center justify-between h-screen overflow-hidden bg-white">
      {/* Image on the left side */}
      <div className="w-full h-full">
        <img src={service} alt="Service" className="w-full h-full object-cover" />
      </div>
      
      {/* Curved content section on the right side */}
      <div className="absolute right-0 w-3/4 h-full bg-[#D4A373] clip-path-custom p-10 flex flex-col items-start justify-center text-white">
        <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
        <div className="flex gap-10">
          <div className="flex flex-col items-center">
            <Coffee className="w-10 h-10 mb-2" />
            <p className="text-lg font-medium">Convenience</p>
          </div>
          <div className="flex flex-col items-center">
            <Settings className="w-10 h-10 mb-2" />
            <p className="text-lg font-medium">Flexibility</p>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="w-10 h-10 mb-2" />
            <p className="text-lg font-medium">Productivity</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default Feature;
