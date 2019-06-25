import React, { Component } from 'react';
import "./Book.css";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    changeCurrentBook = (book) => {
        const { changeBook } = this.props.onChangeBook;
        changeBook(book);
    }

    shortDescription = (text, len) => {
        const newText = `${text}`;
        return newText.length > len ? `${newText.substr(0, len)}...` : newText;
    }

    render() {
        const { book } = this.props;
        const {title, description} = book;
        return ( 
            <div className="book" onClick={() => this.changeCurrentBook(book)}>
                <div className="book-icon">
                    <span className="fa fa-book"></span>
                </div>
                <div className="book-info">
                    <h3>{title}</h3>
                    <small>{this.shortDescription(description, 50)}</small>
                </div>
            </div>
         )
    }
}
 
export default Book;