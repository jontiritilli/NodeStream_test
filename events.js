const EventEmitter = require('events');
const fs = require('fs');

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args){
        console.time('execute');
        this.emit('begin');
        asyncFunc(...args, (err, data)=>{
            if(err){
                return this.emit('error', err);
            }
            this.emit('data', data);
            console.timeEnd('execute');
            this.emit('end');
        })
    }
};

const withTime = new WithTime();

withTime.on('begin', () => console.log('about to execute'));
withTime.on('end', () => console.log('done with executing'));

withTime.on('data', (data) => {
    console.log(`Length: ${data.length}`);
});

withTime.execute(fs.readFile,__filename);
