import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  const [calc, setCalc] = useState({ num: "", res: 0, sign: "" });

  const resetClickHandler = () => {
    setCalc({ num: "", res: 0, sign: "" });
  };

  const invertClickHandler = () => {
    if (calc.num !== "") {
      setCalc({ ...calc, num: -calc.num });
    } else {
      setCalc({ ...calc, res: -calc.res });
    }
  };

  const percentClickHandler = () => {
    if (calc.num !== "") {
      setCalc({ ...calc, num: calc.num / 100 });
    } else {
      setCalc({ ...calc, res: calc.res / 100 });
    }
  };

  const equalsClickHandler = () => {
    if (calc.num !== "" && calc.sign !== "") {
      switch (calc.sign) {
        case "+":
          setCalc({ num: "", res: calc.res + Number(calc.num), sign: "" });
          break;
        case "-":
          setCalc({ num: "", res: calc.res - Number(calc.num), sign: "" });
          break;
        case "X":
          setCalc({ num: "", res: calc.res * Number(calc.num), sign: "" });
          break;
        case "/":
          setCalc({ num: "", res: calc.res / Number(calc.num), sign: "" });
          break;
        default:
          break;
      }
    }
  };

  const signClickHandler = (e) => {
    setCalc({ num: "", res: Number(calc.num), sign: e.target.innerHTML });
  };

  const commaClickHandler = () => {
    if (!calc.num.toString().includes(".")) {
      setCalc({ ...calc, num: calc.num + "." });
    }
  };

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (calc.num.length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : calc.num % 1 === 0
            ? Number(calc.num + value)
            : calc.num + value,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
