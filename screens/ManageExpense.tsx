import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import IconButton from "../components/UI/IconButton";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectError,
  selectExpenses,
  selectStatus,
  setStatus,
} from "../store/slices/expenses/slice";

import { getFormattedDate } from "../util/date";
import { GlobalStyles } from "../constant/styles";
import { RootStackParamList } from "../navigation/types";
import ExpenseForm from "../components/manage-expense/ExpenseForm";
import {
  deleteExpense,
  storeExpense,
  updateExpense,
} from "../store/slices/expenses/api";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

function ManageExpense({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpenses);
  const expensesStatus = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const id = route.params?.expenseId;

  const isEditing = !!id;

  const selectedExpense = expenses.find((expense) => expense.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  async function deleteExpenseHandler() {
    if (isEditing) {
      await dispatch(deleteExpense(id));
    }

    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expense: Omit<Expense, "id">) {
    if (isEditing) {
      await dispatch(
        updateExpense({
          ...expense,
          id,
          date: getFormattedDate(new Date(expense.date)),
        })
      );
    } else {
      await dispatch(
        storeExpense({
          ...expense,
          date: getFormattedDate(new Date(expense.date)),
        })
      );
    }
    navigation.goBack();
  }

  function errorHandler() {
    dispatch(setStatus("idle"));
  }

  if (expensesStatus === "loading") {
    return <LoadingOverlay />;
  }

  if (expensesStatus === "failed") {
    return (
      <ErrorOverlay message={`Error: ${error}`} onConfirm={errorHandler} />
    );
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
