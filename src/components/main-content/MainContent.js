import React, {Component} from "react";
import NavigationBar from "./navigation-bar/NavigationBar";
import InnerContent from "./inner-content/InnerContent";
import Sidebar from "./sidebar/Sidebar";

import "./MainContent.css";
import ViewBookContext from "../../context/ViewBookContext";
import AddHighlightContext from "../../context/AddHighlightContext";

export default class MainContent extends Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = { }
    }
    
    render(){
        return (
            <div className={"main-content"}>
                <ViewBookContext.Consumer>
                    {
                        (currentBook) => {
                            return (
                            <AddHighlightContext.Consumer>
                                {
                                    highlightFeedback => (
                                        <Sidebar
                                            {...this.props}
                                            currentBook={currentBook}
                                            highlightFeedback={highlightFeedback}
                                        />
                                    )
                                }
                            </AddHighlightContext.Consumer>
                        )
                            }
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
        )
    }
}