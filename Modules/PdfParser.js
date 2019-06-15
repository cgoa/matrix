const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const pdf = require('pdf-parse');

class PdfParser{
    constructor(){
    }

    static async parsePDFFolder(){
        let directoryPath = path.join(__dirname,'../Files');
        let arr = [];

        arr = await fsp.readdir(directoryPath, function (err, files) {
            let fileArr = [];

            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                fileArr.push(file);
            });

            return fileArr;
        });

        return PdfParser.parsePDFArr(arr);
    }

    static async parsePDFArr(arr, index = 0, resultArr = []){
        if(index >= arr.length){
            return resultArr;
        }

        let elem = arr[index];
        let parsedResult = await PdfParser.parsePdf('./Files'+'/'+elem);

        resultArr.push(parsedResult);
        return PdfParser.parsePDFArr(arr, ++index, resultArr);
    }

    static parsePdf(path){
        let dataBuffer = fs.readFileSync(path);

        return pdf(dataBuffer).then(function(data) {
            return PdfParser.textToJSON(data.text);
        })
        .catch(function(error){
            // handle exceptions
        })
    }

    static textToJSON(data){
        let parsedData = data.split(/(?:\n){2,}/g);

        return parsedData;
    }
}
module.exports = PdfParser;