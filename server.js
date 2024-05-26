const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3001;

// Use the cors middleware with default options
app.use(cors());

app.use(express.static('public'));

const getAllImages = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllImages(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(filePath)) {
      fileList.push(filePath.replace('public', ''));
    }
  });
  return fileList;
};

app.get('/images', (req, res) => {
  const images = getAllImages(path.join(__dirname, 'public/images'));
  res.json(images);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
