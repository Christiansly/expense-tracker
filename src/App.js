import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import React, {useState} from "react";
function App() {
  const addEnteredExpenses = (data) => {
    setExpenses([
      ...expenses,
      data
    ])
    console.log('data',data)
  }
  
  const [createExpense, setCreateExpense] = useState(false)

  const changeCreateExpense = (expense) => {
    setCreateExpense(expense)
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
  ])

  return (
    <div>
      <NewExpense createExpense={createExpense} onCreate={changeCreateExpense} onAddExpenses={addEnteredExpenses}/>
     
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
