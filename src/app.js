import express from 'express';
const app = express();
app.use(express.static('./src/public'))

import PdfParser from './Modules/PdfParser';
import ElasticClient from './elasticClient';

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const con = await PdfParser.parsePDFFolder();

  res.send(`Hello ${pdf}`);
});

app.get('/sodemieterhetelasticin', async (req, res) =>{
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    var file = await PdfParser.parsePDFFolder();
    ElasticClient.index({
      index: 'files',
      type: 'file',
      body: Object.assign({},file)
  }, function(err, resp, status) {
      console.log(resp);
  });
  } catch(ex){
    console.log(ex);
    res.send('elasticsearch cluster is down!');
  }
});

app.get('/about', async (req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    var result = await client.ping({
      // ping usually has a 3000ms timeout
      requestTimeout: 4000
    });
    res.send(result);
  } catch(ex){
    console.log(ex);
    res.send('elasticsearch cluster is down!');
  }
});

app.get('/search', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'html');
  res.sendFile('public/search.html' , { root : __dirname});
});

app.get('/search/:query', (req, res) => {
  if (req.params) {
    console.log('req.params!');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    //req.body.query[0] = capitalize(req.body.query[0]);
    console.log(req.params);
    res.send(req.params);
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'html');
    res.sendFile('public/search.html' , { root : __dirname});
  }
});

app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
