// {"name":"Roma","score":400}

const express = require('express');
const bodyParset = require('body-parser');

const app = express();

app.use(bodyParset.json());

let users = [];

app.get('/users/', (req, res) => res.json(users.filter(u => u)));

app.post('/users/', (req, res) => {
  const id = users.length;
  users.push(req.body);
  res.json({ id });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  users[id] = null;
  res.send();
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  if (users[id]) {
    res.json(users[id]);
  } else {
    res.status(404);
    res.send();
  }
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  if (users[id]) {
    users[id] = Object.assign(users[id], req.body);
    res.json(users[id]);
  } else {
    res.status(404);
    res.send();
  }
});

app.listen(3000, () => console.log('Server has been run on 3000 port'));
