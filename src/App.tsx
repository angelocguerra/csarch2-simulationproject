import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  // Inputs
  const inputNum = useRef<HTMLInputElement>(null);
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

  const handleClear = () => {
    // Clear input values
    (document.getElementById("inputNum") as HTMLFormElement).value="";
    (document.getElementById("selectBase") as HTMLFormElement).value="2";
    (document.getElementById("exponent") as HTMLFormElement).value="";
    setBinary('');
    setHex('');
  };

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
              <input ref={inputNum} type="text" id="inputNum" name="inputNum" placeholder="Binary or Decimal or sNaN or qNaN"
                     className="input input-bordered mantissa-input" />
            </label>
            {/* Selection for Base */}
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
          {binary && <p className="output">Binary: {binary}</p>}
          {hex && <p className="output">Hexadecimal: {hex}</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
