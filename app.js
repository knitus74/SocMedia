var path = require ('path');
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;

const result = require('dotenv').config();
if (result.error) {
  console.log(result.error);
}
console.log(result.parsed);

var options = {
	host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME
};

console.log(process.cwd());

const db = require("./db.js");

//change this for security
app.use(express.static('dist/'));
//app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

var sessionStore = new MySQLStore(options);

app.use(session({
	secret: "aooeiperncgdr", resave: 'false', saveUninitialized: false, store: sessionStore
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
	(username, password, done) => {
		const db = require('./db.js');
		db.query("SELECT password, userid FROM users WHERE username = ?", [username], function(error, results, fields){
			if(error){done(error);}
			console.log("gets here");
			if(results.length == 0){done(null, false);}
			else{
				const hash = results[0].password.toString();
				bcrypt.compare(password, hash, (err, response) => {
					if(response){
						//change
						let userid = results[0].userid;
						return done(null, {userid: userid, username: username});
					}
					else{
						return done(null, false);
					}
				});
			}
		});
	}
));

app.get("/login", (req, res) => {
	res.render("login.ejs");
});

app.post("/login", passport.authenticate('local',
	{successRedirect: '/', 
	 failureRedirect: "/login"
	}
));

app.get("/", authenticationMiddleware(), function(req, res){
	res.render("index.ejs", {username: req.user.username});
});

app.get("/register", function(req, res){
	res.render("register.ejs");
})

app.post("/register", function(req, res){
	var email = "";
	var username = req.body.username;
	var password = req.body.password;
	var saltrounds = 10;

	var db = require("./db.js");

	bcrypt.hash(password, saltrounds, function(err, hash){
		db.query('INSERT INTO users(username, email, password) VALUES (?,?,?)', 
			[username, email, hash], 
			function(error, results, fields){
				if(error) throw error;
				db.query('SELECT LAST_INSERT_ID() as userid', function(error, results, fields){
					if (error) throw error;
					req.login(results.userid, function(err){
						res.redirect("/");
					})
				});
			}
		);
	})

});

app.post("/postcomment", (req, res) => {
	let userid = req.user.userid;
	let comment = req.body.comment;
	db.query('INSERT INTO comments(comment, userid) VALUES (?,?)', [comment, userid], function(error, results, fields){
		if (error) throw error;
		db.query('SELECT LAST_INSERT_ID() as comment_id', function(error, results, fields){
			if (error) throw error;
			let commentid = results[0].comment_id;
			res.send(JSON.stringify({comment_id: commentid}));
		})
	});
});

app.post(("/deletecomment"), function(req, res){
	let userid = req.user.userid;
	let commentid = req.body.comment_id;
	console.log(commentid);
	db.query("DELETE FROM comments WHERE commentid = ?", [commentid], function(error, results, fields){
		if(error) throw error;
	});
})

app.get("/logout", (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect("/login");
});

app.get("/getcomments", (req, res) => {
	let userid = req.user.userid;
	db.query("SELECT commentid, comment FROM comments WHERE userid = ?", [userid], function(error, results, fields){
		if(error) throw error;
		let json = JSON.stringify(results);
		res.send(json);
	});
	//var comments = [{comment: "hello there idiot sandwich"}];
	//let json = JSON.stringify(results);
});

//find a profile, may need to change this if usernames are not unique

app.get("/profiles/:username", (req, res) => {
	var username = req.params.username;
	db.query("SELECT comment FROM comments INNER JOIN users ON comments.userid = users.userid WHERE username = ?", [username], function(error, results, fields){
		if(error) throw error;
		console.log(results);
		res.render('profile.ejs', {username: username, comments: results});
	});
});


passport.serializeUser(function(userid, done){
		done(null, userid);
	});

passport.deserializeUser(function(userid, done){
	done(null, userid);
});

function authenticationMiddleware(){
	return (req, res, next) => {
		if(req.isAuthenticated()){
			return next();
		}
		else{
			res.redirect('/login');
		}
	}
}


app.listen(8080, function(){
	console.log("Server is online");
});