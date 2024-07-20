import React from "react";
import { useAppSelector } from "../store/hooks";
import { selectExpenses } from "../store/slices/expenses";

import ExpensesOutput from "../components/expenses-output/ExpensesOutput";

type Props = {};

export default function AllExpenses({}: Props) {
  const expenses = useAppSelector(selectExpenses);
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallBackText="No registered expenses found"
    />
  );
}
