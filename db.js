// db.js
const mysql = require('mysql2');

// Update these values with your MySQL credentials
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '@WimJeff8888',
	database: 'MicroJobs',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});


// Test connection on startup
pool.getConnection((err, connection) => {
	if (err) {
		console.error('MySQL connection failed:', err.message);
	} else {
		console.log('MySQL connected successfully!');
		connection.release();
	}
});

module.exports = pool;
