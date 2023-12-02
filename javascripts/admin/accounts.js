const jwt = require("jsonwebtoken");

exports.updateAccount = function(request, response, database){
    var id = request.body.id;
    var activation = request.body.activation;
    database.query(
        "SELECT * FROM accounts WHERE email = ? AND id NOT LIKE ? OR code = ? AND id NOT LIKE ?",
        [request.body.email, id, request.body.code,id],
        function (err, results, fields) {
            if (err) console.log(err);
            if (err)
              return response.json({
                success: false,
                error: 4,
                message: "An error occured.",
              });
              if(results.length > 0) return response.json({
                success: false,
                error: 4,
                message: "Email or workoutCode already in use.",
              }); 
              database.query(
                "UPDATE accounts SET firstName = ?, lastName = ?, email = ?, code = ?, active = ? WHERE id = ?",
                [request.body.firstName, request.body.lastName, request.body.email, request.body.code, activation, id],
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
        })
}