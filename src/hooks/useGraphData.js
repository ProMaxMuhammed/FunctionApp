// useGraphData.js
import { useState, useEffect, useCallback } from "react";
import { evaluate } from "mathjs";

const useGraphData = (equation, transformations, isInputValid) => {
  const [data, setData] = useState([]);

  const applyTransformations = useCallback(
    (x, y) => {
      const { translateX, translateY, scaleX, scaleY } = transformations;
      return {
        x: scaleX * x + translateX,
        y: scaleY * y + translateY,
      };
    },
    [transformations]
  );

  const generateData = useCallback(() => {
    const newData = [];
    for (let x = -10; x <= 10; x += 0.5) {
      try {
        let { x: newX, y: newY } = applyTransformations(
          x,
          evaluate(equation.replace(/x/g, `(${x})`))
        );
        newData.push({ x: newX, y: newY });
      } catch (error) {
        console.error("Error evaluating equation:", error);
        return; // Don't set data on error
      }
    }
    setData(newData);
  }, [equation, applyTransformations]);

  useEffect(() => {
    if (isInputValid) {
      generateData();
    }
  }, [isInputValid, generateData]);

  // Regenerate data function
  const regenerateData = useCallback(() => {
    generateData();
  }, [generateData]);

  return { data, regenerateData }; // Make sure you are returning it here
};

export default useGraphData;