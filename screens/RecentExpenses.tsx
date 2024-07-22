import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectError,
  selectExpenses,
  selectStatus,
} from "../store/slices/expenses";

import { getDateMinusDays } from "../util/date";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { fetchExpenses } from "../store/slices/api";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

type Props = {};

export default function RecentExpenses({}: Props) {
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

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    const expenseDate = new Date(expense.date);

    return expenseDate > date7DaysAgo && expenseDate <= today;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallBackText="No expenses registered for the last 7 days"
    />
  );
}
