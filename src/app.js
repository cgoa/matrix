import express from 'express';
const app = express();
const PdfParser = require('./Modules/PdfParser').default;
import client from './elasticClient';
const hostname = '127.0.0.1';
const port = 3000;

app.get('/', async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  var jakut = await PdfParser.parsePDFFolder();
  console.log(jakut);
  let pdf = "test";//await pdfparser.parsePdf("c:/test");
  res.send(`Hello ${pdf}`);
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

app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
