import React, { Component } from 'react';
import AppContext from '../../../../../context/AppContext';

import  "./Dropdown-Item.css";
class DropdownItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    onHandlerUser = (user) => {

        const { switchUser } = this.context;
        const {changeActiveUser} = this.props;
        switchUser(user);
        changeActiveUser(user)
    } 

    render() {
        const { user, activeClass } = this.props;

        return (
            <div
                className={`dropdown-item ${ activeClass ? "active" : ""}`}
                onClick={() => this.onHandlerUser(user)}
            >
                <img src="https://via.placeholder.com/50" alt="User Pix" />
                <div className={"user-info"}>
                    <h3>{user.name}</h3>
                    <small>{user.email}</small>
                </div>
            </div>
         )
    }
}

DropdownItem.contextType = AppContext;
 
export default DropdownItem;