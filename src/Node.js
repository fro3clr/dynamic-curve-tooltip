import React, { Component } from "react";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
  }

  componentDidUpdate() {
    const canvas = this.props.canvas,
      { edit, box } = this.refs;
    if (typeof canvas !== "undefined") {
      this.props.updateCanvas(canvas, edit, box);
    }
  }

  componentDidMount() {
    if (this.props.tooltipPosition) {
      this.computeTooltipPosition();
      window.addEventListener("resize", () => this.computeTooltipPosition());
    }
  }

  computeTooltipPosition() {
    const tooltip = this.refs.edit,
      delimiter = 7,
      maxDynamicPosHeight = 220,
      minDynamicPosHeight = 60,
      maxDynamicPosWidth = 220,
      minDynamicPosWidth = 105;

    let dynamicPositionHeight = window.innerWidth / 12;
    dynamicPositionHeight < minDynamicPosHeight
      ? (dynamicPositionHeight = minDynamicPosHeight)
      : false;
      dynamicPositionHeight > maxDynamicPosHeight
      ? (dynamicPositionHeight = maxDynamicPosHeight)
      : false;

    let dynamicPositionWidth = window.innerWidth / 12;
    dynamicPositionWidth < minDynamicPosWidth
      ? (dynamicPositionWidth = minDynamicPosWidth)
      : false;
      dynamicPositionWidth > maxDynamicPosWidth
      ? (dynamicPositionWidth = maxDynamicPosWidth)
      : false;

    switch (this.props.tooltipPosition) {
      case "top-left":
        tooltip.style.right = dynamicPositionWidth + "px";
        tooltip.style.bottom = dynamicPositionHeight + "px";
        break;

      case "top-right":
        tooltip.style.left = dynamicPositionWidth + "px";
        tooltip.style.bottom = dynamicPositionHeight + "px";
        break;

      case "bottom-left":
        tooltip.style.right = dynamicPositionWidth + "px";
        tooltip.style.top = dynamicPositionHeight + "px";
        break;

      case "bottom-right":
        tooltip.style.left = dynamicPositionWidth + "px";
        tooltip.style.top = dynamicPositionHeight + "px";
        break;

      case "top":
        tooltip.style.bottom = dynamicPositionHeight + "px";
        tooltip.style.left = 82 + "px";
        break;

      case "bottom":
        tooltip.style.top = dynamicPositionHeight + "px";
        tooltip.style.left = 82 + "px";
        break;

      default:
        break;
    }
  }

  handleHover = () => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        <div ref="box" className="box">
          {this.props.tooltipPosition ? (
            <div ref="edit" className={"edit " + this.props.tooltipPosition}>
              <div
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
                className="icon pen"
              />
              <div
                className={
                  this.state.isHovered ? "icon trash active" : "icon trash"
                }
              />
              <div
                className={
                  this.state.isHovered ? "icon camera active" : "icon camera"
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Node;
