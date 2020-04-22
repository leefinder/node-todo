const http = require('http');
const fs = require('fs');
const server = http.createServer();
server.on('request', async (req, res) => {
    if (req.url === '/') {
        try {
            const titles = await getJson();
            const html = await getTemp(titles);
            res.writeHead(200, {
                'Content-Tyep': 'text/html'
            });
            res.end(html);
        } catch (e) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('404');
        }
    }
});
async function getJson () {
    return new Promise((resolve, reject) => {
        fs.readFile('./titles.json', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data.toString()));
        });
    });
}
async function getTemp (result) {
    return new Promise((resolve, reject) => {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const temp = data.toString();
            const html = temp.replace('%', result.join('</li><li>'));
            resolve(html);
        });
    })
}
server.listen(3004, () => {
    console.log('Server listen at 3004')
});