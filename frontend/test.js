let num1 = 12081
let num2 = 12851

const tenBitToAscii = (tenBit1, tenBit2) => {
    let asciiString = "";
    let hexBit = tenBit2.toString(16).padStart(2, '0') + tenBit1.toString(16).padStart(2, '0');
    for (let i = 0; i < hexBit.length; i += 2) {
        let hexPair = hexBit.substr(i, 2);
        let asciiChar = String.fromCharCode(parseInt(hexPair, 16));
        asciiString += asciiChar
    }
    return asciiString.split('').reverse().join('');
}

console.log(tenBitToAscii(num1, num2));