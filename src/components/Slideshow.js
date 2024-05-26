import React, { useState, useEffect } from 'react';

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/imagePaths.json');
        const imagePaths = await response.json();
        console.log('Fetched image paths:', imagePaths); // Debug message
        setImages(imagePaths);
      } catch (error) {
        console.error('Error fetching images:', error); // Debug message
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      console.log('Current image path:', images[currentIndex]); // Debug message
    }
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images, currentIndex]);

  if (images.length === 0) return <div>Loading...</div>;

  return (
    <div className="slideshow">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
    </div>
  );
};

export default Slideshow;
