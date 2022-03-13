import React, {useState} from "react";
import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
function Expenses(props) {
  const [filter, setFilter] = useState('2022')
  const onSetFilter = (data) => {
    setFilter(data)
    console.log('data',data)
  }
  const filterExpenses = props.expenses.filter(e => {
    const date = new Date(e.date)
    return date.getFullYear() == filter

  })
  return (
    <Card className="expenses">
      <ExpensesFilter onSelectFilter={onSetFilter} />
     <ExpensesChart expenses={filterExpenses} />
      <ExpensesList items={filterExpenses} />
    </Card>
  );
}

export default Expenses;
