import React, { useState } from 'react'
import "./Login.css"
function Login(props) {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value)
    }
    const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.onLogin({
            email: enteredEmail,
            password: enteredPassword
        })
        setEnteredEmail('')
        setEnteredPassword('')
    }
  return (
    <div className="login">
        <form onSubmit={submitHandler}>
        <div className="login__controls">
            <div className="login__control">
                <label>Email</label>
                <input type="email" value={enteredEmail} onChange={emailChangeHandler} />
            </div>
            <div className="login__control">
                <label>Password</label>
                <input type="password" value={enteredPassword} onChange={passwordChangeHandler} />
            </div>
          
        </div>
        <div>
   
            <button >Add Expenses</button>
        </div>
    </form>
    </div>
  )
}

export default Login