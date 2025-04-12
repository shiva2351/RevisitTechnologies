const express = require("express");
const app = express();
app.use(express.json());
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();;
const path = require("path");
const dbpath = path.join(__dirname, "database.db");
console.log(dbpath);
const bcrypt = require('bcrypt');
let db = null;
const initilizeDBandServer = async () => {
  try {
    db = await open({ filename: dbpath, driver: sqlite3.Database });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      const {k}={k:"g"}
    console.log(k)
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
    process.exit(1);
  }
};
initilizeDBandServer();


 
