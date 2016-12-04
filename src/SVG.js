import React, { Component } from 'react';

export default class SVG extends Component {
  componentDidMount() {
    this.svg = document.querySelector('svg');
  }

  getClickSVGPoint(e) {
    let pt = this.svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    pt = pt.matrixTransform(this.svg.getScreenCTM().inverse())

    return { x: pt.x, y: pt.y };
  }

  onClick(e) {
    if(this.props.filterClick && this.props.filterClick(e)) return;

    this.props.onClick(this.getClickSVGPoint(e));
  }

  render() {
    return (
      <svg
        id="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={this.props.viewBox}
        onClick={this.onClick.bind(this)} >
        {this.props.children}
      </svg>
    );
  }
}

SVG.defaultProps = {
  viewBox: "0 0 1000 1000",
  filterClick: () => { return false }
};
