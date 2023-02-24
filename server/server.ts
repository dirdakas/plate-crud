const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

function readPlates() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const plates = JSON.parse(dbRaw).plates;
  return plates;
}

server.get('/plate-list', (req: any, res: any) => {
  console.log('/plate-list');
  const plates = db.plates || [];

  res.send(plates);
});

server.post('/create-plate', (req: any, res: any) => {
  console.log('/create-plate', req.body);
  const plates = db.plates;
  const plate = plates.find((el: any) => el.plate === req.body.plate);

  if (plate === undefined || plate === null) {
    const newItem = {
      ...req.body,
      id: generateId(),
    };

    res.send(newItem);
    db.plates.push(newItem);
  } else {
    res.status(500).send('Plate already exists');
  }
});

server.post('/update-plate', (req: any, res: any) => {
  console.log('/update-plate', req.body);
  const plates = db.plates;
  const plate = plates.find((el: any) => el.id === req.body.id);

  if (plate === undefined || plate === null) {
    res.status(500).send(`Plate does't exists`);
  } else {
    res.send({
      ...req.body,
    });
    db.plates.push(req.body);
  }
});

server.post('/delete-plate', (req: any, res: any) => {
  console.log('/delete-plate', req.body);
  const plates = db.plates;
  const plate = plates.find((el: any) => el.id === req.body.id);

  if (plate === undefined || plate === null) {
    res.status(500).send(`Plate does't exists`);
  } else {
    res.send({
      ...req.body,
    });
    db.plates = db.plates.filter((el: any) => el.id !== req.body.plate.id);
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
    i = plates[plates.length - 1].id + 1;
  }
  while (true) yield i++;
};

const idsGenerator = idCreator();
const generateId = () => idsGenerator.next().value;
