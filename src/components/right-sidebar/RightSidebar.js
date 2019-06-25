import React, { Component } from 'react';
import Book from './book/Book';
import UploadBook from './upload-book/UploadBook';
import FileUploadContext from '../../context/FileUploadContext';
import { isEqual } from '../../helper/utility';

import "./RightSidebar.css";
import AppContext from '../../context/AppContext';
import ViewBookContext from '../../context/ViewBookContext';
import Spinner from '../main-content/spinner/Spinner';
class RightSidebar extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            activeTab: "view",
            isOpen: false,
            books: [],
            loading: false,
         }
    }

    componentDidMount(){
        const { onGetPdfDocs } = this.props;
        onGetPdfDocs();
        this.setState({
            loading: true,
        })
    }

    componentWillReceiveProps(prevProps){

        const { pdfDocs } = this.props;
        if(!isEqual(pdfDocs, prevProps.pdfDocs)){
            if(prevProps.pdfDocs.status){
                const newBooks = [...prevProps.pdfDocs.payload];
                this.setState({
                    books: newBooks
                });
            }
            this.setState({
                loading: false,
            })
        }
    }

    activeTabHandler = (active) => {
        this.setState((prevState) => {
            if(prevState.activeTab !== active){
                return {activeTab: active};
            }
            return false;
        });
    }

    sidebarHandler = (isOpen) => {
        this.setState({ isOpen });
    }

    render() {
        const { activeTab, isOpen, books, loading } = this.state;
        const viewBooks = books.length === 0 
        ? (
            <>
            {
                loading ? <Spinner /> : null
            }
            <div className="no-book-available">
                <span className="fa fa-book"></span>
                <p> No Book has been uploaded yet, click on the <strong>ADD</strong> tab to upload book</p>
            </div>
            </>
        )
        : (
            <ViewBookContext.Consumer>
                {
                   (changeBook) => books.map(book => (
                   <Book
                        book={book}
                        onChangeBook={changeBook}
                        key={book.refId}
                    />))
                }
            </ViewBookContext.Consumer>
        )


        return (
        <AppContext.Consumer >
            {
                (appContext) => (
                    <div className={`right-sidebar ${isOpen ? "activeParent" : ""}`}>
                        <div className={"inner-right-siderbar"}>
                            <div className={"tabs"}>
                                <div className={
                                    `tab ${ activeTab === "view" ? "active" : ""}`
                                } 
                                    onClick={() => this.activeTabHandler("view")}
                                >
                                    VIEW
                                </div>
                                <div className={
                                    `tab ${ activeTab === "add" ? "active" : ""}`
                                }
                                    onClick={() => this.activeTabHandler("add")}
                                >
                                    ADD
                                </div>
                            </div>
                            <div className={"description"}>
                                {
                                    activeTab === "view"
                                    ? viewBooks
                                    : (
                                        <FileUploadContext.Consumer>
                                            {
                                                fileUploader => (
                                                    <UploadBook fileUploader={fileUploader} appContext={appContext} {...this.props} />
                                                )
                                            }
                                        </FileUploadContext.Consumer>
                                    )
                                }
                            </div>
                            <div
                                className={"drawer"} onClick={() => this.sidebarHandler(!isOpen)}>
                                <span className={ isOpen ? "fa fa-close" : "fa fa-book"}></span>
                            </div>
                        </div>
                    </div>
                )
            }
        </AppContext.Consumer>
        )
    }
}

RightSidebar.contextType = AppContext;
 
export default RightSidebar;