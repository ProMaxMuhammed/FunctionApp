import { useEffect, useRef } from "react";

const useDynamicInput = (transformations, equation) => {
  const inputRef = useRef(null);

  useEffect(() => {
    updateInputText();
  }, [transformations, equation]);

  const updateInputText = () => {
    const { translateX, translateY, scaleX, scaleY } = transformations;
    let newEquation = equation;

    if (translateX !== 0) {
      newEquation = `(${newEquation}) ${
        translateX > 0 ? "-" : "+"
      } ${Math.abs(translateX)}`;
    }

    if (translateY !== 0) {
      newEquation = `(${newEquation}) ${
        translateY > 0 ? "+" : "-"
      } ${Math.abs(translateY)}`;
    }
    // Update the text input with new equation
    inputRef.current.setNativeProps({ text: newEquation });
  };

  return { inputRef };
};

export default useDynamicInput;