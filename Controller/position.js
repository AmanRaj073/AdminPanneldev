

const catmodel = require("../Model/position") 
    
class category {
  //category

  async addcat(req, res) {
    try {
      res.render("addcategory");
    } catch (error) {
      throw error;
    }
  }

  //Store cat

  async storecat(req, res) {
    try {
      let savecat = await catmodel.create(req.body);
        if (savecat && savecat._id) {
          console.log(req.body);
        res.redirect("/adduser");
      } else {
        res.redirect;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new category();