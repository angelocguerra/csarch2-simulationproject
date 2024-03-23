import React, { useRef, useState } from 'react';
import './App.css';
import './Convert';
import {binary_to_hex, integer_to_binary, decimal_to_binary, normalize_decimal, normalize_binary, getSign, getMantissa, getExponent} from "./Convert";

function App() {
  // Inputs
  let NumberInput = useRef<HTMLInputElement>(null);
  let exponentInput = useRef<HTMLInputElement>(null);

  // Outputs
  let [binaryOutput, setBinaryOutput] = useState("");
  let [hexOutput, setHexOutput] = useState("");
  let [type, setType] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  let handleConvert = () => {
    let [inputNum, exponent] = getInputValues();
    let base = (document.getElementById("selectBase") as HTMLInputElement).value;
    setErrorMessage("");
    clearOutputs();
    convert(inputNum, base, exponent);
  };

  function getInputValues(): string[] {
    let inputNum = NumberInput.current?.value;
    let exponent = exponentInput.current?.value;
    return [(inputNum === undefined) ? "" : inputNum, (exponent === undefined) ? "" : exponent];
  }

  let handleClear = () => {
    // Clear input values
    (document.getElementById("inputNum") as HTMLFormElement).value="";
    (document.getElementById("selectBase") as HTMLFormElement).value="2";
    (document.getElementById("exponent") as HTMLFormElement).value="";
    //Clear output
    setBinaryOutput("");
    setHexOutput("");
    setType("");
    setErrorMessage("");
  };

  let handleDownload = (): void => {
    let [inputNum, exponent] = getInputValues();
    let base = (document.getElementById("selectBase") as HTMLInputElement).value;
    saveToFile(inputNum, base, exponent);
  }

  function clearOutputs(): void {
    setBinaryOutput("");
    setHexOutput("");
    setType("");
  }

  function styleToolTip(text: string, tip: string, space:boolean = true): JSX.Element {
    const style = space ? "inline-flex flex-wrap px-2 py-1 rounded-lg text-xs font-medium leading-4 bg-green-800 text-gray-100 ml-1" : "inline-flex flex-wrap px-2 py-1 rounded-lg text-xs font-medium leading-4 bg-green-800 text-gray-100";
    return <div className={style+" hover:bg-amber-700 ease-in-out transition-colors tooltip tooltip-amber-700"} data-tip={tip}>
      {text}
    </div>
  }

  function binaryFormatByParts(binaryOutput: string): JSX.Element {
    let binary = binaryOutput.split(" ");
    let signBit = styleToolTip(binary[0], "Sign Bit", false);
    let exponentBit = styleToolTip(binary[1], "Exponent Representation");
    let mantissaBit = styleToolTip(binary[2], "Mantissa Representation");
    return<div className="inline-flex flex-wrap">{signBit} {exponentBit} {mantissaBit}</div>
  }

   function convert(inputNum: string, base: string, exponent: string){
    // Get sign bit and split number
    let sign_bit: string = getSign(inputNum);
    let splitNum: string[] = inputNum.toString().split('.');

    // Error Validation
    if (error_check(inputNum, base, exponent, sign_bit, splitNum)) {

      //separates integer and decimal
      let integer: number = parseFloat(splitNum[0]);
      let dec: number = parseFloat("0." + splitNum[1]);

      if (/^[-+]?0*\.?0*$/.test(inputNum)) {
        setBinaryOutput('0 00000000 00000000000000000000000');
        setHexOutput('00000000');
        setType("Zero")
      } else if (base === "2") {
        dec = parseFloat("0." + splitNum[1]);

        let normalized: [string, number] = normalize_binary(integer.toString(), dec.toString(), parseInt(exponent));
        let binary: string[] = normalized[0].split(".");
        if(checkSpecial(sign_bit, normalized[1], binary[0], "0."+binary[1], 1) === false) {
          let binary: string = normalized[0];
          let exponent: number = 127 + normalized[1];
          let expoRep: string = integer_to_binary(exponent);

          let answer_bin: string = sign_bit + " " + getExponent(expoRep) + " " + getMantissa(binary.split('.')[1]);
          let answer_hex: string = binary_to_hex(sign_bit + getExponent(expoRep) + getMantissa(binary.split('.')[1]));

          setBinaryOutput(answer_bin);
          setHexOutput(answer_hex);
          setType("Finite");

        }
      } else if (base === "10") {
        inputNum = ((integer + dec) * Math.pow(10.0, parseInt(exponent))).toString();
        splitNum = inputNum.split('.');
        integer = parseFloat(splitNum[0]);
        dec = parseFloat("0." + splitNum[1]);

        let integer_str: string = integer_to_binary(integer);
        let dec_str: string = decimal_to_binary(dec);

        let normalized: [string, number] = normalize_decimal(integer_str, dec_str, parseInt(exponent));
        let binary: string[] = normalized[0].split(".");

        let binary_str: string = normalized[0].split('.')[1];

        if(checkSpecial(sign_bit, Number(exponent), binary[0], "0."+binary[1], 0) === false) {
          let exponent: number = 127 + normalized[1];
          let expoRep: string = integer_to_binary(exponent);

          let answer_bin: string = sign_bit + " " + getExponent(expoRep) + " " + getMantissa(binary_str);
          let answer_hex: string = binary_to_hex(sign_bit + getExponent(expoRep) + getMantissa(binary_str));

          setBinaryOutput(answer_bin);
          setHexOutput(answer_hex);
          setType("Finite")
        }
      }
    }
  }

  function error_check(inputNum: string, base: string, exponent: string, sign_bit: string, splitNum: string[]): boolean {
    if(inputNum === "" || exponent === "") {
      setErrorMessage("ERROR: Null input");
      clearOutputs();
      return false;
    }

    if(inputNum === "qNaN") {
      setBinaryOutput("0 11111111 01000000000000000000000");
      setHexOutput("7FA00000");
      setType("Quiet Nan")
      return false;
    }

    if(inputNum === "sNaN") {
      setBinaryOutput("0 11111111 10000000000000000000000");
      setHexOutput("7FC00000");
      setType("Signaling NaN")
      return false;
    }

    if (sign_bit === "1"){
      splitNum[0] = splitNum[0].substring(1); //removes the '-' sign
    }

    if (splitNum.length > 2) {
      setErrorMessage("ERROR: Not a valid input");
      clearOutputs();
      return false;
    }

    if (base === "2") {
      if (!/^[-+]?[01]+$/.test(splitNum[0]) || (splitNum[1] != null && !/^[01]+$/.test(splitNum[1]))) {
        setErrorMessage("ERROR: Not a valid binary input");
        clearOutputs();
        return false;
      }
    }
    else if (base === "10") {
      if (!/^[-+]?[0-9]+(\.?[0-9]*)$/.test(splitNum[0]) || (splitNum[1] != null && !/^[0-9]*$/.test(splitNum[1]))) {
        setErrorMessage("ERROR: Not a valid decimal input");
        clearOutputs();
        return false;
      }
    }

    return true;
  }

  function checkSpecial(sign_bit: string, exponent: number, integer: string, dec: string, isBase2: number): boolean {
    let exp_denorm: number = isBase2 ? -126 : -38;
    let exp_infi: number = isBase2 ? 127 : 38;
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

      let answer_bin: string = sign_bit + " 00000000 " + getMantissa(dec);
      let answer_hex: string = binary_to_hex(answer_bin.split(' ').join(''));

      setBinaryOutput(answer_bin);
      setHexOutput(answer_hex);
      setType("Denormalized")

      return true;
    }
    else if(exponent > exp_infi) {   // infinity
      let answer_bin: string = sign_bit + " 11111111 00000000000000000000000";
      let answer_hex: string = binary_to_hex(answer_bin.split(' ').join(''));

      setBinaryOutput(answer_bin);
      setHexOutput(answer_hex);
      (sign_bit === "0") ? setType("Positive Infinity") : setType("Negative Infinity")

      return true;
    }
    return false;
  }

  function saveToFile(inputNum: string, base: string, exponent: string): void {
    let binOut: string = binaryOutput;
    let hexOut: string = hexOutput;

    if (hexOut !== "" && binOut !== "") {
      let data: string = "INPUT\nNumber: " + inputNum +
          "\nBase: " + base +
          "\nExponent: " + exponent +
          "\n\nOUTPUT\nBinary Number: " + binOut +
          "\nHexadecimal Number: " + hexOut + "\n";

      let blob: Blob = new Blob([data], {type: "text/plain"});

      // Use the createObjectURL and open methods to prompt a save dialog box in other browsers
      let url: string = window.URL.createObjectURL(blob);
      let a: HTMLAnchorElement = document.createElement("a");
      a.href = url;
      a.download = "Binary32_Converter.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
    else {
      setErrorMessage("ERROR: Can't save to file, output is empty. Please Convert first.");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>IEEE-754 Binary-32 Floating-Point Converter</h1>
        <p className="description">
          Enter the 32-bit binary or decimal representation of a floating-point number to compute the binary and hexadecimal equivalents.
        </p>
      </header>

      <main className="inputArea">
        <div className="inputGroup">
          <div className="inputContainer">
            {/* Input Number */}
            <label className="inputLabel">
              Number
              <input ref={NumberInput} type="text" id="inputNum" name="inputNum" placeholder="Binary or Decimal or sNaN or qNaN"
                     className="input input-bordered mantissa-input" />
            </label>
            {/* Selection for Base */}
            <select id="selectBase" className="base-picker">
              <option selected value="2">×2 (Binary)</option>
              <option value="10">×10 (Decimal)</option>
            </select>
            {/* Selection for Exponent */}
            <label className="inputLabel">
              Exponent
              <input
                  ref={exponentInput}
                  type="number"
                  id="exponent"
                  name="exponent"
                  className="input input-bordered exponent-input"
                  placeholder="Exponent"
              />
            </label>
          </div>
          {/* Convert Button */}
          <div className="convert-div">
            <button onClick={handleConvert} className="btn convert-button">Convert</button>
          </div>
          {/* Clear Button */}
          <div className="clear-div">
            <button onClick={handleClear} className="btn clear-button">Clear</button>
          </div>
        </div>

        <div className="outputArea">
          {binaryOutput && <p className="output" id="binaryOutput">Binary: {binaryFormatByParts(binaryOutput)}</p>}
          {hexOutput && <p className="output" id="hexOutput">Hexadecimal: {hexOutput}</p>}
          {type && <p className="output" id="typeOutput">Type: {type}</p>}
          {/* Download Output Button */}
          {binaryOutput && hexOutput && <div className="convert-div">
            <button onClick={handleDownload} className="btn convert-button">Download Output.txt</button>
          </div>}
          {errorMessage && <div className="errorArea py-2 px-6 rounded-full text-black font-bold">
            <p className="error" id="error">{errorMessage}</p>
          </div>}
        </div>
      </main>
    </div>
  );
}

export default App;
