import { useContext, useRef, useState } from "react";
import {Link} from "react-router-dom";
import { Context } from "../../context/Context";
import Alert from '@material-ui/lab/Alert';
import "./login.css";



const Login = () => {
    document.title = "Login";

    const [error, setError] = useState(false);
    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch} = useContext(Context);


    const handleSubmit = async (e) => {

        e.preventDefault();
        dispatch({type: "LOGIN_START"});

        try{

            const res = await fetch("https://the-react-app-capstone.herokuapp.com/api/authenticate/signin", {

                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: userRef.current.value, password: passwordRef.current.value})
            });

            if(res.status === 400){

                setError(true);
                return;

            }

            if(res.status === 200){

                const userFound = await res.json();
                dispatch({type: "LOGIN_SUCCESS", payload: userFound});

            }else{

                setError(true);
                return;
            }

            

        }catch(error){
            
            dispatch({type: "LOGIN_FAILED"});
        }

        
    }

    return (
        <div className="login">
            <span className="loginTitle">
                Login Page
            </span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" required className="loginInput" placeholder="Enter username here..." ref={userRef} />
              
                <label>Password</label>
                <input type="password" required className="loginInput" placeholder="Enter password here..." ref={passwordRef} />

                <button type="submit" className="loginBtn" type="submit">Login</button>
                
            </form>

            <button className="registerBtn">
                <Link to="/register" className="link">Register</Link>
            </button>

            {(error) && <Alert severity="error" onClose={()=>setError(false)}>User not found</Alert>}
            
        </div>
    )
}

export default Login
