import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { GlobalStyles } from "../../constant/styles";
// https://expense-tracker-ab47e-default-rtdb.europe-west1.firebasedatabase.app/
type Props = {
  label: string;
  error: boolean;
  style?: StyleProp<TextStyle>;
  textInputConfig?: TextInputProps;
};

export default function Input({ label, style, textInputConfig, error }: Props) {
  const inputStyles: StyleProp<TextStyle> = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (error) {
    inputStyles.push(styles.errorInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, error && styles.errorLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    color: GlobalStyles.colors.primary700,
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorLabel: {
    color: GlobalStyles.colors.error500,
  },
  errorInput: {
    color: GlobalStyles.colors.error50,
  },
});
