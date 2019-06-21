import  { createContext } from 'react';


export default createContext({
    feedback: false,
    onHandleFeedback: () => {},
});