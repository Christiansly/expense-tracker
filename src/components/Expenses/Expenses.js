import React, {useState} from "react";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
function Expenses(props) {
  const [filter, setFilter] = useState('2022')
  const onSetFilter = (data) => {
    setFilter(data)
    console.log('data',data)
  }
  const filterExpenses = props.expenses.filter(e => {
    return e.date.getFullYear() == filter

  })
  return (
    <Card className="expenses">
      <ExpensesFilter onSelectFilter={onSetFilter} />
     
      <ExpensesList items={filterExpenses} />
    </Card>
  );
}

export default Expenses;
