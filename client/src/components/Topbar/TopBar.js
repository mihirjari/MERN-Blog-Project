import { useContext } from "react";
import {Link} from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

const TopBar = () => {

    const {user, dispatch} = useContext(Context);

    const handleLogoutProcess = () => {

        dispatch({type: "LOGOUT"});
    }


    return (
        <div className="top">

            <div className="topleft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-instagram"></i>
            </div>

            <div className="topcenter">
                <ul className="topList">
                   <li className="toplistItem"><Link to="/" className="link">Home</Link></li>
                   <li className="toplistItem"><Link to="/about" className="link">About</Link></li>
                   <li className="toplistItem"><Link to="/write" className="link">Write</Link></li>
                   <li className="toplistItem" onClick={handleLogoutProcess}>
                       {user && "Logout" }
                   </li>
                </ul>
            </div>

            <div className="topright">
                {
                    user ? (
                        
                      <>
                      <Link to="/settings">
                        <img className="topImage" src={user.profilePicture} alt={`Hello ${user.username}`}></img>
                      </Link>
                       <span>{`Hello, ${user.username}`}</span>
                       </>
                      
                    ) : (
                        <ul className="topList">
                            <li className="toplistItem">
                                <Link to="/login" className="link">Login</Link>
                            </li>
                            <li className="toplistItem">
                                <Link to="/register" className="link">Register</Link>
                            </li>
                        
                        </ul>
                    )
                }


              
            </div>
        </div>
    )
}

export default TopBar
