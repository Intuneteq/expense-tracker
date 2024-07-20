import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import IconButton from "./components/UI/IconButton";

import store  from "./store";
import { GlobalStyles } from "./constant/styles";
import { ExpensesTabParamList, RootStackParamList } from "./navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<ExpensesTabParamList>();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white", // The text color
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 }, // the tab container style
        tabBarActiveTintColor: GlobalStyles.colors.accent500, // Tab bar text color
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageExpense")}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name={"RecentExpenses"}
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ExpensesOverview"
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"ManageExpense"}
            component={ManageExpense}
            options={{
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </>
  );
}
