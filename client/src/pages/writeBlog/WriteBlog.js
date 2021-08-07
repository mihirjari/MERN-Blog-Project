import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./writeblog.css";
import { Snackbar, TextField} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";


const WriteBlog = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [category, setCategory] = useState("");
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const {user} = useContext(Context);

    const handleClose = (e, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    }

    const handlePostSubmit = async (e) => {

        e.preventDefault();
        
        const newPost = {
            username: user.username,
            title: title,
            description: description,
        }

        if(category){
            newPost.categories = [category];
        }

        console.log(newPost);

        if(photo){

            const formData = new FormData();
            formData.append("image", photo);
             

            try{

                const response = await fetch("https://the-react-app-capstone.herokuapp.com/api/file", {
                    method: 'POST',
                    body: formData
                });
                const imageUrl = await response.json();
                newPost.picture = imageUrl;
                

            }catch(err){

                setError(true);
                
            }

            const postResponse = await fetch("https://the-react-app-capstone.herokuapp.com/api/post/new", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPost)
            });

            if(postResponse.status === 200){
                setOpen(true);
                setTimeout(()=>{
                    window.location.replace("https://the-capstone-project.netlify.app/");
                }, 5000);
            }
        }else{

            
            const postWithoutPicture = await fetch("https://the-react-app-capstone.herokuapp.com/api/post/new", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPost)
            });
          
            
            if(postWithoutPicture.status === 200){

                setOpen(true);
                setTimeout(()=>{
                    window.location.replace("https://the-capstone-project.netlify.app/");
                }, 5000);
            }
        }

        
       
    }

    return (
        <div className="write">
            {
                photo && <img className="writeTitleImage" src={URL.createObjectURL(photo)} alt="" />
            }
             
            {/* Creating form for writing a blog */}
            <form className="writeForm" onSubmit={handlePostSubmit}>
                <div className="formGroup">
                    <label htmlFor="fileInput">
                        <i className="blogIcon fas fa-plus-square"></i>
                    </label>
                    <input type="file" className="writeInput" id="fileInput" onChange={(e)=>setPhoto(e.target.files[0])} />
                    <input type="text" className="writeInput" autoFocus={true} placeholder="Blog Title" onChange={(e)=>setTitle(e.target.value)} />
                </div>


                <div className="formGroup">
                   
                    <textarea placeholder="Write your Blog here..." type="text" className="writeInput writeText" onChange={(e)=>setDescription(e.target.value)}></textarea>

                </div>

               <div className="categoryInput">
                    <TextField fullWidth label="Blog Category" variant="outlined" type="text" onChange={(e)=>setCategory(e.target.value)} />
               </div>

                <button className="submitBtn" type="submit">Post</button>
                

            </form>

            <Snackbar open={open} onClose={handleClose}>

                <Alert onClose={handleClose} severity="success">
                        Your post has been published. You will be redirected to Home in few seconds!
                </Alert>

            </Snackbar>

            <Snackbar open={error} onClose={handleClose}>

                <Alert onClose={handleClose} severity="error">
                        Your post wasn't published. Please try again.
                </Alert>

            </Snackbar>

        </div>
    )
}

export default WriteBlog
