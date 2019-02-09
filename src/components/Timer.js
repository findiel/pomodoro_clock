import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Loader from './Loader';
import displayer from '../utils/displayer';

const timerStyle = {
    width: '16.6rem',
    height: '16.6rem',
    color: '#3f51b5',
    fontSize: '2.5rem',
    cursor: 'pointer'
}

class Timer extends Component {
    
    componentWillMount(){
        this.setState({
            sessionLength: this.props.sessionLength,
            breakLength: this.props.breakLength
        })
    }

    displayTime(timerState) {
        let currentTime;
        if (timerState === 'Session') {
            currentTime = displayer(this.props.sessionLength);
            return currentTime
        } else {
            currentTime = displayer(this.props.breakLength);
            return currentTime
        }
    }

    render() {
        return (
            <Grid container style={timerStyle} direction='column' justify='center' alignItems='center' onClick={() => {
                this.props.toggleTimer(this.props.isTimerPlayed);
                console.log(`Is timer running ? ${!this.props.isTimerPlayed}`);
                this.props.toggleSession();
            }}>
                <Loader initialSessionLength={this.props.initialSessionLength} initialBreakLength={this.props.initialBreakLength} timerState={this.props.timerState} isTimerPlayed={this.props.isTimerPlayed} sessionLength={this.props.sessionLength} breakLength={this.props.breakLength}/>
                <div style={{zIndex: 2}}>{this.props.timerState}</div>
                <div style={{zIndex: 2}}>{this.displayTime(this.props.timerState)}</div>
            </Grid>
        )
    }
}

export default Timer;