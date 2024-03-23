export {
    binary_to_hex,
    BinToDec,
    binary_to_hex_convert,
    integer_to_binary,
    decimal_to_binary,
    normalize_decimal,
    normalize_binary,
    getSign,
    getMantissa,
    getExponent,
    convert,
    error_check,
    checkSpecial,
};
function binary_to_hex(binary: string): string {
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

function clearFields() {
    (document.getElementById("input") as HTMLInputElement).value = "";
    (document.getElementById("base") as HTMLInputElement).value = "";
    (document.getElementById("exponent") as HTMLInputElement).value = "";
    (document.getElementById("binaryOutput") as HTMLElement).innerHTML = "";
    (document.getElementById("hexOutput") as HTMLElement).innerHTML = "";
}

function clearOutputs() {
    (document.getElementById("binaryOutput") as HTMLElement).innerHTML = "";
    (document.getElementById("hexOutput") as HTMLElement).innerHTML = "";
}

function integer_to_binary(integer: number): string {
    return (integer >>> 0).toString(2)
}

function decimal_to_binary(input: number): string {
    let fractional = "";
    var temp;
    var count = 0;

    while (input % 1 != 0) {
        input *= 2;
        temp = Math.floor(input);
        if (temp >= 1) {
            temp = 1
            input -= 1;
        }
        fractional += temp.toString();
        count += 1;
        if (count == 31) {
            break;
        }
    }
    return fractional
}

function normalize_decimal(integer: string, decimal: string, exponent: number): [string, number] {
    let binary = "";
    var count = 0;

    var temp

    if (decimal == "0") {
        exponent = 0;
    }

    if(integer.toString().length == 1 && integer == "1") {
        binary = integer + "." + decimal;
    }

    else if(integer.toString().length > 1) {
        while(integer != "1") {
            temp = integer.slice(-1);
            count += 1;
            decimal = decimal.toString().padStart(decimal.toString().length + 1, temp);
            integer = integer.slice(0, -1);
        }
        binary = "1" + "." + decimal;
        exponent = count;
    }
    else if(integer == "0") {
        temp = decimal;

        while(temp.charAt(0) != "1") {
            temp = (parseFloat(temp).toString(2).slice(1)).toString();
            count += 1;
        }
        count += 1;
        temp = (parseFloat(temp).toString(2).slice(1)).toString();
        binary = "1" + "." + temp;
        exponent = 0 - count;
    }

    return [binary, exponent];
}

function normalize_binary(integer: string, decimal: string, exponent: number): [string, number] {
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

function getSign(input: string): string {
    if (input.includes('-')) {
        return '1';
    }
    return '0';
}

function getMantissa(mantissa: string): string {
    var length = mantissa.length;
    var add = 23 - length;

    if(length < 23) {
        for (let i = 0; i < add; i++) {
            mantissa += "0";
        }
        if (length > 23) {
            for (let i = length; i > 23; i--) {
                mantissa = mantissa.slice(0, -1);
            }
        }
    }
    return mantissa;
}

function getExponent(input: string): string {
    var length = input.length;
    var add = 8 - length;

    for (let i = 0; i < add; i++) {
        input = input.padStart(input.length + 1, "0");
    }
    return input;
}

function convert(): void {
    if (error_check()) {
        let input: string = (document.getElementById("input") as HTMLInputElement).value;
        let base: string = (document.getElementById("base") as HTMLInputElement).value;
        let exponent: string = (document.getElementById("exponent") as HTMLInputElement).value;
        let sign_bit: string = getSign(input);
        let splitNum: string[] = input.toString().split('.');

        if (sign_bit === "1") {
            splitNum[0] = splitNum[0].substring(1); //removes the '-' sign
        }

        //separates integer and decimal
        let integer: number = parseFloat(splitNum[0]);
        let dec: number = parseFloat("0." + splitNum[1]);

        if (input === "0") {
            (document.getElementById("binaryOutput") as HTMLElement).innerHTML = '0 00000000 00000000000000000000000';
        } else if (base === "2") {
            dec = parseFloat("0." + splitNum[1]);

            let normalized: [string, number] = normalize_binary(integer.toString(), dec.toString(), parseInt(exponent));
            let binary: string[] = normalized[0].split(".");
            if(checkSpecial(sign_bit, normalized[1], binary[0], "0."+binary[1], 1) === false) {
                let binary: string = normalized[0];
                let exponent: number = 127 + normalized[1];
                let expoRep: string = integer_to_binary(parseInt(exponent.toString()));

                let answer_bin: string = sign_bit + " " + getExponent(expoRep) + " " + getMantissa(binary.split('.')[1]);
                let answer_hex: string = binary_to_hex(sign_bit + getExponent(expoRep) + getMantissa(binary.split('.')[1]));

                (document.getElementById("binaryOutput") as HTMLElement).innerHTML = answer_bin;
                (document.getElementById("hexOutput") as HTMLElement).innerHTML = answer_hex;
            }
        } else if (base === "10") {
            input = (parseFloat(integer.toString() + dec.toString()) * parseFloat(Math.pow(10.0, parseInt(exponent)).toString())).toString();
            splitNum = input.toString().split('.');
            integer = parseFloat(splitNum[0]);
            dec = parseFloat("0." + splitNum[1]);

            let integer_str: string = integer_to_binary(parseInt(integer.toString()));
            let dec_str: string = decimal_to_binary(parseFloat(dec.toString()));

            let normalized: [string, number] = normalize_decimal(integer_str, dec_str, parseInt(exponent));
            let binary: string[] = normalized[0].split(".");

            let binary_str: string = normalized[0];

            if(checkSpecial(sign_bit, Number(exponent), binary[0], "0."+binary[1], 0) === false) {
                let exponent: number = 127 + normalized[1];
                let expoRep: string = integer_to_binary(parseInt(exponent.toString()));

                let answer_bin: string = sign_bit + " " + getExponent(expoRep) + " " + getMantissa(binary_str.split('.')[1]);
                let answer_hex: string = binary_to_hex(sign_bit + getExponent(expoRep) + getMantissa(binary_str.split('.')[1]));

                (document.getElementById("binaryOutput") as HTMLElement).innerHTML = answer_bin;
                (document.getElementById("hexOutput") as HTMLElement).innerHTML = answer_hex;
            }
        } else {
            (document.getElementById("binaryOutput") as HTMLElement).innerHTML = '1';
        }
    }
}

function error_check(): boolean {
    let input: string = (document.getElementById("input") as HTMLInputElement).value;
    let base: string = (document.getElementById("base") as HTMLInputElement).value;
    let exponent: string = (document.getElementById("exponent") as HTMLInputElement).value;
    let sign_bit: string = getSign(input);
    let splitNum: string[] = input.toString().split('.');

    if(input === "" || exponent === ""){
        (document.getElementById("error_msg") as HTMLElement).innerHTML = "ERROR: Null input";
        clearOutputs();
        return false;
    }

    if(input === "qNaN")
    {
        (document.getElementById("binaryOutput") as HTMLElement).innerHTML = "0 11111111 010 0000 0000 0000 0000 0000";
        (document.getElementById("hexOutput") as HTMLElement).innerHTML = "7FA00000";
        return false;
    }

    if(input === "sNaN")
    {
        (document.getElementById("binaryOutput") as HTMLElement).innerHTML = "0 11111111 100 0000 0000 0000 0000 0000";
        (document.getElementById("hexOutput") as HTMLElement).innerHTML = "7FC00000";
        return false;
    }

    if (base === "default") {
        (document.getElementById("error_msg") as HTMLElement).innerHTML = "Error: No base selected";
        clearOutputs();
        return false;
    }

    if (sign_bit === "1"){
        splitNum[0] =  splitNum[0].substring(1); //removes the '-' sign
    }

    if (splitNum.length > 2) {
        (document.getElementById("error_msg") as HTMLElement).innerHTML = "ERROR: Not a valid input";
        clearOutputs();
        return false;
    }

    if (base === "2") {
        if (!/^[01]+$/.test(splitNum[0]) || (splitNum[1] != null && !/^[01]+$/.test(splitNum[1]))) {
            (document.getElementById("error_msg") as HTMLElement).innerHTML = "ERROR: Not a valid binary input";
            clearOutputs();
            return false;
        }
    }
    else if (base === "10") {
        if (!/^[0-9]+$/.test(splitNum[0]) || (splitNum[1] != null && !/^[0-9]+$/.test(splitNum[1]))) {
            (document.getElementById("error_msg") as HTMLElement).innerHTML = "ERROR: Not a valid decimal input";
            clearOutputs();
            return false;
        }
    }

    (document.getElementById("error") as HTMLElement).style.display = "none";
    (document.getElementById("error_msg") as HTMLElement).innerHTML = "";
    return true;
}

function checkSpecial(sign_bit: string, exponent: number, integer: string, dec: string, isBase2: number): boolean {
    let exp_denorm: number = isBase2 ? -126 : -38;
    let exp_infi: number = isBase2 ? 127 : 38;
    let binary: string;
    let significand: string;
    let temp: string;

    if(exponent < exp_denorm) {       // denormalized
        dec = dec.split(".")[1];
        while (exponent != exp_denorm) {
            if(integer === undefined || integer === ""){
                integer = "0";
            }
            temp = integer.slice(-1);
            exponent++;
            dec = temp + dec;
            integer = integer.slice(0, -1);
        }
        binary = (integer ? integer : "0") + "." + dec;

        significand = "00000000000000000000000";
        significand = dec + significand.slice(dec.length);

        let answer_bin: string = sign_bit + " 00000000 " + significand;
        let answer_hex: string = binary_to_hex(answer_bin.split(' ').join(''));

        (document.getElementById("binaryOutput") as HTMLElement).innerHTML = answer_bin;
        (document.getElementById("hexOutput") as HTMLElement).innerHTML = answer_hex;

        return true;
    }
    else if(exponent > exp_infi) {   // infinity
        let answer_bin: string = sign_bit + " 11111111 00000000000000000000000";
        let answer_hex: string = binary_to_hex(answer_bin.split(' ').join(''));

        (document.getElementById("binaryOutput") as HTMLElement).innerHTML = answer_bin;
        (document.getElementById("hexOutput") as HTMLElement).innerHTML = answer_hex;

        return true;
    }
    return false;
}

function saveToFile(): void {
    let input: string = (document.getElementById("input") as HTMLInputElement).value;
    let base: string = (document.getElementById("base") as HTMLInputElement).value;
    let exponent: string = (document.getElementById("exponent") as HTMLInputElement).value;

    let binOut: string = (document.getElementById("binaryOutput") as HTMLInputElement).value;
    let hexOut: string = (document.getElementById("hexOutput") as HTMLInputElement).value;

    if (hexOut !== "" && binOut !== "") {
        let data: string = "INPUT\nNumber: " + input + 
                "\nBase: " + base + 
                "\nExponent: " + exponent +
                "\n\nOUTPUT\nBinary Number: " + binOut + 
                "\nHexadecimal Number: " + hexOut + "\n";
        
        let blob: Blob = new Blob([data], {type: "text/plain"});

        // Use the createObjectURL and open methods to prompt a save dialog box in other browsers
        let url: string = window.URL.createObjectURL(blob);
        let a: HTMLAnchorElement = document.createElement("a");
        a.href = url;
        a.download = "IEEE754_Single-Precision_Floating-Point_Converter.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        (document.getElementById("error_msg") as HTMLElement).innerHTML = "";
        (document.getElementById("error") as HTMLElement).style.display = "none";
        clearFields();
    }
    else {
        (document.getElementById("error_msg") as HTMLElement).innerHTML = "ERROR: Can't save to file, output is empty. Please Convert first.";
        (document.getElementById("error") as HTMLElement).style.display = "block";
    }
}