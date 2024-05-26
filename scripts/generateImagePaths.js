const fs = require('fs');
const path = require('path');

const getAllImages = (dir, fileList = [], rootDir) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllImages(filePath, fileList, rootDir);
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(filePath)) {
      const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
      fileList.push(`/images/${relativePath}`); // Prepend /images/
    }
  });
  return fileList;
};

const publicDir = path.join(__dirname, '../public/images');
const images = getAllImages(publicDir, [], publicDir);
fs.writeFileSync(path.join(__dirname, '../public/imagePaths.json'), JSON.stringify(images, null, 2));

console.log('Image paths have been generated and saved to public/imagePaths.json');
