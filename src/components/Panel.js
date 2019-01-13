import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Timer from './Timer';

var fabButtonStyles = {
    height: '2.8rem',
    width: '2.8rem',
    minHeight: '2.8rem'
}

class Panel extends React.Component {
    constructor(props) {
        super();
        this.state = {
            breakLengt: 5,
            sessionLength: 25,
            time: 25,
            isTimerPlayed: false,
        }
        this.toggleTimer = this.toggleTimer.bind(this);
    }
    addMinute(prop) {
        if(this.state.isTimerPlayed === false) {
            if (this.state.breakLengt === 0 || this.state.sessionLength === 0) return
            else if (prop === 'break') {
                this.setState({
                    breakLengt: this.state.breakLengt + 1
                })
            } else {
                this.setState({
                    sessionLength: this.state.sessionLength + 1
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
                    breakLengt: this.state.breakLengt - 1
                })
            } else {
                this.setState({
                    sessionLength: this.state.sessionLength - 1
                })
            }
        } else return
    }

    toggleTimer(isTimerPlayed) {
        this.setState({
            isTimerPlayed: !this.state.isTimerPlayed
        })
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
                                <Grid item sm>{this.state.breakLengt}</Grid>
                                <Grid item sm><Fab style={fabButtonStyles} onClick={() => this.subtractMinute('break')}>-</Fab></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm >
                    <Timer toggleTimer={this.toggleTimer} sessionLength={this.convertToSeconds(this.state.sessionLength)} breakLengt={this.convertToSeconds(this.state.breakLengt)} />
                </Grid>
                <Grid item sm>
                    <Grid container direction='column'>
                        <Grid item sm style={{paddingBottom: '1rem'}}>Session Length</Grid>
                        <Grid item sm>
                            <Grid container>
                                <Grid item sm><Fab style={fabButtonStyles} onClick={() => this.addMinute('session')}>+</Fab></Grid>
                                <Grid item sm>{this.state.sessionLength}</Grid>
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