import { useState } from "react";
import { evaluate } from "mathjs";

const useInputValidation = (setEquation, setTransformations) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // Add error message state

  const handleInputChange = (text) => {
    setEquation(text);
    setTransformations({
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
    });

    try {
      // Basic validation: Check for empty input
      if (text.trim() === "") {
        setIsValid(false);
        return;
      }

      // Try to evaluate using mathjs
      evaluate(text.replace(/x/g, "(1)"));

      // If evaluation is successful, the input is valid
      setIsValid(true);
      setErrorMessage(null); // Clear error message
    } catch (error) {
      // If evaluation fails, the input is invalid
      setIsValid(false);
      setErrorMessage("Geçersiz denklem"); // Generic error message
      // You could make more specific error messages based on error.message
    }
  };

  return { isValid, handleInputChange, errorMessage
   };
};

export default useInputValidation;