const express = require("express");
const app = express();
app.use(express.json());
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.join(__dirname, "database.db");
console.log(dbpath);
let db = null;
const initilizeDBandServer = async () => {
  try {
    db = await open({ filename: dbpath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
    process.exit(1);
  }
};
initilizeDBandServer();



app.get(`/user`, async (req, res) => {
  try {
    console.log("Fetching user data...");
//const {name}=req.query;
    //console.log(name);
    console.log("get")
    const getQuery = `SELECT username, password FROM users;`;  
    
    const result = await db.all(getQuery);  
      
    console.log(result)
    res.json(result); 
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ error: "error" }); 
  }});