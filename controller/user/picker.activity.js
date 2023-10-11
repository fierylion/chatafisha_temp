var db = require("../../config/db"); // db connection
const path = require("path");

// register picker
exports.registPicker = (req, res) => {
    if (req.user["role_id"] == 4) {
      //image file
      const imageFile = '/uploads/'+ path.basename(req.file.path)
    
        var picker_data = [
            req.body.firstname,
            req.body.mname,
            req.body.lastname,
            req.body.phone_number,
            req.body.location,
            req.body.role, // 1 - picker
            req.user['uid'],
            imageFile

        ]
     console.log(req.file.path)
        db.query("INSERT INTO customer(fname,mname,lname,phone,location,role,staff_id,img_url) VALUES(?,?,?,?,?,?,?,?)", picker_data, (err) => {
            if (!err) {
                res.status(200).json({
                    aset: "Success",
                    message: "Picker registered successfully",
                });
            } else if (err["errno"] == 1062) {
                res.status(402).json({
                    aset: "Failed To regsiter",
                    message: "Email or Phone number alredy used[Duplicated]"
                })
            }
            else {
                res.status(401).json({
                    aset: "Failed",
                    message: "Failed, please check your information",
                    err: err
                });
                console.log(err)
            }
        });
    } else {
        res.status(401).json({
            aset: "Unauthorized",
            message: "Permission Denied"
        });
    }
};


// get pickers lists
exports.getPickerList = (req, res) => {
 
    db.query(
      'SELECT p.created_at as latest_collection_date, c.staffID as id, c.fname as firstname, c.mname as middlename, c.lname as last_name, c.location, c.email, c.phone as phone_no, c.img_url as profile_img, p.amount_col_kg as total_collection, p.latest_collection as latest FROM customer c LEFT JOIN picker_data p ON c.staffID = p.picker_id WHERE c.role = ?',
      [1],
      (err, result) => {
        if (!err) {
          const pickerData = []
          for (let i = 0; i < result.length; i++) {
            const {
              id,
              firstname,
              middlename,
              last_name,
              location,
              email,
              phone_no,
              profile_img,
              total_collection,
              latest,
              latest_collection_date,
            } = result[i]
            pickerData.push({
              id,
              firstname,
              middlename,
              last_name,
              location,
              email,
              phone_no,
              profile_img,
              total_collection,
              latest,
              latest_collection_date
            })
          }
          res.status(200).json({
            aset: 'success',
            message: 'List of Pickers',
            data: pickerData,
          })
        } else {
          res.status(401).json({
            aset: 'Failed',
            message: 'Failed to pull picker data',
          })
          console.log(err)
        }
      }
    )
 
}


exports.getSpecificPicker = (req, res) => {
    
      
        db.query(
          'SELECT customer.staffID as id, customer.fname as firstname,customer.lname as lastname,customer.location,customer.email,customer.phone as phone_number,customer.img_url as profile_img, picker_data.amount_col_kg as amount_col_kg,picker_data.created_at as latest_collection_date, picker_data.latest_collection as latest_collection, picker_data.points as points FROM customer LEFT JOIN picker_data ON customer.staffID = picker_data.picker_id WHERE customer.role = 1 AND customer.staffID = ?',
          [ req.params['id']],
          (err, result) => {
            if (!err && result.length > 0) {
              res.status(200).json({
                aset: 'success',
                message: `Picker ${result[0].firstname}`,
                data: result,
              })
            } else {
              res.status(401).json({
                aset: 'failed',
                message: 'Failed to pull picker lists',
              })
              console.log(err)
            }
          }
        )
    
};

// validator lists
exports.validatorList = (req,res)=>{
    if(req.user["role_id"] == 1){
        db.query("SELECT name as fullname,location , email,phone_no as phone_number, registration_no as ID_NUMBER FROM user WHERE role=?",[4],(err,result)=>{
            if(!err && result.length > 0){
                res.status(200).json({
                    aset: "success",
                    message: "List of Validator",
                    data: result
                })

            }else{
                res.status(401).json({
                    aset:"Fail",
                    message:"Fail to pull validator list"
                });
            }
        });
    }else {
        res.status(401).json({
            aset: "Unauthorized",
            message: "Permission Denied"
        });
    };
};


// display collected data specific user
exports.getCollectionHistory = (req, res) => {
    
        db.query(
          'select collectionID, type, qnty,u.staffID as pickerID, u.fname AS firstname, u.lname AS lastname, collected_date,  user.name AS admin_name from plastic_collection left join customer u on plastic_collection.userID=u.staffID left join user on plastic_collection.adminID = user.userID where plastic_collection.userID= ? ',
          [req.params['id']],
          (err, feedback) => {
            if (!err ) {
              res.status(200).json({ aset: 'success!!', data: feedback })
            } else {
              res.status(401).json({ aset: 'failed!!' })
              console.log(`Hi, ASET issue is: ${err}`)
            }
          }
        )
  
};

exports.getAllCollectionHistory = (req, res) => {
  if (req.user['role_id'] == 1 || req.user['role_id'] == 4) {
    db.query(
      `
            SELECT
                pc.collectionID,
                pc.type,
                pc.qnty,
                u.staffID AS pickerID,
                u.fname AS firstname,
                u.lname AS lastname,
                pc.collected_date,
                user.name AS admin_name,
                pci.image_url,
                pci.imageID,
                pci.active
            FROM
                plastic_collection pc
            LEFT JOIN
                customer u ON pc.userID = u.staffID
            LEFT JOIN
                user ON pc.adminID = user.userID
            LEFT JOIN
                profile_collection_images pci ON pc.collectionID = pci.collectionID
        `,
      (err, feedback) => {
        if (!err) {
          const collectionsWithImages = {}

          // Organize data into collections with their associated images
          feedback.forEach((row) => {
            const collectionID = row.collectionID

            if (!collectionsWithImages[collectionID]) {
              collectionsWithImages[collectionID] = {
                
                  collectionID: row.collectionID,
                  type: row.type,
                  qnty: row.qnty,
                  pickerID: row.pickerID,
                  firstname: row.firstname,
                  lastname: row.lastname,
                  collected_date: row.collected_date,
                  admin_name: row.admin_name,
                
                images: [],
              }
            }

            if (row.imageID) {
              collectionsWithImages[collectionID].images.push({
                image_url: row.image_url,
                imageID: row.imageID,
                active: row.active,
              })
            }
          })

          // Convert the object to an array of collections
          const results = Object.values(collectionsWithImages)

          res.status(200).json({ aset: 'success!!', data: results })
        } else {
          res.status(401).json({ aset: 'failed!!' })
          console.error(`Hi, ASET issue is: ${err}`)
        }
      }
    )
  } else {
    res.status(501).json({ aset: "Sorry!! you're not verified" })
  }
}

exports.validateCollection=(req,res)=>{
    if(req.user["role_id"] == 1){
        db.query("UPDATE plastic_collection SET adminID= ? WHERE collectionID = ?",[req.user['uid'], req.params['id']],(err,result)=>{
            if(!err){
                res.status(200).json({
                    aset: "success",
                    message: "Collection validated",
                    data: result
                })

            }else{
                res.status(401).json({
                    aset:"Fail",
                    message:"Fail to pull validator list"
                });
            }
        }
    
        );
    }
    else{
       res.status(401).json({
         aset: 'Unauthorized',
         message: 'Permission Denied',
       })
    }
};
// specific picker

module.exports;
