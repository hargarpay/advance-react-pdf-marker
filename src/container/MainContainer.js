import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionDocument from "../store/action/pdf-document"
import MainWrapper from '../components/main-wrapper/MainWrapper';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
        pdfDocs: state.pdfDoc.documents
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPDFDoc: (payload) => dispatch(actionDocument.addPdfDocument(payload)),
        onGetPdfDocs: () => dispatch(actionDocument.getPdfDocuments()),
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

