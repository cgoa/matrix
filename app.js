const PdfParser = require('./Modules/PdfParser');
const fs = require('fs');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
  PdfParser.parsePDFFolder().then((res) => {
    console.log(res);
  });
  // let tempResult = PdfParser.parsePdf('./test.pdf');

  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');

  // tempResult.then((PDFres) => {
  //   // console.log(PDFres.text);
  //
  //   fs.writeFile("./test.txt", PDFres, function(err) {
  //     if(err) {
  //       return console.log(err);
  //     }
  //
  //     console.log("The file was saved!");
  //   });
  //
  //   // res.end(PDFres);
  // });
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });