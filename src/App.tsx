import React, { useRef, useState } from 'react';
import './App.css';
// import { getHex } from "./"

function styleToolTip(text: string, tip: string, space:boolean = true) {
  const style = space ? "" : "";
  return <div className={style + " hover:bg-primary ease-in-out transition-colors tooltip tooltip-primary"}
              data-tip={tip}>
    {text}
  </div>
}
function textToolTip(text: string, tip: string) {
  return <span className="hover:bg-primary ease-in-out transition-all tooltip tooltip-primary" data-tip={tip}>
      {text}
  </span>
}

function binaryFormatByParts(output: string){
  const binary = output.split(" ");
  const sign = styleToolTip(binary[0], "Sign bit", false);
  const exponent = styleToolTip(binary[1], "Exponent");
  const fraction = styleToolTip(binary[2], "Fractional Part");
  return <div>{sign} {exponent} {fraction}</div>
}

// function hexFormatByParts(output: string) {
//   const [, fhh, shh, fhb, shb] = getHex(output, true);
//   const firstHalf = textToolTip(fhh, separateStr(fhb, ' ', 4));
//   const secondHalf = textToolTip(shh, separateStr(shb, ' ', 4));
// }

function App() {
  // Inputs
  const mantissa = useRef<HTMLInputElement>(null);
  const exponent = useRef<HTMLInputElement>(null);
  const [dataType, setDataType] = useState("Binary");

  // Outputs
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState('');

  const handleConvert = () => {
    // Insert conversion logic here
    setBinary('101010'); // placeholder
    setHex('1A2B3C');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>IEEE-754 Binary-32 Floating-Point Converter</h1>
        <p className="description">
          Enter the mantissa and exponent values to compute the binary and hexadecimal equivalents.
        </p>
      </header>

      <main className="inputArea">
        <div className="inputGroup">
          <div className="inputContainer">
            {/* Input Mantissa */}
            <label className="inputLabel">
              Mantissa
              <input ref={mantissa} type="text" id="mantissa" name="mantissa"
                     className="input input-bordered mantissa-input"/>
            </label>
            {/* Selection for Data Type/Base */}
            <select id="selectBase" className="base-picker">
              <option selected onClick={() => {setDataType("Binary")}} value="2">×2 (Binary)</option>
              <option onClick={() => {setDataType("Decimal")}} value="10">×10 (Decimal)</option>
            </select>
            {/* Selection for Exponent */}
            <label className="inputLabel">
              Exponent
              <input
                  ref={exponent}
                  type="number"
                  id="exponent"
                  name="exponent"
                  className="input input-bordered exponent-input"
              />
            </label>
          </div>
          {/* Convert Button */}
          <div className="convert-div">
            <button onClick={handleConvert} className="btn convert-button">Convert</button>
          </div>
        </div>

        <div className="outputArea">
          {binary && <p className="output">Binary: {binary}</p>}
          {hex && <p className="output">Hexadecimal: {hex}</p>}
        </div>
      </main>
      <footer className="footer">
        <p>Footer here place important stuff</p>
      </footer>
    </div>
  );
}

export default App;
