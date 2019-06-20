import React, { Component } from 'react';
import DropdownItem from './dropdown-item/DropdownItem';
import "./DropDown.css";

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: "8016d69ac5984ff295c8af1e3b034501"
         }
    }

    changeUser = (user) => {
        this.setState({
            user: user.id
        })
    }
    render() {

        // const
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
            <div className={"nav-dropdown"}>
                {
                    users.map(user => <DropdownItem
                        key={user.id}
                        user={user}
                        activeClass={user.id === this.state.user}
                        changeActiveUser={this.changeUser}
                    />)
                }
            </div>
         )
    }
}
 
export default DropDown;