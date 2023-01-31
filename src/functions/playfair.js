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
        console.log(currentLetters);
        let p1 = playfairIndex(currentLetters[0], playfairTable);
        let p2 = playfairIndex(currentLetters[1], playfairTable);
        if(p1[0] === p2[0]){
            let x1 = p1[1] + 1;
            if (x1 > 4){
                x1 = 0;
            }
            let x2 = p2[1] + 1;
            if (x2 > 4){
                x2 = 0;
            }
            currentLetters = playfairTable[x1][p1[0]] + playfairTable[x2][p2[0]];
        }
        else if(p1[1] === p2[1]){
            let y1 = p1[0] + 1;
            if (y1 > 4){
                y1 = 0;
            }
            let y2 = p2[0] + 1;
            if (y2 > 4){
                y2 = 0;
            }
            currentLetters = playfairTable[p1[1]][y1] + playfairTable[p2[1]][y2];
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
            let x1 = p1[1] - 1;
            if (x1 < 0){
                x1 = 4;
            }
            let x2 = p2[1] - 1;
            if (x2 < 0){
                x2 = 4;
            }
            currentLetters = playfairTable[x1][p1[0]] + playfairTable[x2][p2[0]];
        }
        else if(p1[1] === p2[1]){
            let y1 = p1[0] - 1;
            if (y1 < 0){
                y1 = 4;
            }
            let y2 = p2[0] - 1;
            if (p2[0]-1 < 0){
                y2 = 4;
            }
            currentLetters = playfairTable[p1[1]][y1] + playfairTable[p2[1]][y2];
        }
        else {
            currentLetters = playfairTable[p1[1]][p2[0]] + playfairTable[p2[1]][p1[0]];
        }
        cypher += currentLetters;
    }
    return cypher;
}

export{playfairEncrypt, playfairDecrypt};