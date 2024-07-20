import React from "react";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { DUMMY_EXPENSES } from "../constant/dummy-data";

type Props = {};

export default function RecentExpenses({}: Props) {
  return (
    <ExpensesOutput expensesPeriod='Last 7 Days' expenses={DUMMY_EXPENSES} />
  );
}
