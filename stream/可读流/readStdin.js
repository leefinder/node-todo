// 非流动模式
// cat 命令用于连接文件并打印到标准输出设备上。
// cat ../test.txt | node readStdin 

process.stdin
    .on('readable', () => {
        let chunk
        console.log('非流动模式')
        while ((chunk = process.stdin.read()) !== null) {
            console.log(`非流动模式 read: (${chunk.length}) "${chunk.toString()}"`)
        }
    })
    .on('end', () => process.stdout.write('End of stream 非流动模式'))

// 流动模式

process.stdin
    .on('data', chunk => {
        console.log('流动模式')
        console.log(`流动模式 read: (${chunk.length}) "${chunk.toString()}"`)
    })
    .on('end', () => process.stdout.write('End of stream 流动模式'))