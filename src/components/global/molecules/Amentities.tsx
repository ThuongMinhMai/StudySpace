import { Boxes } from 'lucide-react';

interface AmenitiesProps {
  aminities: string[];
}

function Amentities({ aminities }: AmenitiesProps) {
  return (
    <div>
      <div className='text-2xl mb-4 font-medium'>Amenities</div>
      {aminities && aminities.length > 0 ? (
        <div className='grid grid-cols-3 gap-4'>
          {aminities.map((amenity, index) => (
            <div key={index} className='flex justify-start items-center'>
              <Boxes className='mr-2' color='#647C6C' fill='#FFF' />
              <p>{amenity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No amenities available.</p>
      )}
    </div>
  );
}

export default Amentities;
