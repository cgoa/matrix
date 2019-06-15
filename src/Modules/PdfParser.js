import { readFileSync } from 'fs';
import { promises as fsp } from 'fs';
import { join } from 'path';
import pdf from 'pdf-parse';

import moment from "moment";

class PdfParser{
    constructor(){
    }

    static async parsePDFFolder(){
        let directoryPath = join(__dirname,'../../Files');
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
        let dataBuffer = readFileSync(path);

        return pdf(dataBuffer).then(function(data) {
            console.log(data.info);

            return {
                date: PdfParser.getCreationDate(data.info),
                textArr: PdfParser.textToJSON(data.text)
            };
        })
        .catch(function(error){
            // handle exceptions
        })
    }

    static textToJSON(data){
        let parsedData = data.split(/(?:\n){2,}/g);

        return parsedData;
    }

    static getCreationDate(infoData){
        let rawDate = infoData.CreationDate;
        return new moment(rawDate, '  YYYYMMDDHHmmss').utc().format();
    }

    static filterTextArrByKeyword(textArr, keyword){
        let filteredArr = [];
        textArr = textArr.map((elem) => {
            return elem.toLowerCase();
        });
        keyword = keyword.toLowerCase();

        textArr.forEach((elem, index) => {
            if(elem.includes(keyword)){
                filteredArr.push(elem);
            }
        });

        return filteredArr;
    }
}
export default PdfParser;