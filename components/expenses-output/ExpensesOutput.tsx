import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

import { GlobalStyles } from "../../constant/styles";

type Props = {
  expensesPeriod: string;
  fallBackText: string;
  expenses: Expense[];
};

function ExpensesOutput({ expensesPeriod, expenses, fallBackText }: Props) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses.length) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    margin: 32,
  },
});
