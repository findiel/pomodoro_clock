import React, { Component } from 'react';

let loaderStyle = {
    position: 'absolute'
}

let circleStyle = {
    strokeDasharray: 20 * Math.PI * 2,
    strokeDashoffset: 20 * Math.PI * 2,
    //transform: 'rotate(-90deg)'
}

class Loader extends React.Component {
    constructor() {
        super();
    }

    defineAnimationTime() {
        if (this.props.timerState === "Session") {
            return `${this.props.initialSessionLength * 60}s`;
        } else {
            return `${this.props.initialBreakLength * 60}s`;
        }
    }

    render() {
        return (
            <svg style={loaderStyle} viewBox="0 0 166 166">
                <circle style={circleStyle} cx="83" cy="83" r="20" stroke="#3f51b5" fill="none" stroke-width="2" stroke-linecap="round">
                    <animate attributeName="stroke-dashoffset" dur={this.defineAnimationTime()} to={-20 * Math.PI * 2}repeatCount="indefinite"/>
                </circle>
            </svg>
        )
    }
}

export default Loader;