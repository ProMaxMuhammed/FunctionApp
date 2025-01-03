import { useState } from "react";
import { evaluate } from "mathjs";

const useInputValidation = (setEquation, setTransformations) => {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (text) => {
    setEquation(text);
    setTransformations({
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
    });

    try {
      const isValid = evaluate(text.replace(/x/g, "(1)")) !== undefined;
      setIsValid(isValid);
    } catch {
      setIsValid(false);
    }
  };

  return { isValid, handleInputChange };
};

export default useInputValidation;