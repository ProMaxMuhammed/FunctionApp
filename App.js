import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles/App.styles";
import TransformationButtons from "./src/components/TransformationButtons";
import Graph from "./src/components/Graph";
import useGraphData from "./src/hooks/useGraphData";
import useInputValidation from "./src/hooks/useInputValidation";
import useDynamicInput from "./src/hooks/useDynamicInput";
import useRoots from "./src/hooks/useRoots";
const FunctionGraph = () => {
  const [equation, setEquation] = useState("x");
  const [transformations, setTransformations] = useState({
    translateX: 0,
    translateY: 0,
    scaleX: 0.5,
    scaleY: 0.5,
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
  const { roots } = useRoots(equation, transformations, isInputValid);
  const handleTransformation = (type, value) => {
    setTransformations((prev) => ({ ...prev, [type]: prev[type] + value }));
  };
  const { inputRef } = useDynamicInput(transformations, equation);
  const resetTransformations = () => {
    setTransformations({
      translateX: 0,
      translateY: 0,
      scaleX: 0.5,
      scaleY: 0.5,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={equation}
        onChangeText={handleInputChange}
        placeholder="Fonksiyon Yazın! 😊 (örn: x^2)"
      />
      <TouchableOpacity
        style={{ ...styles.button, marginBottom: 5 }}
        onPress={() => {
          if (isInputValid) {
            regenerateData();
          }
        }}
        disabled={!isInputValid}
      >
        <Text>Göster</Text>
      </TouchableOpacity>

      <TransformationButtons
        funcs={[handleTransformation, resetTransformations]}
      />
      <Graph
        data={data}
        transformations={transformations}
        roots={roots} // Pass the roots to the Graph component
      />
    </View>
  );
};

export default FunctionGraph;
