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
    if (canvas) {
      this.props.updateCanvas(canvas, edit, box);
    }
  }

  componentDidMount() {
    this.computeTooltipPosition();
    window.addEventListener("resize", () => this.computeTooltipPosition());
  }

  computeTooltipPosition() {
    const tooltip = this.refs.edit,
      delimiter = 7,
      maxDynamicPos = 220,
      minDynamicPos = 85;

    let dynamicPosition = window.innerWidth / 10;
    dynamicPosition < minDynamicPos ? (dynamicPosition = minDynamicPos) : false;
    dynamicPosition > maxDynamicPos ? (dynamicPosition = maxDynamicPos) : false;

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

  handleHover = () => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        <div ref="box" className="box">
          <div ref="edit" className={"edit " + this.props.tooltipPosition}>
            <div
              onMouseEnter={this.handleHover}
              onMouseLeave={this.handleHover}
              className="icon pen"
            />
            <div className={this.state.isHovered ? "icon trash active" : "icon trash"} />
            <div
              className={this.state.isHovered ? "icon camera active" : "icon camera"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Node;
