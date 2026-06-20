const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const db = require('./db');


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  // Helper to parse JSON body
  function parseBody(req, callback) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { callback(null, JSON.parse(body)); }
      catch (e) { callback(e); }
    });
  }

  // Registration endpoint (now with name and location)
  if (parsedUrl.pathname === '/api/register' && req.method === 'POST') {
    parseBody(req, (err, data) => {
      console.log('Registration attempt:', data);
      if (err || !data.email || !data.password || !data.name || !data.location) {
        console.error('Registration error: Invalid input', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid input' }));
        return;
      }
      // Hash password (simple demo, use bcrypt in production!)
      const password = data.password;
      db.query('INSERT INTO users (name, location, email, password) VALUES (?, ?, ?, ?)', [data.name, data.location, data.email, password], (err, result) => {
        if (err) {
          console.error('Registration DB error:', err);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Registration failed', details: err.message }));
        } else {
          console.log('Registration success, userId:', result.insertId);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, userId: result.insertId }));
        }
      });
    });
    // Fallback: ensure response is always sent
    setTimeout(() => {
      if (!res.writableEnded) {
        console.error('Registration endpoint: No response sent, sending fallback error.');
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    }, 3000);
    return;
  }

  // Login endpoint (returns name and location)
  if (parsedUrl.pathname === '/api/login' && req.method === 'POST') {
    parseBody(req, (err, data) => {
      if (err || !data.email || !data.password) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid input' }));
        return;
      }
      db.query('SELECT * FROM users WHERE email = ?', [data.email], (err, results) => {
        if (err || results.length === 0) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid credentials' }));
        } else {
          const user = results[0];
          // Compare password (plain for demo, use bcrypt in production!)
          if (user.password === data.password) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, userId: user.id, name: user.name, location: user.location }));
          } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid credentials' }));
          }
        }
      });
    });
    return;
  }
  // API endpoint example: GET /api/jobs
  if (parsedUrl.pathname === '/api/jobs' && req.method === 'GET') {
    db.query('SELECT * FROM jobs', (err, results) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Database error', details: err.message }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
      }
    });
    return;
  }

  // Serve static files from public folder
  // Normalize URL for static file serving
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '/index.html') reqPath = '/index.html';
  // Remove leading /public if present
  reqPath = reqPath.replace(/^\/public/, '');
  let filePath = path.join(__dirname, 'public', reqPath);
  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Try fallback to index.html for SPA routes
      if (ext === '' || ext === '.html') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err2, content2) => {
          if (err2) {
            res.writeHead(404);
            res.end('File not found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content2);
          }
        });
      } else {
        res.writeHead(404);
        res.end('File not found');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
      res.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});