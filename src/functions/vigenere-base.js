const lowerAlphabet = /[^a-z]/g;

const baseVigenereEncrypt = function(plainMsg, key) {
    plainMsg = plainMsg.toLowerCase().replace(lowerAlphabet, "");
    let cypher = "";

    for(let i = 0, j = 0; i < plainMsg.length; i++){
        let currentLetter = plainMsg[i];

        let num = ((currentLetter.charCodeAt() - 97) + (key[j%key.length].charCodeAt() - 97)) % 26;
        num = (num + 26) % 26;
        cypher += String.fromCharCode(num+97);
        j++;

    }
    return cypher;
};

const baseVigenereDecrypt = function(cypher, key) {
    let plainMsg = "";

    for(let i = 0, j = 0; i < cypher.length; i++){
        let currentLetter = cypher[i];

        let num = ((currentLetter.charCodeAt() - 97) - (key[j%key.length].charCodeAt() - 97)) % 26;
        num = (num + 26) % 26;
        plainMsg += String.fromCharCode(num+97);
        j++;
        
    }
    return plainMsg;
}

export {baseVigenereEncrypt, baseVigenereDecrypt};