import imageCompression from "browser-image-compression";

const compress = async (file: File) => {
  if (!file) return;
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 700,
    useWebWorker: true,
    fileType: "image/jpeg",
  };
  const compressedFile = await imageCompression(file, options);
  return compressedFile;
};

export default compress;
