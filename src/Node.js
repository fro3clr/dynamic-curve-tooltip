import React, { Component } from "react";

class Node extends Component {
  componentDidUpdate() {
    const canvas = this.props.canvas,
      { edit, box } = this.refs;
    if (canvas) {
      this.props.updateCanvas(canvas, edit, box);
    }
  }

  componentDidMount() {
    this.computeTooltipPosition();
    window.addEventListener("resize", () => this.computeTooltipPosition());
  }

  computeTooltipPosition() {
    const tooltip = this.refs.edit;

    let dynamicPosition = window.innerWidth / 7;
    dynamicPosition < 85 ? (dynamicPosition = 85) : false;

    switch (this.props.tooltipPosition) {
      case "top-left":
        tooltip.style.right = tooltip.style.bottom = dynamicPosition + "px";
        break;

      case "top-right":
        tooltip.style.left = tooltip.style.bottom = dynamicPosition + "px";
        break;

      case "bottom-left":
        tooltip.style.right = tooltip.style.top = dynamicPosition + "px";
        break;

      case "bottom-right":
        tooltip.style.left = tooltip.style.top = dynamicPosition + "px";
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div ref="box" className="box">
          <div ref="edit" className={"edit " + this.props.tooltipPosition} />
        </div>
      </div>
    );
  }
}

export default Node;
