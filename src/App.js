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
      return;
    }

    let splitLine = {};
    splitLine[direction] = node.node[direction];
    const boxes = boundingBox.split(splitLine);

    if(direction === 'x') {
      this.lines.push(
        <line key={Math.random()} x1={node.node.x} y1={boundingBox.min.y} x2={node.node.x} y2={boundingBox.max.y} strokeWidth={2} stroke={"blue"} />
      )

      this.drawLines(node.left, 'y', boxes.low);
      this.drawLines(node.right, 'y', boxes.high);
    } else {
      this.lines.push(
        <line key={Math.random()} x1={boundingBox.min.x} y1={node.node.y} x2={boundingBox.max.x} y2={node.node.y} strokeWidth={2} stroke={"red"}/>
      )

      this.drawLines(node.left, 'x', boxes.low);
      this.drawLines(node.right, 'x', boxes.high);
    }
  }

  drawBox(node, direction, boundingBox) {
    if(!node) {
      return <rect x={boundingBox.min.x} y={boundingBox.min.y} width={boundingBox.width} height={boundingBox.height} fill={randoColor()} />
    }

    let splitLine = {};
    splitLine[direction] = node.node[direction];
    const boxes = boundingBox.split(splitLine);

    if(direction === 'x') {
      return (
        <g>
          {this.drawBox(node.left, 'y', boxes.low)}
          {this.drawBox(node.right, 'y', boxes.high)}
        </g>
      )
    } else {
      return (
        <g>
          {this.drawBox(node.left, 'x', boxes.low)}
          {this.drawBox(node.right, 'x', boxes.high)}
        </g>
      )
    }
  }

  render() {
    this.lines = [];

    const output = this.points.map((point, index) => {
      return <circle key={index} cx={point.x} cy={point.y} r={3} />
    });

    let boundingBox = new BoundingBox(new Point(0, 0), new Point(1000, 1000));

    this.drawLines(this.tree, 'x', boundingBox);
    const output3 = this.drawBox(this.tree, 'x', boundingBox);

    return (
      <div className="App">
        <SVG onClick={null}>
          {output3}
          {this.lines}
          {output}
        </SVG>
      </div>
    );
  }
}
