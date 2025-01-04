import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../styles/App.styles";

const TransformationButtons = (props) => {
  const [handleTransformation, resetTransformations] = props.funcs;
  function TransformationButton({task}) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={task.onpress}
      >
        <Text style={styles.buttonText}>{task.text}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <>
      <View style={styles.transformationButtons}>
        <View style={styles.buttonRow}>
          <TransformationButton task={{onpress:() => handleTransformation("scaleX", 0.1),text:"X eksenini Küçült"}}/>
          <TransformationButton task={{onpress:() => handleTransformation("scaleX", -0.1),text:"X eksenini Büyüt"}}/>
        </View>
        <View style={styles.buttonRow}>
        <TransformationButton task={{onpress:() => handleTransformation("scaleY", 0.1),text:"Y eksenini Küçült"}}/>
        <TransformationButton task={{onpress:() => handleTransformation("scaleY", -0.1),text:"Y eksenini Büyüt"}}/>
        <TransformationButton task={{resetTransformations,text:"Hepsini Sıfırla"}}/>
        </View>
      </View>
    </>
  );
};

export default TransformationButtons;
