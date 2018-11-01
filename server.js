// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
  {
    name: "Yoda",
    phoneNumber: "867-5309",
    email: "green-guy@galaxy.faraway",
    uniqueID: 2000
  },
];

let wait = [];
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});
app.get("/api/wait", function(req, res) {
  return res.json(wait);
});

// Displays a single character, or returns false
// app.get("/api/tables/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < tables.length; i++) {
//     if (chosen === tables[i].routeName) {
//       return res.json(tables[i]);
//     }
//   }

//   return res.json(false);
// });

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;
  console.log;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  let flag = false;
  tables.forEach(element => {
    if(newReservation.uniqueID === element.uniqueID){

console.log("tables-uniqueID");
console.log("newReservation-uniqueID: "+ newReservation.uniqueID);
console.log("element-uniqueID: "+ element.uniqueID);
flag=true;
}
if(newReservation.name===element.name){
  
  console.log("tables-name");
  flag=true;
}
});
wait.forEach(element => {
  if(newReservation.uniqueID === element.uniqueID)
  console.log("wait-uniqueID");
  {flag=true;}
  if(newReservation.name===element.name)
  console.log("tables-name");
    {flag=true;}
  });
console.log("flag = " +flag);
  console.log(newReservation);
  if (flag===false)
{
  
  if(tables.length<5)
  tables.push(newReservation);
  else
  wait.push(newReservation)
  res.json(false);
}
else
res.json(true);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
