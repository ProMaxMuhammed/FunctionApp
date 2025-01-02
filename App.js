import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { evaluate } from "mathjs";
import { Line, Text as SvgText, Circle, Svg } from "react-native-svg";
import { styles } from "./styles/App.styles";
import TransformationButtons from "./src/components/TransformationButtons";

const FunctionGraph = () => {
  const [equation, setEquation] = useState("x");
  const [data, setData] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [yIntercept, setYIntercept] = useState(null);
  const [transformations, setTransformations] = useState({
    translateX: 0,
    translateY: 0,
    scaleX: 0.5,
    scaleY: 0.5,
  });

  const inputRef = useRef(null); // Create a ref for the TextInput

  useEffect(() => {
    updateInputText();
  }, [transformations]);

  const updateInputText = () => {
    const { translateX, translateY, scaleX, scaleY } = transformations;
    let newEquation = equation;

    if (translateX !== 0) {
      newEquation = `(${newEquation}) ${translateX > 0 ? "-" : "+"} ${Math.abs(
        translateX
      )}`;
    }

    if (translateY !== 0) {
      newEquation = `(${newEquation}) ${translateY > 0 ? "+" : "-"} ${Math.abs(
        translateY
      )}`;
    }
    // Update the text input with new equation
    inputRef.current.setNativeProps({ text: newEquation });
  };

  // Check equation validity and generate data if valid
  useEffect(() => {
    // Generate data only if the equation is valid
    if (isValid) {
      generateData();
      findYIntercept();
    }
  }, [isValid, equation, transformations]); // Add isValid to dependency array

  const generateData = () => {
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
        setIsValid(false);
        return;
      }
    }
    setData(newData);
  };

  const findYIntercept = () => {
    try {
      const yInt = evaluate(equation.replace(/x/g, "(0)"));
      setYIntercept(yInt);
    } catch (error) {
      console.error("Error finding y-intercept:", error);
      setYIntercept(null);
    }
  };

  // handle input change and update equation validity
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
  const handleTransformation = (type, value) => {
    setTransformations((prev) => ({ ...prev, [type]: prev[type] + value }));
  };

  const resetTransformations = () => {
    setTransformations({
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
    });
  };

  const applyTransformations = (x, y) => {
    const { translateX, translateY, scaleX, scaleY } = transformations;
    return {
      x: scaleX * x + translateX,
      y: scaleY * y + translateY,
    };
  };

  const contentInset = { top: 30, bottom: 30, left: 20, right: 20 }; // Try increasing top and bottom

  const xAxisHeight = 25;
  const yAxisWidth = 25;
  const { translateX, translateY, scaleX, scaleY } = transformations;

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef} // Assign the ref to the TextInput
        style={styles.input}
        value={equation}
        onChangeText={handleInputChange}
        placeholder="Fonksiyon Yazın! 😊 (örn: x^2)"
      />
      <Button title="Göster" onPress={generateData} disabled={!isValid} />

      <TransformationButtons
        funcs={[handleTransformation, resetTransformations]}
      />

      <View
        style={{
          height: 300,
          flexDirection: "row",
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <View style={{ width: yAxisWidth, justifyContent: "flex-end" }}>
          <YAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: "black",
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}`}
            yAccessor={({ item }) => item.y}
            style={{
              height: 300 - xAxisHeight,
            }}
          />
          {/* Y-axis Label */}
          <View
            style={{
              position: "absolute",
              top: 140,
              left: 0,
              alignItems: "center",
            }}
          >
            <SvgText
              fill="black"
              stroke="black"
              fontSize="12"
              fontWeight="bold"
              x={-5}
              y={-10}
              textAnchor="middle"
              rotation="-90"
            >
              y
            </SvgText>
          </View>
        </View>
        <View style={{ flex: 1, marginBottom: xAxisHeight + 5 }}>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            svg={{ stroke: "blue", strokeWidth: 2 }}
            contentInset={contentInset}
            curve={shape.curveNatural}
            xAccessor={({ item }) => item.x}
            yAccessor={({ item }) => item.y}
          >
            <Svg>
              {/* Red Horizontal Line (X-axis) */}
              {React.Children.toArray([
                <Line
                  key={"x-axis-red"}
                  x1={0}
                  x2={"100%"}
                  y1={`${50 - translateY * 5}%`} // Update y1
                  y2={`${50 - translateY * 5}%`} // Update y2
                  stroke={"red"}
                  strokeWidth={2}
                />,
              ])}
              {/* Red Vertical Line (Y-axis) */}
              {React.Children.toArray([
                <Line
                  key={"y-axis-red"}
                  x1={`${50 - translateX * 5}%`} // Update x1
                  x2={`${50 - translateX * 5}%`} // Update x2
                  y1={0}
                  y2={"100%"}
                  stroke={"red"}
                  strokeWidth={2}
                />,
              ])}
            </Svg>
            {/* Vertical Line (Y-axis) */}
            {(x) => (
              <Line
                key={"y-axis"}
                x1={x(0)}
                x2={x(0)}
                y1={contentInset.top}
                y2={300 - contentInset.bottom - xAxisHeight}
                stroke={"black"}
                strokeWidth={1}
              />
            )}

            {/* Horizontal Line (X-axis) */}
            {(x, y) => (
              <Line
                key={"x-axis"}
                x1={contentInset.left}
                x2={300 - contentInset.right}
                y1={y(0)}
                y2={y(0)}
                stroke={"black"}
                strokeWidth={1}
              />
            )}
          </LineChart>
          <XAxis
            style={{
              height: xAxisHeight,
              marginTop: 5,
              marginBottom: 0,
            }}
            data={data}
            formatLabel={(value) => `${value}`}
            contentInset={{ left: 25, right: 25 }}
            svg={{ fontSize: 10, fill: "black" }}
            numberOfTicks={10}
            xAccessor={({ item }) => item.x}
          />
          {/* X-axis label */}
          <View
            style={{
              position: "absolute",
              bottom: 5,
              left: "50%",
              marginLeft: -6,
              alignItems: "center",
            }}
          >
            <SvgText
              fill="black"
              stroke="black"
              fontSize="12"
              fontWeight="bold"
              x={0}
              y={0}
              textAnchor="middle"
            >
              x
            </SvgText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FunctionGraph;
