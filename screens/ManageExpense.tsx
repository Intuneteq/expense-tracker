import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";

import { useAppDispatch } from "../store/hooks";
import { add, remove, update } from "../store/slices/expenses";

import { getFormattedDate } from "../util/date";
import { GlobalStyles } from "../constant/styles";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

function ManageExpense({ route, navigation }: Props) {
  const dispatch = useAppDispatch();

  const id = route.params?.expenseId;

  const isEditing = !!id;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  function deleteExpenseHandler() {
    if (isEditing) {
      dispatch(remove(id));
    }

    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      dispatch(
        update({
          id,
          description: "updated",
          amount: 19.99,
          date: getFormattedDate(new Date()),
        })
      );
    } else {
      dispatch(
        add({
          description: "Tested",
          amount: 19.99,
          date: getFormattedDate(new Date()),
        })
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
