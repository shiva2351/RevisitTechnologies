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


 
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
  
    const sql = `SELECT id, username FROM users WHERE username = ?`;
  
    db.get(sql, [username], (err, row) => {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (!row) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json(row);
    });
  });
app.post('/adduser', async (req, res) => {
      try {
        const { username, password } = req.body;
        console.log(req.body, "result");
    
        if (!username || !password) {
          console.log("not");
          return res.status(400).json({ error: 'Missing fields' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    
        db.run(sql, [username, hashedPassword], function (err) {
          if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: "Database error", details: err.message });
          }
    
          return res.status(201).json({
            message: 'User created successfully',
            userId: this.lastID // 'this' refers to the statement context
          });
        });
    
      } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Server error", details: error.message });
      }
    });