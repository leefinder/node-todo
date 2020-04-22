const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const root = __dirname;

const server = http.createServer();
server.on('request', (req, res) => {
    const url = parse(req.url);

    const path = join(root, url.pathname);
    // 检查文件是否存在
    fs.stat(path, (err, stat) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('File Not Found');
            } else {
                res.statusCode = 500;
                res.end('Server Error');
            }
            return;
        }
        res.setHeader('Content-Length', stat.size);
        const stream = fs.createReadStream(path);
        // stream.on('data', chunk => {
        //     res.write(chunk);
        // });
        // stream.on('end', () => {
        //     res.end();
        // });
        // 管道模式
        stream.pipe(res);
        stream.on('error', err => {
            res.statusCode = 500;
            res.end('Server Error');
        });
    });
});

server.listen(3005, () => {
    console.log('Server listen at 3005');
});