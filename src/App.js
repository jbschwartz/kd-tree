import React, { Component } from 'react';
import {next, segment, kd} from './KD'
import {Point} from '@jbschwartz/geometry';
import SVG from './SVG'
import './index.css'
import randoColor from './Colors'

function printTree(tree) {
  console.log(`(${tree.node.x}, ${tree.node.y})`);
  let node = tree.node;
  let children = [tree.left, tree.right];
  while(true) {
    if(children.length == 0) break;
    let newChildren = []
    children.forEach(child => {
      console.log(`(${child.node.x}, ${child.node.y})`);
      if(child.left) newChildren.push(child.left);
      if(child.right) newChildren.push(child.right);
    })
    children = newChildren;
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const p0 = new Point(861, 13);
    const p1 = new Point(809, 49);
    const p2 = new Point(984, 839);
    const p3 = new Point(332, 921);
    const p4 = new Point(959, 194);
    const p5 = new Point(644, 301);
    const p6 = new Point(897, 548);
    const p7 = new Point(825, 561);
    const p8 = new Point(254, 356);
    const p9 = new Point(699, 703);

    this.points = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9];
    this.tree = kd(this.points);
  }

  drawLines(node, direction, boundingBox) {
    if(!node) {
      return;
    }

    if(direction === 'y') {
      let newBox = [boundingBox[0], [node.node.x, boundingBox[1][1]]];
      let newBox2 = [[node.node.x, boundingBox[0][1]], boundingBox[1]];
      return (
        <g>
          <line key={Math.random()} x1={node.node.x} y1={boundingBox[0][1]} x2={node.node.x} y2={boundingBox[1][1]} strokeWidth={2} stroke={"blue"} />
          {this.drawLines(node.left, 'x', newBox)}
          {this.drawLines(node.right, 'x', newBox2)}
        </g>
      )
    } else {
      let newBox = [[boundingBox[0][0], node.node.y], boundingBox[1]];
      let newBox2 = [boundingBox[0], [boundingBox[1][0] , node.node.y]];
      return (
        <g>
          <line key={Math.random()} x1={boundingBox[0][0]} y1={node.node.y} x2={boundingBox[1][0]} y2={node.node.y} strokeWidth={2} stroke={"red"}/>
          {this.drawLines(node.right, 'y', newBox)}
          {this.drawLines(node.left, 'y', newBox2)}
        </g>
      )
    }
  }

  drawBox(node, direction, boundingBox) {
    if(!node) {
      const p1 = `${boundingBox[0][0]}, ${boundingBox[0][1]}`;
      const p2 = `${boundingBox[1][0]}, ${boundingBox[0][1]}`;
      const p3 = `${boundingBox[1][0]}, ${boundingBox[1][1]}`;
      const p4 = `${boundingBox[0][0]}, ${boundingBox[1][1]}`;
      const string = `${p1} ${p2} ${p3} ${p4}`
      return <polygon points={string} fill={randoColor()} />
    }

    if(direction === 'y') {
      let newBox = [boundingBox[0], [node.node.x, boundingBox[1][1]]];
      let newBox2 = [[node.node.x, boundingBox[0][1]], boundingBox[1]];
      return (
        <g>
          {this.drawBox(node.left, 'x', newBox)}
          {this.drawBox(node.right, 'x', newBox2)}
        </g>
      )
    } else {
      let newBox = [[boundingBox[0][0], node.node.y], boundingBox[1]];
      let newBox2 = [boundingBox[0], [boundingBox[1][0] , node.node.y]];
      return (
        <g>
          {this.drawBox(node.right, 'y', newBox)}
          {this.drawBox(node.left, 'y', newBox2)}
        </g>
      )
    }
  }

  render() {
    const output = this.points.map((point, index) => {
      return <circle key={index} cx={point.x} cy={point.y} r={3} />
    });

    const output2 = this.drawLines(this.tree, 'y', [[0, 0], [1000,1000]]);
    const output3 = this.drawBox(this.tree, 'y', [[0, 0], [1000,1000]]);

    console.log(this.tree.node.x);
    return (
      <div className="App">
        <SVG onClick={null}>
          {output3}
          {output2}
          {output}
        </SVG>
      </div>
    );
  }
}
