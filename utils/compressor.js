import Compressor from "compressorjs";

export const imageCompressor = (image, setCompressedFile) => {
  new Compressor(image, {
    quality: 0.8, // 80% compression ratio
    success: (compressedResult) => {
      // compressedResult has the compressed file.
      setCompressedFile(compressedResult);
    },
  });
};
