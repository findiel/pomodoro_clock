import React, { PureComponent } from 'react';

let loaderStyle = {
    position: 'absolute',
    width: '166px',
    height: '166px',
    zIndex: 5
}

class Loader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            difference: 0
        }
        this.progressSim = this.progressSim.bind(this);
    }

    componentWillReceiveProps() {
        this.progressSim();
    }

    progressSim() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const cw = ctx.canvas.width
        const ch = ctx.canvas.height
        const start = 4.72
        if (this.props.isTimerPlayed) {
            console.log("Played");
            if (this.props.timerState === "Session") { 
                console.log("Session")
                this.setState({
                    difference: ((((this.props.initialSessionLength * 60) - this.props.sessionLength) / (this.props.initialSessionLength * 60)) * Math.PI * 2 * 10).toFixed(2)
                }, function() {
                    ctx.clearRect(0, 0, cw, ch);
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = "#3f51b5";
                    ctx.beginPath();
                    ctx.arc(35, 35, 30, start, this.state.difference / 10 + start, false);
                    ctx.stroke();
                    if (((((this.props.initialSessionLength * 60) - this.props.sessionLength) / (this.props.initialSessionLength * 60)) * Math.PI * 2 * 10) === this.props.initialSessionLength * 60) {
                        this.setState({
                            difference: 0
                        }, function() {
                            console.log("last iteration");
                            ctx.clearRect(0, 0, cw, ch);
                            ctx.lineWidth = 10;
                            ctx.strokeStyle = "#3f51b5";
                            ctx.beginPath();
                            ctx.arc(35, 35, 30, start, 0, false);
                            ctx.stroke();
                        })
                    }
                })
            } else {
                console.log("Break")
                this.setState({
                    difference: ((((this.props.initialBreakLength * 60) - this.props.breakLength) / (this.props.initialBreakLength * 60)) * Math.PI * 2 * 10).toFixed(2)
                }, function() {
                    ctx.clearRect(0, 0, cw, ch);
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = "#3f51b5";
                    ctx.beginPath();
                    ctx.arc(35, 35, 30, start, this.state.difference / 10 + start, false);
                    ctx.stroke();
                    if (((((this.props.initialBreakLength * 60) - this.props.breakLength) / (this.props.initialBreakLength * 60)) * Math.PI * 2 * 10) === this.props.initialBreakLength * 60) {
                        this.setState({
                            difference: 0
                        }, function() {
                            console.log("last iteration");
                            ctx.clearRect(0, 0, cw, ch);
                            ctx.lineWidth = 10;
                            ctx.strokeStyle = "#3f51b5";
                            ctx.beginPath();
                            ctx.arc(35, 35, 30, 0, false);
                            ctx.stroke();
                        })
                    }
                })
            }
        } else {
            console.log("Stopped")
            ctx.clearRect(0, 0, cw, ch);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#3f51b5";
            ctx.beginPath();
            ctx.arc(35, 35, 30, start, this.state.difference / 10 + start, false);
            ctx.stroke();
        }
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



    render() {
        return (
            <canvas ref="canvas" style={loaderStyle}></canvas>
        )
    }
}

export default Loader;