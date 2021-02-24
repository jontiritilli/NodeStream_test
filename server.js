const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const videofolder = './assets/'

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/list', (req, res) => {
    fs.readdir(videofolder, (err, files) => {
        files.forEach(file => {
            res.send(file.toString());
        });
    })
});

app.get('/video', (req, res) => {
  const path = 'assets/sample.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const CHUNK_SIZE = 10 ** 5;
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = Math.min(start + CHUNK_SIZE, fileSize -1);

    const contentLength = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
