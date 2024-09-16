import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Modal, Popover } from 'antd';
const FeedbackGallery = ({ images }: any) => {
  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

    // State to track the image for the modal
    const [modalImage, setModalImage] = useState('');
    const [modalText, setModalText] = useState('');
  // Function to handle going to the next image
  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Function to handle going to the previous image
  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  // Function to handle opening the modal
  const showModal = (image: string) => {
    setModalImage(image);
    setModalText('Additional information about this image');
    setIsModalVisible(true);
  };

    // Function to handle closing the modal
    const handleCancel = () => {
        setIsModalVisible(false);
      };
  return (
    <div className="relative w-full mx-auto text-center mt-10">
      {/* Display current image */}
      <Popover  title={<span className='text-[#647C6C]'>Click Image to see feedback</span>}>
      <img
        src={images[currentImageIndex]}
        alt={`Feedback ${currentImageIndex + 1}`}
        className="w-full h-[400px] object-cover mb-4 cursor-pointer"
        onClick={() => showModal(images[currentImageIndex])}
      />
 </Popover>
      {/* Previous and Next Icons */}
      <div>
        {/* Previous Icon */}
        <ArrowLeft
          onClick={handlePrev}
          className={`absolute top-1/2 left-2 transform -translate-y-1/2 p-1 bg-white rounded-full text-gray-700 cursor-pointer ${
            currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          size={30}
        />

        {/* Next Icon */}
        <ArrowRight
          onClick={handleNext}
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 p-1 bg-white rounded-full text-gray-700 cursor-pointer ${
            currentImageIndex === images.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          size={30}
        />
      </div>

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered
        width={800}
      >
        <div className="flex flex-col items-center">
          <img
            src={modalImage}
            alt="Modal Content"
            className="w-full h-[500px] object-cover mb-4"
          />
          <p>{modalText}</p>
        </div>
      </Modal>
    </div>
  );
};

export default FeedbackGallery;
