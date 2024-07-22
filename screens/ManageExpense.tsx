import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { add, remove, selectExpenses, update } from "../store/slices/expenses";

import { getFormattedDate } from "../util/date";
import { GlobalStyles } from "../constant/styles";
import { RootStackParamList } from "../navigation/types";
import ExpenseForm from "../components/manage-expense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../store/slices/api";

type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

function ManageExpense({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpenses);

  const id = route.params?.expenseId;

  const isEditing = !!id;

  const selectedExpense = expenses.find(expense => expense.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  function deleteExpenseHandler() {
    if (isEditing) {
      dispatch(deleteExpense(id));
    }

    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expense: Omit<Expense, "id">) {
    if (isEditing) {
      dispatch(
        updateExpense({
          ...expense,
          id,
          date: getFormattedDate(new Date(expense.date)),
        })
      );
    } else {
      dispatch(
        storeExpense({
          ...expense,
          date: getFormattedDate(new Date(expense.date)),
        })
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitBtnLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
