import Container from "@material-ui/core/Container";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, Snackbar } from "@material-ui/core";
import "./about.css";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";

const useStyle = makeStyles({
    root: {
        margin: "20px 10px"
    }
});

const About = () => {

    const classes = useStyle();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

  
    document.title = "About";

    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: ""
    });

    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = (event) => {

        event.preventDefault();

        if(!user.contact.match(/^\d{10}$/)){
            setError(true);
        }else{
            setError(false);
            setOpen(true);
        }
        
     
        
    }

    return (
        <>
            <div className="titleImage">  
                        <div className="aboutTitle">About</div>
            </div>
            <Container>
                <div className="description">
                    <p id="paraTitle">Welcome to our blog!</p>
                  

                </div>
                <div className="secondImage">

                    <div className="secondImageTitle">Share your thoughts with us!</div>
                  
                </div>

                <div className="formContainer">
                    <p className="formTag">Connect With Us</p>
                        <form method="POST" onSubmit={handleSubmit}>
                                <TextField fullWidth label="Your Name" variant="outlined" onChange={(e)=>user.name=e.target.value} required placeholder="Firstname Lastname" className={classes.root}/>

                                <TextField type="email" fullWidth label="Your Email" variant="outlined" placeholder="username@email.com" onChange={(e)=>user.email=e.target.value} required className={classes.root} />

                                <TextField type="text" fullWidth label="Your Contact Number" variant="outlined" onChange={(e)=>user.contact=e.target.value} placeholder="XXX-XXX-XXXX" required className={classes.root} error={error} helperText="Invalid Phone Number" />

                                <Button type="submit" size="large" variant="contained" color="primary" className={classes.root}>Send</Button>
                        </form>

                        <Snackbar open={open} onClose={handleClose}>

                            <Alert severity="success" onClose={handleClose}>Thank you for connecting!</Alert>

                        </Snackbar>
                        
                </div>
               
            </Container>
        </>
    )
}

export default About
