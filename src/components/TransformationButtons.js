import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../styles/App.styles";

const TransformationButtons = props => {
    const [handleTransformation, resetTransformations] = props.funcs
  return (
    <>
      <View style={styles.transformationButtons}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTransformation("translateX", -1)}
          >
            <Text style={styles.buttonText}>Sola kaydır</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTransformation("translateX", 1)}
          >
            <Text style={styles.buttonText}>Sağa kaydır</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTransformation("translateY", 1)}
          >
            <Text style={styles.buttonText}>Yukarı kaydır</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTransformation("translateY", -1)}
          >
            <Text style={styles.buttonText}>Aşağı kaydır</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTransformation("scaleX", 0.1)}
          >
            <Text style={styles.buttonText}>X eksenini küçült</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTransformation("scaleX", -0.1)}
          >
            <Text style={styles.buttonText}>X eksenini büyüt</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTransformation("scaleY", 0.1)}
          >
            <Text style={styles.buttonText}>Y eksenini küçült</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTransformation("scaleY", -0.1)}
          >
            <Text style={styles.buttonText}>Y eksenini büyüt</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={resetTransformations}>
          <Text style={styles.buttonText}>Kaydırmaları sıfırla</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TransformationButtons;
