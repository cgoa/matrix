const fs = require('fs');
const pdf = require('pdf-parse');

class PdfParser{
    constructor(){
        
    }

    parsePdf(path){
        let dataBuffer = fs.readFileSync(path);

        return pdf(dataBuffer).then(function(data) {
            return data;
        })
        .catch(function(error){
            // handle exceptions
        })
    }
}
module.exports = PdfParser;