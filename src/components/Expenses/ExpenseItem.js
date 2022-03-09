import React, { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
import Card from "../UI/Card"
function ExpenseItem(props) {
  const { date, amount } = props;
  const [title, setTitle] = useState(props.title)
  const clickHandler = (e) => {
    setTitle('Updated')
    console.log('8888')
  }
  return (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${amount}</div>
      </div>

    </Card>
  );
}

export default ExpenseItem;
