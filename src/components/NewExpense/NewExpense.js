import React from 'react'
import "./NewExpense.css"
import ExpenseForm from './ExpenseForm'
function NewExpense(props) {
  const saveExpenseDataHandler = (expenseData) => {
    const expense = {
      ...expenseData,
      id: Math.random(),
    }
    props.onAddExpenses(expense);
    console.log(expense);
  }
  return (
    <div className="new-expense">
      <ExpenseForm create={props.createExpense} onCreate={props.onCreate} onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  )
}

export default NewExpense