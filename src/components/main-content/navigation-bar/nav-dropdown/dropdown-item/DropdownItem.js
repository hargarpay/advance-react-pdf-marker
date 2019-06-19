import React, { Component } from 'react';
import classes from "./Dropdown-Item.css";

class DropdownItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    onHandlerUser = (user) => {
        console.log(user);
    } 

    render() {
        const { user } = this.props;

        return ( 
            <div className={classes["dropdown-item"]} onClick={() => this.onHandlerUser(user)}>
                <img src="https://via.placeholder.com/50" alt="User Pix" />
                <div className={classes["user-info"]}>
                    <h3>{user.name}</h3>
                    <small>{user.email}</small>
                </div>
            </div>
         )
    }
}
 
export default DropdownItem;