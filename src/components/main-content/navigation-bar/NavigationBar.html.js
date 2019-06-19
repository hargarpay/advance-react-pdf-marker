import React, {Component} from "react"
import classes from "./NavigationBar.css"
import DropDown from "./nav-dropdown/DropDown";

export default class NavigationBar extends Component{
    constructor(props){
        super();
        this.props = props;
    }

    render(){
        return (
            <div className={classes.header}>
                <div className={classes.menu}>
                    <div className={classes["users-icon"]}>
                        <span className="fa fa-users"></span>
                    </div>
                    <div className={classes["dropdown-wrapper"]}>
                        <DropDown dropdownClass={classes["nav-dropdown"]}/>
                    </div>
                </div>
            </div>
        )
    }
}