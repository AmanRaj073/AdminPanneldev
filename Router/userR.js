const express = require("express");

const userrouter = express.Router();

const usercontrol = require("../Controller/userc");
const positioncontrol = require("../Controller/position")
const multer = require("multer");
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

//Size
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
      return cb(new error("Only JPG/PNG/JPEG"));
    }
  },
  limits: maxsize,
});

userrouter.get("/userm", usercontrol.user);
userrouter.get("/adduser", usercontrol.adduser);
userrouter.post("/storeuser",upload.single("image") ,usercontrol.storeuser);
userrouter.post("/updateuser",upload.single("image"), usercontrol.updateuser);
userrouter.get("/edituser/:_id", usercontrol.edituser);
userrouter.get("/deluser/:_id", usercontrol.deluser);

// Postition Controller
userrouter.post("/storecat", positioncontrol.storecat);
userrouter.get("/addcat", positioncontrol.addcat);


module.exports = userrouter;
