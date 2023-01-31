//Due to some encoding fuckery between Extended ASCII (the 256 characters ASCII) and Unicode, which js uses and some other historical reasons
//that causes more problems, SOME CHARACTERS MAY NOT BE ENCRYPTED AS EXPECTED.
//It all depends on the version of Extended ASCII you expect the program to use.

//Only very few characters are affected by this.

//There will also be character which are encrypted to be 'nothing'. These are characters that are encrypted into the ASCII control characters (number 0-31).


const absoluteMod = function(n, m) {
    return ((n % m) + m) % m;
}

//Check coprime or not
//Euclid's Algorithm
const gcd = function(a, b) {
    return b ? gcd(b, absoluteMod(a, b)) : a;
}

const affineEncrypt = function(plainMsg, key_a, key_b) {
    if(gcd(key_a, 256)!==1 || !(/^\d+$/.test(key_b))){
        return "Error with value a and/or b."
    }
    let cypher = "";
    for(let i = 0; i < plainMsg.length; i++){
        let currentLetter = plainMsg[i];
        let num = absoluteMod((key_a * currentLetter.codePointAt() + Number(key_b)), 256);
        cypher += String.fromCodePoint(num);
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
        r = absoluteMod(a,b);
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

const affineDecrypt = function(plainMsg, key_a, key_b){
    if(gcd(key_a, 256)!==1 || !(/^\d+$/.test(key_b))){
        return "Error with value a and/or b."
    }
    let key_a_inverse = extendedEuclidAlgo(key_a, 256);
    let cypher = "";
    for(let i = 0; i < plainMsg.length; i++){
        let currentLetter = plainMsg[i];
        let num = absoluteMod((key_a_inverse * (currentLetter.codePointAt() - Number(key_b))), 256);
        cypher += String.fromCodePoint(num);
    }
    return cypher;
}

export {affineEncrypt, affineDecrypt};