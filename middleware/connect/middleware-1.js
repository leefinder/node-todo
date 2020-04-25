const connect = require('connect');

const app = connect();

function logger (req, res, next) {
    console.log(req.method, req.url);
    next();
}

function helloword (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
} 

app.use(logger);

app.use(helloword);

app.listen(3007, () => {
    console.log('server listen at 3007');
});