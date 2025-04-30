const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

// Create a new task
app.post('/tasks', (req, res) => {
  const { Assigned_To, status, Due_Date,Priority,Comments } = req.body;
  db.query('INSERT INTO Task (Assigned_To, status, Due_Date,Priority,Comments) VALUES (?, ?, ?,?,?)',
    [Assigned_To, status, Due_Date,Priority,Comments],
    (err, result) => {
      if (err) 
        return res.status(500).json({ error: err.message });
      res.status(200).json({ id: result.insertId });
    });
});

// Retrieve all tasks
app.get('/task', (req, res) => {
  db.query('SELECT * FROM Task', (err, rows) => {
    if (err) 
        return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Retrieve a task by ID
app.get('/task/:id', (req, res) => {
    db.query('SELECT * FROM Task WHERE id = ?', [req.params.id], (err, row) => {
      if (err) 
        return res.status(500).json({ error: err.message });
      if (row.length === 0) 
        return res.status(404).json({ error: 'Task not found' });
      res.json(row[0]);
    });
  });
  
  // Update a task
  app.put('/task/:id', (req, res) => {
    const { Assigned_To, status, Due_Date, Priority, Comments } = req.body;
    db.query(
      'UPDATE Task SET Assigned_To = ?, status = ?, Due_Date = ?, Priority = ?,Comments = ?, WHERE id = ?',
      [Assigned_To, status, Due_Date, Priority, Comments, req.params.id],
      (err, result) => {
        if (err) 
            return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) 
            return res.status(404).json({ error: 'Task not found' });
        res.json({ updated: result.affectedRows });
      });
  });
  
  // Delete a task
  app.delete('/task/:id', (req, res) => {
    db.query('DELETE FROM Task WHERE id = ?', [req.params.id], (err, result) => {
      if (err) 
        return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) 
        return res.status(404).json({ error: 'Task not found' });
      res.json({ deleted: result.affectedRows });
    });
  });
  
  // Start server
  app.listen(4444, () => {
    console.log('Server is running on http://localhost:4444');
});