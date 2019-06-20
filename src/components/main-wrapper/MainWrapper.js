
import React, { Component } from 'react';
import MainContent from '../main-content/MainContent';
import AppContext from '../../context/AppContext';
import FileUploadContext from '../../context/FileUploadContext';
import ViewBookContext from '../../context/ViewBookContext'

import RightSidebar from '../right-sidebar/RightSidebar';

class MainWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appContext: {
                user: {
                    id: "8016d69ac5984ff295c8af1e3b034501",
                    name: "Manager",
                    email: "manager@mvp.com",
                    role: "manager"
                },
                switchUser: this.onSwitchUser
            },
            viewBook: {
                book: {},
                changeBook: this.onChangeBook
            }
         }
    }

    onSwitchUser = (user) => {
        const { appContext } = this.state;
        const newAppContext = {...appContext, ...{user}}
        this.setState({
            appContext: newAppContext
        });
    }

    onChangeBook = (book) => {
        const { viewBook } = this.state;
        const newViewBook = {...viewBook, ...{book}};
        this.setState({
            viewBook: newViewBook
        });
    }
    render() {
        const { appContext, viewBook } = this.state;

        return ( 
            <AppContext.Provider  value={appContext}>
                <ViewBookContext.Provider value={viewBook}>
                    <MainContent {...this.props} />
                    <FileUploadContext.Provider value={this.fileUpload}>
                        <RightSidebar {...this.props}/>
                    </FileUploadContext.Provider>
                </ViewBookContext.Provider>
            </AppContext.Provider>
            
         )
    }
}
 
export default MainWrapper;