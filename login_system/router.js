var express = require("express");
var router = express.Router();

const credential = {
	email : "admin@gmail.com",
	password:"admin123"
}

//login user
router.post('/login',(req,res)=>{
	console.log('body : ',req.body)
	const {email , password} = req.body
	if(email===credential.email&&password===credential.password){
		req.session.user = req.body.email
		console.log(req.session)
  //  req.session.user=req.body.email;
	 res.redirect("./dashboard");
	}else{
		res.end("User Not Available")
	}
});


//route for dashboard

router.get("/dashboard",(req,res)=>{
		try {
			if(req.session.user){
				res.render("dashboard",{user : req.session.user})
			}else{
				res.send('Unathourized user')
			}
				
		} catch (error) {
			console.log(error)
		}
})

router.get("/logout",(req,res)=>{
	req.session.destroy(function(error){
		if(error){
			console.log(error);
			res.send("Error")
		}else{
			res.render("base",{title:"Express",logout:"Logout Successfully..."})
		}
	})
})

module.exports=router;
