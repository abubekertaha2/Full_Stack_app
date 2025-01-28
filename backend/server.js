const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Endpoint for adding a new user
app.post("/add_user", (req, res) => {
  const sql = "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
  
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "Student added successfully" });
  });
});

// Endpoint for retrieving all students
app.get("/sql5759915", (req, res) => {
  const sql = "SELECT * FROM student_details";
  
  db.query(sql, (err, result) => {
    if (err) 
      return res.json({ message: "Server error" });
    return res.json(result);
  });
});

// Endpoint for retrieving a specific student by ID
app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE `id`= ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) 
      return res.json({ message: "Server error" });
    return res.json(result);
  });
});

// Endpoint for editing a user's information
app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender, id];
  
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "Student updated successfully" });
  });
});

// Endpoint for deleting a student by ID
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";
  const values = [id];
  
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "Student deleted successfully" }); 
  });
});

// Starting the server and listening on the defined port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});