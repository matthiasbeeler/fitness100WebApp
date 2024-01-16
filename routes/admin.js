/*--  Auto-generated SQL script #202311272207
INSERT INTO fitness100.workouts (id, workoutCode, `timestamp`)
	VALUES (UUID(),'266d-df2e-d5fd', UNIX_TIMESTAMP());


    */
   
	var express = require("express");
	var moment = require("moment");
	var router = express.Router();
	const jwt = require("jsonwebtoken");
	const { database } = require("../services/database");
	const { validate } = require("uuid");
	const fs = require("fs");
const { updateAccount } = require("../javascripts/admin/accounts");
const { uploadWorkoutImage } = require("../javascripts/updateImage");
const { createNewWorkout } = require("../javascripts/admin/newWorkout");
	
	router.all("*", function (req, res, next) {
	  try {
		if (req.cookies.FitnessAuth) {
		  if (
			jwt.verify(req.cookies.FitnessAuth, process.env.jwtSecret).loggedin &&
			jwt.verify(req.cookies.FitnessAuth, process.env.jwtSecret).admin
		  )
			return next();
		}
		if (!req.cookies.FitnessAuth) {
		  if (!jwt.verify(req.cookies.FitnessAuth, process.env.jwtSecret).loggedin)
			return res.redirect("/");
		}
	  } catch (error) {
		console.log(error);
	
		return res.redirect("/");
	  }
	});
	
	router.get("/", (req, res) => {
	  
	  res.render("loggedin/admin/adminHome",{
		data: jwt.verify(req.cookies.FitnessAuth, process.env.jwtSecret),
		
	  });
	
	});

	//account admin
	router.get("/accounts", (req, res) => {
		database.query(
		  "SELECT * FROM accounts ORDER by active ASC",
		  function (err, results, fields) {
			res.render("loggedin/admin/accounts", { participants: results });
		  }
		);
	  });
	  
	  router.get("/accounts/:id", (req, res) => {
		database.query(
		  "SELECT * FROM accounts WHERE id = ?",
		  [req.params.id],
		  function (err, results, fields) {
			if(!results.length > 0) return res.redirect('/admin/participants')
			res.render("loggedin/admin/accountDetail", { participant: results[0] });
		  }
		);
	  });

	  router.post("/updateAccount", (req, res) => {
		updateAccount(req, res, database);
	  });


	  //workout plan maintenance and overview

	  router.get("/workoutPlans", (req, res) => {
		database.query(
		  "SELECT * FROM workouts  ORDER by timestamp ASC",
		  function (err, results, fields) {
			res.render("loggedin/admin/workoutPlans", { plans: results });
		  }
		);
	  });


	  router.get("/workoutPlans/:id", function (req, res, next) {
		database.query(
		  `SELECT * FROM workouts where id = ?;`,[req.params.id],
		  function (err, results, fields) {
			if(!results.length > 0) return res.redirect('/admin');
			var workout = results[0];
			console.log(err)
			if(err)  ateliers = [];
			database.query(
			  `SELECT * FROM accounts where code = ?;`,[workout.workoutCode],
			  function (err, results, fields) {
				let account;
				if(results.length > 0)  account = results[0];
				workout.timestamp = moment.unix(workout.timestamp*0.001).format("HH:mm, DD.MM.YYYY")
		res.render("loggedin/admin/workoutSingle", {
		  workout: workout,
		  account: account
		});
	  });
	});
});


router.get("/images", function (req, res, next) {
	fs.readdir(process.cwd()+'/public/workoutImages/', (err, files) => {
		var fileArray = []
		files.forEach(element => {
			fileArray.push(element)
		});
		var filesArray = JSON.stringify(fileArray)
	  res.render("loggedin/admin/images", {
		files: JSON.parse(filesArray),
	  });
	});
});

router.get("/newWorkoutPlan", function (req, res, next) {
	  res.render("loggedin/admin/newWorkoutPlan");
});

router.post("/workoutImageUpload", function (req, res, next) {

	uploadWorkoutImage(req, res, database)
});


router.post("/createNewWorkout", function (req, res, next) {
	createNewWorkout(req, res, database)
});



	module.exports = router;
