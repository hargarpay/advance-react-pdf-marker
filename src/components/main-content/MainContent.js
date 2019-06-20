import React, {Component} from "react";
import NavigationBar from "./navigation-bar/NavigationBar";
import InnerContent from "./inner-content/InnerContent";
import Sidebar from "./sidebar/Sidebar";

import "./MainContent.css";
import ViewBookContext from "../../context/ViewBookContext";

export default class MainContent extends Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = { }

        this.fileUpload = {
            pdfDoc: props.pdfDoc,
            addPDFDoc: this.uploadPDFDoc
        }
    }

    uploadPDFDoc = (payload) => {
        const { onAddPDFDoc } = this.props;
        onAddPDFDoc(payload);
    }

    render(){
        return (
            <>
                <div className={"main-content"}>
                    <ViewBookContext.Consumer>
                        {
                            (currentBook) => (<Sidebar
                                {...this.props}
                                currentBook={currentBook}/>)
                        }
                    </ViewBookContext.Consumer>
                    <div className="submain-content">
                        <div className="narbar-wrapper">
                            <NavigationBar {...this.props}/>
                        </div>
                        <div className="inner-content-wrapper">
                            <InnerContent {...this.props} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}