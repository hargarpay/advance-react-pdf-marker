import * as actionTypes from './actionTypes';
export const getDocAnnotations = (docId) => {
    return  async (dispatch) => {

            const url = `http://localhost:5000/get_pdf_annotations/${docId}`;
            try{
    
                const res = await fetch(url);
                const result = await res.json();
                
               dispatch({
                    type: actionTypes.GET_DOCUMENT_ANNOTATIONS,
                    annotation: result
                });
            }catch(e){
                console.log(e);
            }

    }
}

export const addDocAnnotation = (payload) => {
    return  async (dispatch) => {

            const url = "http://localhost:5000/create_pdf_annotation";
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
                         type: actionTypes.CREATE_DOCUMENT_ANNOTATIONS,
                         annotation: result
                     });
            }catch(e){
                console.log(e);
            }

    }
}

export const updateDocAnnotation = (payload) => {
    return  async (dispatch) => {
        const url = "http://localhost:5000/update_pdf_annotation";
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
                type: actionTypes.UPDATE_DOCUMENT_ANNOTATIONS,
                annotation: result
            });
        }catch(e){
            console.log(e);
        }
    }
}

export const deleteDocAnnotation = (payload) => {
    return  async (dispatch) => {
        const url = "http://localhost:5000/delete_pdf_document";
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
                type: actionTypes.DELETE_DOCUMENT_ANNOTATIONS,
                annotation: result
            });
        }catch(e){
            console.log(e);
        }
    }
}