const webtok = require("jsonwebtoken");

class filter {
  async filterz(req, res, next) {
    try {
      if (req.cookies && req.cookies.Token_C) {
        webtok.verify(req.cookies.Token_C, "Crash098", (err, data) => {
          if (!err) {
            console.log(data);
            req.user = data;
            next();
          } else {
            console.log(err);
          }
        })
      } else {
        next();
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new filter();
