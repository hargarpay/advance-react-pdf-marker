import React, {Component} from "react"
import DropDown from "./nav-dropdown/DropDown";

import "./NavigationBar.css"
import { isEmpty } from "../../../helper/utility";

export default class NavigationBar extends Component{
    constructor(props){
        super();
        this.props = props;
        this.state = {
            activeDropdown: false
        }
    }

    activateDropdown = (event) => {
        if(isEmpty(event.target.closest(".dropdown-item"))){
            const { activeDropdown } = this.state;
            this.setState({
                activeDropdown: !activeDropdown
            })
        }
    }

    render(){
        const { activeDropdown } = this.state;
        return (
            <div className={"navigation header"}>
                <div className={"menu"} onClick={(event) => this.activateDropdown(event)}>
                    <div className={"users-icon"}>
                        <span className="fa fa-users"></span>
                    </div>
                    <div className="switch-info">
                        <p className="write-up"> Switch User</p>
                    </div>
                    <div className={`dropdown-wrapper ${activeDropdown ? "active": ""}`}>
                        <DropDown />
                    </div>
                </div>
            </div>
        )
    }
}