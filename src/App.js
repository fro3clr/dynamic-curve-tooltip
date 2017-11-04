import React, { Component } from "react";
import Node from "./Node";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null
    };
  }

  componentDidMount() {
    const canvas = document.getElementsByTagName("canvas")[0];
    this.updateDimensions(canvas);
    window.addEventListener("resize", () => this.updateDimensions(canvas));
  }

  updateDimensions(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    Object.keys(this.refs).forEach(key => {
      let { edit, box } = this.refs[key].refs;
      if (edit && box) {
        this.updateCanvas(canvas, edit, box);
      }
    });
  }

  updateCanvas(canvas, edit, box) {
    let b, a, x, y, c, context;
    b = edit;
    a = box;

    let cumulativeOffset = function(element) {
      let top = 0,
        left = 0;
      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top: top,
        left: left
      };
    };

    let offsetB = cumulativeOffset(b);
    let offsetA = cumulativeOffset(a);

    x = offsetB.left + b.offsetWidth / 2;
    y = offsetB.top + b.offsetHeight / 2;
    b = offsetA.left + a.offsetWidth / 2;
    a = offsetA.top + a.offsetHeight / 2;

    context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(x, y);

    if (
      edit.classList.contains("top-left") ||
      edit.classList.contains("top-right")
    ) {
      context.bezierCurveTo(x, y - 50, x + (b - x), y - 50, b, a);
    } else if (
      edit.classList.contains("bottom-left") ||
      edit.classList.contains("bottom-right")
    ) {
      context.bezierCurveTo(x, y + 50, x + (b - x), y + 50, b, a);
    } else {
      context.lineTo(b,a);
    }

    context.lineWidth = 1;
    context.strokeStyle = "#6eb41d";
    context.stroke();
  }

  render() {
    return (
      <div>
        <canvas
          ref={element =>
            !this.state.canvas && element && this.setState({ canvas: element })}
        />
        <div id="wrap">
          <div className="App">
            <Node
              ref="node1"
              className="node first"
              canvas={this.state.canvas}
              updateCanvas={this.updateCanvas}
              tooltipPosition={"top-left"}
            />
            <Node
              ref="node2"
              className="node second"
              canvas={this.state.canvas}
              updateCanvas={this.updateCanvas}
              tooltipPosition={"top-right"}
            />
            <Node
              ref="node3"
              className="node third"
              canvas={this.state.canvas}
              updateCanvas={this.updateCanvas}
              tooltipPosition={"bottom-left"}
            />
            <Node
              ref="node4"
              className="node fourth"
              canvas={this.state.canvas}
              updateCanvas={this.updateCanvas}
              tooltipPosition={"bottom-right"}
            />
          </div>
        </div>

        <div id="another-wrap">
          <div className="App-additional">
            <Node
              ref="griffel"
              className="node griffel"
              canvas={this.state.canvas}
              updateCanvas={this.updateCanvas}
              tooltipPosition={"top-left"}
            />
            <Node
              ref="hagrid"
              className="node hagrid"
              canvas={this.state.canvas}
              updateCanvas={this.updateCanvas}
              tooltipPosition={"top"}
            />
            <Node ref="delacour" className="node delacour" />
            <Node
              ref="malfidus"
              className="node malfidus"
              canvas={this.state.canvas}
              updateCanvas={this.updateCanvas}
              tooltipPosition={"bottom"}
            />
            <Node
              ref="potter"
              className="node potter"
              canvas={this.state.canvas}
              updateCanvas={this.updateCanvas}
              tooltipPosition={"bottom"}
            />
            <Node
              ref="tops"
              className="node tops"
              canvas={this.state.canvas}
              updateCanvas={this.updateCanvas}
              tooltipPosition={"bottom-right"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
