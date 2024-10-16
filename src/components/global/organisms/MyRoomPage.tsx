import React, { useState, useEffect } from 'react'
import { Card, Tag, Button, Modal, Tabs, ConfigProvider } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import 'antd/dist/reset.css' // Reset Ant Design styles
import { start } from 'repl'
import studySpaceAPI from '../../../lib/studySpaceAPI'
import { useAuth } from '../../../auth/AuthProvider'
import { Moon } from 'lucide-react'
import RatingForm from './RatingForm'

// Define the structure of the booked room data
interface BookedRoom {
  bookingId:number
  roomId: number
  roomName: string
  storeName: string
  capacity: number
  pricePerHour: number
  description: string
  status: boolean
  area: number
  type: string
  image: string
  address: string
  isOvernight: boolean
  typeSpace: string
  bookedDate: string
  bookedTime: string
  bookingStatus: string
  start: string
  end: string
  checkIn: boolean
  paymentMethod: string
  isFeedback: boolean
}

function MyRoomPage() {
  const { user } = useAuth()
  const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([])
  const [selectedRoom, setSelectedRoom] = useState<BookedRoom | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('All') // Default to 'All' tab
  const [showRatingForm, setShowRatingForm] = useState(false)

  useEffect(() => {
    // Fetch data from your API
    const fetchBookedRooms = async () => {
      try {
        const response = await studySpaceAPI.get(`/Room/booked/user/${user?.userID}`) // Update with your actual endpoint
        setBookedRooms(response.data.data)
      } catch (error) {
        console.error('Error fetching booked rooms:', error)
      }
    }

    fetchBookedRooms()
  }, [user?.userID])

  const showModal = (room: BookedRoom) => {
    setSelectedRoom(room)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedRoom(null)
  }
  const handleRatingSuccess = () => {
    if (selectedRoom) {
      setBookedRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.roomId === selectedRoom.roomId
            ? { ...room, isFeedback: true as boolean } // Cast to boolean explicitly
            : room
        )
      )
      setShowRatingForm(false)
    }
  }
  const handleFeedback = (room: BookedRoom) => {
    setSelectedRoom(room)
    setShowRatingForm(true)
  }
  const filteredRooms =
    activeTab === 'All' ? bookedRooms : bookedRooms.filter((room) => room.bookingStatus === activeTab)

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#647C6C'
        },
        components: {
          Button: {}
        }
      }}
    >
      <div className='my-room-page-container p-4 flex flex-col items-center mt-10 m-auto'>
        <h1 className='text-2xl font-bold mb-6'>My Booked Rooms</h1>

        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)} // Update active tab on change
          centered
          className='w-full'
          tabBarGutter={90}
        >
          <Tabs.TabPane tab={<span className='font-medium'>All</span>} key='All'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10'>
              {filteredRooms.length === 0 ? (
                <div>No rooms booked</div>
              ) : (
                filteredRooms.map((room) => (
                  <Card
                    key={room.roomId}
                    className='shadow-lg w-[350px]'
                    cover={
                      <img className='w-full h-48 object-cover rounded-t-lg' alt={room.roomName} src={room.image} />
                    }
                    actions={[
                      <Button type='primary' onClick={() => showModal(room)}>
                        View Details
                      </Button>,
                      !room.isFeedback && room.checkIn && (
                        <Button type='primary' onClick={() => handleFeedback(room)}>
                          Leave Feedback
                        </Button>
                      )
                    ]}
                  >
                    <div className='p-4'>
                      <h2 className='font-semibold text-xl'>{room.roomName}</h2>
                      <p className='text-sm text-gray-500'>{room.storeName}</p>
                      <p className='text-sm text-gray-500'>
                        <strong>Fee:</strong> ${room.pricePerHour}
                      </p>
                      <p className='text-sm text-gray-500'>
                        <strong>Status:</strong>{' '}
                        <Tag
                          color={
                            room.bookingStatus === 'PAID'
                              ? 'green'
                              : room.bookingStatus === 'CANCELED'
                                ? 'red'
                                : 'orange'
                          }
                        >
                          {room.bookingStatus}
                        </Tag>
                      </p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span className='font-medium'>Paid</span>} key='PAID'>
            {/* Paid tab content is the same as in the "All" tab but filtered */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10'>
              {filteredRooms.length === 0 ? (
                <div>No rooms booked</div>
              ) : (
                filteredRooms.map((room) => (
                  <Card
                    key={room.roomId}
                    className='shadow-lg w-[350px]'
                    cover={
                      <img className='w-full h-48 object-cover rounded-t-lg' alt={room.roomName} src={room.image} />
                    }
                    actions={[
                      <Button type='primary' onClick={() => showModal(room)}>
                        View Details
                      </Button>,
                      !room.isFeedback && room.checkIn && (
                        <Button type='primary' onClick={() => handleFeedback(room)}>
                          Leave Feedback
                        </Button>
                      )
                    ]}
                  >
                    <div className='p-4'>
                      <h2 className='font-semibold text-xl'>{room.roomName}</h2>
                      <p className='text-sm text-gray-500'>{room.storeName}</p>
                      <p className='text-sm text-gray-500'>
                        <strong>Fee:</strong> ${room.pricePerHour}
                      </p>
                      <p className='text-sm text-gray-500'>
                        <strong>Status:</strong>{' '}
                        <Tag
                          color={
                            room.bookingStatus === 'PAID'
                              ? 'green'
                              : room.bookingStatus === 'CANCELED'
                                ? 'red'
                                : 'orange'
                          }
                        >
                          {room.bookingStatus}
                        </Tag>
                      </p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span className='font-medium'>Waiting for Payment</span>} key='PENDING'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10'>
              {filteredRooms.length === 0 ? (
                <div>No rooms booked</div>
              ) : (
                filteredRooms.map((room) => (
                  <Card
                    key={room.roomId}
                    className='shadow-lg w-[350px]'
                    cover={
                      <img className='w-full h-48 object-cover rounded-t-lg' alt={room.roomName} src={room.image} />
                    }
                    actions={[
                      <Button type='primary' onClick={() => showModal(room)}>
                        View Details
                      </Button>,
                      !room.isFeedback && room.checkIn && (
                        <Button type='primary' onClick={() => handleFeedback(room)}>
                          Leave Feedback
                        </Button>
                      )
                    ]}
                  >
                    <div className='p-4'>
                      <h2 className='font-semibold text-xl'>{room.roomName}</h2>
                      <p className='text-sm text-gray-500'>{room.storeName}</p>
                      <p className='text-sm text-gray-500'>
                        <strong>Fee:</strong> ${room.pricePerHour}
                      </p>
                      <p className='text-sm text-gray-500'>
                        <strong>Status:</strong>{' '}
                        <Tag
                          color={
                            room.bookingStatus === 'PAID'
                              ? 'green'
                              : room.bookingStatus === 'CANCELED'
                                ? 'red'
                                : 'orange'
                          }
                        >
                          {room.bookingStatus}
                        </Tag>
                      </p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span className='font-medium'>Cancel</span>} key='CANCELED'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10'>
              {filteredRooms.length === 0 ? (
                <div>No rooms booked</div>
              ) : (
                filteredRooms.map((room) => (
                  <Card
                    key={room.roomId}
                    className='shadow-lg w-[350px]'
                    cover={
                      <img className='w-full h-48 object-cover rounded-t-lg' alt={room.roomName} src={room.image} />
                    }
                    actions={[
                      <Button type='primary' onClick={() => showModal(room)}>
                        View Details
                      </Button>,
                      !room.isFeedback && room.checkIn && (
                        <Button type='primary' onClick={() => handleFeedback(room)}>
                          Leave Feedback
                        </Button>
                      )
                    ]}
                  >
                    <div className='p-4'>
                      <h2 className='font-semibold text-xl'>{room.roomName}</h2>
                      <p className='text-sm text-gray-500'>{room.storeName}</p>
                      <p className='text-sm text-gray-500'>
                        <strong>Fee:</strong> ${room.pricePerHour}
                      </p>
                      <p className='text-sm text-gray-500'>
                        <strong>Status:</strong>{' '}
                        <Tag
                          color={
                            room.bookingStatus === 'PAID'
                              ? 'green'
                              : room.bookingStatus === 'CANCELED'
                                ? 'red'
                                : 'orange'
                          }
                        >
                          {room.bookingStatus}
                        </Tag>
                      </p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span className='font-medium'>Failed</span>} key='FAILED'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10'>
              {filteredRooms.length === 0 ? (
                <div>No rooms booked</div>
              ) : (
                filteredRooms.map((room) => (
                  <Card
                    key={room.roomId}
                    className='shadow-lg'
                    cover={
                      <img className='w-full h-48 object-cover rounded-t-lg' alt={room.roomName} src={room.image} />
                    }
                    actions={[
                      <Button type='primary' onClick={() => showModal(room)}>
                        View Details
                      </Button>
                    ]}
                  >
                    <div className='p-4'>
                      <h2 className='font-semibold text-xl'>{room.roomName}</h2>
                      <p className='text-sm text-gray-500'>{room.storeName}</p>
                      <p className='text-sm text-gray-500'>
                        <strong>Fee:</strong> ${room.pricePerHour}
                      </p>
                      <p className='text-sm text-gray-500'>
                        <strong>Status:</strong>{' '}
                        <Tag
                          color={
                            room.bookingStatus === 'PAID'
                              ? 'green'
                              : room.bookingStatus === 'CANCELED'
                                ? 'red'
                                : 'orange'
                          }
                        >
                          {room.bookingStatus}
                        </Tag>
                      </p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Tabs.TabPane>
        </Tabs>

        {/* Modal for room details */}
        <Modal title='Booking Room Detail' visible={isModalVisible} onCancel={handleCancel} footer={null}>
          {selectedRoom && (
            <div>
              <p className='text-sm text-gray-500'>
                <strong>Room Name:</strong> {selectedRoom.roomName}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Room Type:</strong> {selectedRoom.type}
              </p>
              <div className='flex gap-2'>
                <p className='text-sm text-gray-500'>
                  <strong>Store Name:</strong> {selectedRoom.storeName}
                </p>
                {selectedRoom?.isOvernight && (
                  <div className='flex justify-start items-center text-lg font-medium'>
                    <Moon size={16} className='text-blue-900' /> {/* Set icon color */}
                    <p className='text-blue-900 text-sm ml-2'>(Overnight)</p> {/* Set text color and spacing */}
                  </div>
                )}
              </div>
              <p className='text-sm text-gray-500'>
                <strong>Type Space:</strong> {selectedRoom.typeSpace}
              </p>

              <p className='text-sm text-gray-500'>
                <strong>Start:</strong> {selectedRoom.start}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>End:</strong> {selectedRoom.end}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Status:</strong>{' '}
                <Tag
                  color={
                    selectedRoom.bookingStatus === 'PAID'
                      ? 'green'
                      : selectedRoom.bookingStatus === 'CANCELED'
                        ? 'red'
                        : 'orange'
                  }
                >
                  {selectedRoom.bookingStatus}
                </Tag>
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Fee:</strong> ${selectedRoom.pricePerHour}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Booking Date:</strong> {selectedRoom.bookedDate}-{selectedRoom.bookedTime}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Payment Method:</strong> {selectedRoom.paymentMethod}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Check-In:</strong>{' '}
                {selectedRoom.checkIn ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )}
              </p>
            </div>
          )}
        </Modal>
        {
          showRatingForm && (
            <Modal title='Leave Feedback' visible={showRatingForm} onCancel={() => setShowRatingForm(false)} footer={null}>
            {selectedRoom && (
              <RatingForm
                setShowRatingForm={setShowRatingForm}
                bookingId={selectedRoom.bookingId}
                onRatingSuccess={handleRatingSuccess}
              />
            )}
          </Modal>
          )
        }
       
      </div>
    </ConfigProvider>
  )
}

export default MyRoomPage
