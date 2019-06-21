import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import PDFDocument from './reducers/pdf-document';
import DocAnnotation from './reducers/book-annotations';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    pdfDoc: PDFDocument,
    docAnno: DocAnnotation
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));