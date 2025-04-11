const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Ecommerce",
    format: async (req, file) => {
      const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
      const ext = file.originalname.split(".").pop();
      return validImageExtensions.includes(ext) ? ext : "png";
    },
    public_id: (req, file) => {
      const nameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");
      const cleanName = nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, "_");
      return `${cleanName}-${Date.now()}`;
    },
  },
});
module.exports = multer({ storage: storage });
