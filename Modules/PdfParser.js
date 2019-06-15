const fs = require('fs');
const pdf = require('pdf-parse');

class PdfParser{
    constructor(){
        
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

        console.log(parsedData);

        return JSON.stringify(parsedData);
    }
}
module.exports = PdfParser;