exports.updateWorkout = function(request, response, database){
    try {
    var workoutJson = request.body.workoutJson;
    var workoutTitle = request.body.workoutTitle;
    database.query(
        "UPDATE workouts SET excercises = ?, title = ? ",
        [workoutJson,workoutTitle],
        function (err, results, fields) {
            if (err) console.log(err);
            if (err)
            return response.json({
              success: false,
              error: 4,
              message: "An error occured.",
            });
            if(!err) return response.json({
              success: true});
              
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