const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2]
// 缓存实现gzip
fs.readFile(file, (err, buffer) => {
    zlib.gzip(buffer, (err, buffer) => {
        fs.writeFile(file + '.gz', buffer, err => {
            console.log('File successfully compressed')
        })
    })
})
// 流实现
fs.createReadStream(file)
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream(file + '-stream.gz'))
.on('finish', () => {
    console.log('File successfully compressed stream')
})