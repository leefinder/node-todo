const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

const server = http.createServer((req, res) => {
    const { filename } = req.headers
    console.log('Filename', filename)
    req
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(filename))
    .on('finish', () => {
        res.writeHead(201, {
            'Content-Type': 'text/plain'
        })
        res.end('That is it')
        console.log('File saved')
    })
})
server.listen(3000, () => {
    console.log('Server listening at 3000')
})