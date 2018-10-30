const fs = require('fs');

const readFileAsArray = (file, cb = () => {}) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err){
                reject(err);
                return cb(err);
            }

            const lines = data.toString().trim().split('\n');

            resolve(lines)
            cb(null, lines);
        })
    })
}

readFileAsArray('./numbers.js')
    .then((lines)=>{
        const oddNumbers = lines.map(Number).filter(number => number % 2 == 1);
        console.log('odd numbers count promise:', oddNumbers.length);
    })
    .catch(console.error);

    
readFileAsArray('./numbers.js', (err, lines) => {
    if(err) throw err;
    const oddNumbers = lines.map(Number).filter(number => number % 2 == 1);
    console.log('odd numbers count cb:', oddNumbers.length);
});

async function countOdd(){
    try{
        const lines = await readFileAsArray('./numbers.js');
        const oddCount = lines.map(Number).filter(number => number % 2 == 1);
        console.log('odd number count:', oddCount.length);
    } catch(err) {
        console.error(err);
    }
}

countOdd();