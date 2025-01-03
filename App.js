import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { styles } from "./styles/App.styles";
import TransformationButtons from "./src/components/TransformationButtons";
import Graph from "./src/components/Graph";
import useGraphData from "./src/hooks/useGraphData";
import useInputValidation from "./src/hooks/useInputValidation";
import useDynamicInput from "./src/hooks/useDynamicInput";

const FunctionGraph = () => {
  const [equation, setEquation] = useState("x");
  const [transformations, setTransformations] = useState({
    translateX: 0,
    translateY: 0,
    scaleX: 1,
    scaleY: 1,
  });

  const { isValid: isInputValid, handleInputChange } = useInputValidation(
    setEquation,
    setTransformations
  );
  const { data, regenerateData } = useGraphData(
    equation,
    transformations,
    isInputValid
  );
  const handleTransformation = (type, value) => {
    setTransformations((prev) => ({ ...prev, [type]: prev[type] + value }));
  };
  const { inputRef } = useDynamicInput(transformations, equation);
  const resetTransformations = () => {
    setTransformations({
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
    });
  };

  const contentInset = { top: 30, bottom: 30, left: 20, right: 20 };

  const xAxisHeight = 25;
  const yAxisWidth = 25;

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={equation}
        onChangeText={handleInputChange}
        placeholder="Fonksiyon Yazın! 😊 (örn: x^2)"
      />
      <Button
        title="Göster"
        onPress={() => {
          if (isInputValid) {
            regenerateData();
          }
        }}
        disabled={!isInputValid}
      />

      <TransformationButtons
        funcs={[handleTransformation, resetTransformations]}
      />
      <Graph
        data={data}
        transformations={transformations}
        contentInset={contentInset}
        xAxisHeight={xAxisHeight}
        yAxisWidth={yAxisWidth}
      />
    </View>
  );
};

export default FunctionGraph;
