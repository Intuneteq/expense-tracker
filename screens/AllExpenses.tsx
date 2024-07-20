import React from 'react'
import ExpensesOutput from '../components/expenses-output/ExpensesOutput'
import { DUMMY_EXPENSES } from '../constant/dummy-data'

type Props = {}

export default function AllExpenses({}: Props) {
  return (
    <ExpensesOutput expensesPeriod='Total' expenses={DUMMY_EXPENSES} />
  )
}