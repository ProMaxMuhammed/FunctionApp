import React from "react";
import { Text, View } from "react-native";
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Line, Svg, Circle } from "react-native-svg";
const Graph = ({ data, transformations, roots }) => {
  const { translateX, translateY } = transformations;
  const contentInset = { top: 30, bottom: 30, left: 20, right: 20 };
  function AxisY() {
    return (
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
        style={{ height: 300 - 25 }}
      />
    );
  }
  function AxisX() {
    return (
      <XAxis
        style={{
          height: 25,
        }}
        data={data}
        formatLabel={(value) => `${value}`}
        contentInset={{ left: 25, right: contentInset.right }}
        svg={{ fontSize: 10, fill: "black" }}
        numberOfTicks={10}
        xAccessor={({ item }) => item.x}
      />
    );
  }
  function RedAxisX() {
    return (
      <Line
        key={"x-axis-red"}
        x1={0}
        x2={"100%"}
        y1={`${50 - translateY * 5}%`}
        y2={`${50 - translateY * 5}%`}
        stroke={"red"}
        strokeWidth={2}
      />
    );
  }
  function RedAxisY() {
    return (
      <Line
        key={"y-axis-red"}
        x1={`${50 - translateX * 5}%`}
        x2={`${50 - translateX * 5}%`}
        y1={0}
        y2={"100%"}
        stroke={"red"}
        strokeWidth={2}
      />
    );
  }
  function RootsCircle() {
    return roots.map((root) => {
      const xValue = root.x;
      const yValue = 0; // Root is on the x-axis

      // Calculate position of root
      const rootX = ((xValue - -10) / (10 - -10)) * 100 + translateX * 5;
      const rootY = 50 - translateY * 5;

      return (
        <Circle
          key={`root-${root.x}`}
          cx={`${rootX}%`}
          cy={`${rootY}%`}
          r={4}
          fill="green"
          stroke="black"
          strokeWidth={1}
        />
      );
    });
  }
  function Chart() {
    return (
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
          <RedAxisX />
          <RedAxisY />
          {roots && <RootsCircle />}
        </Svg>
      </LineChart>
    );
  }

  return (
    <View style={{ height: 300, width: 300, paddingHorizontal: 5 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 275,
        }}
      >
        <View style={{ width: 25, justifyContent: "center" }}>
          <AxisY />
        </View>
        <View style={{ flex: 1 }}>
          <Chart />
        </View>
      </View>
      <AxisX />
    </View>
  );
};

export default Graph;
