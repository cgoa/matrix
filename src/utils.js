function wordSubString(input, maxLength, startWord, startIndex = 0){
    var sInput = input.substr(startIndex, input.length - startIndex);
    
    let iterator = sInput.indexOf(startWord);
    while(sInput[iterator] !== ' ' && iterator != 0){
        iterator -= 1;
    }
    let interimResult = sInput.substr(iterator, maxLength);
    let result = interimResult.substr(0, Math.min(interimResult.length, interimResult.lastIndexOf(" ")));
    return result;
}