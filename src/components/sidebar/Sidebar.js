import React, {Component} from "react";
import classes from "./Sidebar.css";
import ListItem from "./list-item/ListItem";

export default class Sidebar extends Component{
    constructor(props){
        super();
        this.props = props;
    }
    render(){
        return (
            <div className={classes.sidebar}>
                {
                    [
                        {id: "hjfgvfh"},
                        {id: "jdsfhgvjhdf"},
                        {id: "jhvsdjhvdsh"},
                        {id: "hjfgvfh1"},
                        {id: "jdsfhgvjhdf1"},
                        {id: "jhvsdjhvdsh1"},
                        {id: "hjfgvfh2"},
                        {id: "jdsfhgvjhdf2"},
                        {id: "jhvsdjhvdsh2"},
                    ].map(item => <ListItem key={item.id}/>)
                }
            </div>
        )
    }
}
