import * as actionTypes from "../action/actionTypes";

const initialState = {
    annotation: {},
    annotations: [],
    updateAnnotation: {},
    deleteAnnotation: {},

}

const reducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_DOCUMENT_ANNOTATIONS:
            return {
                ...state,
                ...{ annotation: {...action.annotation}}
            }
        case actionTypes.GET_DOCUMENT_ANNOTATIONS:
            return {
                ...state,
                ...{ annotations: {...action.annotation}}
            }
        case actionTypes.UPDATE_DOCUMENT_ANNOTATIONS:
            return {
                ...state,
                ...{ updateAnnotation: {...action.annotation}}
            }
        case actionTypes.DELETE_DOCUMENT_ANNOTATIONS:
            return {
                ...state,
                ...{ deleteAnnotation: {...action.annotation}}
            }
        default:
            return state;
    }
}

export default reducer;