import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { BottomNavigation } from '@material-ui/core';
import { BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import Info from '@material-ui/icons/Info';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import { Context } from '../../context/Context';


const useStyles = makeStyles({
    root: {
        backgroundColor: "#F5F7F6",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%"
    }
});

const Footer = () => {

    const classes = useStyles();

    const [value, setValue] = useState(0);
    const {user} = useContext(Context);

    return (
        
        <>
           <BottomNavigation showLabels value={value} onChange={(event, newVal)=>setValue(newVal)} className={classes.root}>
            <Link to="/"> <BottomNavigationAction label="Home" icon={<HomeIcon />} /> </Link>
            <Link to="/about"> <BottomNavigationAction label="About" icon={<Info />}  /> </Link>
            <Link to="/write">    <BottomNavigationAction label="Write" icon={<CreateIcon />} /></Link>
            <Link to="login">  { !user &&  <BottomNavigationAction label="Login" icon={<PersonIcon />} /> }</Link>
            <Link to="/settings">{ user &&  <BottomNavigationAction label="Settings" icon={<SettingsIcon />} /> }</Link>
           </BottomNavigation>
        </>
    )
}

export default Footer
