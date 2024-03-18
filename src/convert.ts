function decToBin(decimal: number): number {
    let integer = Math.floor(decimal);
    let fractional = decimal - integer;
    let binary = "";

    while (integer > 0) {
        binary = (integer % 2) + binary;
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

function checkBinary(input: string): boolean {
    for (let digit of input) {
        if (digit !== "0" && digit !== "1") {
            return false;
        }
    }

    return true;
}

function normalize(input: number, exp: number): [number, number] {
    while (input > 2) {
        input /= 10;
        exp += 1;
    }

    return [parseFloat(input.toFixed(2)), exp];
}

export function converter(entry: number, base: number, exp: number): [number, number, number] {
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

    [entry, exp] = normalize(entry, exp);

    return [entry, base, exp];
}