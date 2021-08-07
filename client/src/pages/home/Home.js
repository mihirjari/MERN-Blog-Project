import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import "./home.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
    
    document.title = "Home";

    const [posts, setPosts] = useState([]);
    const {search} = useLocation(); //This will fetch the username from URL using destructuring

    useEffect(() => {

        const fetchPosts = async () => {

            const res = await fetch(`https://the-react-app-capstone.herokuapp.com/api/post/all${search}`);
            const data = await res.json();
            setPosts(data);
            
        }

        fetchPosts();

    }, [search]);
    return (
        
        <>
            <Header/>  
            <div className="home">
                <Posts posts={posts}/>
                <SideBar/>
            </div>
        </>
    )
}

export default Home
