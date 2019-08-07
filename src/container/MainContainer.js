import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionDocument from "../store/action/pdf-document"
import * as actionAnnotation from '../store/action/book-annotation';
import MainWrapper from '../components/main-wrapper/MainWrapper';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        window.addEventListener("message", function(event){
            this.console.log(event);
        }, false);

    }

    // Called sometime after postMessage is called
    receiveMessage(event)
    {
        console.log(event);
    }
    render() {
        return (
            <MainWrapper {...this.props} />
            )
    }
}

const mapStateToProps = state => {
    return {
        pdfDoc: state.pdfDoc.document,
        pdfDocs: state.pdfDoc.documents,
        annotation: state.docAnno.annotation,
        annotations: state.docAnno.annotations,
        updateAnnotation: state.docAnno.updateAnnotation,
        deleteAnnotation: state.docAnno.deleteAnnotation,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPDFDoc: (payload) => dispatch(actionDocument.addPdfDocument(payload)),
        onGetPdfDocs: () => dispatch(actionDocument.getPdfDocuments()),
        onAddAnnotation: (payload) => dispatch(actionAnnotation.addDocAnnotation(payload)),
        onGetAnnotations: (docId) => dispatch(actionAnnotation.getDocAnnotations(docId)),
        onUpdateAnnotation: (payload) => dispatch(actionAnnotation.updateDocAnnotation(payload)),
        onDeleteAnnotation: (payload) => dispatch(actionAnnotation.deleteDocAnnotation(payload)),
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

