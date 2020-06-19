require('module-alias/register');
const http = require('http');
const API = require('@API');
const Server = http.Server(API);
const Port = process.env.PORT || 3001;
const LOCAL = '0.0.0.0';

Server.listen(
    Port,
    LOCAL,
    () => console.log(`API running on ${Port}`)
);

