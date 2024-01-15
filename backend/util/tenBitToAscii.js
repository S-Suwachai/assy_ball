const tenBitToAscii = (tenBit1 = 0, tenBit2 = 0, tenBit3 = 0) => {
    let asciiString = "";
    let hexBit;
    if (tenBit3 === 0) {
        hexBit = tenBit2.toString(16).padStart(2, '0') + tenBit1.toString(16).padStart(2, '0');
    } else if (tenBit3 === 0 && tenBit2 === 0) {
        hexBit = tenBit1.toString(16).padStart(2, '0');
    } else {
        hexBit = tenBit3.toString(16).padStart(2, '0') + tenBit2.toString(16).padStart(2, '0') + tenBit1.toString(16).padStart(2, '0');
    }
    
    for (let i = 0; i < hexBit.length; i += 2) {
        let hexPair = hexBit.substr(i, 2);
        let asciiChar = String.fromCharCode(parseInt(hexPair, 16));
        asciiString += asciiChar
    }
    return asciiString.split('').reverse().join('');
}

module.exports = tenBitToAscii;