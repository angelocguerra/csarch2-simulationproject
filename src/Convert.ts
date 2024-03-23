export function binary_to_hex(binary: string): string {
    let a: string = binary;
    let b: string = "";

    if (binary.includes(".")) {
        let arr: string[] = binary.split(".");
        a = arr[0];
        b = arr[1];
    }

    let an: number = a.length % 4;
    let bn: number = b.length % 4;

    if (an != 0) a = "0".repeat(4 - an) + a;

    if (bn != 0) b = "0".repeat(4 - bn) + b;

    let res: string = binary_to_hex_convert(a);

    if (b.length > 0) res += "." + binary_to_hex_convert(b);

    return res;
}

function BinToDec(bin: string): number {
    let num: number = 0;

    for (let i = 0; i < bin.length; i++)
        if (bin[bin.length - i - 1] === "1") num += 2 ** i;

    return num;
}

function binary_to_hex_convert(binary: string): string {
    if (binary.length == 0) return "";

    const hex_index: string[] = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
    ];

    return binary
        .match(/.{1,4}/g)!
        .map((v) => hex_index[BinToDec(v)])
        .join("");
}

export function integer_to_binary(integer: number): string {
    return (integer >>> 0).toString(2)
}

export function decimal_to_binary(input: number): string {
    let fractional = "";
    var temp;
    var count = 0;
    // input = 0.875 -> 0.75 -> 0.5 -> 0.0
    // temp = 1
    // fractional = 111
    // count = 3
    while (input % 1 != 0) {
        input *= 2;
        temp = Math.floor(input);
        if (temp >= 1) {
            temp = 1
            input -= 1;
        }
        fractional += temp;
        count += 1;
        if (count == 31) {
            break;
        }
    }
    return fractional
}

export function normalize_decimal(integer: string, decimal: string, exponent: number): [string, number] {
    let binary = "";
    var count = 0;

    var temp

    if (decimal == "0") {
        exponent = 0;
    }

    if(integer.length == 1 && integer == "1") {
        binary = integer + "." + decimal;
    }

    else if(integer.length > 1) {
        while(integer != "1") {
            temp = integer.slice(-1);
            count += 1;
            decimal = decimal.padStart(decimal.length + 1, temp);
            integer = integer.slice(0, -1);
        }
        binary = "1" + "." + decimal;
        exponent = count;
    }
    else if(integer == "0") {
        temp = decimal;

        while(temp.charAt(0) != "1") {
            temp = temp.slice(1);
            count += 1;
        }
        count += 1;
        binary = "1" + "." + temp;
        exponent = 0 - count;
    }

    return [binary, exponent];
}

export function normalize_binary(integer: string, decimal: string, exponent: number): [string, number] {
    let binary = "";
    let count = 0;

    if (integer.length === 1 && integer === "1") {
        decimal = decimal.split('.')[1];
        if (decimal === undefined) { decimal = "0"; }
        binary = integer + "." + decimal;
    } 

    else if (integer.length > 1) {
        decimal = decimal.split('.')[1];
        if (decimal === undefined) { decimal = "0"; }
        let temp: string;
        while (integer !== "1") {
            temp = integer.slice(-1);
            count += 1;
            decimal = decimal.padStart(decimal.length + 1, temp);
            integer = integer.slice(0, -1);
        }
        binary = "1" + "." + decimal;
        exponent = count + exponent;
    }

    else if (integer === "0") {
        decimal = decimal.split('.')[1];
        let temp = decimal;
        while (temp.charAt(0) !== "1") {
            temp = temp.slice(1);
            count += 1;
        }
        count += 1;
        temp = temp.slice(1);
        binary = "1" + "." + temp;
        exponent = exponent - count;
    }

    return [binary, exponent];

}

export function getSign(input: string): string {
    if (input.includes('-')) {
        return '1';
    }
    return '0';
}

export function getMantissa(mantissa: string): string {
    var length = mantissa.length;
    var add = 23 - length;

    if(length < 23) {
        for (let i = 0; i < add; i++) {
            mantissa += "0";
        }
    }
    else if (length > 23) {
        for (let i = length; i > 23; i--) {
            mantissa = mantissa.slice(0, -1);
        }
    }
    return mantissa;
}

export function getExponent(input: string): string {
    var length = input.length;
    var add = 8 - length;

    for (let i = 0; i < add; i++) {
        input = input.padStart(input.length + 1, "0");
    }
    return input;
}