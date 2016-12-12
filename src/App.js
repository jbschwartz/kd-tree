import React, { Component } from 'react';
import { BoundingBox, KDTree, Point } from '@jbschwartz/geometry';
import SVG from './SVG'
import './index.css'
import randoColor from './Colors'

function randomPoint(boundingBox) {

  var randomInteger = (min, max) => Math.floor(Math.random() * (max - min) + min);

  return new Point(
    randomInteger(boundingBox.min.x, boundingBox.max.x),
    randomInteger(boundingBox.min.y, boundingBox.max.y)
  );
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.canvas = new BoundingBox(new Point(0, 0), new Point(1000, 1000));
    this.points = []

    for(var i = 0; i < 100; ++i) this.points.push(randomPoint(this.canvas));

    this.tree = new KDTree(this.points);
  }

  generateGeometry(node, boundingBox) {
    if(!node) {
      this.geometry.cells.push(
        <rect key={"cell_" + this.geometry.cells.length} x={boundingBox.min.x} y={boundingBox.min.y} width={boundingBox.width} height={boundingBox.height} fill={randoColor()} />
      )
      return;
    }

    this.geometry.dots.push(<circle key={this.geometry.dots.length} cx={node.x} cy={node.y} r={3} />)

    let splitLine = {};
    splitLine[node.direction] = node[node.direction];
    const boxes = boundingBox.split(splitLine);

    let line;
    if(node.direction === 'x') {
      line = {
        x1: node.x,
        x2: node.x,
        y1: boundingBox.min.y,
        y2: boundingBox.max.y,
        stroke: "blue"
      };
    } else {
      line = {
        x1: boundingBox.min.x,
        x2: boundingBox.max.x,
        y1: node.y,
        y2: node.y,
        stroke: "red"
      }
    }

    this.geometry.lines.push(<line key={"line_" + this.geometry.lines.length} {... line} strokeWidth={2} />)

    this.generateGeometry(node.left, boxes.low);
    this.generateGeometry(node.right, boxes.high);
  }

  render() {
    this.geometry = { lines: [], dots: [], cells: [] }
    this.generateGeometry(this.tree.root, this.canvas);

    return (
      <div className="App">
        <SVG onClick={null}>
          {this.geometry.cells}
          {this.geometry.lines}
          {this.geometry.dots}
        </SVG>
      </div>
    );
  }
}
