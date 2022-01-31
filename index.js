const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const multer = require("multer");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));

const PORT = process.env.PORT || 3300;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  try {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch (error) {
    console.log(error);
  }
};

const upload = multer({ storage, fileFilter });

app.get("/", (req, res) => {
  res.send("Image Uploader");
});

app.post("/uploads", upload.single("photo"), (req, res) => {
  try {
    res.send({
        url: `http://localhost:${PORT}/images/${req.file.filename}`,
        status: 200,
      });
  } catch (error) {
      res.send({msg : 'Something Went Wrong', status : 500})
  }
});

app.listen(PORT, () => {
  console.log(`Server started at https://localhost:${PORT}`);
});
