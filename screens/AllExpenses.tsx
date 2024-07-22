import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectError,
  selectExpenses,
  selectStatus,
} from "../store/slices/expenses";

import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { fetchExpenses } from "../store/slices/api";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

type Props = {};

export default function AllExpenses({}: Props) {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpenses);
  const expensesStatus = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (expensesStatus === "idle") {
      dispatch(fetchExpenses());
    }
  }, [expensesStatus, dispatch]);

  async function errorHandler() {
    await dispatch(fetchExpenses());
  }

  if (expensesStatus === "loading") {
    return <LoadingOverlay />;
  }

  if (expensesStatus === "failed") {
    return (
      <ErrorOverlay
        message={`Error: ${error}`}
        onConfirm={errorHandler}
      />
    );
  }

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallBackText="No registered expenses found"
    />
  );
}
