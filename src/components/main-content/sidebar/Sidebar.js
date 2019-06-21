import React, {Component} from "react";
import ListItem from "./list-item/ListItem";

import  "./Sidebar.css";
import { isEqual } from "../../../helper/utility";

import testHighlights from "../inner-content/pdf-document/test-highlighter"
import Spinner from "../spinner/Spinner";
import AppContext from "../../../context/AppContext";

const url = "https://arxiv.org/pdf/1708.08021.pdf"

export default class Sidebar extends Component{
    constructor(props){
        super();
        this.props = props;
        this.state = {
            bookHighlights: testHighlights[url] || [],
            reload: false,
            highlightFeeds: false
        }
    }

    componentWillReceiveProps(nextProps){
        const {
            currentBook,
            annotations,
            annotation,
            highlightFeedback,
        } = this.props
        if(!isEqual(nextProps.currentBook, currentBook)){
            const { refId } = nextProps.currentBook.book;
            this.setState({
                reload: true,
            })
            if(refId === 'default'){
                window.setTimeout(() => {
                    this.setState({
                        bookHighlights: testHighlights[url] ,
                        reload: false,
                    });
                }, 2000)
            }else{
                const { onGetAnnotations } = this.props
                onGetAnnotations(refId);

            }
        }

        if(!isEqual(nextProps.annotation, annotation)){
            const { status } = nextProps.annotation;
            if(status){
                const { payload } = nextProps.annotation
                const {bookHighlights} = this.state;
                const jsonAnn = JSON.parse(payload.annotation);

                const highlight = {...payload, ...{annotation: jsonAnn}};

                this.setState({
                    bookHighlights: [highlight, ...bookHighlights],
                    highlightFeeds: false
                });
            }
        }

        if(!isEqual(nextProps.annotations, annotations)){
            // const { book } = this.props.currentBook;
            const { status } = nextProps.annotations;
            if(status){
                const { payload } = nextProps.annotations;
                const annotations = payload.length === 0 ? [] 
                : payload.map(annot => {
                    const jsonAnn = JSON.parse(annot.annotation);

                    return {...annot, ...{annotation: jsonAnn}}
                })
                this.setState({
                    bookHighlights: annotations,
                    reload: false,
                });
            }else{
                this.setState({
                    reload: false,
                })
            }
        }

        if(!isEqual(nextProps.highlightFeedback, highlightFeedback)){
            const { feedback } = nextProps.highlightFeedback;
            this.setState({
                highlightFeeds: feedback
            })
        }
    }

    render(){
        const { bookHighlights, reload, highlightFeeds } = this.state;
        
        return (
            <div className="sidebar">
                <div className={`info-message loader ${highlightFeeds ? 'running' : ''}`}>
                    <p>
                        <small>
                            To create area highlight hold ⌥ Option key (Alt), then click and
                            drag.
                        </small>
                    </p>
                    <span className="spin"></span>
                </div>
                {
                  !reload ?
                    (
                        <AppContext.Consumer>
                            {
                                appContext => (
                                    bookHighlights.map(item => <ListItem key={item.annotation_id} appContext={appContext} highlight={item} />)
                                )
                            }
                        </AppContext.Consumer>
                    )
                    : <Spinner />
                }
            </div>
        )
    }
}
