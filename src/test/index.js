'use strict';
const app = require('./app')
// Constants
const PORT = 4000;
const HOST = '0.0.0.0';


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);