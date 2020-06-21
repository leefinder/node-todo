const stream = require('stream')
const Chance = require('chance')
const chance = new Chance

class RandomStream extends stream.Readable {
    constructor (options) {
        super(options)
    }
    _read (size) {
        const chunk = chance.string() // 生成随机字符串
        console.log(`Pushing chunk of size: ${chunk.length}`)
        this.push(chunk, 'utf-8') // 将生成的随机字符串推送到内部缓存中， 指定编码utf-8 -- 二进制Buffer 不需要这样设置
        if (chance.bool({ // 5%的可能随机终止 推送null提示流的终止
            likelihood: 5
        })) {
            this.push(null)
        }
    }
}

module.exports = RandomStream