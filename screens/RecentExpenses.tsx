import React from "react";

import { useAppSelector } from "../store/hooks";
import { selectExpenses } from "../store/slices/expenses";

import { getDateMinusDays } from "../util/date";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";

type Props = {};

export default function RecentExpenses({}: Props) {
  const expenses = useAppSelector(selectExpenses);

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
