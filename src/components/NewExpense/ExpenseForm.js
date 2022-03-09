import React, {useState} from 'react'
import "./ExpenseForm.css"
function ExpenseForm(props) {
    const [enteredTitle, setEnteredTitle] = useState('')
    const [enteredAmount, setEnteredAmount] = useState('')
    const [enteredDate, setEnteredDate] = useState('')

    // const [userInput, setUserInput] = useState({
    //     enteredTitle: '',
    //     enteredAmount: '',
    //     enteredDate: '',
    // })

    const titleChangeHandler = (event) => {
        // setUserInput({
        //     ...userInput,
        //     enteredTitle: event.target.value
        // })
        setEnteredTitle(event.target.value)
    }
    const amountChangeHandler = (event) => {
        // setUserInput({
        //     ...userInput,
        //     enteredAmount: event.target.value
        // })
        setEnteredAmount(event.target.value)
    }
    const dateChangeHandler = (event) => {
        // setUserInput({
        //     ...userInput,
        //     enteredDate: event.target.value
        // })
        setEnteredDate(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const expenseDate = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        }
        props.onSaveExpenseData(expenseDate)
        setEnteredDate('')
        setEnteredAmount('')
        setEnteredTitle('')
        // onCancel()
    }

    const onCancelAfterCreate = (event) => {
        event.preventDefault()
        if (!enteredTitle) {
            return
        }
        if(!enteredAmount) {
            return
        }
        if(!enteredDate) {
            return
        }
       onCancel()
    }
    
    const onCancel = (event) => {
        props.onCreate(false)
    }
    
    const onCreate = (event) => {
        props.onCreate(true)
    }
    const classList = () => {
        if (!props.create) {
            return "new-expense__controls hide"
        }
        return "new-expense__controls"
    }
  return (
    <form onSubmit={submitHandler}>
        <div className={classList()}>
            <div className="new-expense__control">
                <label>Title</label>
                <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
            </div>
            <div className="new-expense__control">
                <label>Amount</label>
                <input type="number" value={enteredAmount} min="0.01" step="0.01" onChange={amountChangeHandler} />
            </div>
            <div className="new-expense__control">
                <label>Date</label>
                <input type="date" value={enteredDate} min="2021-02-02" max="2025-02-02" onChange={dateChangeHandler} />
            </div>
        </div>
        <div>
            <button className={props.create? '': 'hide'} onClick={onCancel}>Cancel</button>
            <button className={props.create? 'hide': ''}  onClick={onCreate}>Add Expenses</button>
            <button className={props.create? '': 'hide'} onClick={onCancelAfterCreate}>Add Expenses</button>
        </div>
    </form>
  )
}

export default ExpenseForm