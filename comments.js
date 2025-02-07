// Create web server
// npm install express
const express = require('express');
const app = express();
// npm install body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// npm install cors
const cors = require('cors');
app.use(cors());
const port = 3001;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// npm install nedb
const Datastore = require('nedb');
const db = new Datastore({ filename: 'comments.db', autoload: true });

// GET all comments
app.get('/comments', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.json(docs);
  });
});

// POST comment
app.post('/comments', (req, res) => {
  const newComment = {
    name: req.body.name,
    comment: req.body.comment,
    created: new Date()
  };
  db.insert(newComment, (err, doc) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.json(doc);
  });
});

// DELETE comment
app.delete('/comments/:id', (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.json({ numRemoved });
  });
});

