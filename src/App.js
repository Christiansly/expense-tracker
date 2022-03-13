import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar/Navbar";
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
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");

  const changeCreateExpense = (expense) => {
    setCreateExpense(expense);
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const logoutHandler = () => {
    setIsAuthorized(false);
    setToken(null);
    setName("")
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  const signupUser = () => {
    setSignup(true);
  };

  const changeSignup = () => {
    setSignup(false);
  }

  const handleLogin = ({ email, password }) => {
    const graphqlQuery = {
      query: `
          {
            login(email: "${email}", password: "${password}") {
              token
              userId
              name
              expenses {
                _id
                amount
                date
                title
              }
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
        setName(resData.data.login.name);
        setExpenses(resData.data.login.expenses);
        console.log(expenses);
        

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
        createUser(userInput: {email: "${email}", password: "${password}", name: "${name}"}) {
          _id,
          name
        }
      }
        `,
    };

    console.log("email: " + email, "name: " + name, "password: " + password);

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
        setSignup(false);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthorized(false);
        setError(err);
        setSignup(true);
      });
  };

  const handleCreateExpense = ({title, amount, date}) => {
    console.log("title: " + title, "amount: " + amount, "date: " + date)
    const graphqlQuery = {
      query: `
      mutation {
        createExpense(expenseInput: {title: "${title}", amount: "${amount}", date: "${date}"}) {
          _id,
          title,
          amount,
          date
        }
      }
        `,
    };
    console.log(graphqlQuery)

    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error(
            "Unable to create Expense"
          );
        }
        if (resData.errors) {
          throw new Error("Unable to create Expense");
        }
        console.log(resData);
        
      })
      .catch((err) => {
        console.log(err);
      
      });

  }

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
  if (!isAuthorized && !signup) {
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
      <Login onLogin={handleLogin} signup={signupUser} />
    );
  }

  if (signup) {
    return <Signup onSignup={handleSignup} onLogin={changeSignup} />;
  }

  return (
    <div>
      <Navbar name={name} onLogout={logoutHandler}/>
      <NewExpense
        createExpense={createExpense}
        onCreate={changeCreateExpense}
        onAddExpenses={handleCreateExpense}
      />

      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
