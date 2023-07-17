const http = require('http');

const hostname = '127.0.0.1';
const port = 3005;
//index.js
(async () => {
  const database = require('./config/database');
  const Client = require('./models/user');

    database.sequelize.sync().then((e:any)=>{console.log(e) }).catch((e:any )=>{ console.log(e) });
})();

const server = http.createServer((req:any, res:any) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


