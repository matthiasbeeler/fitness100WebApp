const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.createNewWorkout = function(request, response, database){
    try {
    var workoutJson = request.body.workoutJson;
    var workoutCode = Math.random().toString(16).substr(2, 4)+"-"+Math.random().toString(16).substr(2, 4)+"-"+Math.random().toString(16).substr(2, 4);
    var workoutTitle = request.body.workoutTitle;
    var createdBy = jwt.verify(request.cookies.FitnessAuth, process.env.jwtSecret).id;
    var timestamp = Date.now();
    var workoutId = uuidv4();
    database.query(
        "INSERT INTO workouts (id, workoutCode, excercises, createdBy, timestamp, title) VALUES(?,?,?,?,?,?)",
        [workoutId, workoutCode, workoutJson, createdBy, timestamp, workoutTitle],
        function (err, results, fields) {
            if (err) console.log(err);
            if (err)
            return response.json({
              success: false,
              error: 4,
              message: "An error occured.",
            });
            if(!err) return response.json({
              success: true, workoutCode: workoutCode});
              
        })

        
    } catch (error) {
        console.log(error)
        return response.json({
            success: false,
            error: 5,
            message: "An error occured.",
          });
    }
}