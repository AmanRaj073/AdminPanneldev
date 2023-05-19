const usermodel = require("../Model/userm");
const category = require("../Model/position")


class user {
  // User
  async user(req, res) {
    try {
      let alldata = await usermodel.aggregate([
        {
          $lookup: {
            from: "positions", // from wich model name (below)
            localField: "position", // to field of form
            foreignField: "_id",
            as: "any",
          },
        },
        // { $sort: { name: -1 } },
        {
          $unwind: {
            path: "$any",
          },
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
            "any.createdAt": 0,
            "any.updatedAt": 0,
          },
        },
      ]);
      // console.log(alldata);
      let allpost = await usermodel.find({});
      //console.log(allpost);
      res.render("user", {
        alldata,
        data: req.user,
      });
      // //console.log(alldata);
      // res.render("user", {
      //   alldata,
      //   data: req.user,
      // });
    } catch (error) {
      throw error;
    }
  }
  // Add User form
  async adduser(req, res) {
    try {
      let allcategory = await category.find({});
      console.log(allcategory);
      res.render("adduser", {
        categoryData: allcategory,
        data: req.user,
      });
    } catch (error) {
      throw error;
    }
  }

  // Store User

  async storeuser(req, res) {
    try {
      if (req.file) {
        req.body.image = req.file.filename;
      }
      const storeusser = await usermodel.create(req.body);
      if (storeusser) {
        console.log("User Data Added");
        res.redirect("/userm");
      }
    } catch (error) {
      throw error;
    }
  }
  // Edit User

  async edituser(req, res) {
    try {
      const userid = req.params._id;
      let editusrr = await usermodel.findById(userid);
      res.render("edituser", {
        view: editusrr,
        data:req.user
      });
    } catch (error) {
      throw error;
    }
  }
  // Delete User

  async deluser(req, res) {
    try {
      const userid = req.params._id;
      const delter = await usermodel.deleteOne({ _id: userid });
      console.log("User Deletd");
      res.redirect("/userm");
    } catch (error) {
      throw error;
    }
  }

  // Update User

  async updateuser(req, res) {
    try {
      let update = await usermodel.findByIdAndUpdate(req.body.uid, req.body);
      if (update) {
        console.log(req.body);
        res.redirect("/userm");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new user()
