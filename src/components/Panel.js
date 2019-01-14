import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Timer from './Timer';

var fabButtonStyles = {
    height: '2.8rem',
    width: '2.8rem',
    minHeight: '2.8rem'
}

let timer;

class Panel extends React.Component {
    constructor(props) {
        super();
        this.state = {
            breakLengt: 300,
            sessionLength: 1500,
            initialSessionLength: 25,
            initialBreakLength: 5,
            time: 25,
            isTimerPlayed: false,
            timerState: 'Session'
        }
        this.toggleTimer = this.toggleTimer.bind(this);
        this.toggleSession = this.toggleSession.bind(this);
    }
    addMinute(prop) {
        if(this.state.isTimerPlayed === false) {
            if (this.state.breakLengt === 0 || this.state.sessionLength === 0) return
            else if (prop === 'break') {
                this.setState({
                    breakLengt: this.state.breakLengt + 60,
                    initialBreakLength: this.state.initialBreakLength + 1
                })
            } else {
                this.setState({
                    sessionLength: this.state.sessionLength + 60,
                    initialSessionLength: this.state.initialSessionLength + 1
                })
            }
        } else return
    }

    convertToSeconds(minutes) {
        return minutes * 60;
    }

    subtractMinute(prop) {
        if(this.state.isTimerPlayed === false) {
            if (this.state.breakLengt === 0 || this.state.sessionLength === 0) return
            else if (prop === 'break') {
                this.setState({
                    breakLengt: this.state.breakLengt - 60,
                    initialBreakLength: this.state.initialBreakLength -1
                })
            } else {
                this.setState({
                    sessionLength: this.state.sessionLength - 60,
                    initialSessionLength: this.state.initialSessionLength - 1
                })
            }
        } else return
    }

    toggleTimer(isTimerPlayed) {
        this.setState({
            isTimerPlayed: !isTimerPlayed
        })
    }

    toggleSession() {
        console.log(this.state.isTimerPlayed)
        if(this.state.isTimerPlayed === false) {
            console.log('start intervals');
            timer = setInterval(() => {
                this.setState({
                sessionLength: this.state.sessionLength - 1
            })
            console.log(this.state.sessionLength);
            console.log(this.state.isTimerPlayed)
        }, 1000)
        } else {
            console.log('clear interval')
            clearInterval(timer);
        }
    }

    render() {
        return (
            <Grid container alignItems='center'>
                <Grid item sm>
                    <Grid container direction='column'>
                        <Grid item sm style={{paddingBottom: '1rem'}}>Break Length</Grid>
                        <Grid item sm>
                            <Grid container>
                                <Grid item sm><Fab style={fabButtonStyles} onClick={() => this.addMinute('break')}>+</Fab></Grid>
                                <Grid item sm>{this.state.initialBreakLength}</Grid>
                                <Grid item sm><Fab style={fabButtonStyles} onClick={() => this.subtractMinute('break')}>-</Fab></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm >
                    <Timer toggleTimer={this.toggleTimer} sessionLength={this.state.sessionLength} breakLengt={this.state.breakLengt} isTimerPlayed={this.state.isTimerPlayed} timerState={this.state.timerState} toggleSession={this.toggleSession} />
                </Grid>
                <Grid item sm>
                    <Grid container direction='column'>
                        <Grid item sm style={{paddingBottom: '1rem'}}>Session Length</Grid>
                        <Grid item sm>
                            <Grid container>
                                <Grid item sm><Fab style={fabButtonStyles} onClick={() => this.addMinute('session')}>+</Fab></Grid>
                                <Grid item sm>{this.state.initialSessionLength}</Grid>
                                <Grid item sm><Fab style={fabButtonStyles} onClick={() => this.subtractMinute('session')}>-</Fab></Grid>
                            </Grid>   
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Panel;