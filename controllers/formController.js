const model = require("../models/formModel.js");

module.exports = {

    /**
     * desc : saves data
     */
    addData : function(req, res){
        try{
            var formData = req.body;
            formData.createdon = new Date();
            var data = new model(formData);
            data.save(function(error,result){
                if(error){
                    return res.status(500).json({
                        success : false,
                        message : "Internal server error",
                        err : error,
                        data : []
                    })
                }else{
                    return res.status(200).json({
                        success : true,
                        message : "Data successfully saved",
                        err : [],
                        data : result
                    })
                }
            });
        }catch(e){
            return res.status(500).json({
                err: e,
                success : false
            })
        }
    },

    /**
     * desc : gets list of all data
     */
    getData : function(req,res){
        try{
            model.find({}).lean().exec(function(error, result){
                if(error){
                    return res.status(500).json({
                        success : false,
                        message : "Internal server error",
                        err : err,
                        data : []
                    })
                }else{
                    return res.status(200).json({
                        success : true,
                        message : "Data successfully saved",
                        err : [],
                        data : result
                    })
                }
            });
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                err: e,
                success : false
            })
        }
          
    },

    /**
     * desc : gets data of greater age and alphabetically
     */
    filterAgeWise : function(req, res){
        try{
            model.aggregate(
                [
                    {
                        $sort:{'age':-1},
                    },  
                    {
                        $group  : {
                            _id : "$group",
                            age: { $max: "$age" },
                            person : {
                                $first : "$person"
                            }
                        }
                    },
                    {
                        $project : {
                            person : "$person",
                            group : "$_id",
                            age : "$age",
                        }
                    },
                    { "$sort": { "person": 1 } }
                ], function(error, result){
                    if(error){
                        return res.status(500).json({
                            success : false,
                            message : "Internal server error",
                            err : error,
                            data : []
                        })
                    }else{
                        return res.status(200).json({
                            success : true,
                            message : "Data successfully saved",
                            err : [],
                            data : result
                        })
                    }
                }
            )
        }catch(e){
            console.log(e)
        }
    }

}