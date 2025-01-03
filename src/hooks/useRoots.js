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
        let foundRoots = [];

        if (parsedEquation.includes("x^2")) {
          // Solve as a quadratic equation
          foundRoots = solveQuadraticEquation(parsedEquation);
        } else if (
          !parsedEquation.includes("sin") &&
          !parsedEquation.includes("cos")
        ) {
          // Try to solve as a linear equation
          const root = solveLinearEquation(parsedEquation);
          if (root !== null) {
            foundRoots.push(root);
          }
        } else {
          // Use Newton-Raphson method for other functions
          const initialGuesses = [-5, 0, 5];
          for (const guess of initialGuesses) {
            const root = newtonsMethod(parsedEquation, guess);
            if (root !== null) {
              foundRoots.push(root);
            }
          }
        }

        // Filter out duplicate and non-real roots, then sort
        const uniqueRealRoots = Array.from(
          new Set(
            foundRoots
              .filter((root) => typeof root === "number") // Ensure root is a number
              .map(JSON.stringify)
          )
        ).map(JSON.parse);
        uniqueRealRoots.sort((a, b) => a - b);

        setRoots(uniqueRealRoots.map((x) => ({ x })));
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
        let f, fPrime;
        try {
          f = evaluate(func, { x });
          fPrime = derivative(func, "x").evaluate({ x });
        } catch (error) {
          console.error("Error evaluating function or derivative:", error);
          return null;
        }

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

    const solveLinearEquation = (equation) => {
      const equationWithoutSpaces = equation.replace(/\s/g, "");

      let coefficient = 0;
      let constant = 0;

      const regex = /([+-]?\d*)x([+-]\d+)?/i;
      const match = equationWithoutSpaces.match(regex);

      if (match) {
        coefficient = match[1]
          ? match[1] === "-"
            ? -1
            : parseInt(match[1])
          : 1;
        constant = match[2] ? parseInt(match[2]) : 0;

        if (coefficient === 0) {
          return null;
        }

        return -constant / coefficient;
      }

      return null;
    };

    const solveQuadraticEquation = (equation) => {
      // Extract coefficients a, b, and c from equation in the form ax^2 + bx + c = 0
      let a = 0,
        b = 0,
        c = 0;

      const equationWithoutSpaces = equation.replace(/\s/g, "");
      const quadraticRegex = /([+-]?\d*)x\^2([+-]?\d*)x([+-]?\d*)/i;
      const linearRegex = /([+-]?\d*)x([+-]?\d*)/i;

      const quadMatch = equationWithoutSpaces.match(quadraticRegex);
      const linearMatch = equationWithoutSpaces.match(linearRegex);

      if (quadMatch) {
        a = quadMatch[1]
          ? quadMatch[1] === "-"
            ? -1
            : parseInt(quadMatch[1])
          : 1;
        b = quadMatch[2] ? parseInt(quadMatch[2]) : 0;
        c = quadMatch[3] ? parseInt(quadMatch[3]) : 0;
      } else if (linearMatch) {
        b = linearMatch[1]
          ? linearMatch[1] === "-"
            ? -1
            : parseInt(linearMatch[1])
          : 1;
        c = linearMatch[2] ? parseInt(linearMatch[2]) : 0;
      } else {
        // Assume it's a constant
        c = parseInt(equationWithoutSpaces) || 0;
      }

      const discriminant = b * b - 4 * a * c;

      if (discriminant < 0) {
        return []; // No real roots
      } else if (discriminant === 0) {
        return [-b / (2 * a)]; // One real root
      } else {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return [root1, root2]; // Two real roots
      }
    };

    findRoots();
  }, [equation, transformations, isInputValid]);

  return { roots };
};

export default useRoots;