var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var mongoOp = require("./models/mongo");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
  res.json({"error" : false,"message" : "Hello World"});
});

//Basic GET and POST
router.route("/users")
  .get(function(req,res){ //Get all users
    var response = {};
    mongoOp.find({},function(err,data){
      if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
      } else {
        response = {"error" : false,"message" : data};
      }
      res.json(response);
    });
  })
  .post(function(req,res){ //Create a new user
    var db = new mongoOp();
    var response = {};
    db.userEmail = req.body.email;
    db.userPassword = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
    db.save(function(err){
    if(err) {
      response = {"error" : true,"message" : "Error adding data"};
    } else {
      response = {"error" : false,"message" : "Data added"};
    }
    res.json(response);
    });
  });

//Basic GET, PUT and DELETE by ID
router.route("/users/:id")
  .get(function(req,res){ //Get user by ID
    var response = {};
    mongoOp.findById(req.params.id,function(err,data){
      if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
      } else {
        response = {"error" : false,"message" : data};
      }
      res.json(response);
    });
  })
  .put(function(req,res){ //Update user by ID
    var response = {};
    mongoOp.findById(req.params.id,function(err,data){
      if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
      } else {
        if(req.body.email !== undefined) {
          data.userEmail = req.body.email;
        }
        if(req.body.password !== undefined) {
          data.userPassword = req.body.password;
        }
        data.save(function(err){
          if(err) {
            response = {"error" : true,"message" : "Error updating data"};
          } else {
            response = {"error" : false,"message" : "Data is updated for "+req.params.id};
          }
          res.json(response);
        })
      }
    });
  })
  .delete(function(req,res){ //Delete user by ID
    var response = {};
    mongoOp.findById(req.params.id,function(err,data){
      if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
      } else {
        mongoOp.remove({_id : req.params.id},function(err){
          if(err) {
            response = {"error" : true,"message" : "Error deleting data"};
          } else {
            response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
          }
          res.json(response);
        });
      }
    });
  });

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
