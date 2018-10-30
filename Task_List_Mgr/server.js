const EE = require('events');

class Server extends EE {
    constructor(){
        super()
    }
}

module.exports = (client) => new Server(client);