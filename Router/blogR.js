const express = require("express");

const multer = require("multer");
const blogrouter = express.Router();
const blogcontrol = require("../Controller/blogc");
const path = require("path");

//Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Public/upload");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "_" +
        Date.now() +
        "img" +
        path.extname(file.originalname)
    );
  },
});

// Size
const maxsize = 1 * 1024 * 1024;

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, true);
      return cb(new Error("Only,jpg,png"));
    }
  },
  limits: maxsize,
});

blogrouter.get("/blog", blogcontrol.blog);
blogrouter.post("/storeblog", upload.single("image"), blogcontrol.storeblog);
blogrouter.get("/addblog", blogcontrol.addblog);
blogrouter.get("/editblog/:_id", blogcontrol.editblog);
blogrouter.get("/delblog/:_id", blogcontrol.delblog);
blogrouter.post("/updateblog", upload.single("image"), blogcontrol.updateblog);


module.exports = blogrouter;
