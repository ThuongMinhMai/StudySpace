import React, { useState, useEffect } from 'react';
import { Card, Tag, Button, Modal } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Reset Ant Design styles

// Define the structure of the booked room data
interface BookedRoom {
  id: string;
  username: string;
  roomImage: string;
  roomName: string;
  shopName: string;
  startTime: string;
  endTime: string;
  status: string;
  fee: number;
  bookingDate: string;
  paymentMethod: string;
  checkIn: boolean;
  note?: string;
}

// Mocked room data (you can replace this with actual API data)
const mockBookedRooms: BookedRoom[] = [
  {
    id: '1',
    username: 'john_doe',
    roomImage: 'https://innovationcafe.qa/cdn/shop/products/startupmeetingroom.jpg?v=1609186074',
    roomName: 'Deluxe Suite',
    shopName: 'Hotel BlueSky',
    startTime: '2024-10-01T12:00',
    endTime: '2024-10-03T12:00',
    status: 'Confirmed',
    fee: 200,
    bookingDate: '2024-09-25',
    paymentMethod: 'Credit Card',
    checkIn: true,
    note: 'Check-in anytime after 12:00 PM',
  },
  {
    id: '2',
    username: 'jane_smith',
    roomImage: 'https://innovationcafe.qa/cdn/shop/products/startupmeetingroom.jpg?v=1609186074',
    roomName: 'Standard Room',
    shopName: 'Hotel GreenField',
    startTime: '2024-10-05T14:00',
    endTime: '2024-10-07T10:00',
    status: 'Pending',
    fee: 150,
    bookingDate: '2024-09-27',
    paymentMethod: 'PayPal',
    checkIn: false,
    note: 'Check-in before 3:00 PM',
  },
  {
    id: '3',
    username: 'dave_wilson',
    roomImage: 'https://innovationcafe.qa/cdn/shop/products/startupmeetingroom.jpg?v=1609186074',
    roomName: 'Luxury Suite',
    shopName: 'Hotel Sunset',
    startTime: '2024-10-10T16:00',
    endTime: '2024-10-12T12:00',
    status: 'Confirmed',
    fee: 350,
    bookingDate: '2024-09-29',
    paymentMethod: 'Credit Card',
    checkIn: true,
    note: 'Free breakfast included',
  },
  // Add more booked rooms here
];

function MyRoomPage() {
  const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<BookedRoom | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setBookedRooms(mockBookedRooms); // Set the mock data
  }, []);

  const showModal = (room: BookedRoom) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRoom(null);
  };

  return (
    <div className="my-room-page-container p-4 flex flex-col items-center mt-10 m-auto">
      <h1 className="text-2xl font-bold mb-6">My Booked Rooms</h1>

      {bookedRooms.length === 0 ? (
        <div>No room booked</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
          {bookedRooms.map((room) => (
            <Card
              key={room.id}
              className="shadow-lg"
              cover={<img className='max-w-sm' alt={room.roomName} src={room.roomImage} />}
              actions={[
                <Button type="primary" onClick={() => showModal(room)}>
                  View Details
                </Button>,
              ]}
            >
              <div className="p-4">
                <h2 className="font-semibold text-xl">{room.roomName}</h2>
                <p className="text-sm text-gray-500">{room.shopName}</p>
                <p className="text-sm text-gray-500">
                  <strong>Fee:</strong> ${room.fee}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Status:</strong> <Tag color={room.status === 'Confirmed' ? 'green' : 'orange'}>{room.status}</Tag>
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for showing more details */}
      <Modal
        title="Booking Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedRoom && (
          <div className="p-4">
            <h2 className="font-semibold text-xl">{selectedRoom.roomName}</h2>
            <p className="text-sm text-gray-500">{selectedRoom.shopName}</p>
            <p className="text-sm text-gray-500">
              <strong>Booked by:</strong> {selectedRoom.username}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Booking Date:</strong> {selectedRoom.bookingDate}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Check-In:</strong>{' '}
              {selectedRoom.checkIn ? (
                <CheckCircleOutlined className="text-green-500" />
              ) : (
                <CloseCircleOutlined className="text-red-500" />
              )}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Start Time:</strong> {new Date(selectedRoom.startTime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              <strong>End Time:</strong> {new Date(selectedRoom.endTime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Payment Method:</strong> {selectedRoom.paymentMethod}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Fee:</strong> ${selectedRoom.fee}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Status:</strong> <Tag color={selectedRoom.status === 'Confirmed' ? 'green' : 'orange'}>{selectedRoom.status}</Tag>
            </p>
            {selectedRoom.note && (
              <p className="text-sm text-gray-500">
                <strong>Note:</strong> {selectedRoom.note}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MyRoomPage;
