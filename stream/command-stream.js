const fs = require('fs');
const path = require('path');
const args = process.argv.splice(2); // 保留输入的参数
const command = args.shift(); // 读取第一个参数作为命令
const taskDescription = args.join(' ');
const file = path.join(process.cwd(), '/.tasks'); // 解析相对路径

switch (command) {
    case 'list':
        listTasks(file);
        break;
    case 'add':
        addTask(file, taskDescription);
        break;
    default:
        console.log('Usage list|add');
        break;
}

function loadOrInitializeTaskArray (file, cb) {
    fs.exists(file, (exists) => {
        let tasks = [];
        if (exists) {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                data = data.toString();
                tasks = JSON.parse(data || []);
                cb(tasks);
            });
        } else {
            cb([]);
        }
    });
}

function listTasks (file) {
    loadOrInitializeTaskArray(file, tasks => {
        for(let i in tasks) {
            console.log(tasks[i]);
        }
    });
}

function storeTasks (file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf8', err => {
        if (err) {
            throw err;
        }
        console.log('Saved');
    });
}

function addTask (file, taskDescription) {
    loadOrInitializeTaskArray(file, tasks => {
        tasks.push(taskDescription);
        storeTasks(file, tasks);
    });
}
