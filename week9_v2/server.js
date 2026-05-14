const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('requestReceived', (url) => {
    console.log(`Event Triggered: Request for ${url}`);
});

const server = http.createServer((req, res) => {

    myEmitter.emit('requestReceived', req.url);

    const filePath = path.join(__dirname, 'example.txt');

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Welcome to Node.js Server</h1>');
        res.end();
    }

    else if (req.url === '/os') {

        const osInfo = {
            platform: os.platform(),
            cpuArch: os.arch(),
            cpuCores: os.cpus().length,
            freeMemory: os.freemem(),
            totalMemory: os.totalmem(),
            uptime: os.uptime()
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(osInfo, null, 2));
    }

    else if (req.url === '/path') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`File Path Example:\n${filePath}`);
        res.end();
    }

    else if (req.url === '/event') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Custom event has been triggered! Check console.');
        res.end();
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is started at http://localhost:${PORT}`);
    
    console.log(`OS is started at http://localhost:${PORT}/os`);
    console.log(`Path is started at http://localhost:${PORT}/path`);
    console.log(`Event is started at http://localhost:${PORT}/event`);
});