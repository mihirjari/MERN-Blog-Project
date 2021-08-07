import "./posts.css";
import Post from "../post/Post";

const Posts = (props) => {

   
    return (
        <div className="posts">

            {
                props.posts.map((post) => <Post post={post}/>)
            }

        </div>
    )
}

export default Posts
