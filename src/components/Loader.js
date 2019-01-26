import React, { PureComponent } from 'react';

let loaderStyle = {
    position: 'absolute',
    width: '166px',
    height: '166px',
    zIndex: 5
}

let circleStyle = {
    strokeDasharray: 150 * Math.PI * 2,
    strokeDashoffset: 150 * Math.PI * 2
}

let sim;

class Loader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            alreadyLoaded: 0,
            difference: 0
        }
        this.progressSim = this.progressSim.bind(this);
    }

    componentWillReceiveProps() {
        //clearInterval(sim)
        this.progressSim();
    }

    progressSim() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const cw = ctx.canvas.width
        const ch = ctx.canvas.height
        const start = 4.72
        console.log("onload")
        if (this.props.isTimerPlayed) {
            console.log("a");
            if (this.props.timerState === "Session") {
                sim = setInterval(() => { 
                    this.setState({
                    difference: ((this.state.alreadyLoaded / (this.props.initialSessionLength * 60)) * Math.PI * 2 * 10).toFixed(2)
                }, function() {
                    ctx.clearRect(0, 0, cw, ch);
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = "#3f51b5";
                    ctx.beginPath();
                    ctx.arc(35, 35, 30, start, this.state.difference / 10 + start, false);
                    ctx.stroke();
                    this.setState({
                        alreadyLoaded: this.state.alreadyLoaded + 1
                    })
                    if (this.state.alreadyLoaded - 1 === this.props.initialSessionLength * 60) {
                        this.setState({
                            alreadyLoaded: 0,
                            difference: 0
                        }, function() {
                            clearInterval(sim);
                            ctx.clearRect(0, 0, cw, ch);
                            ctx.lineWidth = 10;
                            ctx.strokeStyle = "#3f51b5";
                            ctx.beginPath();
                            ctx.arc(35, 35, 30, start, this.state.difference / 10 + start, false);
                            ctx.stroke();
                        })
                    }
                })}, 1000)
            } else {
                sim = setInterval(() => { 
                    this.setState({
                    difference: ((this.state.alreadyLoaded / (this.props.initialBreakLength * 60)) * Math.PI * 2 * 10).toFixed(2)
                }, function() {
                    ctx.clearRect(0, 0, cw, ch);
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = "#3f51b5";
                    ctx.beginPath();
                    ctx.arc(35, 35, 30, start, this.state.difference / 10 + start, false);
                    ctx.stroke();
                    this.setState({
                        alreadyLoaded: this.state.alreadyLoaded + 1
                    })
                    if (this.state.alreadyLoaded - 1 === this.props.initialBreakLength * 60) {
                        this.setState({
                            alreadyLoaded: 0,
                            difference: 0
                        }, function() {
                            clearInterval(sim);
                            ctx.clearRect(0, 0, cw, ch);
                            ctx.lineWidth = 10;
                            ctx.strokeStyle = "#3f51b5";
                            ctx.beginPath();
                            ctx.arc(35, 35, 30, start, this.state.difference / 10 + start, false);
                            ctx.stroke();
                        })
                    }
                })}, 1000)
            }
        } else {
            console.log("b")
            clearInterval(sim);
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
            <canvas ref="canvas" style={loaderStyle} ></canvas>
        )
    }
}

export default Loader;