import React, { PureComponent } from 'react';

let loaderStyle = {
    position: 'absolute'
}

let canvas, ctx, cw, ch, start;

class Loader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            difference: 0 // Micgaw - ten stan nie jest potrzebny
        }
        this.progressSim = this.progressSim.bind(this);
    }

    componentDidMount() {
        canvas = this.refs.canvas; // Micgaw - trochę inaczej się robi z refami w Reactie https://reactjs.org/docs/refs-and-the-dom.html
        canvas.width  = 166;
        canvas.height = 166;
        ctx = canvas.getContext("2d");
        cw = ctx.canvas.width;
        ch = ctx.canvas.height;
        start = 4.72; // Micgaw - skąd ta wartość?
    }

    componentWillReceiveProps() { // Micgaw - ta metoda jest deprecated no i raczej będziesz tej metody używał na componentDidUpdate
        this.progressSim();
    }

    drawCircle(x, y, r, start, step) {
        ctx.clearRect(0, 0, cw, ch);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#3f51b5";
        ctx.beginPath();
        ctx.arc(x, y, r, start, step, false);
        ctx.stroke();
    }

    progressSim() {
        if (this.props.isTimerPlayed) { // Micgaw - ogólnie trochę za dużo zagnieżdzeń, ciężko się to czyta, ale to możemy razem to najpierw pozostałem poprawki a potem możemy siąść razem nad tym i to rozpisać
            if (this.props.timerState === "Session") {
                this.setState({ // Micgaw - te wszystkie setState do wywalenia
                    difference: ((((this.props.initialSessionLength * 60) - this.props.sessionLength) / (this.props.initialSessionLength * 60)) * Math.PI * 2 * 10).toFixed(2) // Micgaw - wyciągnąłbym do osobnej funkcji obliczanie % wypełnienia okręgu
                }, function() {
                    this.drawCircle(83, 83, 65, start, this.state.difference / 10 + start)
                    if (((((this.props.initialSessionLength * 60) - this.props.sessionLength) / (this.props.initialSessionLength * 60)) * Math.PI * 2 * 10) === this.props.initialSessionLength * 60) {
                        this.setState({
                            difference: 0
                        }, this.drawCircle(83, 83, 65, start, 0 + start))
                    }
                })
            } else {
                this.setState({
                    difference: ((((this.props.initialBreakLength * 60) - this.props.breakLength) / (this.props.initialBreakLength * 60)) * Math.PI * 2 * 10).toFixed(2)
                }, function() {
                    this.drawCircle(83, 83, 65, start, this.state.difference / 10 + start)
                    if (((((this.props.initialBreakLength * 60) - this.props.breakLength) / (this.props.initialBreakLength * 60)) * Math.PI * 2 * 10) === this.props.initialBreakLength * 60) {
                        this.setState({
                            difference: 0
                        }, this.drawCircle(83, 83, 65, start, 0 + start))
                    }
                })
            }
        } else {
            if (this.state.difference !== 0) {
                this.drawCircle(83, 83, 65, start, this.state.difference / 10 + start)
            } else {
                this.drawCircle(83, 83, 65, start, 0 + start)
            }
        }
    }

    render() {
        return (
            <canvas ref="canvas" style={loaderStyle}></canvas> // Micgaw - jeśli tag jest pusty to lepiej <canvas (tu jakieś propsy) />
        )
    }
}

export default Loader;
