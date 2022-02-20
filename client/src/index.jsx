import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Homepage from "./pages/homepage/Homepage";
import WelcomeMsg from "./pages/homepage/components/WelcomeMsg";
import { UserProvider } from "./context/userContext";
import ProtectedPage from "./components/ProtectedPage";
import NotFoundPage from "./pages/NotFoundPage";
import ExpensesOverview from "./pages/expenses_overview/ExpensesOverview";
import ShowAllExpenses from "./pages/show_all_expenses/ShowAllExpenses";
import ShowAllIncome from "./pages/show_all_income/ShowAllIncome";
import ShowAllDebts from "./pages/debts/ShowAllDebts";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/" element={<WelcomeMsg />} />
        </Route>
        <Route exact path="/start" element={<ProtectedPage />}>
          <Route path="/start" element={<App />}>
            <Route path="/start/overview" element={<ExpensesOverview />} />
            <Route
              path="/start/show_all_expenses"
              element={<ShowAllExpenses />}
            />
            <Route path="/start/show_all_income" element={<ShowAllIncome />} />
            <Route path="/start/debts" element={<ShowAllDebts />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
