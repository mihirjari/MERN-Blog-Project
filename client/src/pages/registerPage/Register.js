import { useState } from "react";
import {Link} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import "./register.css";

const Register = () => {

    document.title = "Register";

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);

    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    

    const handleFormSubmission = async (e) => {

       e.preventDefault();
       setError(false);

      if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){

        setValidEmail(false);
       
      }else{
          
          setOpen(true);
          setValidEmail(true);
         
          return;
      }

        try{

            const res = await fetch('https://the-react-app-capstone.herokuapp.com/api/authenticate/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username, email: email, password: password})
                
            });
        
            if(res.status === 200){

                setSuccess(true);
                e.target.reset();
            }

        }catch(err){
            setError(true);
        }


      
    }

    return (
        <div className="register">
            <span className="title">
                Registration Page
            </span>
            <form className="registerForm" onSubmit={handleFormSubmission}>

                <label>Username</label>
                <input type="text" required="true" className="registerInput" placeholder="Enter username here..." onChange={(e)=>setUsername(e.target.value)} />

                <label>Email</label>
                <input type="text" required="true" className="registerInput" placeholder="Enter email here..." onChange={(e)=>setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password" required="true" className="registerInput" placeholder="Enter password here..." onChange={(e)=>setPassword(e.target.value)} />

                <button id="registerBtn">Register</button>
                
            </form>

            <button id="loginBtn">
                <Link to="/login" className="link">Login</Link>
            </button>


            {
                (success) && <Alert severity="success">Thank you for registering. <Link to="/login" className="link" style={{"fontWeight": "bold"}}>Click here to Login</Link></Alert>

            }

            {
                (validEmail && open) && <Alert severity="error" onClose={()=>{setOpen(false)}}>You entered an invalid email.</Alert>
            }
          
        </div>
    )
}

export default Register
