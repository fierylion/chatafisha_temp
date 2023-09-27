var express = require("express")
var userRoutes = express.Router();
var session = require("../../middleware/sessionMaster")
var multer = require("../../middleware/upload");
const setContentTypeHeader = require("../../middleware/setHeader");
 // it server all request to user authentication and reistration
var userAuthController = require("../../controller/user/auth");
// import {optimizationAPI} from "../../controller/user/optimization"
var optiController = require("../../controller/user/optimization");
var picker_controller = require("../../controller/user/picker.activity");

// registration route handler
userRoutes.post("/registration_data",userAuthController.userRegistration); 

// login route
userRoutes.post("/login_credential",userAuthController.userLogin);

// -------------- SESSION --------------


// regist picker
userRoutes.post(
  '/regist_customer',
  session.verifyToken,setContentTypeHeader,
  multer.single('img'),
  picker_controller.registPicker
)

// optimazation api
userRoutes.get(
  '/optimization',
  session.verifyToken,optiController.optimizationAPI
)

// get picker list
userRoutes.get(
  '/picker_list',
 picker_controller.getPickerList
)

// get validator lists
userRoutes.get(
  '/validators',
  session.verifyToken,picker_controller.validatorList
)

// pull a specific picker
userRoutes.get(
  '/specific_picker/:id',
  picker_controller.getSpecificPicker
)

//Pull all collection history
userRoutes.get(
  '/collection_history',
  session.verifyToken,picker_controller.getAllCollectionHistory
)
// pull collection history of a specific picker
userRoutes.get(
  '/collection_history/:id',
  picker_controller.getCollectionHistory
)

//validate plastic
userRoutes.get(
  '/validate_collection/:id',
  session.verifyToken,picker_controller.validateCollection
)


// export module
module.exports = userRoutes;


