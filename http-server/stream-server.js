const http = require('http');
const fs = require('fs');
const server = http.createServer();
server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'image/jpg'
    });
    fs.createReadStream('../static/images/timg.jpeg').pipe(res);
});
server.listen(3002);
console.log('Server running at http://localhost:3002/');


