import express from 'express';
const app = express();
app.use(express.static('./src/public'))

import PdfParser from './Modules/PdfParser';
const pdfparser = new PdfParser();

const hostname = '127.0.0.1';
const port = 3000;

async function getPdf(x) {
  let result = await pdfparser.parsePdf(x);
  return result;
}

app.get('/', async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  let pdf = await getPdf("test");
  res.send(`Hello ${pdf}`);
});

app.get('/about', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send('About page');
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
