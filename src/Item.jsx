import React, { Component } from "react";
import "./Item.css";

class Item extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDown = this.handleDown.bind(this);
  }

  handleClick() {
    this.props.upVote(this.props.id);
  }

  handleDown() {
    this.props.downVote(this.props.id);
  }

  getColor() {
    if (this.props.total >= 15) {
      return "#4CAF50";
    } else if (this.props.total >= 12) {
      return "#8BC34A";
    } else if (this.props.total >= 9) {
      return "#CDDC39";
    } else if (this.props.total >= 6) {
      return "#FFEB3B";
    } else if (this.props.total >= 3) {
      return "#FFC107";
    } else if (this.props.total >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  }
  getEmoji() {
    if (this.props.total >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.total >= 12) {
      return "em em-laughing";
    } else if (this.props.total >= 9) {
      return "em em-smiley";
    } else if (this.props.total >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.total >= 3) {
      return "em em-neutral_face";
    } else if (this.props.total >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  render() {
    return (
      <div className="joke-container">
        <div className="counter">
          <i className="fas fa-arrow-up up" onClick={this.handleClick} />
          <div className="circle" style={{ borderColor: this.getColor() }}>
            {this.props.total}
          </div>

          <i className="fas fa-arrow-down down" onClick={this.handleDown} />
        </div>
        <div className="joke-text">{this.props.value}</div>

        <div className="emoji">
          <i className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}

export default Item;
