import React, { Component } from 'react';
import uuidv4 from 'uuid/v4'

import {
    PdfHighlighter,
    PdfLoader,
    Tip,
    Highlight,
    Popup,
    AreaHighlight
} from "react-pdf-highlighter/lib/index";

import Spinner from '../../spinner/Spinner';

import { isEqual } from '../../../../helper/utility';
import AddHighlightContext from '../../../../context/AddHighlightContext';

import './PDFDocument.css';

const getNextId = () => `${uuidv4()}`.replace(/-/g, "");

const parseIdFromHash = () => window.location.hash.slice("#highlight-".length);

const resetHash = () => {
    console.log("Scrolling");
  window.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

class PDFDocument extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            highlights: [],
            bookData: null,
            reload: false,
         }
    }

    resetHighlights = () => {
        this.setState({
            highlights: []
        });
    };

    scrollViewerTo = (highlight) => {};

    componentWillReceiveProps(nextProps){
        const {
            currentBook,
            annotations,
            annotation,
            deleteAnnotation
        } = this.props;

        if(!isEqual(currentBook, nextProps.currentBook)){
            // const {book} = nextProps.currentBook
            this.setState({
                reload: true,
            });
        }

        if(!isEqual(nextProps.annotation, annotation)){
            const { status } = nextProps.annotation;
            if(status){
                const { payload } = nextProps.annotation
                const {highlights} = this.state;
                const highlight = JSON.parse(payload.annotation);
                const newHighlight = {...highlight, ...{userId: payload.user_id}}
                this.setState({
                    highlights: [newHighlight, ...highlights]
                });
            }
        }
        
        if(
            !isEqual(nextProps.annotations, annotations)
        ){
            const { book } = this.props.currentBook;
            const { status } = nextProps.annotations;
            if(status){
                const { payload } = nextProps.annotations
                const annotations = payload.length === 0 ? [] 
                : payload.map(annot => {
                    const jsonAnn = JSON.parse(annot.annotation);
                    return {...jsonAnn, ...{userId: annot.user_id}};
                });

                this.setState({
                    bookData: book.document,
                    reload: false,
                    highlights: annotations
                });
            }else{
                this.setState({
                    reload: false,
                })
            }
        }

        if(!isEqual(nextProps.deleteAnnotation, deleteAnnotation)){
            const { status, payload } = nextProps.deleteAnnotation;
            if(status){
                const { highlights } = this.state;
                const newHighlights = highlights
                .filter(item => item.id !== payload.annotation_id);

                this.setState({
                    highlights: newHighlights,
                    reload: false,
                });
            }else{
                this.setState({
                    reload: false,
                });
            }
        }
    }

    scrollToHighlightFromHash = () => {
        const highlight = this.getHighlightById(parseIdFromHash());
        if (highlight) {
            this.scrollViewerTo(highlight);
        }
    };

    componentDidMount() {
        window.addEventListener(
            "hashchange",
            this.scrollToHighlightFromHash,
            false
        );
        
    }

    getHighlightById(id) {
        const { highlights } = this.state;

        return highlights.find(highlight => highlight.id === id);
    }

    addHighlight(highlight) {
        // const { highlights } = this.state;
        const { appContext, currentBook, onAddAnnotation } = this.props;
        const documentId = currentBook.book.refId;
        const annotationId = getNextId();
        const userId = appContext.user.id;
        const annotation = JSON.stringify({...highlight, id: annotationId });
        const payload = {annotationId, annotation, userId, documentId};
        const { onHandleFeedback } = this.context;

        onAddAnnotation(payload);
        onHandleFeedback({status: true, id: annotationId});
    }

    updateHighlight(highlightId, position, content) {
        const { appContext } = this.props;
        const { id, role } = appContext.user;
        
        this.setState({
          highlights: this.state.highlights.map(h => {
            return h.id === highlightId && (h.userId === id || role === 'manager' )
              ? {
                  ...h,
                  position: { ...h.position, ...position },
                  content: { ...h.content, ...content }
                }
              : h;
          })
        });
      }

    render() { 
        const { highlights, bookData, reload } = this.state;

        // const book = !isEmpty(bookData) ? bookData : url;
        const book = bookData;
        const displayContent = book !== null ?
        ( <PdfLoader url={book} beforeLoad={<Spinner />}>
            {
                pdfDocument => (
                <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={resetHash}
                scrollRef={scrollTo => {
                    this.scrollViewerTo = scrollTo;
                    console.log("Scrolling Ref")

                    this.scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                    position,
                    content,
                    hideTipAndSelection,
                    transformSelection
                ) => (
                    <Tip
                    onOpen={transformSelection}
                    onConfirm={comment => {
                        this.addHighlight({ content, position, comment });
                        hideTipAndSelection();
                    }}
                />
                )}
                highlightTransform={(
                    highlight,
                    index,
                    setTip,
                    hideTip,
                    viewportToScaled,
                    screenshot,
                    isScrolledTo
                ) => {
                    const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                    );

                    const component = isTextHighlight ? (
                    <Highlight
                        isScrolledTo={isScrolledTo}
                        position={highlight.position}
                        comment={highlight.comment}
                    />
                    ) : (
                    <AreaHighlight
                        highlight={highlight}
                        onChange={boundingRect => {
                        this.updateHighlight(
                            highlight.id,
                            { boundingRect: viewportToScaled(boundingRect) },
                            { image: screenshot(boundingRect) }
                        );
                        }}
                    />
                    );

                    return (
                    <Popup
                        popupContent={<HighlightPopup {...highlight} />}
                        onMouseOver={popupContent =>
                        setTip(highlight, highlight => popupContent)
                        }
                        onMouseOut={hideTip}
                        key={index}
                        children={component}
                    />
                    );
                }}
                highlights={highlights}
                />
            )
            }
        </PdfLoader>)
        : (
            <div className="information">
                <div className="wrapper">
                    <div className="heading">
                        <h3>How to Use</h3>
                    </div>
                    <div className="description">
                        <ul>
                            <li>Click <span className="fa fa-book"></span> icon on the left side of the page to view panel to upload and view books</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
        return (
            <>
            {
                !reload ?
                displayContent
                : <Spinner />
            }
            </>
         );
    }
  }

  PDFDocument.contextType = AddHighlightContext;
   
  export default PDFDocument;