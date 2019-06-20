import React, { Component } from 'react';
import PDFDocument from './pdf-document/PDFDocument';

import "./InnerContent.css";
import ViewBookContext from '../../../context/ViewBookContext';


class InnerContent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            highlights:[]
         }
    }

    render() { 
        return ( 
            <div className="inner-content">
              <ViewBookContext.Consumer>
                  {
                    (currentBook) => <PDFDocument {...this.props} currentBook={currentBook} />
                  }
              </ViewBookContext.Consumer>
              
            </div>
         );
    }
}
 
export default InnerContent;