var db = require("../../config/db");
var response_msg = require("../errors/error.msg")

// blog post
exports.blogRegistration = (req, res) => {
    if (req.user["role_id"]==1) {   
        blog_data = [req.user["uid"], req.body.title, req.file.location, req.body.description]
        console.log(blog_data)
        db.query("INSERT INTO blogpost(userID,title,blog_img,blog_description) VALUES(?,?,?,?)", blog_data, (err) => {
            if (!err) {
                
                res.status(200).json({ aset: response_msg["200"] });
            } else {
                res.status(401).json({ aset: "Failed to post article", err: err });
                console.log(err);
            }
        });
    } else {
        res.status(501).json({ aset: "You're not verified, check your token." });
    }
};


// get blog article
exports.getArticle = (req, res) => {
    // if (req.user) {
        db.query("SELECT user.name, blogpost.articleID ,blogpost.title,blogpost.blog_img,blogpost.blog_description FROM blogpost,user where blogpost.userID = user.userID AND blogpost.bl_status = 1", (err, feedback) => {
            if (!err && feedback.length > 0) {
                var article = [];
                for (i = 0; i < feedback.length; i++) {
                    article.push({ "id": feedback[i].articleID, "author": feedback[i].name, "title": feedback[i].title, "img": feedback[i].blog_img, "content": feedback[i].blog_description, "createdAt": feedback[i].post_date });
                }
                res.status(200).json({ aset: response_msg["200"], data: article })
            }
            else {
                res.status(400).json({ aset: "Failed to pull blog article", issue: err });
                console.log(err)
            }
        });
    // } else {
    //     res.status(401).json({ aset: "You're not verified token." });
    // }
}

exports.getSingleArticle = (req, res) => {
  const articleID = req.params.articleID

  db.query(
    'SELECT user.name, blogpost.articleID, blogpost.title, blogpost.blog_img, blogpost.blog_description FROM blogpost INNER JOIN user ON blogpost.userID = user.userID WHERE blogpost.articleID = ? AND blogpost.bl_status = 1',
    [articleID],
    (err, feedback) => {
      if (!err && feedback.length > 0) {
        const { articleID, name, title, blog_img, blog_description } =
          feedback[0]
        const article = {
          id: articleID,
          author: name,
          title,
          img: blog_img,
          content: blog_description,
        }
        res.status(200).json({ aset: response_msg['200'], data: article })
      } else {
        res.status(404).json({ aset: 'Blog article not found' })
        console.log(err)
      }
    }
  )
}



// access a specific data for perfoming update method
exports.specificDataToUpdate = (req, res) => {
    if (req.user["role_id"] == 1) {
        db.query("SELECT user.name, blogpost.articleID ,blogpost.title,blogpost.blog_img,blogpost.blog_description FROM blogpost,user where blogpost.userID = user.userID AND blogpost.articleID = ? AND blogpost.bl_status = 1", [req.params.id], (err, feedback) => {
            if (!err && feedback.length > 0) {
                var article_to_update = [];
                article_to_update.push({ "id": feedback[0].articleID, "author": feedback[0].name, "title": feedback[0].title, "img": feedback[0].blog_img, "content": feedback[0].blog_description, "createdAt": feedback[0].post_date });
                res.status(200).json({ aset: response_msg["200"], data: article_to_update })
            }
            else {
                res.status(400).json({ aset: "Failed to pull blog article", issue: err });
                console.log(err)
            }
        });
    } else {
        res.status(401).json({ aset: "You don't have permission to update this blog post." });
    }
}



// update article
exports.updateArticle = (req, res) => {
    if (req.user["role_id"] == 1) {
        let data_to_update = [req.body.title, req.body.description, req.file?.location, req.body.id]
        const commands = ['blogpost.title = ? ', 'blogpost.blog_description = ? ', 'blog_img = ? ']
        const toRun = data_to_update
          .slice(0, data_to_update.length - 1)
          .map((c, index) => {
            if(c !==null && c!==undefined) return commands[index]
            return null
        }).filter((c)=>c !== null)
          .join(', ') 
        const toUpdate = data_to_update.filter((b)=>(b !== undefined) && (b !==null) );
        console.log(toRun, toUpdate)
        
        
        db.query(`UPDATE blogpost SET ${toRun} WHERE articleID = ? `,toUpdate, (err) => {
            if (!err) {
                res.status(200).json({ aset: "Successfully updated" });
                console.log(`${req.user['name']} update blogpost with id ${data_to_update[3]} successfuly `)
            } else {
                res.status(401).json({ aset: "You don't have permission to update this blog post." });
            }
        });
    } else {
        res.status(401).json({ aset: "You don't have permission to update this blog post." });
    }
};


// delete article
exports.deleteArticle = (req, res) => {
    if (req.user["role_id"] == 1) {
        deleted_article = [0, req.params.id]
        db.query("UPDATE blogpost SET blogpost.bl_status = ? where blogpost.articleID = ?", deleted_article, (err) => {
            if (!err) {
                res.status(200).json({ aset: "Deleted successfully" });
            } else {
                res.status(401).json({ aset: "Fail to delete an article" });
                console.log(err);
            }
        });
    } else {
        res.status(401).json({ aset: "You don't have permission to delete this blog post." });
    }
};


// exports module
module.exports;