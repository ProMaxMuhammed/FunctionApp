// useRoots.js
import { useState, useEffect } from "react";
import { evaluate, derivative } from "mathjs";

const useRoots = (equation, transformations, isInputValid) => {
  const [roots, setRoots] = useState([]);

  useEffect(() => {
    const findRoots = () => {
      if (!isInputValid) {
        setRoots([]);
        return;
      }

      try {
        const parsedEquation = equation.replace(/\^/g, "**");

        // Try to find roots using Newton-Raphson method
        const root = newtonsMethod(parsedEquation, 1); // Start with an initial guess of 1

        if (root !== null) {
          setRoots([{ x: root }]);
        } else {
          setRoots([]); // No real roots found
        }
      } catch (error) {
        console.error("Error finding roots:", error);
        setRoots([]); // Clear roots on error
      }
    };

    const newtonsMethod = (func, initialGuess) => {
      const maxIterations = 100;
      const tolerance = 0.001;
      let x = initialGuess;

      for (let i = 0; i < maxIterations; i++) {
        const f = evaluate(func, { x });
        const fPrime = derivative(func, "x").evaluate({ x });

        if (Math.abs(fPrime) < tolerance) {
          return null;
        }

        const newX = x - f / fPrime;

        if (Math.abs(newX - x) < tolerance) {
          return newX;
        }

        x = newX;
      }

      return null;
    };

    findRoots();
  }, [equation, transformations, isInputValid]);

  return { roots };
};

export default useRoots;