const mongoose = require("mongoose");
var schema = mongoose.Schema;

var formSchema = new schema({
    person : String,
    group : Number,
    age : Number,
    createdon : { type : Date}
});

module.exports = mongoose.model("personInfo", formSchema, "personInfo");
