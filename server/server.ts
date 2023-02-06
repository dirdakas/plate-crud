const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// server.post('/login', (req, res, next) => {
//   const users = readUsers();

//   const user = users.filter(
//     u => u.username === req.body.username && u.password === req.body.password
//   )[0];

//   if (user) {
//     res.send({ ...formatUser(user), token: checkIfAdmin(user) });
//   } else {
//     res.status(401).send('Incorrect username or password');
//   }
// });

// server.post('/register', (req, res) => {
//   const users = readUsers();
//   const user = users.filter(u => u.username === req.body.username)[0];

//   if (user === undefined || user === null) {
//     res.send({
//       ...formatUser(req.body),
//       token: checkIfAdmin(req.body),
//     });
//     db.users.push(req.body);
//   } else {
//     res.status(500).send('User already exists');
//   }
// });

// server.use('/plateList', (req, res, next) => {
//   console.log('/plates');
//   console.log('req', req);
//   console.log('res', res);
//   console.log('next', next);
//   next();
// });

function readPlates() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const plates = JSON.parse(dbRaw).plates;
  return plates;
}

server.post('/create-plate', (req, res) => {
  console.log('/create-plate', req.body);
  const plates = readPlates();
  console.log('plates', plates);
  const plate = plates?.filter(u => u.plate === req.body.plate)[0];
  console.log('plate', plate);

  if (plate === undefined || plate === null) {
    res.send({
      ...req.body,
      id: generateId(),
    });
    console.log('db.plates', db.plates);
    db.plates.push(req.body);
    console.log('db.plates', db.plates);
  } else {
    res.status(500).send('Plate already exists');
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

const idCreator = function* () {
  const plates = readPlates();
  let i = 0;
  if (plates.length > 0) {
    i = plates[plates.length - 1].id;
  }
  while (true) yield i++;
};

const idsGenerator = idCreator();
const generateId = () => idsGenerator.next().value;
