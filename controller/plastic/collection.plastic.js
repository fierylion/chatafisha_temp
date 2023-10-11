var db = require("../../config/db");
const path = require("path");
//

// register collected plastic
exports.registPlastic = (req, res) => {
    
    const populateImages = (collectionID, images, res) => {
        images.forEach((image, ind) => {
          //image file
          const imageFile = '/uploads/' + path.basename(image.path)
          const data = [collectionID, imageFile]
          if (ind === 0) data.push(1)
          db.query(
            `INSERT INTO profile_collection_images(collectionID, image_url${
              ind === 0 ? ',active' : ''
            }) VALUES(?,?${ind === 0 ? ',?' : ''})`,
            data,
            (err, result) => {
              if (err) {
                res.status(500).json({
                  aset: 'Failed',
                  message: 'Failed to register plastic',
                })
                console.log(err)
              }
            }
          )
        })  
    }
    if (req.user["role_id"] == 4) {
        plastic_data = [req.body.pid, req.user["uid"], req.body.plastic_type, req.body.quantity]
        console.log(plastic_data)

        // check user availability in pickers_data
        db.query("SELECT * FROM picker_data WHERE picker_id=?", req.body.pid, (err, result) => {
            if (!err && result.length > 0) {
                var new_plastic_amount = parseInt(result[0].amount_col_kg) + parseInt(plastic_data[3]);
                db.query("INSERT INTO plastic_collection(userID,centerID,type,qnty) VALUES(?,?,?,?)", plastic_data, (err, results) => {
                    if (!err) {
                        populateImages(results.insertId, req.files, res);


                        db.query("UPDATE picker_data SET amount_col_kg=?,latest_collection=? WHERE picker_id=?", [new_plastic_amount,req.body.quantity, req.body.pid], (err, result) => {

                            if (!err) {
                                
                                res.status(200).json({ aset: "Successfully registered", data: plastic_data });
                                console.log(`${req.user['name']} has registered plastic data ot user ${plastic_data[0]}`)
                            } else {
                                res.status(401).json({
                                    aset: "Failed",
                                    message: "Data not updated"
                                });
                                console.log(err);
                            }

                        });


                    } else {
                        
                        res.status(200).json({ aset: "Failed to register plastic data" });
                        console.log(`hi ASET, issue is: ${err}`)
                    }
                });

            }
            else{
                db.query("INSERT INTO picker_data(picker_id,amount_col_kg,latest_collection,validator_id) VALUES(?,?,?,?)",[req.body.pid,req.body.quantity,req.body.quantity,req.user["uid"]],(err)=>{
                    if(!err){
                        db.query(
                          'INSERT INTO plastic_collection(userID,centerID,type,qnty) VALUES(?,?,?,?)',
                          plastic_data,
                          (err, result) => {
                            populateImages(result.insertId, req.files, res)
                            if (!err) {
                              res.status(200).json({
                                aset: 'Success',
                                message: 'data registered successed',
                              })
                            } else {
                              res.status(401).json({
                                aset: 'Fail',
                                message: 'Failed to register plastic',
                              })
                              console.log(err)
                            }
                          }
                        )
                    }else{
                        res.status(401).json({
                            aset:"Fail",
                            message:"Fail to register data"
                        });
                        console.log(err);
                    }
                });
            }
        });




    } else {
        res.status(401).json({
            aset:"Unauthorized",
            message:"Permission Denied"
        })
        console.log("mmh")
    }
};


// display collected data
exports.displayData = (req, res) => {
    if (req.user) {
        db.query("SELECT type,qnty,name FROM plastic_collection,user WHERE plastic_collection.centerID = user.userID", (err, feedback) => {
            if (!err) {
                var plastic_data = []
                for (i = 0; i < feedback.length; i++) {
                    plastic_data.push({ "type": feedback[i].type, "quantity": feedback[i].qnty, "center": feedback[i].name })
                }
                res.status(200).json({ aset: "success!!", data: plastic_data })
            } else {
                res.status(401).json({ aset: "failed!!" });
                console.log(`Hi, ASET issue is: ${err}`)
            }
        });
    } else {
        res.status(501).json({ aset: "Sorry!! you're not verified" });
    }
};



// export module
module.exports;