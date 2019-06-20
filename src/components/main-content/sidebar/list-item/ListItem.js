import React, {Component} from "react";
import "./ListItem.css";

export default class ListItem extends Component{
    constructor(props){
        super();
        this.props = props;
    }

    updateHash = highlight => {
        window.location.hash = `highlight-${highlight.id}`;
    };

    render(){
        const { highlight } = this.props;
        return (
            <div className={"list-item"}>
                <div
            className="sidebar__highlight"
            onClick={() => {
              this.updateHash(highlight);
            }}
          >
            <div>
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
        </div>
                <div className={"action-buttons"}>
                    <button className={"bun btn-danger"}>
                        <span className="fa fa-trash"></span>
                    </button>
                    <button className={"btn-warning"}>
                        <span className="fa fa-edit"></span>
                    </button>
                </div>
            </div>
        )
    }
}