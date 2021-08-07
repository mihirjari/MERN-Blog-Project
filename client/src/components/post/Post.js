import { Link } from "react-router-dom";
import "./post.css";

const Post = (props) => {

    return (
        <div className="post">

            {
                props.post.picture ? <img className="postImage" src={props.post.picture} alt=""></img> : <img className="postImage" src="https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1931&q=80" alt=""></img>
            }

            <div className="postInformation">
                <div className="postCategories">
                    {
                        props.post.categories.map((category) => <span className="category">{category.categoryName}</span> )
                    }
                   
                </div>

                <Link to={`/post/get/${props.post._id}`} className="link">

                    <span className="postTitle">
                        {props.post.title}
                    </span>
                    
                </Link>

                
                <hr/>
                <span className="postDate">{new Date(props.post.createdAt).toDateString()}</span>
            </div>
            <p className="postDescription">{props.post.description}</p>
        </div>
    )
}

export default Post
