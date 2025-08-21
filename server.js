const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Project Running</title>
    </head>
    <body>
      <h1>🎉 Project is now running!</h1>
      <p>Your development server is working correctly.</p>
      <p>Server running on port ${port}</p>
    </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
