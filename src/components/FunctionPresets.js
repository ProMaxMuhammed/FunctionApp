import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const FunctionPresets = ({ setEquation }) => {
  const [selectedPreset, setSelectedPreset] = useState(null); // Start with null value

  const presets = [
    { label: "x", equation: "x" },
    { label: "x^2", equation: "x^2" },
    { label: "2x + 1", equation: "2x + 1" },
    { label: "sin(x)", equation: "sin(x)" },
    { label: "cos(x)", equation: "cos(x)" },
    // Add more presets as needed
  ];

  const onValueChange = (value) => {
    if (value !== null) {
      setSelectedPreset(value);
      setEquation(value);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={selectedPreset}
        onValueChange={onValueChange}
      >
        <Picker.Item
          key="placeholder"
          label="Hazır fonksiyon seçiniz"
          value={null} // Placeholder value
        />
        {presets.map((preset) => (
          <Picker.Item
            key={preset.equation}
            label={preset.label}
            value={preset.equation}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
  },
  picker: {
    width: 260,
  },
});

export default FunctionPresets;