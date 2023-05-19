
const blogmodel = require("../Model/blogM")

class blogm {

    // Blog
    async blog(req, res) {
        blogmodel.find((err, data) => {
            if (!err) {
                res.render("blog", {
                  viewdata: data,
                  data: req.user,
                });
            }
        })
    } catch(error) {
        throw error
    }

    // Add Blog
    async addblog(req, res) {
        try {
            res.render("addblog", {
              data: req.user,
            });
        } catch (error) {
            throw error
        }
    }

    // Store blog

    async storeblog(req, res) {
        try {
            console.log(req.body);
            console.log(req.filename);
            if (req.file) { 
                req.body.image = req.file.filename
            }
            const storeblog = await blogmodel.create(req.body)
            if (storeblog) {
                console.log(`blog post successfully done ${storeblog}`);
                res.redirect("/blog")
            }
            // const usemodel = new blogmodel({
            //     article: req.body.article,
            //     author: req.body.article,
            //     date: req.body.date,
            //     image: req.body.filename
            // });
            // usemodel.save().then((result) => {
            //     console.log(("Data Saved"), result)
            //     res.redirect("/blog");
            // })
        } catch (error) {
            throw error;
        }
    }

    // Edit

    async editblog(req, res) {
        try {
            const userid = req.params._id
            let editblog = await blogmodel.findById(userid)
            res.render("editblog", {
              data: editblog,
              data: req.user,
            });
        } catch (error) {
            throw error
        }
    }
    // Del

    async delblog(req, res) {
        try {
            const userid = req.params._id;
            const blogdel = await blogmodel.deleteOne({ _id: userid });
            console.log("Blog Deletd");
            res.redirect("/blog");
        } catch (error) {
            throw error
        }
    }

    //update

    async updateblog(req, res) {
        try {
             if (req.file) {
               req.body.image = req.file.filename;
             }
            const updatedata = await blogmodel.findByIdAndUpdate(req.body.uid, req.body)
            if (updatedata) {
                console.log(`Blog-Update-Updated ${updatedata} `);
                res.redirect("/blog")
            }
            
        } catch (error) {
            throw error
        }
    }
}
            
module.exports = new blogm()