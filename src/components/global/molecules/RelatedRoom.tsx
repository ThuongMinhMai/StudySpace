import CardSpace from '../organisms/CardSpace';

interface RelatedRoomPropsType {
  roomId: number;
  roomName: string;
  storeName: string;
  capacity: number;
  pricePerHour: number;
  description: string;
  status: boolean;
  area: number;
  type: string;
  image: string | null;
  address: string;
  isOvernight: boolean; // Required property
}

interface RelatedRoomProps {
  relatedRooms?: RelatedRoomPropsType[]; // Accept relatedRooms as an optional property
}

function RelatedRoom({ relatedRooms = [] }: RelatedRoomProps) {
  return (
    <div>
      <div className='text-2xl font-medium mb-10'>Related Room</div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
        {relatedRooms.map((room, index) => (
          <div className='mb-10' key={index}>
            <CardSpace
              roomId={room.roomId}
              address={room.address}
              storeName={room.storeName}
              roomName={room.roomName}
              description={room.description}
              imgSrc={room.image}
              price={room.pricePerHour}
              capacity={room.capacity}
              area={room.area}
              type={room.type}
              isOvernight={room.isOvernight} // Ensure this is present
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedRoom;
