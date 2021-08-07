import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./settings.css";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const Settings = () => {

    const {user, dispatch} = useContext(Context);
    const [profilePic, setProfilePic] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

   

    const handleClose = (e, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        const updatedUser = {
            id: user._id,
            username: username || user.username,
            email: email || user.email,
            password: password
        }

        /*START */

        if(profilePic){

            const formData = new FormData();
            formData.append("image", profilePic);
             

            try{

                const response = await fetch("https://the-react-app-capstone.herokuapp.com/api/file", {
                    method: 'POST',
                    body: formData
                });
                const imageUrl = await response.json();
                updatedUser.profilePicture = imageUrl;
                

            }catch(err){

                setError(true);
                dispatch({type: "UPDATE_FAILED"});
                
            }

            

            const userResponse = await fetch(`https://the-react-app-capstone.herokuapp.com/api/user/${user._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedUser)
            });
            const userResponseJson = await userResponse.json();

            if(userResponse.status === 200){
                setOpen(true);
                dispatch({type: "UPDATE_SUCCESS", payload: userResponseJson});
                setTimeout(()=>{
                    window.location.replace("https://the-capstone-project.netlify.app/");
                }, 5000);
            }
        }else{

            
            const userWithoutPicture = await fetch(`https://the-react-app-capstone.herokuapp.com/api/user/${user._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedUser)
            });
          
            const userWithoutPictureJson = await userWithoutPicture.json();
            if(userWithoutPicture.status === 200){

                setOpen(true);
                dispatch({type: "UPDATE_SUCCESS", payload: userWithoutPictureJson});
                setTimeout(()=>{
                    window.location.replace("https://the-capstone-project.netlify.app/");
                }, 5000);
            }
        }

        /*END */

    }

    return (
        <div className="settings">

            <div className="wrapper">
                {/*Adding User Account Settings Titles */}
                <div className="settingsTitle">
                    <span className="update">

                        Update Your Account

                    </span>

                    <span className="delete">

                        Delete Your Account

                    </span>
                </div>

                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="pp">
                        <img src={profilePic ? URL.createObjectURL(profilePic) : user.profilePicture} alt={user.username}></img>
                        <label htmlFor="fileInput">
                        <i className="ppIcon far fa-user"></i>{" "}
                        </label>
                        <input type="file" id="fileInput" onChange={(e)=>setProfilePic(e.target.files[0])} style={{display: "none"}} className="settingInput"></input>
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)}></input>

                    <label>Email</label>
                    <input type="text" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}></input>

                    <label>Password</label>
                    <input type="password" required placeholder="Enter your new Password here..." onChange={(e)=>setPassword(e.target.value)}></input>
                    <button type="submit" className="formBtn">Update Account Details</button>
                </form>

            </div>
            {/*<SideBar />*/}
            
            <Snackbar open={open} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Your details has been saved. You will be redirected to Home in few second.
                </Alert>
            </Snackbar>

            <Snackbar open={error} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    An error occured while updating your information. Please try again.
                </Alert>
            </Snackbar>

        </div>
    );
}

export default Settings
