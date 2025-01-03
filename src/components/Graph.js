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
  );
};

export default Graph;