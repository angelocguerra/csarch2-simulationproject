import React, { useRef, useState } from 'react';
import './App.css';
// import { getHex } from "./"

function setBaseNumber() {

  let dataType = (document.getElementById("selectBase") as HTMLInputElement).value;
  let base = document.getElementById('baseNumber') as HTMLElement;
  base.innerHTML = dataType;
}

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
  const [mantissa, setMantissa] = useState('');
  const [exponent, setExponent] = useState('');
  const [decimal, setDecimal] = useState('');
  const [hex, setHex] = useState('');

  const handleMantissaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMantissa(event.target.value);
  };

  const handleExponentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExponent(event.target.value);
  };

  const handleConvert = () => {
    // Insert conversion logic here
    setDecimal('101010'); // placeholder
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
            <label className="inputLabel">
              Mantissa
              <input
                value={mantissa}
                onChange={handleMantissaChange}
                type="text"
                className="mantissa-input"
              />
            </label>
            <span className="base-two">×2</span>
            <label className="inputLabel">
              Exponent
              <input
                value={exponent}
                onChange={handleExponentChange}
                type="number"
                className="exponent-input"
              />
            </label>
          </div>
          <button onClick={handleConvert} className="convert-button">Convert</button>
        </div>

        <div className="outputArea">
          {decimal && <p className="output">Decimal: {decimal}</p>}
          {hex && <p className="output">Hexadecimal: {hex}</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
