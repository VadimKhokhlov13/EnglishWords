const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());

const routes = require('./routes');

app.use('/api', routes);

if(process.env.NODE_ENV == 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
}

const port = process.env.PORT || 5000;

async function start() {
    try {
      await mongoose.connect(
        'mongodb+srv://vadim:1q2w3e@cluster0.nmhrt.mongodb.net/MyDatabase',
        {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        }
      )
      app.listen(port, () => {
        console.log('Server has been started...');
      })
    } catch (e) {
      console.log(e)
    }
  }
  
start()