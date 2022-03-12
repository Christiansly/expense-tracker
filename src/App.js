import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import React, { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
function App() {
  const addEnteredExpenses = (data) => {
    setExpenses([...expenses, data]);
    console.log("data", data);
  };

  const [createExpense, setCreateExpense] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const changeCreateExpense = (expense) => {
    setCreateExpense(expense);
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const logoutHandler = () => {
    this.setState({ isAuthorized: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  const handleLogin = ({ email, password }) => {
    const graphqlQuery = {
      query: `
          {
            login(email: "${email}", password: "${password}") {
              token
              userId
            }
          }
        `,
    };
    // event.preventDefault();
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet"
          );
        }
        if (resData.errors) {
          throw new Error("User login failed");
        }
        console.log(resData);
        setIsAuthorized(true);
        setToken(resData.data.login.token);
        setUserId(resData.data.login.userId);

        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthorized(false);
        setError(err);
      });
  };

  const handleSignup = ({ email, password, name }) => {
    // event.preventDefault();
    const graphqlQuery = {
      query: `
          mutation {
            createUser(userInput: {email: "${email}", name: "${name}", password: "${password}"}) {
              _id
              email
            }
          }
        `,
    };

    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet"
          );
        }
        if (resData.errors) {
          throw new Error("User creation failed");
        }
        console.log(resData);
        setIsAuthorized(false);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthorized(false);
        setError(err);
      });
  };

  const [expenses, setExpenses] = useState([
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ]);
  if (!isAuthorized) {
    return (
      // <Router>
      //   <Routes>
      //     <Route path="/">
      //       <Login onLogin={handleLogin} />
      //     </Route>
      //     <Route path="/signup">
      //       <Signup onSignup={handleSignup} />
      //     </Route>
      //   </Routes>
      // </Router>
      <Login onLogin={handleLogin} />
    );
  }

  return (
    <div>
      <NewExpense
        createExpense={createExpense}
        onCreate={changeCreateExpense}
        onAddExpenses={addEnteredExpenses}
      />

      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
