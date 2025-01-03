import React from "react";
import { View } from "react-native";
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Line, Text as SvgText, Svg } from "react-native-svg";

const Graph = ({
  data,
  transformations,
  contentInset,
  xAxisHeight,
  yAxisWidth,
}) => {
  const { translateX, translateY } = transformations;

  return (
    <View style={{ height: 300, paddingLeft: 5, paddingRight: 5, width:300}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 300 - xAxisHeight,
          marginBottom: xAxisHeight,
        }}
      >
        <View style={{ width: yAxisWidth, justifyContent: "center" }}>
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
            style={{ height: 300 - xAxisHeight }}
          />
        </View>
        <View style={{ flex: 1 }}>
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
              {
                <Line
                  key={"x-axis-red"}
                  x1={0}
                  x2={"100%"}
                  y1={`${50 - translateY * 5}%`}
                  y2={`${50 - translateY * 5}%`}
                  stroke={"red"}
                  strokeWidth={2}
                />
              }
              {/* Red Vertical Line (Y-axis) */}
              {
                <Line
                  key={"y-axis-red"}
                  x1={`${50 - translateX * 5}%`}
                  x2={`${50 - translateX * 5}%`}
                  y1={0}
                  y2={"100%"}
                  stroke={"red"}
                  strokeWidth={2}
                />
              }
            </Svg>
          </LineChart>
        </View>
      </View>
      <XAxis
        style={{
          height: xAxisHeight,
        }}
        data={data}
        formatLabel={(value) => `${value}`}
        contentInset={{ left: yAxisWidth, right: contentInset.right }}
        svg={{ fontSize: 10, fill: "black" }}
        numberOfTicks={10}
        xAccessor={({ item }) => item.x}
      />
    </View>
  );
};

export default Graph;