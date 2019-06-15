import express from 'express';
const app = express();

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

app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
