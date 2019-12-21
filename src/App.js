import React from 'react';
import axios from "axios";
import './App.css';
import moment from "moment";
import Input from "./Inputs.js";
import { separateMessageFromStack } from 'jest-message-util';
// import { SubjectSubscriber } from '../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/rxjs/internal/Subject';

function App() {
const subjects = ["Angular","React"]
const targetDate = moment("12/21/2019 18:30:00")

const [name, setName] = React.useState("");
const [email, setEmail] = React.useState("");
const [selectSubject, setSelectSubject ] = React.useState("");
const [isChecked, setIsChecked] = React.useState(false);
const [timer, setTimer] = React.useState("");
const [message,setMessage] = React.useState("");
const [isLoading,setIsLoading] = React.useState(false);

const handleSubmit =  () => {
  setIsLoading(true);
  axios
  .get("http://www.mocky.io/v2/5dfded583100000a1fc96e7a?mocky-delay=2000ms")
  .then(response =>{
    const {data} = response;
    setMessage(data.response);
    setIsLoading(false);
  });
}


const updateTimer = () => {
  const diffHours = targetDate.diff(moment(), "hours")
  const diffMinutes = targetDate.diff(moment(), "minutes") % 60
  const diffSeconds = targetDate.diff(moment(), "seconds") % 60

  setTimer(`${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`);
}

React.useEffect(() => {
   const interval = setInterval(updateTimer, 1000)
   axios
   .get("http://www.mocky.io/v2/5dfded653100006e00c96e7d?mocky-delay=2000ms")
   .then(response =>{
     setSelectSubject(response.data.subjects);
   });
    
   return () => clearInterval(interval)
},[])

console.log("state" , {name,email,selectSubject,isChecked});


  return (
    <div className="App">
       <div className="title">Seasons Change registrations form</div>
       <p>Form end in </p>
       <p>{timer}</p>
       <Input 
       label = "Name"
       value={name}
       onChangeFromComponent={value => setName(value)}
      />

      <Input 
       label = "Email"
       value={email}
       onChangeFromComponent={value => setEmail(value)}
      />



{/* <div className="field">
  <label className="label">Username</label>
  <div className="control has-icons-left has-icons-right">
    <input className="input is-success" type="text" placeholder="Text input" value="bulma"/>
    <span className="icon is-small is-left">
      <i className="fas fa-user"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-check"></i>
    </span>
  </div>
  <p className="help is-success">This username is available</p>
</div> */}

{/* <div className="field">
  <label className="label">Email</label>
  <div className="control has-icons-left has-icons-right">
    <input className="input is-danger" type="email" placeholder="Email input" value={email} onChange = {event => setEmail(event.target.value)}/>
    <span className="icon is-small is-left">
      <i className="fas fa-envelope"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p className="help is-danger">This email is invalid</p>
</div> */}

<div className="field">
  <label className="label">Subject</label>
  <div className="control">
    <div className="select">
      <select value={selectSubject} onChange = {event => setSelectSubject(event.target.value)}>
        
        {subjects.map(subject => (<option key={subject}>{subject}</option>))}
      </select>
    </div>
  </div>
</div>

{/* <div className="field">
  <label className="label">Message</label>
  <div className="control">
    <textarea className="textarea" placeholder="Textarea"></textarea>
  </div>
</div> */}

<div className="field">
  <div className="control">
    <label className="checkbox">
      <input type="checkbox" value={isChecked} onChange = {event => setIsChecked(event.target.checked)}/>
      I agree to the 
    </label>
  </div>
</div>

{/* <div className="field">
  <div className="control">
    <label className="radio">
      <input type="radio" name="question"/>
      Yes
    </label>
    <label className="radio">
      <input type="radio" name="question"/>
      No
    </label>
  </div>
</div> */}

<div className="field is-grouped">
  <div className="control">
    <button className={`button is-link ${isLoading && "is-loading"}`} 
    onClick = {handleSubmit}
    disabled = {isLoading}
    >
      Submit
    </button>
  </div>
  <div className="control">
    <button className="button is-link is-light">Cancel</button>
  </div>
  <p>{message}</p>
</div>

    </div>
    
  );
}

export default App;
