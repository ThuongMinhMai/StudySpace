import React, { useState, useEffect } from 'react';
import { Card, Tag, Button, Modal, Tabs, ConfigProvider } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Reset Ant Design styles
import { start } from 'repl';

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

// Mocked room data
const mockBookedRooms: BookedRoom[] = [
  {
    id: '1',
    username: 'john_doe',
    roomImage: 'https://innovationcafe.qa/cdn/shop/products/startupmeetingroom.jpg?v=1609186074',
    roomName: 'Deluxe Suite',
    shopName: 'Hotel BlueSky',
    startTime: '2024-10-01T12:00',
    endTime: '2024-10-03T12:00',
    status: 'Paid',
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
    status: 'Waiting for Payment',
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
    status: 'Cancel',
    fee: 350,
    bookingDate: '2024-09-29',
    paymentMethod: 'Credit Card',
    checkIn: true,
    note: 'Free breakfast included',
  },
];

function MyRoomPage() {
  const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<BookedRoom | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('All'); // Default to 'All' tab

  useEffect(() => {
    setBookedRooms(mockBookedRooms); // Set the mock data
  }, []);

  // Show the modal for room details
  const showModal = (room: BookedRoom) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRoom(null);
  };

  // Filter booked rooms based on the active tab (status or "All")
  const filteredRooms = activeTab === 'All' ? bookedRooms : bookedRooms.filter((room) => room.status === activeTab);

  return (
    <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#647C6C'
            },
            components: {
              Button: {
              }
            }
          }}
        >
    <div className="my-room-page-container p-4 flex flex-col items-center mt-10 m-auto">
      <h1 className="text-2xl font-bold mb-6">My Booked Rooms</h1>
      
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)} // Update active tab on change
        centered
         className="w-full"
        tabBarGutter={0} 
      >
        <Tabs.TabPane tab={<span className='font-medium'>All</span>} key="All" >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10">
            {filteredRooms.length === 0 ? (
              <div>No rooms booked</div>
            ) : (
              filteredRooms.map((room) => (
                <Card
                  key={room.id}
                  className="shadow-lg"
                  cover={<img className="max-w-sm" alt={room.roomName} src={room.roomImage} />}
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
                      <strong>Status:</strong>{' '}
                      <Tag color={room.status === 'Paid' ? 'green' : room.status === 'Cancel' ? 'red' : 'orange'}>
                        {room.status}
                      </Tag>
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span className='font-medium'>Paid</span>} key="Paid">
          {/* Paid tab content is the same as in the "All" tab but filtered */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10">
            {filteredRooms.length === 0 ? (
              <div>No rooms booked</div>
            ) : (
              filteredRooms.map((room) => (
                <Card
                  key={room.id}
                  className="shadow-lg"
                  cover={<img className="max-w-sm" alt={room.roomName} src={room.roomImage} />}
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
                      <strong>Status:</strong>{' '}
                      <Tag color="green">{room.status}</Tag>
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span className='font-medium'>Waiting for Payment</span>} key="Waiting for Payment">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10">
            {filteredRooms.length === 0 ? (
              <div>No rooms booked</div>
            ) : (
              filteredRooms.map((room) => (
                <Card
                  key={room.id}
                  className="shadow-lg"
                  cover={<img className="max-w-sm" alt={room.roomName} src={room.roomImage} />}
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
                      <strong>Status:</strong>{' '}
                      <Tag color="orange">{room.status}</Tag>
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span className='font-medium'>Cancel</span>} key="Cancel">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10">
            {filteredRooms.length === 0 ? (
              <div>No rooms booked</div>
            ) : (
              filteredRooms.map((room) => (
                <Card
                  key={room.id}
                  className="shadow-lg"
                  cover={<img className="max-w-sm" alt={room.roomName} src={room.roomImage} />}
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
                      <strong>Status:</strong>{' '}
                      <Tag color="red">{room.status}</Tag>
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Tabs.TabPane>
      </Tabs>

      {/* Modal for room details */}
      <Modal title="Room Details" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {selectedRoom && (
          <div>
            <p className="text-sm text-gray-500">
              <strong>Room Name:</strong> {selectedRoom.roomName}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Start:</strong> {selectedRoom.startTime}
            </p>
            <p className="text-sm text-gray-500">
              <strong>End:</strong> {selectedRoom.endTime}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Status:</strong>{' '}
              <Tag color={selectedRoom.status === 'Paid' ? 'green' : selectedRoom.status === 'Cancel' ? 'red' : 'orange'}>
                {selectedRoom.status}
              </Tag>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Fee:</strong> ${selectedRoom.fee}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Booking Date:</strong> {selectedRoom.bookingDate}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Payment Method:</strong> {selectedRoom.paymentMethod}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Check-In:</strong>{' '}
              {selectedRoom.checkIn ? (
                <CheckCircleOutlined style={{ color: 'green' }} />
              ) : (
                <CloseCircleOutlined style={{ color: 'red' }} />
              )}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Note:</strong> {selectedRoom.note}
            </p>
          </div>
        )}
      </Modal>
    </div>
    </ConfigProvider>

  );
}

export default MyRoomPage;
