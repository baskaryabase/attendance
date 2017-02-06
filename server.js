
var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose	= require("mongoose");
	ejs          = require("ejs");

mongoose.connect("mongodb://localhost/attendance");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


var userSchema = new mongoose.Schema ({
	name:String,
	teamName:String,
	inTime:String,
	outTime:String
});
var users = mongoose.model("users" , userSchema);

app.get("/" , (req,res) => {
	res.render('index');
});

app.post("/done" , (req , res) =>{
	var name = req.body.name,
	    teamName = req.body.teamName,
		inTime = req.body.inTime,
		outTime = req.body.outTime;

	var user = {
				name:name , 
				teamName:teamName ,
				inTime:inTime ,
				outTime:outTime  }


	console.log(user);
	users.create(user , (err,newUser) => {
		if(err){
			console.log(err);
		}
		res.send("Done")

	})
	
})



app.listen(8080 , () =>{
	console.log("started");
})


