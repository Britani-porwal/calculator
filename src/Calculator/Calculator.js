import "./Calculator.css";
import React, { useState } from "react";

const Calculator = () => {
  const [result, setResult] = useState("0");

  const OPERATORS = ["/", "*", "+", "-", "="];
  const NUMKEYS = [7, 8, 9, 4, 5, 6, 1, 2, 3, "00", "0", "."];
  const FUNCKEYS = ["AC", "+/-", "C"];

  const operatorHandler = (e) => {
    // console.log(e.target.name);
    const value = e.target.name;
    if (value === "=") {
      try {
        setResult(evaluate(result));
      } catch {
        alert("Expression Invalid");
      }
    } else if (OPERATORS.includes(value) && (result === "" || result === "0" || result === 0)) {
      alert("Operand Required!!");
      return;
      //operator should not be inserted into empty stack
    } else if (
      OPERATORS.includes(value) &&
      OPERATORS.includes(result.toString().slice(-1))
    ) {
      // toString() to prevent Error : result.string is not a function
      //current value is an operator & top of stack is also an operator
      setResult(result.slice(0, -1) + value);
      //overwrite the operator
    } else if (value !== "0" && (result === "0" || result === 0|| result === "-0")) {
      setResult(value);
      // overwriting number if initially 0
      //otherwise number would be appended to zero
    } else {
      setResult(result + value);
    }
    //concatenate operator OR numbers into the stack expression
  };

  const evaluate = (stack) => {
    console.log(stack);
    let temp = "";
    let resultArray = [];
    let operator = "+";
    for (let i = 0; i < stack.length; i++) {
      if (!isNaN(stack[i]) || stack[i] === ".") {
        temp += stack[i];
        //concatenating number
        //decimal must also be appended to the number
      }
      if ((isNaN(stack[i]) && stack[i] !== ".") || i === stack.length - 1) {
        if (operator === "+") {
          resultArray.push(Number(temp));
        } else if (operator === "-") {
          resultArray.push(Number(-temp));
        } else if (operator === "*") {
          resultArray.push(resultArray.pop() * temp);
          //adding result of multiplication
        } else {
          resultArray.push(resultArray.pop() / temp);
        }
        operator = stack[i];
        temp = "";
      }
    }
    let out = resultArray.reduce((a, b) => a + b);
    // console.log(out);
    return out;
  };

  const allClear = () => {
    setResult("0");
  };

  const backspace = () => {
    setResult(result.toString().slice(0, -1));
  };

  const flipSign = () => {
    if (!isNaN(result)) {
      setResult(-result);
    } else {
      alert(
        "Can't change sign of an expression !! \n Try with number instead.."
      );
    }
  };

  const functionality = (e) => {
    if (e.target.name === "AC") {
      allClear();
    } else if (e.target.name === "+/-") {
      flipSign();
    } else if (e.target.name === "C") {
      backspace();
    }
  };

  const createButton = (btnValues, onClickFunc) => {
    const btns = [];
    btnValues.forEach((key) => {
      btns.push(
        <button key={key} className={key} name={key} onClick={onClickFunc}>
          {key}
        </button>
      );
    });
    return btns;
  };

  return (
    <>
    
      <div className="wrapper">
        <h1 className="addResult">{result}</h1>
        {/* 0 is false
            but "0" is not false , its a string with value 0
            "0" == false  (gives true) */}
        <div className="keyPad">
          <div className="btnBox">
            <div className="functionality">
              {createButton(FUNCKEYS, functionality)}
            </div>
            <div className="numKeys">
              {createButton(NUMKEYS, operatorHandler)}
            </div>
          </div>
          <div className="operators">
            {createButton(OPERATORS, operatorHandler)}
          </div>
        </div>
      </div>
    </>
  );
};
export default Calculator;