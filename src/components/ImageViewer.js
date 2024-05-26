import React, { useState, useEffect } from 'react';
import './ImageViewer.css';

const ImageViewer = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/imagePaths.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const imagePaths = await response.json();
        console.log('Fetched image paths:', imagePaths); // Debug message
        setImages(imagePaths);
        if (imagePaths.length > 0) {
          setSelectedImage(imagePaths[0]); // Select the first image by default
        }
      } catch (error) {
        console.error('Error fetching images:', error); // Debug message
      }
    };

    fetchImages();
  }, []);

  if (images.length === 0) return <div>Loading...</div>;

  return (
    <div className="image-viewer">
      <div className="image-list">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`image-item ${selectedImage === image ? 'selected' : ''}`}
            onClick={() => setSelectedImage(image)}
          >
            {image}
          </div>
        ))}
      </div>
      <div className="image-display">
        {selectedImage && <img src={selectedImage} alt="Selected" />}
      </div>
    </div>
  );
};

export default ImageViewer;
