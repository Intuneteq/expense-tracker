import type { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  ManageExpense: { expenseId?: string };
  ExpensesOverview: NavigatorScreenParams<ExpensesTabParamList>;
};

export type ExpensesTabParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};
