import React from 'react'
import { useLocation } from 'react-router-dom';

function RoomPage() {
    const location = useLocation();
    const { typeRoom } = location.state || {}; // Fallback if state is undefined
  
  return (
    <div>
    <h1>{typeRoom ? `${typeRoom} Rooms` : 'Rooms'}</h1>
    {/* Render the rooms based on the typeRoom */}
  </div>
  )
}

export default RoomPage