const express = require("express");
const bcrypt = require("bcryptjs");

const jsonwebT = require("jsonwebtoken");

const logreg = require("../Model/model");
const faqmodel = require("../Model/faq");

class Control {
  // Home

  async home(req, res) {
    try {
      res.render("home");
    } catch (error) {
      throw error;
    }
  }
  //Authentication
  async authenter(req, res,next) {
    try {
      if (req.user) {
        next();
        console.log(req.user);
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      throw error;
    }
  }

  //Home
  async index(req, res) {
    try {
      if (req.user) {
        res.render("index", {
          data: req.user, //For navbar name display check line no - @142
        });
      }
    } catch (error) {
      throw error;
    }
  }

  //Login

  async login(req, res) {
    try {
      res.render("login");
    } catch (error) {
      throw error;
    }
  }

  // Logout

  async logout(req, res) {
    try {
      
    } catch (error) {
      
    }throw error
  }

  // Register

  async register(req, res) {
    try {
      res.render("register");
    } catch (error) {
      throw error;
    }
  }

  // Get Register

  async getregister(req, res) {
    try {
      console.log(req.body);
      // Empty Field Checking
      if (
        !req.body.name &&
        req.body.email &&
        req.body.password &&
        req.body.confirmpassword
      ) {
        res.redirect("/register");
        console.log("Field Should Not be Empty");
      } else {
        let emailexists = await logreg.findOne({
          email: req.body.email,
        });
        if (emailexists) {
          console.log("Email existed");
        } else {
          if (!req.body.password === req.body.confirmpassword) {
          } else {
            req.body.password = bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10)
            );
            console.log(req.body);
            let savedata = await logreg.create(req.body);
            if (savedata && savedata._id) {
              res.redirect("/login");
            } else {
              console.log(error);
              console.log("Registration Failed");
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }

  // Get Log-In

  async getlogin(req, res) {
    try {
      let existuser = await logreg.findOne({ email: req.body.email });
      if (existuser) {
        let haspass = existuser.password;
        if (bcrypt.compareSync(req.body.password, haspass)) {
          const token = jsonwebT.sign(
            {
              _id: existuser._id,
              email: existuser.email,
              name:existuser.name  // For profile name
            },
            "Crash098",
            {
              expiresIn: "60s",
            }
          );
          console.log(req.body);
          res.cookie("Token_C", token);
          console.log("Login Successfully");
          res.redirect("/das")
        } else {
          console.log("Login Failed");
        }
      }
    } catch (error) {
      throw error;
    }
  }

  /**
 @ FAQ Controller
 */

  async faq(req, res) {
    try {
      //res.render("faq")

      faqmodel.find((err, data) => {
        if (!err) {
          if (req.user) {
            res.render("faq", {
              data: req.user,
              viewdata: data
            });
            console.log(req.user);
          } else {
            res.render("faq", {
              data: "",
              viewdata: 0,
            });
          } 
        }
      });
    } catch (error) {
      throw error;
    }
  }

  // Faq form
  async faqform(req, res) {
    try {
      res.render("faqform");
    } catch (error) {
      throw error;
    }
  }

  // Add QnA

  async addfaq(req, res) {
    try {
      let savedata = await faqmodel.create(req.body);
      if (savedata && savedata._id) {
        console.log("Faq Added...");
        res.redirect("/faq");
      } else {
        console.log("Faq not Added");
      }
    } catch (error) {
      throw error;
    }
  }

  //Edit faq

  async editfaq(req, res) {
    try {
      const userid = req.params.e_id;
      const editdata = await faqmodel.findById(userid);
      res.render("editfaq", {
        data: editdata,
      });
    } catch (error) {
      throw error;
    }
  }
  //Del faq

  async delfaq(req, res) {
    try {
      const userid = req.params._id; 
      const delter = await faqmodel.deleteOne({ _id: userid });
      console.log("Faq Deletd");
      res.redirect("/faq");
    } catch (error) {
      throw error;
    }
  }

  // Update faq

  async updatefaq(req, res) {
    try {
      const update = await faqmodel.findByIdAndUpdate(
        req.body.uid,
        req.body
      );
      console.log(update);
      if (update) {
        console.log("Data updated");
        res.redirect("/faq");
      }
    } catch (error) {
      throw error;
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("Token_C")
      res.redirect("/")
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Control();
