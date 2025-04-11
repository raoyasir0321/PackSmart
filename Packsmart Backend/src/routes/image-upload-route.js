const router = require("express").Router();
require("dotenv").config();

const { adminauthmiddleware, uploadMiddleware } = require("../middlewares");

router.route("/").post(uploadMiddleware.single("image"), async (req, res) => {
  try {
    res.status(200).json({
      data: {
        message: "File uploaded successfully",
        url: req.file.path,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload file", error: error.message });
  }
});

module.exports = router;
