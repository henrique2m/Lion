const express = require('express');
const cors  = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

class App {
    constructor(){
        this.server  = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express());
        this.server.use(cors());
        this.server.use(bodyParser.json());
    }
    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server;