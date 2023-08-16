import "./App.css";
import { useState } from "react";

import Button from "./components/button/Button";

let firstNumber = null;
let secondNumber = null;
let operation = null;

function App() {
  const [screenValueBottom, setScreenValueBottom] = useState("0");
  const [screenValueTop, setScreenValueTop] = useState("");

  const typeNumber = (value) => {
    if (operation != null || screenValueTop == "")
      setScreenValueBottom((prevScreenValueBottom) =>
        prevScreenValueBottom == "0" ? value : prevScreenValueBottom + value
      );
    else {
      clearData();
      setScreenValueBottom((prevScreenValueBottom) =>
        prevScreenValueBottom == "0" ? value : prevScreenValueBottom + value
      );
    }
  };

  const computeExpression = () => {
    switch (operation) {
      case "+": {
        return parseFloat(firstNumber) + parseFloat(secondNumber);
      }
      case "-": {
        return parseFloat(firstNumber) - parseFloat(secondNumber);
      }
      case "x": {
        return parseFloat(firstNumber) * parseFloat(secondNumber);
      }
      case "÷": {
        return parseFloat(firstNumber) / parseFloat(secondNumber);
      }
      default:
        break;
    }
  };

  const clearData = () => {
    setScreenValueTop("");
    setScreenValueBottom("0");
    firstNumber = null;
    secondNumber = null;
    operation = null;
  };

  const negation = () => {
    if (screenValueBottom != "0" && screenValueBottom != "")
      setScreenValueBottom((prevScreenValueBottom) =>
        prevScreenValueBottom.charAt(0) == "-"
          ? prevScreenValueBottom.substring(1, prevScreenValueBottom.length)
          : `-${prevScreenValueBottom}`
      );
  };

  const handleDotClick = () => {
    if (!screenValueBottom.includes(".")) {
      setScreenValueBottom(
        (prevScreenValueBottom) => `${prevScreenValueBottom}.`
      );
    }
  };

  const divideOneBy = () => {
    if (screenValueTop == "" && screenValueBottom != "") {
      if (screenValueBottom != "0") {
        firstNumber = 1 / parseFloat(screenValueBottom)
        setScreenValueTop(firstNumber);
        setScreenValueBottom("");
      }
    }

    if (screenValueTop != "" && screenValueBottom == "") {
      if (screenValueTop != "0") {
        firstNumber = 1 / parseFloat(screenValueTop)
        setScreenValueTop(firstNumber);
      }
    }
  };

  const squaring = () => {
    if (screenValueTop == "" && screenValueBottom != "") {
      firstNumber = screenValueBottom * screenValueBottom
      setScreenValueTop(firstNumber);
      setScreenValueBottom("");
    }
    if (screenValueTop != "" && screenValueBottom == "") {
      firstNumber = screenValueTop * screenValueTop
      setScreenValueTop(firstNumber)
    }
  };

  const handleOperatorClick = (operator) => {
    switch (operator) {
      case "+":
      case "-":
      case "x":
      case "÷":
        if (screenValueTop == "") {
          firstNumber = screenValueBottom;
          operation = operator;
          setScreenValueTop(`${screenValueBottom} ${operator}`);
          setScreenValueBottom("");
          // console.log(firstNumber);
        } else if (screenValueBottom != "") {
          secondNumber = screenValueBottom;
          // console.log(secondNumber);
          const answer = computeExpression();
          // console.log(answer);
          setScreenValueTop(`${answer} ${operator}`);
          setScreenValueBottom("");
          firstNumber = answer;
          secondNumber = null;
          operation = operator;
        } else {
          // console.log(firstNumber)
          setScreenValueTop(`${firstNumber} ${operator}`);
          operation = operator;
        }
        break;
      case "=": {
        secondNumber = screenValueBottom;
        // console.log(secondNumber);
        const answer = computeExpression();
        // console.log(answer);
        setScreenValueTop(answer);
        setScreenValueBottom("");
        firstNumber = answer;
        secondNumber = null;
        operation = null;
      }

      default:
        break;
    }
  };

  return (
    <div className="App">
      <div className="Screen">
        <span>{screenValueTop}</span>
      </div>
      <div className="Screen">
        <span>{screenValueBottom}</span>
      </div>
      <div className="Keyboard">
        <Button
          onClick={() => squaring()}
          className="Button Button--operator"
          value={"x²"}
        />
        <Button
          onClick={() => divideOneBy()}
          className="Button Button--operator"
          value={"1/x"}
        />
        <Button
          onClick={() => clearData()}
          className="Button Button--operator"
          value={"C"}
        />
        <Button
          onClick={() => handleOperatorClick("÷")}
          className="Button Button--operator"
          value={"÷"}
        />
        <Button
          onClick={() => typeNumber("9")}
          className="Button Button--number"
          value={9}
        />
        <Button
          onClick={() => typeNumber("8")}
          className="Button Button--number"
          value={8}
        />
        <Button
          onClick={() => typeNumber("7")}
          className="Button Button--number"
          value={7}
        />
        <Button
          onClick={() => handleOperatorClick("x")}
          className="Button Button--operator"
          value={"x"}
        />
        <Button
          onClick={() => typeNumber("6")}
          className="Button Button--number"
          value={6}
        />
        <Button
          onClick={() => typeNumber("5")}
          className="Button Button--number"
          value={5}
        />
        <Button
          onClick={() => typeNumber("4")}
          className="Button Button--number"
          value={4}
        />
        <Button
          onClick={() => handleOperatorClick("-")}
          className="Button Button--operator"
          value={"-"}
        />
        <Button
          onClick={() => typeNumber("3")}
          className="Button Button--number"
          value={3}
        />
        <Button
          onClick={() => typeNumber("2")}
          className="Button Button--number"
          value={2}
        />
        <Button
          onClick={() => typeNumber("1")}
          className="Button Button--number"
          value={1}
        />
        <Button
          onClick={() => handleOperatorClick("+")}
          className="Button Button--operator"
          value={"+"}
        />
        <Button
          onClick={() => negation()}
          className="Button Button--number"
          value={"±"}
        />
        <Button
          onClick={() => typeNumber("0")}
          className="Button Button--number"
          value={0}
        />
        <Button
          onClick={() => {
            handleDotClick();
          }}
          className="Button Button--number"
          value={"."}
        />
        <Button
          onClick={() => handleOperatorClick("=")}
          className="Button Button--operator"
          value={"="}
        />
      </div>
    </div>
  );
}

export default App;
