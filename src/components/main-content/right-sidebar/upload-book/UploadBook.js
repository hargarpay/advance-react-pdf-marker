import React, { Component } from 'react';
import classes from "./UploadBook.css";
import Notification from '../../../notification/Notification';

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
            errorMessage: [],
            loading: false,
         }
    }

    onChangeHandler = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
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
        const ext = this.getFileExtenstion(file.name)
        if(!this.allowedExtension(["pdf"], ext)){
            const messages = ["only pdf document is allowed"];
            this.setState({
                error: true,
                errorMessage: messages
            });
            return false;
        }
        this.renderPDFtoBase64(file);
        const newTitle = title.length === 0 ? `${file.name}`.substr(0, 30) : title;
        const newDescription = description.length === 0 ? file.name : description;

        this.setState({
            title: newTitle,
            description: newDescription
        })

    }

    getFileExtenstion = (filename) => {
        return filename.split(".").pop().toLowerCase();
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
            messages: [],
            error: false
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
            loading
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
            <form className={classes.form}>
                <div className={classes.field} >
                    <div className={classes.input}>
                        <input
                            type="text"
                            name="title"
                            placeholder="PDF Document Title (optional)"
                            onChange={(event) => this.onChangeHandler(event)}
                            value={title}
                        />
                    </div>
                </div>
                <div className={classes.field} >
                    <div className={classes.textarea}>
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
                <div className={classes.field}>
                    <div className={classes.placeholder} ref={this.getPlaceholderRef}>
                        {filename}
                    </div>
                </div>
                <div className={classes.field} >
                    <div className={classes.file}>
                        <button
                         type="button"
                            className={
                                `${classes.btn} ${classes["btn-block"]} ${classes["btn-info"]}`
                            }
                            onClick={this.fileUploadHandler}
                        >
                            <span className="fa fa-file-pdf-o"></span> UPLOAD PDF
                        </button>
                        <input
                            type="file"
                            name="pdf_document"
                            ref={this.fileInputRef}
                            className={classes.hidden}
                            accept="application/pdf"
                            onChange={(event) => this.fileUploadChangeHandler(event)}
                        />
                    </div>
                </div>
                <div className={classes.field}>
                    <button
                        type="button"
                        className={
                        `${classes.btn} ${classes["btn-block"]} ${classes["btn-info"]}
                         ${dataBase64 === null ? classes.disabled : ""} 
                         ${classes["loading-btn"]} 
                         ${loading ? classes.running : "" }
                        `
                        }
                        disabled={dataBase64 === null}
                    > ADD DOCUMENT 
                    <span className={classes.spin}></span></button>
                </div>
            </form>
            </>
         )
    }
}
 
export default UploadBook;