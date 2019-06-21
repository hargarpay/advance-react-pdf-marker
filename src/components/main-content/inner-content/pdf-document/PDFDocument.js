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

import URLSearchParams from "url-search-params";
import Spinner from '../../spinner/Spinner';

import testHighlights from "./test-highlighter";
import { isEqual, isEmpty } from '../../../../helper/utility';
import AddHighlightContext from '../../../../context/AddHighlightContext';


const getNextId = () => `${uuidv4()}`.replace(/-/g, "");

const parseIdFromHash = () => window.location.hash.slice("#highlight-".length);

const resetHash = () => {
    console.log("Scrolling");
  window.location.hash = "";
};

const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf";

const searchParams = new URLSearchParams(window.location.search);
// const url = testHighlights['dataURL'];
const url = searchParams.get("url") || DEFAULT_URL;




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
            highlights: testHighlights[url] ? testHighlights[url].map(
                hightlight => hightlight.annotation
            ) : [],
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
        const {currentBook, annotations, annotation} = this.props;

        if(!isEqual(currentBook, nextProps.currentBook)){
            const {book} = nextProps.currentBook
            this.setState({
                reload: true,
            });

            if(book.refId === 'default'){
                window.setTimeout(() => {
                    this.setState({
                        bookData: url,
                        reload: false,
                        highlights: testHighlights[url]
                    });
                }, 2000)
            }
        }

        if(!isEqual(nextProps.annotation, annotation)){
            const { status } = nextProps.annotation;
            if(status){
                const { payload } = nextProps.annotation
                const {highlights} = this.state;
                const highlight = JSON.parse(payload.annotation);

                this.setState({
                    highlights: [highlight, ...highlights]
                });
            }
        }
        
        if(!isEqual(nextProps.annotations, annotations)){
            const { book } = this.props.currentBook;
            const { status } = nextProps.annotations;
            if(status){
                const { payload } = nextProps.annotations
                const annotations = payload.length === 0 ? [] 
                : payload.map(annot => {
                    const jsonAnn = JSON.parse(annot.annotation);
                    return jsonAnn
                })
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
        const annotation = JSON.stringify({...highlight, id: annotationId});
        const payload = {annotationId, annotation, userId, documentId};

        if(documentId !== 'default'){
            const { onHandleFeedback } = this.context;
            onHandleFeedback(true);
            onAddAnnotation(payload);
        }
        // this.setState({
        //     highlights: [{ ...highlight, id: getNextId() }, ...highlights]
        // });
    }

    updateHighlight(highlightId, position, content) {
        console.log("Updating highlight", highlightId, position, content);
    
        this.setState({
          highlights: this.state.highlights.map(h => {
            return h.id === highlightId
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

        const book = !isEmpty(bookData) ? bookData : url;
        return (
            <>
            {
                !reload ?
            ( <div >
                        <PdfLoader url={book} beforeLoad={<Spinner />}>
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
                    </PdfLoader>
                </div>)
                : <Spinner />
            }
            </>
         );
    }
  }

  PDFDocument.contextType = AddHighlightContext;
   
  export default PDFDocument;