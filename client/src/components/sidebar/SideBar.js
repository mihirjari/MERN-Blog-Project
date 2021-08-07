import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import homeImage from "./home.jpg";

const SideBar = () => {


    const [categories, setCategories] = useState([]); //Using React Hook to set categories

    useEffect(() => {

        const getCategories = async () => {

            const res = await fetch("https://the-react-app-capstone.herokuapp.com/api/categories/getCategories");
            const jsonCats = await res.json();
            setCategories(jsonCats);
        }

        getCategories();

    }, []);

    return (
        <div className="sidebar">

            <div className="sidebarItem">
                <span className="sidebarTitle">About Appplication</span>
                <img src={homeImage} alt="About Me"></img>
                <p>Please feel free to write & share the information. You can simply register yourself and start ahead! Give it a try!</p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">Categories</span>
                <ul className="sidebarList">

                    {
                        categories.map((category) => (

                            <Link to={`/?category=${category.categoryName}`} className="link">
                            
                            <li className="sidebarListItem">{category.categoryName}</li>

                            </Link>
                           
         
                        ))
                    }
                   
                    
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">Follow Us</span>
                <div className="socialSidebar">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-instagram"></i>
                </div>
            </div>

        </div>
    )
}

export default SideBar
