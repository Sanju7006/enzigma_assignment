const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'W1_87135_Sanjivani',
  password: 'manager',  
  database: 'assignmentdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = db;