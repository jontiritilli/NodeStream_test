const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/video', (req, res) => {
    const path = 'assets/sample.mp4';
    const stat = fs.statSync(path);
    const filesize = stat.size;
    const range = req.headers.range;

    if(range){
        const parts = range.replace('/bytes=/', "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : filesize-1;

        const chunksize = (end-start)+1

        const file = fs.createReadStream(path, {start, end});
        const head = {
          'Content-Range': `bytes ${start}-${end}/${filesize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
    
        res.writeHead(206, head)

        file.pipe(res)

    } else {
        const head = {
        'Content-Length': filesize,
        'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});