import * as actionTypes from "../action/actionTypes";

const initialState = {
    document: {},
    documents: []
}

const reducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PDF_DOCUMENT:
            return {
                ...state,
                ...{ document: {...action.document}}
            }
        case actionTypes.GET_PDF_DOCUMENTS:
            return {
                ...state,
                ...{ documents: {...action.documents}}
            }
        default:
            return state;
    }
}

export default reducer;