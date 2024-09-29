function convertToLocalServerPath(filePath:any) {
  const localFilePathPrefix =
    "C:\\Users\\Administrator\\Desktop\\Medicare-app\\backend\\src\\assets\\";
  const serverUrl = "http://localhost:3000/assets/";
  if (filePath && filePath.startsWith(localFilePathPrefix)) {
    const relativeFilePath = filePath.slice(localFilePathPrefix.length);
    const fileName = relativeFilePath.replace("\\src\\assets\\", "");
    const newPath = serverUrl + fileName;
    return newPath;
  }
  return "nami";
}

export default convertToLocalServerPath;

// C:\Users\Administrator\Desktop\Medicare-app\backend\src\assets\doorPic-1723468583164-71187842-pharmacy door.jpg

// http://localhost:3000/assets/doorPic-1723468758692-718129667-pharmacies.jpg