import "./header.css"
import homeImage from "./home.svg"

const Header = () => {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSmall">Welcome To The</span>
                <span className="headerTitleLarge">Blog</span>
            </div>
            <img className="headerImage" src={homeImage} alt=""></img>
        </div>
    )
}

export default Header
