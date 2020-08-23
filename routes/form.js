const express = require("express");
var router = express.Router();
var controller = require("../controllers/formController.js");

//***************get request********************** */
router.get("/master", function(req, res){
    res.render("form/master", {
        title : "Data Master"
    });
});

router.get("/getData", function(req, res){
    controller.getData(req, res);
});


router.get("/filterAgeWise", function(req, res){
    controller.filterAgeWise(req, res);
});

//***************put request********************** */
router.put('/addData', function(req, res){
    controller.addData(req, res);
});

module.exports = router;