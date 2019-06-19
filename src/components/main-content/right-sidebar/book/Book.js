import React, { Component } from 'react';
import classes from "./Book.css";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    changeCurrentBook = (bookId) => {
        console.log(bookId);
    }

    shortDescription = (text, len) => {
        const newText = `${text}`;
        return newText.length > len ? `${newText.substr(0, len)}...` : newText;
    }

    render() {
        const {id, title, description} = this.props.book;
        return ( 
            <div className={classes.book} onClick={() => this.changeCurrentBook(id)}>
                <div className={classes["book-icon"]}>
                    <span className="fa fa-book"></span>
                </div>
                <div className={classes["book-info"]}>
                    <h3>{title}</h3>
                    <small>{this.shortDescription(description, 50)}</small>
                </div>
            </div>
         )
    }
}
 
export default Book;