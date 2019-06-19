import React, { Component } from 'react';
import classes from "./DropDown.css";
import DropdownItem from './dropdown-item/DropdownItem';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const users = [
            {
                id: "8016d69ac5984ff295c8af1e3b034501",
                name: "Manager",
                email: "manager@mvp.com",
                role: "manager"
            },
            {
                id: "24af0fca6bc24fa5a42d88017283c787",
                name: "Analyst",
                email: "analyst@mvp.com",
                role: "analyst"
            }
        ];
        return ( 
            <div className={classes["nav-dropdown"]}>
                {
                    users.map(user => <DropdownItem key={user.id} user={user}/>)
                }
            </div>
         )
    }
}
 
export default DropDown;