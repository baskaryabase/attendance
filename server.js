
var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose	= require("mongoose");
	ejs          = require("ejs");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/attendance");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


var userSchema = new mongoose.Schema ({
	name:String,
	teamName:String,
	inTime:String,
	outTime:String,
	topic: String
});
var users = mongoose.model("users" , userSchema);

app.get("/" , (req,res) => {
	res.render('new');
});

app.post("/" , (req , res) =>{
	 var Users = new users({
		 name : req.body.name,
	 	    teamName : req.body.teamName,
	 		inTime : new Date(),
	 		outTime : req.body.outTime,
	 		topic : req.body.topic
	 })
	 Users.save().then((doc)=>{
		 console.log(doc)
		 res.send("<script>alert('Your attendance is marked')</script>");
	 },(err)=>{
		 console.log("Error: ",err);
	 })




})



app.listen(8082 , () =>{
	console.log("started");
})
