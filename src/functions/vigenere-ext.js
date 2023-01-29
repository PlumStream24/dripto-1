
const extVigenereEncrypt = function(plainMsg, key) {
    let cypher = "";

    for(let i = 0, j = 0; i < plainMsg.length; i++){
        let currentLetter = plainMsg[i];
        let num = (currentLetter.charCodeAt() + key[j%key.length].charCodeAt()) % 256;
        num = (num + 256) % 256;
        cypher += String.fromCharCode(num);
        j++;

    }
    return cypher;
};

const extVigenereDecrypt = function(cypher, key) {
    let plainMsg = "";

    for(let i = 0, j = 0; i < cypher.length; i++){
        let currentLetter = cypher[i];

        let num = (currentLetter.charCodeAt() - key[j%key.length].charCodeAt()) % 256;
        num = (num + 256) % 256;
        plainMsg += String.fromCharCode(num);
        j++;
        
    }
    return plainMsg;
}

export {extVigenereDecrypt, extVigenereEncrypt};