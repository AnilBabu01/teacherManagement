import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./images");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + " " + file.originalname);
  },
});

export const upload = multer({ storage });
