import React, {Component} from "react";
import classes from "./MainContent.css";
import NavigationBar from "./navigation-bar/NavigationBar.html";
import Spinner from "./spinner/Spinner";
import RightSidebar from "./right-sidebar/RightSidebar";

export default class MainContent extends Component{
    constructor(props){
        super();
        this.props = props;
    }

    render(){
        return (
            <div className={classes["main-content"]}>
                <NavigationBar/>
                <Spinner />
                <RightSidebar />
            </div>
        )
    }
}