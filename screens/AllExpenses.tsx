import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectError, selectExpenses, selectStatus } from "../store/slices/expenses";

import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { fetchExpenses } from "../store/slices/api";

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

  // if (expensesStatus === "loading") {
  //   return <ExpensesOutput fallBackText="Loading expenses..." />;
  // }

  // if (expensesStatus === "failed") {
  //   return <ExpensesOutput fallBackText={`Error: ${error}`} />;
  // }

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallBackText="No registered expenses found"
    />
  );
}
