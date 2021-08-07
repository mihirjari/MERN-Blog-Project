import SideBar from "../../components/sidebar/SideBar";
import SinglePostComponent from "../../components/singlePost/SinglePostComponent";
import "./singlepost.css";

const SinglePost = () => {
    return (

        // Creating Single Post Design and Sidebar on right
        <div className="single">
            
            <SinglePostComponent/> 
            <SideBar/>
        </div>
    )
}

export default SinglePost
