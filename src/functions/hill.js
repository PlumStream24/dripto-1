// to test recommend the key being
// a = 9, b = 3, c = 29, d = 10

import {create, all} from "mathjs";

const config = {};
const math = create(all, config);

// made with a 2x2 key only in mind
const hillEncrypt = function(plainMsg, key_a, key_b, key_c, key_d) {
    let keyMatrix = math.matrix([[Number(key_a), Number(key_b)], [Number(key_c), Number(key_d)]]);
    
    if(plainMsg.length % 2 !== 0){
        plainMsg += "x";
    }

    let cypher = "";

    for(let i = 0; i < plainMsg.length; i+=2){
        let currentLetterMatrix = math.matrix([plainMsg[i].codePointAt(), plainMsg[i+1].codePointAt()]);
        let cypherMatrix = math.multiply(keyMatrix, currentLetterMatrix);
        cypherMatrix = math.mod(cypherMatrix, 256);
        cypher += String.fromCodePoint(cypherMatrix.get([0])) + String.fromCodePoint(cypherMatrix.get([1]));
    }

    return cypher;
}

const extendedEuclidAlgo = function(a, b) {
    let q,r,m,n;
    let x = 0;
    let y = 1;
    let u = 1;
    let v = 0;
    while (a!==0) {
        q = Math.floor(b/a);
        r = math.mod(a,b);
        m = x-(u*q);
        n = y-(v*q);
        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }
    return x;
}

const hillDecrypt = function(plainMsg, key_a, key_b, key_c, key_d) {
    let keyMatrix = math.matrix([[Number(key_a), Number(key_b)], [Number(key_c), Number(key_d)]])
    let det = math.det(keyMatrix)
    
    if(det===0){
        return "Cannot decrypt, key has no inverse."
    }
    let inverseKeyMatrix = math.mod(math.multiply(math.matrix([[Number(key_d), -1*Number(key_b)], [-1*Number(key_c), Number(key_a)]]), extendedEuclidAlgo(math.mod(det, 256), 256)), 256);

    if(plainMsg.length % 2 !== 0){
        plainMsg += "x";
    }

    let cypher = "";

    for(let i = 0; i < plainMsg.length; i+=2){
        let currentLetterMatrix = math.matrix([plainMsg[i].codePointAt(), plainMsg[i+1].codePointAt()]);
        let cypherMatrix = math.multiply(inverseKeyMatrix, currentLetterMatrix);
        cypherMatrix = math.mod(cypherMatrix, 256);
        cypher += String.fromCodePoint(math.round(cypherMatrix.get([0]))) + String.fromCodePoint(math.round(cypherMatrix.get([1])));
    }

    return cypher;
}

export {hillEncrypt, hillDecrypt}