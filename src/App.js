import React, { Component } from 'react';
import {next, segment, kd} from './KD'
import {BoundingBox, Point} from '@jbschwartz/geometry';
import SVG from './SVG'
import './index.css'
import randoColor from './Colors'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.points = []

    var f = () => Math.floor(Math.random()*1000)

    for(var i = 0; i < 100; ++i) {
      this.points.push(new Point(f(), f()));
    }
    this.tree = kd(this.points);
  }

  drawLines(node, direction, boundingBox) {
    if(!node) {
      this.cells.push(
        <rect key={"cell_" + this.cells.length} x={boundingBox.min.x} y={boundingBox.min.y} width={boundingBox.width} height={boundingBox.height} fill={randoColor()} />
      )
      return;
    }

    let splitLine = {};
    splitLine[direction] = node.node[direction];
    const boxes = boundingBox.split(splitLine);

    if(direction === 'x') {
      this.lines.push(
        <line key={"line_" + this.lines.length} x1={node.node.x} y1={boundingBox.min.y} x2={node.node.x} y2={boundingBox.max.y} strokeWidth={2} stroke={"blue"} />
      )
    } else {
      this.lines.push(
        <line key={"line_" + this.lines.length} x1={boundingBox.min.x} y1={node.node.y} x2={boundingBox.max.x} y2={node.node.y} strokeWidth={2} stroke={"red"}/>
      )
    }

    const newDirection = (direction == 'x') ? 'y' : 'x';

    this.drawLines(node.left, newDirection, boxes.low);
    this.drawLines(node.right, newDirection, boxes.high);
  }

  render() {
    this.lines = [];
    this.cells = [];

    const output = this.points.map((point, index) => {
      return <circle key={index} cx={point.x} cy={point.y} r={3} />
    });

    let boundingBox = new BoundingBox(new Point(0, 0), new Point(1000, 1000));

    this.drawLines(this.tree, 'x', boundingBox);

    return (
      <div className="App">
        <SVG onClick={null}>
          {this.cells}
          {this.lines}
          {output}
        </SVG>
      </div>
    );
  }
}
