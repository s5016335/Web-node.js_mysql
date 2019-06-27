const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false })); // to support URL-encoded bodies
app.use(bodyparser.json()); // to support JSON-encoded bodies

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'XXXXXXXX',
  database: 'Discuss'
});

app.get('/content', (req, res) => {
  let sql = 'SELECT * FROM Content';
  db.query(sql, (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.json(result);
    fs.writeFileSync('result.json', JSON.stringify(result));
  });
});

app.post('/content', (req, res) => {
  //const name = req.param('name');
  //const conversation = req.param('conversation');
  //const date = req.param('date');

  const name = req.body.name;
  const conversation = req.body.conversation;
  const date = req.body.date;

  let sql = 'INSERT INTO Content(Name,Conversation,Date)VALUES(?,?,?)';
  db.query(sql, [name, conversation, date], (err, result) => {
    if (err) {
      //res.sendStatus(500);
      res.send(err);
      return;
    }
  });
});

app.listen(3000, () => {
  console.log('server start');
});
