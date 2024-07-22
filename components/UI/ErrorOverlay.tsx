import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constant/styles";
import Button from "./Button";

type Props = {
   message: string;
   onConfirm: () => void;
};

function ErrorOverlay({message, onConfirm}: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occured!</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
   textAlign: 'center',
   margin: 8,
   color: "white"
  },
  title: {
   fontSize: 20,
   fontWeight: 'bold'
  },
  message: {
   fontSize: 14,
   color: GlobalStyles.colors.error500
  }
});
