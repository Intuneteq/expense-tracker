import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constant/styles";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  expense: Expense;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ExpenseItem({ expense }: Props) {
  const navigation = useNavigation<NavigationProp>();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: expense.id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {expense.description}
          </Text>
          <Text style={styles.textBase}>{expense.date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{expense.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
