const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: '127.0.0.1',
  user: 'root',
  password: 'Abhi@15012002',
  database: 'rrrlfdb',
});

// Route for handling database queries
function executeQuery(sql, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('MySQL connection error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query(sql, (queryErr, results) => {
      connection.release(); // Release the connection back to the pool

      if (queryErr) {
        console.error('MySQL query error:', queryErr);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
}

// Route for getting all data
app.get('/getAll', (req, res) => {
  const sql = 'SELECT * FROM m_allscheme_consolidated_data';
  executeQuery(sql, res);
});

// Route for getting beneficiary data
app.get('/getBeneficiary', (req, res) => {
  const sql = 'SELECT * FROM m_beneficiary_registration';
  executeQuery(sql, res);
});

// Route for getting state data
app.get('/getState', (req, res) => {
  const sql = 'SELECT * FROM m_state';
  executeQuery(sql, res);
});

// Route for getting district data
app.get('/getDistrict', (req, res) => {
  const sql = 'SELECT * FROM m_district';
  executeQuery(sql, res);
});

// Route for getting libraries data
app.get('/getLibraries', (req, res) => {
  const sql = 'SELECT * FROM m_libraries';
  executeQuery(sql, res);
});

// Route for getting items data
app.get('/getItems', (req, res) => {
  const sql = 'SELECT * FROM m_item';
  executeQuery(sql, res);
});

// Route for getting scheme data
app.get('/getScheme', (req, res) => {
  const sql = 'SELECT * FROM m_scheme';
  executeQuery(sql, res);
});

// Route for getting scheme ID data
app.get('/getSchemeId', (req, res) => {
  const sql = 'SELECT * FROM m_scheme_application_id';
  executeQuery(sql, res);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
