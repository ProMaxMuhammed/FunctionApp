import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { evaluate } from "mathjs";
import { Line, Text as SvgText } from "react-native-svg";
import { styles } from "./styles/App.styles";

const FunctionGraph = () => {
  // Define states
  const [equation, setEquation] = useState("x"); // equation for the graph
  const [data, setData] = useState([]); // data based on the graph
  const [isValid, setIsValid] = useState(true); // Track equation validity

  // Check equation validity and generate data if valid
  useEffect(() => {
    // Generate data only if the equation is valid
    if (isValid) {
      generateData();
    }
  }, [isValid, equation]); // Add isValid to dependency array

  // handle input change and update equation validity
  const handleInputChange = (text) => {
    setEquation(text);

    // Basic validation - you can make this more comprehensive
    try {
      const isValid = evaluate(text.replace(/x/g, "(1)")) !== undefined;
      setIsValid(isValid);
    } catch {
      setIsValid(false);
    }
  };

  // Generate data array for the graph
  const generateData = () => {
    const newData = [];
    for (let x = -10; x <= 10; x += 0.5) {
      try {
        const y = evaluate(equation.replace(/x/g, `(${x})`));
        newData.push({ x, y });
      } catch (error) {
        setIsValid(false); // Set isValid to false if there is an error
        return;
      }
    }
    setData(newData);
  };

  const contentInset = { top: 20, bottom: 20, left: 20, right: 20 };
  const xAxisHeight = 25;
  const yAxisWidth = 25;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={equation}
        onChangeText={handleInputChange}
        placeholder="Enter function (e.g., x^2)"
      />
      <Button title="Plot" onPress={generateData} disabled={!isValid} />
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
