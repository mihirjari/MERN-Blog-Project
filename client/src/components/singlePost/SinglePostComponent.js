import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlepostcomponent.css";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
const SinglePostComponent = () => {

    const loc = useLocation();
    const postId = loc.pathname.split('/')[3];  //Getting the post ID from the url
    const [post, setPost] = useState({});   //Using React useState Hook to set post
    const {user} = useContext(Context); // Using Context to check if the user is valid
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const [title, setTitle] = useState(""); //This is for post update process
    const [description, setDescription] = useState(""); //This is for post update process   
    const [updateMode, setUpdateMode] = useState(false);    //This is for post update process

    const handleClose = (e, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    }

    useEffect(() => {


        const getPost = async () => {

            const res = await fetch(`https://the-react-app-capstone.herokuapp.com/api/post/get/${postId}`);
            const jsonData = await res.json();
            setPost(jsonData);
            setTitle(jsonData.title);
            setDescription(jsonData.description);
            
        }
        
        
        getPost();

    }, [postId]);    //using React useEffect Hook and a function inside it which would trigger on changing the post ID
    
    const deletePost = async () => { // Function to delete the post


        try{

            const response = await fetch(`https://the-react-app-capstone.herokuapp.com/api/post/delete/${postId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: user.username})
            });

            if(response.status === 200){

                setOpen(true);
                setTimeout(()=>{
                    window.location.replace("https://the-capstone-project.netlify.app/");
                }, 5000);
            }
        }catch(err){
            setError(true);
        }
    }


    const updatePost = () => {      //Function to update the post

        setUpdateMode(true);

    }

    const handlePostUpdate = async () => {

        try{

            const response = await fetch(`https://the-react-app-capstone.herokuapp.com/api/post/update/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: user.username, title: title, description: description})
            });
            
            if(response.status === 200){
                
              
               window.location.href = "https://the-capstone-project.netlify.app/";
                setUpdateMode(false);
            }
        }catch(err){
            
        }

    }

    return (
        <div className="singlePost">
            <div className="wrapper">

                {
                    post.picture ? <img className="singlePostImage" src={post.picture} alt="" /> : <img className="singlePostImage" src="https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1931&q=80" alt="" />
                }

                {
                    updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)} /> : (
                
                <h1 className="singlePostTitle">
                    {post.title}
                    {post.username === user?.username && (

                        <div className="singlePostEdit">
                            <i className="singlePostIcon far fa-edit" onClick={updatePost}></i>
                            <i className="singlePostIcon far fa-trash-alt" onClick={deletePost}></i>
                        </div>

                    )} 
                    
                </h1>

                )}
                <div className="postInformation">
                    <span className="author">Author:
                    <Link to={`/?user=${post.username}`} className="link">
                        <strong>{post.username}</strong>
                    </Link>
                     </span>
                    <span className="date">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {
                    updateMode ? (
                        <textarea className="postPageDescriptionInput" value={description} onChange={(e)=>setDescription(e.target.value)} />

                    ) : (
                        <p id="postPageDescription">
                    
                        {description}
    
                    </p>
                    )
                }

                {
                    updateMode && <button className="updateBtn" onClick={handlePostUpdate}>Update</button>
                }

                
               

            </div>

            <Snackbar open={open} onClose={handleClose}>

                <Alert onClose={handleClose} severity="info">
                        Your post has been deleted. You will be redirected to Home in few seconds!
                </Alert>

            </Snackbar>

            <Snackbar open={error} onClose={handleClose}>

                <Alert onClose={handleClose} severity="error">
                        There was an error deleting post. Please try again.
                </Alert>

            </Snackbar>
        </div>
    )
}

export default SinglePostComponent
