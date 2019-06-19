import React, { Component } from 'react';
import classes from "./Spinner.css";

class Spinner extends Component {
    
    constructor(){
        super();
        this.state = {
            activeClass: ""
        }
    }

    componentDidUpdate(prevProp, nextProps){
        if(prevProp.loading !== nextProps.loading){
            const { loading } = nextProps;;
            const displayLoading = loading ? classes.active: "";
            this.setState({activeClass: displayLoading});
        }
    }
    

    render() {
        
        const { activeClass } = this.state;
    
        

        return ( 
            <div className={`${classes.overlay} ${activeClass}`}>
                <div className={classes.loader}></div>
            </div>
            );
     }
}

Spinner.defaultProps = {
    loading: false
};

 
export default Spinner;