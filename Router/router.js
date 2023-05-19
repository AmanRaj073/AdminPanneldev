const express = require("express");
const router = express.Router();
const controller = require("../Controller/controller");

// const MDW = require("../middleware/middleware")
// Controller
router.get("/", controller.home)
router.get("/login", controller.login)
router.get("/register", controller.register)

router.post("/getregister", controller.getregister)
router.post("/getlogin", controller.getlogin)

router.get("/das", controller.authenter, controller.index);

// FAQ Router

router.get("/faq", controller.faq)
router.get("/faqform", controller.faqform)
router.post("/addfaq", controller.addfaq)
router.get("/editfaq/:e_id", controller.editfaq)
router.get("/delfaq/:_id", controller.delfaq)
router.post("/updatefaq", controller.updatefaq)
router.get("/logout", controller.logout)



module.exports = router;
