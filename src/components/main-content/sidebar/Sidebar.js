import React, {Component} from "react";
import ListItem from "./list-item/ListItem";

import  "./Sidebar.css";
import { isEqual } from "../../../helper/utility";

import testHighlights from "../inner-content/pdf-document/test-highlighter"

const url = "https://arxiv.org/pdf/1708.08021.pdf"

export default class Sidebar extends Component{
    constructor(props){
        super();
        this.props = props;
        this.state = {
            bookHighlights: testHighlights[url] || []
        }
    }

    componentWillReceiveProps(nextProps){
        const { currentBook } = this.props
        if(!isEqual(nextProps.currentBook, currentBook)){
            console.log(nextProps.currentBook);
        }
    }

    render(){
        const { bookHighlights } = this.state;

        return (
            <div className="sidebar">
                <div className="info-message">
                    <p>
                        <small>
                            To create area highlight hold ⌥ Option key (Alt), then click and
                            drag.
                        </small>
                    </p>
                </div>
                {
                    bookHighlights.map(item => <ListItem key={item.id} highlight={item} />)
                }
            </div>
        )
    }
}
