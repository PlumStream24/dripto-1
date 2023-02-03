// to test recommend the key being
// a = 9, b = 3, c = 29, d = 10

import {create, all} from "mathjs";

const config = {};
const math = create(all, config);

// made with a 2x2 key only in mind
const hillEncrypt = function(plainMsg, key_a, key_b, key_c, key_d, key_e, key_f, key_g, key_h, key_i) {
    let keyMatrix = math.matrix([[Number(key_a), Number(key_b), Number(key_c)], [Number(key_d), Number(key_e), Number(key_f)], [Number(key_g), Number(key_h), Number(key_i)]]);
    
    let remainder = plainMsg.length % 3;
    if(remainder !== 0){
        for (let i = 0; i < 3 - remainder; i++) {
            plainMsg += "x";
        }
    }

    let cypher = "";

    for(let i = 0; i < plainMsg.length; i+=3){
        let currentLetterMatrix = math.matrix([plainMsg[i].codePointAt(), plainMsg[i+1].codePointAt(), plainMsg[i+2].codePointAt()]);
        let cypherMatrix = math.multiply(keyMatrix, currentLetterMatrix);
        cypherMatrix = math.mod(cypherMatrix, 256);
        cypher += String.fromCodePoint(cypherMatrix.get([0])) + String.fromCodePoint(cypherMatrix.get([1])) + String.fromCodePoint(cypherMatrix.get([2]));
    }

    return cypher;
}

const extendedEuclidAlgo = function(a, b) {
    let r1 = b;
    let r2 = a;
    let u1 = 0;
    let v1 = 1;
    let u2 = 1;
    let v2 = 0;
    while(r2!==0) {
        let q = Math.floor(r1/r2);
        let r3 = r1;
        let u3 = u1;
        let v3 = v1;
        r1 = r2;
        u1 = u2;
        v1 = v2;
        r2 = r3 - q * r2;
        u2 = u3 - q * u2;
        v2 = v3 - q * v2;
    }
    return u1;
}

const hillDecrypt = function(plainMsg, key_a, key_b, key_c, key_d, key_e, key_f, key_g, key_h, key_i) {
    let keyMatrix = math.mod(math.matrix([[Number(key_a), Number(key_b), Number(key_c)], [Number(key_d), Number(key_e), Number(key_f)], [Number(key_g), Number(key_h), Number(key_i)]]), 256);
    let det = math.mod(math.det(keyMatrix), 256);

    if(det===0){
        return "Cannot decrypt, key has no inverse."
    }

    let inverseKeyMatrix = math.matrix([[Number(key_e)*Number(key_i)-Number(key_h)*Number(key_f), -1*(Number(key_d)*Number(key_i)-Number(key_f)*Number(key_g)), Number(key_d)*Number(key_h)-Number(key_e)*Number(key_g)],
                                        [-1*(Number(key_b)*Number(key_i)-Number(key_h)*Number(key_c)), Number(key_a)*Number(key_i)-Number(key_c)*Number(key_g), -1*(Number(key_a)*Number(key_h)-Number(key_b)*Number(key_g))],
                                        [Number(key_b)*Number(key_f)-Number(key_e)*Number(key_c), -1*(Number(key_a)*Number(key_f)-Number(key_c)*Number(key_d)), Number(key_a)*Number(key_e)-Number(key_b)*Number(key_d)]]);
    
    inverseKeyMatrix = math.transpose(inverseKeyMatrix);
    inverseKeyMatrix = math.mod(inverseKeyMatrix, 256);
    inverseKeyMatrix = math.mod(math.multiply(inverseKeyMatrix, extendedEuclidAlgo(det, 256)), 256);

    let remainder = plainMsg.length % 3;
    if(remainder !== 0){
        for (let i = 0; i < 3 - remainder; i++) {
            plainMsg += "x";
        }
    }

    let cypher = "";

    for(let i = 0; i < plainMsg.length; i+=3){
        let currentLetterMatrix = math.matrix([plainMsg[i].codePointAt(), plainMsg[i+1].codePointAt(), plainMsg[i+2].codePointAt()]);
        let cypherMatrix = math.multiply(inverseKeyMatrix, currentLetterMatrix);
        cypherMatrix = math.mod(cypherMatrix, 256);
        cypher += String.fromCodePoint(math.round(cypherMatrix.get([0]))) + String.fromCodePoint(math.round(cypherMatrix.get([1]))) + String.fromCodePoint(math.round(cypherMatrix.get([2])));
    }

    return cypher;
}

export {hillEncrypt, hillDecrypt}