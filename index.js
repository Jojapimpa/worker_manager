require('module-alias/register');
const http = require('http');
const PotatoAPI = require('api/config/app.js');
const PotatoServer = http.Server(PotatoAPI);
const PotatoServerPORT = process.env.PORT || 3001;
const LOCAL = '0.0.0.0';

PotatoServer.listen(
    PotatoServerPORT,
    LOCAL,
    () => console.log(`PotatoAPI running on ${PotatoServerPORT}`)
);

