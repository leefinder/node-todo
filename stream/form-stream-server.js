const http = require('http');
const qs = require('querystring');
const formidable = require('formidable');
const items = [];
const server = http.createServer();
server.on('request', (req, res) => {
    const { url, method } = req;
    if (url === '/') {
        switch (method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                upload(req, res);
                break;
            default:
                badRequest(res);
                break;
        }
    } else {
        notFound(res);
    }
});
server.listen(3006, () => {
    console.log('server listen at 3006');
});

function show (res) {
    const html = `<html><head><title>To Do List</title></head>
    <body><h1>ToDo List</h1><ul>${items.map(item => `<li>${item}</li>`).join(' ')}</ul>
    <form method="post" action="/" enctype="multipart/form-data">
    <p><input type="text" name="name" /></p>
    <p><input type="file" name="file" /></p>
    <p><input type="submit" value="Upload" /></p>
    </form></body></html>`
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function notFound (res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

function badRequest (res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}

function add (req, res) {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        const obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    });
}

function upload (req, res) {
    if (!isFormData(req)) {
        badRequest(res);
        return;
    }
    const form = new formidable.IncomingForm();
    form.on('field', (field, value) => {
        console.log(field);
        console.log(value);
    })
    form.on('file', (name, file) => {
        console.log(name);
        console.log(file);
    });
    form.on('end', () => {
        res.end('upload complete');
    });
    form.on('progress', (bytesReceived, bytesExpected) => {
        const percent = Math.floor(bytesReceived / bytesExpected) * 100;
        console.log(percent);
    });
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        console.log(files);
        res.end('upload complete');
    });
}
function isFormData (req) {
    const type = req.headers['content-type'] || '';
    return 0 === type.indexOf('multipart/form-data');
}