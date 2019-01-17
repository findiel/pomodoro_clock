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
            breakLength: 300,
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
            if (this.state.breakLength === 0 || this.state.sessionLength === 0) return
            else if (prop === 'break') {
                this.setState({
                    breakLength: this.state.breakLength + 60,
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
            if (this.state.breakLength === 0 || this.state.sessionLength === 0) return
            else if (prop === 'break') {
                this.setState({
                    breakLength: this.state.breakLength - 60,
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
        if(this.state.isTimerPlayed === false) {
            timer = setInterval(() => {
                if (this.state.sessionLength > 0) {
                    this.setState({
                        sessionLength: this.state.sessionLength - 1,
                        timerState: 'Session'
                    })
                }
                else if (this.state.sessionLength <= 0 && this.state.breakLength > 0) {
                    this.setState({
                        breakLength: this.state.breakLength - 1,
                        timerState: 'Break'
                    })
                } else {
                    this.setState({
                        sessionLength: this.state.initialSessionLength * 60 ,
                        breakLength: this.state.initialBreakLength * 60,
                        timerState: 'Session'
                    })
                }
        }, 1000)
        } else {
            clearInterval(timer);
        }
    }

    toggleBreak() {
        if(this.state.isTimerPlayed === false) {
            timer = setInterval(() => {
                this.setState({
                    breakLength: this.state.breakLength - 1,
                    timerState: 'Break'
                })
                if (this.state.breakLength <= 0) {
                    this.setState({
                        timerState: 'Session'
                    })
                    clearInterval(timer);
                }
        }, 1000)
        } else {
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
                    <Timer toggleTimer={this.toggleTimer} sessionLength={this.state.sessionLength} breakLength={this.state.breakLength} isTimerPlayed={this.state.isTimerPlayed} timerState={this.state.timerState} toggleSession={this.toggleSession} toggleBreak={this.toggleBreak} />
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