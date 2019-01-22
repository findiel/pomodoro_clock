import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Loader from './Loader';

let timerStyle = {
    width: '16.6rem',
    height: '16.6rem',
    color: '#3f51b5',
    fontSize: '2.5rem',
    cursor: 'pointer'
}

class Timer extends React.Component {
    constructor(props) {
        super();
    }

    componentWillMount(){
        this.setState({
            sessionLength: this.props.sessionLength,
            breakLength: this.props.breakLength
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            sessionLength: nextProps.sessionLength,
            breakLength: nextProps.breakLength
        })
    }

    displayTime(timerState) {
        if (timerState === 'Session') {
            if ( Math.floor(this.props.sessionLength % 60) < 10) {
                return `${Math.floor(this.props.sessionLength / 60)}:0${Math.floor(this.props.sessionLength % 60)}`
            } else {
                return `${Math.floor(this.props.sessionLength / 60)}:${Math.floor(this.props.sessionLength % 60)}`
            }
        } else {
            if ( Math.floor(this.props.breakLength % 60) < 10) {
                return `${Math.floor(this.props.breakLength / 60)}:0${Math.floor(this.props.breakLength % 60)}`
            } else {
                return `${Math.floor(this.props.breakLength / 60)}:${Math.floor(this.props.breakLength % 60)}`
            }
        } 
    }

    render() {
        return (
            <Grid container style={timerStyle} direction='column' justify='center' alignItems='center' onClick={() => {
                this.props.toggleTimer(this.props.isTimerPlayed);
                console.log(`Is timer running ? ${!this.props.isTimerPlayed}`);
                this.props.toggleSession();
            }}>
                <Loader initialSessionLength={this.props.initialSessionLength} initialBreakLength={this.props.initialBreakLength} timerState={this.props.timerState} isTimerPlayed={this.props.isTimerPlayed}/>
                <div style={{zIndex: 2}}>{this.props.timerState}</div>
                <div style={{zIndex: 2}}>{this.displayTime(this.props.timerState)}</div>
            </Grid>
        )
    }
}

export default Timer;