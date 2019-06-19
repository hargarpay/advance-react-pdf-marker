import React, {Component} from "react";
import classes from "./ListItem.css";

export default class ListItem extends Component{
    constructor(props){
        super();
        this.props = props;
    }

    render(){
        return (
            <div className={classes["list-item"]}>
                <div className={classes["action-buttons"]}>
                    <button className={`${classes.btn} ${classes["btn-danger"]}`}>
                        <span className="fa fa-trash"></span>
                    </button>
                    <button className={`${classes.btn} ${classes["btn-warning"]}`}>
                        <span className="fa fa-edit"></span>
                    </button>
                </div>
            </div>
        )
    }
}