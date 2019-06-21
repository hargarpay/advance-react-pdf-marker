import React, { Component } from 'react';
import PDFDocument from './pdf-document/PDFDocument';

import "./InnerContent.css";
import ViewBookContext from '../../../context/ViewBookContext';
import AppContext from '../../../context/AppContext';


class InnerContent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            highlights:[]
         }
    }

    render() { 
        return (
          <AppContext.Consumer>
            {
              (appContext) => (
                <div className="inner-content">
                  <ViewBookContext.Consumer>
                      {
                        (currentBook) => (
                              <PDFDocument
                                {...this.props}
                                currentBook={currentBook}
                                appContext={appContext}
                              />
                            )
                      }
                  </ViewBookContext.Consumer>
                  
                </div>
              )
            }
          </AppContext.Consumer>
         );
    }
}
 
export default InnerContent;