import React, { Component } from 'react';
import classes from "./Notication.css";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activate: false
         }
         this.clearSetTimout = null;
         this.clearAnimationTimeOut = null;
    }

    componentDidMount(){
        const { active } = this.props;
        this.setState(
            {activate: active}
        );

        this.clearSetTimout = setTimeout(() => {
            this.activateNotification(false);
        }, 7000);
    }

    activateNotification = (status) => {
        const { onClose } = this.props;
        this.setState(
            {activate: status}
        );
        // After one second that the notication is clode
        // Remove the component
        this.clearAnimationTimeOut = setTimeout(() => {
            onClose();
        }, 1000);
        

    }

    onDeactivateWithBtn = () => {
        this.activateNotification(false);
        clearTimeout(this.clearSetTimout);
    }

    componentWillUnmount(){
        // Clear the auto setTime Out
        clearTimeout(this.clearSetTimout);

        // Clear the set Timeout responsible for closing the component
        clearTimeout(this.clearAnimationTimeOut);
    }

    render() { 
        const {heading, messages, type} = this.props;
        const { activate } = this.state;
        return (
            <div className={`${classes.notification} ${classes[type]} ${activate ? classes.active : null}`} >
                <div className={classes.header}>
                    <div className={classes.head}>
                        {heading}
                    </div>
                    <div className={classes.close} onClick={this.onDeactivateWithBtn}>
                        <span className="fa fa-close"></span>
                    </div>
                </div>
                <div className={classes.content}>
                    <ul>
                        {
                            Array.isArray(messages)
                             ? messages.map(message => (<li key={`${+new Date()}-${Math.random() * 20}`}>{message}</li>))
                             : null
                        }
                    </ul>
                </div>
            </div>
          )
    }
}



export default Notification;