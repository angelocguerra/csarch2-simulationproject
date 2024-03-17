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
  const mantissaInput = useRef<HTMLInputElement>(null);
  const exponentInput = useRef<HTMLInputElement>(null);

  const [dataType, setDataType] = useState("Binary");
  
  const [binary, setBinary] = useState("");
  const [hex, setHex] = useState("");

  return (
    <div className="App">
      <section>
        <div className="container">
          <div className="header">
            <h1>IEEE-754 Binary-32 Floating-Point Converter</h1>

            <p>
              (Edit me)
            </p>
          </div>

          <div className="inputArea">
            <div className="inputNumber flex">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Mantissa</span>
                </div>
                <input ref={mantissaInput} placeholder="1.0" type="number" id="mantissa" name="mantissa" className="input input-bordered"/>
              </label>

              {/* Selection for Data Type */}
              <select className="select select-bordered" id="selectBase" onChange={setBaseNumber}>
                <option selected onClick={() => {
                  setDataType("Binary")
                }} value="x2">Binary / base-2
                </option>
                <option onClick={() => {
                  setDataType("Decimal")
                }} value="x10">Decimal / base-10
                </option>
              </select>

              <p id="baseNumber">x2</p>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Exponent</span>
                </div>
                <input ref={exponentInput} placeholder="0" type="number" id="exponent" name="exponent" className="input input-bordered"/>
              </label>
            </div>

            <div className="convertArea">
              {/* Convert Button */}
              <button className="btn">Convert</button>
            </div>
          </div>

          <div className="">
            {/* If binary number is not null, then perform function and display output */}
            <p className=""> {binary != "" ? <>Binary: {binaryFormatByParts(binary)}</> : <></>} </p>
            {/* If hex number is not null, then perform function and display output */}
            <p className=""> {hex != "" ? <>Hexadecimal: </> : <></>} </p>

            {binary !== "" && hex != "" && (
                <button className="btn">Download Output.txt</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;