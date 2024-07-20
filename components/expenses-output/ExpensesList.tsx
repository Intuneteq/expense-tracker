import React from "react";
import { FlatList, ListRenderItemInfo, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

type Props = {
  expenses: Expense[];
};

export default function ExpensesList({ expenses }: Props) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={extractItemKey}
    />
  );
}

function renderExpenseItem({ item }: ListRenderItemInfo<Expense>) {
  return <ExpenseItem expense={item} />;
}

function extractItemKey(expense: Expense) {
  return expense.id;
}
