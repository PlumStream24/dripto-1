const lowerAlphabet = /[^a-z]/g;

const autoVigenereEncrypt = function(plainMsg, key) {
    plainMsg = plainMsg.toLowerCase().replace(lowerAlphabet, "");
    
    let keyCon = key + plainMsg;
    let cypher = "";

    for(let i = 0, j = 0; i < plainMsg.length; i++){
        let currentLetter = plainMsg[i];

        let num = ((currentLetter.charCodeAt() - 97) + (keyCon[j].charCodeAt() - 97)) % 26;
        num = (num + 26) % 26;
        cypher += String.fromCharCode(num+97);
        j++;
        
    }
    return cypher;
}

const autoVigenereDecrypt = function(cypher, key) {
    let plainMsg = "";
    let keyCon = key;

    for(let i = 0, j = 0; i < cypher.length; i++){
        let currentLetter = cypher[i];

        let num = ((currentLetter.charCodeAt() - 97) - (keyCon[j].charCodeAt() - 97)) % 26;
        num = (num + 26) % 26;
        let letter = String.fromCharCode(num+97);
        plainMsg += letter;
        keyCon += letter;
        j++;
        
    }
    return plainMsg;
}

export {autoVigenereDecrypt, autoVigenereEncrypt};