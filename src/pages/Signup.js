import React, {useState} from 'react'
import "./Login.css"
function Signup(props) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("")
  const [enteredName, setEnteredName] = useState("")

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value)
  }

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    props.onSignup({
      email: enteredEmail,
      password: enteredPassword,
      name: enteredName
    })
  }

  const loginHandler = (e) => {
    e.preventDefault()
    props.onLogin()

  }
  return (
    <div className="login">
        <form onSubmit={submitHandler}>
        <div className="login__controls">
        <div className="login__control">
                <label>Name</label>
                <input type="text" value={enteredName} onChange={nameChangeHandler} />
            </div>
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
   
            <button >Signup</button>
            <button onClick={loginHandler}>Login</button >
        </div>
    </form>
    </div>
  )
}

export default Signup