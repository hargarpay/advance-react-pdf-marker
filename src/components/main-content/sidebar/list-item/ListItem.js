import React, {Component} from "react";
import "./ListItem.css";
import { isEqual } from "../../../../helper/utility";

export default class ListItem extends Component{
    constructor(props){
        super();
        this.props = props;
        const { user } = props.appContext;
        this.state = { user }
    }

    componentWillReceiveProps(nextProps){
      const { appContext } = this.props;
      if(!isEqual(appContext, nextProps.appContext)){
        const { user } = nextProps.appContext;
        this.setState({user})
      }
    }

    updateHash = highlight => {
        window.location.hash = `highlight-${highlight.annotation.id}`;
    };

    showActionBtns = (user, userId) => {
      return user.role === 'manager' || user.id === userId;
    }

    render(){
        const { highlight } = this.props;
        const { user } = this.state;
        const {annotation} = highlight;
        return (
            <div className={"list-item"}>
              <div
                className="sidebar__highlight"
                onClick={() => {
                  this.updateHash(highlight);
                }}
              >
                  <div>
                    <strong>{annotation.comment.text}</strong>
                    {annotation.content.text ? (
                      <blockquote style={{ marginTop: "0.5rem" }}>
                        {`${annotation.content.text.slice(0, 90).trim()}…`}
                      </blockquote>
                    ) : null}
                    {annotation.content.image ? (
                      <div
                        className="highlight__image"
                        style={{ marginTop: "0.5rem" }}
                      >
                        <img src={annotation.content.image} alt={"Screenshot"} />
                      </div>
                    ) : null}
                  </div>
                  <div className="highlight__location">
                    Page {annotation.position.pageNumber}
                  </div>
              </div>
              {
                this.showActionBtns(user, highlight.userId) ? (
                  <div className={"action-buttons"}>
                      <button className={"bun btn-danger"}>
                          <span className="fa fa-trash"></span>
                      </button>
                      <button className={"btn-warning"}>
                          <span className="fa fa-edit"></span>
                      </button>
                  </div>
                ) : null
              }
            </div>
        )
    }
}