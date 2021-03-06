var mysql = require('mysql');

var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

connection.connect();

console.log(connection.state);

connection.query("SELECT 1 + 1 AS solution", function(error, results, fields){
	if (error) throw error;
	console.log("The solution is: ", results[0].solution);
});

module.exports = connection;