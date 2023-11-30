const jwt = require("jsonwebtoken");

exports.updateAccount = function(request, response, database){
    var id = request.body.id;
    var activation = request.body.activation;
    database.query(
        "SELECT * FROM accounts WHERE id = ?",
        [id],
        function (err, results, fields) {
            if (err) console.log(err);
            if (err)
              return response.json({
                success: false,
                error: 4,
                message: "An error occured.",
              });
              database.query(
                "UPDATE accounts SET firstName = ?, lastName = ?, code = ?, active = ? WHERE id = ?",
                [request.body.firstName, request.body.lastName, request.body.code, activation, id],
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