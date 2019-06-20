import * as actionTypes from "./actionTypes";

export const addPdfDocument = (payload) => {
    return  async (dispatch) => {
        const url = "http://localhost:5000/upload_file";
        try{

            const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            const result = await res.json();

           dispatch({
                type: actionTypes.ADD_PDF_DOCUMENT,
                document: result
            });
        }catch(e){
            console.log(e);
        }

    }
}

export const getPdfDocuments = () => {
    return  async (dispatch) => {
        const url = "http://localhost:5000/get_pdf_documents";
        try{

            const res = await fetch(url);
            const result = await res.json();
            
           dispatch({
                type: actionTypes.GET_PDF_DOCUMENTS,
                documents: result
            });
        }catch(e){
            console.log(e);
        }

    }
}