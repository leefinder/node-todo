const http = require('http');
const fs = require('fs');
const server = http.createServer();
server.on('request', (req, res) => {
    if (req.url === '/') {
        fs.readFile('./titles.json', (err, data) => {
            if (err) {
                res.end('Server error json not defined');
                return;
            }
            const titles = JSON.parse(data.toString());
            fs.readFile('./index.html', (err, data) => {
                if (err) {
                    res.end('Server Error');
                    return;
                }
                const temp = data.toString();
                const html = temp.replace('%', titles.join('</li><li>'));
                res.writeHead(200, {
                    'Content-Tyep': 'text/html'
                });
                res.end(html);
            });
        })
    }
});
server.listen(3004, () => {
    console.log('Server listen at 3004')
});