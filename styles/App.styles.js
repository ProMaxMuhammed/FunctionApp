import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%",
  },
  transformationButtons: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "center",
    flexWrap: "wrap",
    rowGap: 5,
  },
  button: {
    backgroundColor: "lightblue",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
