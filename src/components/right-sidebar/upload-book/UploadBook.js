import React, { Component } from 'react';
import { isEmpty, isEqual } from '../../../helper/utility';

import "./UploadBook.css";
import Notification from '../../notification/Notification';

class UploadBook extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fileUpload: null,
            title: "",
            description: "",
            dataBase64: null,
            placeholder: null,
            filename: "filename",
            error: false,
            success: false,
            errorMessage: [],
            successMessage: [],
            loading: false,
            userTitle: false,
            userDescription: false,
         }
    }

    componentWillReceiveProps(prevProps){
        const { pdfDoc } = this.props;
        if(!isEqual(pdfDoc, prevProps.pdfDoc)){
            if(prevProps.pdfDoc.status){
                this.setState(
                    { 
                        title: "",
                        description: "",
                        dataBase64: null,
                        filename: "filename",
                        error: false,
                        success: true,
                        errorMessage: [],
                        successMessage: ["You have successfully uploaded the PDF Document"],
                        loading: false,
                        userTitle: false,
                        userDescription: false,
                     }
                )
            }else{
                this.setState({
                    error: true,
                    errorMessage: [prevProps.pdfDoc.message]
                })
            }

            this.setState({
                loading: false
            })
        }
    }

    componentWillUnmount(){
        const { onGetPdfDocs } = this.props;
        onGetPdfDocs();
    }

    onChangeHandler = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    onAddPDFDocument = () => {
        const {title, description, dataBase64} = this.state;
        const { fileUploader, appContext } = this.props;
        const { user } = appContext;
        const { addPDFDoc } = fileUploader;

        this.setState({
            loading: true
        });
        addPDFDoc({title, description, dataBase64, userId: user.id});
    }

    fileInputRef = (element) => {
        if(element !== null){
            this.setState({
                fileUpload: element
            });
        }
    }

    getPlaceholderRef = (element) => {
        if(element !== null){
            this.setState({
                placeholder: element
            });
        }
    }

    fileUploadHandler = () => {
        const { fileUpload } = this.state;
        fileUpload.click();
    }

    fileUploadChangeHandler = (event) => {
       const file = event.target.files[0];
       this.fileDocProcessing(file);
    }

    fileDocProcessing = (file) => {
        const { title, description } = this.state;
        if(isEmpty(file)){
            const {
                title, description, userTitle, userDescription,
            } = this.state;
            const messages = ["You have not selected any file"];
            this.setState({
                error: true,
                errorMessage: messages,
                filename: "filename",
                dataBase64: null,
                title: userTitle ? title : "",
                description: userDescription ? description : "",
            });
            return false;
        }

        const ext = this.getFileExtenstion(file.name)
        if(!this.allowedExtension(["pdf"], ext)){
            const {
                title, description, userTitle, userDescription,
            } = this.state;
            const messages = ["only pdf document is allowed"];
            this.setState({
                error: true,
                errorMessage: messages,
                filename: "filename",
                dataBase64: null,
                title: userTitle ? title : "",
                description: userDescription ? description : "",
            });
            return false;
        }
        
        if(this.exceedMaxSize(file.size)){
            const {
                title, description, userTitle, userDescription,
            } = this.state;
            const messages = ["Your file is bigger than 3MB"];
            this.setState({
                error: true,
                errorMessage: messages,
                filename: "filename",
                dataBase64: null,
                title: userTitle ? title : "",
                description: userDescription ? description : "",
            });
            return false;
        }
        this.renderPDFtoBase64(file);
        const userTitle = title.length > 0;
        const userDescription = title.length > 0;
        const newTitle = !userTitle ? `${file.name}`.substr(0, 30) : title;
        const newDescription = !userDescription ? file.name : description;

        this.setState({
            title: newTitle,
            description: newDescription,
            userDescription,
            userTitle
        })

    }

    getFileExtenstion = (filename) => {
        return filename.split(".").pop().toLowerCase();
    }

    exceedMaxSize = (size) => {
        return size > (3 * 1024 * 1204);
    }

    allowedExtension = (allowExts, fileExt) => {
        return allowExts.indexOf(fileExt)  > -1;
    }

    renderPDFtoBase64 = (file) =>{
        const reader = new FileReader();

        reader.onload = (e) => {
            const rawData = reader.result;
            this.setState({
                dataBase64: rawData,
                filename: file.name
            })
        }

        reader.readAsDataURL(file);
    }

    notificationClose = () => {
        this.setState({
            errorMessage: [],
            successMessage: [],
            error: false,
            success: false,
        })
    }

    render() {
        const {
            title,
            description,
            dataBase64,
            filename,
            error,
            errorMessage,
            loading,
            success,
            successMessage,
        } = this.state;


        return (
            <>
            {
                error ?
                <Notification
                    heading="Error Message"
                    type="danger" 
                    messages={errorMessage}
                    active={true}
                    onClose={this.notificationClose}
                /> : null
            }
            {
                success ?
                <Notification
                    heading="Success Message"
                    type="success" 
                    messages={successMessage}
                    active={true}
                    onClose={this.notificationClose}
                /> : null
            }
            <form className={"form"}>
                <div className={"field"} >
                    <div className={"input"}>
                        <input
                            type="text"
                            name="title"
                            placeholder="PDF Document Title (optional)"
                            onChange={(event) => this.onChangeHandler(event)}
                            value={title}
                        />
                    </div>
                </div>
                <div className={"field"} >
                    <div className={"textarea"}>
                        <textarea
                            name="description"
                            placeholder="PDF Document Description (Optional)"
                            onChange={(event) => this.onChangeHandler(event)}
                            row={5}
                            col={10}
                            value={description}
                        ></textarea>
                    </div>
                </div>
                <div className={"field"}>
                    <div className={"placeholder"} ref={this.getPlaceholderRef}>
                        {filename}
                    </div>
                </div>
                <div className={"field"} >
                    <div className={"file"}>
                        <button
                         type="button"
                            className="btn btn-block btn-info"
                            onClick={this.fileUploadHandler}
                        >
                            <span className="fa fa-file-pdf-o"></span> UPLOAD PDF
                        </button>
                        <input
                            type="file"
                            name="pdf_document"
                            ref={this.fileInputRef}
                            className="hidden"
                            accept="application/pdf"
                            onChange={(event) => this.fileUploadChangeHandler(event)}
                        />
                    </div>
                </div>
                <div className={"field"}>
                    <button
                        type="button"
                        className={`btn btn-block btn-info 
                         ${dataBase64 === null ? "disabled" : ""} 
                         loading-btn"]} 
                         ${loading ? "running" : "" }
                        `
                        }
                        disabled={dataBase64 === null}
                        onClick={this.onAddPDFDocument}
                    > ADD DOCUMENT 
                    <span className="spin"></span></button>
                </div>
            </form>
            </>
         )
    }
}

 
export default UploadBook;