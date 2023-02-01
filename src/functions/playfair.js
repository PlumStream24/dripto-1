//using the version where i replaces j

const lowerAlphabet = /[^a-z]/g;

const createPlayfairTable = function(key){
    let playfairTable = [];
    key = key.toLowerCase().replaceAll("j", "i").replace(lowerAlphabet, "") + "abcdefghiklmnopqrstuvwxyz";
    key = [...new Set(key)];
    for(let i = 0; i < 5; i++){
        playfairTable.push(key.splice(0,5));
    }
    return playfairTable;
}

const playfairIndex= function(letter, table){
    let x, y;
    for (let j = 0; j < 5; j++){
        if(table[j].indexOf(letter) !== -1){
            x = table[j].indexOf(letter);
            y = j;
            break;
        }
    }
    return [x, y];
}

const absoluteMod = function(n, m) {
    return ((n % m) + m) % m;
}

const playfairEncrypt = function(plainMsg, key){
    plainMsg = plainMsg.toLowerCase().replaceAll("j", "i").replace(lowerAlphabet, "");
    let playfairTable = createPlayfairTable(key);

    let cypher = "";

    for(let i = 0; i < plainMsg.length; i+=2){
        let currentLetters = ""
        if (plainMsg[i+1] === undefined){
            currentLetters += plainMsg[i]+"x";
        }
        else {
            currentLetters += plainMsg[i]+plainMsg[i+1];
        }
        if (currentLetters[0] === "x" && currentLetters[1] === "x"){
            currentLetters = currentLetters.slice(0,1) + "z"
            i--;
        }
        else if (currentLetters[0] === currentLetters[1]){
            currentLetters = currentLetters.slice(0,1) + "x"
            i--;
        }
        
        let p1 = playfairIndex(currentLetters[0], playfairTable);
        let p2 = playfairIndex(currentLetters[1], playfairTable);
        if(p1[0] === p2[0]){
            currentLetters = playfairTable[absoluteMod(p1[1] + 1, 5)][p1[0]] + playfairTable[absoluteMod(p2[1] + 1, 5)][p2[0]];
        }
        else if(p1[1] === p2[1]){
            currentLetters = playfairTable[p1[1]][absoluteMod(p1[0] + 1, 5)] + playfairTable[p2[1]][absoluteMod(p2[0] + 1, 5)];
        }
        else {
            currentLetters = playfairTable[p1[1]][p2[0]] + playfairTable[p2[1]][p1[0]];
        }
        cypher += currentLetters;
    }
    return cypher;
}

const playfairDecrypt = function(plainMsg, key){
    plainMsg = plainMsg.toLowerCase().replaceAll("j", "i").replace(lowerAlphabet, "");
    let playfairTable = createPlayfairTable(key);

    let cypher = "";

    for(let i = 0; i < plainMsg.length; i+=2){
        let currentLetters = "";
        if (plainMsg[i+1] === undefined){
            currentLetters += plainMsg[i]+"x";
        }
        else {
            currentLetters += plainMsg[i]+plainMsg[i+1];
        }
        if (currentLetters[0] === "x" && currentLetters[1] === "x"){
            currentLetters = currentLetters.slice(0,1) + "z"
            i--;
        }
        else if (currentLetters[0] === currentLetters[1]){
            currentLetters = currentLetters.slice(0,1) + "x"
            i--;
        }

        let p1 = playfairIndex(currentLetters[0], playfairTable);
        let p2 = playfairIndex(currentLetters[1], playfairTable);
        if(p1[0] === p2[0]){
            currentLetters = playfairTable[absoluteMod(p1[1] - 1, 5)][p1[0]] + playfairTable[absoluteMod(p2[1] - 1, 5)][p2[0]];
        }
        else if(p1[1] === p2[1]){
            currentLetters = playfairTable[p1[1]][absoluteMod(p1[0] - 1, 5)] + playfairTable[p2[1]][absoluteMod(p2[0] - 1, 5)];
        }
        else {
            currentLetters = playfairTable[p1[1]][p2[0]] + playfairTable[p2[1]][p1[0]];
        }
        cypher += currentLetters;
    }
    return cypher;
}

export{playfairEncrypt, playfairDecrypt};