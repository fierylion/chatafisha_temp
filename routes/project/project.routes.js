const express = require("express");
var mult = require("../../middleware/upload");
var session =  require("../../middleware/sessionMaster")

var projectRouter = express.Router();

// project controller 
const project_controller = require("../../controller/project/project");
const setContentTypeHeader = require("../../middleware/setHeader");

// everybody should have access here.
projectRouter.use(session.verifyToken)

// project registration
projectRouter.post("/project_data",setContentTypeHeader,mult.single('img'),project_controller.projectRegistration);

// show project detail
projectRouter.get("/project_data",project_controller.showProject)


// export module 
module.exports = projectRouter;

