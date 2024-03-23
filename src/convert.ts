export { decToBin, checkBinary, checkDecimal, normalize, convert2binary, getSignBit, getExponentBits, getMantissaBits, combineBits, convertToHex};
function checkBinary(input: string, base: number): boolean {
    if (base !== 2) {
        return false;
    }

    for (let digit of input) {
        if (digit !== "0" && digit !== "1" && digit !== ".") {
            return false;
        }
    }

    return true;
}

function checkDecimal(input: string, base: number): boolean {
    if (base !== 10) {
        return false;
    }

    for (let digit of input) {
        if (digit < "0" || digit > "9" && digit !== ".") {
            return false;
        }
    }

    return true;
}

function decToBin(decimal: number): number {
    let integer = Math.floor(decimal);
    let fractional = decimal - integer;
    let binary = "";

    while (integer > 0) {
        binary = (integer % 2).toString() + binary;
        integer = Math.floor(integer / 2);
    }

    if (fractional > 0) {
        binary += ".";
        while (fractional > 0) {
            fractional *= 2;
            let bit = Math.floor(fractional);
            binary += bit.toString();
            fractional -= bit;
        }
    }

    return parseFloat(binary);
}

function normalize(input: number, exp: number): [number, number] {
    while (input > 2) {
        input /= 10;
        exp += 1;
    }

    return [parseFloat(input.toFixed(20)), exp];
}

function convert2binary(entry: number, base: number, exp: number): [number, number, number] {
    entry = parseFloat(entry.toFixed(20));
    if (base === 10) {
        if (exp > 0) {
            while(exp > 0) {
                entry *= 10;
                exp -= 1;
            }
        } else {
            while(exp < 0) {
                entry /= 10;
                exp += 1;
            }
        }
        entry = decToBin(entry);
        base = 2;
    }

    let [normalizedEntry, normalizedExp] = normalize(entry, exp);

    return [normalizedEntry, base, normalizedExp];
}

function getSignBit(sign: string): number {
    if (sign[0] === "-") {
        return 1;
    } else {
        return 0;
    }
}

function getExponentBits(exp: number): string {
    let expbits = exp + 127;
    let stringexpbits = expbits.toString(2);
    if (exp + 127 < 128) {
        stringexpbits = "0" + stringexpbits;
    }
    return stringexpbits;
}

function getMantissaBits(input: number): string {
    let mantissa = input.toString().split(".")[1];
    while (mantissa.length < 23) {
        mantissa += "0";
    }
    return mantissa;
}

function combineBits(signBit: number, expBits: string, mantissaBits: string): string {
    return signBit.toString() + expBits + mantissaBits;
}

function hexTable(input: string): string {
    switch (input) {
        case "0000": return "0";
        case "0001": return "1";
        case "0010": return "2";
        case "0011": return "3";
        case "0100": return "4";
        case "0101": return "5";
        case "0110": return "6";
        case "0111": return "7";
        case "1000": return "8";
        case "1001": return "9";
        case "1010": return "A";
        case "1011": return "B";
        case "1100": return "C";
        case "1101": return "D";
        case "1110": return "E";
        case "1111": return "F";
        default: return "";
    }
}

function convertToHex(combined: string): string {
    let hex = "";
    let current = 0;
    while (current < combined.length) {
        let hexbits = combined.slice(current, current + 4);
        let convertedHex = hexTable(hexbits);
        hex += convertedHex;
        current += 4;
    }
    return hex;
}