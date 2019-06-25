import  { createContext } from 'react';


export default createContext({
    feedback: {
        status: false,
        id: null
    },
    onHandleFeedback: () => {},
});