import React, { Component } from 'react';
import classes from "./RightSidebar.css";
import Book from './book/Book';
import UploadBook from './upload-book/UploadBook';

class RightSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeTab: "view",
            isOpen: false
         }
    }

    activeTabHandler = (active) => {
        this.setState((prevState) => {
            if(prevState.activeTab !== active){
                return {activeTab: active};
            }
            return false;
        })
    }

    sidebarHandler = (isOpen) => {
        this.setState({ isOpen });
    }

    render() {
        const { activeTab, isOpen } = this.state;
        const books = [
            {
                id: "hgcjhgfi",
                title: "New Title 1",
                description: "The description the book New title one is really interesting"
            },
            {
                id: "dhjvjdshv",
                title: "New Title 2",
                description: "The description the book New title one is really interesting"
            },
            {
                id: "hfaschgs",
                title: "New Title 3",
                description: "The description the book New title one is really interesting"
            },
            {
                id: "jdvxjsdngfvj",
                title: "New Title 4",
                description: "The description the book New title one is really interesting"
            },
            {
                id: "jdgvjndfgjv",
                title: "New Title 5",
                description: "The description the book New title one is really interesting"
            },
            {
                id: "jhmbdjfmh",
                title: "New Title 6",
                description: "The description the book New title one is really interesting"
            },
            {
                id: "jhbdxngfdvj",
                title: "New Title 7",
                description: "The description the book New title one is really interesting"
            },
            {
                id: "hnvsngdfjm",
                title: "New Title 8",
                description: "The description the book New title 8"
            },
        ]
        return ( 
        <div className={`${classes["right-sidebar"]} ${isOpen ? classes.activeParent : ""}`}>
            <div className={classes["inner-right-siderbar"]}>
                <div className={classes.tabs}>
                    <div className={
                        `${classes.tab} ${ activeTab === "view" ? classes.active : ""}`
                    } 
                        onClick={() => this.activeTabHandler("view")}
                    >
                        VIEW
                    </div>
                    <div className={
                        `${classes.tab} ${ activeTab === "add" ? classes.active : ""}`
                    }
                        onClick={() => this.activeTabHandler("add")}
                    >
                        ADD
                    </div>
                </div>
                <div className={classes.description}>
                    {
                        activeTab === "view"
                        ? books.map(book => <Book book={book} key={book.id}/>)
                        : <UploadBook />
                    }
                </div>
                <div
                    className={classes.drawer} onClick={() => this.sidebarHandler(!isOpen)}>
                    <span className={ isOpen ? "fa fa-close" : "fa fa-book"}></span>
                </div>
            </div>
        </div>
        )
    }
}
 
export default RightSidebar;