import React, { PureComponent } from 'react';

let loaderStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: 'rotate(-90deg)'
}

let circleStyle = {
    strokeDasharray: 150 * Math.PI * 2,
    strokeDashoffset: 150 * Math.PI * 2
}

class Loader extends PureComponent {
    constructor(props) {
        super(props);

    }

    defineAnimationTime() {
        console.log(this.props.isTimerPlayed, this.props.timerState);
        if (this.props.timerState === "Session"){
            console.log(`${this.props.initialSessionLength * 60}s`);
            return `${this.props.initialSessionLength * 60}s`;
            } else if (this.props.timerState === "Break") {
                console.log(this.props.initialBreakLength)
                return `${this.props.initialBreakLength * 60}s`;
            }
    }

    componentDidMount

    render() {
        return (
            <svg style={loaderStyle} viewBox="0 0 1280 1280">
                { this.props.isTimerPlayed && <circle style={circleStyle} cx="640" cy="640" r="150" stroke="#3f51b5" fill="none" strokeWidth="2" strokeLinecap="round">
                    <animate attributeName="stroke-dashoffset" dur={this.defineAnimationTime()} to={-150 * Math.PI * 2} repeatCount="indefinite"/>
                </circle>}
            </svg>
        )
    }
}

export default Loader;