import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";




const Auth = () => {
  const [showSignup, setShowSignup] = useState(true);
  const [userType, setUserType] = useState("CUSTOMER")
  const [userId, setUserId] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] =useState("")
  const [message, setMessage] =useState("")

  const navigate = useNavigate;

  const redirectURL=()=>{
    navigate("/");
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      redirectURL();
      }

  },[]);
 
  const updateSignupData=(e)=>{
    const id = e.target.id;
    if(id==="userName"){
      setUserName(e.target.value)
      console.log(userName)
    }
    if(id==="userId"){
      setUserId(e.target.value)
      console.log(userId)
    }
    if(id==="password"){
      setPassword(e.target.value)
      console.log(password)
    }
    if(id==="email"){
      setEmail(e.target.value)
      console.log(email)
    }
    setErrorMessage("");
    setMessage("");
  }

  const clearState=()=>{
    setUserId("");
    setEmail("");
    setPassword("");
    setUserName("");
    setUserType("CUSTOMER")
    setMessage("");
    setErrorMessage("");
  }

  const handleSelect=(e)=>{
    setUserType(e);
  }

  const toggleSignup=()=>{
    clearState();
    setShowSignup(!showSignup);
  }

  const dataValidation =(data) =>{
    if (data.userId.length<5 || data.userId.length<10){
      setErrorMessage("User id should be 5 to 10 characters long")
      return false;
    }
    if (data.userId.includes(' ')){
      setErrorMessage("User id should not content spaces")
      return false;
    }
    if (data.password.length<6 || data.password.length<10){
      setErrorMessage("Password should be 6 to 10 characters long")
      return false;
    }
    if (data.password.includes(' ')){
      setErrorMessage("Password should not content spaces")
      return false;
    }
    if (data.name){
      if (data.name.length<5 || data.name.length<10){
        setErrorMessage("User name should be 5 to 10 characters long")
        return false;
      }
      if (data.name.includes(' ')){
        setErrorMessage("User name should not content spaces")
        return false;
      }
    }
    return true;
  }

  const signupFn=(e)=>{
    e.preventDefault();
    const data = {
      name : userName,
      userId,
      password,
      email,
      userType
    }
  }

  const loginFn=(e)=>{
    e.preventDefault();
    const data = {
      userId,
      password
    }
    if(!dataValidation(data)){
      return;
    }
    // call api
  }

  return (
    <div
      id="loginPage"
      className="bg-dark d-flex justify-content-center align-items-center vh-100 vw-100"
    >
      <div className="card m-5 p-5 bg-dark text-light shadow-lg d-flex align-item-center justify-content-center">
        <h3>{showSignup ? "Sign Up" : "Log In"}</h3>
        <form onSubmit={(showSignup)?signupFn:loginFn}>
        <div className="input-group">
            <input
              type="text"
              id="userId"
              className="form-control m-1"
              placeholder="User Id"
              onChange={updateSignupData}
              autoFocus
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              className="form-control m-1"
              placeholder="Password"
              onChange={updateSignupData}
              autoFocus
              required
            />
          </div>

        {showSignup &&
        (
          <>
          <div className="input-group">
            <input
              type="text"
              id="userName"
              className="form-control m-1"
              placeholder="User Name"
              onChange={updateSignupData}
              autoFocus
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              id="email"
              className="form-control m-1"
              placeholder="Email"
              onChange={updateSignupData}
              autoFocus
              required
            />
          </div>

          <div className="row m-1">
            <div className="col">
              <span className="mx-1 my-1">User Type</span>
            </div>
            <div className="col">
              <DropdownButton align="end"
              title={userType}
              id="userType"
              onSelect={handleSelect}
              variant="light">
              <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
              <Dropdown.Item eventKey="CLINT">CLINT</Dropdown.Item>

              </DropdownButton>

            </div>
          </div>

          </>
        )}

        <div className="input-group">
            <input
              type="submit"
              id="submitBtn"
              className="form-control btn btn-danger m-1"
              value={(showSignup
              )? "Sign up" : "Login"}
            />
          </div>
          <div className="text-center" onClick={toggleSignup}>{(showSignup)? "Already have an acount? Login" : "Do't have accoun? Signup"}
          </div>
          <div className="auth-error-msg text-sucess text-center">{message}</div>
          <div className="auth-error-msg text-danger text-center">{errorMessage}</div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
