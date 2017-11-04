import React, { Component } from "react";

class Node extends Component {
  componentDidUpdate() {
    const canvas = this.props.canvas,
      { edit, box } = this.refs;
    if (canvas) {
      this.props.updateCanvas(canvas, edit, box);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div ref="edit" className="edit" />
        <div ref="box" className="box" />
      </div>
    );
  }
}

export default Node;
